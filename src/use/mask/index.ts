import type { MaybeRefOrGetter } from 'vue';
import { computed, toValue } from 'vue';

export interface GMaskToken {
	pattern: RegExp;
	transform?: (value: string) => string;
}

export type GMaskTokens = Record<string, GMaskToken>;
export type GMaskValue = string | string[] | undefined;

export interface GMaskOptions {
	mask: MaybeRefOrGetter<GMaskValue>;
	tokens?: MaybeRefOrGetter<GMaskTokens | undefined>;
	returnMaskedValue?: MaybeRefOrGetter<boolean | undefined>;
}

export const defaultMaskTokens: GMaskTokens = {
	'#': {
		pattern: /\d/
	},
	X: {
		pattern: /[0-9a-zа-я]/i
	},
	S: {
		pattern: /[a-zа-я]/i
	},
	A: {
		pattern: /[a-zа-я]/i,
		transform: (value) => value.toLocaleUpperCase()
	},
	a: {
		pattern: /[a-zа-я]/i,
		transform: (value) => value.toLocaleLowerCase()
	}
};

function getTokenEntries(mask: string, tokens: GMaskTokens) {
	return [...mask].filter((char) => tokens[char]);
}

function stripMask(value: string, tokens: GMaskTokens) {
	return [...value]
		.filter((char) =>
			Object.values(tokens).some((token) => token.pattern.test(char))
		)
		.join('');
}

function applyMaskPattern(
	value: string,
	mask: string,
	tokens: GMaskTokens,
	fillLiterals = true
) {
	const chars = [...stripMask(value, tokens)];
	const output: string[] = [];
	let valueIndex = 0;

	for (const maskChar of mask) {
		const token = tokens[maskChar];

		if (!token) {
			if (fillLiterals && valueIndex < chars.length) {
				output.push(maskChar);
			}

			continue;
		}

		while (valueIndex < chars.length) {
			const char = chars[valueIndex];
			valueIndex += 1;

			if (!token.pattern.test(char)) continue;

			output.push(token.transform?.(char) ?? char);
			break;
		}

		if (valueIndex >= chars.length && output.length) {
			break;
		}
	}

	return output.join('');
}

function resolveMask(value: string, mask: GMaskValue, tokens: GMaskTokens) {
	if (!Array.isArray(mask)) return mask;

	const rawValue = stripMask(value, tokens);

	return (
		mask.find((maskPattern) => {
			const tokenCount = getTokenEntries(maskPattern, tokens).length;
			return rawValue.length <= tokenCount;
		}) ?? mask.at(-1)
	);
}

export function applyMask(
	value: string,
	mask: GMaskValue,
	tokens: GMaskTokens = defaultMaskTokens
) {
	const resolvedMask = resolveMask(value, mask, tokens);

	if (!resolvedMask) return value;

	return applyMaskPattern(value, resolvedMask, tokens);
}

export function unmaskValue(
	value: string,
	tokens: GMaskTokens = defaultMaskTokens
) {
	return stripMask(value, tokens);
}

export function useMask(options: GMaskOptions) {
	const tokens = computed(() => ({
		...defaultMaskTokens,
		...(toValue(options.tokens) ?? {})
	}));
	const isMasked = computed(() => Boolean(toValue(options.mask)));
	const shouldReturnMaskedValue = computed(
		() => toValue(options.returnMaskedValue) ?? true
	);

	function format(value: string) {
		return applyMask(value, toValue(options.mask), tokens.value);
	}

	function toModelValue(value: string) {
		if (!isMasked.value) return value;

		const maskedValue = format(value);
		return shouldReturnMaskedValue.value
			? maskedValue
			: unmaskValue(maskedValue, tokens.value);
	}

	function toDisplayValue(value: string) {
		if (!isMasked.value) return value;

		return format(value);
	}

	return {
		isMasked,
		tokens,
		format,
		toModelValue,
		toDisplayValue
	};
}
