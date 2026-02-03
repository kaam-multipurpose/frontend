<script setup lang="ts">
import FormInput from "@/components/ui/FormInput.vue";
import {AddUnitFormConfig} from "@/config/add-unit-form-config.ts";
import type {UnitType} from "@/types/unit-type-response.ts";
import {Plus, Edit} from "lucide-vue-next";
import {computed, ref, watch, watchEffect} from "vue";
import {useUnitAction} from "@/composables/useUnitAction.ts";
import {useValidationErrors} from "@/composables/useValidationErrors.ts";
import {toast} from "vue-sonner";

type ActionType = "save" | "edit"

const {loading, message, success, errors, data, performAction, reset} = useUnitAction();
const {getErrorMessage} = useValidationErrors(errors)
const actionTypeRef = ref<ActionType>("save");

const {
  currentUnitValue,
  clearCurrentUnit
} = defineProps<{
  currentUnitValue: UnitType
  clearCurrentUnit: () => void;
}>()
const emit = defineEmits<{
  saveUnit: [unitData: UnitType]
  editUnit: [unitData: UnitType]
}>()

const localUnit = ref<UnitType>({...currentUnitValue});

const currentUnitValueIsEmpty = computed(() => currentUnitValue.id === null)

watch(() => currentUnitValue, (newValue) => {
  localUnit.value = JSON.parse(JSON.stringify(newValue));
  console.log(localUnit.value);
}, { immediate: true, deep: true });

watch(data, (newData) => {
  if (newData == null)
    return;

  if (actionTypeRef.value == "save") {
    emit("saveUnit", newData as UnitType);
  } else {
    emit("editUnit", newData as UnitType);
  }
});

watch(success, (newSuccess) => {
  if (newSuccess == null)
    return;

  if (newSuccess) {
    toast.success(message.value as string)
    clearCurrentUnit();
    const form = document.querySelector("#addUnit") as HTMLFormElement;
    form.reset();
  } else {
    toast.error(message.value as string)
  }
})


const handleSubmit = (e: SubmitEvent) => {
  reset();
  const target = e.target as HTMLFormElement;
  const submitter = e.submitter as HTMLButtonElement;
  const submitterAction = submitter.getAttribute("value") as ActionType;
  const formData = new FormData(target)

  console.log(currentUnitValue);
  actionTypeRef.value = submitterAction;
  if (submitterAction == "save") {
    performAction(formData);
  } else {
    performAction(formData, localUnit.value.id as number)
  }
}

</script>

<template>
  <form @submit.prevent="handleSubmit" id="addUnit">
    <h3 class="text-xl font-bold mb-3">
      Add New Unit
    </h3>
    <template v-for="(input, index) in AddUnitFormConfig" :key="index">
      <FormInput
          :name="input.name"
          :label="input.label"
          :placeholder="input.placeholder"
          :type="input.type"
          :kind="input.kind"
          class="mb-3"
          v-model="localUnit[input.name]"
          :error="getErrorMessage(input.name)"
      />
    </template>

    <!-- Form action start -->
    <div class="flex justify-end mt-4">
      <button class="btn btn-primary" v-if="currentUnitValueIsEmpty" name="action" value="save" :disabled="loading">
        <span v-if="loading" class="loading loading-bars loading-md lg:loading-lg"></span>
        <span class="flex items-center" v-else>
          <Plus/>
          Add Unit
        </span>

      </button>
      <div class="flex flex-wrap gap-2" v-else>
        <button class="btn btn-soft" type="button" @click="clearCurrentUnit">
          Cancel Edit
        </button>
        <button class="btn btn-primary" name="action" value="edit" :disabled="loading">
          <span v-if="loading" class="loading loading-bars loading-md lg:loading-lg"></span>
          <span class="flex items-center" v-else>
            <Edit/>
            Save Changes
        </span>
        </button>
      </div>
    </div>
    <!-- Form action end -->

  </form>
</template>

<style scoped>

</style>