import type {FormInputType} from "@/types/form-input.ts";

export const AddUnitFormConfig: FormInputType[] = [
    {
        name: "name",
        kind: "text",
        type:  "text",
        placeholder: "e.g Dozen",
        label: "Unit Name *"
    },
    {
        name: "symbol",
        kind: "text",
        type:  "text",
        placeholder: "e.g doz",
        label: "Symbol *",
    },
    {
        name: "quantity",
        kind: "number",
        type:  "number",
        placeholder: "e.g 12",
        label: "Quantity (optional)",
    }
]