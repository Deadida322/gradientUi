<script
	lang="ts"
	setup
	generic="T, V = T, ReturnObject extends boolean = false">
	import { computed } from 'vue';
	import { GCheckGroup } from '../GCheckControl';
	import GRadioItem from './GRadioItem.vue';
	import {
		useCheckOptionGroup,
		type CheckGroupEmits,
		type CheckOptionGroupSlots
	} from '@/use/check';
	import type { InternalItem, SelectionValue } from '@/use/select/types';
	import type { GRadioProps } from './types';

	type ModelValue = SelectionValue<T, V, false, ReturnObject>;

	const props = withDefaults(defineProps<GRadioProps<T, V, ReturnObject>>(), {
		id: undefined,
		name: undefined,
		label: undefined,
		disabled: false,
		size: 'm',
		state: undefined,
		message: undefined,
		inline: false,
		vertical: false,
		rules: () => [],
		valueComparator: undefined,
		labelKey: undefined,
		valueKey: undefined
	});

	const slots = defineSlots<CheckOptionGroupSlots<T>>();
	const emit = defineEmits<CheckGroupEmits<ModelValue>>();
	const {
		groupName,
		groupProps,
		items,
		isItemSelected,
		getNextItemValue,
		selectItem,
		handleGroupFocusIn,
		handleGroupFocusOut,
		handlePointerDown,
		handlePointerEnd,
		$v
	} = useCheckOptionGroup<T, V, false, ReturnObject>(
		props,
		{
			updateModelValue: (value) => emit('update:modelValue', value),
			focus: (event) => emit('focus', event),
			blur: (event) => emit('blur', event)
		},
		{
			multiple: false,
			namePrefix: 'g-radio'
		}
	);

	function getItemProps(item: InternalItem<T, V>) {
		return {
			name: groupName.value,
			label: item.label,
			value: item.value,
			checked: isItemSelected(item),
			disabled: props.disabled || item.disabled,
			size: props.size,
			state: props.state
		};
	}

	function handleSelect(item: InternalItem<T, V>, event: Event) {
		const nextValue = getNextItemValue(item);
		selectItem(item);

		if (nextValue !== undefined) {
			emit('change', nextValue, event);
		}
	}

	function getSlotItem(item: InternalItem<T, V>) {
		return item.raw;
	}

	defineExpose({
		$v
	});
</script>

<template>
	<g-check-group
		v-bind="groupProps"
		@focusin="handleGroupFocusIn"
		@focusout="handleGroupFocusOut"
		@pointerdown="handlePointerDown"
		@pointerup="handlePointerEnd"
		@pointercancel="handlePointerEnd">
		<template
			v-if="slots.label"
			#label>
			<slot name="label" />
		</template>

		<template
			v-for="item in items"
			:key="item.label">
			<g-radio-item
				v-bind="getItemProps(item)"
				@change="(_value, event) => handleSelect(item, event)">
				<template
					v-if="slots.item"
					#default>
					<slot
						name="item"
						:item="getSlotItem(item)"
						:checked="isItemSelected(item)" />
				</template>
			</g-radio-item>
		</template>

		<template
			v-if="slots.message"
			#message>
			<slot name="message" />
		</template>
	</g-check-group>
</template>
