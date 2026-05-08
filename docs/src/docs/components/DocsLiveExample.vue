<script setup lang="ts">
	import { GExpansion } from '@/components';
	import DocsCode from '@docs/components/DocsCode.vue';
	import type { DocsLiveExample } from '@docs/types';

	defineProps<{
		example: DocsLiveExample;
	}>();
</script>

<template>
	<div class="docs-live-example">
		<component :is="example.component" />
		<g-expansion
			class="docs-live-example__code"
			title="Source"
			text="Vue example"
			variant="outlined"
			size="s"
			:border-width="1"
			:eager="true">
			<docs-code :code="example.code" />
		</g-expansion>
	</div>
</template>

<style lang="scss">
	.docs-live-example {
		display: grid;
		gap: var(--g-token-space-4);
		min-width: 0;

		&__code {
			.docs-code {
				border: 0;
			}
		}
	}
</style>
