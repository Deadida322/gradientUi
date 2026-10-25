<script lang="ts" setup>
	import { computed, toRef, watch } from 'vue';

	import { makeFloatingProps } from '@/use/floating';
	import { useFloatingLayer } from '@/use/floatingLayer';

	import { useAppendTarget } from '@/use/appendTarget';
	import { useControllableOpen } from '@/use/controllableOpen';
	import { useDismiss } from '@/use/floatingDismiss';
	import { useLayerStack } from '@/use/layerStack';
	import { useTransitionPresence } from '@/use/transition';
	import { GTransition } from '@/components/transitions';
	import type { MaybeElement, ReferenceElement } from '@floating-ui/vue';
	import { isClientHTMLElement } from '@/ssr/utils';

	const props = defineProps(makeFloatingProps());
	const referenceProp = toRef(props, 'reference');
	const emit = defineEmits<{
		'update:modelValue': [value: boolean];
	}>();
	const { open } = useControllableOpen(props, emit);
	const { hasAppendTarget, appendTarget } = useAppendTarget(
		() => props.appendTo
	);
	const { present, onBeforeLeave, onAfterLeave, onLeaveCancelled } =
		useTransitionPresence(open);

	const { reference, floating, x, y, strategy, update } =
		useFloatingLayer(props);

	useDismiss({ open, reference, floating });

	const { zIndex } = useLayerStack({
		open: present,
		base: props.zIndexBase,
		kind: 'floating'
	});

	const floatingStyle = computed(() => ({
		position: strategy.value,
		top: y.value != null ? `${y.value}px` : '',
		left: x.value != null ? `${x.value}px` : '',
		minWidth:
			props.sameWidth && isClientHTMLElement(reference.value)
				? `${reference.value.offsetWidth}px`
				: undefined,
		zIndex: zIndex.value
	}));

	function assignReference(el: MaybeElement<ReferenceElement> | null) {
		if (el && ('$el' in el || isClientHTMLElement(el))) {
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
		v-if="hasAppendTarget"
		:to="appendTarget">
		<g-transition
			:transition="props.transition"
			name="scale"
			@before-leave="onBeforeLeave"
			@after-leave="onAfterLeave"
			@leave-cancelled="onLeaveCancelled">
			<div
				v-show="open"
				ref="floating"
				:style="floatingStyle">
				<slot />
			</div>
		</g-transition>
	</teleport>
	<g-transition
		v-else
		:transition="props.transition"
		name="scale"
		@before-leave="onBeforeLeave"
		@after-leave="onAfterLeave"
		@leave-cancelled="onLeaveCancelled">
		<div
			v-show="open"
			ref="floating"
			:style="floatingStyle">
			<slot />
		</div>
	</g-transition>
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
