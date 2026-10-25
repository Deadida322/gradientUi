import { createSSRApp, effectScope, h, reactive } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { describe, expect, it, vi } from 'vitest';
import {
	GFileInput,
	GImageInput,
	GFileDropzone,
	GImageDropzone,
	createGradientUI
} from '../../dist/index.mjs';
import {
	useFileSelection,
	type FileSelectionOptions
} from '../../src/use/file/selection';
import { matchesFileAccept } from '../../src/use/file/acceptance';
import { useFileDrop } from '../../src/use/file/drop';
import type { FileChange, GFileSlotState } from '../../src/use/file/types';

const file = (name: string, type = 'text/plain', size = 2) =>
	new File(['x'.repeat(size)], name, { type });
const fixture = (
	options: Partial<FileSelectionOptions> = {},
	validate?: (file: File, signal: AbortSignal) => Promise<'image' | undefined>
) => {
	const props = reactive<FileSelectionOptions>({
		modelValue: null,
		...options
	});
	const change = vi.fn((next: FileChange) => {
		props.modelValue = next.value;
	});
	const reject = vi.fn();
	const scope = effectScope();
	const controller = scope.run(() =>
		useFileSelection(props, { change, reject, validate })
	)!;
	return { props, change, reject, controller, stop: () => scope.stop() };
};

describe('file selection pipeline', () => {
	it('matches case-insensitive extensions, exact MIME and MIME wildcards', () => {
		expect(matchesFileAccept(file('REPORT.PDF', ''), '.pdf')).toBe(true);
		expect(matchesFileAccept(file('x.png', 'image/png'), 'image/*')).toBe(
			true
		);
		expect(matchesFileAccept(file('x.txt'), 'application/pdf')).toBe(false);
	});
	it('preserves a previous single value for a rejected replacement or cancelled picker', async () => {
		const previous = file('previous.txt');
		const f = fixture({ modelValue: previous, maxFileSize: 2 });
		await f.controller.select(
			[file('large.txt', 'text/plain', 3)],
			'picker'
		);
		await f.controller.select([], 'picker');
		expect(f.props.modelValue).toBe(previous);
		expect(f.change).not.toHaveBeenCalled();
		expect(f.reject.mock.calls[0][0][0].code).toBe('size');
		f.stop();
	});
	it('enforces total count in append mode and retains accepted items in a mixed batch', async () => {
		const previous = file('old.txt');
		const added = file('new.txt');
		const f = fixture({
			modelValue: [previous],
			multiple: true,
			selectionMode: 'append',
			maxFiles: 2,
			accept: '.txt'
		});
		await f.controller.select(
			[file('bad.pdf'), added, file('extra.txt')],
			'drop'
		);
		expect(f.props.modelValue).toEqual([previous, added]);
		expect(
			f.reject.mock.calls[0][0].map((item: { code: string }) => item.code)
		).toEqual(['type', 'count']);
		expect(f.change.mock.calls[0][0].source).toBe('drop');
		f.stop();
	});
	it.each(['disabled', 'readonly'] as const)(
		'blocks every mutation when %s',
		async (key) => {
			const previous = file('old.txt');
			const f = fixture({ modelValue: previous, [key]: true });
			await f.controller.select([file('new.txt')], 'drop');
			f.controller.remove(previous);
			f.controller.clear();
			expect(f.change).not.toHaveBeenCalled();
			f.stop();
		}
	);
	it('clears to null in single mode and an empty array in multiple mode', () => {
		for (const multiple of [false, true]) {
			const f = fixture({ modelValue: file('old.txt'), multiple });
			f.controller.clear();
			expect(f.props.modelValue).toEqual(multiple ? [] : null);
			f.stop();
		}
	});
	it('ignores stale asynchronous validation after a newer selection', async () => {
		let release: (() => void) | undefined;
		const slow = file('slow.png', 'image/png');
		const fast = file('fast.png', 'image/png');
		const f = fixture({}, async (value) => {
			if (value === slow)
				await new Promise<void>((resolve) => {
					release = resolve;
				});
			return undefined;
		});
		const pending = f.controller.select([slow], 'picker');
		await f.controller.select([fast], 'picker');
		release?.();
		await pending;
		expect(f.props.modelValue).toBe(fast);
		expect(f.controller.pending.value).toBe(false);
		f.stop();
	});
	it('does not let asynchronous validation resurrect a cleared selection', async () => {
		let release: (() => void) | undefined;
		const f = fixture({}, async () => {
			await new Promise<void>((resolve) => {
				release = resolve;
			});
			return undefined;
		});
		const pending = f.controller.select(
			[file('x.png', 'image/png')],
			'picker'
		);
		f.controller.clear();
		release?.();
		await pending;
		expect(f.props.modelValue).toBeNull();
		expect(f.controller.pending.value).toBe(false);
		f.stop();
	});
	it('retains drag state while crossing nested elements and suppresses disabled drops', () => {
		const active = reactive({ value: true });
		const onFiles = vi.fn();
		const { isDragging, dropAttrs } = useFileDrop(
			() => active.value,
			onFiles
		);
		const event = () =>
			Object.assign(new Event('drop', { cancelable: true }), {
				dataTransfer: { types: ['Files'], files: [file('x.txt')] }
			}) as unknown as DragEvent;
		dropAttrs.onDragenter(event());
		dropAttrs.onDragenter(event());
		dropAttrs.onDragleave();
		expect(isDragging.value).toBe(true);
		active.value = false;
		dropAttrs.onDrop(event());
		expect(onFiles).not.toHaveBeenCalled();
		expect(isDragging.value).toBe(false);
	});
});

describe('file components SSR', () => {
	it.each([GFileDropzone, GImageDropzone])(
		'passes error state to the browse button and scoped slots',
		async (component) => {
			const render = async (slots = {}) => {
				const app = createSSRApp({
					render: () => h(component, { state: 'error' }, slots)
				});
				app.use(createGradientUI());
				return renderToString(app);
			};
			expect(await render()).toContain('g-button_error');
			for (const name of ['trigger', 'icon']) {
				const html = await render({
					[name]: ({ error, state }: GFileSlotState) =>
						h('span', { 'data-error': error, 'data-state': state })
				});
				expect(html).toContain('data-error="true"');
				expect(html).toContain('data-state="error"');
			}
		}
	);
	it('renders internal themed file items with a text remove button', async () => {
		const app = createSSRApp({
			render: () => h(GImageInput, { modelValue: file('report.txt') })
		});
		app.use(createGradientUI());
		const html = await renderToString(app);
		expect(html).toContain('g-file-item');
		expect(html).toContain('g-button_text');
		expect(html).toContain('Remove file: report.txt');
		expect(html).toMatch(/<button[^>]*type="button"/);
	});
	it.each([GFileInput, GImageInput, GFileDropzone, GImageDropzone])(
		'renders native picker and accessible browse control without browser APIs',
		async (component) => {
			const app = createSSRApp({
				render: () => h(component, { label: 'Attachment' })
			});
			app.use(createGradientUI());
			const html = await renderToString(app);
			expect(html).toContain('type="file"');
			expect(html).toContain('type="button"');
			expect(html).not.toContain('blob:');
		}
	);
});
