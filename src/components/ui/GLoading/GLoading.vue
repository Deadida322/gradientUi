<script setup lang="ts">
	import { computed, ref } from 'vue';
	import { GTransition } from '@/components/transitions';
	import GProgress from '@/components/ui/GProgress/GProgress.vue';
	import { makeLoadingProps } from './types';

	const props = defineProps(
		makeLoadingProps({
			text: 'Loading...',
			noText: false,
			show: false,
			color: 'primary',
			dark: false,
			opacity: undefined,
			blur: undefined,
			progressView: 'glow',
			transition: 'scale',
			onClose: undefined
		})
	);

	const emit = defineEmits<{
		close: [];
	}>();

	defineSlots<{
		default?: () => unknown;
	}>();

	const visible = ref(false);
	const isVisible = computed(() => props.show || visible.value);
	const loadingStyles = computed(() => ({
		'--g-loading-overlay-opacity':
			props.opacity !== undefined ? String(props.opacity) : undefined,
		'--g-loading-overlay-blur':
			props.blur !== undefined ? toCssSize(props.blur) : undefined
	}));

	function toCssSize(value: number | string) {
		return typeof value === 'number' ? `${value}px` : value;
	}

	function show() {
		visible.value = true;
	}

	function hide() {
		visible.value = false;
	}

	function close() {
		props.onClose?.();
		emit('close');
	}

	defineExpose({
		hide,
		show,
		isVisible
	});
</script>

<template>
	<g-transition
		:transition="props.transition"
		name="scale"
		@after-leave="close">
		<div
			v-if="isVisible"
			class="g-loading"
			:class="{ 'g-loading_dark': props.dark }"
			:style="loadingStyles"
			aria-live="polite"
			aria-busy="true">
			<div class="g-loading__body">
				<div
					v-if="!props.noText"
					class="g-loading__text">
					<slot>{{ props.text }}</slot>
				</div>

				<div class="g-loading__progress">
					<g-progress
						no-label
						indeterminate
						:model-value="100"
						:color="props.color"
						:view="props.progressView"
						size="s" />
				</div>
			</div>
		</div>
	</g-transition>
</template>

<style lang="scss">
	.g-loading__container {
		pointer-events: auto;

		position: absolute;
		z-index: var(--g-loading-z-index, 20);
		inset: 0;

		overflow: hidden;

		border-radius: inherit;
	}

	.g-loading {
		position: absolute;
		inset: 0;

		display: flex;
		align-items: center;
		justify-content: center;

		width: 100%;
		height: 100%;

		color: var(--g-token-color-on-surface);

		background: rgb(
			var(--g-theme-surface) / var(--g-loading-overlay-opacity, 0.72)
		);
		backdrop-filter: blur(var(--g-loading-overlay-blur, 4px));

		&_dark {
			color: rgb(var(--g-theme-surface));
			background: rgb(
				var(--g-theme-on-surface) /
					var(--g-loading-overlay-opacity, 0.64)
			);
		}

		&__body {
			display: flex;
			flex-direction: column;
			gap: var(--g-token-space-3);
			align-items: center;
			justify-content: center;

			width: min(220px, 80%);
		}

		&__text {
			font-size: var(--g-token-font-size-md);
			font-weight: var(--g-token-font-weight-medium);
			line-height: var(--g-token-line-height-md);
			color: currentcolor;
			text-align: center;
		}

		&__progress {
			width: 150px;
			max-width: 100%;
		}
	}
</style>
