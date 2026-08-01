import { DEFAULT_GRADIENT_DIRECTION } from '../constants';
import { getConicStops, toCssColor } from '../utils';
import type { CanvasGradientOptions, GradientModel } from '../types';

export const toCanvasGradient = (
	context: CanvasRenderingContext2D,
	model: GradientModel,
	options: CanvasGradientOptions = {}
) => {
	const width = options.width ?? context.canvas.width;
	const height = options.height ?? context.canvas.height;
	const centerX = width / 2;
	const centerY = height / 2;
	const maxRadius = Math.hypot(width, height) / 2;
	const direction =
		typeof model.direction === 'number'
			? model.direction
			: Number.parseFloat(model.direction) || DEFAULT_GRADIENT_DIRECTION;
	const radians = ((direction - 90) * Math.PI) / 180;
	const halfWidth = width / 2;
	const halfHeight = height / 2;
	const xOffset = Math.cos(radians) * halfWidth;
	const yOffset = Math.sin(radians) * halfHeight;
	const gradient =
		model.type === 'radial'
			? context.createRadialGradient(
					options.x0 ?? centerX,
					options.y0 ?? centerY,
					options.r0 ?? 0,
					options.x1 ?? centerX,
					options.y1 ?? centerY,
					options.r1 ?? maxRadius
				)
			: model.type === 'conic' &&
				  typeof context.createConicGradient === 'function'
				? context.createConicGradient(
						options.startAngle ?? radians,
						options.x0 ?? centerX,
						options.y0 ?? centerY
					)
				: context.createLinearGradient(
						options.x0 ?? centerX - xOffset,
						options.y0 ?? centerY - yOffset,
						options.x1 ?? centerX + xOffset,
						options.y1 ?? centerY + yOffset
					);

	const stops =
		model.type === 'conic' ? getConicStops(model.stops) : model.stops;

	for (const stop of stops) {
		gradient.addColorStop(
			stop.position / 100,
			toCssColor(stop.color, stop.opacity)
		);
	}

	return gradient;
};
