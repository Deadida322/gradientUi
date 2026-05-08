<script setup lang="ts">
	defineOptions({ name: 'AlertUsageExample' });
	import { GAlert } from '@/components';
</script>

<template>
	<div class="docs-component-detail__feedback-stack">
		<g-alert
			title="Saved"
			text="Your changes were synced and are available on every device."
			icon="check-circle-outline"
			state="success" />
	</div>
</template>
