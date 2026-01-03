import { ApiService } from "./ApiService";
import type {
  CategoryResponse,
  CategoryResponseDto,
} from "@/types/category-response";

export class CategoryService {
  public static async create(
    name: string,
    variant_type_ids: number[]
  ): Promise<CategoryResponseDto> {
    try {
      const response = await ApiService.post<CategoryResponse>("/categories", {
        name,
        variant_type_ids,
      });
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
          message: response.message ?? "Failed to create category",
        },
      ];
    } catch (e: any) {
      return [
        {
          success: false,
          message: e.message ?? "Failed to create category",
        },
      ];
    }
  }
  public static async getCategories(
    perPage = 10,
    page = 1
  ): Promise<CategoryResponseDto> {
    try {
      const categories = await ApiService.get<CategoryResponse>(
        `/categories?row=${perPage}&page=${page}`,
        {
          credentials: "include",
        }
      );
      if (categories.success) {
        return [
          {
            success: true,
            message: categories.message,
            data: categories.data.data,
            links: categories.data.links,
            meta: categories.data.meta,
          },
        ];
      }
      return [
        {
          success: false,
          message: categories.message ?? "Failed to get categories",
        },
      ];
    } catch (e: any) {
      return [
        {
          success: false,
          message: e.message ?? "Failed to get categories",
        },
      ];
    }
  }
}
