<script setup lang="ts">
	import GIcon from '../GIcon/GIcon.vue';
	import type { GGradienStates } from '../GGradient/types';
	import type { Sizes } from '@/types/CommonTypes';

	const props = withDefaults(
		defineProps<{
			kind: 'checkbox' | 'radio' | 'switch';
			checked?: boolean;
			disabled?: boolean;
			size?: Sizes;
			state?: GGradienStates;
		}>(),
		{
			checked: false,
			disabled: false,
			size: 'm',
			state: undefined
		}
	);
</script>

<template>
	<span
		class="g-check-indicator"
		:class="{
			[`g-check-indicator_${props.kind}`]: true,
			[`g-check-indicator_${props.size}`]: true,
			'g-check-indicator_checked': props.checked,
			'g-check-indicator_disabled': props.disabled,
			[`g-check-indicator_${props.state}`]: Boolean(props.state)
		}">
		<span
			v-if="props.kind === 'switch'"
			class="g-check-indicator__switch-track">
			<span class="g-check-indicator__switch-thumb" />
		</span>

		<template v-else>
			<span class="g-check-indicator__shape">
				<g-icon
					v-if="props.kind === 'checkbox' && props.checked"
					icon="check"
					size="14" />
				<span
					v-else-if="props.kind === 'radio'"
					class="g-check-indicator__radio-dot" />
			</span>
		</template>
	</span>
</template>

<style scoped lang="scss">
	.g-check-indicator {
		--g-check-indicator-accent: rgb(var(--g-theme-primary));
		--g-check-indicator-shape-size: 22px;
		--g-check-indicator-track-width: 42px;
		--g-check-indicator-track-height: 24px;
		--g-check-indicator-thumb-size: 18px;
		--g-check-indicator-thumb-translate: 18px;
		--g-check-indicator-shape-radius: 8px;
		--g-check-indicator-shape-border: rgba(var(--g-theme-on-surface), 0.24);
		--g-check-indicator-shape-bg: rgba(var(--g-theme-surface), 0.92);
		--g-check-indicator-track-border: rgba(var(--g-theme-on-surface), 0.2);
		--g-check-indicator-track-bg: rgba(var(--g-theme-on-surface), 0.12);
		--g-check-indicator-dot-scale: 0;
		--g-check-indicator-thumb-transform: translateX(0);
		--g-check-indicator-icon-color: rgb(var(--g-theme-on-primary));

		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--g-check-indicator-icon-color);

		&__shape {
			display: inline-flex;
			align-items: center;
			justify-content: center;

			width: var(--g-check-indicator-shape-size);
			height: var(--g-check-indicator-shape-size);
			border: 1px solid var(--g-check-indicator-shape-border);
			border-radius: var(--g-check-indicator-shape-radius);

			background-color: var(--g-check-indicator-shape-bg);

			transition:
				background-color 0.18s ease,
				border-color 0.18s ease,
				box-shadow 0.18s ease,
				transform 0.18s ease;
		}

		&__radio-dot {
			transform: scale(var(--g-check-indicator-dot-scale));

			width: 10px;
			height: 10px;
			border-radius: 999px;

			background-color: currentcolor;

			transition: transform 0.18s ease;
		}

		&__switch-track {
			position: relative;

			display: inline-flex;
			align-items: center;

			width: var(--g-check-indicator-track-width);
			height: var(--g-check-indicator-track-height);
			padding: 2px;
			border: 1px solid var(--g-check-indicator-track-border);
			border-radius: 999px;

			background-color: var(--g-check-indicator-track-bg);

			transition:
				background-color 0.18s ease,
				border-color 0.18s ease;
		}

		&__switch-thumb {
			transform: var(--g-check-indicator-thumb-transform);

			width: var(--g-check-indicator-thumb-size);
			height: var(--g-check-indicator-thumb-size);
			border-radius: 999px;

			background-color: rgb(var(--g-theme-surface));
			box-shadow: 0 2px 6px rgb(0 0 0 / 16%);

			transition: transform 0.18s ease;
		}

		&_radio {
			--g-check-indicator-shape-radius: 999px;
		}

		&_checked {
			--g-check-indicator-shape-border: var(--g-check-indicator-accent);
			--g-check-indicator-track-border: var(--g-check-indicator-accent);
			--g-check-indicator-shape-bg: var(--g-check-indicator-accent);
			--g-check-indicator-track-bg: var(--g-check-indicator-accent);
			--g-check-indicator-dot-scale: 1;
			--g-check-indicator-thumb-transform: translateX(
				var(--g-check-indicator-thumb-translate)
			);
		}

		&.g-check-indicator_radio.g-check-indicator_checked {
			--g-check-indicator-icon-color: var(--g-check-indicator-accent);
			--g-check-indicator-shape-bg: rgb(
				from var(--g-check-indicator-accent) r g b / 8%
			);
		}

		&_focused {
			.g-check-indicator__shape,
			.g-check-indicator__switch-track {
				box-shadow: 0 0 0 4px rgb(var(--g-theme-primary) / 12%);
			}
		}

		&_error {
			--g-check-indicator-accent: rgb(var(--g-theme-error));
		}

		&_warning {
			--g-check-indicator-accent: rgb(var(--g-theme-warning));
		}

		&_success {
			--g-check-indicator-accent: rgb(var(--g-theme-success));
		}

		&_disabled {
			opacity: 0.65;
		}

		&_s {
			--g-check-indicator-shape-size: 18px;
			--g-check-indicator-track-width: 36px;
			--g-check-indicator-track-height: 20px;
			--g-check-indicator-thumb-size: 14px;
			--g-check-indicator-thumb-translate: 16px;
		}

		&_l {
			--g-check-indicator-shape-size: 26px;
			--g-check-indicator-track-width: 48px;
			--g-check-indicator-track-height: 28px;
			--g-check-indicator-thumb-size: 22px;
		}

		&_xl {
			--g-check-indicator-shape-size: 30px;
			--g-check-indicator-track-width: 54px;
			--g-check-indicator-track-height: 32px;
			--g-check-indicator-thumb-size: 26px;
			--g-check-indicator-thumb-translate: 20px;
		}
	}
</style>
