import type {ValidationErrorMessage} from "@/types/api-response.ts";
import type {Ref} from "vue";

export function useValidationErrors(errors: Ref<ValidationErrorMessage>) {
    const getErrorMessage = (key: string) => {
        return errors.value[key]?.[0] || "";
    };

    return { getErrorMessage };
}