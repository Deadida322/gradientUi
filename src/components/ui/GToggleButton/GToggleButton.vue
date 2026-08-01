<script setup lang="ts">
	import { computed } from 'vue';
	import GGradient from '../GGradient/GGradient.vue';
	import GIcon from '../GIcon/GIcon.vue';
	import { makeToggleButtonProps, type GToggleButtonSlots } from './types';
	import { useActionSurface } from '@/use/actionSurface';
	import { useFormControl } from '@/use/form/control';
	import { createComponentId } from '@/utils/createComponentId';

	const props = defineProps(makeToggleButtonProps());
	const slots = defineSlots<GToggleButtonSlots>();
	const emit = defineEmits<{
		change: [value: boolean, event: Event];
		focus: [event: FocusEvent];
		blur: [event: FocusEvent];
	}>();

	const modelValue = defineModel<boolean>({ default: false });
	const inputId = computed(
		() => props.id ?? createComponentId('g-toggle-button')
	);

	const { focused, $v, computedMessage, onFocus, onBlur } =
		useFormControl<boolean>({
			modelValue,
			rules: computed(() => props.rules),
			message: computed(() => props.message)
		});

	const {
		actionSurfaceClasses,
		resolvedColor,
		resolvedState,
		surfaceStyles,
		surfaceMaterialMorphBlobClasses,
		surfaceMaterialMorphClasses,
		surfaceOverlayClasses,
		surfaceUnderlayClasses,
		surfaceTextureClasses,
		surfaceContentClasses,
		morphBlobs,
		morphEnabled,
		getMorphBlobStyle
	} = useActionSurface(props, 'g-toggle-button', {
		focused: () => focused.value,
		selected: () => modelValue.value
	});

	const hasMessage = computed(
		() => Boolean(computedMessage.value) || Boolean(slots.message)
	);
	const hasTextContent = computed(
		() => Boolean(props.label) || Boolean(slots.default)
	);
	const gradientBorderRadius = computed(() => (props.rounded ? 999 : 10));

	function toggle(event: Event) {
		if (props.disabled) return;

		const nextValue = !modelValue.value;
		modelValue.value = nextValue;
		emit('change', nextValue, event);
	}

	function handleFocus(event: FocusEvent) {
		onFocus();
		emit('focus', event);
	}

	function handleBlur(event: FocusEvent) {
		onBlur();
		emit('blur', event);
	}

	defineExpose({
		$v
	});
</script>

<template>
	<div
		class="g-toggle-button-field"
		:class="{ 'g-toggle-button-field_inline': props.inline }">
		<g-gradient
			class="g-toggle-button-field__surface"
			:active="modelValue"
			:glow="props.glow || modelValue"
			:animate-glow="props.animateGlow"
			:disabled="props.disabled"
			:color="resolvedColor"
			:state="resolvedState"
			:rounded="props.rounded"
			:border-width="
				props.borderWidth ??
				(modelValue ||
				props.glow ||
				props.animateGlow ||
				props.variant === 'outlined' ||
				props.variant === 'glass'
					? 1
					: 0)
			"
			:border-radius="gradientBorderRadius"
			:placement="props.placement"
			:gradient-recipe="props.gradientRecipe">
			<button
				:id="inputId"
				type="button"
				class="g-toggle-button"
				:class="actionSurfaceClasses"
				:style="surfaceStyles"
				:disabled="props.disabled"
				:aria-pressed="modelValue"
				@click="toggle"
				@focus="handleFocus"
				@blur="handleBlur">
				<span :class="surfaceUnderlayClasses"></span>
				<span
					v-if="morphEnabled"
					:class="surfaceMaterialMorphClasses"
					aria-hidden="true">
					<span
						v-for="(blob, index) in morphBlobs"
						:key="index"
						:class="surfaceMaterialMorphBlobClasses"
						:style="getMorphBlobStyle(blob)"></span>
				</span>
				<span :class="surfaceOverlayClasses"></span>
				<span :class="surfaceTextureClasses"></span>
				<span
					class="g-toggle-button__content"
					:class="surfaceContentClasses">
					<span
						v-if="$slots.prepend || props.prepend"
						class="g-toggle-button__prepend">
						<slot name="prepend">
							<g-icon :icon="props.prepend" />
						</slot>
					</span>

					<span
						v-if="hasTextContent"
						class="g-toggle-button__label">
						<slot>
							{{ props.label }}
						</slot>
					</span>

					<span
						v-if="$slots.append || props.append"
						class="g-toggle-button__append">
						<slot name="append">
							<g-icon :icon="props.append" />
						</slot>
					</span>
				</span>
			</button>
		</g-gradient>

		<div
			v-if="hasMessage"
			class="g-toggle-button-field__message">
			<slot name="message">
				{{ computedMessage }}
			</slot>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@use '@/styles/mixins/action-surface' as actionSurface;
	@use '@/styles/mixins/rounded' as rounded;
	@use '@/styles/mixins/variants' as variants;
	@use '@/styles/mixins/base' as base;
	@use '@/styles/mixins/sizes' as size;
	@use '@/styles/mixins/focus-ring' as focusRing;
	@use '@/styles/mixins/truncate' as truncate;

	.g-toggle-button-field {
		display: inline-flex;
		flex-direction: column;
		gap: 6px;
		align-items: flex-start;

		min-width: 0;

		&_inline {
			display: flex;
		}

		&__message {
			font-size: var(--g-token-font-size-xs);
			color: var(--g-token-text-muted);
			text-align: left;
		}

		&__surface {
			width: fit-content;
		}
	}

	.g-toggle-button {
		@include base.base-component('g-toggle-button');

		--g-size-gap: var(--g-token-toggle-gap);
		--g-size-padding-y-s: var(--g-token-toggle-padding-y-s);
		--g-size-padding-x-s: var(--g-token-toggle-padding-x-s);
		--g-size-padding-y-m: var(--g-token-toggle-padding-y-m);
		--g-size-padding-x-m: var(--g-token-toggle-padding-x-m);
		--g-size-padding-y-l: var(--g-token-toggle-padding-y-l);
		--g-size-padding-x-l: var(--g-token-toggle-padding-x-l);
		--g-size-padding-y-xl: var(--g-token-toggle-padding-y-xl);
		--g-size-padding-x-xl: var(--g-token-toggle-padding-x-xl);
		--g-size-font-size-s: var(--g-token-toggle-font-size-s);
		--g-size-font-size-m: var(--g-token-toggle-font-size-m);
		--g-size-font-size-l: var(--g-token-toggle-font-size-l);
		--g-size-font-size-xl: var(--g-token-toggle-font-size-xl);
		--g-size-line-height: var(--g-token-toggle-line-height);
		--g-token-icon-size-m: var(--g-token-toggle-icon-size);

		gap: var(--g-token-toggle-gap);

		min-width: 0;
		border: 1px solid transparent;
		border-radius: var(--g-token-toggle-radius);

		outline: none;

		transition:
			background-color var(--g-token-duration-fast)
				var(--g-token-easing-standard),
			border-color var(--g-token-duration-fast)
				var(--g-token-easing-standard),
			color var(--g-token-duration-fast) var(--g-token-easing-standard),
			box-shadow var(--g-token-duration-fast)
				var(--g-token-easing-standard),
			transform var(--g-token-duration-fast)
				var(--g-token-easing-standard);

		&__content {
			display: inline-flex;
			gap: inherit;
			align-items: center;
			justify-content: center;

			min-width: 0;
		}

		&:not(:disabled):active {
			transform: translateY(1px);
		}

		&__prepend,
		&__append {
			display: inline-flex;
			flex: 0 0 auto;
			align-items: center;
		}

		&__label {
			@include truncate.truncate;
		}

		&_focused {
			@include focusRing.focus-ring;
		}

		&_disabled {
			cursor: not-allowed;
			opacity: var(--g-token-opacity-disabled);
		}
	}

	@include variants.variant-gradient('g-toggle-button');
	@include variants.variant-text('g-toggle-button');
	@include variants.variant-glass('g-toggle-button');
	@include variants.variant-outlined('g-toggle-button', null);
	@include variants.variant-tonal('g-toggle-button');

	@include size.size-s('g-toggle-button');
	@include size.size-m('g-toggle-button');
	@include size.size-l('g-toggle-button');
	@include size.size-xl('g-toggle-button');
	@include rounded.rounded('g-toggle-button');
	@include actionSurface.action-surface-layers('g-toggle-button', true);
</style>
