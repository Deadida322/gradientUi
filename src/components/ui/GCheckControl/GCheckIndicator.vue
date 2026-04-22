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
			[`g-check-indicator_view-${props.view}`]: true,
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
				<span class="g-check-indicator__shape-content">
					<g-icon
						v-if="props.kind === 'checkbox' && props.checked"
						icon="check"
						size="14" />
					<span
						v-else-if="props.kind === 'radio'"
						class="g-check-indicator__radio-dot" />
				</span>
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
		--g-check-indicator-dot-size: var(--g-token-check-indicator-dot-size);
		--g-check-indicator-dot-radius: 999px;
		--g-check-indicator-dot-transform: scale(
			var(--g-check-indicator-dot-scale)
		);
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

		&__shape-content {
			display: inline-flex;
			align-items: center;
			justify-content: center;

			width: 100%;
			height: 100%;

			transition: transform 0.18s ease;
		}

		&__radio-dot {
			transform: var(--g-check-indicator-dot-transform);

			width: var(--g-check-indicator-dot-size);
			height: var(--g-check-indicator-dot-size);
			border-radius: var(--g-check-indicator-dot-radius);

			background-color: currentcolor;

			transition:
				transform 0.18s ease,
				border-radius 0.18s ease,
				box-shadow 0.18s ease;
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

		&.g-check-indicator_radio.g-check-indicator_view-squircle.g-check-indicator_checked,
		&.g-check-indicator_radio.g-check-indicator_view-diamond.g-check-indicator_checked,
		&.g-check-indicator_radio.g-check-indicator_view-blob.g-check-indicator_checked,
		&.g-check-indicator_radio.g-check-indicator_view-cut-corner.g-check-indicator_checked {
			--g-check-indicator-icon-color: var(--g-on-color);
			--g-check-indicator-shape-bg: var(--g-check-indicator-accent);
		}

		&_view-diamond {
			--g-check-indicator-shape-radius: 6px;

			.g-check-indicator__shape {
				transform: rotate(45deg) scale(0.94);
			}

			.g-check-indicator__shape-content {
				transform: rotate(-45deg);
			}
		}

		&_view-diamond#{&}_checked {
			.g-check-indicator__shape {
				transform: rotate(45deg) scale(1);
			}
		}

		&.g-check-indicator_radio.g-check-indicator_view-diamond {
			--g-check-indicator-dot-size: 8px;
			--g-check-indicator-dot-radius: 3px;
			--g-check-indicator-dot-transform: rotate(45deg)
				scale(var(--g-check-indicator-dot-scale));
		}

		&_view-soft {
			--g-check-indicator-shape-border: color-mix(
				in srgb,
				var(--g-check-indicator-accent) 26%,
				transparent
			);
			--g-check-indicator-shape-bg: color-mix(
				in srgb,
				var(--g-check-indicator-accent) 10%,
				var(--g-surface-color)
			);
		}

		&.g-check-indicator_radio.g-check-indicator_view-soft {
			--g-check-indicator-dot-size: 9px;
			--g-check-indicator-dot-radius: 999px;

			.g-check-indicator__radio-dot {
				box-shadow: 0 0 0 4px
					color-mix(
						in srgb,
						var(--g-check-indicator-accent) 14%,
						transparent
					);
			}
		}

		&.g-check-indicator_radio.g-check-indicator_view-squircle {
			--g-check-indicator-dot-size: 9px;
			--g-check-indicator-dot-radius: 4px;
		}

		&_view-blob {
			--g-check-indicator-shape-radius: 57% 43% 52% 48% / 44% 58% 42% 56%;

			.g-check-indicator__shape {
				transform: rotate(-5deg) scale(0.96);
			}

			.g-check-indicator__shape-content {
				transform: rotate(5deg);
			}
		}

		&_view-blob#{&}_checked {
			.g-check-indicator__shape {
				transform: rotate(4deg) scale(1);
				border-radius: 42% 58% 46% 54% / 58% 40% 60% 42%;
			}
		}

		&.g-check-indicator_radio.g-check-indicator_view-blob {
			--g-check-indicator-dot-size: 9px;
			--g-check-indicator-dot-radius: 48% 52% 44% 56% / 56% 42% 58% 44%;
			--g-check-indicator-dot-transform: rotate(-10deg)
				scale(var(--g-check-indicator-dot-scale));
		}

		&_view-cut-corner {
			--g-check-indicator-shape-radius: 2px;

			.g-check-indicator__shape {
				clip-path: polygon(
					22% 0,
					100% 0,
					100% 78%,
					78% 100%,
					0 100%,
					0 22%
				);
			}
		}

		&.g-check-indicator_radio.g-check-indicator_view-cut-corner {
			--g-check-indicator-dot-size: 9px;
			--g-check-indicator-dot-radius: 2px;

			.g-check-indicator__radio-dot {
				clip-path: polygon(
					24% 0,
					100% 0,
					100% 76%,
					76% 100%,
					0 100%,
					0 24%
				);
			}
		}

		&_view-soft#{&}_checked {
			--g-check-indicator-shape-bg: color-mix(
				in srgb,
				var(--g-check-indicator-accent) 20%,
				var(--g-surface-color)
			);

			&.g-check-indicator_checkbox {
				--g-check-indicator-icon-color: var(--g-check-indicator-accent);
			}

			&.g-check-indicator_radio {
				--g-check-indicator-icon-color: var(--g-check-indicator-accent);
				--g-check-indicator-shape-border: color-mix(
					in srgb,
					var(--g-check-indicator-accent) 36%,
					transparent
				);
			}
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
