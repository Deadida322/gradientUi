import { createApp } from 'vue';
import '@/style.scss';
import App from './App.vue';
import { ripple } from './directives/ripple';
import gradientIcon from '@/directives/gradientIcon';
import vClickOutside from 'click-outside-vue3';
import FloatingVue from 'floating-vue';
const app = createApp(App).use(router);
import 'floating-vue/dist/style.css';
import router from './router';

app.use(FloatingVue);
app.use(vClickOutside);
app.directive('ripple', ripple);
app.directive('gradient-icon', gradientIcon);
app.mount('#app');
