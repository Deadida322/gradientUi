import type { ThemeTokens } from './types';
import { camelToKebabCase } from '@/utils/camelToKebabCase';

export interface TokenStyleOptions {
	className: string;
	id: string;
	prefix: string;
}

export const applyTokensToCSS = (
	tokens: ThemeTokens,
	{ className, id, prefix }: TokenStyleOptions
) => {
	const declarations = Object.entries(tokens).map(
		([key, value]) => `  --g-${prefix}-${camelToKebabCase(key)}: ${value};`
	);
	const css = `.${className} {\n${declarations.join('\n')}\n}`;
	let style = document.getElementById(id) as HTMLStyleElement | null;

	if (!style) {
		style = document.createElement('style');
		style.id = id;
		document.head.appendChild(style);
	}

	style.textContent = css;
	return style;
};
