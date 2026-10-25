<script setup lang="ts">
	defineOptions({ name: 'BottomNavigationUsageExample' });
	import { ref } from 'vue';
	import {
		GBottomNavigation,
		GBottomNavigationItem,
		GButton
	} from '@/components';
	const active = ref('home');
	const disabled = ref(false);
	const labels = ref(true);
</script>
<template>
	<div class="bottom-navigation-example">
		<g-bottom-navigation
			v-model="active"
			:disabled="disabled"
			:show-labels="labels"
			aria-label="App sections">
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
			<g-bottom-navigation-item
				value="profile"
				icon="account"
				label="Profile"
				disabled />
		</g-bottom-navigation>
		<p data-bottom-selection>Selected: {{ active }}</p>
		<g-button
			variant="text"
			@click="disabled = !disabled"
			>Toggle disabled</g-button
		>
		<g-button
			variant="text"
			@click="labels = !labels"
			>Toggle labels</g-button
		>
	</div>
</template>
