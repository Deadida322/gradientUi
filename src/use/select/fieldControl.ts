import { computed, toValue } from 'vue';
import { useFormControl } from '@/use/form/control';
import type { MdiIcon, Sizes } from '@/types/CommonTypes';
import type { GGradienStates } from '@/components/ui/GGradient/types';
import type { GColor } from '@/use/color';
import type { GlassProps } from '@/use/glass';
import type { ValidationRule } from 'gib-validate';
import type { MaybeRefOrGetter } from 'vue';
import type { GFieldVariant } from '@/use/form/props';
import type { StringeredNumber } from '@/types/CommonTypes';

export interface UseSelectFieldControlOptions<TModel> {
	id: MaybeRefOrGetter<string>;
	modelValue: MaybeRefOrGetter<TModel>;
	rules: MaybeRefOrGetter<ValidationRule<TModel>[] | undefined>;
	message: MaybeRefOrGetter<string | undefined>;
	disabled?: MaybeRefOrGetter<boolean | undefined>;
	label?: MaybeRefOrGetter<string | undefined>;
	color?: MaybeRefOrGetter<GColor | undefined>;
	variant?: MaybeRefOrGetter<GFieldVariant | undefined>;
	backdropBlur?: MaybeRefOrGetter<GlassProps['backdropBlur']>;
	borderWidth?: MaybeRefOrGetter<StringeredNumber | undefined>;
	state?: MaybeRefOrGetter<GGradienStates | undefined>;
	clearable?: MaybeRefOrGetter<boolean | undefined>;
	size?: MaybeRefOrGetter<Sizes | undefined>;
	focused?: MaybeRefOrGetter<boolean | undefined>;
	hasValue: MaybeRefOrGetter<boolean>;
	prependIcon?: MaybeRefOrGetter<MdiIcon | undefined>;
	appendIcon?: MaybeRefOrGetter<MdiIcon | undefined>;
	multiline?: MaybeRefOrGetter<boolean | undefined>;
}

export function useSelectFieldControl<TModel>(
	options: UseSelectFieldControlOptions<TModel>
) {
	const control = useFormControl<TModel>({
		modelValue: options.modelValue,
		rules: options.rules,
		message: options.message,
		disabled: options.disabled
	});
	const fieldProps = computed(() => ({
		id: toValue(options.id),
		label: toValue(options.label),
		color: toValue(options.color),
		variant: toValue(options.variant),
		backdropBlur: toValue(options.backdropBlur),
		borderWidth: toValue(options.borderWidth),
		state: control.hasValidationError.value
			? 'error'
			: toValue(options.state),
		disabled: control.disabled.value,
		clearable: toValue(options.clearable),
		size: toValue(options.size),
		focused: control.focused.value || Boolean(toValue(options.focused)),
		message: control.computedMessage.value,
		prependIcon: toValue(options.prependIcon),
		appendIcon: toValue(options.appendIcon),
		hasValue: toValue(options.hasValue),
		multiline: Boolean(toValue(options.multiline))
	}));

	return {
		...control,
		fieldProps
	};
}
