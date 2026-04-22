<script setup lang="ts">
	import { ref } from 'vue';
	import GButton from './ui/GButton/GButton.vue';
	import GCheckbox from './ui/GCheckbox/GCheckbox.vue';
	import GExpansion from './ui/GExpansion/GExpansion.vue';
	import GIcon from './ui/GIcon/GIcon.vue';
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
	const loadingSimple = ref(false);
	const loadingCustom = ref(true);

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

		<div class="color-playground__icon-grid">
			<div class="gradient-icon-demo">
				<g-icon
					v-gradient-icon
					icon="palette"
					size="32" />
				<span>current</span>
			</div>
			<div class="gradient-icon-demo">
				<g-icon
					v-gradient-icon="'warning'"
					icon="alert-outline"
					size="32" />
				<span>warning</span>
			</div>
			<div class="gradient-icon-demo">
				<g-icon
					v-gradient-icon="'teal40'"
					icon="check"
					size="32" />
				<span>teal40</span>
			</div>
			<div class="gradient-icon-demo">
				<g-icon
					v-gradient-icon="'deep-purple-60'"
					icon="star-four-points"
					size="32" />
				<span>deep-purple-60</span>
			</div>
			<div class="gradient-icon-demo">
				<g-icon
					v-gradient-icon="{ from: 'pink40', to: 'teal40' }"
					icon="heart-outline"
					size="32" />
				<span>from/to</span>
			</div>
			<div class="gradient-icon-demo">
				<g-icon
					v-gradient-icon="{
						colors: ['red40', 'orange40', 'amber40'],
						direction: '90deg'
					}"
					icon="flash"
					size="32" />
				<span>colors[]</span>
			</div>
		</div>

		<div class="color-playground__text-grid">
			<div
				v-gradient-text
				class="gradient-text-demo gradient-text-demo_lg">
				Default gradient text
			</div>
			<div
				v-gradient-text="'warning'"
				class="gradient-text-demo">
				Warning text
			</div>
			<div
				v-gradient-text="'deep-purple-60'"
				class="gradient-text-demo">
				Deep purple 60
			</div>
			<div
				v-gradient-text="{ from: 'pink40', to: 'teal40' }"
				class="gradient-text-demo">
				Pink to teal
			</div>
			<div
				v-gradient-text="{
					colors: ['red40', 'orange40', 'amber40'],
					direction: '90deg'
				}"
				class="gradient-text-demo gradient-text-demo_lg">
				Multi color text
			</div>
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

		<div class="color-playground__grid">
			<g-progress
				color="blue40"
				label="Syncing components"
				label-align="start"
				:model-value="38"
				rounded />
			<g-progress
				color="green40"
				label="Build quality"
				label-align="center"
				:model-value="64"
				rounded />
			<g-progress
				color="pink40"
				label="Release readiness"
				label-align="end"
				:model-value="86"
				rounded />
		</div>

		<div class="color-playground__grid">
			<g-progress
				color="orange40"
				label="Striped"
				view="striped"
				:model-value="58"
				rounded />
			<g-progress
				color="teal40"
				label="Segmented"
				view="segmented"
				:segments="8"
				:model-value="76" />
			<g-progress
				color="deep-purple-40"
				label="Glow"
				view="glow"
				:model-value="44"
				rounded />
		</div>

		<div class="color-playground__grid">
			<g-progress
				color="blue40"
				label="Loading"
				indeterminate
				rounded />
			<g-progress
				color="orange40"
				label="Striped loading"
				view="striped"
				indeterminate
				rounded />
			<g-progress
				color="teal40"
				label="Segmented loading"
				view="segmented"
				:segments="8"
				indeterminate />
		</div>

		<div class="color-playground__grid">
			<div
				v-loading="loadingSimple"
				class="loading-demo-card">
				<g-text
					type="subtitle-1"
					label="Boolean directive" />
				<div class="loading-demo-card__copy">
					Simple `v-loading="boolean"` with default visual settings.
				</div>
				<g-button
					size="s"
					variant="tonal"
					color="blue40"
					:label="loadingSimple ? 'Hide loading' : 'Show loading'"
					@click="loadingSimple = !loadingSimple" />
			</div>

			<div
				v-loading="{
					active: loadingCustom,
					text: 'Syncing colors',
					color: 'teal40',
					progressView: 'striped',
					opacity: 0.68,
					blur: 6
				}"
				class="loading-demo-card">
				<g-text
					type="subtitle-1"
					label="Object directive" />
				<div class="loading-demo-card__copy">
					Object binding can control text, color, opacity, blur and
					progress view.
				</div>
				<g-button
					size="s"
					variant="tonal"
					color="teal40"
					:label="loadingCustom ? 'Hide loading' : 'Show loading'"
					@click="loadingCustom = !loadingCustom" />
			</div>

			<div
				v-loading.dark="{
					active: loadingCustom,
					noText: true,
					color: 'pink40',
					progressView: 'glow'
				}"
				class="loading-demo-card loading-demo-card_tinted">
				<g-text
					type="subtitle-1"
					label="Dark modifier" />
				<div class="loading-demo-card__copy">
					Modifier still works, but now it maps to a real visual mode.
				</div>
			</div>
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

	.color-playground__icon-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 10px;
	}

	.gradient-icon-demo {
		display: flex;
		gap: 10px;
		align-items: center;

		min-width: 0;
		padding: 10px;
		border: var(--g-token-overlay-border);
		border-radius: var(--g-token-radius-md);

		color: var(--g-token-color-on-surface);
		text-align: left;

		background: var(--g-token-overlay-surface);
	}

	.gradient-icon-demo span {
		overflow: hidden;
		font-size: var(--g-token-font-size-xs);
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.color-playground__text-grid {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 10px;
	}

	.gradient-text-demo {
		overflow: hidden;

		padding: 10px;
		border: var(--g-token-overlay-border);
		border-radius: var(--g-token-radius-md);

		font-size: var(--g-token-font-size-m);
		font-weight: 700;
		line-height: 1.2;
		text-align: left;
		text-overflow: ellipsis;
		white-space: nowrap;

		background-color: var(--g-token-overlay-surface);
	}

	.gradient-text-demo_lg {
		font-size: 24px;
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

	.loading-demo-card {
		position: relative;

		display: flex;
		flex-direction: column;
		gap: var(--g-token-space-3);

		min-height: 156px;
		padding: var(--g-token-space-4);
		border: 1px solid rgb(var(--g-theme-outline));
		border-radius: var(--g-token-radius-lg);

		background: rgb(var(--g-theme-surface));
	}

	.loading-demo-card_tinted {
		background: color-mix(
			in srgb,
			rgb(var(--g-color-pink-40)) 18%,
			rgb(var(--g-theme-surface))
		);
	}

	.loading-demo-card__copy {
		font-size: var(--g-token-font-size-sm);
		line-height: var(--g-token-line-height-sm);
		color: var(--g-token-color-on-surface);
	}

	@media (width >= 900px) {
		.color-playground__grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}

		.color-playground__icon-grid {
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}

		.color-playground__text-grid {
			grid-template-columns: repeat(5, minmax(0, 1fr));
		}
	}
</style>
