<script setup lang="ts">
	import { computed, onBeforeUnmount, ref, watch } from 'vue';
	import { GTransition } from '@/components/transitions';
	import GButton from '@/components/ui/GButton/GButton.vue';
	import GIcon from '@/components/ui/GIcon/GIcon.vue';
	import { useSurfaceLayers } from '@/use/surface';
	import { useSurfaceColor } from '@/use/surfaceColor';
	import usePx from '@/use/px';
	import { makeSnackbarProps, type GSnackbarCloseReason } from './types';

	const props = defineProps(makeSnackbarProps());
	const emit = defineEmits<{
		'update:modelValue': [value: boolean];
		action: [value: unknown];
		close: [reason: GSnackbarCloseReason];
		'after-close': [reason: GSnackbarCloseReason];
	}>();
	const slots = defineSlots<{
		default?: () => unknown;
		title?: () => unknown;
		prepend?: () => unknown;
		action?: (props: { close: () => void }) => unknown;
	}>();

	const timerId = ref<number>();
	const localOpen = ref(props.defaultOpen);
	const closeReason = ref<GSnackbarCloseReason>('manual');
	const isControlled = computed(() => props.modelValue !== undefined);
	const isOpen = computed(() =>
		isControlled.value ? props.modelValue === true : localOpen.value
	);
	const offset = usePx(props.offset);
	const maxWidth = usePx(props.maxWidth);
	const { colorStyles } = useSurfaceColor(props);
	const {
		surfaceOverlayClasses,
		surfaceUnderlayClasses,
		surfaceContentClasses
	} = useSurfaceLayers('g-snackbar');
	const resolvedActionLabel = computed(
		() => props.action?.label ?? props.actionText
	);
	const snackbarStyles = computed(() => ({
		...colorStyles.value,
		'--g-snackbar-max-width': maxWidth.value
	}));
	const layerStyles = computed(() => ({
		'--g-snackbar-offset': offset.value
	}));
	const snackbarClasses = computed(() => [
		`g-snackbar_${props.variant}`,
		{
			'g-snackbar_multiline': props.multiline
		}
	]);
	const layerClasses = computed(() => [
		`g-snackbar-layer_position-${props.position}`,
		`g-snackbar-layer_location-${props.location}`
	]);
	const transition = computed(
		() =>
			props.transition ?? {
				name: props.location.startsWith('top')
					? 'slide-y'
					: 'slide-y-reverse',
				appear: true,
				duration: 240,
				leaveDuration: 180,
				distance: '16px'
			}
	);

	function setOpen(value: boolean) {
		if (!isControlled.value) {
			localOpen.value = value;
		}

		emit('update:modelValue', value);
	}

	function clearTimer() {
		if (timerId.value === undefined) return;

		window.clearTimeout(timerId.value);
		timerId.value = undefined;
	}

	function startTimer() {
		clearTimer();

		if (!isOpen.value || props.persistent || props.timeout <= 0) return;

		timerId.value = window.setTimeout(() => {
			close('timeout');
		}, props.timeout);
	}

	function close(reason: GSnackbarCloseReason = 'manual') {
		closeReason.value = reason;
		clearTimer();
		setOpen(false);
		emit('close', reason);
	}

	function onAction() {
		emit('action', props.action?.value);

		if (props.action?.closeOnClick ?? props.closeOnAction) {
			close('action');
		}
	}

	function onMouseenter() {
		if (props.pauseOnHover) clearTimer();
	}

	function onMouseleave() {
		if (props.pauseOnHover) startTimer();
	}

	watch(isOpen, (value) => {
		if (!value) {
			clearTimer();
			return;
		}

		startTimer();
	});

	startTimer();

	onBeforeUnmount(() => {
		clearTimer();
	});

	function onAfterClose() {
		emit('after-close', closeReason.value);
	}

	defineExpose({
		open: () => setOpen(true),
		close
	});
</script>

<template>
	<div
		class="g-snackbar-layer"
		:class="layerClasses"
		:style="layerStyles">
		<g-transition
			:transition="transition"
			@after-leave="onAfterClose">
			<section
				v-if="isOpen"
				class="g-snackbar"
				:class="snackbarClasses"
				:style="snackbarStyles"
				role="status"
				aria-live="polite"
				@mouseenter="onMouseenter"
				@mouseleave="onMouseleave">
				<span :class="surfaceUnderlayClasses"></span>
				<span :class="surfaceOverlayClasses"></span>

				<div
					class="g-snackbar__content"
					:class="surfaceContentClasses">
					<div
						v-if="slots.prepend || props.icon"
						class="g-snackbar__prepend">
						<slot name="prepend">
							<g-icon
								v-if="props.icon"
								:icon="props.icon"
								size="22" />
						</slot>
					</div>

					<div class="g-snackbar__main">
						<div
							v-if="slots.title || props.title"
							class="g-snackbar__title">
							<slot name="title">{{ props.title }}</slot>
						</div>
						<div
							v-if="slots.default || props.text"
							class="g-snackbar__text">
							<slot>{{ props.text }}</slot>
						</div>
					</div>

					<div
						v-if="
							slots.action ||
							resolvedActionLabel ||
							props.closeable
						"
						class="g-snackbar__actions">
						<slot
							name="action"
							:close="() => close('action')">
							<g-button
								v-if="resolvedActionLabel"
								variant="text"
								size="s"
								:label="resolvedActionLabel"
								@click="onAction" />
						</slot>
						<button
							v-if="props.closeable"
							type="button"
							class="g-snackbar__close"
							aria-label="Close snackbar"
							@click="close('dismiss')">
							<g-icon
								icon="close"
								size="18" />
						</button>
					</div>
				</div>
			</section>
		</g-transition>
	</div>
</template>

<style scoped lang="scss">
	@use '@/styles/mixins/action-surface' as actionSurface;

	.g-snackbar-layer {
		pointer-events: none;

		z-index: var(--g-snackbar-z-index, 2600);

		display: flex;

		box-sizing: border-box;
		width: max-content;
		max-width: calc(100vw - 32px);

		&_position-fixed {
			position: fixed;
		}

		&_position-absolute {
			position: absolute;
		}

		&_position-static {
			position: static;
			width: 100%;
			max-width: 100%;
		}

		&_location-top-left {
			top: var(--g-snackbar-offset);
			left: var(--g-snackbar-offset);
			justify-content: flex-start;
		}

		&_location-top-center {
			top: var(--g-snackbar-offset);
			right: var(--g-snackbar-offset);
			left: var(--g-snackbar-offset);

			justify-content: center;

			width: auto;
		}

		&_location-top-right {
			top: var(--g-snackbar-offset);
			right: var(--g-snackbar-offset);
			justify-content: flex-end;
		}

		&_location-bottom-left {
			bottom: var(--g-snackbar-offset);
			left: var(--g-snackbar-offset);
			justify-content: flex-start;
		}

		&_location-bottom-center {
			right: var(--g-snackbar-offset);
			bottom: var(--g-snackbar-offset);
			left: var(--g-snackbar-offset);

			justify-content: center;

			width: auto;
		}

		&_location-bottom-right {
			right: var(--g-snackbar-offset);
			bottom: var(--g-snackbar-offset);
			justify-content: flex-end;
		}
	}

	.g-snackbar {
		--g-surface-underlay-color: var(--g-surface-color);
		--g-surface-underlay-opacity: 1;
		--g-surface-overlay-color: var(--g-color);
		--g-surface-overlay-opacity: var(--g-token-state-tonal-opacity);
		--g-surface-content-color: var(--g-color);

		pointer-events: auto;

		position: relative;

		overflow: hidden;

		box-sizing: border-box;
		width: 100%;
		max-width: min(calc(100vw - 32px), var(--g-snackbar-max-width));
		padding: var(--g-token-space-3) var(--g-token-space-4);
		border-radius: var(--g-token-radius-md);

		color: var(--g-surface-content-color);

		box-shadow: var(--g-token-elevation-2);

		&_filled {
			--g-surface-underlay-color: var(--g-color);
			--g-surface-underlay-opacity: 1;
			--g-surface-overlay-color: var(--g-on-color);
			--g-surface-overlay-opacity: 0;
			--g-surface-content-color: var(--g-on-color);
		}

		&_outlined {
			--g-surface-underlay-opacity: 0.72;
			--g-surface-overlay-opacity: 0;

			border: 1px solid
				color-mix(in srgb, var(--g-color) 38%, transparent);
			backdrop-filter: blur(18px) saturate(1.35);
		}

		&__content {
			position: relative;
			z-index: 2;

			display: flex;
			gap: var(--g-token-space-3);
			align-items: center;

			min-width: 0;
		}

		&__prepend,
		&__actions {
			display: inline-flex;
			flex: 0 0 auto;
			align-items: center;
			color: currentcolor;
		}

		&__main {
			display: grid;
			flex: 1 1 auto;
			gap: var(--g-token-space-1);
			min-width: min(180px, 50vw);
		}

		&__title {
			font-size: var(--g-token-font-size-sm);
			font-weight: var(--g-token-font-weight-bold);
			line-height: var(--g-token-line-height-sm);
		}

		&__text {
			font-size: var(--g-token-font-size-sm);
			line-height: var(--g-token-line-height-md);
			color: color-mix(in srgb, currentcolor 78%, transparent);
		}

		&__actions {
			gap: var(--g-token-space-1);
			margin-left: var(--g-token-space-2);
		}

		&__close {
			cursor: pointer;

			display: inline-flex;
			align-items: center;
			justify-content: center;

			width: 28px;
			height: 28px;
			padding: 0;
			border: none;
			border-radius: var(--g-token-radius-pill);

			color: currentcolor;

			opacity: var(--g-token-opacity-soft);
			background: transparent;

			transition:
				opacity var(--g-token-duration-fast)
					var(--g-token-easing-standard),
				background-color var(--g-token-duration-fast)
					var(--g-token-easing-standard);

			&:hover {
				opacity: 1;
				background: color-mix(in srgb, currentcolor 10%, transparent);
			}

			&:focus-visible {
				outline: var(--g-token-state-focus-ring-width) solid
					var(--g-token-focus-ring);
				outline-offset: 2px;
			}
		}

		&_multiline {
			.g-snackbar__content {
				align-items: flex-start;
			}
		}
	}

	@include actionSurface.action-surface-layers('g-snackbar', true);
</style>
