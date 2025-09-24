<script setup lang="ts">
import {EyeIcon, EyeOffIcon} from "lucide-vue-next";
import {ref} from "vue";
import ShowPasswordButton from "@/components/ui/ShowPasswordButton.vue";

const showPassword = ref(false);
const email = ref("");
const password = ref("");
const rememberMe = ref("false");
</script>

<template>
  <main class="grid grid-cols-1 gap-20 md:grid-cols-2 content-center px-8 md:px-20">
    <div class="hidden md:flex flex-col items-center justify-center">
      <img
          src="@/assets/images/login-illustration.png"
          alt="Login Illustration"
          class="object-contain"
      />
      <h2
          class="text-3xl font-bold text-center"
      >
        Manage your products, stock, and pricing with ease.
      </h2>
    </div>

    <!-- ------------- Main Form --------------- -->
    <div class="grid content-center gap-20 lg:w-[min(100%,_35rem)] lg:mx-auto">
      <h2 class="text-primary font-bold text-3xl sm:text-5xl">
        HELLO👋, <br/>
        WELCOME BACK!
      </h2>

      <form class="grid gap-12">
        <!-- Email -->
        <input
            v-model="email"
            type="text"
            placeholder="Enter your email or username"
            class="input input-md lg:input-lg xl:input-xl w-full"
        />

        <!-- Password -->
        <div class="relative">
          <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              class="input input-md lg:input-lg xl:input-xl w-full pr-13"
          />

          <ShowPasswordButton
              v-model="showPassword"
              class="absolute right-4 top-1/2 -translate-y-1/2 z-10"
          />
        </div>

        <div class="grid gap-4">
          <div class="flex justify-between flex-wrap items-center gap-2">
            <label
                class="label text-primary text-sm md:text-md -mt-0.5 font-semibold"
            >
              <input
                  type="checkbox"
                  checked
                  class="checkbox checkbox-sm checkbox-primary"
                  v-model="rememberMe"
                  id="remember"
              />
              Remember me
            </label>

            <RouterLink
                to=""
                class="link text-sm md:text-md link-primary"
            >
              Forgot Password?
            </RouterLink>
          </div>
          <button
              class="btn btn-md lg:btn-lg xl:btn-xl btn-primary btn-block text-white"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </main>
</template>
