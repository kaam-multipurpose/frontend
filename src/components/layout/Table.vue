<script setup lang="ts">
interface TableProps {
    headers: string[];
    rows: Record<string, any>[];
    showIndex?: boolean;
    loading?: boolean;
    skeletonRows?: number; // how many skeleton rows to show
}

const props = withDefaults(defineProps<TableProps>(), {
    showIndex: true,
    loading: false,
    skeletonRows: 5
});
</script>

<template>
    <div class="overflow-x-auto w-full">
        <table class="table table-zebra w-full">
            <thead>
                <tr>
                    <th v-if="props.showIndex">#</th>
                    <th v-for="header in props.headers" :key="header">{{ header }}</th>
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
                    <tr v-for="(row, i) in props.rows" :key="row.id || i">
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
