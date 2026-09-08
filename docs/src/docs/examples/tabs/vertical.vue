<script setup lang="ts">
	defineOptions({ name: 'TabsVerticalExample' });
	import { ref } from 'vue';
	import { GTabs, GTabList, GTab, GTabPanels, GTabPanel } from '@/components';

	const activeTab = ref('profile');
</script>

<template>
	<g-tabs
		v-model="activeTab"
		orientation="vertical"
		variant="pill">
		<g-tab-list aria-label="Account sections">
			<g-tab
				value="profile"
				label="Profile"
				prepend-icon="account" />
			<g-tab
				value="security"
				label="Security"
				prepend-icon="shield-check" />
			<g-tab
				value="billing"
				label="Billing"
				prepend-icon="credit-card" />
		</g-tab-list>

		<g-tab-panels>
			<g-tab-panel value="profile">
				<div class="tabs-preview-panel">
					Public profile and team identity.
				</div>
			</g-tab-panel>
			<g-tab-panel value="security">
				<div class="tabs-preview-panel">
					Password, sessions and access keys.
				</div>
			</g-tab-panel>
			<g-tab-panel value="billing">
				<div class="tabs-preview-panel">
					Plans, invoices and payment method.
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
