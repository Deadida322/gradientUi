import { createApp } from 'vue';
import '@mdi/font/css/materialdesignicons.min.css';
import { createRouter, createMemoryHistory } from 'vue-router';
import { createGradientUI } from '@/index';
import Fixture from './NavigationFixture.vue';
const app = createApp(Fixture);
if (new URLSearchParams(location.search).has('router'))
	app.use(
		createRouter({
			history: createMemoryHistory(),
			routes: [
				{ path: '/:pathMatch(.*)*', component: { render: () => null } }
			]
		})
	);
app.use(createGradientUI());
app.mount('#app');
