<script setup lang="ts">
import {RouterView, useRouter} from 'vue-router'
import {useUserSessionStore} from "@/stores/user-session.ts";
import {onMounted} from "vue";

const router = useRouter()

onMounted(() => {
  const userSession = useUserSessionStore();
  const {logout, scheduleRefresh} = userSession;

  if (userSession.isAuthenticated) {
    scheduleRefresh();
  } else {
    logout();
    router.push('/');
  }
});

</script>

<template>
  <RouterView/>
</template>

