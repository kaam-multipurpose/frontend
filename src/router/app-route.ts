import AppLayout from "@/layouts/AppLayout.vue";
import DashboardView from "@/views/app/DashboardView.vue";
import type {RouteRecordRaw} from "vue-router";

export const appRouter: RouteRecordRaw = {
    path: "/app",
    component: AppLayout,
    redirect: "/app/dashboard",
    children: [
        {
            path: "dashboard",
            name: "Dashboard",
            component: DashboardView,
            meta: {
             requiresAuth: true,
            }
        },
    ],
};