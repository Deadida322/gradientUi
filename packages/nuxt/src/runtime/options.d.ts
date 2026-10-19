declare module '#gradient-ui-options' {
	import type { GradientUIOptions } from '@gradient-ui/core';

	const options: GradientUIOptions;
	export default options;
}

declare module '#gradient-ui-nuxt-options' {
	const options: {
		colorMode: boolean;
		classPrefix: string;
		classSuffix: string;
		ssr: {
			initialWidth?: number;
			initialHeight?: number;
			viewportWidthHeader: string;
		};
	};
	export default options;
}
