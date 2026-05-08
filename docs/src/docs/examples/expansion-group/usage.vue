<script setup lang="ts">
	defineOptions({ name: 'ExpansionGroupUsageExample' });
	import { ref } from 'vue';
	import { GExpansion, GExpansionGroup } from '@/components';

	const selected = ref('tokens');
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-expansion-group v-model="selected">
			<g-expansion
				value="tokens"
				title="Design tokens"
				text="Theme primitives shared by every component.">
				Tokens keep spacing, color and type consistent across the
				system.
			</g-expansion>
			<g-expansion
				value="surface"
				title="Surface behavior"
				text="Variants and states stay aligned.">
				Expansion items read the same surface language as buttons, chips
				and cards.
			</g-expansion>
		</g-expansion-group>

		<p class="docs-component-detail__value-line">
			<span>Selected</span>
			<code>{{ selected }}</code>
		</p>
	</div>
</template>
