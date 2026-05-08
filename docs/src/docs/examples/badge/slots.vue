<script setup lang="ts">
	defineOptions({ name: 'BadgeSlotsExample' });
	import { GBadge, GButton, GIcon } from '@/components';
</script>

<template>
	<div class="docs-component-detail__badge-stage">
		<g-badge
			color="pink"
			variant="filled">
			<g-button
				label="Favorites"
				variant="tonal"
				prepend="heart-outline" />
			<template #content>
				<g-icon
					icon="star-four-points"
					size="12" />
			</template>
		</g-badge>
	</div>
</template>
