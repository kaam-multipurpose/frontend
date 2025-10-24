<script setup lang="ts">

import ThemeToggler from "@/components/ui/ThemeToggler.vue";
import {Menu, Settings, Bell, User } from "lucide-vue-next";
import {useSidebarStateStore} from "@/stores/sidebar-state-store.ts";
import LogoutModal from "@/components/layout/LogoutModal.vue";
import AppHeaderAvatar from "@/components/ui/AppHeaderAvatar.vue";

const sidebarStore = useSidebarStateStore();
const {open} = sidebarStore;
</script>

<template>
  <header class="sticky top-0 bg-base-100 p-4 flex justify-between items-center gap-4">
    <button
        class="btn btn-circle btn-primary hover:text-white transition duration-200 md:hidden"
        aria-label="Toggle Menu"
        @click="open"
    >
      <Menu class="w-5 h-5"/>
    </button>
    <div class="flex-1 flex justify-end items-center gap-4 flex-wrap">
      <ThemeToggler/>
      <Settings/>
      <Bell/>
      <AppHeaderAvatar />
    </div>
  </header>

  <LogoutModal />

</template>
