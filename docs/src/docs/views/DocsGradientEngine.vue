<script setup lang="ts">
	import DocsCode from '@docs/components/DocsCode.vue';
	import DocsPropsTable from '@docs/components/DocsPropsTable.vue';
	import DocsReleaseBadge from '@docs/components/DocsReleaseBadge.vue';
	import { docsNextReleaseBadge } from '@docs/data/releaseBadges';
	import PlaygroundGradientEngine from '@playground/PlaygroundGradientEngine.vue';
	import { GGradientMaterial } from '@/components';
	import type { DocsPropRow } from '@docs/types';

	const standaloneCode = `import {
	gradientAnimation,
	gradientCore,
	gradientEffects,
	gradientFormatters
} from '@gradient-ui/gradient-engine';

const gradient = gradientCore.createGradientModelFromColor('#704bfd', {
	recipe: 'glare',
	type: 'linear',
	direction: 135
});

const css = gradientFormatters.toCssGradient(gradient);
const shadow = gradientEffects.toGradientBoxShadow(gradient);
const filter = gradientEffects.toGradientDropShadow(gradient);
const svgDefinition = gradientFormatters.toSvgGradient(gradient, {
	id: 'brand-gradient'
});
const svgMarkup = gradientFormatters.toSvgGradientMarkup(gradient, {
	id: 'brand-gradient'
});
const svgPath = gradientFormatters.toSvgPathAnimationMarkup(gradient, {
	id: 'brand-path',
	width: 360,
	height: 160,
	strokeWidth: 12,
	duration: 3200
});
const sourceSvg = await fetch('/example.svg').then((response) => response.text());
const animatedSourceSvg = gradientFormatters.toSvgSourceAnimationMarkup(sourceSvg, gradient, {
	id: 'horse-gradient',
	strokeWidth: 1.6,
	duration: 4200,
	sourceOpacity: 0.16
});
const animation = gradientAnimation.toGradientAnimationCSS({
	selector: '.hero',
	name: 'hero-gradient-shift'
});`;

	const materialCode = `import { gradientMaterial } from '@gradient-ui/core/theme';

const preset = gradientMaterial.createGradientPreset('#704bfd', 'glare', {
	effects: true,
	animations: true,
	shadow: {
		layers: 2,
		blur: 18,
		opacity: 0.24
	},
	animation: {
		preset: 'shift',
		duration: 7200
	}
});

const tokens = gradientMaterial.createGradientTokens('#704bfd', {
	recipes: ['glare', 'soft', 'mesh'],
	effects: true,
	animations: true,
	morph: {
		preset: 'liquid',
		blobCount: 6
	}
});

const material = gradientMaterial.createGradientMaterial('#704bfd', {
	recipe: 'glare',
	effects: true,
	animations: true
});

// SSR-safe structured output:
material.id;
material.className;
material.style;
material.cssVars;
material.cssText;
material.keyframes;`;

	const recipeCode = `gradientCore.createGradientModelFromColor('#704bfd', {
	recipe: 'monochrome'
});

gradientCore.createGradientModelFromColor('#704bfd', {
	recipe: 'complementary'
});

gradientCore.createGradientModelFromColor('#704bfd', {
	recipe: 'split-complementary'
});

gradientCore.createGradientModelFromColor('#704bfd', {
	recipe: 'tetradic'
});

gradientCore.createGradientModelFromColor('#704bfd', {
	recipe: 'rectangle'
});

gradientCore.createGradientModelFromColor('#704bfd', {
	recipe: 'square'
});

gradientCore.createGradientModelFromColor('#704bfd', {
	recipe: 'duotone',
	colors: ['#ff734b', '#00dab0']
});`;

	const workflowCode = `import {
	gradientCore,
	gradientEffects,
	gradientFormatters,
	gradientMaterial
} from '@gradient-ui/core/theme';

const model = gradientCore.createGradientModelFromColor('#704bfd', {
	recipe: 'glare',
	type: 'linear',
	direction: 135
});

const css = gradientFormatters.toCssGradient(model);
const filter = gradientEffects.toGradientMorphFilterMarkup({
	id: 'hero-morph',
	preset: 'soft'
});

const materialTokens = gradientMaterial.createGradientTokens('#704bfd', {
	recipes: ['glare', 'soft', 'mesh'],
	effects: true,
	animations: true
});`;

	const materialContractCode = `import { createGradientMaterial } from '@gradient-ui/gradient-engine/material';

const surfaceMaterial = createGradientMaterial('#704bfd', {
	recipe: 'glare',
	effects: true,
	animations: true,
	shadow: {
		layers: 2,
		blur: 14,
		y: 6,
		spread: -3,
		opacity: 0.24
	},
	dropShadow: {
		layers: 2,
		blur: 14,
		y: 6,
		opacity: 0.36
	}
});

// Vue, React and SSR adapters can consume this shape.
const className = surfaceMaterial.className;
const inlineStyle = surfaceMaterial.style;
const cssVars = surfaceMaterial.cssVars;
const criticalCss = surfaceMaterial.cssText;`;

	const coreApiRows: DocsPropRow[] = [
		{
			name: 'gradientCore',
			type: 'namespace',
			defaultValue: '-',
			description:
				'Framework-free model, recipes, presets and type exports for standalone usage.'
		},
		{
			name: 'gradientFormatters',
			type: 'namespace',
			defaultValue: '-',
			description:
				'Pure output adapters for CSS gradients, SVG gradients, source SVG animation and CanvasGradient.'
		},
		{
			name: 'gradientEffects',
			type: 'namespace',
			defaultValue: '-',
			description:
				'Effect adapters for box-shadow, drop-shadow and SVG-filter morph layers.'
		},
		{
			name: 'gradientAnimation',
			type: 'namespace',
			defaultValue: '-',
			description:
				'CSS animation helpers for background shift, pulse, rotate and hue-rotate motion.'
		},
		{
			name: 'gradientMaterial',
			type: 'namespace',
			defaultValue: '-',
			description:
				'Gradient UI integration layer that turns engine output into reusable CSS variables, presets and material tokens.'
		}
	];

	const formatterApiRows: DocsPropRow[] = [
		{
			name: 'createGradientModelFromColor',
			type: '(color, options) => GradientModel',
			defaultValue: '-',
			description:
				'Creates a reusable gradient model from a seed color and recipe options.'
		},
		{
			name: 'toCssGradient',
			type: '(model) => string',
			defaultValue: '-',
			description: 'Formats the model as a CSS background-image gradient.'
		},
		{
			name: 'toGradientBoxShadow',
			type: '(model, options?) => string',
			defaultValue: '-',
			description:
				'Builds an elevation shadow from one dominant gradient color and an optional neutral contact layer.'
		},
		{
			name: 'toGradientDropShadow',
			type: '(model, options?) => string',
			defaultValue: '-',
			description:
				'Builds CSS drop-shadow filters for icons, images and transparent elements.'
		},
		{
			name: 'toSvgGradientMarkup',
			type: '(model, options?) => string',
			defaultValue: '-',
			description:
				'Creates standalone SVG markup with a gradient paint server and preview shape.'
		},
		{
			name: 'toCanvasGradient',
			type: '(context, model, options?) => CanvasGradient',
			defaultValue: '-',
			description:
				'Converts the model to a CanvasGradient for direct canvas rendering.'
		}
	];

	const materialOptionRows: DocsPropRow[] = [
		{
			name: 'recipes',
			type: 'readonly GradientTokenRecipe[]',
			defaultValue: "['glare', 'soft', 'mesh']",
			description:
				'Token bundle to generate. Recipes can be core harmonies, registered presets or material helpers like mesh and soft.'
		},
		{
			name: 'effects',
			type: 'boolean',
			defaultValue: 'false',
			description:
				'Adds box-shadow, drop-shadow and morph filter variables beside the base gradient variable.'
		},
		{
			name: 'animations',
			type: 'boolean',
			defaultValue: 'false',
			description:
				'Adds animation variables and keyframes from the selected preset or animation options.'
		},
		{
			name: 'morph',
			type: 'GradientMorphOptions',
			defaultValue: '-',
			description:
				'Controls gooey SVG-filter morph output when effects are enabled.'
		},
		{
			name: 'prefix',
			type: 'string',
			defaultValue: '--g-gradient',
			description: 'CSS variable prefix for generated material tokens.'
		},
		{
			name: 'registry',
			type: 'GradientPresetRegistry',
			defaultValue: 'gradientPresets',
			description:
				'Preset registry used to resolve named material recipes.'
		}
	];

	const modelOptionRows: DocsPropRow[] = [
		{
			name: 'recipe',
			type: 'GradientRecipe',
			defaultValue: 'glare',
			description:
				'Color harmony used to generate stops: glare, monochrome, complementary, analogous, triadic, tetradic, rectangle, square or duotone.'
		},
		{
			name: 'type',
			type: 'linear | radial | conic',
			defaultValue: 'linear',
			description:
				'Gradient rendering mode used by CSS, SVG and canvas formatters.'
		},
		{
			name: 'direction',
			type: 'number | string',
			defaultValue: '135',
			description:
				'Linear angle or CSS direction. Used by linear gradients and animation previews.'
		},
		{
			name: 'position',
			type: 'string',
			defaultValue: 'center',
			description:
				'Radial and conic position, for example center, top left or bottom right.'
		},
		{
			name: 'colors',
			type: 'readonly string[]',
			defaultValue: '-',
			description: 'Explicit color list for duotone or custom recipes.'
		}
	];

	const morphOptionRows: DocsPropRow[] = [
		{
			name: 'preset',
			type: 'soft | liquid | ripple',
			defaultValue: 'soft',
			description:
				'Morph motion and filter profile for gooey animated backgrounds.'
		},
		{
			name: 'blendMode',
			type: 'GradientMorphBlendMode',
			defaultValue: 'hard-light',
			description:
				'CSS mix-blend-mode used by generated morph layers and mapped to Figma blend modes in the plugin.'
		},
		{
			name: 'blobCount',
			type: 'number',
			defaultValue: 'preset',
			description:
				'Number of animated radial color blobs generated from the gradient model.'
		},
		{
			name: 'blur',
			type: 'number',
			defaultValue: 'preset',
			description:
				'Outer CSS blur applied after the SVG goo filter. Higher values soften transitions.'
		},
		{
			name: 'contrast',
			type: 'number',
			defaultValue: 'preset',
			description:
				'Alpha contrast inside the SVG filter. Higher values make the morph more visible.'
		},
		{
			name: 'opacity',
			type: 'number',
			defaultValue: 'preset',
			description: 'Opacity of the animated blob layer.'
		},
		{
			name: 'duration',
			type: 'number | string',
			defaultValue: 'preset',
			description:
				'Base animation duration. Individual blobs receive deterministic variation.'
		}
	];
</script>

<template>
	<article class="docs-page docs-gradient-engine">
		<header class="docs-page__header">
			<p class="docs-page__eyebrow">Gradient engine</p>
			<div class="docs-gradient-engine__heading">
				<h1>Gradient engine</h1>
				<docs-release-badge :badge="docsNextReleaseBadge" />
			</div>
			<p>
				The gradient engine turns one seed or a small color set into CSS
				gradients, glow shadows, drop shadows, SVG definitions and
				animation helpers.
			</p>
		</header>

		<section class="docs-page__section">
			<span
				id="overview"
				class="docs-page__anchor"></span>
			<h2>What it generates</h2>
			<p>
				The engine starts with a model and then projects it into the
				format your surface needs: CSS backgrounds, shadows, filters,
				SVG paint servers, source SVG animations, canvas gradients and
				gooey morph backgrounds. The API is split into framework-free
				engine namespaces and a Gradient UI material namespace.
			</p>
			<div class="docs-gradient-engine__feature-grid">
				<div>
					<strong>Core</strong>
					<span>
						Seed, recipes, presets, model creation and shared types.
					</span>
				</div>
				<div>
					<strong>Formatters</strong>
					<span>CSS gradients, SVG markup and canvas gradients.</span>
				</div>
				<div>
					<strong>Effects</strong>
					<span>Box-shadow, drop-shadow and SVG morph filters.</span>
				</div>
				<div>
					<strong>Animation</strong>
					<span>
						Background shift, pulse, rotate and hue-rotate CSS.
					</span>
				</div>
				<div>
					<strong>Material</strong>
					<span>
						Gradient UI tokens, preset bundles, effects and CSS
						vars.
					</span>
				</div>
			</div>
		</section>

		<section class="docs-page__section">
			<span
				id="workflow"
				class="docs-page__anchor"></span>
			<h2>Workflow</h2>
			<p>
				Create a model once, then pass it to the formatter or effect you
				need. Use <code>gradientMaterial</code> only when the result is
				meant to feed Gradient UI themes, materials or components.
			</p>
			<docs-code
				:code="workflowCode"
				language="ts"
				title="Layered API" />
		</section>

		<section class="docs-page__section">
			<span
				id="api-layers"
				class="docs-page__anchor"></span>
			<h2>API layers</h2>
			<p>
				The engine has two audiences. External users can stay in the
				framework-free layers and choose only the output they need.
				Gradient UI components should consume the material layer so the
				same presets drive borders, backgrounds, glow, filters and
				animation.
			</p>
			<div class="docs-gradient-engine__layer-grid">
				<div>
					<strong>Standalone engine</strong>
					<span>
						Use core, formatters, effects and animation helpers
						directly in any UI system.
					</span>
				</div>
				<div>
					<strong>Gradient UI material</strong>
					<span>
						Use material presets and token bundles as the source for
						library surfaces and component internals.
					</span>
				</div>
			</div>
			<docs-code
				:code="standaloneCode"
				language="ts"
				title="Standalone engine" />
		</section>

		<section class="docs-page__section">
			<span
				id="material-integration"
				class="docs-page__anchor"></span>
			<h2>Material integration</h2>
			<p>
				The material layer is the contract between the pure engine and
				Gradient UI components. It should be the single place that
				decides which recipe, shadow, morph filter, animation and CSS
				variables a material surface receives.
			</p>
			<p>
				Use <code>@gradient-ui/gradient-engine</code> directly in React,
				vanilla or another UI library. Gradient UI re-exports the same
				engine through <code>@gradient-ui/core/theme</code> as a
				compatibility facade.
			</p>
			<div class="docs-gradient-engine__material-preview">
				<g-gradient-material
					color="deep-purple"
					:padding="16"
					:border-radius="12">
					Filled material
				</g-gradient-material>
				<g-gradient-material
					variant="outlined"
					color="pink"
					:padding="16"
					:border-width="2"
					:border-radius="12">
					Transparent material
				</g-gradient-material>
				<g-gradient-material
					variant="outlined"
					color="cyan"
					placement="right"
					:padding="16"
					:border-width="3"
					:border-radius="12"
					glow>
					Directional material
				</g-gradient-material>
				<g-gradient-material
					variant="glass"
					color="deep-purple"
					:padding="16"
					:border-width="2"
					:border-radius="12"
					:backdrop-blur="8">
					Glass material
				</g-gradient-material>
			</div>
			<p>
				<code>GGradient</code>, action materials and
				<code>GGradientMaterial</code> now consume the same material
				contract. Remaining surface components can migrate incrementally
				without changing the border implementation.
			</p>
			<docs-code
				:code="materialCode"
				language="ts"
				title="Material tokens" />
			<docs-code
				:code="materialContractCode"
				language="ts"
				title="Component material contract" />
		</section>

		<section class="docs-page__section">
			<span
				id="playground"
				class="docs-page__anchor"></span>
			<h2>Interactive playground</h2>
			<p>
				Tune the model, inspect the visible result, then open generated
				output and source snippets inside each block.
			</p>
			<playground-gradient-engine />
		</section>

		<section class="docs-page__section">
			<span
				id="api"
				class="docs-page__anchor"></span>
			<h2>API surface</h2>
			<p>
				The public API keeps the standalone engine separate from the
				material integration layer. Options stay plain objects so they
				are easy to serialize into design tokens.
			</p>
			<h3>Layers and functions</h3>
			<docs-props-table
				:rows="coreApiRows"
				name-label="Layer"
				default-label="Default" />
			<h3>Core functions</h3>
			<docs-props-table
				:rows="formatterApiRows"
				name-label="Function"
				default-label="Default" />
			<h3>Model options</h3>
			<docs-props-table :rows="modelOptionRows" />
			<h3>Material options</h3>
			<docs-props-table :rows="materialOptionRows" />
			<h3>Morph options</h3>
			<docs-props-table :rows="morphOptionRows" />
		</section>

		<section class="docs-page__section">
			<span
				id="recipes"
				class="docs-page__anchor"></span>
			<h2>Recipes</h2>
			<p>
				Recipes define the color relationship: the classic Gradient UI
				glare, monochrome ramps, complementary pairs, analogous sets,
				triadic sets, tetrads, split-complementary pairs, rectangle and
				square harmonies, and explicit duotone gradients.
			</p>
			<docs-code
				:code="recipeCode"
				language="ts"
				title="Gradient recipes" />
		</section>

		<section class="docs-page__section">
			<span
				id="formats"
				class="docs-page__anchor"></span>
			<h2>Full formatter example</h2>
			<p>
				This example shows the complete set of formatter calls used by
				the playground blocks.
			</p>
			<docs-code
				:code="standaloneCode"
				language="ts"
				title="Gradient formats" />
		</section>
	</article>
</template>

<style lang="scss">
	.docs-gradient-engine {
		&__feature-grid,
		&__layer-grid {
			display: grid;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: var(--g-token-space-4);
		}

		&__layer-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		&__heading {
			display: flex;
			flex-wrap: wrap;
			gap: var(--g-token-space-3);
			align-items: center;

			min-width: 0;
		}

		&__material-preview {
			display: flex;
			flex-wrap: wrap;
			gap: var(--g-token-space-4);

			padding: var(--g-token-space-5);
			border-radius: var(--g-token-radius-lg);

			background-color: var(--g-token-color-surface);
			background-image:
				linear-gradient(
					45deg,
					color-mix(
							in srgb,
							var(--g-token-color-primary) 16%,
							transparent
						)
						25%,
					transparent 25%
				),
				linear-gradient(
					-45deg,
					color-mix(
							in srgb,
							var(--g-token-color-primary) 16%,
							transparent
						)
						25%,
					transparent 25%
				),
				linear-gradient(
					45deg,
					transparent 75%,
					color-mix(
							in srgb,
							var(--g-token-color-primary) 16%,
							transparent
						)
						75%
				),
				linear-gradient(
					-45deg,
					transparent 75%,
					color-mix(
							in srgb,
							var(--g-token-color-primary) 16%,
							transparent
						)
						75%
				);
			background-position:
				0 0,
				0 12px,
				12px -12px,
				-12px 0;
			background-size: 24px 24px;
		}

		&__feature-grid > div,
		&__layer-grid > div {
			display: grid;
			gap: var(--g-token-space-2);

			padding: var(--g-token-space-4);
			border: 1px solid var(--g-token-border-subtle);
			border-radius: var(--g-token-radius-md);

			background: var(--g-token-color-surface);
		}

		&__feature-grid strong,
		&__layer-grid strong {
			color: var(--g-token-color-on-surface);
		}

		&__feature-grid span,
		&__layer-grid span {
			font-size: var(--g-token-font-size-sm);
			line-height: var(--g-token-line-height-md);
			color: var(--g-token-text-muted);
		}

		.docs-page__section > h3 {
			margin-top: var(--g-token-space-5);
			margin-bottom: var(--g-token-space-3);
			color: var(--g-token-color-on-surface);
		}
	}

	@media (width <= 900px) {
		.docs-gradient-engine {
			&__feature-grid,
			&__layer-grid {
				grid-template-columns: 1fr;
			}
		}
	}
</style>
