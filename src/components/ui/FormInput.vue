<script setup lang="ts">

import { computed, ref } from 'vue';
import type { FormInputType } from "@/types/form-input.ts";
import ShowPasswordButton from "@/components/ui/ShowPasswordButton.vue";

const showPassword = ref<boolean>(false);
const {
  label,
  kind,
  type,
  name,
  placeholder,
  error = null,
  modelValue
} = defineProps<FormInputType>();


const inputClasses = computed(() => [
  'transition-colors duration-200',
  kind === 'password' ? 'pr-12' : '',
]);


const emit = defineEmits(["update:modelValue"]);

const convertType = computed<string>(() => {
  if (kind === 'password') {
    return showPassword.value ? 'text' : 'password';
  }
  return type;
})

</script>

<template>
  <div class="w-full">

    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
    </label>

    <div class="relative w-full">
      <input :type="convertType" :name="name" :placeholder="placeholder"
        class="input input-md lg:input-lg w-full" :class="inputClasses" :value="modelValue" />

      <div v-if="kind === 'password'" class="absolute right-0 top-1/2 -translate-y-1/2 z-10 px-4">
        <ShowPasswordButton v-if="kind === 'password'" v-model:showPassword="showPassword" />
      </div>
    </div>

    <label v-if="error" class="label">
      <span class="label-text-alt text-red-500">{{ error }}</span>
    </label>
  </div>
</template>