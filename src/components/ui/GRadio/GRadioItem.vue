<script lang="ts" setup generic="T">
	import { computed } from 'vue';
	import { GCheckControl, GCheckIndicator } from '../GCheckControl';
	import type { GGradienStates } from '../GGradient/types';
	import type { Sizes } from '@/types/CommonTypes';
	import type { GColor } from '@/use/color';
	import type {
		CheckControlEmits,
		CheckControlSlots,
		CheckIndicatorView
	} from '@/use/check';
	import { createComponentId } from '@/utils/createComponentId';

	const props = withDefaults(
		defineProps<{
			name: string;
			label: string;
			value: T;
			checked?: boolean;
			color?: GColor;
			disabled?: boolean;
			size?: Sizes;
			state?: GGradienStates;
			indicatorView?: CheckIndicatorView;
			inline?: boolean;
		}>(),
		{
			checked: false,
			disabled: false,
			size: 'm',
			state: undefined,
			indicatorView: 'default',
			inline: false
		}
	);

	defineSlots<Pick<CheckControlSlots, 'default'>>();

	const emit = defineEmits<CheckControlEmits<T>>();

	const inputId = computed(() => createComponentId('g-radio-item'));
	const controlProps = computed(() => ({
		id: inputId.value,
		inputType: 'radio' as const,
		name: props.name,
		label: props.label,
		disabled: props.disabled,
		size: props.size,
		color: props.color,
		state: props.state,
		inline: props.inline,
		checked: props.checked
	}));
	const indicatorProps = computed(() => ({
		kind: 'radio' as const,
		checked: props.checked,
		disabled: props.disabled,
		size: props.size,
		color: props.color,
		state: props.state,
		view: props.indicatorView
	}));

	function handleChange(event: Event) {
		emit('change', props.value, event);
	}
</script>

<template>
	<g-check-control
		v-bind="controlProps"
		@change="handleChange"
		@focus="emit('focus', $event)"
		@blur="emit('blur', $event)">
		<template #indicator>
			<g-check-indicator v-bind="indicatorProps" />
		</template>

		<template
			v-if="$slots.default"
			#default>
			<slot />
		</template>
	</g-check-control>
</template>
