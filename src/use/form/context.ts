import { inject, provide, type InjectionKey, type Ref } from 'vue';

export type GFormValidateOn = 'blur' | 'input' | 'submit' | 'lazy';

export interface GFormContext {
	disabled: Readonly<Ref<boolean>>;
	validateOn: Readonly<Ref<GFormValidateOn>>;
}

const formContextKey: InjectionKey<GFormContext> = Symbol('GradientUiForm');

export const provideFormContext = (context: GFormContext) => {
	provide(formContextKey, context);
};

export const useFormContext = () => inject(formContextKey, null);
