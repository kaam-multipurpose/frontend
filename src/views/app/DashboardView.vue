<script setup lang="ts">
import {useUserSessionStore} from "@/stores/user-session.ts";
import LogoutButton from "@/components/ui/LogoutButton.vue";
import LogoutModal from "@/components/layout/LogoutModal.vue";

const userSession = useUserSessionStore();
</script>

<template>
  <h3 class="text-2xl">Here is the dashboard</h3>
  <h4>
    {{ userSession.user }}
  </h4>
  <h4>
    {{ userSession.token }}
  </h4>
  <div>
    <RouterLink to="/" class="link link-success">
      Login Page
    </RouterLink>
    <LogoutModal />
  </div>

</template>

<style scoped>

</style>