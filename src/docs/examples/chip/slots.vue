<script setup lang="ts">
	defineOptions({ name: 'ChipSlotsExample' });
	import { GChip, GIcon } from '@/components';
</script>

<template>
	<div class="docs-page__preview">
		<g-chip
			variant="outlined"
			color="teal">
			<template #prepend>
				<g-icon icon="tag-outline" />
			</template>
			Filter
			<template #append>
				<span class="docs-component-detail__count">24</span>
			</template>
		</g-chip>
	</div>
</template>
