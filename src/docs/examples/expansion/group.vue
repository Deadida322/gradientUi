<script setup lang="ts">
	defineOptions({ name: 'ExpansionGroupExample' });
	import { ref } from 'vue';
	import { GExpansion, GExpansionGroup } from '@/components';

	const section = ref('tokens');
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-expansion-group v-model="section">
			<g-expansion
				value="tokens"
				title="Design tokens"
				text="Color, spacing and typography are shared.">
				The group keeps one selected value and each item stays focused
				on its own content.
			</g-expansion>
			<g-expansion
				value="surface"
				title="Surface behavior"
				text="Variants and states stay consistent.">
				Use grouped expansions for FAQ lists, settings sections and
				editor sidebars.
			</g-expansion>
			<g-expansion
				value="slots"
				title="Slot contracts"
				text="Headers and actions can be replaced.">
				Slot props expose open state and the toggle function.
			</g-expansion>
		</g-expansion-group>

		<p class="docs-component-detail__value-line">
			<span>Selected</span>
			<code>{{ section }}</code>
		</p>
	</div>
</template>
