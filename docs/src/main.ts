import { createApp } from 'vue';
import '@fontsource/manrope/200.css';
import '@fontsource/manrope/300.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';
import '@mdi/font/css/materialdesignicons.css';
import GradientUI from '@gradient-ui/core';
import App from './App.vue';
import router from './router';
import { initDocsTheme } from './docs/use/docsTheme';

initDocsTheme();

createApp(App).use(router).use(GradientUI, { theme: false }).mount('#app');
