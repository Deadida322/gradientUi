<script setup lang="ts">
	import { computed, ref, watch } from 'vue';
	import { GTab, GTabList, GTabs } from '@/components';
	import DocsLiveExample from '@docs/components/DocsLiveExample.vue';
	import type { DocsLiveExample as DocsLiveExampleType } from '@docs/types';

	const props = defineProps<{
		label: string;
		examples: DocsLiveExampleType[];
	}>();

	const activeExampleId = ref(props.examples[0]?.id);
	const activeExample = computed(() =>
		props.examples.find((example) => example.id === activeExampleId.value)
	);

	watch(
		() => props.examples,
		(examples) => {
			if (
				!examples.some(
					(example) => example.id === activeExampleId.value
				)
			) {
				activeExampleId.value = examples[0]?.id;
			}
		}
	);
</script>

<template>
	<g-tabs
		v-model="activeExampleId"
		class="docs-live-example-tabs"
		variant="pill"
		color="primary">
		<g-tab-list
			grow
			:aria-label="label">
			<g-tab
				v-for="example in examples"
				:key="example.id"
				:value="example.id"
				:label="example.label" />
		</g-tab-list>

		<docs-live-example
			v-if="activeExample"
			:example="activeExample" />
	</g-tabs>
</template>

<style lang="scss">
	.docs-live-example-tabs {
		width: 100%;

		.g-tab-list {
			overflow-x: auto;
			max-width: 100%;
		}
	}
</style>
