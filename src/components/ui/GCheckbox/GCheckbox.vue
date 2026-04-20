<script setup lang="ts">
	import { GCheckControl, GCheckIndicator } from '../GCheckControl';
	import {
		makeCheckBooleanControlProps,
		useCheckBooleanControl,
		type CheckControlEmits,
		type CheckControlSlots
	} from '@/use/check';

	const props = defineProps(makeCheckBooleanControlProps());
	defineSlots<CheckControlSlots>();

	const emit = defineEmits<CheckControlEmits<boolean>>();
	const modelValue = defineModel<boolean>({ default: false });
	const {
		controlProps,
		indicatorProps,
		handleChange,
		handleGroupFocusIn,
		handleGroupFocusOut,
		handlePointerDown,
		handlePointerEnd,
		$v
	} = useCheckBooleanControl(
		props,
		modelValue,
		{
			change: (value, event) => emit('change', value, event),
			focus: (event) => emit('focus', event),
			blur: (event) => emit('blur', event)
		},
		{
			idPrefix: 'g-checkbox',
			indicatorKind: 'checkbox'
		}
	);

	defineExpose({
		$v
	});
</script>

<template>
	<g-check-control
		v-bind="controlProps"
		@change="handleChange"
		@focusin="handleGroupFocusIn"
		@focusout="handleGroupFocusOut"
		@pointerdown="handlePointerDown"
		@pointerup="handlePointerEnd"
		@pointercancel="handlePointerEnd">
		<template #indicator>
			<g-check-indicator v-bind="indicatorProps" />
		</template>

		<template
			v-if="$slots.default"
			#default>
			<slot />
		</template>

		<template
			v-if="$slots.message"
			#message>
			<slot name="message" />
		</template>
	</g-check-control>
</template>
