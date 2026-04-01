import type { IfAny } from '@vueuse/core';
import type { ComponentObjectPropsOptions, PropType, Prop } from 'vue';

type PartialKeys<T> = { [P in keyof T]?: unknown };

type MergeTypeDefault<
	Prop,
	Default,
	PropType = InferPropType<Prop>
> = Default extends unknown ? PropType : PropType | Default;

type MergeDefault<
	Prop,
	Default,
	PropType = InferPropType<Prop>
> = Default extends unknown ? PropType : NonNullable<PropType> | Default;

type AppendDefault<
	Props extends ComponentObjectPropsOptions,
	Defaults extends PartialKeys<Props>
> = {
	[PropKey in keyof Props]-?: Props[PropKey] extends Record<string, unknown>
		? Omit<Props[PropKey], 'type' | 'default'> & {
				type: PropType<
					MergeTypeDefault<Props[PropKey], Defaults[PropKey]>
				>;
				default: MergeDefault<Props[PropKey], Defaults[PropKey]>;
			}
		: {
				type: PropType<
					MergeTypeDefault<Props[PropKey], Defaults[PropKey]>
				>;
				default: MergeDefault<Props[PropKey], Defaults[PropKey]>;
			};
};

type InferPropType<T> = [T] extends [null]
	? never
	: [T] extends [{ type: null | true }]
		? never
		: [T] extends [ObjectConstructor | { type: ObjectConstructor }]
			? Record<string, never>
			: [T] extends [BooleanConstructor | { type: BooleanConstructor }]
				? boolean
				: [T] extends [DateConstructor | { type: DateConstructor }]
					? Date
					: [T] extends [(infer U)[] | { type: (infer U)[] }]
						? U extends DateConstructor
							? Date | InferPropType<U>
							: InferPropType<U>
						: [T] extends [Prop<infer V, infer D>]
							? unknown extends V
								? IfAny<V, V, D>
								: V
							: T;

type PropDefinition = {
	type?: unknown;
	default?: unknown;
	source?: string;
	[key: string]: unknown;
};

export function propsFactory<PropsOptions extends ComponentObjectPropsOptions>(
	props: PropsOptions,
	source?: string
) {
	return <Defaults extends PartialKeys<PropsOptions> = object>(
		defaults?: Defaults
	) => {
		const finalProps: Record<string, PropDefinition> = {};

		for (const key in props) {
			const isObjectDef =
				typeof props[key] === 'object' &&
				props[key] !== null &&
				!Array.isArray(props[key]);
			const definition: PropDefinition = isObjectDef
				? { ...props[key] }
				: { type: props[key] };

			// Подмешиваем дефолты, если есть
			if (defaults && key in defaults) {
				definition.default = defaults[key];
			}

			// Подмешиваем source для composables
			if (source && !definition.source) {
				definition.source = source;
			}

			finalProps[key] = definition;
		}

		return finalProps as AppendDefault<PropsOptions, Defaults>;
	};
}
