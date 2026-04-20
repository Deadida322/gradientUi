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
		--g-check-indicator-accent: var(--g-token-color-primary);
		--g-check-indicator-shape-size: var(
			--g-token-check-indicator-shape-size-m
		);
		--g-check-indicator-track-width: var(
			--g-token-check-indicator-track-width-m
		);
		--g-check-indicator-track-height: var(
			--g-token-check-indicator-track-height-m
		);
		--g-check-indicator-thumb-size: var(
			--g-token-check-indicator-thumb-size-m
		);
		--g-check-indicator-thumb-translate: var(
			--g-token-check-indicator-thumb-translate-m
		);
		--g-check-indicator-shape-radius: var(
			--g-token-check-indicator-shape-radius
		);
		--g-check-indicator-shape-border: var(
			--g-token-check-indicator-shape-border
		);
		--g-check-indicator-shape-bg: var(--g-token-check-indicator-shape-bg);
		--g-check-indicator-track-border: var(
			--g-token-check-indicator-track-border
		);
		--g-check-indicator-track-bg: var(--g-token-check-indicator-track-bg);
		--g-check-indicator-dot-scale: 0;
		--g-check-indicator-thumb-transform: translateX(0);
		--g-check-indicator-icon-color: var(--g-token-color-on-primary);

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
			border: var(--g-token-check-indicator-border-width) solid
				var(--g-check-indicator-shape-border);
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

			width: var(--g-token-check-indicator-dot-size);
			height: var(--g-token-check-indicator-dot-size);
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
			padding: var(--g-token-check-indicator-track-padding);
			border: var(--g-token-check-indicator-border-width) solid
				var(--g-check-indicator-track-border);
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

			background-color: var(--g-token-check-indicator-thumb-bg);
			box-shadow: var(--g-token-check-indicator-thumb-shadow);

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
				box-shadow: var(--g-token-check-indicator-focus-ring);
			}
		}

		&_error {
			--g-check-indicator-accent: var(--g-token-color-error);
		}

		&_warning {
			--g-check-indicator-accent: var(--g-token-color-warning);
		}

		&_success {
			--g-check-indicator-accent: var(--g-token-color-success);
		}

		&_disabled {
			opacity: var(--g-token-check-indicator-disabled-opacity);
		}

		&_s {
			--g-check-indicator-shape-size: var(
				--g-token-check-indicator-shape-size-s
			);
			--g-check-indicator-track-width: var(
				--g-token-check-indicator-track-width-s
			);
			--g-check-indicator-track-height: var(
				--g-token-check-indicator-track-height-s
			);
			--g-check-indicator-thumb-size: var(
				--g-token-check-indicator-thumb-size-s
			);
			--g-check-indicator-thumb-translate: var(
				--g-token-check-indicator-thumb-translate-s
			);
		}

		&_l {
			--g-check-indicator-shape-size: var(
				--g-token-check-indicator-shape-size-l
			);
			--g-check-indicator-track-width: var(
				--g-token-check-indicator-track-width-l
			);
			--g-check-indicator-track-height: var(
				--g-token-check-indicator-track-height-l
			);
			--g-check-indicator-thumb-size: var(
				--g-token-check-indicator-thumb-size-l
			);
			--g-check-indicator-thumb-translate: var(
				--g-token-check-indicator-thumb-translate-l
			);
		}

		&_xl {
			--g-check-indicator-shape-size: var(
				--g-token-check-indicator-shape-size-xl
			);
			--g-check-indicator-track-width: var(
				--g-token-check-indicator-track-width-xl
			);
			--g-check-indicator-track-height: var(
				--g-token-check-indicator-track-height-xl
			);
			--g-check-indicator-thumb-size: var(
				--g-token-check-indicator-thumb-size-xl
			);
			--g-check-indicator-thumb-translate: var(
				--g-token-check-indicator-thumb-translate-xl
			);
		}
	}
</style>
