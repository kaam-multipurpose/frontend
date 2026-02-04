import type {ApiError} from "@/services/error/api-error.ts";

export abstract class AbstractService {
    protected static handleError<T>(e: ApiError | any): T {
        return {
            success: false,
            message: e.message ?? "Failed due network error. Please try again later.",
            errors: e.responseBody?.errors ?? null,
        } as T;
    }
}