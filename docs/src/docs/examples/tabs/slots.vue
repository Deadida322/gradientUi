<script setup lang="ts">
	defineOptions({ name: 'TabsSlotsExample' });
	import { ref } from 'vue';
	import {
		GTabs,
		GTabList,
		GTab,
		GTabPanels,
		GTabPanel,
		GBadge
	} from '@/components';

	const activeTab = ref('issues');
</script>

<template>
	<g-tabs
		v-model="activeTab"
		variant="tonal"
		activation="manual">
		<g-tab-list aria-label="Repository views">
			<g-tab value="issues">
				<template #default="{ selected }">
					<span class="tabs-slot-label">Issues</span>
					<g-badge
						:content="12"
						:color="selected ? 'primary' : 'surface'"
						inline />
				</template>
			</g-tab>
			<g-tab value="pulls">
				<template #default="{ selected }">
					<span class="tabs-slot-label">Pull requests</span>
					<g-badge
						:content="4"
						:color="selected ? 'primary' : 'surface'"
						inline />
				</template>
			</g-tab>
		</g-tab-list>

		<g-tab-panels transition>
			<g-tab-panel value="issues">
				<div class="tabs-preview-panel">
					Open issues grouped by severity.
				</div>
			</g-tab-panel>
			<g-tab-panel value="pulls">
				<div class="tabs-preview-panel">
					Review queue and merge status.
				</div>
			</g-tab-panel>
		</g-tab-panels>
	</g-tabs>
</template>

<style scoped lang="scss">
	.tabs-slot-label {
		min-width: 0;
	}

	.tabs-preview-panel {
		padding: var(--g-token-space-4);
		border-radius: var(--g-token-radius-md);
		color: var(--g-token-text-soft);
		background: rgba(var(--g-theme-on-surface), 0.04);
	}
</style>
