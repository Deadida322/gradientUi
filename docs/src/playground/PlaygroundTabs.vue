<script setup lang="ts">
	import { ref } from 'vue';
	import {
		GTab,
		GTabList,
		GTabPanel,
		GTabPanels,
		GTabs
	} from '@/components/ui/GTabs';
	import GText from '@/components/ui/GText/GText.vue';

	const active = ref('overview');
	const pillActive = ref('usage');
	const verticalActive = ref('account');
	const manualActive = ref('preview');
</script>

<template>
	<section class="tabs-playground">
		<g-text
			type="h-5"
			label="Tabs" />

		<div class="tabs-playground__value">
			line: {{ active }} / pill: {{ pillActive }} / vertical:
			{{ verticalActive }} / manual: {{ manualActive }}
		</div>

		<div class="tabs-playground__card">
			<g-text
				type="subtitle-1"
				label="Line tabs" />
			<g-tabs
				v-model="active"
				color="blue-500"
				active-color="teal-500">
				<g-tab-list aria-label="Feature sections">
					<g-tab
						value="overview"
						label="Overview"
						prepend-icon="view-dashboard-outline" />
					<g-tab
						value="tokens"
						label="Tokens"
						prepend-icon="palette" />
					<g-tab
						value="api"
						label="API"
						prepend-icon="code-tags" />
				</g-tab-list>

				<g-tab-panels>
					<g-tab-panel value="overview">
						<div class="tabs-playground__panel">
							Gradient UI tabs use ARIA roles, keyboard navigation
							and a gradient indicator.
						</div>
					</g-tab-panel>
					<g-tab-panel value="tokens">
						<div class="tabs-playground__panel">
							Use `color` and `active-color` to connect tabs to
							the same tonal system as buttons and navigation.
						</div>
					</g-tab-panel>
					<g-tab-panel value="api">
						<div class="tabs-playground__panel">
							The root provides state; tabs and panels connect by
							matching `value` props.
						</div>
					</g-tab-panel>
				</g-tab-panels>
			</g-tabs>
		</div>

		<div class="tabs-playground__card">
			<g-text
				type="subtitle-1"
				label="Pill tabs" />
			<g-tabs
				v-model="pillActive"
				variant="pill"
				color="deep-purple-500"
				active-color="pink-500">
				<g-tab-list
					grow
					aria-label="Documentation sections">
					<g-tab
						value="usage"
						label="Usage" />
					<g-tab
						value="examples"
						label="Examples" />
					<g-tab
						value="props"
						label="Props" />
				</g-tab-list>

				<g-tab-panels>
					<g-tab-panel value="usage">
						<div class="tabs-playground__panel">Usage panel</div>
					</g-tab-panel>
					<g-tab-panel value="examples">
						<div class="tabs-playground__panel">Examples panel</div>
					</g-tab-panel>
					<g-tab-panel value="props">
						<div class="tabs-playground__panel">Props panel</div>
					</g-tab-panel>
				</g-tab-panels>
			</g-tabs>
		</div>

		<div class="tabs-playground__card">
			<g-text
				type="subtitle-1"
				label="Vertical tabs" />
			<g-tabs
				v-model="verticalActive"
				orientation="vertical"
				variant="tonal"
				color="blue-grey-500"
				active-color="primary">
				<g-tab-list aria-label="Settings sections">
					<g-tab
						value="account"
						label="Account" />
					<g-tab
						value="security"
						label="Security" />
					<g-tab
						value="billing"
						label="Billing" />
				</g-tab-list>

				<g-tab-panels>
					<g-tab-panel value="account">
						<div class="tabs-playground__panel">
							Account settings content
						</div>
					</g-tab-panel>
					<g-tab-panel value="security">
						<div class="tabs-playground__panel">
							Security settings content
						</div>
					</g-tab-panel>
					<g-tab-panel value="billing">
						<div class="tabs-playground__panel">
							Billing settings content
						</div>
					</g-tab-panel>
				</g-tab-panels>
			</g-tabs>
		</div>

		<div class="tabs-playground__card">
			<g-text
				type="subtitle-1"
				label="Manual activation" />
			<g-tabs
				v-model="manualActive"
				activation="manual"
				color="orange-500"
				active-color="amber-500">
				<g-tab-list aria-label="Manual activation tabs">
					<g-tab
						value="preview"
						label="Preview" />
					<g-tab
						value="source"
						label="Source" />
					<g-tab
						value="a11y"
						label="A11y" />
				</g-tab-list>

				<g-tab-panels>
					<g-tab-panel value="preview">
						<div class="tabs-playground__panel">
							Arrow keys move focus; Enter or Space selects.
						</div>
					</g-tab-panel>
					<g-tab-panel value="source">
						<div class="tabs-playground__panel">Source panel</div>
					</g-tab-panel>
					<g-tab-panel value="a11y">
						<div class="tabs-playground__panel">
							Accessibility panel
						</div>
					</g-tab-panel>
				</g-tab-panels>
			</g-tabs>
		</div>
	</section>
</template>

<style scoped lang="scss">
	.tabs-playground {
		display: grid;
		gap: var(--g-token-space-4);
		margin-block: 24px;
	}

	.tabs-playground__value {
		font-size: var(--g-token-font-size-sm);
		line-height: var(--g-token-line-height-sm);
		color: var(--g-token-color-on-surface);
	}

	.tabs-playground__card {
		display: grid;
		gap: var(--g-token-space-3);

		padding: var(--g-token-space-5);
		border: 1px solid var(--g-token-border-subtle);
		border-radius: var(--g-token-radius-lg);

		background: rgb(var(--g-theme-surface));
		box-shadow: var(--g-token-elevation-1);
	}

	.tabs-playground__panel {
		padding: var(--g-token-space-5);
		border: 1px solid var(--g-token-border-subtle);
		border-radius: var(--g-token-radius-md);

		font-size: var(--g-token-font-size-sm);
		line-height: var(--g-token-line-height-lg);
		color: var(--g-token-color-on-surface);

		background: rgba(var(--g-theme-on-surface), 0.04);
	}
</style>
