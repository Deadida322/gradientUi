<script setup lang="ts">
	defineOptions({ name: 'CardGradientExample' });
	import { GBadge, GCard, GChip } from '@/components';

	const gradientExamples = [
		{
			title: 'Pink analogous',
			subtitle: 'analogous',
			color: 'pink',
			recipe: 'analogous'
		},
		{
			title: 'Cyan complementary',
			subtitle: 'complementary',
			color: 'cyan',
			recipe: 'complementary'
		},
		{
			title: 'Orange split',
			subtitle: 'split-complementary',
			color: 'orange',
			recipe: 'split-complementary'
		},
		{
			title: 'Purple triadic',
			subtitle: 'triadic',
			color: 'deep-purple',
			recipe: 'triadic'
		},
		{
			title: 'Teal duotone',
			subtitle: 'duotone',
			color: 'teal',
			recipe: 'duotone'
		},
		{
			title: 'Indigo mesh',
			subtitle: 'mesh',
			color: 'indigo',
			recipe: 'mesh'
		}
	] as const;
</script>

<template>
	<div
		class="docs-component-detail__card-grid docs-component-detail__card-grid_wide">
		<g-card
			v-for="example in gradientExamples"
			:key="example.title"
			:title="example.title"
			:subtitle="example.subtitle"
			:color="example.color"
			:gradient-recipe="example.recipe"
			variant="gradient"
			density="compact"
			shadow>
			<template #footer>
				<span>{{ example.recipe }}</span>
				<g-chip
					label="gradient-engine"
					size="s"
					border-width="1"
					:color="example.color" />
			</template>
		</g-card>

		<g-badge
			class="card-gradient-badge"
			content="Glow"
			variant="tonal">
			<g-card
				title="Placed accent"
				subtitle="bottom frame + glow"
				text="Cards pass gradient placement, glow and recipe through the same material frame API as actions."
				color="cyan"
				gradient-recipe="neonDuo"
				variant="gradient"
				placement="bottom"
				glow
				animate-glow
				shadow />
		</g-badge>

		<g-card
			v-specular="{
				color: 'primary',
				strength: 0.9
			}"
			title="Morph material"
			subtitle="runtime blobs"
			text="Morph options are resolved by the gradient runtime and rendered inside the card surface layers."
			gradient-recipe="orbitalConic"
			:border-width="1"
			variant="tonal"
			:morph-options="{
				preset: 'ripple',
				blobCount: 4,
				scale: 4,
				blur: 2
			}"
			:animation-options="{ preset: 'pulse' }">
			<template #footer>
				<g-spacer></g-spacer>
				<g-button
					border-width="0"
					variant="glass"
					>More</g-button
				>
			</template>
		</g-card>
	</div>
</template>

<style scoped lang="scss">
	.card-gradient-badge {
		width: 100%;
	}
</style>
