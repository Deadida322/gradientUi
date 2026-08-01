<script setup lang="ts">
	defineOptions({ name: 'AlertGradientExample' });
	import { GAlert } from '@/components';
</script>

<template>
	<div class="docs-component-detail__feedback-stack">
		<g-alert
			variant="gradient"
			title="Gradient surface"
			text="Use gradient alerts for high-emphasis status messages."
			icon="information-outline" />
	</div>
</template>
