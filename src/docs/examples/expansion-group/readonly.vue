<script setup lang="ts">
	defineOptions({ name: 'ExpansionGroupReadonlyExample' });
	import { ref } from 'vue';
	import { GExpansion, GExpansionGroup } from '@/components';

	const selected = ref(['visible']);
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-expansion-group
			v-model="selected"
			multiple
			readonly>
			<g-expansion
				value="visible"
				title="Readonly selected"
				text="The open state is visible but cannot be changed by the user.">
				This is useful for review screens and locked workflows.
			</g-expansion>
			<g-expansion
				value="locked"
				title="Readonly closed"
				text="The group blocks mutation for every item.">
				External code can still update the model.
			</g-expansion>
		</g-expansion-group>
	</div>
</template>
