import type { GradientModel } from '@gradient-ui/gradient-engine/core';
import { colorInputToRgb } from './figmaColor';

const RADIAL_CENTER_SPREAD = 1.65;
const RADIAL_EDGE_SPREAD = 2.4;

const gradientTypeFromModel = (model: GradientModel): GradientPaint['type'] => {
	if (model.type === 'conic') return 'GRADIENT_ANGULAR';
	if (model.type === 'radial') return 'GRADIENT_RADIAL';
	return 'GRADIENT_LINEAR';
};

const toAngle = (direction: GradientModel['direction']) => {
	if (typeof direction === 'number') return direction;

	const parsed = Number.parseFloat(direction);
	return Number.isFinite(parsed) ? parsed : 135;
};

const toPositionPoint = (position: GradientModel['position']) => {
	const value = (position ?? 'center').toLowerCase();
	const x = value.includes('left') ? 0 : value.includes('right') ? 1 : 0.5;
	const y = value.includes('top') ? 0 : value.includes('bottom') ? 1 : 0.5;

	return { x, y };
};

const getRadialSpread = (position: ReturnType<typeof toPositionPoint>) => {
	const distanceFromCenter = Math.max(
		Math.abs(position.x - 0.5),
		Math.abs(position.y - 0.5)
	);

	return (
		RADIAL_CENTER_SPREAD +
		(RADIAL_EDGE_SPREAD - RADIAL_CENTER_SPREAD) * distanceFromCenter * 2
	);
};

const toConicStops = (model: GradientModel) => {
	if (model.type !== 'conic' || model.stops.length <= 1) return model.stops;

	const firstHalf = model.stops.map((stop) => ({
		...stop,
		position: stop.position / 2
	}));
	const secondHalf = [...model.stops].reverse().map((stop) => ({
		...stop,
		position: 100 - stop.position / 2
	}));

	return [...firstHalf, ...secondHalf];
};

const gradientTransformFromModel = (model: GradientModel): Transform => {
	const position = toPositionPoint(model.position);
	const offsetX = position.x - 0.5;
	const offsetY = position.y - 0.5;

	if (model.type === 'radial') {
		const scale = 1 / getRadialSpread(position);

		return [
			[scale, 0, 0.5 - scale * position.x],
			[0, scale, 0.5 - scale * position.y]
		];
	}

	if (model.type === 'conic') {
		const radians = ((toAngle(model.direction) - 90) * Math.PI) / 180;
		const cos = Math.cos(radians);
		const sin = Math.sin(radians);

		return [
			[cos, sin, 0.5 - cos * 0.5 - sin * 0.5 + offsetX],
			[-sin, cos, 0.5 + sin * 0.5 - cos * 0.5 + offsetY]
		];
	}

	const radians = ((toAngle(model.direction) - 90) * Math.PI) / 180;
	const cos = Math.cos(radians);
	const sin = Math.sin(radians);

	return [
		[cos, sin, 0.5 - cos * 0.5 - sin * 0.5 + offsetX],
		[-sin, cos, 0.5 + sin * 0.5 - cos * 0.5 + offsetY]
	];
};

export const gradientPaintFromModel = (
	model: GradientModel
): GradientPaint => ({
	gradientStops: toConicStops(model).map((stop) => ({
		color: {
			...colorInputToRgb(stop.color),
			a: stop.opacity ?? 1
		},
		position: stop.position / 100
	})),
	gradientTransform: gradientTransformFromModel(model),
	type: gradientTypeFromModel(model)
});
