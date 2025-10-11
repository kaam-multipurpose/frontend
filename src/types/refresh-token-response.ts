import type {APIErrorResponse, APISuccessResponse} from "@/types/api-response.ts";

export type RefreshTokenSuccessResponse = APISuccessResponse & {
    data: {
        token: string;
        expires_at: string;
    }
}

export type RefreshTokenErrorResponse = APIErrorResponse & {
    errors: any
}

export type RefreshTokenResponse = RefreshTokenErrorResponse | RefreshTokenSuccessResponse;

export type RefreshTokenResponseDto = {
    message: string;
    token?: string
    expires_at?: string
}