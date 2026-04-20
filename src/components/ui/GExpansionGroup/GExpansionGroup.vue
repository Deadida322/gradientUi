<script setup lang="ts" generic="T">
	import { computed, toRef, type Ref } from 'vue';
	import {
		provideExpansionGroup,
		useExpansionGroupController,
		type ExpansionGroupModel
	} from '@/use/expansion';
	import {
		makeExpansionGroupProps,
		type GExpansionGroupEmits,
		type GExpansionGroupSlots
	} from './types';
	import usePx from '@/use/px';

	const props = defineProps(makeExpansionGroupProps());

	defineSlots<GExpansionGroupSlots>();
	const emit = defineEmits<GExpansionGroupEmits<T>>();
	const groupGap = usePx(computed(() => props.gap ?? ''));

	const controller = useExpansionGroupController<T>({
		modelValue: toRef(props, 'modelValue') as Ref<ExpansionGroupModel<T>>,
		multiple: computed(() => props.multiple),
		mandatory: computed(() => props.mandatory),
		disabled: computed(() => props.disabled),
		readonly: computed(() => props.readonly),
		onChange: (value) => emit('update:modelValue', value)
	});

	provideExpansionGroup(controller);
</script>

<template>
	<div
		class="g-expansion-group"
		:style="{
			'--g-expansion-group-gap': groupGap
		}"
		:class="{
			'g-expansion-group_divided': props.divided,
			'g-expansion-group_disabled': props.disabled
		}">
		<slot />
	</div>
</template>

<style scoped lang="scss">
	.g-expansion-group {
		display: flex;
		flex-direction: column;
		gap: var(--g-expansion-group-gap, var(--g-token-expansion-group-gap));

		&_divided :deep(.g-expansion + .g-expansion) {
			border-top: 1px solid var(--g-token-expansion-divider-color);
		}

		&_disabled {
			opacity: var(--g-token-opacity-disabled);
		}
	}
</style>
