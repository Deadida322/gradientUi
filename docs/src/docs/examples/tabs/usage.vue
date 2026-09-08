<script setup lang="ts">
	defineOptions({ name: 'TabsUsageExample' });
	import { ref } from 'vue';
	import { GTabs, GTabList, GTab, GTabPanels, GTabPanel } from '@/components';

	const activeTab = ref('overview');
</script>

<template>
	<g-tabs v-model="activeTab">
		<g-tab-list aria-label="Project sections">
			<g-tab
				value="overview"
				label="Overview" />
			<g-tab
				value="activity"
				label="Activity" />
			<g-tab
				value="settings"
				label="Settings" />
		</g-tab-list>

		<g-tab-panels>
			<g-tab-panel value="overview">
				<div class="tabs-preview-panel">
					Release status and current scope.
				</div>
			</g-tab-panel>
			<g-tab-panel value="activity">
				<div class="tabs-preview-panel">
					Recent reviews and merged tasks.
				</div>
			</g-tab-panel>
			<g-tab-panel value="settings">
				<div class="tabs-preview-panel">
					Workspace preferences and access.
				</div>
			</g-tab-panel>
		</g-tab-panels>
	</g-tabs>
</template>

<style scoped lang="scss">
	.tabs-preview-panel {
		padding: var(--g-token-space-4);
		border-radius: var(--g-token-radius-md);
		color: var(--g-token-text-soft);
		background: rgba(var(--g-theme-on-surface), 0.04);
	}
</style>
