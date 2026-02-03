<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import type { VariantTypeResponseDto } from "@/types/variant-type-response.ts";
import { VariantsTypeService } from "@/services/VariantsTypeService.ts";
import { addSubcategoryFormConfig } from "@/config/forms.config.ts";
import type { FormInputType } from "@/types/form-input.ts";
import FormInput from "@/components/ui/FormInput.vue";
import { CategoryService } from "@/services/CategoryService";
import { toast } from "vue-sonner";

const variants = ref<any[]>([]);
const selectedVariants = ref<any[]>([]);
const search = ref("");
const inputs: FormInputType[] = addSubcategoryFormConfig;
const perPage = ref(20);
const page = ref(1);
const loading = ref(false);
const dropdownOpen = ref(false);
const hasAdditionalVariants = ref(false);

const { categorySlug } = defineProps<{
    categorySlug?: string;
}>();

const emit = defineEmits<{ categoryChanged: [] }>();

const fetchVariants = async (reset = false) => {
    if (loading.value) return;

    loading.value = true;

    if (reset) {
        page.value = 1;
        variants.value = [];
    }

    const response: VariantTypeResponseDto =
        await VariantsTypeService.getVariantsType(
            perPage.value,
            page.value,
        );

    const data = response[0]?.data || [];
    variants.value.push(...data);

    loading.value = false;
};

const submitForm = async (e: Event) => {
    const formdata = e.target as HTMLFormElement;
    const categoryData = {
        name: formdata.category_name.value,
        variant_type_ids: hasAdditionalVariants.value ? selectedVariants.value.map(v => v.id) : []
    };

    const modal = document.getElementById("addSubcategoryModal") as HTMLDialogElement

    loading.value = true;
    const addCategory = await CategoryService.addSubcategory(categoryData.name, categoryData.variant_type_ids, categorySlug, hasAdditionalVariants.value);

    if (addCategory.success) {
        loading.value = false;
        toast.success("Subcategory Added Successfully")
        modal.close();
        emit('categoryChanged');
        // Reset form
        hasAdditionalVariants.value = false;
        selectedVariants.value = [];
    } else {
        loading.value = false;
        toast.error("Error Adding Subcategory")
    }
};

const addVariant = (variant: any) => {
    if (selectedVariants.value.some(v => v.id === variant.id)) return;
    selectedVariants.value.push(variant);
};

const removeVariant = (id: number) => {
    selectedVariants.value = selectedVariants.value.filter(v => v.id !== id);
};

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};

const handleToggleChange = () => {
    if (!hasAdditionalVariants.value) {
        selectedVariants.value = [];
        dropdownOpen.value = false;
    }
};

watch(search, () => {
    fetchVariants(true);
});

onMounted(fetchVariants);
</script>

<template>
    <dialog id="addSubcategoryModal" class="modal">
        <div class="modal-box w-full max-w-lg overflow-visible">
            <h2 class="text-lg font-semibold uppercase mb-4">Add a Subcategory</h2>
            <form @submit.prevent="submitForm">
                <template v-for="(input, _index) in inputs" :key="_index">
                    <FormInput v-if="input.kind !== 'dropdown'" :kind="input.kind" :name="input.name"
                        :placeholder="input.placeholder" :type="input.type" class="mb-3" />
                </template>
                <div v-if="hasAdditionalVariants" class="form-control w-full mt-4">
                    <label class="label">
                        <span class="label-text">Variant Types</span>
                    </label>

                    <!-- Selected pills -->
                    <div class="flex flex-wrap gap-2 mb-2">
                        <span v-for="variant in selectedVariants" :key="variant.id" class="badge badge-primary gap-2">
                            {{ variant.name }}
                            <button class="ml-1" type="button" @click="removeVariant(variant.id)">
                                ✕
                            </button>
                        </span>
                    </div>

                    <!-- Custom dropdown with portal-like behavior -->
                    <div class="relative w-full">
                        <button class="btn btn-outline w-full justify-between" type="button" @click="toggleDropdown">
                            Select variant types
                            <span class="opacity-60">▼</span>
                        </button>

                        <!-- Dropdown content with fixed positioning -->
                        <div v-if="dropdownOpen"
                            class="fixed z-[9999] menu p-2 shadow-lg bg-base-100 rounded-box w-[calc(100%-4rem)] max-w-md max-h-64 overflow-y-auto border border-base-300"
                            :style="{
                                top: 'auto',
                                left: 'auto'
                            }">
                            <input v-model="search" class="input input-bordered w-full mb-2"
                                placeholder="Search variants…" type="text" />

                            <ul class="menu w-full">
                                <li v-for="variant in variants" :key="variant.id">
                                    <button type="button" @click="addVariant(variant); dropdownOpen = false">
                                        {{ variant.name }}
                                    </button>
                                </li>

                                <li v-if="loading" class="text-center opacity-60 py-2">
                                    Loading…
                                </li>

                                <li v-if="!loading && variants.length > 0">
                                    <button class="text-sm opacity-70" type="button" @click="page++; fetchVariants()">
                                        Load more
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col justify-start gap-1 mt-3">
                    <label for="hasAdditionalVariantTypes" class="text-[13px]">Has additional Variant Types?</label>
                    <input type="checkbox" :checked="false" v-model="hasAdditionalVariants" @change="handleToggleChange"
                        class="toggle toggle-primary" id="hasAdditionalVariantTypes" />
                </div>
                <!-- Actions -->
                <div class="modal-action mt-6 flex justify-end gap-3">
                    <form method="dialog">
                        <button class="btn btn-outline">Cancel</button>
                    </form>
                    <button type="submit" class="btn btn-primary" :disabled="loading">
                        <span v-if="loading" class="loading loading-bars loading-md lg:loading-lg">
                        </span>
                        <span v-else>
                            Add Subcategory
                        </span>
                    </button>
                </div>
            </form>
        </div>
        <!-- Click outside to close -->
        <form class="modal-backdrop" method="dialog" @click="dropdownOpen = false">
            <button>Close</button>
        </form>
    </dialog>
</template>

<style scoped>
.modal-box {
    animation: scaleIn 0.25s ease;
    overflow: visible !important;
}

@keyframes scaleIn {
    0% {
        transform: scale(0.9);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>