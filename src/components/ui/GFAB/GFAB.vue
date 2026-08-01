<script setup lang="ts">
	import { computed } from 'vue';
	import GSquircle from '../GSquircle/GSquircle.vue';
	import GIcon from '../GIcon/GIcon.vue';
	import { makeFABProps } from './types';
	import type { GFABVariant } from './types';

	const props = defineProps(makeFABProps());
	const slots = defineSlots<{
		default?: () => unknown;
		icon?: () => unknown;
	}>();

	const sizesMap = {
		s: 40,
		m: 56,
		l: 64,
		xl: 96
	};
	const iconSizesMap = {
		s: 20,
		m: 24,
		l: 28,
		xl: 40
	};
	const squircleVariantMap: Record<
		GFABVariant,
		'gradient' | 'primary' | 'tonal'
	> = {
		gradient: 'gradient',
		default: 'primary',
		tonal: 'tonal',
		outlined: 'tonal'
	};

	const computedSize = computed(() => sizesMap[props.size ?? 'm']);
	const computedIconSize = computed(() => iconSizesMap[props.size ?? 'm']);
	const computedSquircleVariant = computed(
		() => squircleVariantMap[props.variant] ?? 'primary'
	);
	const computedBorder = computed(() => {
		if (props.border !== undefined) return props.border;

		return props.variant === 'outlined' ? 1 : 0;
	});
	const computedShadow = computed(() => props.shadow);
	const computedBorderColor = computed(() => {
		if (props.borderColor) return props.borderColor;

		return props.variant === 'outlined' ? 'var(--g-color)' : undefined;
	});
	const hasLabel = computed(
		() => Boolean(props.label) || Boolean(slots.default)
	);
	const isExtended = computed(() => props.extended && hasLabel.value);
	const locationParts = computed(() => props.location.split('-'));
	const positionStyles = computed(() => {
		if (props.position === 'static') return undefined;

		const [block, inline] = locationParts.value;
		const offset =
			typeof props.offset === 'number'
				? `${props.offset}px`
				: props.offset;

		return {
			position: props.position,
			[block]: offset,
			...(inline === 'center'
				? {
						left: '50%',
						transform: 'translateX(-50%)'
					}
				: { [inline]: offset })
		};
	});
</script>

<template>
	<button
		type="button"
		class="g-fab"
		:class="[
			`g-fab_${props.size}`,
			`g-fab_${props.variant}`,
			`g-fab_${props.position}`,
			{
				'g-fab_extended': isExtended,
				'g-fab_disabled': props.disabled,
				[`g-fab_label-${props.labelPlacement}`]: isExtended
			}
		]"
		:style="positionStyles"
		:disabled="props.disabled"
		:aria-label="props.label">
		<g-squircle
			class="g-fab__squircle"
			:size="computedSize"
			:variant="computedSquircleVariant"
			:shadow="computedShadow"
			:border="computedBorder"
			:border-color="computedBorderColor"
			:color="props.color"
			:state="props.state"
			:gradient-border="
				props.variant === 'outlined' || props.variant === 'gradient'
			"
			:glow="props.glow"
			:animate-glow="props.animateGlow"
			:gradient-recipe="props.gradientRecipe"
			:animation-options="props.animationOptions">
			<span class="g-fab__icon">
				<g-icon
					v-if="props.icon"
					:icon="props.icon"
					:size="computedIconSize" />
				<slot
					v-else
					name="icon" />
			</span>
		</g-squircle>
		<span
			v-if="isExtended"
			class="g-fab__label">
			<span class="g-fab__label-text">
				<slot>{{ props.label }}</slot>
			</span>
		</span>
	</button>
</template>

<style scoped lang="scss">
	@use '@/styles/mixins/disabled' as disabled;

	.g-fab {
		--g-fab-gap: var(--g-token-space-3);
		--g-fab-label-padding-right: var(--g-token-space-5);

		cursor: pointer;

		z-index: var(--g-fab-z-index, 1200);

		display: flex;
		gap: var(--g-fab-gap);
		align-items: center;

		width: fit-content;
		padding: 0;
		border: 0;

		font: inherit;
		color: var(--g-token-color-on-surface);

		background: transparent;

		transition:
			opacity var(--g-token-duration-base) var(--g-token-easing-standard),
			transform var(--g-token-duration-base)
				var(--g-token-easing-emphasized);

		&__squircle {
			flex: 0 0 auto;
		}

		&__icon {
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}

		&__label {
			overflow: hidden;

			max-width: 220px;
			padding: 4px 6px;
			border-radius: var(--g-token-radius-sm);

			font-size: var(--g-token-font-size-xs);
			font-weight: var(--g-token-font-weight-medium);
			line-height: var(--g-token-line-height-md);
			color: var(--g-token-color-on-surface);
			text-overflow: ellipsis;
			white-space: nowrap;

			background: color-mix(
				in srgb,
				var(--g-token-color-surface) 60%,
				transparent
			);
			backdrop-filter: blur(4px);
		}

		&__label-text {
			display: block;
		}

		&:hover {
			transform: translateY(-2px);

			:deep(.squircle__glow) {
				transform: translateY(2px);
			}
		}

		&:focus-visible {
			outline: var(--g-token-state-focus-ring-width) solid
				var(--g-token-focus-ring);
			outline-offset: 4px;
		}

		&_extended {
			gap: var(--g-token-space-2);
		}

		&_label-left {
			flex-direction: row-reverse;
		}

		&_tonal {
			.g-fab__squircle {
				filter: drop-shadow(0 8px 18px rgb(0 0 0 / 10%));
			}
		}

		&_outlined {
			.g-fab__squircle {
				filter: drop-shadow(0 4px 12px rgb(0 0 0 / 8%));
			}
		}

		&_fixed,
		&_absolute {
			pointer-events: auto;
		}
	}

	@include disabled.disabled('g-fab');
</style>
