<script setup lang="ts">
import AppSidebarMenuList from "@/components/ui/AppSidebarMenuList.vue";
import {sidebarMenuConfig} from "@/config/sidebar-menu.config.ts";
import {X} from "lucide-vue-next";
import {useSidebarStateStore} from "@/stores/sidebar-state-store.ts";
import {computed} from "vue";

const store = useSidebarStateStore();
const {close} = store;

const addToggleClass = computed(() => {
  if (store.isSidebarOpen) {
    return 'translate-x-[0]';
  }
});

</script>

<template>
  <aside
      class="fixed z-10 grid bg-base-300 h-[100dvh] w-[100%] translate-x-[-100%] md:!translate-x-[0] md:sticky md:top-0 md:w-[20em] cursor-pointer transition"
      :class="addToggleClass"
      @click="close"
  >
    <section
        class="bg-primary w-[min(95%,20rem)] md:w-[100%] overflow-y-auto overflow-x-hidden cursor-default relative grid grid-rows-[auto_1fr]"
        @click.stop>

      <h3 class="text-3xl text-center p-4 sticky top-0 bg-inherit z-2">KAAM</h3>

      <div>
        <ul class="menu rounded-box w-full gap-2">
          <AppSidebarMenuList
              v-for="(menuConfig, index) in sidebarMenuConfig"
              :key="index"
              v-bind="menuConfig"
          />
        </ul>
      </div>

    </section>

    <button
        class="btn btn-circle btn-secondary z-3 hover:text-white transition duration-200 absolute top-4 right-4  md:hidden"
        aria-label="Toggle Menu"
        @click="close"
    >
      <X class="w-5 h-5"/>
    </button>
  </aside>
</template>