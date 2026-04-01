export type CamelToKebab<T extends string> =
	T extends `${infer First}${infer Rest}`
		? `${First extends Uppercase<First> ? '-' : ''}${Lowercase<First>}${CamelToKebab<Rest>}`
		: T;

export type ExcludeString<T, K extends string> = T extends `${K}${infer Rest}`
	? Rest
	: never;
