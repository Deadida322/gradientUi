import {
	computed,
	nextTick,
	ref,
	shallowRef,
	toRefs,
	onScopeDispose,
	type EmitFn,
	type ExtractPropTypes,
	type UnwrapNestedRefs
} from 'vue';
import { useFieldControl } from '@/use/form/fieldControl';
import { useFormContext } from '@/use/form/context';
import { useSsrId } from '@/ssr/use';
import { useSurfaceColor } from '@/use/surfaceColor';
import { makeFileProps } from './props';
import { useFileSelection } from './selection';
import { useFilePicker } from './picker';
import { useFileDrop } from './drop';
import { useFilePreview } from './preview';
import { readImageMetadata } from './imageMetadata';
import { useFileEntries } from './entries';
import { useFileFormData } from './formData';
import { defaultFileRejectionMessage } from './messages';
import type { GFileEmits, FileRejection } from './types';
export type FileControlProps = ExtractPropTypes<
	ReturnType<typeof makeFileProps>
> & { imageOnly: boolean; dropzone: boolean };
export const useFileControl = (
	props: FileControlProps,
	emit: EmitFn<GFileEmits>
) => {
	const id = useSsrId('g-file');
	const rejections = shallowRef<FileRejection[]>([]);
	const root = ref<HTMLElement | null>(null);
	const hasValue = computed(
		() =>
			props.modelValue != null &&
			(!Array.isArray(props.modelValue) || props.modelValue.length > 0)
	);
	const control = useFieldControl({ ...toRefs(props), id, hasValue });
	const { fieldProps, $v } = control;
	const error = computed(() => fieldProps.value.state === 'error');
	const selection = useFileSelection(
		{
			modelValue: () => props.modelValue,
			multiple: () => props.multiple,
			disabled: control.disabled,
			readonly: () => props.readonly,
			accept: () => props.accept,
			maxFiles: () => props.maxFiles,
			maxFileSize: () => props.maxFileSize,
			selectionMode: () => props.selectionMode,
			validationKey: () => [
				props.minImageWidth,
				props.maxImageWidth,
				props.minImageHeight,
				props.maxImageHeight
			]
		},
		{
			validate: props.imageOnly
				? async (file, signal) => {
						const { width, height } = await readImageMetadata(
							file,
							signal
						);
						if (
							(props.minImageWidth !== undefined &&
								width < props.minImageWidth) ||
							(props.maxImageWidth !== undefined &&
								width > props.maxImageWidth) ||
							(props.minImageHeight !== undefined &&
								height < props.minImageHeight) ||
							(props.maxImageHeight !== undefined &&
								height > props.maxImageHeight)
						)
							return 'dimensions';
						return undefined;
					}
				: undefined,
			change: (change) => {
				emit('update:modelValue', change.value);
				emit('change', change);
				void nextTick(control.onInputValidation);
			},
			reject: (next) => {
				rejections.value = next;
				emit('reject', next);
			}
		},
		props.imageOnly
	);
	const { files, interactive, pending } = selection;
	const form = useFormContext();
	const unregisterPending = form?.registerPending?.(pending);
	if (unregisterPending)
		onScopeDispose(() => {
			unregisterPending();
		});
	const selectFiles = (incoming: File[], source: 'picker' | 'drop') => {
		rejections.value = [];
		void selection.select(incoming, source);
	};
	const { input, open, onChange } = useFilePicker(interactive, (incoming) =>
		selectFiles(incoming, 'picker')
	);
	const { isDragging, dropAttrs } = useFileDrop(interactive, (incoming) =>
		selectFiles(incoming, 'drop')
	);
	const { previews } = useFilePreview(() =>
		props.imageOnly || props.dropzone ? files.value : []
	);
	const entries = useFileEntries(files, previews, id);
	const background = computed(() =>
		entries.value[0]?.file.type.startsWith('image/')
			? entries.value[0]
			: undefined
	);
	const backgroundFile = computed(() => background.value?.file);
	const backgroundUrl = computed(() => background.value?.url);
	const listedFiles = computed(() =>
		background.value ? entries.value.slice(1) : entries.value
	);
	const rejectedEntries = useFileEntries(
		() => rejections.value.map(({ file }) => file),
		[],
		`${id}-rejection`
	);
	const rejectionMessages = computed(() =>
		rejections.value.map((rejection, index) => ({
			...rejectedEntries.value[index],
			rejection,
			message:
				props.formatRejection?.(rejection) ??
				defaultFileRejectionMessage(rejection)
		}))
	);

	const { colorStyles } = useSurfaceColor({
		get color() {
			return props.color;
		},
		get state() {
			return fieldProps.value.state;
		}
	});
	const summary = computed(
		() =>
			files.value.map((file) => file.name).join(', ') ||
			props.placeholder ||
			props.browseLabel
	);
	const remove = (file: File) => {
		if (!interactive.value || !files.value.includes(file)) return;
		rejections.value = [];
		selection.remove(file);
		emit('remove', file);
		void nextTick(focus);
	};
	const clear = () => {
		if (!interactive.value) return;
		rejections.value = [];
		selection.clear();
		emit('clear');
		void nextTick(focus);
	};
	const removeBackground = () => {
		if (backgroundFile.value) remove(backgroundFile.value);
	};
	const onFocus = (event: FocusEvent) => {
		control.onFocus();
		emit('focus', event);
	};
	const onBlur = (event: FocusEvent) => {
		if (
			event.relatedTarget instanceof Node &&
			(event.currentTarget as HTMLElement).contains(event.relatedTarget)
		)
			return;
		control.onBlur();
		emit('blur', event);
	};
	const focus = () =>
		root.value
			?.querySelector<HTMLElement>(
				'button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])'
			)
			?.focus();
	useFileFormData(input, {
		files,
		name: () => props.name,
		disabled: control.disabled
	});

	return {
		props,
		root,
		input,
		id,
		fieldProps,
		$v,
		error,
		files,
		entries,
		interactive,
		pending,
		open,
		onChange,
		dropAttrs,
		isDragging,
		backgroundFile,
		backgroundUrl,
		listedFiles,
		rejectionMessages,
		colorStyles,
		summary,
		hasValue,
		remove,
		clear,
		removeBackground,
		onFocus,
		onBlur,
		focus
	};
};
export type FileControlView = UnwrapNestedRefs<
	ReturnType<typeof useFileControl>
>;
