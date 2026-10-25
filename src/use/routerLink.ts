import {
	computed,
	getCurrentInstance,
	type Component,
	type PropType
} from 'vue';
import { useTagName, type TagNameProps } from '@/use/tagName';
import { propsFactory } from '@/utils/propsFactory';

export type RouterTo =
	| string
	| {
			path?: string;
			name?: string | symbol;
			params?: Record<string, unknown>;
			query?: Record<string, unknown>;
			hash?: string;
	  };

export const useOptionalRouterLink = (): Component | string | undefined => {
	const instance = getCurrentInstance();

	return instance?.appContext.components.RouterLink;
};

export const getRouterFallbackHref = (to: RouterTo | undefined) => {
	if (typeof to === 'string') return to;

	return undefined;
};

export const makeRouterLinkProps = propsFactory({
	to: [String, Object] as PropType<RouterTo>
});

export const useLinkTagName = (
	props: TagNameProps & { to?: RouterTo },
	fallbackTag: string
) => {
	const RouterLink = useOptionalRouterLink();
	const isRouterLink = computed(
		() =>
			!props.tag &&
			Boolean(RouterLink) &&
			props.to != null &&
			!props.disabled
	);
	const { tagName, tagAttrs } = useTagName(
		{
			get tag() {
				return props.tag;
			},
			get href() {
				return props.href ?? getRouterFallbackHref(props.to);
			},
			get target() {
				return props.target;
			},
			get rel() {
				return props.rel;
			},
			get disabled() {
				return props.disabled;
			}
		},
		fallbackTag
	);

	return {
		tagName: computed(() =>
			isRouterLink.value ? RouterLink : tagName.value
		),
		tagAttrs: computed(() =>
			isRouterLink.value
				? {
						to: props.to,
						target: props.target,
						rel:
							props.rel ??
							(props.target === '_blank'
								? 'noopener noreferrer'
								: undefined)
					}
				: tagAttrs.value
		)
	};
};
