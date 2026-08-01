<script setup lang="ts">
	import { GButton, GGradient, GIcon, GText } from '@/components';
	import DocsCode from '@docs/components/DocsCode.vue';

	const gradientEngineCode = `import {
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

const background = gradientFormatters.toCssGradient(model);
const shadow = gradientEffects.toGradientBoxShadow(model, {
	layers: 2,
	blur: 18,
	y: 6,
	spread: -3,
	opacity: 0.24
});

const material = gradientMaterial.createGradientTokens('#704bfd', {
	recipes: ['glare', 'soft', 'mesh'],
	effects: true,
	animations: true
});`;

	const gradientCode = `
<template>
	<g-gradient
		glow
		shadow
		:border-width="2"
		:border-radius="18">
		<div class="surface-card">Gradient surface</div>
	</g-gradient>
</template>`;
</script>

<template>
	<article class="docs-page docs-core">
		<header class="docs-page__header">
			<p class="docs-page__eyebrow">Foundation</p>
			<h1>Core conceptions</h1>
			<p>
				Gradient UI is built around calm surfaces, semantic state,
				Material You structure and expressive gradients that can be
				applied to borders, text, icons and action layers.
			</p>
		</header>

		<section class="docs-page__grid">
			<div
				id="material-you"
				class="docs-page__tile">
				<h2>Material You</h2>
				<p>
					Components prefer semantic color roles, rounded geometry,
					state layers, tonal variants and predictable density.
				</p>
			</div>
			<div
				id="gradients"
				class="docs-page__tile">
				<h2>Gradients</h2>
				<p>
					Gradient tokens are a controlled accent system, not a
					replacement for accessible foreground and surface contrast.
				</p>
			</div>
			<div
				id="composable-apis"
				class="docs-page__tile">
				<h2>Composable APIs</h2>
				<p>
					Components share a predictable prop vocabulary:
					<code>variant</code>, <code>size</code>, <code>color</code>,
					<code>state</code>, <code>rounded</code> and
					<code>placement</code> mean the same thing across the
					library.
				</p>
			</div>
			<div
				id="examples-as-contracts"
				class="docs-page__tile">
				<h2>Examples as contracts</h2>
				<p>
					Examples are designed to be copied into real Vue apps: each
					pattern shows the component, the code and the API contract
					together.
				</p>
			</div>
		</section>

		<section class="docs-page__section">
			<span
				id="gradient-engine"
				class="docs-page__anchor"></span>
			<h2>Gradient engine foundation</h2>
			<p>
				The visual material is built on top of the
				<code>gradient-engine</code>: first it creates a pure gradient
				model, then formatters turn that model into CSS, SVG, canvas,
				shadows, filters and reusable Gradient UI tokens.
			</p>

			<div class="docs-core__engine-grid">
				<div class="docs-core__engine-card">
					<strong>Core model</strong>
					<span>
						Seed color, palette shade, recipe, type, direction and
						stops stay framework-free.
					</span>
				</div>
				<div class="docs-core__engine-card">
					<strong>Output adapters</strong>
					<span>
						The same model can become a CSS background, SVG paint
						server, box-shadow, drop-shadow or canvas gradient.
					</span>
				</div>
				<div class="docs-core__engine-card">
					<strong>Material tokens</strong>
					<span>
						Gradient UI consumes the engine through material tokens
						instead of hand-writing one-off gradient styles.
					</span>
				</div>
			</div>

			<docs-code
				:code="gradientEngineCode"
				language="ts"
				title="gradient-engine material contract" />
		</section>

		<section class="docs-page__section">
			<span
				id="surface"
				class="docs-page__anchor"></span>
			<h2>Surface</h2>
			<p>
				Surfaces are the quiet layer of Gradient UI. They carry layout,
				content and elevation while color is applied through semantic
				roles, state overlays and optional gradient accents.
			</p>

			<div class="docs-core__surface-grid">
				<div class="docs-core__surface-card">
					<g-text
						type="subtitle-1"
						label="Neutral surface" />
					<p>
						Use plain surfaces for long-form content, forms and
						repeated interface regions.
					</p>
				</div>
				<div
					class="docs-core__surface-card docs-core__surface-card_tonal">
					<g-text
						type="subtitle-1"
						label="Tonal surface" />
					<p>
						Use tonal backgrounds to separate local context without
						turning the page into a color field.
					</p>
				</div>
				<div
					class="docs-core__surface-card docs-core__surface-card_elevated">
					<g-text
						type="subtitle-1"
						label="Elevated surface" />
					<p>
						Use elevation for layers that float above nearby
						content, such as menus and panels.
					</p>
				</div>
			</div>
		</section>

		<section class="docs-page__section">
			<span
				id="g-gradient"
				class="docs-page__anchor"></span>
			<h2>GGradient primitive</h2>
			<p>
				<code>GGradient</code> is the base primitive behind
				gradient-aware surfaces. It wraps any content with a gradient
				border and can add glow, shadow, rounded geometry and state
				colors.
			</p>

			<div class="docs-core__gradient-grid">
				<g-gradient
					glow
					shadow
					:border-width="2"
					:border-radius="18">
					<div class="docs-core__gradient-card">
						<g-icon
							icon="star-four-points"
							size="28" />
						<strong>Main glow</strong>
						<span>Default gradient with glow and elevation.</span>
					</div>
				</g-gradient>

				<g-gradient
					state="success"
					glow
					:border-width="2"
					:border-radius="18">
					<div class="docs-core__gradient-card">
						<g-icon
							icon="check-circle-outline"
							size="28" />
						<strong>Success state</strong>
						<span
							>Semantic state gradients work with the same
							primitive.</span
						>
					</div>
				</g-gradient>

				<g-gradient
					color="deep-purple-300"
					placement="left"
					:border-width="4"
					glow
					:border-radius="18">
					<div class="docs-core__gradient-card">
						<g-icon
							icon="palette"
							size="28" />
						<strong>Directional border</strong>
						<span>
							Use <code>placement</code> for single-side gradient
							accents.
						</span>
					</div>
				</g-gradient>
			</div>

			<div class="docs-core__actions">
				<g-button
					label="filled action"
					gradient-recipe="analogous" />
				<g-button
					label="Tonal action"
					variant="tonal"
					color="teal" />
				<g-button
					label="Outlined action"
					variant="outlined"
					color="deep-purple-300" />
				<g-button
					label="gradient action"
					gradient-recipe="analogous"
					variant="gradient" />
				<g-button
					label="Outlined action"
					variant="text"
					color="pink-400" />
			</div>

			<docs-code
				:code="gradientCode"
				title="GGradient.vue" />
		</section>
	</article>
</template>

<style scoped lang="scss">
	.docs-core {
		&__surface-grid,
		&__gradient-grid,
		&__engine-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
			gap: var(--g-token-space-4);
		}

		&__engine-card,
		&__surface-card,
		&__gradient-card {
			display: grid;
			gap: var(--g-token-space-3);

			min-height: 156px;
			padding: var(--g-token-space-5);
			border: 1px solid var(--g-token-border-subtle);
			border-radius: var(--g-token-radius-lg);

			background: rgb(var(--g-theme-surface));

			p,
			span {
				margin: 0;
				font-size: var(--g-token-font-size-sm);
				line-height: var(--g-token-line-height-lg);
				color: var(--g-token-text-soft);
			}

			strong {
				font-size: var(--g-token-font-size-lg);
				font-weight: var(--g-token-font-weight-bold);
				color: var(--g-token-color-on-surface);
			}
		}

		&__surface-card_tonal {
			background: color-mix(
				in srgb,
				var(--g-token-color-primary) 8%,
				rgb(var(--g-theme-surface))
			);
		}

		&__surface-card_elevated {
			box-shadow: var(--g-token-elevation-2);
		}

		&__gradient-grid {
			:deep(.g-gradient) {
				align-self: stretch;
				width: 100%;
				height: auto;
			}

			:deep(.g-gradient__slot) {
				height: 100%;
			}
		}

		&__gradient-card {
			border: 0;
		}

		&__actions {
			display: flex;
			flex-wrap: wrap;
			gap: var(--g-token-space-3);
		}
	}
</style>
