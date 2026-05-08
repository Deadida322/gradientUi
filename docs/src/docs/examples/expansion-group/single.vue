<script setup lang="ts">
	defineOptions({ name: 'ExpansionGroupSingleExample' });
	import { ref } from 'vue';
	import { GExpansion, GExpansionGroup } from '@/components';

	const value = ref('overview');
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-expansion-group v-model="value">
			<g-expansion
				value="overview"
				title="Overview"
				text="Only one item is selected in single mode.">
				Single mode is the default behavior.
			</g-expansion>
			<g-expansion
				value="details"
				title="Details"
				text="Opening this item closes the previous one.">
				Use this for classic accordion navigation.
			</g-expansion>
			<g-expansion
				value="settings"
				title="Settings"
				text="The model stores one value or null.">
				Perfect for compact settings or FAQ pages.
			</g-expansion>
		</g-expansion-group>
	</div>
</template>
