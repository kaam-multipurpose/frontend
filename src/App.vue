<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { useUserSessionStore } from "@/stores/user-session-store.ts";
import { onMounted } from "vue";
import { Toaster } from 'vue-sonner';

const router = useRouter()

onMounted(() => {
  const userSession = useUserSessionStore();
  const { logout, scheduleRefresh } = userSession;

  if (userSession.isAuthenticated) {
    scheduleRefresh();
  } else {
    logout();
    router.push('/');
  }
});

</script>

<template>
  <div id="app">
    <RouterView />
  </div>
  <Toaster position="top-right" :toast-options="{ duration: 4000 }" rich-colors close-button theme="system" expand
    class="toast-container" />
</template>
