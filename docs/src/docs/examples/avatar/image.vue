<script setup lang="ts">
	defineOptions({ name: 'AvatarImageExample' });
	import { GAvatar, GAvatarGroup } from '@/components';
	import type { GAvatarGroupItem } from '@/components';

	const photo =
		'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&crop=faces&fm=jpg&q=80&w=160&h=160';

	const people: GAvatarGroupItem[] = [
		{
			name: 'Sofia Reed',
			src: photo,
			alt: 'Portrait of Sofia Reed',
			color: 'pink'
		},
		{
			name: 'Maya Chen',
			src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&crop=faces&fm=jpg&q=80&w=160&h=160',
			alt: 'Portrait of Maya Chen',
			color: 'cyan'
		},
		{
			name: 'Noah Gray',
			src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&fm=jpg&q=80&w=160&h=160',
			alt: 'Portrait of Noah Gray',
			color: 'teal'
		},
		{ name: 'Gradient UI', color: 'deep-purple' }
	];
</script>

<template>
	<div class="docs-component-detail__stack">
		<div class="docs-component-detail__avatar-row">
			<g-avatar
				:src="photo"
				alt="Portrait of Sofia Reed"
				name="Sofia Reed"
				size="xl"
				shape="circle"
				shadow
				hover />

			<g-avatar
				:image="photo"
				alt="Portrait of Sofia Reed"
				name="Sofia Reed"
				size="xl"
				shape="squircle"
				variant="glass"
				:border-width="1"
				shadow
				hover />

			<g-avatar-group
				:items="people"
				:max="4"
				size="l"
				shape="squircle"
				overlap="18px"
				variant="glass"
				color="cyan"
				hover />
		</div>

		<p class="docs-component-detail__caption">
			Photo by
			<a
				href="https://unsplash.com/@michaeldam?utm_source=gradient_ui_docs&utm_medium=referral"
				target="_blank"
				rel="noreferrer">
				Michael Dam
			</a>
			on
			<a
				href="https://unsplash.com/?utm_source=gradient_ui_docs&utm_medium=referral"
				target="_blank"
				rel="noreferrer">
				Unsplash
			</a>
		</p>
	</div>
</template>
