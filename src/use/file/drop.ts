import { computed, ref, toValue, type MaybeRefOrGetter } from 'vue';

export const useFileDrop = (
	interactive: MaybeRefOrGetter<boolean>,
	onFiles: (files: File[]) => void
) => {
	const depth = ref(0);
	const isDragging = computed(() => toValue(interactive) && depth.value > 0);
	const hasFiles = (event: DragEvent) =>
		Array.from(event.dataTransfer?.types ?? []).includes('Files');
	const onDragenter = (event: DragEvent) => {
		if (!hasFiles(event)) return;
		event.preventDefault();
		depth.value++;
	};
	const onDragover = (event: DragEvent) => {
		if (!hasFiles(event)) return;
		event.preventDefault();
		if (event.dataTransfer)
			event.dataTransfer.dropEffect = toValue(interactive)
				? 'copy'
				: 'none';
	};
	const onDragleave = () => {
		depth.value = Math.max(0, depth.value - 1);
	};
	const onDrop = (event: DragEvent) => {
		depth.value = 0;
		if (!hasFiles(event)) return;
		event.preventDefault();
		if (toValue(interactive))
			onFiles(Array.from(event.dataTransfer?.files ?? []));
	};
	return {
		isDragging,
		dropAttrs: { onDragenter, onDragover, onDragleave, onDrop }
	};
};
