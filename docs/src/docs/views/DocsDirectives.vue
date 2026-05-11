<script setup lang="ts">
	import DocsCode from '@docs/components/DocsCode.vue';
	import DocsLiveExampleTabs from '@docs/components/DocsLiveExampleTabs.vue';
	import DocsPropsTable from '@docs/components/DocsPropsTable.vue';
	import {
		gradientDirectiveExamples,
		loadingDirectiveExamples,
		maskDirectiveExamples,
		rippleDirectiveExamples,
		tooltipDirectiveExamples
	} from '@docs/examples/directives';
	import type { DocsPropRow } from '@docs/types';

	const installCode = `import { createApp } from 'vue';
import {
	vGradientText,
	vLoading,
	vMask,
	vRipple,
	vTooltip
} from '@gradient-ui/core';
import App from './App.vue';

const app = createApp(App);

app.directive('gradient-text', vGradientText);
app.directive('loading', vLoading);
app.directive('mask', vMask);
app.directive('ripple', vRipple);
app.directive('tooltip', vTooltip);

app.mount('#app');`;

	const directiveRows: DocsPropRow[] = [
		{
			name: 'v-loading',
			type: 'boolean | LoadingOptions',
			defaultValue: 'false',
			description:
				'Renders a local GLoading overlay inside the bound element. Accepts active, text, color, dark, opacity, blur and progressView.'
		},
		{
			name: 'v-tooltip',
			type: 'string | TooltipOptions',
			defaultValue: '-',
			description:
				'Attaches a GTooltip to the element for hover and focus. Object syntax supports content, placement and offset.'
		},
		{
			name: 'v-mask',
			type: 'string | string[] | MaskOptions',
			defaultValue: '-',
			description:
				'Formats native input and textarea values with #, X, S, A and a tokens. Object syntax supports custom tokens.'
		},
		{
			name: 'v-gradient-text',
			type: 'GColor | GradientTextOptions',
			defaultValue: 'main gradient',
			description:
				'Applies a token-aware CSS gradient to text. Use color, state, from/to, colors, direction, gradient or selector.'
		},
		{
			name: 'v-gradient-icon',
			type: 'GColor | GradientTextOptions',
			defaultValue: 'main gradient',
			description:
				'Gradient text behavior scoped to icon elements inside the host, useful for MDI icon markup.'
		},
		{
			name: 'v-ripple',
			type: 'boolean | GColor | RippleOptions',
			defaultValue: 'currentColor',
			description:
				'Adds a pointer ripple to action surfaces. Object syntax supports color, center, disabled, duration, easing and opacity.'
		}
	];
</script>

<template>
	<article class="docs-page docs-directives">
		<header class="docs-page__header">
			<p class="docs-page__eyebrow">Directives</p>
			<h1>Directives</h1>
			<p>
				Directives are the low-friction API layer for behavior that
				belongs to an existing element: loading overlays, hints, ripples
				and gradient text accents.
			</p>
		</header>

		<section class="docs-page__section">
			<span
				id="when-to-use"
				class="docs-page__anchor"></span>
			<h2>When to use directives</h2>
			<p>
				Use components when you need structure, slots and a visible API
				surface. Use directives when the element already exists and only
				needs a behavior attached to it. This keeps templates compact
				without hiding important state.
			</p>

			<div class="docs-directives__cards">
				<section class="docs-page__tile">
					<h3>Element behavior</h3>
					<p>
						<code>v-ripple</code> and <code>v-tooltip</code> enhance
						buttons, links and custom controls without wrapping
						markup.
					</p>
				</section>
				<section class="docs-page__tile">
					<h3>Local overlays</h3>
					<p>
						<code>v-loading</code> keeps async state attached to the
						card, table or form section that is actually refreshing.
					</p>
				</section>
				<section class="docs-page__tile">
					<h3>Input formatting</h3>
					<p>
						<code>v-mask</code> formats native inputs when you do
						not need the full <code>GInput</code> field shell.
					</p>
				</section>
				<section class="docs-page__tile">
					<h3>Visual accents</h3>
					<p>
						<code>v-gradient-text</code> and
						<code>v-gradient-icon</code> reuse Gradient UI color and
						gradient language outside component internals.
					</p>
				</section>
			</div>
		</section>

		<section class="docs-page__section">
			<span
				id="registration"
				class="docs-page__anchor"></span>
			<h2>Registration</h2>
			<p>
				Register directives globally when they are part of the design
				system vocabulary. You can also register one directive locally
				in a Vue component when a feature is isolated.
			</p>
			<docs-code
				:code="installCode"
				title="main.ts" />
		</section>

		<section class="docs-page__section">
			<span
				id="loading"
				class="docs-page__anchor"></span>
			<h2>Loading</h2>
			<p>
				<code>v-loading</code> is the directive form of
				<code>GLoading</code>. It is best for cards, tables, form
				sections and previews where the loading state belongs to one
				specific element.
			</p>
			<docs-live-example-tabs
				label="Loading directive examples"
				:examples="loadingDirectiveExamples" />
		</section>

		<section class="docs-page__section">
			<span
				id="tooltip"
				class="docs-page__anchor"></span>
			<h2>Tooltip</h2>
			<p>
				<code>v-tooltip</code> is the shortest path to a contextual
				hint. It listens to hover and focus, so it works for mouse and
				keyboard users without wrapping the control.
			</p>
			<docs-live-example-tabs
				label="Tooltip directive examples"
				:examples="tooltipDirectiveExamples" />
		</section>

		<section class="docs-page__section">
			<span
				id="mask"
				class="docs-page__anchor"></span>
			<h2>Mask</h2>
			<p>
				<code>v-mask</code> is the directive layer for simple native
				fields. Use the <code>mask</code> prop on <code>GInput</code>
				when you need Gradient UI field styling, validation and raw
				model output.
			</p>
			<docs-live-example-tabs
				label="Mask directive examples"
				:examples="maskDirectiveExamples" />
		</section>

		<section class="docs-page__section">
			<span
				id="gradient-text"
				class="docs-page__anchor"></span>
			<h2>Gradient text and icons</h2>
			<p>
				Use <code>v-gradient-text</code> for editorial accents,
				headlines and selected inline text. Use
				<code>v-gradient-icon</code> when the gradient should target MDI
				icon markup inside the element.
			</p>
			<docs-live-example-tabs
				label="Gradient directive examples"
				:examples="gradientDirectiveExamples" />
		</section>

		<section class="docs-page__section">
			<span
				id="ripple"
				class="docs-page__anchor"></span>
			<h2>Ripple</h2>
			<p>
				<code>v-ripple</code> adds lightweight pointer feedback to
				custom action surfaces. Components can own this internally, but
				the directive keeps the same behavior available for app-specific
				markup.
			</p>
			<docs-live-example-tabs
				label="Ripple directive examples"
				:examples="rippleDirectiveExamples" />
		</section>

		<section class="docs-page__section">
			<span
				id="api"
				class="docs-page__anchor"></span>
			<h2>API</h2>
			<p>
				Directive bindings accept either compact values for the common
				case or object values when you need explicit behavior.
			</p>
			<docs-props-table
				name-label="Directive"
				default-label="Default"
				:rows="directiveRows" />
		</section>
	</article>
</template>

<style lang="scss">
	.docs-directives,
	.docs-directives-example {
		&__cards {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
			gap: var(--g-token-space-4);
		}

		&__panel {
			position: relative;

			display: grid;
			gap: var(--g-token-space-2);

			min-height: 150px;
			padding: var(--g-token-space-5);
			border: 1px solid var(--g-token-border-subtle);
			border-radius: var(--g-token-radius-md);

			background:
				linear-gradient(
					135deg,
					rgba(var(--g-theme-primary), 0.08),
					transparent 58%
				),
				rgba(var(--g-theme-surface), 0.76);

			strong,
			h3 {
				margin: 0;
				font-size: var(--g-token-font-size-lg);
				font-weight: var(--g-token-font-weight-bold);
				color: var(--g-token-color-on-surface);
			}

			span {
				max-width: 620px;
				color: var(--g-token-text-soft);
			}

			&_image {
				color: var(--g-token-color-surface);
				background:
					linear-gradient(
						135deg,
						rgba(var(--g-theme-deep-purple), 0.88),
						rgba(var(--g-theme-cyan), 0.62)
					),
					rgb(var(--g-theme-on-surface));

				span,
				strong {
					color: currentcolor;
				}
			}
		}

		&__gradient-title {
			width: fit-content;
			max-width: 100%;

			font-size: clamp(38px, 8vw, 72px) !important;
			line-height: 1 !important;
			letter-spacing: 0;
		}

		&__single-gradient {
			width: fit-content;
			max-width: 100%;
			margin: 0;

			font-size: clamp(28px, 5vw, 44px) !important;
			line-height: 1.08 !important;
			letter-spacing: 0;
		}

		&__field-label {
			display: grid;
			gap: var(--g-token-space-2);

			width: min(100%, 360px);

			font-size: var(--g-token-font-size-sm);
			font-weight: var(--g-token-font-weight-bold);
			color: var(--g-token-color-on-surface);
		}

		&__field {
			box-sizing: border-box;
			width: 100%;
			padding: var(--g-token-space-3) var(--g-token-space-4);
			border: 1px solid var(--g-token-border-subtle);
			border-radius: var(--g-token-radius-sm);

			font: inherit;
			font-weight: var(--g-token-font-weight-regular);
			color: var(--g-token-color-on-surface);

			background: rgba(var(--g-theme-surface), 0.84);

			&:focus-visible {
				outline: var(--g-token-state-focus-ring-width) solid
					var(--g-token-focus-ring);
				outline-offset: 2px;
			}
		}

		&__icon-chip {
			display: inline-flex;
			gap: var(--g-token-space-2);
			align-items: center;

			padding: var(--g-token-space-3) var(--g-token-space-4);
			border: 1px solid var(--g-token-border-subtle);
			border-radius: var(--g-token-radius-pill);

			font-weight: var(--g-token-font-weight-bold);

			background: rgba(var(--g-theme-surface), 0.78);

			.mdi {
				font-size: 24px;
			}
		}

		&__action {
			cursor: pointer;

			position: relative;

			display: inline-flex;
			align-items: center;
			justify-content: center;

			min-height: 40px;
			padding: var(--g-token-space-2) var(--g-token-space-4);
			border: 1px solid color-mix(in srgb, currentcolor 18%, transparent);
			border-radius: var(--g-token-radius-sm);

			font: inherit;
			font-weight: var(--g-token-font-weight-bold);
			color: var(--g-token-color-primary);

			background: color-mix(in srgb, currentcolor 10%, transparent);

			&_cyan {
				color: rgb(var(--g-color-cyan-40));
			}

			&_pink {
				color: rgb(var(--g-color-pink-40));
			}

			&:focus-visible {
				outline: var(--g-token-state-focus-ring-width) solid
					var(--g-token-focus-ring);
				outline-offset: 2px;
			}
		}
	}

	.docs-directives-example {
		display: grid;
		gap: var(--g-token-space-4);

		&_row {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
		}
	}
</style>
