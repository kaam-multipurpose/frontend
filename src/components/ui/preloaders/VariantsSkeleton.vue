<script setup lang="ts">
defineProps<{
    count?: number;
}>();
</script>

<template>
    <div v-for="i in (count || 5)" :key="i" class="relative group w-full">
        <div class="relative bg-base-100 rounded-2xl shadow-lg border border-base-300 p-4 animate-pulse">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3 flex-1">
                    <!-- Icon skeleton -->
                    <div class="w-10 h-10 rounded-xl bg-base-300"></div>

                    <div class="flex-1">
                        <!-- Title skeleton -->
                        <div class="h-5 bg-base-300 rounded w-32 mb-2"></div>
                        <!-- Subtitle skeleton -->
                        <div class="h-3 bg-base-300 rounded w-24"></div>
                    </div>
                </div>

                <!-- Chevron skeleton -->
                <div class="w-8 h-8 rounded-lg bg-base-300"></div>
            </div>
        </div>
    </div>
</template>