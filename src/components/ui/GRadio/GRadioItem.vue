<script lang="ts" setup generic="T">
	import { computed } from 'vue';
	import { GCheckControl, GCheckIndicator } from '../GCheckControl';
	import type { GGradienStates } from '../GGradient/types';
	import type { Sizes } from '@/types/CommonTypes';
	import type { CheckControlEmits, CheckControlSlots } from '@/use/check';
	import { createComponentId } from '@/utils/createComponentId';

	const props = withDefaults(
		defineProps<{
			name: string;
			label: string;
			value: T;
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
		state: props.state,
		checked: props.checked
	}));
	const indicatorProps = computed(() => ({
		kind: 'radio' as const,
		checked: props.checked,
		disabled: props.disabled,
		size: props.size,
		state: props.state
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
