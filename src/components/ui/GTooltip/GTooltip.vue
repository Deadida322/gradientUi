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
	.g-tooltip {
		pointer-events: none;

		overflow: hidden;

		padding: 6px 10px;
		border-radius: 4px;

		font-size: 12px;
		color: var(--g-on-tonal);
		white-space: nowrap;

		background-color: var(--g-tonal);
		backdrop-filter: blur(2px);

		&__underlay {
			position: absolute;
			z-index: -1;
			top: 0;
			left: 0;

			width: 100%;
			height: 100%;

			background-color: rgba(var(--g-theme-surface), 70%);
		}

		&__trigger {
			width: fit-content;
		}
	}
</style>
