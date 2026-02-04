<script setup lang="ts">

</script>

<template>
  <ul class="list bg-base-100 rounded-box shadow-md">
    <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
      <h2 class="text-lg font-semibold">
        Existing Units (loading...)
      </h2>
    </li>

    <!-- Skeleton rows -->
    <template v-for="n in 5" :key="n">
      <li class="list-row flex items-center justify-between gap-4 p-4 border-b border-base-200">
        <div class="flex flex-col gap-2">
          <div class="skeleton h-5 w-32"></div>
          <div class="skeleton h-4 w-16"></div>
        </div>
        <div class="flex items-center gap-5">
          <div class="skeleton h-6 w-20 rounded-full"></div>
          <div class="flex gap-2">
            <div class="skeleton h-8 w-8 rounded"></div>
            <div class="skeleton h-8 w-8 rounded"></div>
          </div>
        </div>
      </li>
    </template>
  </ul>
</template>


<style scoped>

</style>