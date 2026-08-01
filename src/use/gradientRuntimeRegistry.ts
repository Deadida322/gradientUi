import type { CreatedGradientMaterial } from '@/theme';

export interface GradientRuntimeHandle {
	id: string;
	dispose: () => void;
}

interface RegistryEntry {
	count: number;
	element: Element;
}

const STYLE_ATTR = 'data-gradient-engine-style';
const SVG_ATTR = 'data-gradient-engine-svg';

const styleRegistry = new Map<string, RegistryEntry>();
const svgRegistry = new Map<string, RegistryEntry>();

const canUseDom = () => typeof document !== 'undefined';

const mountElement = (
	registry: Map<string, RegistryEntry>,
	id: string,
	createElement: () => Element
) => {
	const entry = registry.get(id);

	if (entry) {
		entry.count += 1;

		return () => {
			entry.count -= 1;

			if (entry.count <= 0) {
				entry.element.remove();
				registry.delete(id);
			}
		};
	}

	const element = createElement();
	document.head.append(element);
	registry.set(id, {
		count: 1,
		element
	});

	return () => {
		const currentEntry = registry.get(id);

		if (!currentEntry) return;

		currentEntry.count -= 1;

		if (currentEntry.count <= 0) {
			currentEntry.element.remove();
			registry.delete(id);
		}
	};
};

export const mountGradientCss = (id: string, cssText: string) => {
	if (!canUseDom() || !cssText.trim()) return () => undefined;

	return mountElement(styleRegistry, id, () => {
		const style = document.createElement('style');
		style.setAttribute(STYLE_ATTR, id);
		style.textContent = cssText;

		return style;
	});
};

export const mountGradientSvg = (id: string, svgText: string) => {
	if (!canUseDom() || !svgText.trim()) return () => undefined;

	return mountElement(svgRegistry, id, () => {
		const wrapper = document.createElement('div');
		wrapper.setAttribute(SVG_ATTR, id);
		wrapper.style.position = 'absolute';
		wrapper.style.width = '0';
		wrapper.style.height = '0';
		wrapper.style.overflow = 'hidden';
		wrapper.innerHTML = svgText;

		return wrapper;
	});
};

export const mountGradientMaterial = (
	material: CreatedGradientMaterial
): GradientRuntimeHandle => {
	if (!canUseDom()) {
		return {
			dispose: () => undefined,
			id: material.id
		};
	}

	const disposeCss = mountGradientCss(material.id, material.cssText);
	const disposeSvg = material.effects?.morph?.svg
		? mountGradientSvg(`${material.id}-morph`, material.effects.morph.svg)
		: () => undefined;

	return {
		dispose: () => {
			disposeSvg();
			disposeCss();
		},
		id: material.id
	};
};
