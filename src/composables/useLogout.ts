import {ref} from "vue";
import {AuthService} from "@/services/AuthService.ts";
import {useUserSessionStore} from "@/stores/user-session-store.ts";
import {useRouter} from "vue-router";
import {StatusCodes} from "http-status-codes";

export function useLogout() {
    const isLoading = ref<boolean>(false);
    const hasError = ref<boolean>(false);
    const message = ref<string>("");
    const router = useRouter();

    function logoutAction() {
        const userSession = useUserSessionStore();
        const {logout} = userSession;

        logout();
        router.push({"name": "Login"});
    }

    async function handleLogout() {
        isLoading.value = true;
        hasError.value = false;
        message.value = "";


        const {message: responseMessage, success: responseSuccess, statusCode} = await AuthService.logout();
        message.value = responseMessage;
        hasError.value = !responseSuccess;

        if ((!responseSuccess && statusCode === StatusCodes.UNAUTHORIZED) || responseSuccess ) {
           logoutAction();
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