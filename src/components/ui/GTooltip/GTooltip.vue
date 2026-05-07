<script lang="ts" setup>
	import { computed, ref } from 'vue';
	import { BaseFloating } from '../BaseFloating';
	import { makeTooltipProps } from './types';
	import { useTriggerFactory } from '@/use/floatingTrigger';

	const props = defineProps(makeTooltipProps());

	const open = ref(false);
	const tooltipTransition = computed(
		() => props.transition ?? { name: 'scale-only', scale: 0.96 }
	);

	const { triggerAttrs, floatingAttrs } = useTriggerFactory(open, {
		hover: {
			openDelay: props.openDelay,
			closeDelay: props.closeDelay
		},
		focus: true
	});

	function hide() {
		open.value = false;
	}

	function show() {
		open.value = true;
	}

	defineExpose({ hide, show, open });
</script>

<template>
	<base-floating
		v-bind="props"
		v-model:model-value="open"
		:transition="tooltipTransition">
		<template
			v-if="$slots.default"
			#reference="{ ref: baseRef }">
			<div
				:ref="baseRef"
				class="g-tooltip__trigger"
				tabindex="0"
				v-bind="triggerAttrs">
				<slot />
			</div>
		</template>

		<div
			class="g-tooltip"
			v-bind="floatingAttrs"
			role="tooltip">
			<div class="g-tooltip__underlay"></div>
			<span class="g-tooltip__content">
				{{ props.content }}
			</span>
		</div>
	</base-floating>
</template>

<style lang="scss" scoped>
	@use '@/styles/mixins/truncate' as truncate;

	.g-tooltip {
		pointer-events: none;

		position: relative;
		z-index: 8;

		overflow: hidden;

		padding: var(--g-token-tooltip-padding-y)
			var(--g-token-tooltip-padding-x);
		border-radius: var(--g-token-tooltip-radius);

		font-size: var(--g-token-tooltip-font-size);
		color: var(--g-token-tooltip-color);

		background: transparent;
		backdrop-filter: blur(var(--g-token-tooltip-backdrop-blur));
		box-shadow: var(--g-token-overlay-shadow);

		@include truncate.truncate;

		&__content {
			position: relative;
			z-index: 1;
		}

		&__underlay {
			position: absolute;
			z-index: 0;
			inset: 0;

			border-radius: inherit;

			opacity: var(--g-token-tooltip-opacity);
			background: var(--g-token-color-primary);
		}

		&__trigger {
			width: fit-content;
		}
	}
</style>
