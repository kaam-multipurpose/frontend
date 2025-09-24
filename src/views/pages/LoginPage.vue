<script setup lang="ts">
import { EyeIcon, EyeOffIcon } from "lucide-vue-next";
import { ref } from "vue";

const showPassword = ref(false);
const email = ref("");
const password = ref("");
const rememberMe = ref("false");
</script>

<template>
  <main class="px-8 md:px-20 h-screen flex items-center justify-center py-4">
    <div class="flex items-center gap-10 justify-between">
      <div class="w-1/2 hidden md:flex flex-col items-center justify-center">
        <img
          src="@/assets/images/login-illustration.png"
          width="450"
          alt="Login Illustration"
          class="object-contain"
        />
        <h2
          class="text-[#131927] dark:text-white text-3xl font-bold text-center"
        >
          Manage your products, stock, and pricing with ease.
        </h2>
      </div>

      <!-- ------------- Main Form --------------- -->
      <div class="md:w-1/2">
        <h2 class="text-primary-500 font-bold text-3xl sm:text-5xl mb-14">
          HELLO👋, <br />
          WELCOME BACK!
        </h2>

        <form class="space-y-7">
          <!-- Email -->
          <input
            v-model="email"
            type="text"
            placeholder="Enter your email or username"
            class="border border-[#B3BAFB] rounded-[10px] w-full text-primary-700 placeholder:text-primary-500 font-medium text-lg outline-none focus:border-primary-900 px-10 py-5"
          />

          <!-- Password -->
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              class="border border-[#B3BAFB] rounded-[10px] w-full text-primary-700 placeholder:text-primary-500 font-medium text-lg outline-none focus:border-primary-900 px-10 py-5"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              <EyeIcon v-if="!showPassword" />
              <EyeOffIcon v-else />
            </button>
          </div>

          <div class="w-full flex justify-between flex-wrap items-center">
            <div class="flex item-center gap-2">
              <input
                v-model="rememberMe"
                type="checkbox"
                id="remember"
                class="checkbox checkbox-primary checkbox-sm md:checkbox-lg"
              />
              <label
                for="remember"
                class="text-primary-500 text-sm md:text-lg -mt-0.5 font-semibold"
                >Remember me</label
              >
            </div>
            <RouterLink
              to=""
              class="font-bold text-sm md:text-lg text-primary-500"
            >
              Forgot Password?
            </RouterLink>
          </div>
          <button
            class="w-full py-5 btn btn-primary rounded-lg cursor-pointer text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </main>
</template>
