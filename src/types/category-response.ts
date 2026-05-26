import type { Ref } from "vue";
import type { APIErrorResponse, APISuccessResponse } from "./api-response";
import type { VariantTypeItem } from "./variant-type-response";

export type CategoryItem = {
  id: number;
  name: string;
  slug: string;
  variant_type_count: number;
  sub_category_count: number;
  variant_types?: VariantTypeItem[];
  sub_categories?: SubcategoryItem[];
};
type SubcategoryItem = CategoryItem & {
  parent_category: string;
};

export type CategoryPaginationMeta = {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
};

export type CategoryPaginationLinks = {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
};

export type CategorySuccessResponse = APISuccessResponse & {
  data: {
    data: CategoryItem[];
    links: CategoryPaginationLinks;
    meta: CategoryPaginationMeta;
  };
};

export type CategoryErrorResponse = APIErrorResponse & {
  errors?: any;
};

export type CategoryResponse = CategorySuccessResponse | CategoryErrorResponse;

export type CategoryResponseDto = {
  success: boolean;
  message: string;
  data?: CategoryItem[];
  meta?: CategoryPaginationMeta;
  links?: CategoryPaginationLinks;
  errors?: any;
};
