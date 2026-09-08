<script setup lang="ts">
	defineOptions({ name: 'AvatarUsageExample' });
	import { GAvatar, GBadge } from '@/components';
</script>

<template>
	<div class="docs-component-detail__avatar-row">
		<g-badge
			content="3"
			variant="glass"
			border-width=".2"
			color="pink">
			<g-avatar
				name="Ada Lovelace"
				color="pink"
				shape="squircle"
				shadow
				hover />
		</g-badge>
		<g-avatar
			icon="account"
			color="cyan"
			variant="gradient" />
		<g-avatar
			text="UI"
			color="deep-purple"
			variant="glass"
			:border-width="1" />
	</div>
</template>
