import { h, ref, type Directive, type VNode } from 'vue';

import GTooltip from '@/components/ui/GTooltip/GTooltip.vue';
import type { Placement } from '@floating-ui/dom';
import { mountClientComponent, type ClientComponentMount } from '@/ssr/utils';

type TooltipInstance = typeof GTooltip;

type TooltipOptions = {
	content: string;
	placement?: Placement;
	offset?: number;
};

type TooltipBinding = string | TooltipOptions;

type TooltipDirectiveInstance = {
	mount: ClientComponentMount;
	cleanup: () => void;
};

type TooltipHTMLElement = HTMLElement & {
	__tooltip__?: TooltipDirectiveInstance;
};

export const vTooltip: Directive<HTMLElement, TooltipBinding> = {
	mounted(el: TooltipHTMLElement, binding) {
		if (!binding.value) return;

		const options: TooltipOptions =
			typeof binding.value === 'string'
				? { content: binding.value }
				: binding.value;

		const tooltipRef = ref<TooltipInstance | null>(null);
		const mount = mountClientComponent({
			setup() {
				return (): VNode =>
					h(
						GTooltip,
						{
							...options,
							reference: el,
							ref: (instance) => {
								if (!instance) return;
								tooltipRef.value =
									instance as unknown as TooltipInstance;
							}
						},
						{
							reference: ({
								ref
							}: {
								ref: (el: HTMLElement | null) => void;
							}) => {
								ref(el);
								return el;
							}
						}
					);
			}
		});
		if (!mount) return;

		const show = () => {
			if (tooltipRef.value) {
				tooltipRef.value.show();
			}
		};

		const hide = () => {
			if (tooltipRef.value) {
				tooltipRef.value.hide();
			}
		};

		el.addEventListener('mouseenter', show);
		el.addEventListener('mouseleave', hide);
		el.addEventListener('focus', show);
		el.addEventListener('blur', hide);

		el.__tooltip__ = {
			mount,
			cleanup() {
				el.removeEventListener('mouseenter', show);
				el.removeEventListener('mouseleave', hide);
				el.removeEventListener('focus', show);
				el.removeEventListener('blur', hide);

				mount.unmount();
			}
		};
	},

	unmounted(el: TooltipHTMLElement) {
		el.__tooltip__?.cleanup();
	}
};

export default vTooltip;
