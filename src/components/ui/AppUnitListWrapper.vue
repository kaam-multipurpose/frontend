<script setup lang="ts">
import type {UnitType} from "@/types/unit-type-response.ts";
import {computed, onMounted, ref, watch} from "vue";
import AppUnitList from "@/components/ui/AppUnitList.vue";
import {UnitService} from "@/services/UnitService.ts";
import UnitsListPreloader from "@/components/ui/preloaders/UnitsListPreloader.vue";

const loading = ref<boolean>(true);
const hasError = ref<boolean>(true);
const systemUnits = ref<UnitType[]>([]);
const message = ref<string | null>(null);

async function fetchUnits() {
  const response = await UnitService.getUnits();
  message.value = response.message;
  hasError.value = response.success;
  systemUnits.value = response.success ? response.data : [];
  loading.value = false;
}

const currentUnitValue = defineModel<UnitType>()
const {newUnitValue, editedUnitValue} = defineProps<{
  newUnitValue: UnitType,
  editedUnitValue: UnitType
}>()

const totalUnits = computed(() => systemUnits.value?.length);

watch(() => newUnitValue, (newValue) => {
  systemUnits.value?.push(newValue);
});

onMounted(fetchUnits)

watch(() => editedUnitValue, (newValue) => {
  const index = systemUnits.value?.findIndex(u => u.id === newValue.id) as number;
  if (index !== -1) {
    systemUnits.value[index] = newValue;
  }
});

</script>

<template>
  <UnitsListPreloader v-if="loading" />
  <ul class="list bg-base-100 rounded-box shadow-md" v-else>
    <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
      <h2 class="text-lg font-semibold">
        Existing Units ({{ totalUnits }})
      </h2>
    </li>
    <p v-if="totalUnits <= 0" class="alert alert-warning shadow-lg">
      No Unit available
    </p>
    <template v-for="unit in systemUnits" :key="unit.id" v-else>
      <AppUnitList :myValue="unit" v-model="currentUnitValue" />
    </template>
  </ul>
</template>

<style scoped>

</style>