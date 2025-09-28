import {ApiService} from "@/services/ApiService.ts";
import type {LoginResponse, LoginResponseDto} from "@/types/login-reponse.ts";

export class AuthService {

    public static async login(formData: FormData): Promise<LoginResponseDto> {
        const login = await ApiService.post<LoginResponse>("/login", Object.fromEntries(formData));

        if (login.success) {
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
    }
}