import { computed, ref } from 'vue';
import {
	createDefaultTheme,
	type ColorInput,
	type ThemeMode
} from 'gradient-ui';

const DOCS_THEME_SEED: ColorInput = '#704aff';
const DOCS_THEME_STORAGE_KEY = 'gradient-ui-docs-theme';

const isThemeMode = (value: string | null): value is ThemeMode =>
	value === 'light' || value === 'dark';

const readStoredThemeMode = (): ThemeMode => {
	if (typeof window === 'undefined') return 'light';

	const storedMode = window.localStorage.getItem(DOCS_THEME_STORAGE_KEY);

	return isThemeMode(storedMode) ? storedMode : 'light';
};

const themeMode = ref<ThemeMode>(readStoredThemeMode());

const applyTheme = (mode: ThemeMode) => {
	themeMode.value = mode;
	createDefaultTheme(DOCS_THEME_SEED, mode);

	if (typeof window !== 'undefined') {
		window.localStorage.setItem(DOCS_THEME_STORAGE_KEY, mode);
	}
};

export const initDocsTheme = () => {
	applyTheme(themeMode.value);
};

export const useDocsTheme = () => {
	const isDark = computed({
		get: () => themeMode.value === 'dark',
		set: (value: boolean) => {
			applyTheme(value ? 'dark' : 'light');
		}
	});

	const toggleTheme = () => {
		applyTheme(themeMode.value === 'dark' ? 'light' : 'dark');
	};

	return {
		themeMode,
		isDark,
		toggleTheme
	};
};
