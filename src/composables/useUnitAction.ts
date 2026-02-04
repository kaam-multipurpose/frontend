import {UnitService} from "@/services/UnitService.ts";
import type {AddUnitResponse, UnitType} from "@/types/unit-type-response.ts";
import {ref} from "vue";
import type {ValidationErrorMessage} from "@/types/api-response.ts";

export function useUnitAction() {
    const loading = ref<boolean>(false);
    const errors = ref<ValidationErrorMessage | null>(null);
    const message = ref<string | null>(null);
    const data = ref<UnitType|null>(null);
    const success = ref<boolean| null>(null);

    async function performAction(formData: FormData, id: number | null = null) {
        loading.value = true;

        let response: AddUnitResponse | null = null;
        if (id == null) {
            response = await UnitService.addUnit(formData);
        } else {
            response = await UnitService.editUnit(formData, id);
        }

        message.value = response?.message ?? null;
        success.value = response?.success ?? false;

        if ( response?.success ) {
            data.value = response.data;
        }else {
            errors.value = response?.errors ?? null;
        }

        loading.value = false;
    }

    function reset() {
        loading.value = false;
        errors.value = null;
        message.value = null;
        data.value = null;
        success.value = null;
    }

    return {
        performAction,
        reset,
        loading,
        errors,
        data,
        message,
        success
    }
}