export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	modules: ['@nuxtjs/color-mode', '@gradient-ui/nuxt'],
	colorMode: {
		classPrefix: 'g-theme--',
		preference: 'light',
		storage: 'cookie'
	},
	gradientUI: {
		colorMode: true,
		theme: { seed: '#6750a4' }
	}
});
