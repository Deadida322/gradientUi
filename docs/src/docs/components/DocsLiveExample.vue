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

		width: 100%;
		min-width: 0;
		max-width: 100%;

		&__code {
			overflow: hidden;
			min-width: 0;
			max-width: 100%;

			:deep(.g-expansion__body),
			:deep(.g-expansion__content) {
				min-width: 0;
				max-width: 100%;
			}

			:deep(.docs-code) {
				border: 0;
			}
		}
	}
</style>
