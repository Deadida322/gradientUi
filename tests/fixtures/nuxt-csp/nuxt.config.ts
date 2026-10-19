export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	modules: ['nuxt-security', '@gradient-ui/nuxt'],
	security: {
		nonce: true,
		headers: {
			contentSecurityPolicy: {
				'style-src': ["'self'", "'unsafe-inline'", "'nonce-{{nonce}}'"],
				'style-src-attr': ["'unsafe-inline'"]
			}
		}
	},
	gradientUI: { theme: { seed: '#6750a4' } }
});
