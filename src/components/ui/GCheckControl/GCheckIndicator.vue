<script setup lang="ts">
	import GIcon from '../GIcon/GIcon.vue';
	import GSquircle from '../GSquircle/GSquircle.vue';
	import type { GGradienStates } from '../GGradient/types';
	import type { Sizes } from '@/types/CommonTypes';
	import type { GColor } from '@/use/color';
	import type { CheckIndicatorView } from '@/use/check';
	import { useSurfaceColor } from '@/use/surfaceColor';
	import { computed } from 'vue';

	const props = withDefaults(
		defineProps<{
			kind: 'checkbox' | 'radio' | 'switch';
			view?: CheckIndicatorView;
			checked?: boolean;
			color?: GColor;
			disabled?: boolean;
			size?: Sizes;
			state?: GGradienStates;
		}>(),
		{
			view: 'default',
			checked: false,
			disabled: false,
			size: 'm',
			state: undefined
		}
	);
	const { resolvedColor, resolvedState, colorStyles } =
		useSurfaceColor(props);
	const squircleSize = computed(() => {
		const sizes: Record<Sizes, number> = {
			s: 18,
			m: 22,
			l: 26,
			xl: 30
		};

		return sizes[props.size];
	});
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
		}"
		:style="colorStyles">
		<span
			v-if="props.kind === 'switch'"
			class="g-check-indicator__switch-track">
			<span class="g-check-indicator__switch-thumb" />
		</span>

		<g-squircle
			v-else-if="props.view === 'squircle'"
			class="g-check-indicator__squircle"
			:size="squircleSize"
			:color="resolvedColor"
			:state="resolvedState"
			:variant="props.checked ? 'primary' : 'tonal'"
			:shadow="false"
			:border="props.checked ? 0 : 1"
			:border-color="'var(--g-check-indicator-shape-border)'">
			<g-icon
				v-if="props.kind === 'checkbox' && props.checked"
				icon="check"
				size="14" />
			<span
				v-else-if="props.kind === 'radio'"
				class="g-check-indicator__radio-dot" />
		</g-squircle>

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
		--g-check-indicator-accent: var(--g-color);
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
		--g-check-indicator-icon-color: var(--g-on-color);

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

		&__squircle {
			color: var(--g-check-indicator-accent);

			:deep(.squircle__inner) {
				color: var(--g-check-indicator-accent);
			}
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

		&_checked &__squircle {
			color: var(--g-on-color);

			:deep(.squircle__inner) {
				color: var(--g-on-color);
			}
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
