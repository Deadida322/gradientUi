<script setup lang="ts">
	defineOptions({ name: 'BottomNavigationVariantsExample' });
	import { ref } from 'vue';
	import { GBottomNavigation, GBottomNavigationItem } from '@/components';
	const active = ref('home');
	const variants = [
		'tonal',
		'glass',
		'gradient',
		'default',
		'outlined'
	] as const;
</script>
<template>
	<div class="d-grid gap-4">
		<g-bottom-navigation
			v-for="variant in variants"
			:key="variant"
			v-model="active"
			:variant="variant"
			:aria-label="`${variant} navigation`"
			gradient-recipe="orbitalConic"
			:shadow="variant === 'glass'">
			<g-bottom-navigation-item
				value="home"
				icon="home"
				label="Home" />
			<g-bottom-navigation-item
				value="saved"
				icon="heart"
				label="Saved" />
			<g-bottom-navigation-item
				value="help"
				icon="help-circle"
				label="Help"
				href="#usage" />
		</g-bottom-navigation>
	</div>
</template>
