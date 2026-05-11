import { computed, ref } from 'vue';
import type { Ref } from 'vue';

export interface ControllableOpenProps {
	modelValue?: boolean;
	defaultOpen?: boolean;
}

export type ControllableOpenEmit = (
	event: 'update:modelValue',
	value: boolean
) => void;

export function useControllableOpen(
	props: ControllableOpenProps,
	emit: ControllableOpenEmit
) {
	const isControlled = computed(() => props.modelValue !== undefined);
	const localOpen = ref(props.defaultOpen ?? false);

	const open = computed<boolean>({
		get() {
			return isControlled.value
				? (props.modelValue ?? false)
				: localOpen.value;
		},
		set(value) {
			if (!isControlled.value) {
				localOpen.value = value;
			}

			emit('update:modelValue', value);
		}
	});

	return {
		open,
		isControlled: isControlled as Ref<boolean>
	};
}
