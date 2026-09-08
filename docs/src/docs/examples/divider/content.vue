<script setup lang="ts">
	defineOptions({ name: 'DividerContentExample' });
	import { GChip, GDivider, GIcon } from '@/components';
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-divider
			label="Unread"
			icon="email"
			align="start"
			color="pink"
			variant="tonal" />

		<g-divider
			align="center"
			color="cyan"
			variant="glass"
			effect="glow">
			<template #prepend>
				<g-icon icon="star" />
			</template>
			New highlights
		</g-divider>

		<g-divider
			align="end"
			color="deep-purple"
			variant="gradient"
			effect="fade">
			<template #default>Release channel</template>
			<template #append>
				<g-chip
					label="beta"
					size="s"
					color="deep-purple"
					variant="glass"
					:border-width="1" />
			</template>
		</g-divider>
	</div>
</template>
