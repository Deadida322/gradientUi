<script setup lang="ts">
	defineOptions({ name: 'BadgeDotExample' });
	import { GBadge, GButton } from '@/components';
</script>

<template>
	<div class="docs-component-detail__badge-stage">
		<g-badge
			dot
			color="success"
			variant="filled">
			<g-button
				label="Online"
				variant="tonal"
				prepend="account-outline" />
		</g-badge>
		<g-badge
			dot
			color="warning"
			location="bottom-right">
			<g-button
				label="Syncing"
				variant="tonal"
				prepend="sync" />
		</g-badge>
	</div>
</template>
