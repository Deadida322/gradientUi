<script setup lang="ts">
	defineOptions({ name: 'TooltipProgrammaticExample' });
	import { ref } from 'vue';
	import { GButton, GTooltip } from '@/components';

	const tooltip = ref<{
		show: () => void;
		hide: () => void;
	} | null>(null);
</script>

<template>
	<div class="docs-component-detail__stack">
		<div class="docs-page__preview">
			<g-tooltip
				ref="tooltip"
				content="Controlled through exposed methods"
				placement="top">
				<g-button
					label="Tooltip target"
					variant="outlined" />
			</g-tooltip>
		</div>

		<div class="docs-page__preview">
			<g-button
				label="Show"
				variant="filled"
				@click="tooltip?.show()" />
			<g-button
				label="Hide"
				variant="tonal"
				@click="tooltip?.hide()" />
		</div>
	</div>
</template>
