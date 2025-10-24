<script setup lang="ts">
import type {SidebarMenuConfigType} from "@/config/sidebar-menu.config.ts";

const {name, icon, path, hasSubMenu, subMenu} = defineProps<SidebarMenuConfigType>();
</script>

<template>
  <li v-if="hasSubMenu">
    <details close>
      <summary>
        <component :is="icon" />
        {{ name }}
      </summary>
      <ul>
        <AppSidebarMenuList
            v-for="(item, index) in subMenu"
            :key="index"
            v-bind="item"
        />
      </ul>
    </details>
  </li>

  <li v-else>
    <RouterLink :to="path ||''" :class="{'menu-active': name==='Dashboard'}">
      <component :is="icon" />
      {{ name }}
    </RouterLink>
  </li>
</template>

<style scoped>

</style>