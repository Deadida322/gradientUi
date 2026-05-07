<script setup lang="ts">
	import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
	import { GTransition } from '@/components/transitions';
	import { useAppendTarget } from '@/use/appendTarget';
	import { useBodyScrollLock } from '@/use/bodyScrollLock';
	import { useControllableOpen } from '@/use/controllableOpen';
	import { useLayerStack } from '@/use/layerStack';
	import { makeBaseOverlayProps } from './types';

	const props = defineProps(makeBaseOverlayProps());
	const emit = defineEmits<{
		'update:modelValue': [value: boolean];
	}>();

	const rootRef = ref<HTMLElement | null>(null);
	const contentRef = ref<HTMLElement | null>(null);
	const { open } = useControllableOpen(props, emit);
	const { hasAppendTarget, appendTarget } = useAppendTarget(props.appendTo);
	const { zIndex, isTopOverlay, bringToFront } = useLayerStack({
		open,
		base: props.zIndexBase,
		kind: 'overlay'
	});
	const lockScrollEnabled = computed(
		() => props.lockScroll && props.position === 'fixed'
	);
	const overlayClasses = computed(() => ({
		[`base-overlay_${props.position}`]: true,
		[`base-overlay_${props.placement}`]: true
	}));
	const rootStyle = computed(() => ({
		zIndex: zIndex.value
	}));
	const contentStyle = computed(() => ({
		zIndex: zIndex.value != null ? zIndex.value + 1 : undefined
	}));

	useBodyScrollLock(open, lockScrollEnabled);

	function close() {
		open.value = false;
	}

	function dismiss() {
		if (props.disabled || props.persistent) return;
		close();
	}

	function onScrimClick() {
		if (!props.closeOnOutside || !isTopOverlay.value) return;
		dismiss();
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key !== 'Escape' || !open.value || !isTopOverlay.value)
			return;
		if (!props.closeOnEsc) return;

		event.preventDefault();
		dismiss();
	}

	onMounted(() => {
		window.addEventListener('keydown', onKeydown);
	});

	onBeforeUnmount(() => {
		window.removeEventListener('keydown', onKeydown);
	});

	defineExpose({
		open,
		show: () => {
			open.value = true;
			bringToFront();
		},
		hide: close
	});
</script>

<template>
	<teleport
		v-if="hasAppendTarget"
		:to="appendTarget">
		<g-transition
			:transition="props.transition"
			name="overlay"
			appear>
			<div
				v-if="open"
				ref="rootRef"
				class="base-overlay"
				:class="overlayClasses"
				:style="rootStyle"
				@pointerdown.self="bringToFront">
				<div
					v-if="props.scrim"
					class="base-overlay__scrim"
					@click="onScrimClick"></div>
				<div
					ref="contentRef"
					class="base-overlay__content"
					:style="contentStyle"
					@pointerdown.stop="bringToFront">
					<slot
						:close="close"
						:dismiss="dismiss"
						:model-value="open" />
				</div>
			</div>
		</g-transition>
	</teleport>

	<g-transition
		v-else
		:transition="props.transition"
		name="overlay"
		appear>
		<div
			v-if="open"
			ref="rootRef"
			class="base-overlay"
			:class="overlayClasses"
			:style="rootStyle"
			@pointerdown.self="bringToFront">
			<div
				v-if="props.scrim"
				class="base-overlay__scrim"
				@click="onScrimClick"></div>
			<div
				ref="contentRef"
				class="base-overlay__content"
				:style="contentStyle"
				@pointerdown.stop="bringToFront">
				<slot
					:close="close"
					:dismiss="dismiss"
					:model-value="open" />
			</div>
		</div>
	</g-transition>
</template>

<style scoped lang="scss">
	.base-overlay {
		pointer-events: none;
		position: fixed;
		inset: 0;
		display: flex;

		&_absolute {
			position: absolute;
		}

		&_center {
			align-items: center;
			justify-content: center;
		}

		&_left {
			align-items: stretch;
			justify-content: flex-start;
		}

		&_right {
			align-items: stretch;
			justify-content: flex-end;
		}

		&_top {
			align-items: flex-start;
			justify-content: center;
		}

		&_bottom {
			align-items: flex-end;
			justify-content: center;
		}

		&_fullscreen {
			align-items: center;
			justify-content: center;
		}

		&__scrim {
			pointer-events: auto;
			position: absolute;
			inset: 0;
			background: transparent;

			&::after,
			&::before {
				content: '';
				position: absolute;
				inset: 0;
			}

			&::before {
				z-index: 1;
				background: color-mix(
					in srgb,
					var(--g-token-color-surface) 18%,
					black 24%
				);
			}

			&::after {
				z-index: 0;
				backdrop-filter: blur(6px);
			}
		}

		&__content {
			pointer-events: auto;

			position: relative;

			display: flex;

			max-width: 100%;
			max-height: 100%;
		}

		&_fullscreen &__content {
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
		}

		&_top &__content,
		&_bottom &__content {
			width: 100%;
		}

		&_left &__content,
		&_right &__content {
			height: 100%;
		}
	}
</style>
