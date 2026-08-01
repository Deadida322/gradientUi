<script setup lang="ts">
	defineOptions({ name: 'DrawerUsageExample' });
	import { ref } from 'vue';
	import { GButton, GDrawer } from '@/components';

	const open = ref(false);
</script>

<template>
	<div class="docs-component-detail__stack">
		<div class="docs-page__preview">
			<g-button
				label="Open drawer"
				variant="gradient"
				prepend="menu-open"
				@click="open = true" />
		</div>

		<g-drawer
			v-model="open"
			title="Filters"
			text="Narrow the dashboard data.">
			<p class="docs-component-detail__note">
				Drawers are side sheets for navigation, filters and secondary
				workflows.
			</p>
		</g-drawer>
	</div>
</template>
