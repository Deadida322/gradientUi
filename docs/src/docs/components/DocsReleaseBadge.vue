<script setup lang="ts">
	import type { DocsReleaseBadgeMeta } from '@docs/types';

	defineProps<{
		badge: DocsReleaseBadgeMeta;
	}>();
</script>

<template>
	<span
		class="docs-release-badge"
		:class="`docs-release-badge_${badge.tone ?? 'rc'}`"
		:title="badge.title">
		{{ badge.label }}
	</span>
</template>

<style scoped lang="scss">
	.docs-release-badge {
		display: inline-flex;
		flex: 0 0 auto;
		align-items: center;

		width: fit-content;
		max-width: 100%;
		padding: 2px 8px;
		border: 1px solid rgba(var(--g-theme-primary), 0.24);
		border-radius: var(--g-token-radius-pill);

		font-size: var(--g-token-font-size-xs);
		font-weight: var(--g-token-font-weight-bold);
		line-height: var(--g-token-line-height-xs);
		color: var(--g-token-color-primary);
		white-space: nowrap;

		background: rgba(var(--g-theme-primary), 0.1);

		&_testing {
			border-color: rgba(var(--g-theme-warning), 0.28);
			color: rgb(var(--g-theme-warning));
			background: rgba(var(--g-theme-warning), 0.1);
		}
	}
</style>
