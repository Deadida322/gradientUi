<script setup lang="ts">
	import { ref } from 'vue';
	import GButton from './ui/GButton/GButton.vue';
	import GCheckbox from './ui/GCheckbox/GCheckbox.vue';
	import GExpansion from './ui/GExpansion/GExpansion.vue';
	import GInput from './ui/GInput/GInput.vue';
	import GProgress from './ui/GProgress/GProgress.vue';
	import GSwitch from './ui/GSwitch/GSwitch.vue';
	import GText from './ui/GText/GText.vue';

	const colors = [
		'red40',
		'orange40',
		'amber40',
		'green40',
		'teal40',
		'blue40',
		'deep-purple-40',
		'pink40',
		'blue-grey-40'
	];
	const tones = [
		'red20',
		'red40',
		'red60',
		'red80',
		'teal20',
		'teal40',
		'teal60',
		'teal80',
		'deep-purple-20',
		'deep-purple-40',
		'deep-purple-60',
		'deep-purple-80'
	];

	const fieldValue = ref('Color system');
	const checked = ref(true);

	function colorTokenName(color: string) {
		return color.replace(/([a-zA-Z])(\d+)/, '$1-$2');
	}
</script>

<template>
	<section class="color-playground">
		<g-text
			type="h-5"
			label="Color system" />

		<div class="color-playground__swatches">
			<div
				v-for="color in colors"
				:key="color"
				class="color-swatch"
				:style="{
					'--color-swatch-bg': `rgb(var(--g-color-${colorTokenName(color)}))`,
					'--color-swatch-fg': `rgb(var(--g-color-on-${colorTokenName(color)}))`
				}">
				<span>{{ color }}</span>
			</div>
		</div>

		<div class="color-playground__row">
			<g-button
				v-for="color in colors"
				:key="`button-${color}`"
				:color="color"
				variant="filled"
				size="s"
				border-width="1"
				glow
				:label="color" />
		</div>

		<div class="color-playground__row">
			<g-button
				v-for="color in tones"
				:key="`tone-${color}`"
				:color="color"
				variant="outlined"
				size="s"
				border-width="1"
				:label="color" />
		</div>

		<div class="color-playground__grid">
			<g-input
				v-for="color in colors.slice(0, 6)"
				:key="`input-${color}`"
				v-model="fieldValue"
				:color="color"
				:label="color"
				prepend-icon="palette" />
		</div>

		<div class="color-playground__grid">
			<g-expansion
				v-for="color in colors.slice(0, 6)"
				:key="`expansion-${color}`"
				:color="color"
				variant="tonal"
				border-width="1"
				glow
				:title="color"
				text="surface, content and gradient use the same color">
				{{ color }}
			</g-expansion>
		</div>

		<div class="color-playground__grid color-playground__grid_checks">
			<g-checkbox
				v-for="color in colors.slice(0, 4)"
				:key="`checkbox-${color}`"
				v-model="checked"
				:color="color"
				:label="color" />
			<g-switch
				v-for="color in colors.slice(4, 8)"
				:key="`switch-${color}`"
				v-model="checked"
				:color="color"
				:label="color" />
		</div>

		<div class="color-playground__grid">
			<g-progress
				v-for="color in colors.slice(0, 6)"
				:key="`progress-${color}`"
				:color="color"
				:model-value="72"
				rounded />
		</div>
	</section>
</template>

<style scoped>
	.color-playground {
		display: flex;
		flex-direction: column;
		gap: 18px;
		margin-block: 24px;
	}

	.color-playground__swatches,
	.color-playground__row {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.color-playground__grid {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 12px;
	}

	.color-playground__grid_checks {
		align-items: start;
	}

	.color-swatch {
		display: flex;
		align-items: flex-end;

		width: 132px;
		height: 72px;
		padding: 10px;
		border-radius: var(--g-token-radius-md);

		color: var(--color-swatch-fg);
		text-align: left;

		background: var(--color-swatch-bg);
	}

	.color-swatch span {
		font-size: var(--g-token-font-size-xs);
	}

	@media (width >= 900px) {
		.color-playground__grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
