import type { ThemeTokens } from './types';
import { camelToKebabCase } from '@/utils/camelToKebabCase';
import { mountClientStyle } from '@/ssr/utils';

export interface TokenStyleOptions {
	className: string;
	id: string;
	prefix: string;
}

export const createTokensCSS = (
	tokens: ThemeTokens,
	{ className, prefix }: Pick<TokenStyleOptions, 'className' | 'prefix'>
) => {
	const declarations = Object.entries(tokens).map(
		([key, value]) => `  --g-${prefix}-${camelToKebabCase(key)}: ${value};`
	);

	return `.${className} {\n${declarations.join('\n')}\n}`;
};

export const applyTokensToCSS = (
	tokens: ThemeTokens,
	{ className, id, prefix }: TokenStyleOptions
) => {
	const css = createTokensCSS(tokens, { className, prefix });
	return mountClientStyle(id, css);
};
