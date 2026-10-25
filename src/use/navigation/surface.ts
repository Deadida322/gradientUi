import { computed } from 'vue';
import type { GColor } from '@/use/color';
import {
	useGradientMaterial,
	type GradientMaterialKind
} from '@/use/gradientMaterial';
import {
	useMaterialSurface,
	type MaterialSurfaceProps
} from '@/use/materialSurface';
import { useSurfaceColor } from '@/use/surfaceColor';

export interface NavigationSurfaceProps extends MaterialSurfaceProps {
	activeColor?: GColor;
	materialKind?: GradientMaterialKind;
}

export const useNavigationSurface = (
	props: NavigationSurfaceProps,
	baseClass: string
) => {
	const surface = useMaterialSurface(props, baseClass, {
		kind: () => props.materialKind ?? 'surface'
	});
	const { resolvedColor: activeColor, resolvedGradient } = useSurfaceColor({
		color: () => props.color,
		state: () => props.state,
		active: true,
		activeColor: () => props.activeColor
	});
	const canReuseSurface = computed(
		() =>
			activeColor.value === surface.resolvedColor.value &&
			(props.gradientRecipe === undefined ||
				surface.hasMaterialSurface.value ||
				surface.hasMorph.value)
	);
	// The computed material is evaluated only when the active appearance differs.
	const activeMaterial = useGradientMaterial({
		color: activeColor,
		recipe: () => props.gradientRecipe,
		kind: () => props.materialKind ?? 'surface',
		effects: () =>
			surface.hasMaterialSurface.value || surface.hasMorph.value
	});
	const indicatorMaterialStyles = computed(() =>
		canReuseSurface.value
			? surface.gradientMaterialStyles.value
			: activeMaterial.gradientMaterialStyles.value
	);
	const indicatorGradient = computed(() =>
		indicatorMaterialStyles.value
			? 'var(--g-gradient-material-background)'
			: resolvedGradient.value
	);

	return {
		...surface,
		color: surface.resolvedColor,
		activeColor,
		indicatorMaterialStyles,
		indicatorGradient
	};
};
