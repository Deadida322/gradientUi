<script setup lang="ts">
	defineOptions({ name: 'NavbarDensityExample' });
	import { GNavbar, GNavbarItem } from '@/components';

	const densities = ['compact', 'comfortable', 'prominent'] as const;
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-navbar
			v-for="density in densities"
			:key="density"
			:density="density"
			:aria-label="`${density} navigation`"
			default-value="overview"
			elevated>
			<template #prepend
				><strong>{{ density }}</strong></template
			>
			<g-navbar-item
				value="overview"
				label="Overview" />
			<g-navbar-item
				value="settings"
				label="Settings" />
			<g-navbar-item
				value="disabled"
				label="Disabled"
				disabled />
		</g-navbar>
	</div>
</template>
