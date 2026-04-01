<script lang="ts" setup>
	import { v4 as uuidv4 } from 'uuid';
	import { toRef, useAttrs } from 'vue';
	import GFieldBase from '../GFieldBase/GFieldBase.vue';
	import SwitchPassword from './SwitchPassword.vue';
	import { type GInputSlots } from './types';
	import { GInputEmits, makeInputProps, useInputControl } from '@/use/input';
	import { useTextFieldControl } from '@/use/form/textFieldControl';
	import { useVisibleProps } from '@/use/visibleProps';

	defineOptions({
		inheritAttrs: false
	});

	const props = defineProps(makeInputProps());
	const slots = defineSlots<GInputSlots>();
	const emit = defineEmits(GInputEmits);
	const slotNames = ['default', 'prepend', 'append', 'message'] as const;
	const visibleSlotNames = useVisibleProps(slots, slotNames);

	const attrs = useAttrs();
	const modelValue = defineModel<string>({ default: '' });
	const id = uuidv4();

	const { passwordVisible, computedType, togglePasswordVisibility } =
		useInputControl({
			type: toRef(props, 'type')
		});

	const {
		$v,
		fieldProps,
		handleInput,
		handleChange,
		handleFocus,
		handleBlur,
		handleClear
	} = useTextFieldControl({
		id,
		props: {
			label: props.label,
			state: props.state,
			disabled: props.disabled,
			clearable: props.clearable,
			size: props.size,
			message: props.message,
			prependIcon: props.prependIcon,
			appendIcon: props.appendIcon
		},
		modelValue,
		rules: toRef(props, 'rules'),
		message: toRef(props, 'message'),
		multiline: false,
		extraFieldProps: () => ({
			type: computedType.value
		}),
		emitters: {
			input: (value, event) => emit('input', value, event),
			change: (value, event) => emit('change', value, event),
			focus: (event) => emit('focus', event),
			blur: (event) => emit('blur', event),
			clear: () => emit('clear')
		}
	});

	function handleTogglePassword(visible: boolean) {
		togglePasswordVisibility();
		emit('toggle-password', visible);
	}

	defineExpose({
		$v
	});
</script>

<template>
	<g-field-base
		v-bind="fieldProps"
		@clear="handleClear">
		<template #control>
			<input
				v-bind="attrs"
				:id="id"
				:value="modelValue"
				:type="computedType"
				:name="id"
				:disabled="props.disabled"
				class="g-field-base__native"
				@input="handleInput"
				@change="handleChange"
				@focus="handleFocus"
				@blur="handleBlur" />
		</template>

		<template #actions>
			<switch-password
				v-if="props.type === 'password'"
				:model-value="passwordVisible"
				@update:model-value="handleTogglePassword" />
		</template>

		<template
			v-for="slotName in visibleSlotNames"
			:key="slotName"
			#[slotName]>
			<slot :name="slotName" />
		</template>
	</g-field-base>
</template>
