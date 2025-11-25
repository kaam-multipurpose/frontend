<script setup lang="ts">
import FormInput from "@/components/ui/FormInput.vue";
import type { FormInputType } from "@/types/form-input.ts";
import { loginFormInputs } from "@/config/login-form.config.ts";
import { useValidationErrors } from "@/composables/useValidationErrors.ts";
import { useLogin } from "@/composables/useLogin.ts";
import { toast } from "vue-sonner";
import { watch } from "vue";

const { isLoading, errors, hasErrors, globalMessage, handleLogin } = useLogin();
const inputs: FormInputType[] = loginFormInputs;
const { getErrorMessage } = useValidationErrors(errors);

watch([globalMessage, hasErrors], () => {
  if (!globalMessage.value) return;

  if (hasErrors.value) {
    toast.error(globalMessage.value);
  } else {
    toast.success(globalMessage.value);
  }
});
</script>

<template>
  <main class="grid grid-cols-1 gap-20 md:grid-cols-2 content-center px-8 md:px-20">
    <div class="hidden md:flex flex-col items-center justify-center">
      <img src="@/assets/images/login-illustration.png" alt="Login Illustration" class="object-contain" />
      <h2 class="text-3xl font-bold text-center">
        Manage your products, stock, and pricing with ease.
      </h2>
    </div>

    <div class="grid content-center gap-20 lg:w-[min(100%,_35rem)] lg:mx-auto">
      <h2 class="text-primary font-bold text-3xl sm:text-5xl">
        HELLO👋, <br />
        WELCOME BACK!
      </h2>

      <form class="grid gap-12" @submit.prevent="handleLogin">
        <template v-for="(input, _index) in inputs" :key="_index">
          <FormInput :name="input.name" :kind="input.kind" :type="input.type" :placeholder="input.placeholder"
            :error="getErrorMessage(input.name)" />
        </template>

        <div class="grid gap-4">
          <div class="flex justify-between flex-wrap items-center gap-2">
            <label class="label text-primary text-sm md:text-md -mt-0.5 font-semibold">
              <input type="checkbox" checked class="checkbox checkbox-sm checkbox-primary" name="rememberMe"
                id="remember" />
              Remember me
            </label>

            <RouterLink to="" class="link text-sm md:text-md link-primary">
              Forgot Password?
            </RouterLink>
          </div>
          <button class="btn btn-md lg:btn-lg xl:btn-xl btn-primary btn-block text-white" type="submit"
            :disabled="isLoading">
            <span v-if="isLoading" class="loading loading-bars loading-md lg:loading-lg">
            </span>
            <span v-else> Login </span>
          </button>
        </div>
      </form>
    </div>
  </main>
</template>
