import type {
    APIGlobalWithErrorsResponse,
    APISuccessResponse,
} from "@/types/api-response.ts";

export type UnitType = {
    id: number|null;
    name: string|null;
    symbol: string|null;
    quantity: number|null;

    [key: string]: string | number | null;
};

export type AddUnitSuccessResponse = APISuccessResponse & {
    data: UnitType;
};

export type GetUnitSuccessResponse = APISuccessResponse & {
    data: UnitType[]
};

export type GetUnitResponse = GetUnitSuccessResponse | APIGlobalWithErrorsResponse;
export type AddUnitResponse = AddUnitSuccessResponse | APIGlobalWithErrorsResponse;

