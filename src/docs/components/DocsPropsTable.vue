<script setup lang="ts">
	import type { DocsPropRow } from '@/docs/types';

	defineProps<{
		rows: DocsPropRow[];
		nameLabel?: string;
		defaultLabel?: string;
	}>();
</script>

<template>
	<div class="docs-props-table">
		<table>
			<thead>
				<tr>
					<th>{{ nameLabel || 'Prop' }}</th>
					<th>Type</th>
					<th>{{ defaultLabel || 'Default' }}</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="row in rows"
					:key="row.name">
					<td>
						<code>{{ row.name }}</code>
					</td>
					<td>
						<code>{{ row.type }}</code>
					</td>
					<td>
						<code>{{ row.defaultValue || '-' }}</code>
					</td>
					<td>{{ row.description }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style lang="scss">
	.docs-props-table {
		overflow-x: auto;
		border: 1px solid var(--g-token-border-subtle);
		border-radius: var(--g-token-radius-md);

		table {
			border-collapse: collapse;
			width: 100%;
			min-width: 680px;
			text-align: left;
		}

		th,
		td {
			padding: var(--g-token-space-3) var(--g-token-space-4);
			border-bottom: 1px solid var(--g-token-border-subtle);
			vertical-align: top;
		}

		th {
			font-size: var(--g-token-font-size-xs);
			font-weight: var(--g-token-font-weight-bold);
			color: var(--g-token-text-muted);
			text-transform: uppercase;

			background: rgba(var(--g-theme-primary), 0.06);
		}

		td {
			font-size: var(--g-token-font-size-sm);
			line-height: var(--g-token-line-height-md);
			color: var(--g-token-color-on-surface);
		}

		tr:last-child td {
			border-bottom: 0;
		}

		code {
			padding: 2px 6px;
			border-radius: var(--g-token-radius-xs);

			font-family: SFMono-Regular, Consolas, 'Liberation Mono', monospace;
			font-size: var(--g-token-font-size-xs);

			background: rgba(var(--g-theme-on-surface), 0.05);
		}
	}
</style>
