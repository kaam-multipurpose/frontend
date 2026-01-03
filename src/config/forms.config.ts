import type { FormInputType } from "@/types/form-input.ts";

export const addCategoryFormConfig: FormInputType[] = [
  {
    type: "text",
    name: "category_name",
    kind: "text",
    placeholder: "Category Name",
  },
  {
    type: "dropdown",
    name: "variant_type_ids",
    kind: "dropdown",
    placeholder: "Variant Type",
  },
];
