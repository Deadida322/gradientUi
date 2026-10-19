<script setup lang="ts">
	import { computed, onMounted, ref, useAttrs, watch } from 'vue';
	import {
		makeImgProps,
		type GImgEmits,
		type GImgSlotProps,
		type GImgState
	} from './types';

	defineOptions({ inheritAttrs: false });

	const slots = defineSlots<{
		default?: (props: GImgSlotProps) => unknown;
		placeholder?: (props: GImgSlotProps) => unknown;
		error?: (props: GImgSlotProps) => unknown;
		sources?: () => unknown;
	}>();
	const attrs = useAttrs();
	const emit = defineEmits<GImgEmits>();
	const props = defineProps(makeImgProps());
	const image = ref<HTMLImageElement>();
	const state = ref<GImgState>(props.src ? 'loading' : 'idle');

	const source = computed(() =>
		typeof props.src === 'string' ? undefined : props.src
	);
	const resolvedSrc = computed(() =>
		typeof props.src === 'string' ? props.src : props.src.src
	);
	const resolvedSrcset = computed(() => props.srcset ?? source.value?.srcset);
	const resolvedLazySrc = computed(
		() => props.lazySrc ?? source.value?.lazySrc
	);
	const resolvedAspectRatio = computed(
		() => props.aspectRatio ?? source.value?.aspectRatio
	);
	const resolvedFit = computed(
		() => props.fit ?? (props.cover ? 'cover' : 'contain')
	);
	const resolvedGradient = computed(() => {
		if (!props.gradient) return undefined;
		return /(?:gradient|url)\(/i.test(props.gradient)
			? props.gradient
			: `linear-gradient(${props.gradient})`;
	});
	const toCssUnit = (value: number | string | undefined) => {
		if (value === undefined || value === '') return undefined;
		if (typeof value === 'number') return `${value}px`;
		return /^\d+(?:\.\d+)?$/.test(value) ? `${value}px` : value;
	};
	const rootStyles = computed(() => ({
		'--g-img-aspect-ratio': resolvedAspectRatio.value,
		'--g-img-border-radius': toCssUnit(props.borderRadius),
		'--g-img-fit': resolvedFit.value,
		'--g-img-position': props.position,
		'--g-img-gradient': resolvedGradient.value,
		width: toCssUnit(props.width),
		height: toCssUnit(props.height),
		maxWidth: toCssUnit(props.maxWidth),
		maxHeight: toCssUnit(props.maxHeight)
	}));
	const slotProps = computed<GImgSlotProps>(() => ({
		src: resolvedSrc.value,
		state: state.value
	}));

	const syncCompletedImage = () => {
		if (!image.value?.complete || !resolvedSrc.value) return;
		state.value = image.value.naturalWidth > 0 ? 'loaded' : 'error';
	};
	const onLoad = (event: Event) => {
		state.value = 'loaded';
		emit('load', event);
	};
	const onError = (event: Event) => {
		state.value = 'error';
		emit('error', event);
	};

	watch(resolvedSrc, (src) => {
		state.value = src ? 'loading' : 'idle';
	});
	onMounted(syncCompletedImage);

	defineExpose({ image, state });
</script>

<template>
	<div
		class="g-img"
		:class="{
			'g-img_fit-content': props.fitContent,
			'g-img_loaded': state === 'loaded',
			'g-img_error': state === 'error'
		}"
		:style="rootStyles"
		:aria-busy="state === 'loading' ? 'true' : undefined"
		v-bind="attrs">
		<picture class="g-img__picture">
			<slot name="sources"></slot>
			<img
				v-if="resolvedSrc"
				ref="image"
				class="g-img__image"
				:src="resolvedSrc"
				:srcset="resolvedSrcset"
				:sizes="props.sizes"
				:alt="props.alt"
				:loading="props.loading"
				:decoding="props.decoding"
				:fetchpriority="props.fetchpriority"
				:crossorigin="props.crossorigin"
				:referrerpolicy="props.referrerpolicy"
				:draggable="props.draggable"
				@load="onLoad"
				@error="onError" />
		</picture>

		<div
			v-if="state === 'loading' && (resolvedLazySrc || slots.placeholder)"
			class="g-img__placeholder"
			aria-hidden="true">
			<slot
				name="placeholder"
				v-bind="slotProps">
				<img
					v-if="resolvedLazySrc"
					class="g-img__placeholder-image"
					:src="resolvedLazySrc"
					alt=""
					decoding="async"
					draggable="false" />
			</slot>
		</div>

		<div
			v-if="state === 'error' && slots.error"
			class="g-img__error">
			<slot
				name="error"
				v-bind="slotProps"></slot>
		</div>

		<span
			v-if="resolvedGradient"
			class="g-img__gradient"
			aria-hidden="true"></span>

		<div
			v-if="slots.default"
			class="g-img__content">
			<slot v-bind="slotProps"></slot>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.g-img {
		position: relative;

		overflow: hidden;
		display: grid;

		box-sizing: border-box;
		aspect-ratio: var(--g-img-aspect-ratio, auto);
		width: 100%;
		border-radius: var(--g-img-border-radius, 0);

		background: var(--g-token-color-surface);

		&_fit-content {
			width: fit-content;
			max-width: 100%;
		}

		&__picture,
		&__placeholder,
		&__error,
		&__gradient,
		&__content {
			grid-area: 1 / 1;
		}

		&__picture,
		&__image,
		&__placeholder-image {
			display: block;
			width: 100%;
			height: 100%;
		}

		&__image,
		&__placeholder-image {
			object-fit: var(--g-img-fit);
			object-position: var(--g-img-position);
		}

		&__placeholder,
		&__error,
		&__gradient,
		&__content {
			position: relative;
			z-index: 1;
		}

		&__placeholder,
		&__error,
		&__content {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		&__placeholder {
			pointer-events: none;
			transition: opacity var(--g-token-duration-base)
				var(--g-token-easing-standard);
		}

		&__gradient {
			pointer-events: none;
			z-index: 2;
			background: var(--g-img-gradient);
		}

		&__error,
		&__content {
			z-index: 3;
		}
	}
</style>
