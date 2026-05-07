<script setup lang="ts">
	import { GButton, GInput } from '@/components';
	import DocsExampleTabs from '@/docs/components/DocsExampleTabs.vue';
	import type { DocsExampleTab } from '@/docs/types';

	defineProps<{
		tabs: DocsExampleTab[];
	}>();
</script>

<template>
	<docs-example-tabs :tabs="tabs">
		<template #variants>
			<div class="docs-page__preview">
				<g-button
					label="Filled"
					variant="filled" />
				<g-button
					label="Tonal"
					variant="tonal" />
				<g-button
					label="Text"
					variant="text" />
				<g-button
					label="Outlined"
					variant="outlined" />
			</div>
		</template>

		<template #icons>
			<div class="docs-page__preview">
				<g-button
					label="Create"
					prepend="plus"
					variant="filled" />
				<g-button
					icon-button="heart"
					variant="tonal" />
			</div>
		</template>

		<template #input-basic>
			<div class="docs-page__preview">
				<g-input
					label="Email"
					placeholder="you@example.com" />
			</div>
		</template>

		<template #input-states>
			<div class="docs-page__preview">
				<g-input
					label="Success"
					state="success"
					model-value="Ready" />
				<g-input
					label="Error"
					state="error"
					model-value="Wrong value" />
			</div>
		</template>

		<template #select-single>
			<div class="docs-page__preview">
				<g-button
					label="Select preview"
					variant="tonal" />
			</div>
		</template>

		<template #tooltip-basic>
			<div class="docs-page__preview">
				<g-button
					label="Hover me"
					variant="tonal" />
			</div>
		</template>
	</docs-example-tabs>
</template>
