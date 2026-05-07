<script setup lang="ts">
	defineOptions({ name: 'DrawerPlacementsExample' });
	import { ref } from 'vue';
	import { GButton, GDrawer } from '@/components';
	import type { GDrawerPlacement } from '@/components/ui/GDrawer/types';

	const placement = ref<GDrawerPlacement>('right');
	const open = ref(false);
	const placements: GDrawerPlacement[] = ['left', 'right', 'top', 'bottom'];

	const show = (nextPlacement: GDrawerPlacement) => {
		placement.value = nextPlacement;
		open.value = true;
	};
</script>

<template>
	<div class="docs-component-detail__stack">
		<div class="docs-page__preview">
			<g-button
				v-for="item in placements"
				:key="item"
				:label="item"
				variant="tonal"
				@click="show(item)" />
		</div>

		<g-drawer
			v-model="open"
			:placement="placement"
			title="Placement"
			:text="`Drawer from ${placement}`">
			<p class="docs-component-detail__note">
				Placement controls which edge the drawer enters from.
			</p>
		</g-drawer>
	</div>
</template>
