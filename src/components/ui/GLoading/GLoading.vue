<script setup lang="ts">
	import type { GLoadingProps } from './types';
	import GProgress from '../GProgress/GProgress.vue';
	import { computed, ref } from 'vue';
	import TransitionScale from '@/components/transitions/TransitionScale.vue';
	const props = withDefaults(defineProps<GLoadingProps>(), {
		text: 'Загрузка...',
		noText: false,
		show: false,
		onClose: () => {}
	});

	const emit = defineEmits<{
		(e: 'close'): void;
	}>();

	const visible = ref(false);
	const _slots = defineSlots<{
		default: () => unknown;
	}>();

	const show = () => {
		visible.value = true;
	};

	const hide = () => {
		visible.value = false;
	};

	const isVisible = computed(() => {
		return props.show || visible.value;
	});

	const close = () => {
		props.onClose?.();
		emit('close');
	};

	defineExpose({
		hide,
		show,
		isVisible
	});
</script>

<template>
	<transition-scale @leave="close">
		<div
			v-if="isVisible"
			class="g-loading">
			<div class="g-loading__body">
				<div
					v-if="!noText"
					class="g-loading__text">
					<slot>{{ text }}</slot>
				</div>
				<div class="g-loading__progress">
					<g-progress
						no-label
						size="s"
						indeterminate
						:model-value="100">
					</g-progress>
				</div>
			</div>
		</div>
	</transition-scale>
</template>

<style lang="scss">
	.g-loading-fade-enter-active,
	.g-loading-fade-leave-active {
		transition: opacity 0.3s ease !important;
	}

	.g-loading-fade-enter-from,
	.g-loading-fade-leave-to {
		opacity: 0;
	}

	.g-loading {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;

		display: flex;
		justify-content: center;

		width: 100%;
		height: 100%;

		opacity: 1;
		background-color: rgb(238 232 255 / 75%);
		backdrop-filter: blur(0.7px);

		&__body {
			display: flex;
			flex-direction: column;
			gap: 10px;
			align-items: center;
			justify-content: center;

			width: 100%;
		}

		&__text {
			font-size: 16px;
			line-height: 20px;
			color: var(--g-text-primary);
		}

		&__progress {
			align-items: center;
			width: 150px;
			max-width: 90%;
		}
	}
</style>
