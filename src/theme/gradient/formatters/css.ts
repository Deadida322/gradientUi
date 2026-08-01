import {
	DEFAULT_GRADIENT_DIRECTION,
	DEFAULT_GRADIENT_POSITION,
	DEFAULT_GRADIENT_SIZE
} from '../constants';
import { formatStop, getConicStops, normalizeDirection } from '../utils';
import type { GradientDirection, GradientModel } from '../types';

export const createLinearGradient = (
	stops: readonly string[],
	direction: GradientDirection = DEFAULT_GRADIENT_DIRECTION
) => `linear-gradient(${normalizeDirection(direction)}, ${stops.join(', ')})`;

export const toCssGradient = (model: GradientModel) => {
	const stops = model.stops.map(formatStop).join(', ');

	if (model.type === 'radial') {
		const shape = model.shape ?? 'ellipse';
		const size = model.size ?? DEFAULT_GRADIENT_SIZE;
		const position = model.position ?? DEFAULT_GRADIENT_POSITION;

		return `radial-gradient(${shape} ${size} at ${position}, ${stops})`;
	}

	if (model.type === 'conic') {
		const direction = normalizeDirection(model.direction);
		const position = model.position ?? DEFAULT_GRADIENT_POSITION;
		const conicStops = getConicStops(model.stops)
			.map(formatStop)
			.join(', ');

		return `conic-gradient(from ${direction} at ${position}, ${conicStops})`;
	}

	return createLinearGradient(model.stops.map(formatStop), model.direction);
};
