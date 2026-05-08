<script setup lang="ts">
	defineOptions({ name: 'ExpansionGroupGapExample' });
	import { ref } from 'vue';
	import { GExpansion, GExpansionGroup } from '@/components';

	const selected = ref('cards');
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-expansion-group
			v-model="selected"
			gap="16"
			:divided="false">
			<g-expansion
				value="cards"
				rounded
				title="Card rhythm"
				text="Gap creates space between independent panels.">
				Use this when each item should read as its own card.
			</g-expansion>
			<g-expansion
				value="dashboard"
				rounded
				title="Dashboard sections"
				text="Disable dividers for a cleaner stacked layout.">
				Pair <code>gap</code> with <code>divided=false</code>.
			</g-expansion>
		</g-expansion-group>
	</div>
</template>
