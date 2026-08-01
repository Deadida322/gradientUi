import { parseColor, rgbToChannels } from '../color';
import type { GradientDirection, GradientStop } from './types';
import { DEFAULT_GRADIENT_DIRECTION } from './constants';

export const normalizeDirection = (
	direction: GradientDirection = DEFAULT_GRADIENT_DIRECTION
) => (typeof direction === 'number' ? `${direction}deg` : direction);

export const toCssLength = (value: number | string) =>
	typeof value === 'number' ? `${value}px` : value;

export const addCssLength = (value: number | string, offset: number) => {
	if (typeof value === 'number') return `${value + offset}px`;

	const match = value.match(/^(-?\d*\.?\d+)(.*)$/);
	if (!match) return value;

	return `${Number(match[1]) + offset}${match[2] || 'px'}`;
};

export const toCssDuration = (value: number | string) =>
	typeof value === 'number' ? `${value}ms` : value;

export const clamp = (value: number, min = 0, max = 1) =>
	Math.min(max, Math.max(min, value));

export const toCssColor = (color: string, opacity?: number) => {
	if (opacity === undefined) return color;

	const parsed = parseColor(color);

	if (!parsed) return color;

	return `rgb(${rgbToChannels(parsed).replace(/,/g, '')} / ${clamp(opacity)})`;
};

export const formatStop = ({ color, opacity, position }: GradientStop) =>
	`${toCssColor(color, opacity)} ${position}%`;

export const createStop = (
	color: string,
	position: number,
	opacity?: number
): GradientStop => ({
	color,
	position,
	...(opacity === undefined ? {} : { opacity })
});

export const getConicStops = (stops: readonly GradientStop[]) => {
	if (stops.length <= 1) return stops;

	const firstHalf = stops.map((stop) => ({
		...stop,
		position: stop.position / 2
	}));
	const secondHalf = [...stops].reverse().map((stop) => ({
		...stop,
		position: 100 - stop.position / 2
	}));

	return [...firstHalf, ...secondHalf];
};
