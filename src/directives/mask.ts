import type { Directive, DirectiveBinding } from 'vue';
import {
	applyMask,
	defaultMaskTokens,
	type GMaskTokens,
	type GMaskValue
} from '@/use/mask';

export interface MaskDirectiveOptions {
	mask: GMaskValue;
	tokens?: GMaskTokens;
}

export type MaskBindingValue = GMaskValue | MaskDirectiveOptions;

interface MaskedElement extends HTMLElement {
	_gMaskCleanup?: () => void;
	_gMaskFormatting?: boolean;
}

function resolveBinding(value: MaskBindingValue): MaskDirectiveOptions {
	if (
		typeof value === 'string' ||
		Array.isArray(value) ||
		value === undefined
	) {
		return {
			mask: value
		};
	}

	return value;
}

function getControl(el: HTMLElement) {
	if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
		return el;
	}

	return el.querySelector('input, textarea') as
		| HTMLInputElement
		| HTMLTextAreaElement
		| null;
}

function formatElement(
	el: MaskedElement,
	binding: DirectiveBinding<MaskBindingValue>
) {
	const control = getControl(el);
	if (!control) return;

	const options = resolveBinding(binding.value);
	const tokens = {
		...defaultMaskTokens,
		...(options.tokens ?? {})
	};
	const maskedValue = applyMask(control.value, options.mask, tokens);

	if (control.value === maskedValue) return;

	control.value = maskedValue;
}

function bindMask(
	el: MaskedElement,
	binding: DirectiveBinding<MaskBindingValue>
) {
	const control = getControl(el);
	if (!control) return;

	const onInput = () => {
		if (el._gMaskFormatting) return;

		el._gMaskFormatting = true;
		formatElement(el, binding);
		control.dispatchEvent(new Event('input', { bubbles: true }));
		el._gMaskFormatting = false;
	};

	control.addEventListener('input', onInput);
	el._gMaskCleanup = () => {
		control.removeEventListener('input', onInput);
	};

	formatElement(el, binding);
}

export const vMask: Directive<MaskedElement, MaskBindingValue> = {
	mounted: bindMask,
	updated(el, binding) {
		formatElement(el, binding);
	},
	beforeUnmount(el) {
		el._gMaskCleanup?.();
		delete el._gMaskCleanup;
		delete el._gMaskFormatting;
	}
};

export default vMask;
