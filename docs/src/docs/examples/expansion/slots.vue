<script setup lang="ts">
	defineOptions({ name: 'ExpansionSlotsExample' });
	import { GButton, GExpansion } from '@/components';
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-expansion text="Slot props expose expanded state and toggle.">
			<template #title="{ expanded }">
				<span class="docs-component-detail__title-row">
					<span>Custom title</span>
					<span class="docs-component-detail__badge">
						{{ expanded ? 'open' : 'closed' }}
					</span>
				</span>
			</template>

			<template #actions="{ expanded, toggle }">
				<g-button
					size="s"
					variant="text"
					:label="expanded ? 'Close' : 'Open'"
					@click.stop="toggle" />
			</template>

			The header can contain custom layout, status badges or its own
			action controls without re-implementing expansion state.
		</g-expansion>
	</div>
</template>
