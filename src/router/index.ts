import {createRouter, createWebHistory} from "vue-router";
import {appRouter} from "@/router/app-route.ts";
import NotFoundView from "@/views/NotFoundView.vue";
import {authGuard} from "@/router/guards/auth-guards.ts";
import {publicRoutes} from "@/router/public-routes.ts";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...publicRoutes,
        appRouter,
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: NotFoundView,
            meta: {
                requiresAuth: false,
                title: "Page not found",
            }
        }

    ],
});

router.beforeEach(authGuard)

export default router;
