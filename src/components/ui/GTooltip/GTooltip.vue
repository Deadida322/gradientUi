<script lang="ts" setup>
	import { ref } from 'vue';
	import { BaseFloating } from '../BaseFloating';
	import { makeTooltipProps } from './types';
	import { useTriggerFactory } from '@/use/floatingTrigger';

	const props = defineProps(makeTooltipProps());

	const open = ref(false);

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
		v-model:model-value="open">
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
			{{ props.content }}
			<div class="g-tooltip__underlay"></div>
		</div>
	</base-floating>
</template>

<style lang="scss" scoped>
	@use '@/styles/mixins/truncate' as truncate;

	.g-tooltip {
		pointer-events: none;

		overflow: hidden;

		padding: var(--g-token-tooltip-padding-y)
			var(--g-token-tooltip-padding-x);
		border-radius: var(--g-token-tooltip-radius);

		font-size: var(--g-token-tooltip-font-size);
		color: var(--g-token-tooltip-color);

		background-color: var(--g-token-tooltip-surface);
		backdrop-filter: blur(var(--g-token-tooltip-backdrop-blur));

		@include truncate.truncate;

		&__underlay {
			position: absolute;
			z-index: -1;
			top: 0;
			left: 0;

			width: 100%;
			height: 100%;

			background-color: var(--g-token-tooltip-surface-underlay);
		}

		&__trigger {
			width: fit-content;
		}
	}
</style>
