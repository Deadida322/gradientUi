import {
	computed,
	onBeforeUnmount,
	onMounted,
	ref,
	type ComputedRef
} from 'vue';

export const defaultBreakpoints = {
	sm: 600,
	md: 900,
	lg: 1200,
	xl: 1536
} as const;

export type BreakpointName = keyof typeof defaultBreakpoints;
export type BreakpointMap = Record<string, number>;
export type BreakpointTarget<T extends BreakpointMap> = keyof T | number;

function resolveBreakpoint<T extends BreakpointMap>(
	breakpoints: T,
	target: BreakpointTarget<T>
) {
	return typeof target === 'number' ? target : (breakpoints[target] ?? 0);
}

export function useBreakpoints<
	T extends BreakpointMap = typeof defaultBreakpoints
>(breakpoints = defaultBreakpoints as unknown as T) {
	const width = ref(0);
	const height = ref(0);

	function updateSize() {
		width.value = window.innerWidth;
		height.value = window.innerHeight;
	}

	onMounted(() => {
		updateSize();
		window.addEventListener('resize', updateSize, { passive: true });
	});

	onBeforeUnmount(() => {
		window.removeEventListener('resize', updateSize);
	});

	function up(target: BreakpointTarget<T>) {
		return computed(
			() => width.value >= resolveBreakpoint(breakpoints, target)
		);
	}

	function down(target: BreakpointTarget<T>) {
		return computed(
			() => width.value <= resolveBreakpoint(breakpoints, target)
		);
	}

	function between(
		min: BreakpointTarget<T>,
		max: BreakpointTarget<T>
	): ComputedRef<boolean> {
		return computed(() => {
			const minWidth = resolveBreakpoint(breakpoints, min);
			const maxWidth = resolveBreakpoint(breakpoints, max);

			return width.value >= minWidth && width.value <= maxWidth;
		});
	}

	const name = computed(() => {
		const entries = Object.entries(breakpoints).sort((a, b) => a[1] - b[1]);
		let current = entries[0]?.[0] ?? '';

		for (const [key, value] of entries) {
			if (width.value >= value) {
				current = key;
			}
		}

		return current as keyof T;
	});

	return {
		breakpoints,
		width,
		height,
		name,
		up,
		down,
		between,
		smAndUp: up('sm'),
		smAndDown: down('sm'),
		mdAndUp: up('md'),
		mdAndDown: down('md'),
		lgAndUp: up('lg'),
		lgAndDown: down('lg'),
		xlAndUp: up('xl'),
		xlAndDown: down('xl')
	};
}
