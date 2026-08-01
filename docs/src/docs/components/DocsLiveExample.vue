<script setup lang="ts">
	import { GExpansion } from '@/components';
	import DocsCode from '@docs/components/DocsCode.vue';
	import DocsReleaseBadge from '@docs/components/DocsReleaseBadge.vue';
	import type { DocsLiveExample } from '@docs/types';

	defineProps<{
		example: DocsLiveExample;
	}>();
</script>

<template>
	<div class="docs-live-example">
		<div
			v-if="example.badge"
			class="docs-live-example__badge">
			<docs-release-badge :badge="example.badge" />
		</div>
		<component :is="example.component" />
		<g-expansion
			class="docs-live-example__code"
			title="Source"
			text="Vue example"
			variant="text"
			size="l"
			color="primary"
			:border-width="0.5"
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

		&__badge {
			display: flex;
			justify-content: flex-start;
		}
	}
</style>
