import {ref} from "vue";
import {useRouter} from "vue-router";
import {AuthService} from "@/services/AuthService.ts";
import type {ValidationErrorMessage} from "@/types/api-response.ts";

export function useLogin() {
    const isLoading = ref(false);
    const errors = ref<ValidationErrorMessage>({});
    const hasErrors = ref(false);
    const globalMessage = ref<string | null>(null);
    const router = useRouter();

    async function handleLogin(e: Event) {
        isLoading.value = true;
        globalMessage.value = null;
        hasErrors.value = false;
        errors.value = {};

        const formField = e.target as HTMLFormElement;
        const formData = new FormData(formField);
        const loginService = await AuthService.login(formData);

        if (loginService.hasErrors) {
            hasErrors.value = true;
            errors.value = loginService.errors ?? {};
        } else {
            router.push({name: "Dashboard"});
        }

        globalMessage.value = loginService.message;
        isLoading.value = false;
    }

    return {
        isLoading,
        errors,
        hasErrors,
        globalMessage,
        handleLogin,
    };
}