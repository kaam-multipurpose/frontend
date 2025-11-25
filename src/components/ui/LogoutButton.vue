<script setup lang="ts">

import { useLogout } from "@/composables/useLogout.ts";
import { watch } from "vue";
import { toast } from "vue-sonner";

const { handleLogout, hasError, message, isLoading } = useLogout();
watch([message, hasError], () => {
  if (!message.value) return;

  if (hasError.value) {
    toast.error(message.value);
  } else {
    toast.success(message.value);
  }
});
</script>

<template>

  <button class="btn btn-error " :disabled="isLoading" @click="handleLogout">
    <span v-if="isLoading" class="loading loading-bars loading-md lg:loading-lg">
    </span>
    <span v-else>
      Logout
    </span>
  </button>

</template>
