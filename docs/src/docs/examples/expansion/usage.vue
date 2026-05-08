<script setup lang="ts">
	defineOptions({ name: 'ExpansionUsageExample' });
	import { GExpansion } from '@/components';
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-expansion
			default-open
			title="Design tokens"
			text="Shared spacing, color and type scale are applied through component tokens.">
			Gradient UI components keep visual decisions in token layers, while
			interaction logic stays inside composables.
		</g-expansion>
	</div>
</template>
