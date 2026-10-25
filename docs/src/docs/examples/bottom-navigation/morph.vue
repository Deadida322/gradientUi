<script setup lang="ts">
	defineOptions({ name: 'BottomNavigationMorphExample' });
	import { ref } from 'vue';
	import { GBottomNavigation, GBottomNavigationItem } from '@/components';

	const active = ref('home');
</script>

<template>
	<g-bottom-navigation
		v-model="active"
		aria-label="Morph navigation"
		variant="tonal"
		gradient-recipe="orbitalConic"
		morph
		:morph-options="{
			preset: 'ripple',
			blobCount: 4,
			scale: 4,
			blur: 2
		}"
		:animation-options="{ preset: 'pulse' }">
		<g-bottom-navigation-item
			value="home"
			icon="home"
			label="Home" />
		<g-bottom-navigation-item
			value="search"
			icon="magnify"
			label="Search" />
		<g-bottom-navigation-item
			value="saved"
			icon="heart"
			label="Saved" />
	</g-bottom-navigation>
</template>
