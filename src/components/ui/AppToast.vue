<script setup lang="ts">
import {computed} from "vue";

const {message, isError} = defineProps<{
  message: string | null;
  isError: boolean;
}>();

const statusClass = computed(() =>
    isError ? "alert-error" : "alert-success"
);

</script>

<template>
  <div class="toast toast-top" v-if="message">
    <div class="alert alert-soft" :class="statusClass">
      <span class="text-2xl">{{ message }} !!!</span>
    </div>
  </div>
</template>
