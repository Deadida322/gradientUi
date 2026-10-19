import { computed, ref, type ComputedRef } from 'vue';
import { onClientMounted, useSsrViewport } from '@/ssr/use';

export const defaultBreakpoints = {
	sm: 600,
	md: 900,
	lg: 1200,
	xl: 1536
} as const;

export type BreakpointName = keyof typeof defaultBreakpoints;
export type BreakpointMap = Record<string, number>;
export type BreakpointTarget<T extends BreakpointMap> = keyof T | number;

export interface UseBreakpointsOptions {
	initialHeight?: number;
	initialWidth?: number;
}

const resolveBreakpoint = <T extends BreakpointMap>(
	breakpoints: T,
	target: BreakpointTarget<T>
) => {
	return typeof target === 'number' ? target : (breakpoints[target] ?? 0);
};

export const useBreakpoints = <
	T extends BreakpointMap = typeof defaultBreakpoints
>(
	breakpoints = defaultBreakpoints as unknown as T,
	options: UseBreakpointsOptions = {}
) => {
	const viewport = useSsrViewport();
	const width = ref(options.initialWidth ?? viewport?.width ?? 0);
	const height = ref(options.initialHeight ?? viewport?.height ?? 0);

	const updateSize = (clientWindow: Window): void => {
		width.value = clientWindow.innerWidth;
		height.value = clientWindow.innerHeight;
	};

	onClientMounted(({ window: clientWindow }) => {
		const onResize = () => updateSize(clientWindow);
		onResize();
		clientWindow.addEventListener('resize', onResize, { passive: true });

		return () => clientWindow.removeEventListener('resize', onResize);
	});

	const up = (target: BreakpointTarget<T>) => {
		return computed(
			() => width.value >= resolveBreakpoint(breakpoints, target)
		);
	};

	const down = (target: BreakpointTarget<T>) => {
		return computed(
			() => width.value <= resolveBreakpoint(breakpoints, target)
		);
	};

	const between = (
		min: BreakpointTarget<T>,
		max: BreakpointTarget<T>
	): ComputedRef<boolean> => {
		return computed(() => {
			const minWidth = resolveBreakpoint(breakpoints, min);
			const maxWidth = resolveBreakpoint(breakpoints, max);

			return width.value >= minWidth && width.value <= maxWidth;
		});
	};

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
};
