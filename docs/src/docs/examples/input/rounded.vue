<script setup lang="ts">
	defineOptions({ name: 'InputRoundedExample' });
	import { GInput } from '@/components';
</script>

<template>
	<div class="docs-component-detail__field-grid">
		<g-input
			label="Default radius"
			placeholder="Your name" />
		<g-input
			rounded
			label="Rounded"
			placeholder="Search"
			prepend-icon="magnify" />
		<g-input
			rounded
			variant="outlined"
			label="Outlined"
			placeholder="Email" />
		<g-input
			rounded
			variant="glass"
			:border-width="1"
			label="Gradient frame"
			placeholder="Focus me"
			clearable />
	</div>
</template>
