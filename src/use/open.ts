import { computed, ref } from 'vue';
import type { GFloatingProps } from './floating';

export const useOpen = (
	props: GFloatingProps,
	emit: (event: string, value: boolean) => void
) => {
	const isControlled = computed(() => props.modelValue !== undefined);

	const open = ref(props.defaultOpen);

	const actualOpen = computed({
		get() {
			return isControlled.value ? props.modelValue : open.value;
		},
		set(value: boolean) {
			if (!isControlled.value) open.value = value;
			emit('update:modelValue', value);
		}
	});

	return actualOpen;
};
