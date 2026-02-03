<script setup lang="ts">

import AppSidebar from "@/components/layout/AppSidebar.vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import {useSidebarStateStore} from "@/stores/sidebar-state-store.ts";
import {computed} from "vue";

const store = useSidebarStateStore();

const hiddenToggle = computed(() => store.isSidebarOpen ? 'overflow-hidden' : '');

</script>

<template>
  <main class="md:grid md:grid-cols-[auto_1fr] md:!overflow-y-auto" :class="hiddenToggle">
    <AppSidebar />
    <div class="main grid grid-rows-[auto_1fr] h-screen">
     <AppHeader />
      <div class="view h-[100%] grid">
        <RouterView/>
      </div>
    </div>
  </main>
</template>

