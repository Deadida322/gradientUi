<script
	lang="ts"
	setup
	generic="
		T,
		V,
		Multiple extends boolean = false,
		ReturnObject extends boolean = false
	">
	import { computed, ref, toRefs } from 'vue';
	import GChip from '@/components/ui/GChip/GChip.vue';
	import GDropdown from '@/components/ui/GDropdown/GDropdown.vue';
	import GFieldBase from '@/components/ui/GFieldBase/GFieldBase.vue';
	import GIcon from '@/components/ui/GIcon/GIcon.vue';
	import { useFieldKeyboard } from '@/use/form/fieldKeyboard';
	import GMenu from '@/components/ui/GMenu/GMenu.vue';
	import { useTextFieldComponent } from '@/use/form/textFieldComponent';
	import { useComboboxController } from '@/use/select/comboboxController';
	import { useSelectCommit } from '@/use/select/commit';
	import { useSelectFieldControl } from '@/use/select/fieldControl';
	import { useSelectListboxKeyboard } from '@/use/select/listboxKeyboard';
	import { useSearchFieldControl } from '@/use/select/searchFieldControl';
	import { useTokenInputKeyboard } from '@/use/select/tokenInputKeyboard';
	import type { InternalItem, SelectionValue } from '@/use/select/types';
	import type { GComboboxProps, GComboboxSlots } from './types';

	type ModelValue = SelectionValue<T, V, Multiple, ReturnObject>;

	defineOptions({
		inheritAttrs: false
	});

	const props = withDefaults(
		defineProps<GComboboxProps<T, V, Multiple, ReturnObject>>(),
		{
			addOnBlur: false,
			allowCustom: true,
			chips: true,
			noDataText: 'No matching options',
			size: 'm'
		}
	);
	const propsRefs = toRefs(props);
	const slots = defineSlots<GComboboxSlots<T, V>>();
	const emit = defineEmits<{
		(e: 'update:modelValue', value: ModelValue): void;
		(e: 'update:search', value: string): void;
		(e: 'focus', event: FocusEvent): void;
		(e: 'blur', event: FocusEvent): void;
		(e: 'clear'): void;
		(e: 'add', item: T, query: string): void;
		(e: 'select', item: InternalItem<T, V>): void;
	}>();

	const {
		attrs,
		id,
		visibleSlotNames: fieldSlotNames
	} = useTextFieldComponent(slots);
	const visibleSlotNames = computed(() =>
		fieldSlotNames.value.filter((slotName) => slotName !== 'append')
	);
	const listboxId = `${id}-listbox`;
	const open = ref(false);
	const inputRef = ref<HTMLInputElement>();
	const {
		isMultiple,
		shouldCloseOnSelect,
		searchValue,
		setSearch,
		filteredMenuItems,
		getSlotItem,
		resolveMenuItem,
		isMenuItemSelected,
		isCustomItem,
		isCustomMenuItem,
		customSelectionItem,
		firstVisibleItem,
		selectItem,
		selectedItems,
		hasSelection,
		selectionText
	} = useComboboxController<T, V, Multiple, ReturnObject>(
		{
			...propsRefs,
			onSearch: (value) => emit('update:search', value)
		},
		(e, value) => emit(e, value)
	);

	const { $v, disabled, onFocus, onBlur, onInputValidation, fieldProps } =
		useSelectFieldControl<ModelValue>({
			...propsRefs,
			id,
			focused: open,
			hasValue: () => hasSelection.value || Boolean(searchValue.value),
			multiline: false
		});

	const { commitItem, onSelect, selectFirstVisibleItem, removeItem } =
		useSelectCommit<T, V>({
			open,
			isMultiple,
			shouldCloseOnSelect,
			searchValue,
			resolveMenuItem,
			firstVisibleItem,
			selectItem,
			setSearch,
			onInputValidation,
			isCustomItem,
			onAdd: (item, query) => emit('add', item, query),
			onSelect: (item) => emit('select', item)
		});

	const listboxKeyboard = useSelectListboxKeyboard({
		open,
		selectFirstVisibleItem
	});
	const tokenKeyboard = useTokenInputKeyboard<InternalItem<T, V>>({
		enabled: isMultiple,
		searchValue,
		items: selectedItems,
		removeItem
	});
	const { handleKeydown } = useFieldKeyboard({
		disabled,
		handlers: computed(() => [
			...listboxKeyboard.handlers,
			...tokenKeyboard.handlers
		])
	});

	function clearValue() {
		const nextValue = (isMultiple.value ? [] : null) as ModelValue;
		emit('update:modelValue', nextValue);
	}

	const {
		handleInput,
		handleFocus,
		handleBlur,
		handleClear,
		focusControl,
		handleActivatorMousedown
	} = useSearchFieldControl({
		open,
		inputRef,
		disabled,
		setSearch,
		onFocus,
		onBlur,
		onInputValidation,
		emitFocus: (event) => emit('focus', event),
		emitBlur: (event) => emit('blur', event),
		emitClear: () => emit('clear'),
		clearValue,
		afterBlur: () => {
			window.setTimeout(() => {
				if (
					props.addOnBlur &&
					!open.value &&
					customSelectionItem.value
				) {
					commitItem(customSelectionItem.value);
				}
			});
		}
	});

	defineExpose({
		$v,
		focus: focusControl,
		blur: () => inputRef.value?.blur()
	});
</script>

<template>
	<g-dropdown
		v-model="open"
		:open-on-click="false"
		:open-on-focus="false"
		:close-on-content-click="false"
		:offset="0"
		activator-full-width
		same-width>
		<template #activator="{ activatorAttrs, activatorRef }">
			<div
				:ref="activatorRef"
				v-bind="activatorAttrs"
				class="g-combobox__activator"
				@mousedown="handleActivatorMousedown">
				<g-field-base
					v-bind="fieldProps"
					@clear="handleClear">
					<template #control>
						<div
							class="g-combobox__control"
							:class="{
								'g-combobox__control_multiple': isMultiple
							}">
							<slot
								v-if="slots.selection"
								name="selection"
								:selection="selectionText"
								:selected-items="selectedItems"
								:remove="removeItem" />
							<template v-else-if="isMultiple && hasSelection">
								<template
									v-for="(item, index) in selectedItems"
									:key="`${item.label}-${index}`">
									<slot
										name="chip"
										:item="item"
										:index="index"
										:remove="removeItem">
										<g-chip
											v-if="props.chips"
											:label="item.label"
											size="s"
											variant="tonal"
											:color="props.color"
											:state="props.state"
											removable
											@remove="removeItem(item)" />
										<span
											v-else
											class="g-combobox__plain-selection">
											{{ item.label }}
										</span>
									</slot>
								</template>
							</template>

							<input
								v-bind="attrs"
								:id="id"
								ref="inputRef"
								class="g-combobox__input g-field-base__native"
								:class="{
									'g-combobox__input_compact':
										isMultiple &&
										hasSelection &&
										!searchValue
								}"
								role="combobox"
								:value="searchValue"
								:placeholder="
									hasSelection && isMultiple
										? ''
										: (props.placeholder ?? '')
								"
								:disabled="fieldProps.disabled"
								:aria-controls="listboxId"
								:aria-expanded="open"
								:aria-autocomplete="'list'"
								:aria-disabled="fieldProps.disabled"
								:aria-invalid="
									fieldProps.state === 'error' || undefined
								"
								@input="handleInput"
								@focus="handleFocus"
								@blur="handleBlur"
								@keydown="handleKeydown" />
						</div>
					</template>

					<template
						v-for="slotName in visibleSlotNames"
						:key="slotName"
						#[slotName]>
						<slot :name="slotName" />
					</template>
					<template #append>
						<slot name="append">
							<g-icon
								:icon="props.appendIcon ?? 'chevron-down'" />
						</slot>
					</template>
				</g-field-base>
			</div>
		</template>

		<g-menu
			v-if="filteredMenuItems.length"
			:id="listboxId"
			:items="filteredMenuItems"
			:state="props.state"
			:is-selected="isMenuItemSelected"
			@select="onSelect">
			<template #item="{ item, selected }">
				<slot
					name="item"
					:item="getSlotItem(item)"
					:selected="selected"
					:query="searchValue"
					:custom="isCustomMenuItem(item)">
					<span
						v-if="isCustomMenuItem(item)"
						class="g-combobox__add-option">
						{{ searchValue.trim() }}
					</span>
					<span v-else>{{ item.label }}</span>
				</slot>
			</template>
		</g-menu>
		<div
			v-else
			:id="listboxId"
			class="g-combobox__empty"
			role="listbox">
			<slot
				name="noData"
				:query="searchValue">
				{{ props.noDataText }}
			</slot>
		</div>
	</g-dropdown>
</template>

<style scoped lang="scss">
	.g-combobox {
		&__activator {
			width: 100%;
		}

		&__control {
			cursor: text;

			display: flex;
			flex: 1;
			flex-wrap: wrap;
			gap: var(--g-token-space-1);
			align-items: center;

			width: 100%;
			min-width: 0;
			min-height: var(--g-token-select-control-min-height);
		}

		&__input.g-field-base__native {
			width: auto;
			min-width: min(12ch, 100%);

			&.g-combobox__input_compact {
				flex-basis: 1px;
				min-width: 1px;
			}
		}

		&__plain-selection {
			display: inline-flex;
			align-items: center;

			max-width: 100%;
			padding-inline: var(--g-token-space-2);
			border-radius: var(--g-token-radius-pill);

			background: color-mix(in srgb, var(--g-color) 10%, transparent);
		}

		&__add-option {
			font-weight: var(--g-token-font-weight-medium);
			color: var(--g-color);
		}

		&__empty {
			min-width: 100%;
			padding: var(--g-token-space-3) var(--g-token-space-4);
			font-size: var(--g-token-font-size-sm);
			color: color-mix(
				in srgb,
				var(--g-token-color-on-surface) 64%,
				transparent
			);
		}
	}
</style>
