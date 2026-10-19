import {
	computed,
	inject,
	toValue,
	type App,
	type InjectionKey,
	type ComputedRef,
	type MaybeRefOrGetter
} from 'vue';
import { useHydrated } from './hydration';

export interface SsrTeleportOptions {
	/** Replace the default body target with a host supported by the SSR renderer. */
	target: string;
}

const teleportOptionsKey: InjectionKey<SsrTeleportOptions> =
	Symbol('gradient-teleport');

export const installSsrTeleport = (
	app: App,
	options: SsrTeleportOptions
): void => {
	app.provide(teleportOptionsKey, options);
};

export interface SsrTeleportState {
	disabled: ComputedRef<boolean>;
	target: ComputedRef<string>;
}

export const useSsrTeleport = (
	target: MaybeRefOrGetter<string | null | undefined> = 'body',
	disabled: MaybeRefOrGetter<boolean> = false
): SsrTeleportState => {
	const hydrated = useHydrated();
	const options = inject(teleportOptionsKey, null);
	const resolvedTarget = computed(() => {
		const requested = toValue(target) || 'body';
		return requested === 'body' && options ? options.target : requested;
	});

	return {
		disabled: computed(
			() =>
				toValue(disabled) ||
				(!hydrated.value && resolvedTarget.value !== options?.target)
		),
		target: resolvedTarget
	};
};
