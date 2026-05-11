<script setup lang="ts">
	import DocsCode from '@docs/components/DocsCode.vue';
	import DocsPropsTable from '@docs/components/DocsPropsTable.vue';
	import type { DocsPropRow } from '@docs/types';

	const scriptCloseTag = '<' + '/script>';

	const spacingCode = `<template>
	<section class="d-grid gap-4 p-5 rounded-md elevation-1">
		<header class="d-flex justify-between align-center gap-3">
			<h2 class="m-0 text-primary">Billing</h2>
			<span class="text-soft">Updated now</span>
		</header>

		<p class="m-0 text-muted">
			Use spacing helpers when local layout needs a tiny adjustment without a
			new component class.
		</p>
	</section>
</template>`;

	const responsiveCode = `<template>
	<div class="d-flex flex-column flex-md-row gap-3 gap-md-5">
		<aside class="w-100">Filters</aside>
		<main class="flex-1">Results</main>
	</div>
</template>`;

	const breakpointsCode = `<script setup lang="ts">
	import { useBreakpoints } from '@gib/gradient-ui';

	const display = useBreakpoints();
	const drawerAvailable = display.down('md');
	const wideContent = display.up('lg');
${scriptCloseTag}

<template>
	<g-button
		v-if="drawerAvailable"
		icon-button="menu"
		aria-label="Open menu" />

	<section :class="{ 'docs-shell_wide': wideContent }">
		<slot />
	</section>
</template>`;

	const customBreakpointsCode = `<script setup lang="ts">
	import { useBreakpoints } from '@gib/gradient-ui';

	const display = useBreakpoints({
		phone: 0,
		tablet: 768,
		desktop: 1200
	});

	const desktop = display.up('desktop');
${scriptCloseTag}`;

	const helperRows: DocsPropRow[] = [
		{
			name: 'd-*',
			type: 'display',
			defaultValue: 'none, block, flex, grid...',
			description:
				'Display utilities. Also available with breakpoints: d-sm-flex, d-md-grid, d-lg-none.'
		},
		{
			name: 'flex-*',
			type: 'flex',
			defaultValue: 'row, column, wrap, 1...',
			description:
				'Flex direction and behavior helpers: flex-row, flex-column, flex-wrap, flex-1, flex-grow-1, flex-shrink-0.'
		},
		{
			name: 'justify-* / align-*',
			type: 'alignment',
			defaultValue: 'start, center, between...',
			description:
				'Alignment helpers for flex and grid layouts. Responsive variants exist for common layout shifts.'
		},
		{
			name: 'm*, p*, gap-*',
			type: 'spacing',
			defaultValue: '0-6',
			description:
				'Token-based spacing utilities for margin, padding and gap. Supports logical aliases like mx, my, ms, me, px and py.'
		},
		{
			name: 'text-*',
			type: 'typography',
			defaultValue: 'left, primary, muted...',
			description:
				'Text alignment and semantic text color helpers, plus text-no-wrap and text-truncate.'
		},
		{
			name: 'bg-*',
			type: 'surface',
			defaultValue: 'primary, surface',
			description:
				'Small background color helpers for simple surfaces and chips.'
		},
		{
			name: 'rounded-*',
			type: 'radius',
			defaultValue: '0, sm, md, lg, pill',
			description: 'Radius helpers mapped to Gradient UI radius tokens.'
		},
		{
			name: 'elevation-*',
			type: 'shadow',
			defaultValue: '1-3',
			description:
				'Elevation helpers mapped to Gradient UI elevation tokens.'
		},
		{
			name: 'useBreakpoints',
			type: 'composable',
			defaultValue: 'sm: 600, md: 900, lg: 1200, xl: 1536',
			description:
				'Reactive viewport helper for JS-driven responsive behavior: up, down, between, name, width and height.'
		}
	];
</script>

<template>
	<article class="docs-page docs-css-helpers">
		<header class="docs-page__header">
			<p class="docs-page__eyebrow">CSS</p>
			<h1>CSS helpers</h1>
			<p>
				Gradient UI ships a small utility layer for layout, spacing,
				alignment, text, radius and elevation. Helpers are token-based
				and become available as soon as the library stylesheet is
				imported.
			</p>
		</header>

		<section class="docs-page__section">
			<span
				id="usage"
				class="docs-page__anchor"></span>
			<h2>Usage</h2>
			<p>
				Helpers are for small composition work around components. Use
				them to arrange examples, cards and app-specific markup, but
				keep reusable component styling inside component classes.
			</p>
			<docs-code
				:code="spacingCode"
				title="Token spacing" />
		</section>

		<section class="docs-page__section">
			<span
				id="layout"
				class="docs-page__anchor"></span>
			<h2>Layout and flex</h2>
			<p>
				Display and flex helpers cover the common cases: inline layout,
				stacked layout, centered content and responsive direction
				changes.
			</p>

			<div class="docs-css-helpers__preview d-grid gap-4 p-5 rounded-md">
				<div class="d-flex flex-wrap gap-3 align-center">
					<span class="docs-css-helpers__chip">d-flex</span>
					<span class="docs-css-helpers__chip">flex-wrap</span>
					<span class="docs-css-helpers__chip">gap-3</span>
					<span class="docs-css-helpers__chip">align-center</span>
				</div>
				<div
					class="flex-center docs-css-helpers__center-box rounded-md">
					flex-center
				</div>
			</div>
		</section>

		<section class="docs-page__section">
			<span
				id="spacing"
				class="docs-page__anchor"></span>
			<h2>Spacing</h2>
			<p>
				Spacing helpers use the same
				<code>--g-token-space-*</code> scale as the components. The
				available scale is <code>0</code> through <code>6</code>.
			</p>

			<div class="docs-css-helpers__spacing-grid">
				<div
					v-for="step in [0, 1, 2, 3, 4, 5, 6]"
					:key="step"
					class="docs-css-helpers__space-row">
					<code>gap-{{ step }}</code>
					<span
						:class="`docs-css-helpers__space docs-css-helpers__space_${step}`"></span>
				</div>
			</div>
		</section>

		<section class="docs-page__section">
			<span
				id="text-and-color"
				class="docs-page__anchor"></span>
			<h2>Text and color</h2>
			<p>
				Text helpers cover alignment, truncation and semantic color.
				Background helpers are intentionally small: they exist for quick
				surfaces, not full component variants.
			</p>

			<div class="docs-css-helpers__preview d-grid gap-3 p-5 rounded-md">
				<p class="m-0 text-primary">text-primary</p>
				<p class="m-0 text-success">text-success</p>
				<p class="m-0 text-warning">text-warning</p>
				<p class="m-0 text-error">text-error</p>
				<p class="m-0 text-muted text-truncate">
					text-muted with text-truncate keeps long supporting copy
					inside its container without layout jumps.
				</p>
			</div>
		</section>

		<section class="docs-page__section">
			<span
				id="responsive"
				class="docs-page__anchor"></span>
			<h2>Responsive helpers</h2>
			<p>
				Responsive helpers use mobile-first breakpoints:
				<code>sm</code>, <code>md</code>, <code>lg</code> and
				<code>xl</code>. Prefix the helper with the breakpoint when a
				layout should change above that width.
			</p>
			<docs-code
				:code="responsiveCode"
				title="Responsive composition" />
		</section>

		<section class="docs-page__section">
			<span
				id="breakpoints"
				class="docs-page__anchor"></span>
			<h2>Breakpoints composable</h2>
			<p>
				CSS helpers are enough for most layout shifts, but some
				interfaces need responsive logic in Vue: opening a drawer only
				on mobile, hiding expensive content below desktop, or switching
				component variants. Use <code>useBreakpoints</code> for that.
			</p>

			<div class="docs-css-helpers__breakpoint-grid">
				<div class="docs-css-helpers__breakpoint-card">
					<code>display.width</code>
					<span>Current viewport width.</span>
				</div>
				<div class="docs-css-helpers__breakpoint-card">
					<code>display.name</code>
					<span>Current matched breakpoint name.</span>
				</div>
				<div class="docs-css-helpers__breakpoint-card">
					<code>display.up('lg')</code>
					<span>True at and above the target width.</span>
				</div>
				<div class="docs-css-helpers__breakpoint-card">
					<code>display.down('md')</code>
					<span>True at and below the target width.</span>
				</div>
				<div class="docs-css-helpers__breakpoint-card">
					<code>display.between('sm', 'lg')</code>
					<span>True inside a width range.</span>
				</div>
			</div>

			<docs-code
				:code="breakpointsCode"
				title="Responsive component logic" />

			<p>
				Projects can pass their own map when the app uses product
				breakpoints instead of Gradient UI defaults.
			</p>

			<docs-code
				:code="customBreakpointsCode"
				title="Custom breakpoint map" />
		</section>

		<section class="docs-page__section">
			<span
				id="api"
				class="docs-page__anchor"></span>
			<h2>API</h2>
			<p>
				The helper API is deliberately compact. When a pattern needs
				more than these classes, prefer a local class or a Gradient UI
				component prop.
			</p>
			<docs-props-table
				name-label="Helper"
				default-label="Values"
				:rows="helperRows" />
		</section>
	</article>
</template>

<style lang="scss">
	.docs-css-helpers {
		&__preview,
		&__spacing-grid {
			border: 1px solid var(--g-token-border-subtle);
			background: rgba(var(--g-theme-surface), 0.74);
		}

		&__chip {
			display: inline-flex;
			align-items: center;

			padding: var(--g-token-space-2) var(--g-token-space-3);
			border: 1px solid color-mix(in srgb, currentcolor 18%, transparent);
			border-radius: var(--g-token-radius-pill);

			font-size: var(--g-token-font-size-sm);
			font-weight: var(--g-token-font-weight-bold);
			color: var(--g-token-color-primary);

			background: color-mix(in srgb, currentcolor 8%, transparent);
		}

		&__center-box {
			min-height: 96px;
			border: 1px dashed var(--g-token-border-strong);
			font-weight: var(--g-token-font-weight-bold);
			color: var(--g-token-text-soft);
		}

		&__spacing-grid {
			display: grid;
			gap: var(--g-token-space-3);
			padding: var(--g-token-space-5);
			border-radius: var(--g-token-radius-md);
		}

		&__space-row {
			display: grid;
			grid-template-columns: 72px minmax(0, 1fr);
			gap: var(--g-token-space-4);
			align-items: center;
		}

		&__space {
			display: block;

			width: var(--docs-helper-space);
			height: 14px;
			border-radius: var(--g-token-radius-pill);

			background: var(--g-token-gradient-main);

			&_0 {
				--docs-helper-space: 2px;
			}

			&_1 {
				--docs-helper-space: var(--g-token-space-1);
			}

			&_2 {
				--docs-helper-space: var(--g-token-space-2);
			}

			&_3 {
				--docs-helper-space: var(--g-token-space-3);
			}

			&_4 {
				--docs-helper-space: var(--g-token-space-4);
			}

			&_5 {
				--docs-helper-space: var(--g-token-space-5);
			}

			&_6 {
				--docs-helper-space: var(--g-token-space-6);
			}
		}

		&__breakpoint-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
			gap: var(--g-token-space-3);
		}

		&__breakpoint-card {
			display: grid;
			gap: var(--g-token-space-2);

			padding: var(--g-token-space-4);
			border: 1px solid var(--g-token-border-subtle);
			border-radius: var(--g-token-radius-md);

			background: rgba(var(--g-theme-surface), 0.72);

			span {
				font-size: var(--g-token-font-size-sm);
				line-height: var(--g-token-line-height-md);
				color: var(--g-token-text-soft);
			}
		}
	}
</style>
