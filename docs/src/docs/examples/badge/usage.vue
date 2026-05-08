<script setup lang="ts">
	defineOptions({ name: 'BadgeUsageExample' });
	import { GBadge, GButton } from '@/components';
</script>

<template>
	<div class="docs-component-detail__badge-stage">
		<g-badge content="4">
			<g-button
				label="Inbox"
				variant="tonal"
				prepend="inbox-outline" />
		</g-badge>
	</div>
</template>
