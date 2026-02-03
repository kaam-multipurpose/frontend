<script setup lang="ts">
import { MoreVertical, Edit, Trash2, Eye } from "lucide-vue-next";
import type { CategoryItem } from "@/types/category-response";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
    category: CategoryItem;
    noViewButton?: boolean;
}>();

const viewCategory = (slug: string) => {
    router.push(`categories/details?slug=${slug}`);
};
</script>
<template>
    <div class="group bg-base-100 rounded-xl shadow-md border border-base-300 p-5 hover:shadow-lg hover:border-base-content/20 transition-all duration-200 cursor-pointer"
        @click="!noViewButton && viewCategory(category.slug)">
        <!-- Header -->
        <div class="flex items-start justify-between mb-3">
            <div class="flex-1 min-w-0">
                <h3
                    class="font-semibold text-base-content text-base truncate group-hover:text-primary transition-colors">
                    {{ category.name }}
                </h3>
                <p class="text-xs text-base-content/60 font-mono mt-1">
                    /{{ category.slug }}
                </p>
            </div>
            <div class="dropdown dropdown-end" @click.stop>
                <div tabindex="0" role="button" class="btn btn-ghost btn-xs btn-square">
                    <MoreVertical class="h-4 w-4" />
                </div>
                <ul tabindex="0"
                    class="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-lg border border-base-300 w-40 mt-1">
                    <li v-if="!noViewButton">
                        <button class="text-sm gap-2" @click="viewCategory(category.slug)">
                            <Eye class="h-3.5 w-3.5" />
                            View
                        </button>
                    </li>
                    <li>
                        <button class="text-sm gap-2">
                            <Edit class="h-3.5 w-3.5" />
                            Edit
                        </button>
                    </li>
                    <li>
                        <button class="text-sm gap-2 text-error">
                            <Trash2 class="h-3.5 w-3.5" />
                            Delete
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Stats -->
        <div class="flex items-center gap-4" :class="{ 'mb-4': !noViewButton }">
            <div class="flex items-center gap-1.5">
                <div class="w-1.5 h-1.5 rounded-full bg-primary"></div>
                <span class="text-sm text-base-content/70 flex items-center gap-1.5">
                    <span class="font-medium text-base-content">{{ category.sub_category_count }}</span>
                    {{ category.sub_category_count === 1 ? 'subcategory' : 'subcategories' }}
                </span>
            </div>
            <div class="flex items-center gap-1.5">
                <div class="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                <span class="text-sm text-base-content/70 flex items-center gap-1.5">
                    <span class="font-medium text-base-content">{{ category.variant_type_count }}</span>
                    {{ category.variant_type_count === 1 ? 'variant' : 'variants' }}
                </span>
            </div>
        </div>

        <!-- Footer -->
        <div class="pt-3 border-t border-base-300" v-if="!noViewButton">
            <button
                class="btn btn-ghost btn-sm w-full gap-2 normal-case hover:text-white font-medium group-hover:btn-primary group-hover:text-primary transition-colors"
                @click.stop="viewCategory(category.slug)">
                <Eye class="h-3.5 w-3.5" />
                View Details
            </button>
        </div>
    </div>
</template>