<script setup lang="ts">
	import { computed, nextTick, ref, toRef, useAttrs } from 'vue';
	import { useValidation, type Validatable } from 'gib-validate';
	import {
		makeFormProps,
		type GFormEmits,
		type GFormError,
		type GFormSlots
	} from './types';
	import { provideFormContext } from '@/use/form/context';

	defineOptions({ inheritAttrs: false });

	const props = defineProps(makeFormProps());
	defineSlots<GFormSlots>();
	const emit = defineEmits<GFormEmits>();
	const attrs = useAttrs();
	const formRef = ref<HTMLFormElement>();

	provideFormContext({
		disabled: toRef(props, 'disabled'),
		validateOn: toRef(props, 'validateOn')
	});

	const validation = useValidation<Record<string, Validatable>>(
		{},
		{},
		props.name
	);

	const errors = computed(() => collectErrors(validation.value));
	const firstError = computed(() => errors.value[0]);
	const slotProps = computed(() => ({
		$v: validation.value,
		valid: validation.value.$valid,
		invalid: validation.value.$invalid,
		pending: validation.value.$pending,
		dirty: validation.value.$dirty,
		error: validation.value.$error,
		errors: errors.value,
		errorCount: errors.value.length,
		firstError: firstError.value,
		disabled: props.disabled,
		validate,
		reset,
		touch,
		resetValidation
	}));

	type ValidationNode = {
		$children?: Record<string, ValidationNode>;
		$errors?: Record<string, string[] | undefined>;
	};

	function collectErrors(node: ValidationNode, prefix = ''): GFormError[] {
		const localErrors = Object.entries(node.$errors ?? {}).flatMap(
			([field, messages]) => {
				const path = [prefix, field].filter(Boolean).join('.');
				const normalizedMessages = messages ?? [];

				return normalizedMessages.map((message) => ({
					path,
					message,
					messages: normalizedMessages
				}));
			}
		);

		const childErrors = Object.entries(node.$children ?? {}).flatMap(
			([childName, childNode]) => {
				const path = [prefix, childName].filter(Boolean).join('.');

				return collectErrors(childNode, path);
			}
		);

		return [...localErrors, ...childErrors];
	}

	function touch() {
		validation.value.$touch();
	}

	function reset() {
		validation.value.$reset();
	}

	function resetValidation() {
		validation.value.$resetValidation();
	}

	async function validate() {
		return validation.value.$validate();
	}

	async function onSubmit(event: SubmitEvent) {
		if (props.preventDefault) {
			event.preventDefault();
		}

		emit('submit', event, validation.value);

		if (!props.validateOnSubmit) return;

		const valid = await validate();
		if (valid) {
			emit('submit-valid', event, validation.value);
			return;
		}

		emit('submit-invalid', event, validation.value);
		await revealFirstError();
	}

	function onReset(event: Event) {
		reset();
		emit('reset', event, validation.value);
	}

	async function revealFirstError() {
		if (!props.scrollToError && !props.focusFirstError) return;

		await nextTick();

		const invalidElement = formRef.value?.querySelector<HTMLElement>(
			'[data-g-validation-error="true"], [aria-invalid="true"]'
		);
		if (!invalidElement) return;

		if (props.scrollToError) {
			invalidElement.scrollIntoView({
				block: 'center',
				behavior: 'smooth'
			});
		}

		if (!props.focusFirstError) return;

		const focusableElement = invalidElement.matches(
			'input, textarea, select, button, [tabindex]:not([tabindex="-1"])'
		)
			? invalidElement
			: invalidElement.querySelector<HTMLElement>(
					'input, textarea, select, button, [tabindex]:not([tabindex="-1"])'
				);

		focusableElement?.focus({
			preventScroll: props.scrollToError
		});
	}

	defineExpose({
		$v: validation,
		validate,
		reset,
		touch,
		resetValidation
	});
</script>

<template>
	<form
		ref="formRef"
		v-bind="attrs"
		class="g-form"
		:name="props.name"
		:novalidate="props.noValidate"
		@submit="onSubmit"
		@reset="onReset">
		<slot v-bind="slotProps" />
	</form>
</template>

<style lang="scss">
	.g-form {
		display: grid;
		gap: var(--g-token-space-4);
		min-width: 0;
	}
</style>
