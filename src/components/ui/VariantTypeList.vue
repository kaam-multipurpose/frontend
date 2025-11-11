<script setup lang="ts">
import { ref } from 'vue';
import { CheckCircle2Icon, ChevronDown, CircleAlertIcon, Edit2Icon, PlusCircleIcon, Trash2Icon, TrendingUpDown, XIcon } from 'lucide-vue-next';
import type { VariantTypeItem } from '@/types/variant-type-response';
import { VariantsTypeService } from '@/services/VariantsTypeService';

const { name, slug, id, values } = defineProps<VariantTypeItem>();
const emit = defineEmits<{ variantChanged: [] }>();
const isOpen = ref(false);
const addNewVariantTypeValue = ref(false)
const isLoading = ref(false)
const variantValueInput = ref<string>("");
const variantValuesArray = ref<string[]>([]);

const deleteVariantModal = ref<HTMLDialogElement | null>(null);

console.log(deleteVariantModal);


const addVariantValue = () => {
    const trimmed = variantValueInput.value.trim();
    if (trimmed && !variantValuesArray.value.includes(trimmed)) {
        variantValuesArray.value.push(trimmed);
    }
    variantValueInput.value = "";
};

const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
        e.preventDefault();
        addVariantValue();
    }
};

const removeVariantValue = (value: string) => {
    variantValuesArray.value = variantValuesArray.value.filter(v => v !== value);
};

const toggleAccordion = () => {
    isOpen.value = !isOpen.value;
};

const toggleAddVariant = () => {
    addNewVariantTypeValue.value = !addNewVariantTypeValue.value
}
const saveNewVariantValues = async () => {
    isLoading.value = true;
    const addVariantValue = await VariantsTypeService.addValueToVariantType(slug, variantValuesArray.value);
    if (addVariantValue[0].success) {
        isLoading.value = false;
        emit('variantChanged');
    } else {

    }
}

const handleDeleteVariantType = async () => {
    isLoading.value = true;
    const res = await VariantsTypeService.deleteVariantType(slug);
    isLoading.value = false;
    emit('variantChanged');
};


const handleDeleteValue = async (valueSlug: string) => {
    isLoading.value = true;
    const removeVariantValue = await VariantsTypeService.deleteValueFromVariantType(slug, valueSlug)
    isLoading.value = false;
    emit('variantChanged');
}

const handlePlusCLick = () => {
    if (addNewVariantTypeValue && variantValuesArray.value.length > 0) {
        saveNewVariantValues()
    } else {
        toggleAddVariant()
    }
}

</script>

<template>
    <div class="relative group w-full">
        <div class="relative collapse bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300"
            :class="{ 'collapse-open': isOpen }">

            <div class="collapse-title cursor-pointer" @click="toggleAccordion">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                            <TrendingUpDown class="w-5 h-5 text-primary-content" />
                        </div>
                        <div>
                            <h3 class="text-lg font-bold text-base-content tracking-tight">{{ name }}</h3>
                            <p class="text-xs text-base-content/60 mt-0.5">{{ values?.length || 0 }} options available
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-lg bg-base-200 flex items-center justify-center transition-all duration-300"
                            :class="{ 'bg-primary/20': isOpen }">
                            <ChevronDown
                                :class="['w-5 h-5 transition-all duration-300 text-base-content/70', { 'rotate-180 !text-primary': isOpen }]" />
                        </div>
                        <button
                            class="w-8 h-8 rounded-lg bg-red-100 opacity-0 group-hover:opacity-100 hover:bg-red-200 flex items-center justify-center transition cursor-pointer"
                            @click.stop="deleteVariantModal?.showModal()">
                            <Trash2Icon class="w-4 h-4 text-red-600" />
                        </button>
                    </div>
                </div>
            </div>

            <div class="collapse-content" v-show="isOpen">
                <div class="w-full h-px bg-gradient-to-r from-transparent via-base-300 to-transparent mb-4"></div>

                <div class="flex flex-wrap gap-6 pb-2">
                    <div v-for="value in values" :key="value.id"
                        class="flex items-center gap-2 px-3 py-1 bg-base-200 border border-base-300 rounded-full hover:border-primary hover:bg-primary/10 transition">
                        <span class="text-md font-medium text-base-content/80">
                            {{ value.name }}
                        </span>
                        <div class="flex items-center gap-1 transition-opacity">
                            <button @click="" class="hover:text-primary">
                                <Edit2Icon class="w-4 h-4" />
                            </button>
                            <button @click="handleDeleteValue(value.slug)" class="hover:text-red-500 cursor-pointer">
                                <Trash2Icon class="w-4 h-4" />
                            </button>
                        </div>
                    </div>


                    <!-- Variant Values Input -->
                    <div v-if="addNewVariantTypeValue">
                        <div
                            class="flex flex-wrap items-center gap-2 p-2 border rounded-lg focus-within:ring-2 ring-primary/50">
                            <!-- Pills -->
                            <span v-for="(value, i) in variantValuesArray" :key="i"
                                class="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full flex items-center gap-2">
                                {{ value }}
                                <button type="button"
                                    class="text-primary hover:text-red-500 focus:outline-none cursor-pointer"
                                    @click="removeVariantValue(value)">
                                    ×
                                </button>
                            </span>

                            <!-- Input -->
                            <input v-model="variantValueInput" @keydown="handleKeydown" type="text"
                                class="flex-1 outline-none p-1 bg-transparent text-sm"
                                placeholder="Type and press Enter, Tab or comma" />
                        </div>
                    </div>

                    <button @click="handlePlusCLick"
                        class="w-11 h-11 rounded-lg cursor-pointer bg-primary/35 flex items-center justify-center transition-all duration-300 disabled:opacity-20"
                        :disabled="isLoading">
                        <span v-if="isLoading" class="loading loading-bars loading-md lg:loading-lg">
                        </span>
                        <CheckCircle2Icon class="w-7 h-7 transition-all duration-300 text-base-content/70"
                            v-else-if="addNewVariantTypeValue && variantValuesArray.length > 0" />
                        <XIcon class="w-7 h-7 transition-all duration-300 text-base-content/70"
                            v-else-if="addNewVariantTypeValue" />
                        <PlusCircleIcon class="w-7 h-7 transition-all duration-300 text-base-content/70" v-else />
                    </button>
                </div>
            </div>
        </div>
    </div>

    <dialog ref="deleteVariantModal" id="deleteVariantModal" class="modal">
        <div class="modal-box w-full max-w-lg">
            <CircleAlertIcon class="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 class="text-lg font-semibold uppercase mb-4 text-center">Are you sure you want to delete {{ name }}??
            </h2>
            <!-- Actions -->
            <div class="modal-action mt-6 flex justify-end gap-3">
                <form method="dialog">
                    <button class="btn btn-outline">Cancel</button>
                </form>
                <button type="button" @click="handleDeleteVariantType" class="btn btn-primary" :disabled="isLoading">
                    <span v-if="isLoading" class="loading loading-bars loading-md lg:loading-lg">
                    </span>
                    <span v-else>
                        Delete Variant Type
                    </span>
                </button>
            </div>
        </div>

        <!-- Click outside to close -->
        <form method="dialog" class="modal-backdrop">
            <button>Close</button>
        </form>
    </dialog>

</template>

<style scoped>
.collapse-title::after {
    display: none;
}

.collapse-content {
    scrollbar-width: thin;
    scrollbar-color: oklch(var(--p) / 0.3) transparent;
}

.collapse-content::-webkit-scrollbar {
    width: 6px;
}

.collapse-content::-webkit-scrollbar-track {
    background: transparent;
}

.collapse-content::-webkit-scrollbar-thumb {
    background-color: oklch(var(--p) / 0.3);
    border-radius: 3px;
}

.collapse-content::-webkit-scrollbar-thumb:hover {
    background-color: oklch(var(--p) / 0.5);
}
</style>