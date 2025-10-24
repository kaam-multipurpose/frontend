import {defineStore} from "pinia";
import {ref} from "vue";

export const useSidebarStateStore = defineStore('sidebarState', () => {
    const isSidebarOpen = ref<boolean>(false);
    const open = () => {
        isSidebarOpen.value = true;
    }
    const close = () => {
        isSidebarOpen.value = false;
    }
    return {
        isSidebarOpen,
        open,
        close,
    }
})