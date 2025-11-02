import { describe, it, expect, vi, beforeEach } from 'vitest'

// Module under test
import { AuthService } from '@/services/AuthService.ts'

// Mocks (use hoisted spies so vi.mock factories can reference them safely)
const mocks = vi.hoisted(() => ({
  setUser: vi.fn(),
  setToken: vi.fn(),
  getMock: vi.fn(),
  postMock: vi.fn(),
  deleteMock: vi.fn(),
}))

vi.mock('@/stores/user-session.ts', () => ({
  useUserSessionStore: () => ({
    setUser: mocks.setUser,
    setToken: mocks.setToken,
  }),
}))

// We'll control ApiService responses per-test
vi.mock('@/services/ApiService.ts', () => ({
  ApiService: {
    get: mocks.getMock,
    post: mocks.postMock,
    delete: mocks.deleteMock,
  },
}))

// Minimal helpers
function makeFormData(obj: Record<string, string>) {
  const fd = new FormData()
  Object.entries(obj).forEach(([k, v]) => fd.append(k, v))
  return fd
}

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('login: success sets user and token, returns hasErrors=false', async () => {
    // Arrange
    const fakeResponse = {
      success: true,
      message: 'Logged in',
      data: {
        user: {
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
          permissions: ['read'],
        },
        token: 'abc123',
        expires_at: new Date(Date.now() + 60_000).toISOString(),
      },
    }
    mocks.postMock.mockResolvedValueOnce(fakeResponse)

    const fd = makeFormData({ email: 'test@example.com', password: 'secret' })

    // Act
    const result = await AuthService.login(fd)

    // Assert
    expect(result.hasErrors).toBe(false)
    expect(result.message).toBe('Logged in')

    // setUser called without permissions field in user data
    expect(mocks.setUser).toHaveBeenCalledTimes(1)
    const [userArg, permsArg] = mocks.setUser.mock.calls[0]
    expect(userArg).toMatchObject({ id: 1, name: 'Test User', email: 'test@example.com' })
    expect(permsArg).toEqual(['read'])

    expect(mocks.setToken).toHaveBeenCalledWith('abc123', fakeResponse.data.expires_at)
  })

  it('login: failure returns hasErrors=true and message', async () => {
    const fakeResponse = {
      success: false,
      message: 'Invalid credentials',
      errors: { global: ['Invalid credentials'] },
    }
    mocks.postMock.mockResolvedValueOnce(fakeResponse)

    const fd = makeFormData({ email: 'bad@example.com', password: 'nope' })

    const result = await AuthService.login(fd)

    expect(result.hasErrors).toBe(true)
    expect(result.message).toBe('Invalid credentials')
    expect(mocks.setUser).not.toHaveBeenCalled()
    expect(mocks.setToken).not.toHaveBeenCalled()
  })

  it('login: network error returns hasErrors=true with fallback message', async () => {
    mocks.postMock.mockRejectedValueOnce(new Error('Network down'))

    const fd = makeFormData({ email: 'x@y.z', password: 'p' })
    const result = await AuthService.login(fd)

    expect(result.hasErrors).toBe(true)
    expect(result.message).toBe('Network down')
  })

  it('refreshToken: success returns token and expiry', async () => {
    const fake = {
      success: true,
      message: 'Refreshed',
      data: {
        token: 'new-token',
        expires_at: '2099-01-01T00:00:00.000Z',
      },
    }
    mocks.getMock.mockResolvedValueOnce(fake)

    const res = await AuthService.refreshToken()

    expect(res.message).toBe('Refreshed')
    expect(res.token).toBe('new-token')
    expect(res.expires_at).toBe('2099-01-01T00:00:00.000Z')
  })

  it('refreshToken: api returns failure -> returns only message', async () => {
    const fake = {
      success: false,
      message: 'Please login again',
    }
    mocks.getMock.mockResolvedValueOnce(fake)

    const res = await AuthService.refreshToken()

    expect(res).toEqual({ message: 'Please login again' })
  })

  it('logout: returns api response, handles network error', async () => {
    // success path
    mocks.deleteMock.mockResolvedValueOnce({ success: true, message: 'Logged out' })
    const ok = await AuthService.logout()
    expect(ok).toEqual({ success: true, message: 'Logged out' })

    // error path
    mocks.deleteMock.mockRejectedValueOnce(new Error('oops'))
    const bad = await AuthService.logout()
    expect(bad).toEqual({ success: false, message: 'oops' })
  })
})
