<script setup lang="ts">

import {useLogout} from "@/composables/useLogout.ts";
import AppToast from "@/components/ui/AppToast.vue";

const {handleLogout, hasError, message, isLoading} = useLogout();

</script>

<template>

  <button class="btn btn-error " :disabled="isLoading" @click="handleLogout">
    <span v-if="isLoading" class="loading loading-bars loading-md lg:loading-lg">
    </span>
    <span v-else>
      Logout
    </span>
  </button>

  <AppToast :message="message" :isError="hasError"/>

</template>
