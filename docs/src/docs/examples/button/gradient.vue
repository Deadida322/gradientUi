<script setup lang="ts">
	defineOptions({ name: 'ButtonGradientExample' });
	import { GButton } from '@/components';

	const gradientExamples = [
		{
			label: 'Brand glare',
			color: 'primary',
			recipe: 'glare'
		},
		{
			label: 'Pink analogous',
			color: 'pink',
			recipe: 'analogous'
		},
		{
			label: 'Cyan complementary',
			color: 'cyan',
			recipe: 'complementary'
		},
		{
			label: 'Orange split',
			color: 'orange',
			recipe: 'split-complementary'
		},
		{
			label: 'Purple triadic',
			color: 'deep-purple',
			recipe: 'triadic'
		},
		{
			label: 'Teal duotone',
			color: 'teal',
			recipe: 'duotone'
		},
		{
			label: 'Indigo mesh',
			color: 'indigo',
			recipe: 'mesh'
		},
		{
			label: 'Blue grey soft',
			color: 'blue-grey',
			recipe: 'soft'
		}
	] as const;
</script>

<template>
	<div class="docs-component-detail__matrix">
		<g-button
			v-for="example in gradientExamples"
			:key="example.label"
			:label="example.label"
			:color="example.color"
			:gradient-recipe="example.recipe"
			variant="gradient" />
	</div>
</template>
