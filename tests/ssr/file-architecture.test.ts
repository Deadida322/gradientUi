import { effectScope, nextTick, reactive, ref } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import {
	useFileSelection,
	type FileSelectionOptions
} from '../../src/use/file/selection';
import { useFileEntries } from '../../src/use/file/entries';
import { createFormPendingTasks } from '../../src/use/form/pending';

const file = (name: string) => new File(['x'], name, { type: 'image/png' });
const deferred = () => {
	let resolve!: (value: undefined) => void;
	const promise = new Promise<undefined>((done) => {
		resolve = done;
	});
	return { promise, resolve: () => resolve(undefined) };
};

describe('file selection transactions', () => {
	it('preserves a replacement made by a rejection listener', async () => {
		const scope = effectScope();
		const replacement = file('replacement.png');
		const props = reactive<FileSelectionOptions>({
			modelValue: null,
			accept: '.png'
		});
		const selection = scope.run(() =>
			useFileSelection(props, {
				change: ({ value }) => {
					props.modelValue = value;
				},
				reject: () => {
					props.modelValue = replacement;
				}
			})
		)!;
		const accepted = file('good.png');
		const result = await selection.select(
			[accepted, file('bad.txt')],
			'drop'
		);
		expect(result?.accepted).toEqual([accepted]);
		expect(result?.nextValue).toBe(accepted);
		expect(props.modelValue).toBe(replacement);
		scope.stop();
	});

	it.each(['accept', 'maxFiles', 'maxFileSize', 'validationKey'] as const)(
		'cancels pending work when %s changes',
		async (key) => {
			const scope = effectScope();
			const props = reactive<FileSelectionOptions>({
				modelValue: null,
				multiple: true
			});
			const check = deferred();
			let signal: AbortSignal | undefined;
			const change = vi.fn();
			const selection = scope.run(() =>
				useFileSelection(props, {
					change,
					reject: vi.fn(),
					validate: (_, nextSignal) => {
						signal = nextSignal;
						return check.promise;
					}
				})
			)!;
			const result = selection.select([file('x.png')], 'picker');
			expect(selection.pending.value).toBe(true);
			Object.assign(props, { [key]: key === 'accept' ? '.txt' : 1 });
			expect(signal?.aborted).toBe(true);
			expect(selection.pending.value).toBe(false);
			check.resolve();
			expect(await result).toBeUndefined();
			expect(change).not.toHaveBeenCalled();
			scope.stop();
		}
	);

	it('checks count before decoding and does not consume capacity for invalid images', async () => {
		const scope = effectScope();
		const props = reactive<FileSelectionOptions>({
			modelValue: [],
			multiple: true,
			maxFiles: 1
		});
		const validate = vi.fn(async (value: File) =>
			value.name === 'bad.png' ? ('image' as const) : undefined
		);
		const selection = scope.run(() =>
			useFileSelection(props, {
				change: ({ value }) => {
					props.modelValue = value;
				},
				reject: vi.fn(),
				validate
			})
		)!;
		const result = await selection.select(
			[file('bad.png'), file('good.png'), file('extra.png')],
			'drop'
		);
		expect(validate).toHaveBeenCalledTimes(2);
		expect(result?.rejected.map(({ code }) => code)).toEqual([
			'image',
			'count'
		]);
		props.selectionMode = 'append';
		await selection.select([file('more.png')], 'picker');
		expect(validate).toHaveBeenCalledTimes(2);
		scope.stop();
	});

	it('suppresses stale rejections when a change listener starts another selection', async () => {
		const scope = effectScope();
		const props = reactive<FileSelectionOptions>({
			modelValue: null,
			accept: '.png'
		});
		const reject = vi.fn();
		const replacement = file('replacement.png');
		const selection = scope.run(() =>
			useFileSelection(props, {
				change: ({ value }) => {
					props.modelValue = value;
					if (value !== replacement)
						void selection.select([replacement], 'picker');
				},
				reject
			})
		)!;
		await selection.select([file('first.png'), file('bad.txt')], 'drop');
		expect(props.modelValue).toBe(replacement);
		expect(reject).not.toHaveBeenCalled();
		scope.stop();
	});
});

describe('file presentation identities', () => {
	it('keeps keys across reorder and uses distinct keys for duplicate references', () => {
		const first = file('same.png');
		const second = file('same.png');
		const files = ref([first, second, first]);
		const entries = useFileEntries(files, [], 'test');
		const keys = entries.value.map(({ id }) => id);
		expect(new Set(keys).size).toBe(3);
		files.value = [second, first];
		expect(entries.value.map(({ id }) => id)).toEqual([keys[1], keys[0]]);
	});
});

describe('form pending tasks', () => {
	it('also waits for a task started while a prior task settles', async () => {
		const registry = createFormPendingTasks();
		const first = ref(true);
		registry.registerPending(first);
		const done = vi.fn();
		const waiting = registry.waitForPending().then(done);
		first.value = false;
		const second = ref(true);
		registry.registerPending(second);
		await nextTick();
		expect(done).not.toHaveBeenCalled();
		second.value = false;
		await waiting;
		expect(done).toHaveBeenCalledOnce();
	});

	it('waits for every registered task and releases unmounted controls', async () => {
		const registry = createFormPendingTasks();
		const first = ref(true);
		const second = ref(true);
		registry.registerPending(first);
		const unregister = registry.registerPending(second);
		const done = vi.fn();
		const waiting = registry.waitForPending().then(done);
		first.value = false;
		await nextTick();
		expect(done).not.toHaveBeenCalled();
		unregister();
		await waiting;
		expect(done).toHaveBeenCalledOnce();
		expect(registry.pending.value).toBe(false);
	});
});
