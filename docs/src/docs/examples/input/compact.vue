<script setup lang="ts">
	defineOptions({ name: 'InputCompactExample' });
	import { GButton, GInput } from '@/components';
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-input
			label="Standard field"
			message="Space for supporting text" />
		<g-input
			hide-message
			label="Compact field"
			message="This message is hidden" />
		<div class="docs-page__preview">
			<g-input
				hide-message
				rounded
				size="s"
				aria-label="Search projects"
				placeholder="Search projects"
				prepend-icon="magnify" />
			<g-button
				label="Search"
				size="s"
				variant="tonal" />
		</div>
	</div>
</template>
