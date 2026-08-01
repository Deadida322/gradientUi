import type { CreatedGradientMaterial } from '@/theme';
import {
	computed,
	onBeforeUnmount,
	toValue,
	watch,
	type MaybeRefOrGetter
} from 'vue';
import {
	mountGradientMaterial,
	type GradientRuntimeHandle
} from './gradientRuntimeRegistry';

export interface UseGradientRuntimeOptions {
	material?: MaybeRefOrGetter<CreatedGradientMaterial | null | undefined>;
	enabled?: MaybeRefOrGetter<boolean | undefined>;
	morph?: MaybeRefOrGetter<boolean | undefined>;
}

export const useGradientRuntime = (options: UseGradientRuntimeOptions = {}) => {
	let handle: GradientRuntimeHandle | null = null;
	const enabled = computed(() => Boolean(toValue(options.enabled)));
	const material = computed(() => toValue(options.material) ?? null);
	const morphEnabled = computed(
		() =>
			Boolean(toValue(options.morph)) &&
			Boolean(material.value?.morphBlobs?.length)
	);
	const morphBlobs = computed(() =>
		morphEnabled.value ? (material.value?.morphBlobs ?? []) : []
	);

	const dispose = () => {
		handle?.dispose();
		handle = null;
	};

	watch(
		() => [enabled.value, material.value?.id] as const,
		() => {
			dispose();

			if (enabled.value && material.value) {
				handle = mountGradientMaterial(material.value);
			}
		},
		{
			immediate: true
		}
	);

	onBeforeUnmount(dispose);

	return {
		morphBlobs,
		morphEnabled
	};
};
