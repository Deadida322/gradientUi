<script lang="ts" setup>
	import { computed, ref, toRef, watch } from 'vue';

	import { makeFloatingProps } from '@/use/floating';
	import { useFloatingLayer } from '@/use/floatingLayer';

	import { useZIndex } from '@/use/zIndex';
	import { useDismiss } from '@/use/floatingDismiss';
	import TransitionScale from '@/components/transitions/TransitionScale.vue';
	import type { MaybeElement, ReferenceElement } from '@floating-ui/vue';

	const props = defineProps(makeFloatingProps());
	const referenceProp = toRef(props, 'reference');
	const emit = defineEmits(['update:modelValue']);

	const localOpen = ref(props.defaultOpen ?? false);

	const open = computed({
		get() {
			return props.modelValue ?? localOpen.value;
		},
		set(value: boolean) {
			if (props.modelValue !== undefined) {
				emit('update:modelValue', value);
			} else {
				localOpen.value = value;
			}
		}
	});

	const { reference, floating, x, y, strategy, update } =
		useFloatingLayer(props);

	useDismiss({ open, reference, floating });

	const { zIndex } = useZIndex({ open, base: props.zIndexBase });

	const floatingStyle = computed(() => ({
		position: strategy.value,
		top: y.value != null ? `${y.value}px` : '',
		left: x.value != null ? `${x.value}px` : '',
		minWidth:
			props.sameWidth && reference.value instanceof HTMLElement
				? `${reference.value.offsetWidth}px`
				: undefined,
		zIndex: zIndex.value
	}));

	function assignReference(el: MaybeElement<ReferenceElement> | null) {
		if (el && ('$el' in el || el instanceof HTMLElement)) {
			reference.value = el;
		} else {
			reference.value = props.reference;
			update();
		}
	}

	watch(
		referenceProp,
		(val) => {
			if (val) reference.value = val;
		},
		{ deep: true, immediate: true }
	);
</script>

<template>
	<div
		class="base-floating__reference"
		:class="{
			'base-floating__reference_full': props.referenceFullWidth
		}">
		<slot
			:ref="assignReference"
			name="reference" />
	</div>

	<teleport
		v-if="props.appendTo && props.appendTo"
		:to="appendTo">
		<div
			v-show="open"
			ref="floating"
			:style="floatingStyle">
			<slot />
		</div>
	</teleport>
	<transition-scale v-else>
		<div
			v-show="open"
			ref="floating"
			:style="floatingStyle">
			<slot />
		</div>
	</transition-scale>
</template>

<style lang="scss" scoped>
	.base-floating__reference {
		display: inline-block;
		width: fit-content;

		&_full {
			display: block;
			width: 100%;
		}
	}
</style>
