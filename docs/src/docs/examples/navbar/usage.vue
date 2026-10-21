<script setup lang="ts">
	defineOptions({ name: 'NavbarUsageExample' });
	import { ref } from 'vue';
	import {
		GButton,
		GNavbar,
		GNavbarItem,
		GNavbarMenu,
		GNavbarSubItem
	} from '@/components';

	const active = ref('home');
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-navbar
			v-model="active"
			aria-label="Example navigation">
			<template #prepend><strong>Gradient UI</strong></template>
			<g-navbar-item
				value="home"
				label="Home" />
			<g-navbar-menu label="Explore">
				<template #dropdown>
					<ul>
						<g-navbar-sub-item
							value="components"
							label="Components" />
						<g-navbar-sub-item
							value="tokens"
							label="Design tokens" />
					</ul>
				</template>
			</g-navbar-menu>
			<template #append
				><g-button
					label="Sign in"
					size="s"
					variant="tonal"
			/></template>
		</g-navbar>
		<p class="docs-component-detail__value-line">
			Selected: <span>{{ active }}</span>
		</p>
	</div>
</template>
