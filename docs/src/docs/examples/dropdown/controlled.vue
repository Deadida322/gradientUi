<script setup lang="ts">
	defineOptions({ name: 'DropdownControlledExample' });
	import { ref } from 'vue';
	import { GButton, GDropdown, GMenu } from '@/components';

	const open = ref(false);
	const items = [
		{ id: 'rename', label: 'Rename project' },
		{ id: 'duplicate', label: 'Duplicate project' }
	];
</script>

<template>
	<div class="docs-component-detail__stack">
		<div class="docs-page__preview">
			<g-button
				label="Show dropdown"
				variant="gradient"
				@click.stop="open = true" />
			<g-button
				label="Hide dropdown"
				variant="tonal"
				@click="open = false" />
		</div>

		<g-dropdown
			v-model="open"
			close-on-content-click>
			<template #activator="{ activatorAttrs, activatorRef }">
				<g-button
					:ref="activatorRef"
					v-bind="activatorAttrs"
					:append="open ? 'chevron-up' : 'chevron-down'"
					label="Controlled menu"
					variant="outlined" />
			</template>

			<g-menu :items="items" />
		</g-dropdown>
	</div>
</template>
