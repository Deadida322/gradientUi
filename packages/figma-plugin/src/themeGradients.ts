import {
	createGradientModel,
	type GradientModel
} from '@gradient-ui/gradient-engine/core';
import type { CreatedDesignTokens } from '@gradient-ui/gradient-engine/design-tokens';

type ThemeGradientShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

interface ThemeGradientEntry {
	model: GradientModel;
	name: string;
	value: string;
}

const DEFAULT_SHADE = 500;
const COLOR_SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
const SEMANTIC_GRADIENTS = {
	error: { palette: 'red', shade: 600 },
	main: { palette: 'source', shade: DEFAULT_SHADE },
	success: { palette: 'green', shade: 600 },
	warning: { palette: 'amber', shade: 600 }
} as const;

const isColorShade = (value: number): value is ThemeGradientShade =>
	COLOR_SHADES.some((shade) => shade === value);

const escapeRegExp = (value: string) =>
	value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getPaletteGradientModel = (
	tokens: CreatedDesignTokens,
	name: string
) => {
	const semantic = SEMANTIC_GRADIENTS[name as keyof typeof SEMANTIC_GRADIENTS];

	if (semantic) {
		const palette = tokens.colorSystem.palettes[semantic.palette];
		return palette
			? createGradientModel(palette.colors, { shade: semantic.shade })
			: null;
	}

	const paletteName = Object.keys(tokens.colorSystem.palettes)
		.sort((first, second) => second.length - first.length)
		.find(
			(candidate) =>
				name === candidate ||
				new RegExp(`^${escapeRegExp(candidate)}\\d+$`).test(name)
		);

	if (!paletteName) return null;

	const shade = Number(name.slice(paletteName.length) || DEFAULT_SHADE);
	const palette = tokens.colorSystem.palettes[paletteName];

	if (!palette || !Number.isFinite(shade) || !isColorShade(shade)) return null;

	return createGradientModel(palette.colors, { shade });
};

export const getThemeGradientEntries = (
	tokens: CreatedDesignTokens
): ThemeGradientEntry[] =>
	Object.entries(tokens.tokens.gradients).flatMap(([name, value]) => {
		const model = getPaletteGradientModel(tokens, name);

		return model ? [{ model, name, value }] : [];
	});
