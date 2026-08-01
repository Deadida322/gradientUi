<script setup lang="ts">
	import { GButton, GGradient, GIcon, GText } from '@/components';
	import type { IconValue } from '@/components/ui/GIcon/types';
	import type { TextType } from '@/components/ui/GText/types';
	import type { GColor } from '@/use/color';
	import DocsCode from '@docs/components/DocsCode.vue';
	import DocsPropsTable from '@docs/components/DocsPropsTable.vue';

	const seedPalette = [
		{ name: 'Primary', token: '--g-theme-primary' },
		{ name: 'Error', token: '--g-theme-error' },
		{ name: 'Warning', token: '--g-theme-warning' },
		{ name: 'Success', token: '--g-theme-success' },
		{ name: 'Surface', token: '--g-theme-surface' },
		{ name: 'Background', token: '--g-theme-background' }
	];
	const semanticPalette = [
		{ name: 'Primary', token: '--g-token-color-primary' },
		{ name: 'On primary', token: '--g-token-color-on-primary' },
		{ name: 'Surface', token: '--g-token-color-surface' },
		{ name: 'On surface', token: '--g-token-color-on-surface' },
		{ name: 'Text muted', token: '--g-token-text-muted' },
		{ name: 'Border subtle', token: '--g-token-border-subtle' }
	];
	const colorFamilies = [
		{
			name: 'Red',
			prop: 'red',
			tones: ['red-100', 'red-300', 'red-500', 'red-800']
		},
		{
			name: 'Orange',
			prop: 'orange',
			tones: ['orange-100', 'orange-300', 'orange-500', 'orange-800']
		},
		{
			name: 'Amber',
			prop: 'amber',
			tones: ['amber-100', 'amber-300', 'amber-500', 'amber-800']
		},
		{
			name: 'Green',
			prop: 'green',
			tones: ['green-100', 'green-300', 'green-500', 'green-800']
		},
		{
			name: 'Teal',
			prop: 'teal',
			tones: ['teal-100', 'teal-300', 'teal-500', 'teal-800']
		},
		{
			name: 'Blue',
			prop: 'blue',
			tones: ['blue-100', 'blue-300', 'blue-500', 'blue-800']
		},
		{
			name: 'Deep purple',
			prop: 'deep-purple',
			tones: [
				'deep-purple-100',
				'deep-purple-300',
				'deep-purple-500',
				'deep-purple-800'
			]
		},
		{
			name: 'Pink',
			prop: 'pink',
			tones: ['pink-100', 'pink-300', 'pink-500', 'pink-800']
		},
		{
			name: 'Blue grey',
			prop: 'blue-grey',
			tones: [
				'blue-grey-100',
				'blue-grey-300',
				'blue-grey-500',
				'blue-grey-800'
			]
		}
	];
	const actionColors = [
		'red-500',
		'orange-500',
		'amber-500',
		'green-500',
		'teal-500',
		'blue-500',
		'deep-purple-500',
		'pink-500',
		'blue-grey-500'
	] as const satisfies readonly GColor[];
	const gradientExamples = [
		{
			name: 'Main',
			token: '--g-token-gradient-main',
			props: {}
		},
		{
			name: 'Error',
			token: '--g-token-gradient-error',
			props: { state: 'error' as const }
		},
		{
			name: 'Warning',
			token: '--g-token-gradient-warning',
			props: { state: 'warning' as const }
		},
		{
			name: 'Success',
			token: '--g-token-gradient-success',
			props: { state: 'success' as const }
		}
	];
	const tonalGradientExamples = [
		'red-500',
		'orange-500',
		'amber-500',
		'green-500',
		'teal-500',
		'blue-500',
		'deep-purple-300',
		'pink-500'
	] as const satisfies readonly GColor[];
	const gradientTextExamples = [
		{
			label: 'Default gradient text',
			className: 'docs-gradient-text-card_lg',
			binding: undefined
		},
		{
			label: 'Warning text',
			binding: 'warning'
		},
		{
			label: 'Deep purple 300',
			binding: 'deep-purple-300'
		},
		{
			label: 'Pink to teal',
			binding: { from: 'pink-500', to: 'teal-500' }
		},
		{
			label: 'Multi color text',
			className: 'docs-gradient-text-card_lg',
			binding: {
				colors: ['red-500', 'orange-500', 'amber-500'],
				direction: '90deg'
			}
		}
	];
	const textExamples: {
		type: TextType;
		label: string;
	}[] = [
		{ type: 'h-3', label: 'Expressive heading' },
		{ type: 'h-5', label: 'Section title' },
		{ type: 'subtitle-1', label: 'Subtitle text for supporting hierarchy' },
		{ type: 'caption', label: 'Caption / metadata text' }
	];
	const iconExamples: {
		icon: IconValue;
		label: string;
	}[] = [
		{ icon: 'palette', label: 'Palette' },
		{ icon: 'gradient-horizontal', label: 'Gradient' },
		{ icon: 'format-text', label: 'Text' },
		{ icon: 'star-four-points', label: 'Accent' }
	];
	const gradientCode = `
<template>
	<g-gradient glow animate-glow :border-width="2" :border-radius="18">
		<div class="token-preview">Gradient surface</div>
	</g-gradient>

	<g-text v-gradient-text="{ from: 'purple', to: 'cyan' }" type="h-4">
		Gradient text
	</g-text>

	<g-icon v-gradient-icon="{ state: 'success' }" icon="star-four-points" />
</template>`;
	const colorCode = `
<template>
	<g-button color="teal-500" variant="gradient" label="gradient" />
	<g-button color="deep-purple-300" variant="outlined" label="Outlined" />
	<g-button color="pink-500" variant="tonal" glow label="Glow" />
</template>`;
	const tokenRows = [
		{
			name: '--g-theme-primary',
			type: 'rgb channel',
			defaultValue: '112, 74, 255',
			description:
				'Primary theme seed used by semantic tokens and gradients.'
		},
		{
			name: '--g-token-color-surface',
			type: 'color',
			defaultValue: 'rgb(var(--g-theme-surface))',
			description: 'Base component and page surface.'
		},
		{
			name: '--g-token-border-subtle',
			type: 'color',
			description: 'Low-emphasis borders for tables, panels and controls.'
		},
		{
			name: '--g-token-radius-md',
			type: 'length',
			defaultValue: '10px',
			description: 'Default medium rounding for compact surfaces.'
		},
		{
			name: '--g-token-gradient-main',
			type: 'gradient',
			description:
				'Primary expressive gradient used by gradient-aware UI.'
		}
	];
</script>

<template>
	<article class="docs-page">
		<header class="docs-page__header">
			<p class="docs-page__eyebrow">Foundation</p>
			<h1>Design tokens</h1>
			<p>
				Gradient UI exposes its visual language as CSS custom
				properties. Override theme channels, semantic colors or
				component tokens to make the library feel native in your
				product.
			</p>
		</header>

		<section class="docs-page__section">
			<span
				id="token-layers"
				class="docs-page__anchor"></span>
			<h2>Token layers</h2>
			<div class="docs-page__grid">
				<div class="docs-page__tile">
					<h3>Primitive</h3>
					<p>
						Foundational values for typography, spacing, radius,
						motion, opacity and elevation.
					</p>
				</div>
				<div class="docs-page__tile">
					<h3>Semantic</h3>
					<p>
						Product-facing roles such as primary, surface, text,
						border and focus ring.
					</p>
				</div>
				<div class="docs-page__tile">
					<h3>Component</h3>
					<p>
						Per-component sizing and behavior tokens for buttons,
						fields, overlays and typography.
					</p>
				</div>
			</div>
		</section>

		<section class="docs-page__section docs-token-section">
			<span
				id="palette"
				class="docs-page__anchor"></span>
			<h2>Palette</h2>
			<p>
				Palettes use a predictable <code>50–900</code> shade scale. The
				default component color is <code>500</code>. The scale omits
				pure white and black endpoints. Theme tokens store RGB channels,
				while semantic tokens expose ready-to-use CSS colors.
			</p>

			<div class="docs-token-palette">
				<div
					v-for="color in seedPalette"
					:key="color.token"
					class="docs-token-swatch">
					<span
						class="docs-token-swatch__preview"
						:style="{
							background: `rgb(var(${color.token}))`
						}"></span>
					<span class="docs-token-swatch__name">{{
						color.name
					}}</span>
					<code>{{ color.token }}</code>
				</div>
			</div>

			<div class="docs-token-palette docs-token-palette_semantic">
				<div
					v-for="color in semanticPalette"
					:key="color.token"
					class="docs-token-swatch">
					<span
						class="docs-token-swatch__preview"
						:style="{ background: `var(${color.token})` }"></span>
					<span class="docs-token-swatch__name">{{
						color.name
					}}</span>
					<code>{{ color.token }}</code>
				</div>
			</div>

			<div class="docs-tone-matrix">
				<div
					v-for="family in colorFamilies"
					:key="family.name"
					class="docs-tone-family">
					<div class="docs-tone-family__header">
						<strong>{{ family.name }}</strong>
						<code>{{ family.prop }}</code>
					</div>
					<div class="docs-tone-family__tones">
						<div
							v-for="tone in family.tones"
							:key="tone"
							class="docs-tone"
							:style="{
								background: `rgb(var(--g-color-${tone}))`,
								color: `rgb(var(--g-color-on-${tone}))`
							}">
							{{ tone }}
						</div>
					</div>
				</div>
			</div>

			<div class="docs-color-actions">
				<g-button
					v-for="color in actionColors"
					:key="color"
					:color="color"
					variant="gradient"
					size="s"
					glow
					:label="color" />
			</div>

			<docs-code
				:code="colorCode"
				title="Using tonal colors" />
		</section>

		<section class="docs-page__section docs-token-section">
			<span
				id="gradients"
				class="docs-page__anchor"></span>
			<h2>Gradients</h2>
			<p>
				Gradient tokens are used by action surfaces, text and icons as
				an expressive accent layer over accessible semantic color roles.
			</p>

			<div class="docs-gradient-grid">
				<g-gradient
					v-for="gradient in gradientExamples"
					:key="gradient.token"
					v-bind="gradient.props"
					glow
					shadow
					:border-width="2"
					:border-radius="18">
					<div class="docs-gradient-card">
						<strong>{{ gradient.name }}</strong>
						<code>{{ gradient.token }}</code>
					</div>
				</g-gradient>
			</div>

			<div class="docs-gradient-ramp">
				<div
					v-for="color in tonalGradientExamples"
					:key="color"
					class="docs-gradient-ramp__item"
					:style="{
						background: `var(--g-gradient-${color})`
					}">
					<span>{{ color }}</span>
					<code>--g-gradient-{{ color }}</code>
				</div>
			</div>

			<div class="docs-gradient-text-grid">
				<div
					v-for="item in gradientTextExamples"
					:key="item.label"
					v-gradient-text="item.binding"
					class="docs-gradient-text-card"
					:class="item.className">
					{{ item.label }}
				</div>
			</div>

			<docs-code
				:code="gradientCode"
				title="Gradient usage" />
		</section>

		<section class="docs-page__section docs-token-section">
			<span
				id="typography"
				class="docs-page__anchor"></span>
			<h2>Typography</h2>
			<p>
				<code>GText</code> maps type props to typography tokens and can
				combine labels with icons or gradient text.
			</p>

			<div class="docs-type-stack">
				<g-text
					v-for="item in textExamples"
					:key="item.type"
					:type="item.type"
					class="docs-type-stack__item">
					{{ item.label }}
				</g-text>
				<g-text
					v-gradient-text="{ from: 'purple', to: 'cyan' }"
					type="h-4">
					Gradient headline
				</g-text>
			</div>
		</section>

		<section class="docs-page__section docs-token-section">
			<span
				id="icons"
				class="docs-page__anchor"></span>
			<h2>Icons</h2>
			<p>
				Icons use the same sizing tokens as text and controls. The
				<code>v-gradient-icon</code> directive targets MDI glyphs for
				expressive icon treatments.
			</p>

			<div class="docs-icon-grid">
				<div
					v-for="item in iconExamples"
					:key="item.icon"
					class="docs-icon-card">
					<g-icon
						:icon="item.icon"
						:size="28" />
					<span>{{ item.label }}</span>
					<code>{{ item.icon }}</code>
				</div>
				<div
					v-gradient-icon="{ from: 'deep-purple', to: 'light-blue' }"
					class="docs-icon-card docs-icon-card_gradient">
					<g-icon
						icon="star-four-points"
						:size="32" />
					<span>Gradient icon</span>
					<code>v-gradient-icon</code>
				</div>
				<div
					v-gradient-icon="{
						colors: ['red-500', 'orange-500', 'amber-500'],
						direction: '90deg'
					}"
					class="docs-icon-card docs-icon-card_gradient">
					<g-icon
						icon="flash"
						:size="32" />
					<span>Multi color</span>
					<code>colors[]</code>
				</div>
			</div>
		</section>

		<section class="docs-page__section">
			<span
				id="common-tokens"
				class="docs-page__anchor"></span>
			<h2>Common tokens</h2>
			<docs-props-table :rows="tokenRows" />
		</section>
	</article>
</template>

<style scoped lang="scss">
	.docs-token-section {
		code {
			width: fit-content;
			padding: 2px 6px;
			border-radius: var(--g-token-radius-xs);

			font-family: SFMono-Regular, Consolas, 'Liberation Mono', monospace;
			font-size: var(--g-token-font-size-xs);

			background: rgba(var(--g-theme-on-surface), 0.06);
		}
	}

	.docs-token-palette {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: var(--g-token-space-3);

		&_semantic {
			margin-top: var(--g-token-space-1);
		}
	}

	.docs-tone-matrix {
		display: grid;
		gap: var(--g-token-space-3);
	}

	.docs-tone-family {
		display: grid;
		gap: var(--g-token-space-2);

		min-width: 0;
		padding: var(--g-token-space-4);
		border: 1px solid var(--g-token-border-subtle);
		border-radius: var(--g-token-radius-md);

		background: rgba(var(--g-theme-surface), 0.72);

		&__header {
			display: flex;
			gap: var(--g-token-space-2);
			align-items: center;
			justify-content: space-between;

			strong {
				font-size: var(--g-token-font-size-sm);
				font-weight: var(--g-token-font-weight-bold);
				color: var(--g-token-color-on-surface);
			}
		}

		&__tones {
			display: grid;
			grid-template-columns: repeat(4, minmax(0, 1fr));
			gap: var(--g-token-space-2);
		}
	}

	.docs-tone {
		display: flex;
		align-items: flex-end;

		min-height: 64px;
		padding: var(--g-token-space-2);
		border-radius: var(--g-token-radius-sm);

		font-size: var(--g-token-font-size-xs);
		font-weight: var(--g-token-font-weight-bold);
	}

	.docs-color-actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--g-token-space-3);
	}

	.docs-token-swatch {
		display: grid;
		gap: var(--g-token-space-2);

		min-width: 0;
		padding: var(--g-token-space-4);
		border: 1px solid var(--g-token-border-subtle);
		border-radius: var(--g-token-radius-md);

		background: rgba(var(--g-theme-surface), 0.72);

		&__preview {
			display: block;

			width: 100%;
			height: 56px;
			border: 1px solid var(--g-token-border-subtle);
			border-radius: var(--g-token-radius-sm);
		}

		&__name {
			font-size: var(--g-token-font-size-sm);
			font-weight: var(--g-token-font-weight-bold);
			color: var(--g-token-color-on-surface);
		}

		&__value {
			font-size: var(--g-token-font-size-xs);
			color: var(--g-token-text-muted);
		}
	}

	.docs-gradient-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: var(--g-token-space-4);

		:deep(.g-gradient) {
			width: 100%;
		}

		:deep(.g-gradient__slot) {
			height: 100%;
		}
	}

	.docs-gradient-card {
		display: grid;
		gap: var(--g-token-space-2);
		align-content: end;

		min-height: 116px;
		padding: var(--g-token-space-4);

		strong {
			font-size: var(--g-token-font-size-lg);
			font-weight: var(--g-token-font-weight-bold);
			color: var(--g-token-color-on-surface);
		}
	}

	.docs-gradient-ramp {
		display: grid;
		gap: var(--g-token-space-3);
	}

	.docs-gradient-ramp__item {
		display: flex;
		gap: var(--g-token-space-2);
		align-items: flex-end;
		justify-content: space-between;

		min-height: 96px;
		padding: var(--g-token-space-4);
		border-radius: var(--g-token-radius-md);

		color: white;

		box-shadow: var(--g-token-elevation-1);

		span {
			font-size: var(--g-token-font-size-lg);
			font-weight: var(--g-token-font-weight-bold);
		}

		code {
			background: rgb(255 255 255 / 18%);
		}
	}

	.docs-gradient-text-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		gap: var(--g-token-space-3);
	}

	.docs-gradient-text-card {
		overflow: hidden;

		padding: var(--g-token-space-4);
		border: 1px solid var(--g-token-border-subtle);
		border-radius: var(--g-token-radius-md);

		font-size: var(--g-token-font-size-lg);
		font-weight: var(--g-token-font-weight-bold);
		line-height: var(--g-token-line-height-lg);
		text-overflow: ellipsis;
		white-space: nowrap;

		background: rgba(var(--g-theme-surface), 0.72);

		&_lg {
			font-size: 24px;
			line-height: 32px;
		}
	}

	.docs-type-stack {
		display: grid;
		gap: var(--g-token-space-3);

		padding: var(--g-token-space-5);
		border: 1px solid var(--g-token-border-subtle);
		border-radius: var(--g-token-radius-md);

		background: rgba(var(--g-theme-surface), 0.72);
	}

	.docs-icon-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: var(--g-token-space-3);
	}

	.docs-icon-card {
		display: grid;
		gap: var(--g-token-space-2);
		justify-items: start;

		padding: var(--g-token-space-4);
		border: 1px solid var(--g-token-border-subtle);
		border-radius: var(--g-token-radius-md);

		color: var(--g-token-color-on-surface);

		background: rgba(var(--g-theme-surface), 0.72);

		span {
			font-size: var(--g-token-font-size-sm);
			font-weight: var(--g-token-font-weight-bold);
		}

		&_gradient {
			border-color: var(--g-token-border-strong);
		}
	}
</style>
