import { computed } from 'vue';
import { useColorMode } from '#imports';

export const useDocsTheme = () => {
	const colorMode = useColorMode();
	const isDark = computed({
		get: () => colorMode.value === 'dark',
		set: (value: boolean) => {
			colorMode.preference = value ? 'dark' : 'light';
		}
	});
	return {
		isDark,
		themeMode: computed(() => colorMode.value),
		toggleTheme: () => {
			isDark.value = !isDark.value;
		}
	};
};
