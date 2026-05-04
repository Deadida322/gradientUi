import { computed, onBeforeUnmount, watch } from 'vue';
import { ref } from 'vue';
import type { ComputedRef, Ref } from 'vue';

export type LayerKind = 'floating' | 'overlay';

interface LayerEntry {
	id: number;
	kind: LayerKind;
	base: number;
	open: Ref<boolean>;
}

interface UseLayerStackOptions {
	open: Ref<boolean>;
	base?: number;
	kind?: LayerKind;
}

let uid = 0;
const stack: LayerEntry[] = [];
const activeOverlayId = ref<number | null>(null);

function resolveZIndex(id: number) {
	const entry = stack.find((item) => item.id === id);
	if (!entry) return undefined;

	const kindEntries = stack.filter((item) => item.kind === entry.kind);
	const index = kindEntries.findIndex((item) => item.id === id);

	return entry.base + index + 1;
}

function syncActiveOverlay() {
	const openOverlay = [...stack]
		.reverse()
		.find((item) => item.kind === 'overlay' && item.open.value);

	activeOverlayId.value = openOverlay?.id ?? null;
}

function moveToFront(id: number) {
	const index = stack.findIndex((item) => item.id === id);
	if (index === -1) return;

	const [entry] = stack.splice(index, 1);
	stack.push(entry);
	syncActiveOverlay();
}

export function useLayerStack(options: UseLayerStackOptions) {
	const { open, base = 1000, kind = 'floating' } = options;
	const id = ++uid;
	const zIndex = ref<number | undefined>();

	function activate() {
		const existing = stack.findIndex((item) => item.id === id);

		if (existing === -1) {
			stack.push({ id, kind, base, open });
		} else {
			moveToFront(id);
		}

		zIndex.value = resolveZIndex(id);
		syncActiveOverlay();
	}

	function deactivate() {
		const index = stack.findIndex((item) => item.id === id);

		if (index !== -1) {
			stack.splice(index, 1);
		}

		zIndex.value = undefined;
		syncActiveOverlay();
	}

	function bringToFront() {
		if (!open.value) return;
		moveToFront(id);
		zIndex.value = resolveZIndex(id);
	}

	const isTop = computed(() => {
		const sameKind = stack.filter((item) => item.kind === kind);
		return sameKind.at(-1)?.id === id;
	});
	const isTopOverlay = computed(
		() => kind === 'overlay' && activeOverlayId.value === id
	);

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
		id,
		zIndex,
		isTop,
		isTopOverlay: isTopOverlay as ComputedRef<boolean>,
		bringToFront
	};
}
