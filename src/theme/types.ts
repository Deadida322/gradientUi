import type { ColorInput } from '@/types/Colors';

export type ThemeMode = 'light' | 'dark';
export type ThemeTokens = Record<string, string>;

export interface ThemeColorDefinition {
	color: ColorInput;
	onColor?: ColorInput;
	palette?: boolean;
	gradient?: string | false;
}

export type ThemeColorValue = ColorInput | ThemeColorDefinition;
export type ThemeColorExtensions = Record<string, ThemeColorValue>;
