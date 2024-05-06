import { computed, createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import Maska from 'maska';
import api from './axios';
import { usePersistCart } from './hooks';
import { useCartStore } from './store/cart';
import { useProductStore } from './store/products';

const app = createApp(App);
app.use(router);
app.use(PerfectScrollbar);
app.use(createPinia());
app.use(VueTablerIcons);
app.use(Maska);
app.use(VueApexCharts);

const productStore = useProductStore();
const cartStore = useCartStore();
usePersistCart();
app.config.globalProperties.$api = api;
const count = computed(() => cartStore.count);
app.use(vuetify).mount('#app');
