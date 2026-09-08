<script
	lang="ts"
	setup
	generic="
		T,
		V,
		Multiple extends boolean = false,
		ReturnObject extends boolean = false
	">
	import { ref, toRefs } from 'vue';
	import GFieldBase from '../GFieldBase/GFieldBase.vue';
	import GDropdown from '../GDropdown/GDropdown.vue';
	import GMenu from '../GMenu/GMenu.vue';
	import GIcon from '../GIcon/GIcon.vue';
	import { useTextFieldComponent } from '@/use/form/textFieldComponent';
	import { useSelectController } from '@/use/select/controller';
	import { useSelectFieldControl } from '@/use/select/fieldControl';
	import type { SelectionValue } from '@/use/select/types';
	import type { GSelectProps, GSelectSlots } from './types';

	type ModelValue = SelectionValue<T, V, Multiple, ReturnObject>;

	const props = withDefaults(
		defineProps<GSelectProps<T, V, Multiple, ReturnObject>>(),
		{
			size: 'm'
		}
	);
	const propsRefs = toRefs(props);
	const slots = defineSlots<GSelectSlots<T, V>>();
	const { id, visibleSlotNames } = useTextFieldComponent(slots);
	const emit = defineEmits<{
		(e: 'update:modelValue', value: ModelValue): void;
		(e: 'focus', event: FocusEvent): void;
		(e: 'blur', event: FocusEvent): void;
		(e: 'clear'): void;
	}>();

	const open = ref(false);

	const {
		isMultiple,
		menuItems,
		getSlotItem,
		isMenuItemSelected,
		handleSelect,
		selectedItems,
		hasSelection,
		selectionText
	} = useSelectController<T, V, Multiple, ReturnObject>(
		propsRefs,
		(e, value) => emit(e, value)
	);

	const { $v, onFocus, onBlur, onInputValidation, fieldProps } =
		useSelectFieldControl<ModelValue>({
			...propsRefs,
			id,
			focused: open,
			hasValue: hasSelection,
			multiline: false
		});

	function onSelect(item: Parameters<typeof handleSelect>[0]) {
		handleSelect(item, () => {
			open.value = false;
		});
		onInputValidation();
	}

	function handleFocus(event: FocusEvent) {
		onFocus();
		emit('focus', event);
	}

	function handleBlur(event: FocusEvent) {
		onBlur();
		emit('blur', event);
	}

	function handleClear() {
		const nextValue = (isMultiple.value ? [] : null) as ModelValue;
		emit('update:modelValue', nextValue);
		onInputValidation();
		emit('clear');
	}

	defineExpose({
		$v
	});
</script>

<template>
	<g-dropdown
		v-model="open"
		:open-on-click="!fieldProps.disabled"
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
							:tabindex="fieldProps.disabled ? -1 : 0"
							:aria-expanded="open"
							:aria-disabled="fieldProps.disabled"
							:aria-invalid="
								fieldProps.state === 'error' || undefined
							"
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
					:item="getSlotItem(item)"
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
			min-height: var(--g-token-select-control-min-height);

			text-overflow: ellipsis;
			white-space: nowrap;
		}

		&__placeholder {
			opacity: var(--g-token-select-placeholder-opacity);
		}
	}
</style>
