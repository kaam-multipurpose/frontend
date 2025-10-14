<script setup lang="ts">
import LogoutButton from "@/components/ui/LogoutButton.vue";

function showModal() {
  let modal = document.getElementById('logoutModal') as HTMLDialogElement;
  modal.showModal();
}
</script>

<template>
  <button class="btn btn-error btn-md lg:btn-lg" @click="showModal">Logout</button>

  <dialog id="logoutModal" class="modal">

    <div class="modal-box">
      <h3 class="text-lg font-bold">Hello!</h3>
      <p class="py-4">Are you sure you want to logout?</p>

      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>

        <LogoutButton />
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>Close</button>
    </form>
  </dialog>

</template>
