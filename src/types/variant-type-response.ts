import type { Ref } from "vue";
import type { APIErrorResponse, APISuccessResponse } from "./api-response";

export type VariantTypeItem = {
  id: number;
  name: string;
  slug: string;
  values: {
    id: number;
    name: string;
    slug: string;
  }[];
  viewOnly?: boolean;
};

export type VariantTypePaginationMeta = {
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

export type VariantTypePaginationLinks = {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
};

export type VariantTypeSuccessResponse = APISuccessResponse & {
  data: {
    data: VariantTypeItem[];
    links: VariantTypePaginationLinks;
    meta: VariantTypePaginationMeta;
  };
};

export type VariantTypeErrorResponse = APIErrorResponse & {
  errors?: any;
};

export type VariantTypeResponse =
  | VariantTypeSuccessResponse
  | VariantTypeErrorResponse;

export type VariantTypeResponseDto = {
  success: boolean;
  message: string;
  data?: VariantTypeItem[];
  meta?: VariantTypePaginationMeta;
  links?: VariantTypePaginationLinks;
  errors?: any;
}[];
