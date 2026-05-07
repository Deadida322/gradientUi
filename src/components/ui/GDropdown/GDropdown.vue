<script setup lang="ts">
	import { computed, ref, watch } from 'vue';
	import type { MaybeElement, ReferenceElement } from '@floating-ui/vue';
	import { BaseFloating } from '../BaseFloating';
	import { useTriggerFactory } from '@/use/floatingTrigger';
	import { useDropdownContext } from '@/use/dropdownContext';
	import { makeDropdownProps } from '../GDropdown/types';

	const props = defineProps(makeDropdownProps());
	const slots = defineSlots<{
		activator?: (props: {
			activatorAttrs: Record<string, unknown>;
			activatorRef: (el: MaybeElement<ReferenceElement> | null) => void;
		}) => unknown;
	}>();
	const emit = defineEmits(['update:modelValue']);

	const open = ref(props.modelValue ?? false);
	watch(open, (v) => emit('update:modelValue', v));
	watch(
		() => props.modelValue,
		(v) => (open.value = v)
	);

	const { triggerAttrs: activatorAttrs, floatingAttrs } = useTriggerFactory(
		open,
		{
			click: props.openOnClick,
			hover: props.openOnHover,
			focus: props.openOnFocus
		}
	);

	const hasActivatorSlot = computed(() => Boolean(slots.activator));
	const hasExternalReference = computed(() => props.reference != null);

	const context = useDropdownContext(open);

	if (context) {
		context.registerChild(open);
	}

	defineExpose({
		open,
		show: () => (open.value = true),
		hide: () => (open.value = false)
	});
</script>

<template>
	<base-floating
		v-bind="props"
		v-model:model-value="open"
		:reference-full-width="
			props.activatorFullWidth || props.triggerFullWidth
		">
		<template #reference="{ ref: baseRef }">
			<slot
				v-if="hasActivatorSlot"
				name="activator"
				:activator-attrs="activatorAttrs"
				:activator-ref="baseRef" />
			<span
				v-else-if="!hasExternalReference"
				:ref="
					(el) => {
						baseRef(el);
					}
				"
				v-bind="activatorAttrs">
				<slot
					name="activator"
					:activator-attrs="activatorAttrs"
					:activator-ref="baseRef" />
			</span>
		</template>

		<div
			v-bind="floatingAttrs"
			ref="floating"
			class="g-dropdown"
			role="menu"
			@click="props.closeOnContentClick && (open = false)">
			<slot />
		</div>
	</base-floating>
</template>

<style scoped lang="scss">
	@use '@/styles/mixins/overlay-surface' as overlaySurface;
	@use '@/styles/mixins/scrollbar' as scrollbar;

	.g-dropdown {
		pointer-events: auto;

		overflow: hidden auto;
		overscroll-behavior: contain;

		min-width: fit-content;
		max-height: min(
			var(--g-dropdown-max-height, 640px),
			calc(100vh - var(--g-navbar-height, 56px) - var(--g-token-space-5))
		);

		@include overlaySurface.overlay-surface;
		@include scrollbar.tonal-scrollbar;
	}
</style>
