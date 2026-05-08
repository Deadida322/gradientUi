<script setup lang="ts">
	import { GButton, GGradient, GIcon, GText } from '@/components';
	import DocsCode from '@docs/components/DocsCode.vue';

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
					color="deep-purple-60"
					position="left"
					:border-width="4"
					:border-radius="18">
					<div class="docs-core__gradient-card">
						<g-icon
							icon="palette"
							size="28" />
						<strong>Directional border</strong>
						<span>
							Use <code>position</code> for single-side gradient
							accents.
						</span>
					</div>
				</g-gradient>
			</div>

			<div class="docs-core__actions">
				<g-button
					label="Filled action"
					variant="filled" />
				<g-button
					label="Tonal action"
					variant="tonal"
					color="teal40" />
				<g-button
					label="Outlined action"
					variant="outlined"
					color="deep-purple-60" />
				<g-button
					label="Outlined action"
					variant="text"
					color="pink-50" />
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
		&__gradient-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
			gap: var(--g-token-space-4);
		}

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
				width: 100%;
				height: 100%;
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
