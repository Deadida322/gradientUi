import type { CreatedDesignTokens } from '@gradient-ui/gradient-engine/design-tokens';
import { gradientPaintFromModel } from './figmaGradient';
import { solidPaintFromChannels } from './figmaColor';
import { getThemeGradientEntries } from './themeGradients';
import type { PluginTokenSet } from './tokenFactory';
import { toPaintStyleName } from './tokenNames';

const getOrCreatePaintStyle = (
	stylesByName: Map<string, PaintStyle>,
	name: string
) => {
	const existing = stylesByName.get(name);

	if (existing) return existing;

	const style = figma.createPaintStyle();
	style.name = name;
	stylesByName.set(name, style);

	return style;
};

export const syncPaintStyles = async (tokens: CreatedDesignTokens) => {
	const localPaintStyles = await figma.getLocalPaintStylesAsync();
	const stylesByName = new Map(
		localPaintStyles.map((style) => [style.name, style])
	);
	let count = 0;

	for (const [name, value] of Object.entries(tokens.tokens.colors)) {
		const style = getOrCreatePaintStyle(
			stylesByName,
			toPaintStyleName('Color', name)
		);
		style.paints = [solidPaintFromChannels(value)];
		count += 1;
	}

	for (const [name, gradient] of Object.entries(tokens.gradientTokens.gradients)) {
		if (!gradient.model) continue;

		const style = getOrCreatePaintStyle(
			stylesByName,
			toPaintStyleName('Gradient', name)
		);
		style.paints = [gradientPaintFromModel(gradient.model)];
		count += 1;
	}

	for (const gradient of getThemeGradientEntries(tokens)) {
		const style = getOrCreatePaintStyle(
			stylesByName,
			toPaintStyleName('Theme Gradient', gradient.name)
		);
		style.paints = [gradientPaintFromModel(gradient.model)];
		count += 1;
	}

	return count;
};

export const syncPaintStyleSet = async (tokenSet: PluginTokenSet) => {
	const localPaintStyles = await figma.getLocalPaintStylesAsync();
	const stylesByName = new Map(
		localPaintStyles.map((style) => [style.name, style])
	);
	let count = 0;

	for (const [mode, tokens] of Object.entries({
		Dark: tokenSet.dark,
		Light: tokenSet.light
	})) {
		for (const [name, value] of Object.entries(tokens.tokens.theme)) {
			const style = getOrCreatePaintStyle(
				stylesByName,
				toPaintStyleName(`Theme ${mode}`, name)
			);
			style.paints = [solidPaintFromChannels(value)];
			count += 1;
		}
	}

	for (const [name, value] of Object.entries(tokenSet.light.tokens.colors)) {
		const style = getOrCreatePaintStyle(
			stylesByName,
			toPaintStyleName('Color', name)
		);
		style.paints = [solidPaintFromChannels(value)];
		count += 1;
	}

	for (const [name, gradient] of Object.entries(
		tokenSet.current.gradientTokens.gradients
	)) {
		if (!gradient.model) continue;

		const style = getOrCreatePaintStyle(
			stylesByName,
			toPaintStyleName('Gradient', name)
		);
		style.paints = [gradientPaintFromModel(gradient.model)];
		count += 1;
	}

	for (const gradient of getThemeGradientEntries(tokenSet.current)) {
		const style = getOrCreatePaintStyle(
			stylesByName,
			toPaintStyleName('Theme Gradient', gradient.name)
		);
		style.paints = [gradientPaintFromModel(gradient.model)];
		count += 1;
	}

	return count;
};
