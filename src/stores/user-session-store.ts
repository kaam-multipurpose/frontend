import {defineStore} from "pinia";
import {ref, computed} from "vue";
import type {UserType} from "@/types/users.ts";
import {AuthService} from "@/services/AuthService.ts";

export const useUserSessionStore = defineStore('sessionStore', () => {
    const token = ref<string | null>(null)
    const user = ref<UserType | null>(null)
    const expiresAt = ref<string | null>(null)
    const permissions = ref<string[]>([]);
    let refreshTimer: ReturnType<typeof setTimeout> | null = null;


    const isAuthenticated = computed(() => {
        return expiresAt.value && Date.now() < new Date(expiresAt.value).getTime();
    });


    const initial = computed(() => {
        const first = user.value?.first_name?.[0] ?? '';
        const last = user.value?.last_name?.[0] ?? '';
        return first + last;
    });

    function setUser(newUser: UserType, newPermissions: string[]) {
        user.value = newUser;
        permissions.value = newPermissions;
    }

    function setToken(newToken: string, newExpiresAt: string) {
        token.value = newToken;
        expiresAt.value = newExpiresAt;
        scheduleRefresh();
    }

    function logout() {
        if (refreshTimer) clearTimeout(refreshTimer);

        token.value = null;
        user.value = null;
        expiresAt.value = null;
        permissions.value = [];
    }

    function scheduleRefresh() {
        if (refreshTimer) clearTimeout(refreshTimer);

        if (!expiresAt.value) return;

        const expiryTime = new Date(expiresAt.value).getTime();
        const now = Date.now();
        const buffer = 60 * 1000;
        const delay = expiryTime - now - buffer;

        if (delay > 0) {
            refreshTimer = setTimeout(async () => {
                const response = await AuthService.refreshToken();
                if (response.token && response.expires_at) {
                    setToken(response.token, response.expires_at);
                    scheduleRefresh()
                } else {
                    logout();
                }
            }, delay);
        }
    }

    return {
        token,
        user,
        isAuthenticated,
        permissions,
        expiresAt,
        initial,
        setUser,
        setToken,
        logout,
        scheduleRefresh,
    }
}, {
    persist: {
        pick: [
            "token",
            "expiresAt",
            "permissions",
            "user"
        ]
    }
})