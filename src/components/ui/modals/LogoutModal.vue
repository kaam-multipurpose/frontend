<script setup lang="ts">
import LogoutButton from "@/components/ui/LogoutButton.vue";

</script>

<template>
  <dialog id="logoutModal" class="modal">

    <div class="modal-box">
      <h3 class="text-lg font-bold">Hello!</h3>
      <p class="py-4">Are you sure you want to logout?</p>

      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Cancel</button>
        </form>

        <LogoutButton/>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>Close</button>
    </form>
  </dialog>

</template>
