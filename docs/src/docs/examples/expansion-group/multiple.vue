<script setup lang="ts">
	defineOptions({ name: 'ExpansionGroupMultipleExample' });
	import { ref } from 'vue';
	import { GExpansion, GExpansionGroup } from '@/components';

	const values = ref(['install']);
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-expansion-group
			v-model="values"
			multiple>
			<g-expansion
				value="install"
				title="Install package"
				text="Multiple mode stores an array.">
				Several items can stay open at once.
			</g-expansion>
			<g-expansion
				value="theme"
				title="Configure theme"
				text="Each item toggles independently.">
				Use multiple mode for checklists and setup flows.
			</g-expansion>
			<g-expansion
				value="ship"
				title="Ship examples"
				text="The model remains typed and predictable.">
				The group keeps selection state outside individual items.
			</g-expansion>
		</g-expansion-group>

		<p class="docs-component-detail__value-line">
			<span>Selected</span>
			<code>{{ values.join(', ') || 'none' }}</code>
		</p>
	</div>
</template>
