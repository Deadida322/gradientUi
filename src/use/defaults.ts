import {
	computed,
	defineComponent,
	h,
	inject,
	provide,
	ref,
	type App,
	type Component,
	type InjectionKey,
	type Ref
} from 'vue';

export type ComponentDefaults = Record<string, unknown>;

export interface GradientUIDefaults {
	global?: ComponentDefaults;
	components?: Record<string, ComponentDefaults>;
	[componentName: string]:
		| ComponentDefaults
		| Record<string, ComponentDefaults>
		| undefined;
}

const DefaultsSymbol: InjectionKey<Ref<GradientUIDefaults>> =
	Symbol('gradient-defaults');

function isComponentDefaults(value: unknown): value is ComponentDefaults {
	return value != null && typeof value === 'object' && !Array.isArray(value);
}

export function createDefaults(defaults: GradientUIDefaults = {}) {
	return ref(defaults) as Ref<GradientUIDefaults>;
}

export function provideDefaults(defaults: GradientUIDefaults = {}) {
	const defaultsRef = createDefaults(defaults);
	provide(DefaultsSymbol, defaultsRef);
	return defaultsRef;
}

export function installDefaults(app: App, defaults: GradientUIDefaults = {}) {
	app.provide(DefaultsSymbol, createDefaults(defaults));
}

export function useComponentDefaults(componentName: string) {
	const defaults = inject(DefaultsSymbol, createDefaults());

	return computed<ComponentDefaults>(() => {
		const componentDefaults = defaults.value.components?.[componentName];
		const directDefaults = defaults.value[componentName];

		return {
			...(defaults.value.global ?? {}),
			...(componentDefaults ?? {}),
			...(isComponentDefaults(directDefaults) ? directDefaults : {})
		};
	});
}

export function withGradientDefaults(
	componentName: string,
	component: Component
): Component {
	return defineComponent({
		name: componentName,
		inheritAttrs: false,
		setup(_props, { attrs, slots }) {
			const defaults = useComponentDefaults(componentName);

			return () =>
				h(
					component,
					{
						...defaults.value,
						...attrs
					},
					slots
				);
		}
	});
}
