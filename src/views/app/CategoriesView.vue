<script setup lang="ts">
import { ChevronDown, PlusCircle, Search } from "lucide-vue-next";
import AddCategoryModal from "@/components/ui/modals/AddCategoryModal.vue";
import SearchInput from "@/components/ui/SearchInput.vue";
import { computed, onMounted, ref, watch } from "vue";
import Table from "@/components/layout/Table.vue";
import type { CategoryResponseDto } from "@/types/category-response";
import { CategoryService } from "@/services/CategoryService";
import { useRoute, useRouter } from "vue-router";
import { rowsPerPageOptions } from "@/config/pagination.config";

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
  categories.value = response[0]?.data || [];
  console.log(response[0]?.data);
  pagination.value = response[0]?.meta || null;
  loading.value = false;
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


const rows = computed(() =>
  categories.value.map(cat => ({
    id: cat.id,
    'Category Name': cat.name,
    'Slug': cat.slug,
    'Subcategories': cat.sub_category_count,
    'Variants': cat.variant_type_count,
    'Created At': cat.created_at || '-',
    'Actions': 'Edit/Delete',
  }))
);

const statuses = ['All', 'Active', 'Inactive', 'Archived'];
const timeSorts = ['Newest', 'Oldest'];
</script>

<template>
  <main class="py-4 px-4 sm:px-8">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl">Categories</h2>
      <button class="btn btn-primary flex items-center justify-center" @click="showAddCategoryModal">
        <PlusCircle class="mr-2" />
        <span>Add Category</span>
      </button>
    </div>
    <div class="flex items-center mt-3 justify-between flex-wrap">
      <div class="flex items-center justify-start gap-5">
        <SearchInput placeholder="Start typing to search..." />
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn m-1">
            {{ status }}
            <ChevronDown class="ml-2 h-4 w-4" />
          </div>
          <ul tabindex="0" class="dropdown-content w-full menu p-2 shadow-md bg-base-200 rounded-box">
            <li v-for="option in statuses" :key="option">
              <button @click="
                () => {
                  status = option;
                }
              ">
                {{ option }}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex items-center mt-3 justify-between flex-wrap">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn m-1">
            Rows per page: {{ perPage }}
          </div>
          <p class="text-xs absolute right-0 text-[#c0c0c0]">Showing {{ categories.length }} rows out of {{
            pagination?.total }}</p>
          <ul tabindex="0" class="dropdown-content w-full menu p-2 shadow bg-base-100 rounded-box">
            <li v-for="option in rowsPerPageOptions" :key="option">
              <button @click="changeRowsPerPage(option)">
                {{ option }} Rows
              </button>
            </li>
          </ul>
        </div>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn m-1">
            {{ selectedTimeSort }}
            <ChevronDown class="ml-2 h-4 w-4" />
          </div>
          <ul tabindex="0" class="dropdown-content w-full menu p-2 shadow-md bg-base-200 rounded-box">
            <li v-for="option in timeSorts" :key="option">
              <button @click="() => { selectedTimeSort = option; }">
                {{ option }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Table v-if="rows.length" :headers="['Category Name', 'Slug', 'Subcategories', 'Variants', 'Created At', 'Actions']"
      :rows="rows" show-index class="mt-4" :loading="loading" :skeleton-rows="perPage" />


    <AddCategoryModal @category-changed="categoryChanged = !categoryChanged" />
  </main>

</template>

<style scoped></style>