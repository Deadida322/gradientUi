import { inject, provide, type ComputedRef } from 'vue';
import type { GColor } from '@/use/color';
import type { useNavigationController } from '@/use/navigation';
import type { BottomNavigationValue } from './types';

interface BottomNavigationContext {
	navigation: ReturnType<
		typeof useNavigationController<BottomNavigationValue>
	>;
	disabled: ComputedRef<boolean>;
	showLabels: ComputedRef<boolean>;
	color: ComputedRef<GColor | undefined>;
	activeColor: ComputedRef<GColor | undefined>;
}
const key = Symbol('g-bottom-navigation');
export const provideBottomNavigation = (context: BottomNavigationContext) =>
	provide(key, context);
export const useBottomNavigation = () =>
	inject<BottomNavigationContext | null>(key, null);
