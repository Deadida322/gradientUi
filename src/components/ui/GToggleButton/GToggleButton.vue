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

	const { actionSurfaceClasses } = useActionSurface(
		props,
		'g-toggle-button',
		{
			focused: () => focused.value,
			selected: () => modelValue.value
		}
	);

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
			:glow="modelValue"
			:disabled="props.disabled"
			:state="props.state"
			:rounded="props.rounded"
			:border-width="modelValue ? 1 : 0"
			:border-radius="gradientBorderRadius">
			<button
				:id="inputId"
				type="button"
				class="g-toggle-button"
				:class="actionSurfaceClasses"
				:disabled="props.disabled"
				:aria-pressed="modelValue"
				@click="toggle"
				@focus="handleFocus"
				@blur="handleBlur">
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
		--g-size-line-height-s: var(--g-token-toggle-line-height-compact);

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
			white-space: nowrap;
		}

		&_focused {
			box-shadow: 0 0 0 var(--g-token-state-focus-ring-width)
				var(--g-token-focus-ring);
		}

		&_disabled {
			cursor: not-allowed;
			opacity: var(--g-token-opacity-disabled);
		}
	}

	@include variants.variant-filled('g-toggle-button');
	@include variants.variant-text('g-toggle-button');
	@include variants.variant-outlined('g-toggle-button');
	@include variants.variant-tonal('g-toggle-button');

	@include size.size-s('g-toggle-button');
	@include size.size-m('g-toggle-button');
	@include size.size-l('g-toggle-button');
	@include size.size-xl('g-toggle-button');
	@include rounded.rounded('g-toggle-button');
	@include actionSurface.action-state-overrides('g-toggle-button');
</style>
