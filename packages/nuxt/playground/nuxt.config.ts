import GradientUIModule from '../src/module';

export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	modules: [GradientUIModule],
	gradientUI: {
		theme: {
			mode: 'dark',
			seed: '#6750a4'
		}
	}
});
