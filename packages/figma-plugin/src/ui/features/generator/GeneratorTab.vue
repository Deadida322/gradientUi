<script setup lang="ts">
	import {
		gradientTypes,
		positions,
		presetItems,
		recipes,
		seeds
	} from '../../app/constants';
	import { usePluginAppContext } from '../../app/context';
	import FColorInput from '../../ui-kit/FColorInput.vue';
	import FPanel from '../../ui-kit/FPanel.vue';
	import FRange from '../../ui-kit/FRange.vue';
	import FSelect from '../../ui-kit/FSelect.vue';
	import FTextInput from '../../ui-kit/FTextInput.vue';

	const app = usePluginAppContext();
</script>

<template>
	<section class="layout">
		<f-panel
			class="preview-panel"
			title="Preview">
			<div class="preview-grid">
				<div class="preview-shell">
					<div
						class="preview-glow"
						:style="app.glowPreviewStyle.value" />
					<div
						class="preview"
						:style="app.previewStyle.value">
						{{ app.state.generator.recipe }}
					</div>
				</div>
			</div>
		</f-panel>

		<f-panel title="Model">
			<f-select
				v-model="app.selectedPreset.value"
				label="Preset"
				:options="presetItems"
				@change="app.applyPreset" />

			<div class="status">{{ app.currentPreset.value.description }}</div>

			<div class="seed-row">
				<f-color-input
					v-model="app.state.generator.seed"
					label="Seed" />
				<f-text-input
					v-model="app.state.generator.seed"
					label="Hex" />
			</div>

			<f-select
				v-model="app.state.generator.seed"
				label="Quick pick"
				:options="seeds" />

			<f-select
				v-model="app.state.generator.recipe"
				label="Recipe"
				:options="recipes" />

			<f-select
				v-model="app.state.generator.type"
				label="Type"
				:options="gradientTypes" />

			<f-range
				v-if="app.state.generator.type !== 'radial'"
				v-model="app.state.generator.direction"
				:label="`Direction: ${app.state.generator.direction}`"
				:min="0"
				:max="360"
				:step="5" />

			<f-select
				v-model="app.state.generator.position"
				label="Position"
				:options="positions" />

			<div
				v-if="app.state.generator.recipe === 'duotone'"
				class="grid-2">
				<f-color-input
					v-model="app.state.generator.duotoneFrom"
					label="Duotone from" />
				<f-color-input
					v-model="app.state.generator.duotoneTo"
					label="Duotone to" />
			</div>
		</f-panel>

		<f-panel title="Glow">
			<f-range
				v-model="app.state.generator.glowBlur"
				:label="`Blur: ${app.state.generator.glowBlur}`"
				:min="0"
				:max="64"
				:step="1" />
			<f-range
				v-model="app.state.generator.glowOpacity"
				:label="`Opacity: ${app.state.generator.glowOpacity}`"
				:min="0"
				:max="1"
				:step="0.01" />
			<div class="grid-2">
				<f-range
					v-model="app.state.generator.glowX"
					:label="`X: ${app.state.generator.glowX}`"
					:min="-32"
					:max="32"
					:step="1" />
				<f-range
					v-model="app.state.generator.glowY"
					:label="`Y: ${app.state.generator.glowY}`"
					:min="-32"
					:max="32"
					:step="1" />
			</div>
		</f-panel>
	</section>
</template>

<style scoped>
	.layout {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.grid-2 {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 8px;
	}

	.seed-row {
		display: grid;
		grid-template-columns: 52px minmax(0, 1fr);
		gap: 8px;
		align-items: end;
	}

	.status {
		min-height: 18px;
		color: var(--figma-color-text-secondary);
	}

	.preview-panel {
		position: sticky;
		z-index: 6;
		top: 0;
	}

	.preview-grid {
		position: relative;

		display: grid;
		grid-template-columns: 1fr;
		align-items: center;
	}

	.preview-shell {
		position: relative;

		overflow: visible;
		min-height: 150px;
	}

	.preview,
	.preview-glow {
		position: absolute;
		inset: 0;
		border-radius: 8px;
	}

	.preview-glow {
		z-index: 0;
	}

	.preview {
		z-index: 1;

		overflow: hidden;
		display: grid;
		place-items: center;

		font-size: 11px;
		font-weight: 800;
		color: white;
		text-align: center;
		text-shadow: 0 1px 16px rgb(0 0 0 / 36%);
	}

	@media (width <= 700px) {
		.preview-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
