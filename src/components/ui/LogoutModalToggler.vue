<script setup lang="ts">

import {LogOut} from "lucide-vue-next";

function showModal() {
  let modal = document.getElementById('logoutModal') as HTMLDialogElement;
  modal.showModal();
}

</script>

<template>
  <button class="link link-error cursor-pointer"
     @click="showModal"
  >
    <LogOut class="w-5 h-5"/>
    Logout
  </button>
</template>

<style scoped>

</style>