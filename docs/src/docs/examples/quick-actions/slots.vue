<script setup lang="ts">
	defineOptions({ name: 'QuickActionsSlotsExample' });
	import { GFAB, GIcon, GQuickActions } from '@/components';
	import type { GQuickActionsOption } from '@/components/ui/GQuickActions';

	const actions: GQuickActionsOption[] = [
		{ label: 'Duplicate', value: 'duplicate', icon: 'content-copy' },
		{ label: 'Archive', value: 'archive', icon: 'archive-outline' },
		{ label: 'Delete', value: 'delete', icon: 'delete-outline' }
	];
</script>

<template>
	<div class="docs-component-detail__quick-actions-stage">
		<g-quick-actions
			icon="dots-horizontal"
			active-icon="close"
			contained
			location="bottom-right"
			:offset="16"
			:options="actions">
			<template #trigger="{ isOpened, toggle }">
				<g-f-a-b
					:label="isOpened ? 'Close actions' : 'Open actions'"
					extended
					label-placement="left"
					color="deep-purple"
					@click="toggle">
					<template #icon>
						<g-icon
							:icon="isOpened ? 'close' : 'dots-grid'"
							size="24" />
					</template>
				</g-f-a-b>
			</template>

			<template #action="{ option }">
				<span class="quick-actions-slot-label">
					{{ option.label }}
				</span>
			</template>
		</g-quick-actions>
	</div>
</template>

<style scoped lang="scss">
	.quick-actions-slot-label {
		font-weight: var(--g-token-font-weight-bold);
		color: var(--g-token-color-primary);
	}
</style>
