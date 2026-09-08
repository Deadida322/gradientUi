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
	import GDropdown from '@/components/ui/GDropdown/GDropdown.vue';
	import GMenu from '@/components/ui/GMenu/GMenu.vue';
	import { useSelectController } from '@/use/select/controller';
	import type { SelectionValue } from '@/use/select/types';
	import type { DropdownSelectProps, DropdownSelectSlots } from './types';

	type ModelValue = SelectionValue<T, V, Multiple, ReturnObject>;

	const props =
		defineProps<DropdownSelectProps<T, V, Multiple, ReturnObject>>();
	const propsRefs = toRefs(props);
	defineSlots<DropdownSelectSlots<T, V>>();
	const emit = defineEmits<{
		(e: 'update:modelValue', value: ModelValue): void;
	}>();

	const open = ref(false);
	const { menuItems, getSlotItem, handleSelect } = useSelectController<
		T,
		V,
		Multiple,
		ReturnObject
	>(propsRefs, emit);

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
