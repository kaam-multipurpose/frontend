<script setup lang="ts">
import { ChevronLeft, PenIcon, PlusCircle } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import type { CategoryResponseDto } from "@/types/category-response";
import { CategoryService } from "@/services/CategoryService";
import { useRoute, useRouter } from "vue-router";
import VariantsSkeleton from "@/components/ui/preloaders/VariantsSkeleton.vue";
import VariantTypeList from "@/components/ui/VariantTypeList.vue";
import AddSubcategoryModal from "@/components/ui/modals/AddSubcategoryModal.vue";
import CategoryCard from "@/components/ui/CategoryCard.vue";
import AddCategoryModal from "@/components/ui/modals/AddCategoryModal.vue";

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const category = ref<any>();
const pagination = ref<any>(null);

const categoryChanged = ref(false);

const editModal = ref(false);
const categoryId = ref<number | null>(null);
const categoryName = ref<string>('');
const variantsId = ref<number[]>([]);

const showAddSubCategoryModal = () => {
  const modal = document.getElementById('addSubcategoryModal') as HTMLDialogElement;
  modal.showModal();
};
const showEditCategoryModal = () => {
  const modal = document.getElementById('addCategoryModal') as HTMLDialogElement;
  editModal.value = true;
  categoryId.value = category.value.id;
  categoryName.value = category.value.name;
  variantsId.value = category.value.variant_types.map((v: any) => v.id);
  modal.showModal();
};

defineEmits(["update:modelValue"]);


const fetchCategory = async () => {
  loading.value = true;
  const response: CategoryResponseDto = await CategoryService.getCategory(
    route.query.slug as string
  );
  category.value = response?.data || [];
  console.log(response?.data);
  pagination.value = response?.meta || null;
  loading.value = false;
};

onMounted(fetchCategory);
</script>

<template>
  <main class="min-h-screen bg-base-100">
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- Back Navigation -->
      <button
        class="inline-flex items-center cursor-pointer gap-1.5 text-sm font-medium text-base-content/70 hover:text-base-content transition-colors mb-2 group"
        @click="router.push({ name: 'Categories' })">
        <ChevronLeft class="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        <span>Back to Categories</span>
      </button>
      <div
        class="flex flex-col mb-4 border-y border-base-300 py-3 gap-6 sm:flex-row sm:items-center sm:justify-between">
        <!-- Title Section -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-3 mb-2">
            <h1 class="text-2xl font-semibold text-base-content tracking-tight"
              :class="{ 'h-8 w-48 bg-base-300 animate-pulse rounded': loading }">
              {{ category?.name }}
            </h1>
          </div>
          <div class="flex items-center gap-2">
            <span
              class="inline-flex items-center px-2.5 py-1 rounded-md bg-base-200 text-xs font-mono text-base-content/70"
              :class="{ 'h-5 w-60 bg-base-300 animate-pulse rounded': loading }">
              {{ category?.slug && "/categories/details?" + category?.slug }}
            </span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-3 flex-shrink-0">
          <button class="btn btn-ghost gap-2 normal-case font-medium" @click="showEditCategoryModal">
            <PenIcon class="h-4 w-4" />
            <span class="hidden sm:inline">Edit</span>
          </button>
          <button class="btn btn-primary gap-2 normal-case font-medium shadow-sm" @click="showAddSubCategoryModal">
            <PlusCircle class="h-4 w-4" />
            <span>Add Subcategory</span>
          </button>
        </div>
      </div>

      <!-- Variants Section -->
      <div class="mb-5">
        <h2 class="text-lg font-semibold text-base-content mb-1">
          Category Variants
        </h2>
        <p class="text-sm text-base-content/60">
          Manage variant types for this category
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-max">
        <VariantsSkeleton v-if="loading" :count="4" />
        <VariantTypeList v-else v-for="variant in category?.variant_types" :key="variant.id" v-bind="variant"
          view-only />
      </div>

      <!-- Subcategories Section -->
      <div class="my-5">
        <h2 class="text-lg font-semibold text-base-content mb-1">
          Subcategories
        </h2>
        <p class="text-sm text-base-content/60">
          Manage subcategories for this category
        </p>
        <div v-if="category?.sub_categories.length === 0" class="text-center py-6">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-base-200 mb-4">
            <PlusCircle class="h-8 w-8 text-base-content/40" />
          </div>
          <h3 class="text-lg font-medium text-base-content mb-2">No categories yet</h3>
          <p class="text-sm text-base-content/60 mb-6">Get started by creating your first category</p>
          <button class="btn btn-primary gap-2" @click="showAddSubCategoryModal">
            <PlusCircle class="h-4 w-4" />
            Add Category
          </button>
        </div>
      </div>
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="i in 4" :key="i" class="bg-base-100 rounded-xl border border-base-300 p-5 animate-pulse">
          <div class="h-5 bg-base-300 rounded w-3/4 mb-3"></div>
          <div class="h-4 bg-base-300 rounded w-1/2 mb-4"></div>
          <div class="flex gap-4 mb-4">
            <div class="h-4 bg-base-300 rounded w-16"></div>
            <div class="h-4 bg-base-300 rounded w-16"></div>
          </div>
          <div class="h-8 bg-base-300 rounded"></div>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CategoryCard v-for="categoryItem in category?.sub_categories" :key="categoryItem.id" :category="categoryItem"
          no-view-button />
      </div>
    </div>
    <AddCategoryModal @category-changed="categoryChanged = !categoryChanged" :category-id="categoryId"
      :category-name="categoryName" :edit-modal="editModal" :variants-id="variantsId" />
    <AddSubcategoryModal :category-slug="category?.slug" />
  </main>
</template>

<style scoped></style>