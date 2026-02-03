<script setup lang="ts">
import { ChevronDown, PlusCircle, MoreVertical, Edit, Trash2, Eye } from "lucide-vue-next";
import AddCategoryModal from "@/components/ui/modals/AddCategoryModal.vue";
import SearchInput from "@/components/ui/SearchInput.vue";
import { computed, onMounted, ref, watch } from "vue";
import type { CategoryResponseDto } from "@/types/category-response";
import { CategoryService } from "@/services/CategoryService";
import { useRoute, useRouter } from "vue-router";
import { rowsPerPageOptions } from "@/config/pagination.config";
import CategoryCard from "@/components/ui/CategoryCard.vue";

const route = useRoute();
const router = useRouter();

const status = ref("All");
const selectedTimeSort = ref('Newest');
const loading = ref(false);
const categoryChanged = ref(false);

const perPage = ref(Number(route.query.perPage) || 10);
const page = ref(Number(route.query.page) || 1);

const categories = ref<any[]>([]);
const pagination = ref<any>(null);

const showAddCategoryModal = () => {
  const modal = document.getElementById('addCategoryModal') as HTMLDialogElement;
  modal.showModal();
};

const fetchCategories = async () => {
  loading.value = true;
  const response: CategoryResponseDto = await CategoryService.getCategories(
    perPage.value,
    page.value
  );
  categories.value = response?.data || [];
  console.log(response?.data);
  pagination.value = response?.meta || null;
  loading.value = false;
};

const viewCategory = (slug: string) => {
  router.push(`categories/details?slug=${slug}`);
};

onMounted(fetchCategories);

watch(
  [() => route.query, categoryChanged],
  async ([query, categoryChanged]) => {
    page.value = Number(query.page) || 1;
    perPage.value = Number(query.perPage) || 10;
    await fetchCategories();
  },
  { deep: true }
);

const changeRowsPerPage = (option: number) => {
  router.push({
    query: {
      ...route.query,
      perPage: option.toString(),
      page: '1',
    },
  });
};

const statuses = ['All', 'Active', 'Inactive', 'Archived'];
const timeSorts = ['Newest', 'Oldest'];
</script>

<template>
  <main class="min-h-screen bg-base-100 py-6 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 class="text-2xl font-semibold text-base-content">Categories</h1>
          <p class="text-sm text-base-content/60 mt-1">
            Manage your product categories and variants
          </p>
        </div>
        <button class="btn btn-primary gap-2 normal-case font-medium shadow-sm" @click="showAddCategoryModal">
          <PlusCircle class="h-4 w-4" />
          <span>Add Category</span>
        </button>
      </div>

      <!-- Filters Bar -->
      <div class="bg-base-100 rounded-xl border border-base-300 p-4 mb-6 shadow-sm">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <!-- Left side filters -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
            <div class="flex-1 max-w-md">
              <SearchInput placeholder="Search categories..." />
            </div>
            <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="btn btn-outline btn-sm gap-2 normal-case font-normal">
                <span class="text-base-content/70">Status:</span>
                <span class="font-medium">{{ status }}</span>
                <ChevronDown class="h-4 w-4 opacity-60" />
              </div>
              <ul tabindex="0"
                class="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-lg border border-base-300 w-40 mt-2">
                <li v-for="option in statuses" :key="option">
                  <button @click="status = option" class="text-sm">
                    {{ option }}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <!-- Right side controls -->
          <div class="flex items-center gap-3">
            <div class="text-xs text-base-content/60">
              Showing {{ categories.length }} of {{ pagination?.total || 0 }}
            </div>
            <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="btn btn-ghost btn-sm gap-2 normal-case font-normal">
                <span class="text-base-content/70">{{ perPage }} per page</span>
                <ChevronDown class="h-4 w-4 opacity-60" />
              </div>
              <ul tabindex="0"
                class="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-lg border border-base-300 w-36 mt-2">
                <li v-for="option in rowsPerPageOptions" :key="option">
                  <button @click="changeRowsPerPage(option)" class="text-sm">
                    {{ option }} rows
                  </button>
                </li>
              </ul>
            </div>
            <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="btn btn-ghost btn-sm gap-2 normal-case font-normal">
                <span>{{ selectedTimeSort }}</span>
                <ChevronDown class="h-4 w-4 opacity-60" />
              </div>
              <ul tabindex="0"
                class="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-lg border border-base-300 w-32 mt-2">
                <li v-for="option in timeSorts" :key="option">
                  <button @click="selectedTimeSort = option" class="text-sm">
                    {{ option }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Categories Grid -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="i in perPage" :key="i" class="bg-base-100 rounded-xl border border-base-300 p-5 animate-pulse">
          <div class="h-5 bg-base-300 rounded w-3/4 mb-3"></div>
          <div class="h-4 bg-base-300 rounded w-1/2 mb-4"></div>
          <div class="flex gap-4 mb-4">
            <div class="h-4 bg-base-300 rounded w-16"></div>
            <div class="h-4 bg-base-300 rounded w-16"></div>
          </div>
          <div class="h-8 bg-base-300 rounded"></div>
        </div>
      </div>

      <div v-else-if="categories.length === 0" class="text-center py-16">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-base-200 mb-4">
          <PlusCircle class="h-8 w-8 text-base-content/40" />
        </div>
        <h3 class="text-lg font-medium text-base-content mb-2">No categories yet</h3>
        <p class="text-sm text-base-content/60 mb-6">Get started by creating your first category</p>
        <button class="btn btn-primary gap-2" @click="showAddCategoryModal">
          <PlusCircle class="h-4 w-4" />
          Add Category
        </button>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
      </div>
    </div>

    <AddCategoryModal @category-changed="categoryChanged = !categoryChanged" />
  </main>
</template>

<style scoped></style>