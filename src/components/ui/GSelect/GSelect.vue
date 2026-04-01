<script
	lang="ts"
	setup
	generic="
		T,
		V,
		Multiple extends boolean = false,
		ReturnObject extends boolean = false
	">
	import { computed, reactive, ref, toRef } from 'vue';
	import GFieldBase from '../GFieldBase/GFieldBase.vue';
	import GDropdown from '../GDropdown/GDropdown.vue';
	import GMenu from '../GMenu/GMenu.vue';
	import GIcon from '../GIcon/GIcon.vue';
	import { useBooleanProp } from '@/use/booleanProp';
	import { useSelectController } from '@/use/select/controller';
	import type { SelectionValue } from '@/use/select/types';
	import { useValidation } from '@/use/validation';
	import { useVisibleProps } from '@/use/visibleProps';
	import type { GSelectProps, GSelectSlots } from './types';

	type ModelValue = SelectionValue<T, V, Multiple, ReturnObject>;

	const props = withDefaults(
		defineProps<GSelectProps<T, V, Multiple, ReturnObject>>(),
		{
			size: 'm'
		}
	);
	const slots = defineSlots<GSelectSlots<T, V>>();
	const slotNames = ['default', 'prepend', 'append', 'message'] as const;
	const visibleSlotNames = useVisibleProps(slots, slotNames);
	const emit = defineEmits<{
		(e: 'update:modelValue', value: ModelValue): void;
		(e: 'focus', event: FocusEvent): void;
		(e: 'blur', event: FocusEvent): void;
		(e: 'clear'): void;
	}>();

	const id = `g-select-${Math.random().toString(36).slice(2, 10)}`;
	const open = ref(false);

	const isMultiple = useBooleanProp(toRef(props, 'multiple'));
	const {
		menuItems,
		isMenuItemSelected,
		handleSelect,
		selectedItems,
		hasSelection,
		selectionText
	} = useSelectController<T, V, Multiple, ReturnObject>(
		{
			items: toRef(props, 'items'),
			modelValue: toRef(props, 'modelValue'),
			multiple: toRef(props, 'multiple'),
			returnObject: toRef(props, 'returnObject'),
			closeOnSelect: toRef(props, 'closeOnSelect'),
			labelKey: toRef(props, 'labelKey'),
			valueKey: toRef(props, 'valueKey'),
			itemChildren: toRef(props, 'itemChildren')
		},
		(e, value) => emit(e, value)
	);

	const focused = ref(false);
	const validatable = reactive({
		modelValue: computed(() => props.modelValue)
	});
	const $v = useValidation(validatable, {
		modelValue: [
			async (value) => {
				const rules = props.rules ?? [];

				for (const rule of rules) {
					const result = await rule(value as ModelValue);
					if (typeof result === 'string') return result;
				}

				return true;
			}
		]
	});
	const computedMessage = computed(
		() => $v.value.$errors.modelValue?.[0] ?? props.message ?? ''
	);

	function onSelect(item: Parameters<typeof handleSelect>[0]) {
		console.log('onSelect item', item);
		handleSelect(item, () => {
			open.value = false;
		});
	}

	function handleFocus(event: FocusEvent) {
		$v.value.$reset();
		focused.value = true;
		emit('focus', event);
	}

	function handleBlur(event: FocusEvent) {
		$v.value.$touchField('modelValue');
		focused.value = false;
		emit('blur', event);
	}

	function handleClear() {
		const nextValue = (isMultiple.value ? [] : null) as ModelValue;
		emit('update:modelValue', nextValue);
		open.value = false;
		emit('clear');
	}

	const fieldProps = computed(() => ({
		id,
		label: props.label,
		state: props.state,
		disabled: props.disabled,
		clearable: props.clearable,
		size: props.size,
		focused: focused.value || open.value,
		message: computedMessage.value,
		prependIcon: props.prependIcon,
		appendIcon: props.appendIcon,
		hasValue: hasSelection.value,
		multiline: false
	}));

	defineExpose({
		$v
	});
</script>

<template>
	<g-dropdown
		v-model="open"
		:open-on-click="!props.disabled"
		:open-on-focus="false"
		:close-on-content-click="false"
		activator-full-width
		same-width>
		<template #activator="{ activatorAttrs, activatorRef }">
			<div
				:ref="activatorRef"
				v-bind="activatorAttrs"
				class="g-select__activator">
				<g-field-base
					v-bind="fieldProps"
					@clear="handleClear">
					<template #control>
						<div
							:id="id"
							class="g-select__control g-field-base__native"
							role="combobox"
							:tabindex="props.disabled ? -1 : 0"
							:aria-expanded="open"
							:aria-disabled="props.disabled"
							@focus="handleFocus"
							@blur="handleBlur">
							<slot
								v-if="slots.selection"
								name="selection"
								:selection="selectionText"
								:selected-items="selectedItems" />
							<span
								v-else
								:class="{
									'g-select__placeholder': !hasSelection
								}">
								{{
									hasSelection
										? selectionText
										: (props.placeholder ?? '')
								}}
							</span>
						</div>
					</template>

					<template
						v-for="slotName in visibleSlotNames"
						:key="slotName"
						#[slotName]>
						<slot :name="slotName" />
					</template>
					<template #append>
						<g-icon icon="chevron-down"></g-icon>
					</template>
				</g-field-base>
			</div>
		</template>

		<g-menu
			:items="menuItems"
			:state="props.state"
			:is-selected="isMenuItemSelected"
			@select="onSelect">
			<template #item="{ item, selected }">
				<slot
					name="item"
					:item="item"
					:selected="selected">
					{{ item.label }}
				</slot>
			</template>
		</g-menu>
	</g-dropdown>
</template>

<style scoped lang="scss">
	.g-select {
		&__activator {
			width: 100%;
		}

		&__control {
			cursor: pointer;

			overflow: hidden;
			display: inline-flex;
			align-items: center;

			width: 100%;
			min-height: 20px;

			text-overflow: ellipsis;
			white-space: nowrap;
		}

		&__placeholder {
			opacity: 0.5;
		}
	}
</style>
