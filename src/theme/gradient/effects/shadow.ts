import { toCssColor, toCssLength } from '../utils';
import type { GradientModel, GradientShadowOptions } from '../types';

const getShadowStops = (model: GradientModel, layers: number) => {
	const saturatedStops = model.stops.filter(
		(stop) => stop.position >= 25 && stop.position <= 85
	);
	const fallbackStops = model.stops.filter(
		(stop) => !saturatedStops.includes(stop)
	);
	const sourceStops = [...saturatedStops, ...fallbackStops].sort(
		(first, second) =>
			Math.abs(first.position - 50) - Math.abs(second.position - 50)
	);

	return sourceStops.slice(0, layers);
};

const getDropShadowLayerOpacity = (opacity: number, index: number) =>
	opacity * ([1, 0.54, 0.3, 0.18][index] ?? 0.12);

const scaleSimpleCssLength = (value: number | string, factor: number) => {
	const match = String(value).match(/^(-?\d*\.?\d+)(.*)$/);

	if (!match) return null;

	const scaled = Math.round(Number(match[1]) * factor * 1000) / 1000;

	return `${scaled}${match[2] || 'px'}`;
};

const getDistributedOffset = (
	value: number | string,
	layers: number,
	index: number
) =>
	scaleSimpleCssLength(value, 1 / layers) ??
	(index === 0 ? toCssLength(value) : '0px');

const getDistributedBlur = (value: number | string, layers: number) =>
	scaleSimpleCssLength(value, 1 / Math.sqrt(layers)) ?? toCssLength(value);

export const toGradientBoxShadow = (
	model: GradientModel,
	options: GradientShadowOptions = {}
) => {
	const x = options.x ?? 0;
	const y = options.y ?? 6;
	const blur = options.blur ?? 14;
	const spread = options.spread ?? -3;
	const opacity = options.opacity ?? 0.24;
	const layers = Math.max(1, Math.round(options.layers ?? 2));
	const dominantColor = getShadowStops(model, 1)[0]?.color ?? '#000000';
	const ambientShadow = `${toCssLength(x)} ${toCssLength(y)} ${toCssLength(blur)} ${toCssLength(spread)} ${toCssColor(dominantColor, opacity)}`;

	if (layers === 1) return ambientShadow;

	const contactX = scaleSimpleCssLength(x, 0.35) ?? '0px';
	const contactY = scaleSimpleCssLength(y, 0.35) ?? '2px';
	const contactBlur = scaleSimpleCssLength(blur, 0.3) ?? '4px';
	const contactSpread = scaleSimpleCssLength(spread, 0.5) ?? '-2px';
	const contactOpacity = Math.min(0.18, opacity * 0.65);
	const contactShadow = `${contactX} ${contactY} ${contactBlur} ${contactSpread} ${toCssColor('#000000', contactOpacity)}`;

	return `${contactShadow}, ${ambientShadow}`;
};

export const toGradientDropShadow = (
	model: GradientModel,
	options: GradientShadowOptions = {}
) => {
	const x = options.x ?? 0;
	const y = options.y ?? 6;
	const blur = options.blur ?? 14;
	const opacity = options.opacity ?? 0.42;
	const layers = Math.max(1, Math.round(options.layers ?? 2));
	const distributedBlur = getDistributedBlur(blur, layers);

	return getShadowStops(model, layers)
		.map((stop, index) => {
			const distributedX = getDistributedOffset(x, layers, index);
			const distributedY = getDistributedOffset(y, layers, index);

			return `drop-shadow(${distributedX} ${distributedY} ${distributedBlur} ${toCssColor(stop.color, getDropShadowLayerOpacity(opacity, index))})`;
		})
		.join(' ');
};
