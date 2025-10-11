import {ApiService} from "@/services/ApiService.ts";
import type {LoginResponse, LoginResponseDto} from "@/types/login-reponse.ts";
import {useUserSessionStore} from "@/stores/user-session.ts";
import type {RefreshTokenResponse, RefreshTokenResponseDto} from "@/types/refresh-token-response.ts";
import type {APIGlobalResponse} from "@/types/api-response.ts";

export class AuthService {

    public static async login(formData: FormData): Promise<LoginResponseDto> {
        try {
            const login = await ApiService.post<LoginResponse>(
                "/login",
                Object.fromEntries(formData),
                {
                    credentials: "include"
                }
            );

            if (login.success) {
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
            } else {
                return {
                    hasErrors: true,
                    message: login.errors?.global?.[0] ?? login.message,
                    errors: login.errors
                };
            }
        } catch (e: any) {
            return {
                hasErrors: true,
                message: e.message ?? "Log in failed due network error. Please try again later.",
            }
        }
    }

    public static async logout(): Promise<APIGlobalResponse> {
        try {
            return await ApiService.delete<APIGlobalResponse>(
                "/logout", {
                    credentials: "include"
                });
        } catch (e: any) {
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