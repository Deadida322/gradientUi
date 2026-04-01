import {
	type App,
	type Component,
	type InjectionKey,
	computed,
	inject,
	provide
} from 'vue';

import MdiIconSet from '@/components/ui/GIcon/sets/MdiIconSet.vue';

export interface IconSetComponentProps {
	icon: string;
	tag?: string;
}

export interface IconSet {
	component: Component;
}

export interface IconsOptions {
	defaultSet: string;
	aliases: Record<string, string>;
	sets: Record<string, IconSet>;
}

export interface ResolvedIcon {
	icon: string;
	component: Component;
}

const IconsSymbol: InjectionKey<IconsOptions> = Symbol('gradient-icons');

const defaultIcons: IconsOptions = {
	defaultSet: 'mdi',
	aliases: {},
	sets: {
		mdi: {
			component: MdiIconSet
		}
	}
};

export function createIcons(options: Partial<IconsOptions> = {}): IconsOptions {
	return {
		defaultSet: options.defaultSet ?? defaultIcons.defaultSet,
		aliases: {
			...defaultIcons.aliases,
			...(options.aliases ?? {})
		},
		sets: {
			...defaultIcons.sets,
			...(options.sets ?? {})
		}
	};
}

export function provideIcons(options: Partial<IconsOptions> = {}) {
	provide(IconsSymbol, createIcons(options));
}

export function installIcons(app: App, options: Partial<IconsOptions> = {}) {
	app.provide(IconsSymbol, createIcons(options));
}

export function useIcons() {
	return inject(IconsSymbol, defaultIcons);
}

export function useIcon(icon: () => string) {
	const icons = useIcons();

	return computed<ResolvedIcon>(() => {
		let iconValue = icon();

		if (iconValue.startsWith('$')) {
			const alias = iconValue.slice(1);
			iconValue = icons.aliases[alias] ?? iconValue;
		}

		const [setName, setIcon] = iconValue.includes(':')
			? iconValue.split(':', 2)
			: [icons.defaultSet, iconValue];
		const set = icons.sets[setName] ?? icons.sets[icons.defaultSet];

		return {
			icon: setIcon ?? iconValue,
			component: set.component
		};
	});
}
