<script setup lang="ts">
	import DocsCode from '@docs/components/DocsCode.vue';
	import {
		componentCatalog,
		componentGroups
	} from '@docs/data/componentApi';

	const importCode =
		`
<script setup lang="ts">
	import { GButton, GInput, GSelect } from 'gradient-ui';
<` +
		`/script>

<template>
	<g-input label="Email" />
	<g-button label="Continue" variant="filled" />
</template>`;

	const anatomyCode = `
<g-component
	v-model="value"
	variant="filled"
	size="m"
	color="primary"
	state="success">
	<template #prepend>...</template>
	Component content
	<template #append>...</template>
</g-component>`;

	const componentsByGroup = (groupId: string) =>
		componentCatalog.filter((component) => component.group === groupId);

	const getComponentUrl = (id: string) => `/docs/components/${id}`;
</script>

<template>
	<article class="docs-page docs-components">
		<header class="docs-page__header">
			<p class="docs-page__eyebrow">Components</p>
			<h1>Components</h1>
			<p>
				Gradient UI components are Vue 3 building blocks with shared
				props, accessible interaction patterns and a gradient-aware
				visual language.
			</p>
		</header>

		<section class="docs-page__section">
			<span
				id="using-components"
				class="docs-page__anchor"></span>
			<h2>Using components</h2>
			<p>
				Import components from <code>gradient-ui</code> and use them
				directly in Vue single-file components. Public APIs are
				intentionally small: most components share <code>variant</code>,
				<code>size</code>, <code>color</code>, <code>disabled</code>,
				<code>rounded</code>, <code>state</code> and slot conventions.
			</p>
			<docs-code
				:code="importCode"
				title="AccountForm.vue" />
		</section>

		<section class="docs-page__section">
			<span
				id="component-groups"
				class="docs-page__anchor"></span>
			<h2>Component groups</h2>
			<p>
				The library is organized by product tasks: containment,
				navigation, form input, selection and feedback. Each group uses
				the same token system, so density, color and states remain
				consistent.
			</p>

			<div class="docs-components__groups">
				<section
					v-for="group in componentGroups"
					:key="group.id"
					class="docs-components__group">
					<h3>{{ group.title }}</h3>
					<p>{{ group.description }}</p>
					<div class="docs-components__chips">
						<router-link
							v-for="component in componentsByGroup(group.id)"
							:key="component.id"
							class="docs-components__chip"
							:class="{
								'docs-components__chip_disabled': !component.to
							}"
							:to="component.to || getComponentUrl(component.id)">
							{{ component.title }}
						</router-link>
					</div>
				</section>
			</div>
		</section>

		<section class="docs-page__section">
			<span
				id="anatomy"
				class="docs-page__anchor"></span>
			<h2>Anatomy</h2>
			<p>
				Most Gradient UI components follow the same mental model: a root
				surface, optional leading and trailing slots, content, and state
				layers powered by design tokens.
			</p>

			<div class="docs-components__anatomy">
				<div class="docs-components__anatomy-row">
					<strong>Root</strong>
					<span
						>Owns size, variant, color, state and accessibility
						attributes.</span
					>
				</div>
				<div class="docs-components__anatomy-row">
					<strong>Content</strong>
					<span
						>Default slot or label prop rendered with predictable
						typography.</span
					>
				</div>
				<div class="docs-components__anatomy-row">
					<strong>Slots</strong>
					<span>
						<code>prepend</code>, <code>append</code>,
						<code>header</code>, <code>footer</code> and
						<code>actions</code> where relevant.
					</span>
				</div>
				<div class="docs-components__anatomy-row">
					<strong>State</strong>
					<span
						>Visual feedback from hover, focus, selected, disabled
						and validation states.</span
					>
				</div>
			</div>

			<docs-code
				:code="anatomyCode"
				title="Shared shape" />
		</section>

		<section class="docs-page__section">
			<span
				id="component-index"
				class="docs-page__anchor"></span>
			<h2>Component index</h2>
			<p>
				Documented components link to dedicated pages with usage
				guidance, live examples, copyable source and prop tables. The
				remaining entries describe the public surface that will receive
				dedicated pages next.
			</p>

			<div class="docs-components__index">
				<router-link
					v-for="component in componentCatalog"
					:key="component.id"
					class="docs-components__card"
					:class="{
						'docs-components__card_disabled': !component.to
					}"
					:to="component.to || getComponentUrl(component.id)">
					<span>{{ component.title }}</span>
					<p>{{ component.description }}</p>
					<small v-if="!component.to">Page coming soon</small>
				</router-link>
			</div>
		</section>
	</article>
</template>

<style scoped lang="scss">
	.docs-components {
		&__groups,
		&__index {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
			gap: var(--g-token-space-4);
		}

		&__group,
		&__card,
		&__anatomy {
			border: 1px solid var(--g-token-border-subtle);
			border-radius: var(--g-token-radius-md);
			background: rgba(var(--g-theme-surface), 0.72);
		}

		&__group {
			display: grid;
			gap: var(--g-token-space-3);
			align-content: start;
			padding: var(--g-token-space-5);

			h3,
			p {
				margin: 0;
			}

			h3 {
				font-size: var(--g-token-font-size-lg);
				font-weight: var(--g-token-font-weight-bold);
				color: var(--g-token-color-on-surface);
			}

			p {
				font-size: var(--g-token-font-size-sm);
				line-height: var(--g-token-line-height-lg);
				color: var(--g-token-text-soft);
			}
		}

		&__chips {
			display: flex;
			flex-wrap: wrap;
			gap: var(--g-token-space-2);
		}

		&__chip {
			padding: var(--g-token-space-1) var(--g-token-space-3);
			border-radius: var(--g-token-radius-pill);

			font-size: var(--g-token-font-size-sm);
			font-weight: var(--g-token-font-weight-medium);
			color: var(--g-token-color-primary);
			text-decoration: none;

			background: rgba(var(--g-theme-primary), 0.08);

			&_disabled {
				pointer-events: none;
				color: var(--g-token-text-muted);
				background: rgba(var(--g-theme-on-surface), 0.05);
			}
		}

		&__anatomy {
			overflow: hidden;
			display: grid;
		}

		&__anatomy-row {
			display: grid;
			grid-template-columns: 140px minmax(0, 1fr);
			gap: var(--g-token-space-4);

			padding: var(--g-token-space-4);
			border-bottom: 1px solid var(--g-token-border-subtle);

			&:last-child {
				border-bottom: 0;
			}

			strong {
				font-weight: var(--g-token-font-weight-bold);
				color: var(--g-token-color-on-surface);
			}

			span {
				color: var(--g-token-text-soft);
			}
		}

		&__card {
			display: grid;
			gap: var(--g-token-space-2);
			padding: var(--g-token-space-5);
			text-decoration: none;

			span {
				font-size: var(--g-token-font-size-lg);
				font-weight: var(--g-token-font-weight-bold);
				color: var(--g-token-color-on-surface);
			}

			p {
				margin: 0;
				font-size: var(--g-token-font-size-sm);
				line-height: var(--g-token-line-height-lg);
				color: var(--g-token-text-soft);
			}

			small {
				font-size: var(--g-token-font-size-xs);
				color: var(--g-token-text-muted);
			}

			&:hover,
			&:focus-visible {
				border-color: var(--g-token-border-strong);
			}

			&_disabled {
				pointer-events: none;
				opacity: var(--g-token-opacity-soft);
			}
		}
	}

	@media (width <= 640px) {
		.docs-components__anatomy-row {
			grid-template-columns: 1fr;
			gap: var(--g-token-space-2);
		}
	}
</style>
