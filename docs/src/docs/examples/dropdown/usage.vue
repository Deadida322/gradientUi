<script setup lang="ts">
	defineOptions({ name: 'DropdownUsageExample' });
	import { computed, ref } from 'vue';
	import { GButton, GDropdown, GMenu } from '@/components';

	const selected = ref('activity');
	const items = [
		{ id: 'activity', label: 'View activity' },
		{ id: 'invite', label: 'Invite teammate' },
		{ id: 'archive', label: 'Archive project' }
	];
	const selectedLabel = computed(
		() => items.find((item) => item.id === selected.value)?.label
	);
</script>

<template>
	<div class="docs-component-detail__stack">
		<div class="docs-page__preview">
			<g-dropdown
				close-on-content-click
				same-width>
				<template #activator="{ activatorAttrs, activatorRef }">
					<g-button
						:ref="activatorRef"
						v-bind="activatorAttrs"
						append="chevron-down"
						label="Project actions"
						variant="tonal" />
				</template>

				<g-menu
					:items="items"
					@select="selected = String($event.id)" />
			</g-dropdown>
		</div>

		<p class="docs-component-detail__value-line">
			Selected: <span>{{ selectedLabel }}</span>
		</p>
	</div>
</template>
