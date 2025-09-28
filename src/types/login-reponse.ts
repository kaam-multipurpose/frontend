import type {APISuccessResponse, APIErrorResponse, ValidationErrorMessage} from "@/types/api-response.ts";
import type {UserType} from "@/types/users.ts";

export type LoginSuccessResponse = APISuccessResponse & {
    data:  {
        user: UserType;
        expires_at: string;
        token: string;
    };
}

export type LoginErrorResponse = APIErrorResponse & {
    errors: ValidationErrorMessage;
};

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;

export type LoginResponseDto = {
    hasErrors: boolean;
    message: string;
    errors?: ValidationErrorMessage;
}