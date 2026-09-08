<script setup lang="ts">
	defineOptions({ name: 'AvatarGroupExample' });
	import { GAvatar, GAvatarGroup } from '@/components';
	import type { GAvatarGroupItem } from '@/components';

	const team: GAvatarGroupItem[] = [
		{ name: 'Ada Lovelace', color: 'pink', shape: 'squircle' },
		{ name: 'Grace Hopper', color: 'cyan' },
		{ name: 'Katherine Johnson', color: 'deep-purple' },
		{ name: 'Margaret Hamilton', color: 'teal' },
		{ name: 'Dorothy Vaughan', color: 'amber' }
	];
</script>

<template>
	<div class="docs-component-detail__avatar-row">
		<g-avatar-group
			:items="team"
			:max="4"
			:total="8"
			overlap="14px"
			shape="squircle"
			color="cyan"
			variant="tonal"
			hover />

		<g-avatar-group
			:max="3"
			overlap="10px"
			size="l"
			shape="circle"
			variant="gradient"
			color="pink">
			<g-avatar
				name="Design System"
				color="pink"
				variant="gradient"
				size="l" />
			<g-avatar
				icon="palette"
				color="deep-purple"
				variant="gradient"
				size="l" />
			<g-avatar
				text="UI"
				color="cyan"
				variant="gradient"
				size="l" />
		</g-avatar-group>
	</div>
</template>
