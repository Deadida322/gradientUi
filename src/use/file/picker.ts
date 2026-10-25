import { ref, toValue, type MaybeRefOrGetter } from 'vue';

export const useFilePicker = (
	interactive: MaybeRefOrGetter<boolean>,
	onFiles: (files: File[]) => void
) => {
	const input = ref<HTMLInputElement | null>(null);
	const open = () => {
		if (toValue(interactive)) input.value?.click();
	};
	const onChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const files = Array.from(target.files ?? []);
		// The model owns selection. Reset the native control for same-file reselection.
		target.value = '';
		if (toValue(interactive) && files.length) onFiles(files);
	};
	return { input, open, onChange };
};
