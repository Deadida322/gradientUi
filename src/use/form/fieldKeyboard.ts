import { toValue, type MaybeRefOrGetter } from 'vue';

type KeyboardGuard = MaybeRefOrGetter<boolean | undefined>;

export interface FieldKeyboardHandler {
	key: string | readonly string[];
	when?: KeyboardGuard | ((event: KeyboardEvent) => boolean);
	preventDefault?: boolean | ((event: KeyboardEvent) => boolean);
	stopPropagation?: boolean | ((event: KeyboardEvent) => boolean);
	handler: (event: KeyboardEvent) => void;
}

export interface UseFieldKeyboardOptions {
	disabled?: KeyboardGuard;
	readonly?: KeyboardGuard;
	ignoreComposing?: boolean;
	handlers: MaybeRefOrGetter<readonly FieldKeyboardHandler[]>;
}

const shouldRun = (
	value: FieldKeyboardHandler['when'],
	event: KeyboardEvent
) => {
	if (typeof value === 'function') return value(event);

	return value === undefined || Boolean(toValue(value));
};

const shouldApply = (
	value: FieldKeyboardHandler['preventDefault'],
	event: KeyboardEvent
) => (typeof value === 'function' ? value(event) : Boolean(value));

const matchesKey = (handler: FieldKeyboardHandler, key: string) =>
	Array.isArray(handler.key)
		? handler.key.includes(key)
		: handler.key === key;

export function useFieldKeyboard(options: UseFieldKeyboardOptions) {
	function handleKeydown(event: KeyboardEvent) {
		if (toValue(options.disabled) || toValue(options.readonly)) return;
		if (options.ignoreComposing !== false && event.isComposing) return;

		const handler = toValue(options.handlers).find(
			(item) => matchesKey(item, event.key) && shouldRun(item.when, event)
		);

		if (!handler) return;

		if (shouldApply(handler.preventDefault, event)) {
			event.preventDefault();
		}

		if (shouldApply(handler.stopPropagation, event)) {
			event.stopPropagation();
		}

		handler.handler(event);
	}

	return {
		handleKeydown
	};
}
