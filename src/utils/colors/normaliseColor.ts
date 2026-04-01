import { colord } from 'colord';
import { argbFromRgb } from '@material/material-color-utilities';
import type { ArgbColor, ColorInput } from '@/types/Colors';

export function normalizeColor(
	input: ColorInput,
	options?: {
		resolveCssVar?: (name: string) => string | null;
		resolveThemeToken?: (name: string) => ArgbColor | null;
	}
): ArgbColor | null {
	if (typeof input === 'number') {
		return input > 0xffffff ? input : 0xff000000 | input;
	}

	const value = input.trim();

	if (value === 'currentColor') {
		return null;
	}

	if (value.startsWith('var(')) {
		const name = value.slice(4, -1).trim();
		const resolved = options?.resolveCssVar?.(name);
		if (resolved) {
			return normalizeColor(resolved, options);
		}
		return null;
	}

	const parsed = colord(value);
	if (parsed.isValid()) {
		const { r, g, b } = parsed.toRgb();
		return argbFromRgb(r, g, b);
	}

	const token = options?.resolveThemeToken?.(value);
	if (token != null) {
		return token;
	}

	return null;
}
