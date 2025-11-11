<script setup lang="ts">
import AddVariantModal from '@/components/layout/AddVariantTypeModal.vue';
import AppPagination from '@/components/ui/AppPagination.vue';
import VariantsSkeleton from '@/components/ui/preloaders/VariantsSkeleton.vue';
import VariantTypeList from '@/components/ui/VariantTypeList.vue';
import { VariantsTypeService } from '@/services/VariantsTypeService';
import type { VariantTypeResponseDto } from '@/types/variant-type-response';
import { PlusCircle } from 'lucide-vue-next';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const perPage = ref(Number(route.query.perPage) || 10);
const row = ref(Number(route.query.row) || 4);
const page = ref(Number(route.query.page) || 1);

const variants = ref<any[]>([]);
const pagination = ref<any>(null);
const loading = ref(false);

const variantChanged = ref(false);

const fetchVariants = async () => {
    loading.value = true;
    const response: VariantTypeResponseDto = await VariantsTypeService.getVariantsType(
        perPage.value,
        page.value
    );
    variants.value = response[0]?.data || [];
    pagination.value = response[0]?.meta || null;
    loading.value = false;
};

onMounted(fetchVariants);

watch(
    [() => route.query, variantChanged],
    async ([query, variantChanged]) => {
        page.value = Number(query.page) || 1;
        perPage.value = Number(query.perPage) || 10;
        row.value = Number(query.row) || 4;
        await fetchVariants();
    },
    { deep: true }
);

const showAddVariantModal = () => {
    const modal = document.getElementById('addVariantModal') as HTMLDialogElement;
    modal.showModal();
};

const goToPage = (newPage: number) => {
    router.push({
        query: {
            ...route.query,
            page: newPage.toString()
        },
    });
};

const rowsPerPageOptions = [5, 10, 15, 20, 25, 30, 50];
</script>

<template>
    <main class="p-4 px-8 md:px-24">
        <div class="flex items-center justify-between mb-8">
            <h1 class="text-2xl md:text-4xl">Variants View</h1>
            <div class="flex items-center justify-end gap-4 flex-wrap">
                <button class="btn btn-primary" @click="showAddVariantModal">
                    Add Variant Type
                    <PlusCircle class="w-5 h-5 ml-2" />
                </button>
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn m-1">
                        Rows per page: {{ perPage }}
                    </div>
                    <p class="text-xs absolute right-0 text-[#c0c0c0]">Showing {{ variants.length }} rows out of {{
                        pagination?.total }}</p>
                    <ul tabindex="0" class="dropdown-content w-full menu p-2 shadow bg-base-100 rounded-box">
                        <li v-for="option in rowsPerPageOptions" :key="option">
                            <button @click="
                                () => {
                                    perPage = option;
                                    router.push({
                                        query: {
                                            ...route.query,
                                            perPage: option.toString(),
                                            page: '1',
                                        },
                                    });
                                }
                            ">
                                {{ option }} Rows
                            </button>
                        </li>
                    </ul>
                </div>

            </div>
        </div>

        <div class="flex flex-col items-center justify-center gap-4">
            <VariantsSkeleton v-if="loading" :count="perPage" />
            <VariantTypeList v-else v-for="variant in variants" :key="variant.id" v-bind="variant"
                @variantChanged="variantChanged = !variantChanged" />
        </div>
        <AppPagination v-if="pagination" :meta="pagination" :onPageChange="goToPage" />
    </main>
    <AddVariantModal @variantChanged="variantChanged = !variantChanged" />
</template>
