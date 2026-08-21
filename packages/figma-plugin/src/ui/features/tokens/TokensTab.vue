<script setup lang="ts">
	import {
		gradientTypes,
		positions,
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
	<section class="token-layout">
		<f-panel
			class="preview-panel"
			title="Preview">
			<div class="preview-grid">
				<div
					class="preview"
					:style="app.previewStyle.value">
					{{ app.state.generator.recipe }}
				</div>
			</div>
		</f-panel>

		<div class="controls-grid">
			<f-panel title="Theme">
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
			</f-panel>

			<f-panel title="Main Gradient">
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
		</div>
	</section>
</template>

<style scoped>
	.token-layout {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.controls-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px;
		align-items: start;
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

	.preview {
		position: relative;

		overflow: hidden;
		display: grid;
		place-items: center;

		min-height: 150px;
		border-radius: 8px;

		font-size: 11px;
		font-weight: 800;
		color: white;
		text-align: center;
		text-shadow: 0 1px 16px rgb(0 0 0 / 36%);
	}

	.preview-grid {
		display: grid;
		grid-template-columns: 1fr;
	}

	.preview-panel {
		position: sticky;
		z-index: 6;
		top: 0;
	}

	@media (width <= 700px) {
		.controls-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
