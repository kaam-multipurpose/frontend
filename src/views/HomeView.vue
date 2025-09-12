<script setup lang="ts">
import ThemeToggler from "@/components/ui/ThemeToggler.vue";
</script>

<template>
  <main class="p-4">
    <h4 class="text-3xl">Welcome to vue</h4>
   <div class="grid gap-4 w-max p-6">
     <button class="btn btn-primary md:btn-md lg:btn-lg xl:btn-xl">Button</button>
     <button class="btn btn-primary btn-ghost md:btn-md lg:btn-lg xl:btn-xl">Button</button>
     <button class="btn btn-outline btn-primary md:btn-md lg:btn-lg xl:btn-xl">Button</button>
   </div>

    <ThemeToggler />

  </main>
</template>
