import { changeTone, getComplementaryColor, shiftHue } from './colorMath';
import { createStop } from './utils';
import type { GradientRecipe } from './types';

const createGlareStops = (base: string) => {
	const complementary = getComplementaryColor(base);

	return [
		createStop(changeTone(complementary, 95), 0),
		createStop(complementary, 25),
		createStop(base, 50),
		createStop(changeTone(base, 80), 75),
		createStop(changeTone(base, 20), 100)
	];
};

const createMonochromeStops = (base: string) => [
	createStop(changeTone(base, 94), 0),
	createStop(changeTone(base, 72), 28),
	createStop(base, 55),
	createStop(changeTone(base, 24), 100)
];

const createComplementaryStops = (base: string) => [
	createStop(changeTone(getComplementaryColor(base), 88), 0),
	createStop(base, 50),
	createStop(changeTone(getComplementaryColor(base), 32), 100)
];

const createSplitComplementaryStops = (base: string) => [
	createStop(shiftHue(base, 148, 82, 0.95), 0),
	createStop(shiftHue(base, -148, 70, 1.05), 28),
	createStop(base, 56),
	createStop(shiftHue(base, 150, 34, 1.08), 100)
];

const createAnalogousStops = (base: string) => [
	createStop(shiftHue(base, -34, 72, 0.95), 0),
	createStop(base, 50),
	createStop(shiftHue(base, 34, 34, 1.05), 100)
];

const createTriadicStops = (base: string) => [
	createStop(shiftHue(base, -120, 78, 0.9), 0),
	createStop(base, 50),
	createStop(shiftHue(base, 120, 36, 1.05), 100)
];

const createTetradicStops = (base: string) => [
	createStop(shiftHue(base, -90, 78, 0.92), 0),
	createStop(base, 32),
	createStop(shiftHue(base, 90, 62, 1), 58),
	createStop(shiftHue(base, 180, 34, 1.08), 100)
];

const createRectangleStops = (base: string) => [
	createStop(shiftHue(base, -28, 82, 0.96), 0),
	createStop(base, 27),
	createStop(shiftHue(base, 152, 66, 1.02), 62),
	createStop(shiftHue(base, 180, 34, 1.08), 100)
];

const createSquareStops = (base: string) => [
	createStop(shiftHue(base, -90, 78, 0.94), 0),
	createStop(base, 30),
	createStop(shiftHue(base, 90, 62, 1), 62),
	createStop(shiftHue(base, 180, 36, 1.08), 100)
];

const createDuotoneStops = (
	base: string,
	colors: readonly string[] | undefined
) => {
	const first = colors?.[0] ?? changeTone(base, 84);
	const second = colors?.[1] ?? getComplementaryColor(base);

	return [
		createStop(first, 0),
		createStop(base, 48),
		createStop(second, 100)
	];
};

export const gradientRecipes = {
	glare: createGlareStops,
	monochrome: createMonochromeStops,
	complementary: createComplementaryStops,
	'split-complementary': createSplitComplementaryStops,
	analogous: createAnalogousStops,
	triadic: createTriadicStops,
	tetradic: createTetradicStops,
	rectangle: createRectangleStops,
	square: createSquareStops,
	duotone: createDuotoneStops
} satisfies Record<
	GradientRecipe,
	(
		base: string,
		colors?: readonly string[]
	) => ReturnType<typeof createStop>[]
>;

export const createRecipeStops = (
	base: string,
	recipe: GradientRecipe,
	colors?: readonly string[]
) => gradientRecipes[recipe](base, colors);
