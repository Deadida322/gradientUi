import { propsFactory } from '@/utils/propsFactory';
import type { GFormValidateOn } from '@/use/form/context';
import type { Validatable, ValidationState } from 'gib-validate';
import type { ExtractPropTypes, PropType } from 'vue';

export type GFormValidationState = ValidationState<Record<string, Validatable>>;

export interface GFormError {
	path: string;
	message: string;
	messages: string[];
}

export interface GFormSlotProps {
	$v: GFormValidationState;
	valid: boolean;
	invalid: boolean;
	pending: boolean;
	dirty: boolean;
	error: boolean;
	errors: GFormError[];
	errorCount: number;
	firstError?: GFormError;
	disabled: boolean;
	validate: () => Promise<boolean>;
	reset: () => void;
	touch: () => void;
	resetValidation: () => void;
}

export interface GFormSlots {
	default?: (props: GFormSlotProps) => unknown;
}

export type GFormSubmitEventPayload = [
	event: SubmitEvent,
	validation: GFormValidationState
];

export type GFormResetEventPayload = [
	event: Event,
	validation: GFormValidationState
];

export interface GFormEmits {
	submit: GFormSubmitEventPayload;
	'submit-valid': GFormSubmitEventPayload;
	'submit-invalid': GFormSubmitEventPayload;
	reset: GFormResetEventPayload;
}

export const makeFormProps = propsFactory({
	name: String,
	preventDefault: {
		type: Boolean as PropType<boolean>,
		default: true
	},
	validateOnSubmit: {
		type: Boolean as PropType<boolean>,
		default: true
	},
	validateOn: {
		type: String as PropType<GFormValidateOn>,
		default: 'blur'
	},
	disabled: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	scrollToError: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	focusFirstError: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	noValidate: {
		type: Boolean as PropType<boolean>,
		default: true
	}
});

export type GFormProps = ExtractPropTypes<ReturnType<typeof makeFormProps>>;
