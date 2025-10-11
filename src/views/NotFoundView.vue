<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
</script>

<template>
  <section class="hero bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <div class="text-7xl md:text-8xl font-extrabold text-primary">404</div>
        <h1 class="text-3xl font-bold mt-4">Page not found</h1>
        <p class="py-4 text-base-content/70">
          We couldn’t find:
          <span class="badge badge-outline align-middle break-all">{{ route.fullPath }}</span>
        </p>
        <div class="flex justify-center gap-3">
          <RouterLink to="/" class="btn btn-primary">Go to Login</RouterLink>
          <button class="btn btn-outline" type="button" @click="router.back()">Go Back</button>
        </div>
      </div>
    </div>
  </section>
</template>