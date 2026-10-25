import {
	computed,
	ref,
	watch,
	getCurrentScope,
	onScopeDispose,
	toValue,
	type MaybeRefOrGetter
} from 'vue';
import type {
	FileInputValue,
	FileChange,
	FileRejection,
	FileRejectionCode,
	FileSelectionResult
} from './types';
import { acceptFiles } from './acceptance';

export interface FileSelectionOptions {
	modelValue: FileInputValue;
	multiple?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	accept?: string;
	maxFiles?: number;
	maxFileSize?: number;
	selectionMode?: 'replace' | 'append';
	validationKey?: unknown;
}
type ReactiveFileSelectionOptions = {
	[K in keyof FileSelectionOptions]: MaybeRefOrGetter<
		FileSelectionOptions[K]
	>;
};
export const useFileSelection = (
	props: ReactiveFileSelectionOptions,
	handlers: {
		change: (change: FileChange) => void;
		reject: (rejections: FileRejection[]) => void;
		validate?: (
			file: File,
			signal: AbortSignal
		) => Promise<FileRejectionCode | undefined>;
	},
	imageOnly = false
) => {
	const files = computed<File[]>(() => {
		const value = toValue(props.modelValue);
		return value == null ? [] : Array.isArray(value) ? value : [value];
	});
	const options = computed(() => ({
		multiple: Boolean(toValue(props.multiple)),
		disabled: Boolean(toValue(props.disabled)),
		readonly: Boolean(toValue(props.readonly)),
		accept: toValue(props.accept),
		maxFiles: toValue(props.maxFiles),
		maxFileSize: toValue(props.maxFileSize),
		selectionMode: toValue(props.selectionMode),
		validationKey: toValue(props.validationKey)
	}));
	const interactive = computed(
		() => !options.value.disabled && !options.value.readonly
	);
	const pending = ref(false);
	let revision = 0;
	let activeController: AbortController | undefined;
	const invalidate = () => {
		revision++;
		activeController?.abort();
		activeController = undefined;
		pending.value = false;
	};
	watch(options, invalidate, { flush: 'sync' });
	watch(
		() => [...files.value],
		() => {
			if (activeController) invalidate();
		},
		{ flush: 'sync' }
	);
	if (getCurrentScope()) onScopeDispose(invalidate);
	const commit = (next: File[], source: FileChange['source']) => {
		if (interactive.value)
			handlers.change({
				value: options.value.multiple ? next : (next[0] ?? null),
				source
			});
	};
	const select = async (
		incoming: readonly File[],
		source: 'picker' | 'drop'
	): Promise<FileSelectionResult | undefined> => {
		if (!interactive.value || !incoming.length) return;
		invalidate();
		const current = revision;
		const config = options.value;
		const request = new AbortController();
		activeController = request;
		const existing =
			config.multiple && config.selectionMode === 'append'
				? [...files.value]
				: [];
		const limit = config.multiple
			? Math.max(0, Math.floor(config.maxFiles ?? Infinity))
			: 1;
		const capacity = Math.max(0, limit - existing.length);
		const { accepted: candidates, rejected } = acceptFiles(incoming, {
			accept: config.accept,
			maxFileSize: config.maxFileSize,
			capacity: Infinity,
			imageOnly
		});
		const accepted: File[] = [];
		pending.value = Boolean(
			handlers.validate && capacity > 0 && candidates.length
		);
		for (const file of candidates) {
			if (accepted.length >= capacity) {
				rejected.push({ file, code: 'count' });
				continue;
			}
			let code: FileRejectionCode | undefined;
			if (handlers.validate) {
				try {
					code = await handlers.validate(file, request.signal);
				} catch {
					code = 'image';
				}
			}
			if (current !== revision || !interactive.value) return;
			if (code) rejected.push({ file, code });
			else accepted.push(file);
		}
		if (current !== revision) return;
		activeController = undefined;
		pending.value = false;
		const next = [...existing, ...accepted];
		const result: FileSelectionResult = {
			accepted,
			rejected,
			nextValue: accepted.length
				? config.multiple
					? next
					: (next[0] ?? null)
				: toValue(props.modelValue)
		};
		// Commit first: a reject listener may intentionally replace or clear the model.
		if (accepted.length) commit(next, source);
		if (current === revision && rejected.length) handlers.reject(rejected);
		return result;
	};
	const remove = (file: File) => {
		if (!interactive.value || !files.value.includes(file)) return;
		invalidate();
		commit(
			files.value.filter((value) => value !== file),
			'remove'
		);
	};
	const clear = () => {
		if (interactive.value) {
			invalidate();
			commit([], 'clear');
		}
	};
	return { files, interactive, pending, select, remove, clear };
};
