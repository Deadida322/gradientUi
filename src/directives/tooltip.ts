import {
	createApp,
	h,
	ref,
	type Directive,
	type App,
	type Ref,
	type VNode
} from 'vue';

import GTooltip from '@/components/ui/GTooltip/GTooltip.vue';
import type { Placement } from '@floating-ui/dom';

type TooltipInstance = typeof GTooltip;

type TooltipOptions = {
	content: string;
	placement?: Placement;
	offset?: number;
};

type TooltipBinding = string | TooltipOptions;

type TooltipDirectiveInstance = {
	app: App;
	container: HTMLElement;
	open: Ref<boolean>;
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

		const open = ref(false);

		const container = document.createElement('div');
		document.body.appendChild(container);

		const tooltipRef = ref<TooltipInstance | null>(null);

		const app = createApp({
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

		app.mount(container);

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
			app,
			container,
			open,
			cleanup() {
				el.removeEventListener('mouseenter', show);
				el.removeEventListener('mouseleave', hide);
				el.removeEventListener('focus', show);
				el.removeEventListener('blur', hide);

				app.unmount();
				container.remove();
			}
		};
	},

	unmounted(el: TooltipHTMLElement) {
		el.__tooltip__?.cleanup();
	}
};

export default vTooltip;
