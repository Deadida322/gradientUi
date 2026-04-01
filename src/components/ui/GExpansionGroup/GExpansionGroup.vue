<script setup lang="ts" generic="T extends string | number">
	import GGroup from '@/components/GGroup/index';
	import type { GroupMode, GroupModel } from '@/use/group/types';

	const props = defineProps<{
		modelValue: GroupModel<T>;
		mode?: GroupMode;
	}>();

	const emit = defineEmits<{
		(e: 'update:modelValue', value: GroupModel<T>): void;
	}>();
</script>

<template>
	<g-group
		v-bind="props"
		@update:model-value="emit('update:modelValue', $event)">
		<slot />
	</g-group>
</template>
