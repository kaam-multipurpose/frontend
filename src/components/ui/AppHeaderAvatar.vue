<script setup lang="ts">

import LogoutModalToggler from "@/components/ui/LogoutModalToggler.vue";
import {User} from "lucide-vue-next";
import {useUserSessionStore} from "@/stores/user-session-store.ts";

const store = useUserSessionStore();
</script>

<template>

  <div class="dropdown dropdown-end">

    <button 
      type="button"
      class="btn btn-ghost btn-circle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      tabindex="0"
    >
      <div class="avatar avatar-placeholder">
        <div class="bg-primary text-primary-content w-8 rounded-full">
          <span class="text-xs">{{ store.initial }}</span>
        </div>
      </div>
    </button>

    <ul tabindex="-1" class="dropdown-content  bg-base-100 rounded-box z-1 w-52 p-2 shadow-lg shadow-base-300">
      <li>
        <div class="flex items-center gap-2 justify-end">
          <div class="avatar avatar-placeholder">
            <div class="bg-primary text-primary-content w-12 rounded-full">
              <span class="text-sm">{{ store.initial }}</span>
            </div>
          </div>
          <div>
            <h4>
              {{ store.user?.first_name }}
              {{ store.user?.last_name }}
            </h4>
          </div>
        </div>
      </li>
      <ul class="menu w-full">
        <li><RouterLink to="/"><User />Profile</RouterLink></li>
        <li>
          <LogoutModalToggler class="text-sm" />
        </li>
      </ul>
    </ul>
  </div>
</template>

<style scoped>

</style>