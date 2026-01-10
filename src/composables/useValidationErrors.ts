import type {ValidationErrorMessage} from "@/types/api-response.ts";
import type {Ref} from "vue";

export function useValidationErrors(errors: Ref<ValidationErrorMessage | null>) {
    const getErrorMessage = (key: string) => {
        if (!errors.value) return "";
        return errors.value[key]?.[0] || "";
    };

    return { getErrorMessage };
}