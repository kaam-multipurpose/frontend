import AppLayout from "@/layouts/AppLayout.vue";
import DashboardView from "@/views/app/DashboardView.vue";
import VariantsView from "@/views/app/VariantsTypeView.vue";
import type { RouteRecordRaw } from "vue-router";
import UnitView from "@/views/app/UnitView.vue";
import CategoriesView from "@/views/app/CategoriesView.vue";
import CategoryDetails from "@/views/app/CategoryDetails.vue";

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
      },
    },
    {
      path: "variant-types",
      name: "Variants",
      component: VariantsView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "units",
      name: "Units",
      component: UnitView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "categories",
      name: "Categories",
      component: CategoriesView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "categories/details",
      name: "Category Details",
      component: CategoryDetails,
      meta: {
        requiresAuth: true,
      },
    },
  ],
};
