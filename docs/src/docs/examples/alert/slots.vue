<script setup lang="ts">
	defineOptions({ name: 'AlertSlotsExample' });
	import { GAlert, GButton, GIcon } from '@/components';
</script>

<template>
	<div class="docs-component-detail__feedback-stack">
		<g-alert color="deep-purple">
			<template #prepend>
				<g-icon
					icon="star-four-points"
					size="24" />
			</template>
			<template #title>Custom composition</template>
			Alerts accept title, prepend, append and footer slots for richer
			feedback blocks.
			<template #footer>
				<g-button
					label="View details"
					size="s"
					variant="tonal" />
			</template>
		</g-alert>
	</div>
</template>
