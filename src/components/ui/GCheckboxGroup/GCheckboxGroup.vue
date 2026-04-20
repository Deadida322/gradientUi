<script
	lang="ts"
	setup
	generic="T, V = T, ReturnObject extends boolean = false">
	import { computed } from 'vue';
	import {
		GCheckControl,
		GCheckGroup,
		GCheckIndicator
	} from '../GCheckControl';
	import {
		useCheckOptionGroup,
		type CheckGroupEmits,
		type CheckOptionGroupSlots
	} from '@/use/check';
	import type { InternalItem, SelectionValue } from '@/use/select/types';
	import { createComponentId } from '@/utils/createComponentId';
	import type { GCheckboxGroupProps } from './types';

	type ModelValue = SelectionValue<T, V, true, ReturnObject>;

	const props = withDefaults(
		defineProps<GCheckboxGroupProps<T, V, ReturnObject>>(),
		{
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
		}
	);

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
	} = useCheckOptionGroup<T, V, true, ReturnObject>(
		props,
		{
			updateModelValue: (value) => emit('update:modelValue', value),
			focus: (event) => emit('focus', event),
			blur: (event) => emit('blur', event)
		},
		{
			multiple: true,
			namePrefix: 'g-checkbox-group'
		}
	);

	const itemIds = computed(() =>
		items.value.map(
			(_item, index) =>
				`${groupName.value}-${index}-${createComponentId('checkbox')}`
		)
	);

	function getItemProps(item: InternalItem<T, V>, index: number) {
		return {
			id: itemIds.value[index],
			inputType: 'checkbox' as const,
			name: groupName.value,
			label: item.label,
			disabled: props.disabled || item.disabled,
			size: props.size,
			state: props.state,
			checked: isItemSelected(item)
		};
	}

	function getIndicatorProps(item: InternalItem<T, V>) {
		return {
			kind: 'checkbox' as const,
			checked: isItemSelected(item),
			disabled: props.disabled || item.disabled,
			size: props.size,
			state: props.state
		};
	}

	function handleChange(item: InternalItem<T, V>, event: Event) {
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
			v-for="(item, index) in items"
			:key="index">
			<g-check-control
				v-bind="getItemProps(item, index)"
				@change="handleChange(item, $event)">
				<template #indicator>
					<g-check-indicator v-bind="getIndicatorProps(item)" />
				</template>

				<template
					v-if="slots.item"
					#default>
					<slot
						name="item"
						:item="getSlotItem(item)"
						:checked="isItemSelected(item)" />
				</template>
			</g-check-control>
		</template>

		<template
			v-if="slots.message"
			#message>
			<slot name="message" />
		</template>
	</g-check-group>
</template>
