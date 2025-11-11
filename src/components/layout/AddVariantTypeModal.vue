<script setup lang="ts">
import { ref } from "vue";
import FormInput from "../ui/FormInput.vue";
import { VariantsTypeService } from "@/services/VariantsTypeService";
import AppToast from "../ui/AppToast.vue";

const variantTypeName = ref<string>("");
const variantValueInput = ref<string>("");
const variantValuesArray = ref<string[]>([]);
const isLoading = ref<boolean>(false)
const toastMessage = ref<string>("")
const failedToAdd = ref<boolean>(false)

const emit = defineEmits<{ variantChanged: [] }>();


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

const submitVariant = async (e: Event) => {
    isLoading.value = true;
    const formElement = e.target as HTMLFormElement;
    if (variantValuesArray.value.length === 0) {
        isLoading.value = false;
        toastMessage.value = "Please add at least one variant value"
        failedToAdd.value = true
        return;
    }
    const variantData = {
        name: formElement.variant_name.value,
        values: variantValuesArray.value
    };

    const modal = document.getElementById("addVariantModal") as HTMLDialogElement

    const addVariant = await VariantsTypeService.createVariantType(variantData.name, variantData.values);
    console.log(addVariant);
    if (addVariant[0].success) {
        isLoading.value = false;
        toastMessage.value = "Variant Type Added Successfully"
        modal.close();
        emit('variantChanged');
    } else {
        isLoading.value = false;
        toastMessage.value = "Error Adding Variant Type"
    }
};
</script>

<template>
    <dialog id="addVariantModal" class="modal">
        <div class="modal-box w-full max-w-lg">
            <h2 class="text-lg font-semibold uppercase mb-4">Add a new variant type</h2>
            {{ variantTypeName }}
            <form class="space-y-4" @submit.prevent="submitVariant">
                <!-- Variant Name -->
                <FormInput label="Variant Name" name="variant_name" type="text" kind="text"
                    placeholder="Enter variant name" />

                <!-- Variant Values Input -->
                <div>
                    <label class="block text-sm font-medium mb-1">Variant Type Values</label>
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

                <!-- Actions -->
                <div class="modal-action mt-6 flex justify-end gap-3">
                    <form method="dialog">
                        <button class="btn btn-outline">Cancel</button>
                    </form>
                    <button type="submit" class="btn btn-primary" :disabled="isLoading">
                        <span v-if="isLoading" class="loading loading-bars loading-md lg:loading-lg">
                        </span>
                        <span v-else>
                            Add Variant Type
                        </span>
                    </button>
                </div>
            </form>
        </div>

        <!-- Click outside to close -->
        <form method="dialog" class="modal-backdrop">
            <button>Close</button>
        </form>
    </dialog>
    <AppToast :message="toastMessage" :isError="failedToAdd" />
</template>

<style scoped>
.modal-box {
    animation: scaleIn 0.25s ease;
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
