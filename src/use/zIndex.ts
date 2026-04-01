import { ref, watch, onBeforeUnmount, type Ref } from 'vue';

interface UseZIndexOptions {
	open: Ref<boolean>;
	base?: number;
}

interface StackItem {
	id: number;
	base: number;
}

let uid = 0;
const stack: StackItem[] = [];

export function useZIndex(options: UseZIndexOptions) {
	const { open, base = 1000 } = options;

	const id = ++uid;
	const zIndex = ref<number | undefined>();

	const compute = () => {
		const index = stack.findIndex((i) => i.id === id);
		if (index === -1) return undefined;
		return stack[index].base + index + 1;
	};

	const activate = () => {
		const existing = stack.findIndex((i) => i.id === id);
		if (existing !== -1) stack.splice(existing, 1);

		stack.push({ id, base });
		zIndex.value = compute();
	};

	const deactivate = () => {
		const index = stack.findIndex((i) => i.id === id);
		if (index !== -1) stack.splice(index, 1);

		zIndex.value = undefined;
	};

	const bringToFront = () => {
		if (!open.value) return;
		activate();
	};

	watch(
		open,
		(isOpen) => {
			if (isOpen) activate();
			else deactivate();
		},
		{ immediate: true }
	);

	onBeforeUnmount(() => {
		deactivate();
	});

	return {
		zIndex,
		bringToFront
	};
}
