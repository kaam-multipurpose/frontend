<script setup lang="ts">
import { StepBackIcon, StepForwardIcon } from "lucide-vue-next";
import { computed } from "vue";

interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page?: number;
    total?: number;
}

const props = defineProps<{
    meta: PaginationMeta;
    onPageChange: (page: number) => void;
}>();

const emitPageChange = (page: number) => {
    if (page !== props.meta.current_page) {
        props.onPageChange(page);
    }
};

// Generate visible page numbers (max 5 around current)
const pages = computed(() => {
    const total = props.meta.last_page;
    const current = props.meta.current_page;
    const delta = 2; // how many pages before/after current to show
    const range = [];

    for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
        range.push(i);
    }

    if (range[0] > 2) range.unshift("…");
    if (range[0] !== 1) range.unshift(1);
    if (Number(range[range.length - 1]) < total - 1) range.push("…");
    if (range[range.length - 1] !== total) range.push(total);

    return range;
});
</script>

<template>
    <div v-if="meta" class="flex items-center justify-center mt-10 flex-wrap gap-2 sm:gap-3 text-sm md:text-base">
        <!-- Prev Button -->
        <button class="px-4 py-2 btn btn-primary disabled:opacity-40 disabled:cursor-not-allowed transition"
            :disabled="meta.current_page === 1" @click="emitPageChange(meta.current_page - 1)">
            <StepBackIcon class="w-4 h-4" />
        </button>

        <!-- Numbered pages -->
        <template v-for="(p, i) in pages" :key="i">
            <button v-if="p !== '…'" class="w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition
          hover:bg-blue-50 hover:text-blue-600" :class="{
            'bg-blue-600 text-white border-blue-600': meta.current_page === p,
            'border-gray-300 text-gray-700': meta.current_page !== p,
        }" @click="emitPageChange(p as number)">
                {{ p }}
            </button>
            <span v-else class="px-2 text-gray-400 select-none">…</span>
        </template>

        <!-- Next Button -->
        <button class="px-4 py-2 btn btn-primary disabled:opacity-40 disabled:cursor-not-allowed transition"
            :disabled="meta.current_page === meta.last_page" @click="emitPageChange(meta.current_page + 1)">
            <StepForwardIcon class="w-4 h-4" />
        </button>
    </div>
</template>

<style scoped>
button {
    font-weight: 500;
}
</style>
