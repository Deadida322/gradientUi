import { toValue, type MaybeRefOrGetter, type Ref } from 'vue';
import { onClientMounted } from '@/ssr/use';

export const useFileFormData = (
	input: Ref<HTMLInputElement | null>,
	options: {
		files: MaybeRefOrGetter<readonly File[]>;
		name: MaybeRefOrGetter<string | undefined>;
		disabled: MaybeRefOrGetter<boolean>;
	}
) => {
	onClientMounted(({ document }) => {
		const onFormData = (event: Event) => {
			const name = toValue(options.name);
			if (
				!name ||
				toValue(options.disabled) ||
				event.target !== input.value?.form
			)
				return;
			for (const file of toValue(options.files))
				(event as FormDataEvent).formData.append(name, file);
		};
		// Resolve input.form for each event, including external forms and reparenting.
		document.addEventListener('formdata', onFormData, true);
		return () => document.removeEventListener('formdata', onFormData, true);
	});
};
