import { useNuxtApp } from 'nuxt/app';
import type { GradientUIServices } from '@gradient-ui/core/services';

export const useGradientUI = (): GradientUIServices =>
	useNuxtApp().$gradientUI as GradientUIServices;
