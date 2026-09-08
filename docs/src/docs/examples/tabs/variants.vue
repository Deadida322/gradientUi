<script setup lang="ts">
	defineOptions({ name: 'TabsVariantsExample' });
	import { ref } from 'vue';
	import { GTabs, GTabList, GTab } from '@/components';

	const line = ref('design');
	const pill = ref('design');
	const tonal = ref('design');
</script>

<template>
	<div class="tabs-variants">
		<g-tabs v-model="line">
			<g-tab-list aria-label="Line tabs">
				<g-tab
					value="docs"
					label="Docs" />
				<g-tab
					value="design"
					label="Design" />
				<g-tab
					value="api"
					label="API" />
			</g-tab-list>
		</g-tabs>

		<g-tabs
			v-model="pill"
			variant="pill"
			color="warning">
			<g-tab-list aria-label="Pill tabs">
				<g-tab
					value="docs"
					label="Docs" />
				<g-tab
					value="design"
					label="Design" />
				<g-tab
					value="api"
					label="API" />
			</g-tab-list>
		</g-tabs>

		<g-tabs
			v-model="tonal"
			variant="tonal"
			color="success">
			<g-tab-list aria-label="Tonal tabs">
				<g-tab
					value="docs"
					label="Docs" />
				<g-tab
					value="design"
					label="Design" />
				<g-tab
					value="api"
					label="API" />
			</g-tab-list>
		</g-tabs>
	</div>
</template>

<style scoped lang="scss">
	.tabs-variants {
		display: grid;
		gap: var(--g-token-space-4);
	}
</style>
