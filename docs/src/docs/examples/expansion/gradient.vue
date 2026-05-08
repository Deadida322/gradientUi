<script setup lang="ts">
	defineOptions({ name: 'ExpansionGradientExample' });
	import { GExpansion } from '@/components';
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-expansion
			title="Active gradient surface"
			text="Closed state stays quiet, open state turns on the gradient accent."
			variant="outlined"
			border-width="0"
			:active-border-width="2"
			:active-glow="true"
			:active-animate-glow="true"
			active-state="success">
			Active gradient props let the disclosure become more expressive only
			after the user opens it.
		</g-expansion>
		<g-expansion
			title="Directional accent"
			text="Placement can change between closed and open states."
			variant="text"
			border-width="1"
			placement="left"
			active-placement="top"
			active-state="warning">
			Use directional accents to point attention toward the expanded
			content.
		</g-expansion>
	</div>
</template>
