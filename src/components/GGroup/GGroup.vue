<script setup lang="ts" generic="T">
	import { toRef, computed } from 'vue';
	import type { GroupMode, GroupModel } from '@/use/group/types';
	import { useGroupController } from '@/use/group/groupController';
	import { provideGroup } from '@/use/group/di';

	const props = defineProps<{
		modelValue: GroupModel<T>;
		mode?: GroupMode;
		activeClass?: string;
	}>();

	const emit = defineEmits<{
		(e: 'update:modelValue', value: GroupModel<T>): void;
	}>();

	const modeRef = computed<GroupMode>(() => props.mode ?? 'multiple');
	const modelRef = toRef(props, 'modelValue');

	const controller = useGroupController<T>({
		modelValue: modelRef,
		mode: modeRef,
		onChange: (val) => emit('update:modelValue', val),
		activeClass: computed(() => props.activeClass)
	});

	provideGroup<T>(controller);
</script>

<template>
	<slot />
</template>
