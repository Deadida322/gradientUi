import type { CreatedGradientMaterial } from '@/theme';
import { canUseDom, createClientElementRegistry } from '@/ssr/utils';

export interface GradientRuntimeHandle {
	id: string;
	dispose: () => void;
}

const STYLE_ATTR = 'data-gradient-engine-style';
const SVG_ATTR = 'data-gradient-engine-svg';

const styleRegistry = createClientElementRegistry();
const svgRegistry = createClientElementRegistry();

export const mountGradientCss = (id: string, cssText: string) => {
	if (!canUseDom() || !cssText.trim()) return () => undefined;

	return styleRegistry.mount(id, (clientDocument) => {
		const style = clientDocument.createElement('style');
		style.setAttribute(STYLE_ATTR, id);
		style.textContent = cssText;

		return style;
	});
};

export const mountGradientSvg = (id: string, svgText: string) => {
	if (!canUseDom() || !svgText.trim()) return () => undefined;

	return svgRegistry.mount(id, (clientDocument) => {
		const wrapper = clientDocument.createElement('div');
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
