<script setup lang="ts">
import { ref, computed } from "vue";
import { ChevronUp, ChevronDown } from "lucide-vue-next";
import { useRouter } from "vue-router";

interface TableProps {
    headers: string[];
    rows: Record<string, any>[];
    showIndex?: boolean;
    loading?: boolean;
    skeletonRows?: number;
    rowIsALink?: boolean;
}

const props = withDefaults(defineProps<TableProps>(), {
    showIndex: true,
    loading: false,
    skeletonRows: 5,
    rowIsALink: false,
});

const router = useRouter();

const sortColumn = ref<string | null>(null);
const sortAsc = ref(true);

const sortedRows = computed(() => {
    if (!sortColumn.value) return props.rows;

    return [...props.rows].sort((a, b) => {
        const aVal = a[sortColumn.value!];
        const bVal = b[sortColumn.value!];

        if (aVal == null) return 1;
        if (bVal == null) return -1;

        if (typeof aVal === "number" && typeof bVal === "number") {
            return sortAsc.value ? aVal - bVal : bVal - aVal;
        }

        return sortAsc.value
            ? String(aVal).localeCompare(String(bVal))
            : String(bVal).localeCompare(String(aVal));
    });
});

const toggleSort = (header: string) => {
    if (sortColumn.value === header) {
        sortAsc.value = !sortAsc.value;
    } else {
        sortColumn.value = header;
        sortAsc.value = true;
    }
};

const handleRowClick = (row: Record<string, any>) => {
    if (props.rowIsALink) {
        console.log(row)
        router.push(`categories/details?slug=${row.Slug}`);
    }
};
</script>

<template>
    <div class="overflow-x-auto w-full border-t border-base-300">
        <table class="table table-zebra w-full">
            <thead>
                <tr>
                    <th v-if="props.showIndex">#</th>
                    <th v-for="header in props.headers" :key="header" class="cursor-pointer select-none"
                        @click="toggleSort(header)">
                        <div class="flex items-center gap-1">
                            {{ header }}
                            <span v-if="sortColumn === header">
                                <ChevronUp v-if="sortAsc" class="w-4 h-4" />
                                <ChevronDown v-else class="w-4 h-4" />
                            </span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <!-- Loading skeleton rows -->
                <template v-if="props.loading">
                    <tr v-for="i in props.skeletonRows" :key="'skeleton-' + i">
                        <th v-if="props.showIndex">
                            <div class="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
                        </th>
                        <td v-for="header in props.headers" :key="header">
                            <div class="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
                        </td>
                    </tr>
                </template>

                <!-- Actual data rows -->
                <template v-else>
                    <tr v-for="(row, i) in sortedRows" :key="row.id || i" class="hover:bg-base-300"
                        :class="{ 'cursor-pointer': props.rowIsALink }" @click="handleRowClick(row)">
                        <th v-if="props.showIndex">{{ i + 1 }}</th>
                        <td v-for="header in props.headers" :key="header">
                            <slot :name="header" :row="row">
                                {{ row[header] }}
                            </slot>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>
