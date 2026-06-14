import { computed, type ComputedRef } from 'vue';
import { propsFactory } from '@/utils/propsFactory';

export interface TagNameProps {
	tag?: string;
	href?: string;
	target?: string;
	rel?: string;
	disabled?: boolean;
}

export const makeTagNameProps = propsFactory({
	tag: String,
	href: String,
	target: String,
	rel: String
});

export function useAsLink(props: TagNameProps) {
	const isLink = computed(() => Boolean(props.href) && !props.disabled);
	const linkAttrs = computed(() =>
		isLink.value
			? {
					href: props.href,
					target: props.target,
					rel:
						props.rel ??
						(props.target === '_blank'
							? 'noopener noreferrer'
							: undefined)
				}
			: {}
	);

	return {
		isLink,
		linkAttrs
	};
}

export function useTagName(
	props: TagNameProps,
	fallbackTag: string
): {
	tagName: ComputedRef<string>;
	tagAttrs: ComputedRef<Record<string, unknown>>;
} {
	const { isLink, linkAttrs } = useAsLink(props);
	const tagName = computed(
		() => props.tag ?? (isLink.value ? 'a' : fallbackTag)
	);
	const rendersLink = computed(() => tagName.value === 'a' && isLink.value);
	const tagAttrs = computed<Record<string, unknown>>(() =>
		rendersLink.value
			? linkAttrs.value
			: {
					type: tagName.value === 'button' ? 'button' : undefined,
					disabled:
						tagName.value === 'button' ? props.disabled : undefined
				}
	);

	return {
		tagName,
		tagAttrs
	};
}
