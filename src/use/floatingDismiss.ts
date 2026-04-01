import {
	onMounted,
	onBeforeUnmount,
	type Ref,
	type ComponentPublicInstance
} from 'vue';
import type { MaybeElement, ReferenceElement } from '@floating-ui/vue';

export interface UseDismissOptions {
	open: Ref<boolean>;
	reference: Ref<MaybeElement<ReferenceElement> | null>;
	floating: Ref<MaybeElement<ReferenceElement> | null>;
	escapeKey?: boolean;
	outsideClick?: boolean;
}

function isDOMElement(el: unknown): el is HTMLElement {
	return el instanceof HTMLElement;
}

function isVueComponent(
	el: unknown
): el is ComponentPublicInstance & { $el: HTMLElement } {
	return !!el && typeof el === 'object' && '$el' in el;
}

function getElement(
	el: MaybeElement<ReferenceElement> | null
): HTMLElement | null {
	if (!el) return null;
	if (isDOMElement(el)) return el;
	if (isVueComponent(el)) return el.$el;
	return null;
}

export function useDismiss({
	open,
	reference,
	floating,
	escapeKey = true,
	outsideClick = true
}: UseDismissOptions) {
	if (!open || !reference || !floating) {
		throw new Error(
			'useDismiss: open, reference, and floating are required'
		);
	}

	const onClickOutside = (event: MouseEvent) => {
		if (!outsideClick) return;
		const refNode = getElement(reference.value);
		const floatNode = getElement(floating.value);
		const target = event.target as Node;

		if (
			refNode &&
			floatNode &&
			!refNode.contains(target) &&
			!floatNode.contains(target)
		) {
			open.value = false;
		}
	};

	const onEscape = (event: KeyboardEvent) => {
		if (!escapeKey) return;
		if (event.key === 'Escape') {
			open.value = false;
		}
	};

	onMounted(() => {
		document.addEventListener('click', onClickOutside);
		document.addEventListener('keydown', onEscape);
	});

	onBeforeUnmount(() => {
		document.removeEventListener('click', onClickOutside);
		document.removeEventListener('keydown', onEscape);
	});
}
