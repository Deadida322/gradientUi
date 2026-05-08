<script setup lang="ts">
	import { computed, ref } from 'vue';
	import type { DocsExampleTab } from '@docs/types';
	import DocsCode from './DocsCode.vue';

	const props = defineProps<{
		tabs: DocsExampleTab[];
	}>();

	const activeId = ref(props.tabs[0]?.id || '');

	const activeTab = computed(
		() =>
			props.tabs.find((tab) => tab.id === activeId.value) || props.tabs[0]
	);

	const selectTab = (id: string) => {
		activeId.value = id;
	};
</script>

<template>
	<section class="docs-example-tabs">
		<div
			class="docs-example-tabs__list"
			role="tablist">
			<button
				v-for="tab in tabs"
				:id="`docs-tab-${tab.id}`"
				:key="tab.id"
				class="docs-example-tabs__tab"
				:class="{
					'docs-example-tabs__tab_active': activeId === tab.id
				}"
				type="button"
				role="tab"
				:aria-selected="activeId === tab.id"
				:aria-controls="`docs-panel-${tab.id}`"
				@click="selectTab(tab.id)">
				{{ tab.label }}
			</button>
		</div>
		<div
			v-if="activeTab"
			:id="`docs-panel-${activeTab.id}`"
			class="docs-example-tabs__panel"
			role="tabpanel"
			:aria-labelledby="`docs-tab-${activeTab.id}`">
			<slot :name="activeTab.id"></slot>
			<docs-code
				:code="activeTab.code"
				title="Example" />
		</div>
	</section>
</template>

<style lang="scss">
	.docs-example-tabs {
		display: grid;
		gap: var(--g-token-space-4);

		&__list {
			display: inline-flex;
			gap: var(--g-token-space-1);
			align-items: center;

			width: fit-content;
			padding: var(--g-token-space-1);
			border: 1px solid var(--g-token-border-subtle);
			border-radius: var(--g-token-radius-md);

			background: rgba(var(--g-theme-on-surface), 0.04);
		}

		&__tab {
			cursor: pointer;

			min-width: 104px;
			padding: var(--g-token-space-2) var(--g-token-space-3);
			border: 0;
			border-radius: var(--g-token-radius-sm);

			font-size: var(--g-token-font-size-sm);
			font-weight: var(--g-token-font-weight-medium);
			color: var(--g-token-text-muted);

			background: transparent;

			&:focus-visible {
				outline: var(--g-token-state-focus-ring-width) solid
					var(--g-token-focus-ring);
				outline-offset: 2px;
			}

			&_active {
				color: var(--g-token-color-on-primary);
				background: var(--g-token-color-primary);
				box-shadow: var(--g-token-elevation-1);
			}
		}

		&__panel {
			display: grid;
			gap: var(--g-token-space-4);
		}
	}
</style>
