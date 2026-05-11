<script setup lang="ts">
	import { computed, ref, watch } from 'vue';
	import { useRoute } from 'vue-router';
	import { GTab, GTabList, GTabs } from '@/components';
	import DocsComponentExamples from '@docs/components/DocsComponentExamples.vue';
	import DocsLiveExample from '@docs/components/DocsLiveExample.vue';
	import DocsLiveExampleTabs from '@docs/components/DocsLiveExampleTabs.vue';
	import DocsPropsTable from '@docs/components/DocsPropsTable.vue';
	import {
		componentApi,
		componentApiCssVariables,
		componentApiEmits,
		componentCatalog,
		componentGroups
	} from '@docs/data/componentApi';
	import { componentPages } from '@docs/data/componentPages';

	const route = useRoute();
	const apiTab = ref('props');
	const component = computed(() =>
		componentApi.find((item) => item.id === route.params.componentId)
	);
	const componentPage = computed(() =>
		componentPages.find((page) => page.id === component.value?.id)
	);
	const group = computed(() =>
		componentGroups.find((item) => item.id === component.value?.group)
	);
	const slotRows = computed(() =>
		(component.value?.slots ?? []).map((slot) => ({
			name: slot.name,
			type: slot.type,
			defaultValue: slot.scope || '-',
			description: slot.description
		}))
	);
	const emitRows = computed(() => {
		if (!component.value) return [];

		return (
			component.value.emits ?? componentApiEmits[component.value.id] ?? []
		);
	});
	const cssVariableRows = computed(() => {
		if (!component.value) return [];

		return (
			component.value.cssVariables ??
			componentApiCssVariables[component.value.id] ??
			[]
		);
	});
	const apiTabs = computed(() => {
		if (!component.value) return [];

		return [
			{ value: 'props', label: 'Props', rows: component.value.props },
			{ value: 'slots', label: 'Slots', rows: slotRows.value },
			{ value: 'emits', label: 'Emits', rows: emitRows.value },
			{
				value: 'cssVariables',
				label: 'CSS vars',
				rows: cssVariableRows.value
			}
		].filter((tab) => tab.rows.length);
	});
	const hasApiTabs = computed(() => apiTabs.value.length > 1);
	const availableComponentPages = computed(
		() =>
			componentCatalog.filter((item) => item.to !== undefined) as Array<
				(typeof componentCatalog)[number] & { to: string }
			>
	);
	const currentNavigationIndex = computed(() =>
		availableComponentPages.value.findIndex(
			(item) => item.id === component.value?.id
		)
	);
	const previousComponent = computed(() => {
		const index = currentNavigationIndex.value;
		const item =
			index > 0 ? availableComponentPages.value[index - 1] : undefined;

		return item?.to ? item : undefined;
	});
	const nextComponent = computed(() => {
		const index = currentNavigationIndex.value;
		const item =
			index >= 0 && index < availableComponentPages.value.length - 1
				? availableComponentPages.value[index + 1]
				: undefined;

		return item?.to ? item : undefined;
	});

	watch(
		() => route.params.componentId,
		() => {
			apiTab.value = 'props';
		}
	);
</script>

<template>
	<article
		v-if="component"
		class="docs-page docs-component-detail">
		<header class="docs-page__header">
			<p class="docs-page__eyebrow">{{ group?.title || 'Component' }}</p>
			<h1>{{ component.title }}</h1>
			<p>{{ component.description }}</p>
		</header>

		<template v-if="componentPage">
			<section class="docs-page__section">
				<span
					id="usage"
					class="docs-page__anchor"></span>
				<h2>{{ componentPage.usage.title }}</h2>
				<p>{{ componentPage.usage.description }}</p>
				<docs-live-example :example="componentPage.usage.example" />
			</section>

			<section class="docs-page__section">
				<span
					id="examples"
					class="docs-page__anchor"></span>
				<h2>{{ componentPage.examples.title }}</h2>
				<p>{{ componentPage.examples.description }}</p>
				<docs-live-example-tabs
					:label="`${component.title} examples`"
					:examples="componentPage.examples.items" />
			</section>
		</template>

		<section
			v-else
			class="docs-page__section">
			<span
				id="usage"
				class="docs-page__anchor"></span>
			<h2>Usage</h2>
			<p>
				Import <code>{{ component.title }}</code> from
				<code>@gradient-ui/core</code> and combine it with shared
				component props for <code>color</code>, <code>size</code>,
				<code>state</code> and <code>variant</code>.
			</p>
			<docs-component-examples :tabs="component.examples" />
		</section>

		<section class="docs-page__section">
			<span
				id="api"
				class="docs-page__anchor"></span>
			<h2>API</h2>
			<g-tabs
				v-if="hasApiTabs"
				v-model="apiTab"
				variant="line"
				color="primary">
				<g-tab-list :aria-label="`${component.title} API`">
					<g-tab
						v-for="tab in apiTabs"
						:key="tab.value"
						:value="tab.value"
						:label="tab.label" />
				</g-tab-list>
				<docs-props-table
					v-if="apiTab === 'props'"
					:rows="component.props" />
				<docs-props-table
					v-else-if="apiTab === 'slots'"
					:rows="slotRows"
					name-label="Slot"
					default-label="Scope" />
				<docs-props-table
					v-else-if="apiTab === 'emits'"
					:rows="emitRows"
					name-label="Event"
					default-label="Payload" />
				<docs-props-table
					v-else
					:rows="cssVariableRows"
					name-label="Variable"
					default-label="Default" />
			</g-tabs>
			<docs-props-table
				v-else
				:rows="component.props" />
		</section>

		<nav
			v-if="previousComponent || nextComponent"
			class="docs-component-detail__pager"
			aria-label="Component pagination">
			<router-link
				v-if="previousComponent"
				class="docs-component-detail__pager-card docs-component-detail__pager-card_previous"
				:to="previousComponent.to || '/docs/components'">
				<span class="docs-component-detail__pager-kicker"
					>Previous</span
				>
				<strong>{{ previousComponent.title }}</strong>
				<span>{{ previousComponent.description }}</span>
			</router-link>
			<span
				v-else
				class="docs-component-detail__pager-spacer"></span>

			<router-link
				v-if="nextComponent"
				class="docs-component-detail__pager-card docs-component-detail__pager-card_next"
				:to="nextComponent.to || '/docs/components'">
				<span class="docs-component-detail__pager-kicker">Next</span>
				<strong>{{ nextComponent.title }}</strong>
				<span>{{ nextComponent.description }}</span>
			</router-link>
		</nav>
	</article>

	<article
		v-else
		class="docs-page">
		<header class="docs-page__header">
			<p class="docs-page__eyebrow">404</p>
			<h1>Component not found</h1>
			<p>This component page is not available yet.</p>
		</header>
		<router-link
			class="docs-page__link"
			to="/docs/components">
			Back to components
		</router-link>
	</article>
</template>

<style lang="scss">
	.docs-component-detail {
		&__intro,
		&__removable-demo {
			display: flex;
			flex-wrap: wrap;
			gap: var(--g-token-space-3);
			align-items: center;

			padding: var(--g-token-space-4);
			border: 1px solid var(--g-token-border-subtle);
			border-radius: var(--g-token-radius-md);

			background: rgba(var(--g-theme-surface), 0.72);
		}

		&__matrix {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
			gap: var(--g-token-space-3);
			align-items: center;

			padding: var(--g-token-space-4);
			border: 1px dashed var(--g-token-border-strong);
			border-radius: var(--g-token-radius-md);

			background: rgba(var(--g-theme-surface), 0.72);
		}

		&__stack {
			display: grid;
			gap: var(--g-token-space-3);
			min-width: 0;
		}

		&__card-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
			gap: var(--g-token-space-3);
		}

		&__surface-card {
			padding: var(--g-token-space-4);
			border: 1px solid var(--g-token-border-subtle);
			border-radius: var(--g-token-radius-md);

			font-size: var(--g-token-font-size-sm);
			color: var(--g-token-color-on-surface);

			background: rgba(var(--g-theme-on-surface), 0.04);

			&_compact {
				width: fit-content;
				max-width: 100%;
			}
		}

		&__note {
			max-width: 100%;
			margin: 0;

			font-size: var(--g-token-font-size-sm);
			line-height: var(--g-token-line-height-md);
			color: var(--g-token-text-soft);
		}

		&__value-line {
			display: inline-flex;
			gap: var(--g-token-space-2);
			align-items: center;

			width: fit-content;
			max-width: 100%;
			margin: 0;
			padding: var(--g-token-space-2) var(--g-token-space-3);
			border: 1px solid rgba(var(--g-theme-primary), 0.16);
			border-radius: var(--g-token-radius-pill);

			font-size: var(--g-token-font-size-sm);
			line-height: var(--g-token-line-height-md);
			color: var(--g-token-text-soft);

			background: rgba(var(--g-theme-primary), 0.07);

			span {
				font-weight: var(--g-token-font-weight-bold);
				color: var(--g-token-color-primary);
			}

			code {
				overflow: hidden;

				max-width: min(420px, 58vw);
				padding: 2px 8px;
				border: 1px solid rgba(var(--g-theme-on-surface), 0.08);
				border-radius: var(--g-token-radius-pill);

				font-family:
					SFMono-Regular, Consolas, 'Liberation Mono', monospace;
				font-size: var(--g-token-font-size-xs);
				color: var(--g-token-color-on-surface);
				text-overflow: ellipsis;
				white-space: nowrap;

				background: rgba(var(--g-theme-surface), 0.88);
			}
		}

		&__title-row {
			display: inline-flex;
			gap: var(--g-token-space-3);
			align-items: center;
			justify-content: space-between;

			width: 100%;
			min-width: 0;
		}

		&__badge {
			display: inline-flex;
			flex: 0 0 auto;
			align-items: center;

			padding: 2px 8px;
			border: 1px solid rgba(var(--g-theme-on-surface), 0.12);
			border-radius: var(--g-token-radius-pill);

			font-size: var(--g-token-font-size-xs);
			line-height: var(--g-token-line-height-xs);
			color: var(--g-token-text-soft);

			background: rgba(var(--g-theme-on-surface), 0.04);
		}

		&__placement-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
			gap: var(--g-token-space-3);

			padding: var(--g-token-space-4);
			border: 1px dashed var(--g-token-border-strong);
			border-radius: var(--g-token-radius-md);

			background:
				linear-gradient(
					90deg,
					rgba(var(--g-theme-on-surface), 0.04) 1px,
					transparent 1px
				),
				linear-gradient(
					rgba(var(--g-theme-on-surface), 0.04) 1px,
					transparent 1px
				),
				rgba(var(--g-theme-surface), 0.72);
			background-size: 24px 24px;
		}

		&__removable-demo {
			display: grid;
			align-items: start;

			p {
				max-width: 100%;
				margin: 0;
				font-size: var(--g-token-font-size-sm);
			}
		}

		&__removable-list {
			display: flex;
			flex-wrap: wrap;
			gap: var(--g-token-space-3);
		}

		&__count {
			display: inline-flex;
			align-items: center;
			justify-content: center;

			min-width: 22px;
			padding: 2px 6px;
			border-radius: var(--g-token-radius-pill);

			font-size: var(--g-token-font-size-xs);
			line-height: 1;
			color: var(--g-token-color-primary);

			background: rgba(var(--g-theme-primary), 0.12);
		}

		&__menu-surface {
			width: min(100%, 340px);
			padding: var(--g-token-space-2);
			border: 1px solid var(--g-token-border-subtle);
			border-radius: var(--g-token-radius-md);

			background:
				linear-gradient(
					135deg,
					rgba(var(--g-theme-primary), 0.08),
					transparent 58%
				),
				rgba(var(--g-theme-surface), 0.86);
			box-shadow: var(--g-token-elevation-1);
		}

		&__menu-item {
			display: inline-flex;
			gap: var(--g-token-space-3);
			align-items: center;
			justify-content: space-between;

			width: 100%;
			min-width: 0;

			span:first-child {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		&__form-preview {
			display: grid;
			gap: var(--g-token-space-4);

			width: min(100%, 520px);
			padding: var(--g-token-space-5);
			border: 1px solid var(--g-token-border-subtle);
			border-radius: var(--g-token-radius-md);

			background: rgba(var(--g-theme-surface), 0.72);
		}

		&__field-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
			gap: var(--g-token-space-5);

			padding: var(--g-token-space-5);
			border: 1px dashed var(--g-token-border-strong);
			border-radius: var(--g-token-radius-md);

			background: rgba(var(--g-theme-surface), 0.72);
		}

		&__field-hint {
			color: var(--g-token-color-primary);
		}

		&__drawer-header {
			display: flex;
			gap: var(--g-token-space-3);
			align-items: flex-start;
			justify-content: space-between;

			width: 100%;
			min-width: 0;

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
				margin-top: var(--g-token-space-1);
				font-size: var(--g-token-font-size-sm);
				color: var(--g-token-text-soft);
			}
		}

		&__fab-stage,
		&__fab-grid,
		&__fab-placement,
		&__quick-actions-stage,
		&__badge-stage,
		&__snackbar-stage,
		&__snackbar-row,
		&__feedback-stack,
		&__loading-stage,
		&__loading-grid {
			padding: var(--g-token-space-5);
			border: 1px dashed var(--g-token-border-strong);
			border-radius: var(--g-token-radius-md);
			background: rgba(var(--g-theme-surface), 0.72);
		}

		&__fab-stage,
		&__fab-grid,
		&__badge-stage {
			display: flex;
			flex-wrap: wrap;
			gap: var(--g-token-space-4);
			align-items: center;
		}

		&__feedback-stack {
			display: grid;
			gap: var(--g-token-space-4);
		}

		&__loading-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
			gap: var(--g-token-space-4);
		}

		&__loading-stage {
			position: relative;
			min-height: 180px;
			background:
				linear-gradient(
					90deg,
					rgba(var(--g-theme-on-surface), 0.04) 1px,
					transparent 1px
				),
				linear-gradient(
					rgba(var(--g-theme-on-surface), 0.04) 1px,
					transparent 1px
				),
				rgba(var(--g-theme-surface), 0.72);
			background-size: 24px 24px;
		}

		&__loading-card {
			position: relative;

			display: grid;
			gap: var(--g-token-space-2);

			min-height: 160px;
			padding: var(--g-token-space-5);
			border: 1px solid var(--g-token-border-subtle);
			border-radius: var(--g-token-radius-md);

			background: rgba(var(--g-theme-surface), 0.72);

			strong {
				font-size: var(--g-token-font-size-lg);
				color: var(--g-token-color-on-surface);
			}

			&-text {
				max-width: 340px;
				color: var(--g-token-text-soft);
			}
		}

		&__fab-placement,
		&__quick-actions-stage,
		&__snackbar-stage {
			position: relative;
			min-height: 260px;
			background:
				linear-gradient(
					90deg,
					rgba(var(--g-theme-on-surface), 0.04) 1px,
					transparent 1px
				),
				linear-gradient(
					rgba(var(--g-theme-on-surface), 0.04) 1px,
					transparent 1px
				),
				rgba(var(--g-theme-surface), 0.72);
			background-size: 24px 24px;
		}

		&__quick-actions-stage {
			overflow: hidden;
		}

		&__snackbar-stage {
			overflow: hidden;
			min-height: 220px;

			&_tall {
				min-height: 360px;
			}
		}

		&__snackbar-row {
			display: flex;
			justify-content: flex-start;
		}

		&__inline-demo {
			display: grid;
			grid-template-columns: minmax(240px, 1fr) minmax(0, auto);
			gap: var(--g-token-space-4);
			align-items: start;

			padding: var(--g-token-space-5);
			border: 1px dashed var(--g-token-border-strong);
			border-radius: var(--g-token-radius-md);

			background: rgba(var(--g-theme-surface), 0.72);
		}

		&__pager {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: var(--g-token-space-4);

			padding-top: var(--g-token-space-4);
			border-top: 1px solid var(--g-token-border-subtle);
		}

		&__pager-card {
			display: grid;
			gap: var(--g-token-space-2);

			min-width: 0;
			padding: var(--g-token-space-4);
			border: 1px solid var(--g-token-border-subtle);
			border-radius: var(--g-token-radius-md);

			color: var(--g-token-color-on-surface);
			text-decoration: none;

			background:
				linear-gradient(
					135deg,
					rgba(var(--g-theme-primary), 0.08),
					transparent 54%
				),
				rgba(var(--g-theme-surface), 0.72);

			transition:
				border-color var(--g-token-duration-hover)
					var(--g-token-easing-standard),
				transform var(--g-token-duration-hover)
					var(--g-token-easing-standard),
				box-shadow var(--g-token-duration-hover)
					var(--g-token-easing-standard);

			strong {
				font-size: var(--g-token-font-size-lg);
				line-height: var(--g-token-line-height-lg);
			}

			span:last-child {
				font-size: var(--g-token-font-size-sm);
				line-height: var(--g-token-line-height-md);
				color: var(--g-token-text-soft);
			}

			&:hover {
				transform: translateY(-1px);
				border-color: rgba(var(--g-theme-primary), 0.32);
				box-shadow: var(--g-token-elevation-2);
			}

			&:focus-visible {
				outline: var(--g-token-state-focus-ring-width) solid
					var(--g-token-focus-ring);
				outline-offset: 2px;
			}

			&_next {
				text-align: right;
				background:
					linear-gradient(
						225deg,
						rgba(var(--g-theme-primary), 0.08),
						transparent 54%
					),
					rgba(var(--g-theme-surface), 0.72);
			}
		}

		&__pager-kicker {
			font-size: var(--g-token-font-size-xs);
			font-weight: var(--g-token-font-weight-bold);
			color: var(--g-token-color-primary);
			text-transform: uppercase;
		}

		&__pager-spacer {
			min-width: 0;
		}
	}

	@media (width <= 720px) {
		.docs-component-detail {
			&__inline-demo {
				grid-template-columns: minmax(0, 1fr);
			}

			&__pager {
				grid-template-columns: minmax(0, 1fr);
			}

			&__pager-card_next {
				text-align: left;
			}
		}
	}
</style>
