<script setup lang="ts">

import {EyeIcon, EyeOffIcon} from "lucide-vue-next";

const showPassword = defineModel("showPassword");
</script>

<template>
  <button
      type="button"
      @click="showPassword = !showPassword"
      class="cursor-pointer text-gray-500 hover:text-gray-700"
  >
    <EyeIcon v-if="!showPassword"/>
    <EyeOffIcon v-else/>
  </button>
</template>