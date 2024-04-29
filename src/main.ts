import { createApp } from "vue";
import App from "./App.vue";
import pinia from "@/stores";
import router from "@/router/index";
import "virtual:svg-icons-register";
import "animate.css";
import "uno.css";
import "element-plus/theme-chalk/src/index.scss";
// 黑色主题变量
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/element-dark.scss";
import "@/styles/element.scss";

createApp(App).use(router).use(pinia).mount("#app");
