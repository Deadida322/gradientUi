<script setup lang="ts">
	defineOptions({ name: 'ButtonSlotsExample' });
	import { GButton, GIcon } from '@/components';
</script>

<template>
	<div class="docs-page__preview">
		<g-button
			variant="tonal"
			color="teal">
			<template #prepend>
				<g-icon icon="palette" />
			</template>
			Generate theme
			<template #append>
				<g-icon icon="arrow-right" />
			</template>
		</g-button>
	</div>
</template>
