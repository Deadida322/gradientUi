<script setup lang="ts">
	defineOptions({ name: 'ExpansionGroupMandatoryExample' });
	import { ref } from 'vue';
	import { GExpansion, GExpansionGroup } from '@/components';

	const values = ref(['profile']);
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-expansion-group
			v-model="values"
			multiple
			mandatory>
			<g-expansion
				value="profile"
				title="Profile"
				text="At least one item remains selected.">
				<code>mandatory</code> prevents collapsing the last active item.
			</g-expansion>
			<g-expansion
				value="security"
				title="Security"
				text="Works in multiple mode too.">
				This is useful for setup flows where one section should always
				stay visible.
			</g-expansion>
			<g-expansion
				value="billing"
				title="Billing"
				text="Users can still switch focus freely.">
				The group only blocks the empty state.
			</g-expansion>
		</g-expansion-group>
	</div>
</template>
