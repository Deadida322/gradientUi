<script setup lang="ts">
	defineOptions({ name: 'ExpansionControlledExample' });
	import { ref } from 'vue';
	import { GButton, GExpansion } from '@/components';

	const open = ref(true);
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-expansion
			v-model="open"
			title="Controlled standalone"
			text="External state can open or close the disclosure.">
			Use <code>v-model</code> when another part of the screen needs to
			read or update the open state.
		</g-expansion>

		<g-button
			size="s"
			variant="outlined"
			:label="open ? 'Collapse' : 'Expand'"
			@click="open = !open" />
	</div>
</template>
