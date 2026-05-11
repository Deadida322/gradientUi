<script
	lang="ts"
	setup
	generic="
		T,
		V,
		Multiple extends boolean = false,
		ReturnObject extends boolean = false
	">
	import { ref, toRef } from 'vue';
	import GDropdown from '@/components/ui/GDropdown/GDropdown.vue';
	import GMenu from '@/components/ui/GMenu/GMenu.vue';
	import { useSelectMenuSlot } from '@/use/select/menuSlot';
	import { useSelectController } from '@/use/select/controller';
	import type { SelectionValue } from '@/use/select/types';
	import type { DropdownSelectProps, DropdownSelectSlots } from './types';

	type ModelValue = SelectionValue<T, V, Multiple, ReturnObject>;

	const props =
		defineProps<DropdownSelectProps<T, V, Multiple, ReturnObject>>();
	defineSlots<DropdownSelectSlots<T, V>>();
	const emit = defineEmits<{
		(e: 'update:modelValue', value: ModelValue): void;
	}>();

	const open = ref(false);
	const { menuItems, resolveMenuItem, handleSelect } = useSelectController<
		T,
		V,
		Multiple,
		ReturnObject
	>(
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
		emit
	);
	const { getSlotItem } = useSelectMenuSlot<T, V>(resolveMenuItem);

	function onSelect(item: Parameters<typeof handleSelect>[0]) {
		handleSelect(item, () => {
			open.value = false;
		});
	}
</script>

<template>
	<g-dropdown v-model="open">
		<template #activator="{ activatorAttrs, activatorRef }">
			<div
				:ref="activatorRef"
				v-bind="activatorAttrs"
				class="g-dropdown-trigger">
				<slot name="trigger"> </slot>
			</div>
		</template>

		<g-menu
			:items="menuItems"
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
