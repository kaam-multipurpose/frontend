<script setup lang="ts">
import type {UnitType} from "@/types/unit-type-response.ts";
import {Edit, Trash2} from "lucide-vue-next";
import {computed} from "vue";

const {
  myValue
} = defineProps<{ myValue: UnitType }>();

const currentUnitValue = defineModel<UnitType>();

const calculatedQty = computed(() => myValue.quantity ?? "N/A");

const colourClass = computed(() => calculatedQty.value === "N/A" ? "text-gray-400 bg-gray-100" : "text-primary bg-primary-content")

const setCurrenUnitValue = () => {
  const temp = myValue;
  currentUnitValue.value = temp;
}

</script>

<template>
  <li class="list-row flex items-center justify-between gap-4 p-4 border-b border-base-200 hover:bg-base-200 cursor-pointer">
    <div>
      <p class="mb-0">
          <span class="text-xl font-bold">
            {{ myValue.name }}
          </span>
        <span class="text-sm text-primary-700"> ({{ myValue.symbol }})</span>
      </p>
    </div>
    <div class="flex items-center gap-5">
      <p
          class="mb-0 font-bold p-2 text-xs rounded rounded-full"
          :class="colourClass"
      >
        Qty: {{ calculatedQty }}
      </p>
      <div class="flex gap-2">
        <button class="btn btn-square btn-ghost" @click="setCurrenUnitValue">
          <Edit class="w-5 h-5 text-primary-700"/>
        </button>
        <button class="btn btn-square btn-ghost">
          <Trash2 class="w-5 h-5 text-red-700"/>
        </button>
      </div>
    </div>
  </li>
</template>

<style scoped>

</style>