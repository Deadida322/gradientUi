import {
	nextTick,
	ref,
	toValue,
	watch,
	type MaybeRefOrGetter,
	type Ref
} from 'vue';
import { onClientMounted } from '@/ssr/use';
import type { GNavigationRegistration } from './types';

export const useNavigationIndicator = <T>(
	container: Ref<HTMLElement | null>,
	model: MaybeRefOrGetter<T | undefined>,
	registrations?: MaybeRefOrGetter<readonly GNavigationRegistration<T>[]>
) => {
	const registry = new Map<T, Set<HTMLElement>>();
	let sourceItems = new Map<HTMLElement, T | undefined>();
	const indicator = ref({
		left: 0,
		top: 0,
		width: 0,
		height: 0,
		visible: false
	});
	let refresh: (() => void) | undefined;
	let observer: ResizeObserver | undefined;
	let mutations: MutationObserver | undefined;
	const refreshIndicator = () => {
		void nextTick(() => refresh?.());
	};
	const register = (value: T | undefined, el: HTMLElement) => {
		if (value === undefined) return;
		const bucket = registry.get(value) ?? new Set<HTMLElement>();
		bucket.add(el);
		registry.set(value, bucket);
		observer?.observe(el);
		refreshIndicator();
	};
	const unregister = (value: T | undefined, el: HTMLElement) => {
		if (value === undefined) return;
		const bucket = registry.get(value);
		bucket?.delete(el);
		if (!bucket?.size) registry.delete(value);
		observer?.unobserve(el);
		refreshIndicator();
	};
	const unregisterElement = (el: HTMLElement) => {
		for (const value of registry.keys()) unregister(value, el);
	};
	const syncRegistrations = () => {
		if (registrations === undefined) return;
		const root = container.value;
		const next = new Map<HTMLElement, T | undefined>(
			toValue(registrations)
				.filter(({ el }) => root?.contains(el))
				.map(({ el, value }) => [el, value] as const)
		);
		for (const [el, value] of sourceItems) {
			if (!next.has(el) || !Object.is(next.get(el), value)) {
				unregister(value, el);
			}
		}
		for (const [el, value] of next) {
			if (
				!sourceItems.has(el) ||
				!Object.is(sourceItems.get(el), value)
			) {
				register(value, el);
			}
		}
		sourceItems = next;
	};
	const isElementSelected = (el: HTMLElement | null | undefined) => {
		const value = toValue(model);
		return value !== undefined && !!el && !!registry.get(value)?.has(el);
	};
	watch(() => toValue(model), refreshIndicator);
	if (registrations !== undefined) {
		watch(
			() => [container.value, toValue(registrations)] as const,
			syncRegistrations,
			{ immediate: true, flush: 'post' }
		);
	}
	watch(container, (next, previous) => {
		if (previous) observer?.unobserve(previous);
		if (next) observer?.observe(next);
		mutations?.disconnect();
		if (next)
			mutations?.observe(next, {
				childList: true,
				subtree: true,
				characterData: true
			});
		refreshIndicator();
	});
	onClientMounted(({ window, document }) => {
		let frame = 0;
		let disposed = false;
		const measure = () => {
			frame = 0;
			const value = toValue(model);
			const root = container.value;
			const item =
				value === undefined
					? undefined
					: registry.get(value)?.values().next().value;
			if (!root || !item || !item.getClientRects().length) {
				indicator.value = {
					left: 0,
					top: 0,
					width: 0,
					height: 0,
					visible: false
				};
				return;
			}
			const rect = item.getBoundingClientRect();
			const rootRect = root.getBoundingClientRect();
			indicator.value = {
				left:
					rect.left -
					rootRect.left +
					root.scrollLeft -
					root.clientLeft,
				top: rect.top - rootRect.top + root.scrollTop - root.clientTop,
				width: rect.width,
				height: rect.height,
				visible: true
			};
		};
		refresh = () => {
			if (disposed || frame) return;
			frame = window.requestAnimationFrame(measure);
		};
		syncRegistrations();
		if (typeof ResizeObserver !== 'undefined') {
			observer = new ResizeObserver(refresh);
			if (container.value) observer.observe(container.value);
			for (const bucket of registry.values())
				for (const el of bucket) observer.observe(el);
		}
		if (typeof MutationObserver !== 'undefined') {
			mutations = new MutationObserver(() => {
				syncRegistrations();
				refresh?.();
			});
			if (container.value)
				mutations.observe(container.value, {
					childList: true,
					subtree: true,
					characterData: true
				});
		}
		window.addEventListener('resize', refresh);
		void document.fonts?.ready.then(() => refresh?.());
		refresh();
		return () => {
			disposed = true;
			if (frame) window.cancelAnimationFrame(frame);
			observer?.disconnect();
			mutations?.disconnect();
			if (refresh) window.removeEventListener('resize', refresh);
			refresh = undefined;
		};
	});
	return {
		indicator,
		register,
		unregister,
		unregisterElement,
		isElementSelected,
		refreshIndicator
	};
};
