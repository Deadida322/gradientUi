<script setup lang="ts">
	defineOptions({ name: 'ExpansionVariantsExample' });
	import { GExpansion } from '@/components';
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-expansion
			default-open
			title="gradient"
			text="A stronger surface for important disclosure."
			variant="gradient">
			gradient expansions work well for prominent settings or onboarding
			sections.
		</g-expansion>
		<g-expansion
			title="Tonal"
			text="A softer color treatment."
			variant="tonal">
			Tonal expansions give the header a calmer accent.
		</g-expansion>
		<g-expansion
			title="Outlined"
			text="A structured card-like disclosure."
			variant="outlined">
			Outlined expansions fit dense dashboards and inspector panels.
		</g-expansion>
		<g-expansion
			title="Text"
			text="The lightest accordion row."
			variant="text">
			Text expansions are best when the parent surface already frames the
			list.
		</g-expansion>
		<g-expansion
			title="Glass"
			text="A translucent disclosure over page content."
			variant="glass"
			color="deep-purple"
			:backdrop-blur="6">
			Glass expansions preserve the context visible behind the surface.
		</g-expansion>
	</div>
</template>
