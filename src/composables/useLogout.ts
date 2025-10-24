import {ref} from "vue";
import {AuthService} from "@/services/AuthService.ts";
import {useUserSessionStore} from "@/stores/user-session-store.ts";
import {useRouter} from "vue-router";

export function useLogout() {
    const isLoading = ref<boolean>(false);
    const hasError = ref<boolean>(false);
    const message = ref<string>("");
    const router = useRouter();

    async function handleLogout() {
        isLoading.value = true;
        hasError.value = false;
        message.value = "";

        const userSession = useUserSessionStore();
        const {logout} = userSession;

        const {message: responseMessage, success: responseSuccess} = await AuthService.logout();
        message.value = responseMessage;
        hasError.value = !responseSuccess;
        if (responseSuccess) {
            logout();
            router.push({"name": "Login"});
        }
        isLoading.value = false;
    }

    return {
        isLoading,
        handleLogout,
        hasError,
        message,
    }
}