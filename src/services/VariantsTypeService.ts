import type {
  VariantTypeResponse,
  VariantTypeResponseDto,
} from "@/types/variant-type-response";
import { ApiService } from "./ApiService";
import { ApiError } from "./error/api-error";

export class VariantsTypeService {
  public static async createVariantType(
    name: string,
    values: string[]
  ): Promise<VariantTypeResponseDto> {
    try {
      const response = await ApiService.post<VariantTypeResponse>(
        "/variant-types",
        {
          name,
          values,
        }
      );
      if (response.success) {
        return [
          {
            success: true,
            message: response.message,
          },
        ];
      }
      return [
        {
          success: false,
          message: response.message ?? "Failed to create variant",
        },
      ];
    } catch (e: any) {
      return [
        {
          success: false,
          message: e.message ?? "Failed to create variant",
        },
      ];
    }
  }

  public static async getVariantsType(
    perPage = 10,
    page = 1
  ): Promise<VariantTypeResponseDto> {
    try {
      const variants = await ApiService.get<VariantTypeResponse>(
        `/variant-types?row=${perPage}&page=${page}`,
        {
          credentials: "include",
        }
      );
      if (variants.success) {
        return [
          {
            success: true,
            message: variants.message,
            data: variants.data.data,
            links: variants.data.links,
            meta: variants.data.meta,
          },
        ];
      }
      return [
        {
          success: false,
          message: variants.message ?? "Failed to get variants",
        },
      ];
    } catch (e: any) {
      return [
        {
          success: false,
          message: e.message ?? "Failed to get variants",
        },
      ];
    }
  }

  public static async addValueToVariantType(
    slug: string,
    values: string[]
  ): Promise<VariantTypeResponseDto> {
    try {
      const response = await ApiService.post<VariantTypeResponse>(
        `/variant-types/${slug}`,
        {
          values,
        }
      );
      if (response.success) {
        return [
          {
            success: true,
            message: response.message,
          },
        ];
      }
      return [
        {
          success: false,
          message: response.message ?? "Failed to add values to variant type",
        },
      ];
    } catch (e: any) {
      return [
        {
          success: false,
          message: e.message ?? "Failed to add values to variant type",
        },
      ];
    }
  }
  public static async deleteValueFromVariantType(
    slug: string,
    valueSlug: string
  ): Promise<VariantTypeResponseDto> {
    try {
      const response = await ApiService.delete<VariantTypeResponse>(
        `/variant-types/${slug}/${valueSlug}`,
        {
          credentials: "include",
        }
      );
      if (response.success) {
        return [
          {
            success: true,
            message: response.message,
          },
        ];
      }
      return [
        {
          success: false,
          message:
            response.message ?? "Failed to delete value from variant type",
        },
      ];
    } catch (e: any) {
      return [
        {
          success: false,
          message: e.message ?? "Failed to delete value from variant type",
        },
      ];
    }
  }
  public static async deleteVariantType(
    slug: string
  ): Promise<VariantTypeResponseDto> {
    try {
      const response = await ApiService.delete<VariantTypeResponse>(
        `/variant-types/${slug}`,
        {
          credentials: "include",
        }
      );
      if (response.success) {
        return [
          {
            success: true,
            message: response.message,
          },
        ];
      }
      return [
        {
          success: false,
          message:
            response.message ?? "Failed to delete value from variant type",
        },
      ];
    } catch (e: any) {
      return [
        {
          success: false,
          message: e.message ?? "Failed to delete value from variant type",
        },
      ];
    }
  }
}
