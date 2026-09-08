<script setup lang="ts">
	defineOptions({ name: 'AvatarGroupGlassExample' });
	import { GAvatar, GAvatarGroup } from '@/components';
	import type { GAvatarGroupItem } from '@/components';

	const productTeam: GAvatarGroupItem[] = [
		{ name: 'Mira Chen', color: 'cyan' },
		{ name: 'Noah Smith', color: 'deep-purple' },
		{ name: 'Iris West', color: 'pink' },
		{ name: 'Leo Park', color: 'teal' },
		{ name: 'Sara Kim', color: 'amber' }
	];

	const reviewTeam: GAvatarGroupItem[] = [
		{ text: 'UX', color: 'pink' },
		{ icon: 'code-braces', color: 'cyan' },
		{ text: 'QA', color: 'deep-purple' },
		{ icon: 'shield-check', color: 'teal' }
	];
</script>

<template>
	<div class="docs-component-detail__avatar-row">
		<g-avatar-group
			:items="productTeam"
			:max="4"
			:total="9"
			size="l"
			shape="circle"
			variant="glass"
			color="cyan"
			overflow-color="deep-purple"
			overlap="20px"
			hover />

		<g-avatar-group
			:items="reviewTeam"
			size="l"
			shape="squircle"
			variant="glass"
			color="pink"
			overlap="20px"
			reverse />

		<g-avatar-group
			size="xl"
			shape="squircle"
			variant="glass"
			color="deep-purple"
			overlap="18px">
			<g-avatar
				text="AI"
				size="xl"
				shape="squircle"
				variant="glass"
				color="deep-purple"
				:border-width="1" />
			<g-avatar
				icon="creation"
				size="xl"
				shape="squircle"
				variant="glass"
				color="pink"
				:border-width="1" />
			<g-avatar
				text="DS"
				size="xl"
				shape="squircle"
				variant="glass"
				color="cyan"
				:border-width="1" />
		</g-avatar-group>
	</div>
</template>
