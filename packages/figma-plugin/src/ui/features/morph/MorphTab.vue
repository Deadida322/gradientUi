<script setup lang="ts">
	import type { ComponentPublicInstance } from 'vue';
	import { morphBlendModes, morphPresets } from '../../app/constants';
	import { usePluginAppContext } from '../../app/context';
	import FPanel from '../../ui-kit/FPanel.vue';
	import FRange from '../../ui-kit/FRange.vue';
	import FSelect from '../../ui-kit/FSelect.vue';

	const app = usePluginAppContext();

	const setMorphPreviewRef = (
		element: Element | ComponentPublicInstance | null
	) => {
		app.morphPreviewRef.value =
			element instanceof HTMLElement ? element : null;
	};
</script>

<template>
	<section class="morph-layout">
		<f-panel
			class="preview-panel"
			title="Morph Preview">
			<div
				:ref="setMorphPreviewRef"
				class="gradient-engine__morph-sample"
				v-html="app.morphMarkup.value" />
		</f-panel>

		<f-panel title="Morph">
			<f-select
				v-model="app.state.generator.morphPreset"
				label="Preset"
				:options="morphPresets"
				@change="app.applyMorphPreset" />
			<f-range
				v-model="app.state.generator.morphBlobCount"
				:label="`Blobs: ${app.state.generator.morphBlobCount}`"
				:min="2"
				:max="8" />
			<f-select
				v-model="app.state.generator.morphBlendMode"
				label="Blend mode"
				:options="morphBlendModes" />
			<f-range
				v-model="app.state.generator.morphBlur"
				:label="`Blur: ${app.state.generator.morphBlur}`"
				:min="0"
				:max="80" />
			<f-range
				v-model="app.state.generator.morphScale"
				:label="`Blob radius: ${app.state.generator.morphScale}`"
				:min="0.4"
				:max="2"
				:step="0.01" />
			<f-range
				v-model="app.state.generator.morphBlobOpacity"
				:label="`Blob intensity: ${app.state.generator.morphBlobOpacity}`"
				:min="0"
				:max="1.6"
				:step="0.01" />
			<f-range
				v-model="app.state.generator.morphOpacity"
				:label="`Opacity: ${app.state.generator.morphOpacity}`"
				:min="0"
				:max="1"
				:step="0.01" />
			<f-range
				v-model="app.state.generator.morphContrast"
				:label="`Goo contrast: ${app.state.generator.morphContrast}`"
				:min="0"
				:max="36" />
			<f-range
				v-model="app.state.generator.morphDuration"
				:label="`Morph duration: ${app.state.generator.morphDuration}ms`"
				:min="3000"
				:max="18000"
				:step="250" />
		</f-panel>
	</section>
</template>

<style scoped>
	.morph-layout {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.preview-panel {
		position: sticky;
		z-index: 6;
		top: 0;
	}

	.gradient-engine__morph-sample {
		position: relative;

		overflow: hidden;
		display: grid;
		place-content: center center;
		place-items: center;

		aspect-ratio: 2.5;
		width: 100%;
		height: fit-content;
		border-radius: 18px;
	}

	.gradient-engine__morph-sample :deep(svg) {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
