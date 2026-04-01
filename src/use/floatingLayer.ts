import {
	useFloating,
	offset as offsetMiddleware,
	flip as flipMiddleware,
	shift as shiftMiddleware,
	size,
	autoUpdate,
	type Middleware,
	type ReferenceElement,
	type MaybeElement
} from '@floating-ui/vue';
import { computed, ref, type Ref } from 'vue';
import type { GFloatingProps } from './floating';

export const useFloatingLayer = (props: GFloatingProps) => {
	const reference: Ref<MaybeElement<ReferenceElement>> = ref(null);
	const floating = ref<HTMLElement | null>(null);

	const middleware = computed(() => {
		const m: Middleware[] = [];

		if (props.offset) {
			m.push(offsetMiddleware(props.offset));
		}

		if (props.flip) {
			m.push(flipMiddleware());
		}

		if (props.shift) {
			m.push(
				shiftMiddleware({
					padding: 4,
					crossAxis: true
				})
			);
		}

		if (props.sameWidth) {
			m.push(
				size({
					apply({ rects, elements }) {
						Object.assign(elements.floating.style, {
							width: `${rects.reference.width}px`
						});
					}
				})
			);
		}

		return m;
	});

	const { x, y, strategy, placement, update } = useFloating(
		reference,
		floating,
		{
			...props,
			middleware,
			whileElementsMounted: autoUpdate
		}
	);

	return {
		reference,
		floating,
		x,
		y,
		strategy,
		placement,
		update
	};
};
