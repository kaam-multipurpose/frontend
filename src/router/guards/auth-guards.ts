import type {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import {useUserSessionStore} from "@/stores/user-session-store.ts";

export function authGuard( to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext  ) {

    const PUBLIC_ROUTES = new Set(["Login", "ForgetPassword"]);

    const userSessionStore = useUserSessionStore();
    const isAuthenticated = userSessionStore.isAuthenticated;

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isPublicRoute = PUBLIC_ROUTES.has(to.name as string);

    if (
        !isAuthenticated &&
        requiresAuth &&
        !isPublicRoute
    ) {
        next({
            name: "Login",
        })
    } else if (
        isAuthenticated &&
        !requiresAuth &&
        isPublicRoute
    ) {
        next({
            name: "Dashboard",
        })
    } else {
        next()
    }
}