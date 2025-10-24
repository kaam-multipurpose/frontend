<script setup lang="ts">

import {LogOut} from "lucide-vue-next";

function showModal() {
  let modal = document.getElementById('logoutModal') as HTMLDialogElement;
  modal.showModal();
}

</script>

<template>
  <a class="link link-error flex items-center gap-2 text-lg font-semibold hover:underline cursor-pointer"
     @click="showModal"
  >
    <LogOut class="w-5 h-5"/>
    Logout
  </a>
</template>

<style scoped>

</style>