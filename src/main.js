import { createApp } from 'vue'
import Toaster from "@meforma/vue-toaster";
import Popper from "vue3-popper";

import App from './App.vue'
import router from "./router/router.js";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
createApp(App).use(router).use(Toaster).use(VueSweetalert2).use(Popper).mount("#app");
