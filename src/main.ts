import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createApp, VueElement } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { createVuetify } from "vuetify/lib/framework.mjs";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({ components, directives });

import "./assets/main.css";

const app = createApp(App);
app.use(vuetify);
app.use(createPinia());
app.use(router);

app.mount("#app");
