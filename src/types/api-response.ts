type APIResponse = {
    message: string;
};

type APISuccess = {
    success: true;
}

type APIError = {
    success: false;
}

export type APISuccessResponse = APISuccess & APIResponse;
export type APIErrorResponse = APIError & APIResponse;

export type APIGlobalResponse = APISuccessResponse | APIErrorResponse;

export type ValidationErrorMessage = {
    [key: string]: string[] | string;
}