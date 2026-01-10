import type {ApiError} from "@/services/error/api-error.ts";
import type {
    AddUnitResponse,
    AddUnitSuccessResponse,
    GetUnitResponse,
    GetUnitSuccessResponse
} from "@/types/unit-type-response.ts";
import {ApiService} from "@/services/ApiService.ts";
import type {APIGlobalWithErrorsResponse} from "@/types/api-response.ts";
import {AbstractService} from "@/services/AbstractService.ts";

export class UnitService extends AbstractService {
    public static async addUnit(formData: FormData): Promise<AddUnitResponse> {
        try {
            return await ApiService.post<AddUnitSuccessResponse>('/units', Object.fromEntries(formData));
        } catch (e: ApiError | any) {
            return UnitService.handleError<APIGlobalWithErrorsResponse>(e)
        }
    }

    public static async editUnit(formData: FormData, id: number):Promise<AddUnitResponse> {
        try {
            return await ApiService.patch<AddUnitSuccessResponse>(`/units/${id}`, Object.fromEntries(formData));
        } catch (e: ApiError | any) {
            return UnitService.handleError<APIGlobalWithErrorsResponse>(e)
        }
    }

    public static async getUnits(): Promise<GetUnitResponse> {
        try {
            return await ApiService.get<GetUnitSuccessResponse>(`/units`);
        } catch (e: ApiError | any) {
            return UnitService.handleError<APIGlobalWithErrorsResponse>(e)
        }
    }
}