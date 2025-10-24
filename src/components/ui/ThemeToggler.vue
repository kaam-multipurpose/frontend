<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import {Sun, Moon, Monitor, type LucideIcon} from 'lucide-vue-next'

type Theme = 'light' | 'dark';
type ThemeMode = 'system' | Theme;
type ThemeItem = { name: ThemeMode, icon: LucideIcon }

const selectedTheme = ref<ThemeMode>('system')
const currentTheme = ref<Theme>('light')

const themeItems = ref<ThemeItem[]>([
  {name: "light", icon: Sun},
  {name: "dark", icon: Moon},
  {name: "system", icon: Monitor}
])

const activeTheme = computed<ThemeItem | undefined>(() => themeItems.value.find(item => item.name === selectedTheme.value));

const getSystemTheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') as Theme;

const applyTheme = (theme: ThemeMode) => {
  if (theme === 'system') {
    const systemTheme = getSystemTheme()
    document.documentElement.setAttribute('data-theme', systemTheme)
    currentTheme.value = systemTheme
  } else {
    document.documentElement.setAttribute('data-theme', theme)
    currentTheme.value = theme
  }
}

const setTheme = (theme: ThemeMode) => {
  selectedTheme.value = theme
  localStorage.setItem('theme', theme)
  applyTheme(theme)
}

onMounted(() => {
  const savedTheme = (localStorage.getItem('theme') || 'system') as ThemeMode;
  selectedTheme.value = savedTheme
  applyTheme(savedTheme)

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const handleSystemThemeChange = () => {
    if (selectedTheme.value === 'system') {
      applyTheme('system')
    }
  }

  mediaQuery.addEventListener('change', handleSystemThemeChange)

  return () => {
    mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }
})
</script>

<template>
  <div class="dropdown dropdown-end">

    <div tabindex="0" role="button" class="btn btn-dash !p-0 h-auto text-base-content">
<!--      <span>-->
<!--        Theme-->
<!--      </span>-->
      <div>
        <component :is="activeTheme.icon" v-if="activeTheme" />
      </div>
    </div>

    <ul
        tabindex="-1"
        class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-2xl border border-base-300 w-max"
    >
      <li v-for="({name, icon}, index) in themeItems" :key="index">
        <button
            @click="setTheme(name)"
            class="flex items-center gap-3 p-3"
            :class="{ 'bg-base-200': selectedTheme === name }"
        >
          <component :is="icon" />
          <div class="flex-1 text-left">
<!--            <div class="font-medium">{{ name.charAt(0).toUpperCase()+""+name.slice(1) }}</div>-->
          </div>
          <div v-if="selectedTheme === name" class="w-2 h-2 bg-primary rounded-full"></div>
        </button>
      </li>
    </ul>
  </div>
</template>

