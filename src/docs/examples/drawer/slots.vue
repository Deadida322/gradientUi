<script setup lang="ts">
	defineOptions({ name: 'DrawerSlotsExample' });
	import { ref } from 'vue';
	import { GButton, GChip, GDrawer } from '@/components';

	const open = ref(false);
</script>

<template>
	<div class="docs-component-detail__stack">
		<div class="docs-page__preview">
			<g-button
				label="Open custom drawer"
				variant="tonal"
				prepend="view-day-outline"
				@click="open = true" />
		</div>

		<g-drawer
			v-model="open"
			width="420">
			<template #header="{ dismiss }">
				<div class="docs-component-detail__drawer-header">
					<div>
						<h3>Custom workflow</h3>
						<p>Header slot with product-specific controls.</p>
					</div>
					<g-button
						icon-button="check-underline"
						variant="text"
						size="s"
						rounded
						aria-label="Close drawer"
						@click="dismiss" />
				</div>
			</template>

			<div class="docs-component-detail__stack">
				<p class="docs-component-detail__note">
					The default slot owns the main body. Put forms, filters,
					navigation or inspection content here.
				</p>
				<div class="docs-component-detail__removable-list">
					<g-chip
						label="Filters"
						variant="tonal"
						color="cyan" />
					<g-chip
						label="Preview"
						variant="tonal"
						color="deep-purple" />
					<g-chip
						label="Draft"
						variant="tonal"
						state="warning" />
				</div>
			</div>

			<template #actions="{ dismiss }">
				<g-button
					label="Cancel"
					variant="text"
					@click="dismiss" />
				<g-button
					label="Apply"
					variant="filled"
					color="cyan"
					@click="dismiss" />
			</template>
		</g-drawer>
	</div>
</template>
