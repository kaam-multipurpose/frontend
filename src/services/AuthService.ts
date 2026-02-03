import {ApiService} from "@/services/ApiService.ts";
import type {LoginResponse, LoginResponseDto, LoginSuccessResponse} from "@/types/login-reponse.ts";
import {useUserSessionStore} from "@/stores/user-session-store.ts";
import type {RefreshTokenResponse, RefreshTokenResponseDto} from "@/types/refresh-token-response.ts";
import type {APIGlobalResponse} from "@/types/api-response.ts";
import {ApiError} from "@/services/error/api-error.ts";

export class AuthService {

    public static async login(formData: FormData): Promise<LoginResponseDto> {
        try {
            const login = await ApiService.post<LoginResponse>(
                "/login",
                Object.fromEntries(formData),
                {
                    credentials: "include"
                }
            ) as LoginSuccessResponse;

            const {user, token, expires_at} = login.data;
            const {permissions, ...userData} = user;

            const userSession = useUserSessionStore();
            const {setToken, setUser} = userSession;
            setUser(userData, permissions);
            setToken(token, expires_at);

            return {
                hasErrors: false,
                message: login.message,
            };

        } catch (e: ApiError | any) {
            return {
                hasErrors: true,
                message: e.message ?? "Log in failed due network error. Please try again later.",
                errors: e.responseBody?.errors ?? ""
            };
        }
    }

    public static async logout(): Promise<APIGlobalResponse> {
        try {
            return await ApiService.delete<APIGlobalResponse>(
                "/logout", {
                    credentials: "include"
                });
        } catch (e: any) {
            if (e instanceof ApiError) {
                return {
                    success: false,
                    message: e.message,
                    statusCode: e.statusCode,
                }
            }

            return {
                success: false,
                message: e.message ?? "Log out failed"
            }
        }
    }

    public static async refreshToken(): Promise<RefreshTokenResponseDto> {
        try {
            const refresh = await ApiService.get<RefreshTokenResponse>(
                "/refresh-token", {
                    credentials: "include"
                });
            if (refresh.success) {
                const {token, expires_at} = refresh.data;
                return {
                    message: refresh.message,
                    token,
                    expires_at
                };
            } else {
                return {
                    message: refresh.message,
                }
            }
        } catch (e: any) {
            return {
                message: e.message ?? "Refresh token failed due to network error. Please try again later.",
            }
        }
    }
}