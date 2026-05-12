<script setup lang="ts">
	import { computed } from 'vue';

	const props = withDefaults(
		defineProps<{
			code: string;
			language?: string;
			title?: string;
		}>(),
		{
			language: 'vue',
			title: ''
		}
	);

	const escapeHtml = (value: string) =>
		value
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');

	const highlight = (value: string) =>
		escapeHtml(value)
			.replace(
				/(&lt;\/?)([\w-]+)/g,
				'$1<span class="docs-code__tag">$2</span>'
			)
			.replace(
				/([\w-]+)(=)(&quot;.*?&quot;)/g,
				'<span class="docs-code__attr">$1</span>$2<span class="docs-code__string">$3</span>'
			)
			.replace(
				/\b(import|from|const|let|type|interface|defineProps|defineEmits|ref|computed)\b/g,
				'<span class="docs-code__keyword">$1</span>'
			);

	const highlightedCode = computed(() => highlight(props.code.trim()));
</script>

<template>
	<figure class="docs-code">
		<figcaption
			v-if="title"
			class="docs-code__header">
			<span>{{ title }}</span>
			<span class="docs-code__language">{{ language }}</span>
		</figcaption>
		<pre class="docs-code__pre"><code v-html="highlightedCode"></code></pre>
	</figure>
</template>

<style lang="scss">
	.docs-code {
		overflow: hidden;

		box-sizing: border-box;
		width: 100%;
		min-width: 0;
		max-width: 100%;
		margin: 0;
		border: 1px solid var(--g-token-border-subtle);
		border-radius: var(--g-token-radius-md);

		text-align: left;

		background: rgba(var(--g-theme-on-surface), 0.04);

		&__header {
			display: flex;
			align-items: center;
			justify-content: space-between;

			padding: var(--g-token-space-3) var(--g-token-space-4);
			border-bottom: 1px solid var(--g-token-border-subtle);

			font-size: var(--g-token-font-size-sm);
			font-weight: var(--g-token-font-weight-medium);
			color: var(--g-token-color-on-surface);
		}

		&__language {
			font-size: var(--g-token-font-size-xs);
			color: var(--g-token-text-muted);
			text-transform: uppercase;
		}

		&__pre {
			overflow: auto;

			box-sizing: border-box;
			min-width: 0;
			max-width: 100%;
			margin: 0;
			padding: var(--g-token-space-4);

			font-size: var(--g-token-font-size-sm);
			line-height: var(--g-token-line-height-lg);

			-webkit-overflow-scrolling: touch;
		}

		code,
		code * {
			font-family: SFMono-Regular, Consolas, 'Liberation Mono', monospace;
		}

		&__tag {
			font-weight: var(--g-token-font-weight-medium);
			color: var(--g-token-color-primary);
		}

		&__attr {
			color: var(--g-token-color-success);
		}

		&__string {
			color: var(--g-token-color-warning);
		}

		&__keyword {
			font-weight: var(--g-token-font-weight-medium);
			color: var(--g-token-color-primary);
		}
	}
</style>
