<script setup lang="ts">
import { ref } from "vue";
import { Search, X } from "lucide-vue-next";

defineProps<{
    placeholder?: string;
}>();

const emit = defineEmits<{
    (e: "update", value: string): void;
}>();

const query = ref("");

const emitSearch = () => {
    emit("update", query.value);
};

const clear = () => {
    query.value = "";
    emit("update", "");
};
</script>
<template>
    <div class="w-full max-w-md">
        <label class="input input-bordered flex items-center gap-2">
            <Search class="h-6 w-6 opacity-60" />

            <input v-model="query" type="search" class="grow" :placeholder="placeholder" @input="emitSearch" />

            <button v-if="query" type="button" class="btn btn-ghost btn-xs" @click="clear">
                <X class="h-3 w-3" />
            </button>
        </label>
    </div>
</template>
