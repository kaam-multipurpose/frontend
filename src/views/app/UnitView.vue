<script setup lang="ts">

import AddUnitForm from "@/components/ui/AddUnitForm.vue";
import {ref} from "vue";
import type {UnitType} from "@/types/unit-type-response.ts";
import AppUnitListWrapper from "@/components/ui/AppUnitListWrapper.vue";

const defaultUnitValue = {
  id: null,
  name: null,
  symbol: null,
  quantity: null,
};
const currentUnitValue = ref<UnitType>(defaultUnitValue);
const newAddedUnit = ref<UnitType>(defaultUnitValue);
const newEditedUnit = ref<UnitType>(defaultUnitValue);

const clearCurrentUnitValue = () => {
  currentUnitValue.value = {
    id: null,
    name: null,
    symbol: null,
    quantity: null,
  };
}

const handleUnitSave = (unitData: UnitType) => {
  newAddedUnit.value = unitData;
}
const handleUnitEdit = (unitData: UnitType) => {
  newEditedUnit.value = unitData;
}

</script>

<template>
  <main class="main-container grid grid-rows-[auto_1fr] gap-4 lg:gap-10 h-[100%]">

    <div>
      <h2 class="text-2xl md:text-4xl mb-4 md:mb-6 underline decoration-primary-800 decoration-3 underline-offset-10">
        Unit
        Manager </h2>
      <p class="text-gray-400 text-justify">
        Define all core management units. The quantity field is optional: It specifies a standard fixed based counts
        (e.g., 12 for a dozen). If left empty the conversion factor must be defined at product level.
      </p>
    </div>


    <div class="@container h-full">
      <div class="grid gap-y-10 gap-x-5 @3xl:grid-cols-[1.5fr_2fr] h-full">
        <AddUnitForm
            :currentUnitValue="currentUnitValue"
            :clearCurrentUnit="clearCurrentUnitValue"
            @save-unit="handleUnitSave"
            @edit-unit="handleUnitEdit"
        />

        <AppUnitListWrapper
            v-model="currentUnitValue"
            :newUnitValue="newAddedUnit"
            :editedUnitValue="newEditedUnit"
            class="list-scroll-area"
        />
      </div>
    </div>

  </main>
</template>

<style scoped>
@container (min-width: 48rem) {
  .list-scroll-area {
    height: 75vh;
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>