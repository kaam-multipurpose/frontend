<script setup lang="ts">

import AppSidebar from "@/components/layout/AppSidebar.vue";
import AppHeader from "@/components/layout/AppHeader.vue";
</script>

<template>
  <main class="md:grid md:grid-cols-[auto_1fr]">
    <AppSidebar />
    <div class="main">
     <AppHeader />
      <div class="view">
        <RouterView/>
      </div>
    </div>
  </main>
</template>

