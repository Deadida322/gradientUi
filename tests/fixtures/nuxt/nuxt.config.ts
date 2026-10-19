export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	modules: ['@gradient-ui/nuxt'],
	gradientUI: {
		ssr: {
			initialWidth: 1024,
			initialHeight: 768
		},
		theme: {
			mode: 'dark',
			seed: '#6750a4'
		}
	}
});
