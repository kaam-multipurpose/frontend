import "@/assets/style/main.css";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedState);
app.use(pinia);
app.use(router);
import "vue-sonner/style.css";

app.mount("#app");
