import { computed, onBeforeUnmount, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { defineAppScopedState } from '@/ssr/use';

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

interface LayerStackState {
	uid: number;
	stack: LayerEntry[];
	activeOverlayId: Ref<number | null>;
}

const createLayerStackState = (): LayerStackState => ({
	uid: 0,
	stack: [],
	activeOverlayId: ref(null)
});
const useLayerStackState = defineAppScopedState(createLayerStackState);

function resolveZIndex(state: LayerStackState, id: number) {
	const entry = state.stack.find((item) => item.id === id);
	if (!entry) return undefined;

	const kindEntries = state.stack.filter((item) => item.kind === entry.kind);
	const index = kindEntries.findIndex((item) => item.id === id);

	return entry.base + index + 1;
}

function syncActiveOverlay(state: LayerStackState) {
	const openOverlay = [...state.stack]
		.reverse()
		.find((item) => item.kind === 'overlay' && item.open.value);

	state.activeOverlayId.value = openOverlay?.id ?? null;
}

function moveToFront(state: LayerStackState, id: number) {
	const index = state.stack.findIndex((item) => item.id === id);
	if (index === -1) return;

	const [entry] = state.stack.splice(index, 1);
	state.stack.push(entry);
	syncActiveOverlay(state);
}

export function useLayerStack(options: UseLayerStackOptions) {
	const { open, base = 1000, kind = 'floating' } = options;
	const state = useLayerStackState();
	const id = ++state.uid;
	const zIndex = ref<number | undefined>();

	function activate() {
		const existing = state.stack.findIndex((item) => item.id === id);

		if (existing === -1) {
			state.stack.push({ id, kind, base, open });
		} else {
			moveToFront(state, id);
		}

		zIndex.value = resolveZIndex(state, id);
		syncActiveOverlay(state);
	}

	function deactivate() {
		const index = state.stack.findIndex((item) => item.id === id);

		if (index !== -1) {
			state.stack.splice(index, 1);
		}

		zIndex.value = undefined;
		syncActiveOverlay(state);
	}

	function bringToFront() {
		if (!open.value) return;
		moveToFront(state, id);
		zIndex.value = resolveZIndex(state, id);
	}

	const isTop = computed(() => {
		const sameKind = state.stack.filter((item) => item.kind === kind);
		return sameKind.at(-1)?.id === id;
	});
	const isTopOverlay = computed(
		() => kind === 'overlay' && state.activeOverlayId.value === id
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
		isTopOverlay,
		bringToFront
	};
}
