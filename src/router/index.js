import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView
	},
	{
		path: '/about',
		name: 'about',

		component: function () {
			return import('../views/AboutView.vue');
		}
	},
	{
		path: '/validation',
		name: 'validation',

		component: function () {
			return import('../views/ValidationView.vue');
		}
	}
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});

export default router;
