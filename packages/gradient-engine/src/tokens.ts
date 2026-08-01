import { createPalette } from './palette';
import type { ColorInput } from './color';
import {
	toGradientAnimationCSS,
	toGradientAnimationKeyframes,
	toGradientAnimationValue
} from './animation/css';
import { changeTone, getComplementaryColor, shiftHue } from './colorMath';
import {
	createGradientMorphBlobs,
	toGradientMorphFilter,
	toGradientMorphFilterMarkup
} from './effects/morph';
import { toGradientBoxShadow, toGradientDropShadow } from './effects/shadow';
import { toCssGradient } from './formatters/css';
import { toSvgGradient } from './formatters/svg';
import { createGradientModel } from './model';
import {
	getGradientPreset,
	gradientPresets,
	type GradientPreset,
	type GradientPresetName,
	type GradientPresetRegistry
} from './presets';
import type {
	GradientAnimationOptions,
	GradientMorphBlob,
	GradientMorphOptions,
	GradientModel,
	GradientOptions,
	GradientRecipe,
	GradientShadowOptions,
	GradientStop
} from './types';

export type GradientTokenRecipe =
	| GradientRecipe
	| GradientPresetName
	| 'mesh'
	| 'soft';

export interface GradientTokenEntry {
	value: string;
	cssVar: string;
	model?: GradientModel;
	layers?: string[];
	stops?: GradientStop[];
	svg?: string;
}

export interface GradientEffectTokenEntry {
	boxShadow?: {
		value: string;
		cssVar: string;
	};
	dropShadow?: {
		value: string;
		cssVar: string;
	};
	morph?: {
		value: string;
		cssVar: string;
		svg: string;
	};
}

export interface GradientAnimationTokenEntry {
	name: string;
	value: string;
	css: string;
	keyframes: string;
	cssVar: string;
}

export interface CreatedGradientPreset {
	name: string;
	label: string;
	description?: string;
	gradient: GradientTokenEntry;
	effects?: GradientEffectTokenEntry;
	animation?: GradientAnimationTokenEntry;
	cssVars: Record<string, string>;
	cssText: string;
	keyframes: string;
}

export interface GradientTokenOptions {
	recipes?: readonly GradientTokenRecipe[];
	effects?: boolean;
	animations?: boolean;
	morph?: GradientMorphOptions;
	registry?: GradientPresetRegistry;
	prefix?: string;
}

export interface CreatedGradientTokens {
	gradients: Record<string, GradientTokenEntry>;
	effects: Record<string, GradientEffectTokenEntry>;
	animations: Record<string, GradientAnimationTokenEntry>;
	cssVars: Record<string, string>;
	cssText: string;
	keyframes: string;
}

export interface GradientMaterialOptions extends Omit<
	GradientOptions,
	'recipe'
> {
	animation?: GradientAnimationOptions;
	animations?: boolean;
	className?: string;
	dropShadow?: GradientShadowOptions;
	effects?: boolean;
	id?: string;
	morph?: GradientMorphOptions;
	prefix?: string;
	recipe?: GradientTokenRecipe;
	registry?: GradientPresetRegistry;
	shadow?: GradientShadowOptions;
}

export interface CreatedGradientMaterial {
	id: string;
	className: string;
	style: Record<string, string>;
	cssVars: Record<string, string>;
	cssText: string;
	keyframes: string;
	preset: CreatedGradientPreset;
	gradient: GradientTokenEntry;
	effects?: GradientEffectTokenEntry;
	animation?: GradientAnimationTokenEntry;
	morphBlobs?: GradientMorphBlob[];
}

const DEFAULT_TOKEN_RECIPES = ['glare', 'soft', 'mesh'] as const;

const toKebabCase = (value: string) =>
	value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

const toTokenName = (recipe: GradientTokenRecipe) => toKebabCase(recipe);

const toCssVar = (prefix: string, name: string, suffix?: string) =>
	`${prefix}-${name}${suffix ? `-${suffix}` : ''}`;

const toCssText = (cssVars: Record<string, string>) =>
	Object.entries(cssVars)
		.map(([name, value]) => `${name}: ${value};`)
		.join('\n');

const toCssProperty = (value: string) =>
	value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

const toCssDeclarations = (styles: Record<string, string>) =>
	Object.entries(styles)
		.map(([name, value]) => `${toCssProperty(name)}: ${value};`)
		.join('\n');

const stableSerialize = (value: unknown): string => {
	if (value === null || typeof value !== 'object')
		return JSON.stringify(value);
	if (Array.isArray(value))
		return `[${value.map(stableSerialize).join(',')}]`;

	return `{${Object.entries(value as Record<string, unknown>)
		.filter(([, entryValue]) => entryValue !== undefined)
		.sort(([firstKey], [secondKey]) => firstKey.localeCompare(secondKey))
		.map(
			([key, entryValue]) =>
				`${JSON.stringify(key)}:${stableSerialize(entryValue)}`
		)
		.join(',')}}`;
};

const hashString = (value: string) => {
	let hash = 5381;

	for (let index = 0; index < value.length; index += 1) {
		hash = (hash * 33) ^ value.charCodeAt(index);
	}

	return (hash >>> 0).toString(36);
};

const toScopedCssText = (
	className: string,
	cssVars: Record<string, string>,
	style: Record<string, string>,
	keyframes: string
) => {
	const vars = toCssText(cssVars);
	const styles = toCssDeclarations(style);
	const body = [vars, styles].filter(Boolean).join('\n');

	return [`.${className} {\n${body}\n}`, keyframes]
		.filter(Boolean)
		.join('\n\n');
};

const isGradientPresetName = (
	value: GradientTokenRecipe,
	registry: GradientPresetRegistry
): value is GradientPresetName => value in registry;

const resolveTokenPreset = (
	recipe: GradientTokenRecipe,
	registry: GradientPresetRegistry
): GradientPreset | null => {
	if (isGradientPresetName(recipe, registry)) {
		return getGradientPreset(recipe, registry);
	}

	if (recipe === 'soft') {
		return {
			label: 'Soft',
			description: 'Quiet monochrome radial gradient.',
			gradient: {
				recipe: 'monochrome',
				type: 'radial',
				position: 'center',
				shape: 'ellipse'
			},
			shadow: {
				layers: 2,
				opacity: 0.18,
				blur: 18,
				y: 7,
				spread: -4
			},
			dropShadow: {
				layers: 2,
				opacity: 0.26,
				blur: 16,
				y: 6
			},
			animation: {
				preset: 'pulse',
				duration: 7200,
				easing: 'ease-in-out'
			}
		};
	}

	if (recipe === 'mesh') return null;

	return {
		label: recipe,
		gradient: {
			recipe,
			type: 'linear',
			direction: recipe === 'glare' ? 135 : 145
		}
	};
};

const createMeshGradient = (seed: string) => {
	const layers = [
		`radial-gradient(circle at 16% 18%, ${shiftHue(seed, -42, 72, 1.05)} 0%, transparent 34%)`,
		`radial-gradient(circle at 86% 20%, ${getComplementaryColor(seed)} 0%, transparent 32%)`,
		`radial-gradient(circle at 50% 84%, ${shiftHue(seed, 56, 64, 1.08)} 0%, transparent 38%)`,
		`linear-gradient(135deg, ${changeTone(seed, 94)}, ${changeTone(seed, 28)})`
	];

	return {
		layers,
		value: layers.join(', ')
	};
};

const createTokenGradientEntry = (
	seed: string,
	recipe: GradientTokenRecipe,
	cssVar: string,
	options: GradientOptions,
	registry: GradientPresetRegistry
): GradientTokenEntry => {
	if (recipe === 'mesh') {
		const mesh = createMeshGradient(seed);

		return {
			cssVar,
			layers: mesh.layers,
			value: mesh.value
		};
	}

	const preset = resolveTokenPreset(recipe, registry);
	const palette = createPalette(seed);
	const model = createGradientModel(palette, {
		...preset?.gradient,
		...options
	});

	return {
		cssVar,
		model,
		stops: model.stops,
		svg: toSvgGradient(model, { id: cssVar.replace(/^--/, '') }),
		value: toCssGradient(model)
	};
};

const createTokenEffectEntry = (
	model: GradientModel | undefined,
	cssVarName: string,
	preset: GradientPreset | null,
	options?: {
		shadow?: GradientShadowOptions;
		dropShadow?: GradientShadowOptions;
		morph?: GradientMorphOptions;
	}
): GradientEffectTokenEntry => {
	if (!model) return {};
	const morphId = `${cssVarName.replace(/^--/, '')}-morph`;
	const morphOptions = {
		...options?.morph,
		id: options?.morph?.id ?? morphId
	} satisfies GradientMorphOptions;

	return {
		boxShadow: {
			cssVar: `${cssVarName}-shadow`,
			value: toGradientBoxShadow(model, options?.shadow ?? preset?.shadow)
		},
		dropShadow: {
			cssVar: `${cssVarName}-drop-shadow`,
			value: toGradientDropShadow(
				model,
				options?.dropShadow ?? preset?.dropShadow
			)
		},
		morph: {
			cssVar: `${cssVarName}-morph`,
			svg: toGradientMorphFilterMarkup(morphOptions),
			value: toGradientMorphFilter(morphOptions)
		}
	};
};

const createTokenAnimationEntry = (
	name: string,
	cssVarName: string,
	preset: GradientPreset | null,
	options?: GradientAnimationOptions
): GradientAnimationTokenEntry => {
	const animationOptions = {
		...preset?.animation,
		...options,
		name: `g-gradient-${name}-${options?.preset ?? preset?.animation?.preset ?? 'shift'}`,
		selector: `.g-gradient-${name}`
	} satisfies GradientAnimationOptions;

	return {
		css: toGradientAnimationCSS(animationOptions),
		cssVar: `${cssVarName}-animation`,
		keyframes: toGradientAnimationKeyframes(animationOptions),
		name: animationOptions.name,
		value: toGradientAnimationValue(animationOptions)
	};
};

export const createGradientPreset = (
	seed: ColorInput,
	recipe: GradientTokenRecipe = 'glare',
	options: GradientOptions & {
		animation?: GradientAnimationOptions;
		dropShadow?: GradientShadowOptions;
		effects?: boolean;
		morph?: GradientMorphOptions;
		prefix?: string;
		registry?: GradientPresetRegistry;
		shadow?: GradientShadowOptions;
		animations?: boolean;
	} = {}
): CreatedGradientPreset => {
	const registry = options.registry ?? gradientPresets;
	const name = toTokenName(recipe);
	const cssVarName = toCssVar(options.prefix ?? '--g-gradient', name);
	const preset = resolveTokenPreset(recipe, registry);
	const palette = createPalette(seed);
	const seedColor = palette[500];
	const gradient = createTokenGradientEntry(
		seedColor,
		recipe,
		cssVarName,
		options,
		registry
	);
	const cssVars: Record<string, string> = {
		[cssVarName]: gradient.value
	};
	const effects = options.effects
		? createTokenEffectEntry(gradient.model, cssVarName, preset, {
				dropShadow: options.dropShadow,
				morph: options.morph,
				shadow: options.shadow
			})
		: undefined;
	const animation = options.animations
		? createTokenAnimationEntry(name, cssVarName, preset, options.animation)
		: undefined;

	if (effects?.boxShadow) {
		cssVars[effects.boxShadow.cssVar] = effects.boxShadow.value;
	}

	if (effects?.dropShadow) {
		cssVars[effects.dropShadow.cssVar] = effects.dropShadow.value;
	}

	if (effects?.morph) {
		cssVars[effects.morph.cssVar] = effects.morph.value;
	}

	if (animation) {
		cssVars[animation.cssVar] = animation.value;
	}

	return {
		animation,
		cssText: toCssText(cssVars),
		cssVars,
		description: preset?.description,
		effects,
		gradient,
		keyframes: animation?.keyframes ?? '',
		label: preset?.label ?? name,
		name
	};
};

export const createGradientTokens = (
	seed: ColorInput,
	options: GradientTokenOptions = {}
): CreatedGradientTokens => {
	const recipes = options.recipes ?? DEFAULT_TOKEN_RECIPES;
	const gradients: Record<string, GradientTokenEntry> = {};
	const effects: Record<string, GradientEffectTokenEntry> = {};
	const animations: Record<string, GradientAnimationTokenEntry> = {};
	const cssVars: Record<string, string> = {};
	const keyframes: string[] = [];

	for (const recipe of recipes) {
		const preset = createGradientPreset(seed, recipe, {
			animations: options.animations,
			effects: options.effects,
			morph: options.morph,
			prefix: options.prefix,
			registry: options.registry
		});

		gradients[preset.name] = preset.gradient;
		Object.assign(cssVars, preset.cssVars);

		if (preset.effects) {
			effects[preset.name] = preset.effects;
		}

		if (preset.animation) {
			animations[preset.name] = preset.animation;
			keyframes.push(preset.animation.keyframes);
		}
	}

	return {
		animations,
		cssText: toCssText(cssVars),
		cssVars,
		effects,
		gradients,
		keyframes: keyframes.join('\n')
	};
};

export const createGradientMaterial = (
	seed: ColorInput,
	options: GradientMaterialOptions = {}
): CreatedGradientMaterial => {
	const { className, id, recipe = 'glare', ...presetOptions } = options;
	const preset = createGradientPreset(seed, recipe, presetOptions);
	const morphBlobs =
		preset.gradient.model && options.effects && options.morph
			? createGradientMorphBlobs(preset.gradient.model, options.morph)
			: undefined;
	const stableId =
		id ??
		`g-gradient-${preset.name}-${hashString(
			stableSerialize({ options, seed })
		)}`;
	const stableClassName = className ?? stableId;
	const style: Record<string, string> = {
		backgroundImage: `var(${preset.gradient.cssVar})`
	};

	if (preset.effects?.boxShadow) {
		style.boxShadow = `var(${preset.effects.boxShadow.cssVar})`;
	}

	if (preset.effects?.dropShadow) {
		style.filter = `var(${preset.effects.dropShadow.cssVar})`;
	}

	if (preset.animation) {
		style.animation = `var(${preset.animation.cssVar})`;
	}

	return {
		animation: preset.animation,
		className: stableClassName,
		cssText: toScopedCssText(
			stableClassName,
			preset.cssVars,
			style,
			preset.keyframes
		),
		cssVars: preset.cssVars,
		effects: preset.effects,
		gradient: preset.gradient,
		id: stableId,
		keyframes: preset.keyframes,
		morphBlobs,
		preset,
		style
	};
};
