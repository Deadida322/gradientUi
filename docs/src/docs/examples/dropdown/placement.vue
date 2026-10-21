<script setup lang="ts">
	defineOptions({ name: 'DropdownPlacementExample' });
	import { GButton, GDropdown, GMenu } from '@/components';

	const items = [
		{ id: 'copy', label: 'Copy link' },
		{ id: 'share', label: 'Share' }
	];
</script>

<template>
	<div class="docs-page__preview">
		<g-dropdown
			close-on-content-click
			placement="bottom-start">
			<template #activator="{ activatorAttrs, activatorRef }">
				<g-button
					:ref="activatorRef"
					v-bind="activatorAttrs"
					label="Bottom start"
					variant="tonal" />
			</template>

			<g-menu :items="items" />
		</g-dropdown>

		<g-dropdown
			:offset="16"
			close-on-content-click
			placement="top">
			<template #activator="{ activatorAttrs, activatorRef }">
				<g-button
					:ref="activatorRef"
					v-bind="activatorAttrs"
					label="Top, offset 16"
					variant="outlined" />
			</template>

			<g-menu :items="items" />
		</g-dropdown>

		<g-dropdown
			:open-on-click="false"
			open-on-hover
			placement="bottom-end">
			<template #activator="{ activatorAttrs, activatorRef }">
				<g-button
					:ref="activatorRef"
					v-bind="activatorAttrs"
					label="Hover me"
					variant="gradient" />
			</template>

			<g-menu :items="items" />
		</g-dropdown>
	</div>
</template>
