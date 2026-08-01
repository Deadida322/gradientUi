import { clamp, toCssDuration } from '../utils';
import type {
	GradientModel,
	GradientStop,
	SvgGradientOptions,
	SvgPathAnimationOptions,
	SvgSourceAnimationOptions
} from '../types';
import { toCssGradient } from './css';

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const XHTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';

const escapeAttribute = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');

const formatSvgStop = (stop: GradientStop) => {
	const opacity =
		stop.opacity === undefined
			? ''
			: ` stop-opacity="${clamp(stop.opacity)}"`;

	return `<stop offset="${stop.position}%" stop-color="${stop.color}"${opacity} />`;
};

const getPathStroke = (
	model: GradientModel,
	options: SvgPathAnimationOptions
) => ({
	active:
		options.activeStroke ??
		model.stops[Math.max(0, Math.floor(model.stops.length / 2))]?.color ??
		model.stops[0]?.color ??
		'currentColor',
	background:
		options.backgroundStroke ??
		model.stops[0]?.color ??
		options.activeStroke ??
		'currentColor'
});

const getSvgViewBox = (svg: string, options: SvgSourceAnimationOptions) => {
	const viewBox = svg.match(/\bviewBox=(["'])(.*?)\1/i)?.[2];
	if (viewBox) return viewBox;

	const width = options.width ?? 240;
	const height = options.height ?? 120;

	return `0 0 ${width} ${height}`;
};

const getSvgBody = (svg: string) =>
	svg
		.replace(/<\?xml[\s\S]*?\?>/gi, '')
		.replace(/<!doctype[\s\S]*?>/gi, '')
		.match(/<svg\b[^>]*>([\s\S]*?)<\/svg>/i)?.[1]
		.trim() ?? svg;

const splitAbsoluteSubpaths = (path: string) => {
	const subpaths = path
		.trim()
		.split(/(?=M\s*[-+.\d])/)
		.map((subpath) => subpath.trim())
		.filter(Boolean);

	return subpaths.length > 1 ? subpaths : [path];
};

const getSvgPathData = (svg: string) =>
	[...svg.matchAll(/<path\b[^>]*\sd=(["'])([\s\S]*?)\1/gi)].flatMap((match) =>
		splitAbsoluteSubpaths(match[2])
	);

const getPathComplexity = (path: string) =>
	Math.max(1, path.match(/[LlHhVvCcSsQqTtAaZz]/g)?.length ?? 0);

const getSourcePathFillTime = (path: string, maxComplexity: number) => {
	const complexityRatio = getPathComplexity(path) / maxComplexity;
	const fillTime = 0.5 + (1 - complexityRatio) * 0.22;

	return Math.round(fillTime * 1000) / 1000;
};

const getViewBoxMetrics = (viewBox: string) => {
	const [x = '0', y = '0', width = '240', height = '120'] = viewBox
		.trim()
		.split(/[\s,]+/);

	return {
		height: Number(height) || 120,
		width: Number(width) || 240,
		x: Number(x) || 0,
		y: Number(y) || 0
	};
};

const getPaddedViewBox = (
	viewBox: string,
	strokeWidth: number,
	options: SvgSourceAnimationOptions
) => {
	if (options.viewBoxPadding === false) return viewBox;

	const metrics = getViewBoxMetrics(viewBox);
	const fallbackPadding = Math.max(
		strokeWidth * 2,
		Math.min(metrics.width, metrics.height) * 0.02
	);
	const padding = options.viewBoxPadding ?? fallbackPadding;

	return [
		metrics.x - padding,
		metrics.y - padding,
		metrics.width + padding * 2,
		metrics.height + padding * 2
	].join(' ');
};

const getViewBoxSize = (viewBox: string) => {
	const { height, width } = getViewBoxMetrics(viewBox);

	return {
		height: Number(height) || 120,
		width: Number(width) || 240
	};
};

const getNormalizedStrokeWidth = (
	strokeWidth: number,
	viewBox: string,
	options: SvgSourceAnimationOptions
) => {
	if (options.normalizeStrokeWidth === false) return strokeWidth;

	const { height, width } = getViewBoxSize(viewBox);
	const base = options.strokeWidthBase ?? 180;

	return strokeWidth * (Math.min(width, height) / base);
};

export const toSvgGradient = (
	model: GradientModel,
	options: SvgGradientOptions = {}
) => {
	const id = options.id ?? 'g-gradient';
	const stops = model.stops.map(formatSvgStop).join('');

	if (model.type === 'radial') {
		return `<radialGradient id="${id}" cx="${options.cx ?? '50%'}" cy="${options.cy ?? '50%'}" r="${options.r ?? '75%'}">${stops}</radialGradient>`;
	}

	if (model.type === 'conic') {
		return `<pattern id="${id}" patternUnits="objectBoundingBox" width="1" height="1"><foreignObject x="0" y="0" width="100%" height="100%"><div xmlns="${XHTML_NAMESPACE}" style="width:100%;height:100%;background:${escapeAttribute(toCssGradient(model))};"></div></foreignObject></pattern>`;
	}

	return `<linearGradient id="${id}" x1="${options.x1 ?? '0%'}" y1="${options.y1 ?? '0%'}" x2="${options.x2 ?? '100%'}" y2="${options.y2 ?? '100%'}">${stops}</linearGradient>`;
};

export const toSvgGradientMarkup = (
	model: GradientModel,
	options: SvgGradientOptions = {}
) => {
	const id = options.id ?? 'g-gradient';
	const width = options.width ?? 240;
	const height = options.height ?? 120;
	const rx = options.rx ?? 18;

	return `<svg xmlns="${SVG_NAMESPACE}" viewBox="0 0 ${width} ${height}" role="img">
  <defs>
    ${toSvgGradient(model, options)}
  </defs>
  <rect width="${width}" height="${height}" rx="${rx}" fill="url(#${id})" />
</svg>`;
};

export const toSvgSourceAnimationMarkup = (
	sourceSvg: string,
	model: GradientModel,
	options: SvgSourceAnimationOptions = {}
) => {
	const id = options.id ?? 'g-gradient-source';
	const gradientId = `${id}-stroke`;
	const sourceViewBox = getSvgViewBox(sourceSvg, options);
	const body = getSvgBody(sourceSvg);
	const paths = getSvgPathData(sourceSvg);
	const strokeWidth = getNormalizedStrokeWidth(
		options.strokeWidth ?? 1.4,
		sourceViewBox,
		options
	);
	const viewBox = getPaddedViewBox(sourceViewBox, strokeWidth, options);
	const { width, x } = getViewBoxMetrics(viewBox);
	const linecap = options.linecap ?? 'round';
	const duration = toCssDuration(options.duration ?? 3600);
	const repeatCount = options.repeatCount ?? 'indefinite';
	const sourceOpacity = options.sourceOpacity ?? 0.22;
	const stops = model.stops.map(formatSvgStop).join('');
	const maxPathComplexity = Math.max(...paths.map(getPathComplexity));

	return `<svg xmlns="${SVG_NAMESPACE}" viewBox="${escapeAttribute(viewBox)}" role="img">
  <defs>
    <linearGradient id="${gradientId}" gradientUnits="userSpaceOnUse" x1="${x}" y1="0" x2="${x + width}" y2="0">
      ${stops}
    </linearGradient>
  </defs>
  <g opacity="${clamp(sourceOpacity)}">
    ${body}
  </g>
  <g fill="none" stroke="url(#${gradientId})" stroke-width="${strokeWidth}" stroke-linecap="${linecap}" stroke-linejoin="round">
    ${paths
		.map((path) => {
			const fillTime = getSourcePathFillTime(path, maxPathComplexity);

			return `<path d="${escapeAttribute(path)}" pathLength="100" stroke-dasharray="0 100" stroke-dashoffset="0">
      <animate attributeName="stroke-dasharray" values="0 100;100 100;0 100" keyTimes="0;${fillTime};1" dur="${duration}" repeatCount="${repeatCount}" calcMode="linear" />
      <animate attributeName="stroke-dashoffset" values="0;0;-100" keyTimes="0;${fillTime};1" dur="${duration}" repeatCount="${repeatCount}" calcMode="linear" />
    </path>`;
		})
		.join('\n    ')}
  </g>
</svg>`;
};

export const toSvgPathAnimationMarkup = (
	model: GradientModel,
	options: SvgPathAnimationOptions = {}
) => {
	const id = options.id ?? 'g-gradient-path';
	const gradientId = `${id}-stroke`;
	const width = options.width ?? 240;
	const height = options.height ?? 120;
	const path =
		options.path ??
		`M 20 ${height * 0.64} C ${width * 0.28} ${height * 0.18}, ${width * 0.58} ${height * 0.18}, ${width - 20} ${height * 0.64}`;
	const strokeWidth = options.strokeWidth ?? 12;
	const linecap = options.linecap ?? 'round';
	const duration = toCssDuration(options.duration ?? 2800);
	const repeatCount = options.repeatCount ?? 'indefinite';
	const opacity = options.backgroundOpacity ?? 0.24;
	const stroke = getPathStroke(model, options);
	const stops = model.stops.map(formatSvgStop).join('');

	return `<svg xmlns="${SVG_NAMESPACE}" viewBox="0 0 ${width} ${height}" role="img">
  <defs>
    <linearGradient id="${gradientId}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${width}" y2="0">
      ${stops}
    </linearGradient>
  </defs>
  <path d="${escapeAttribute(path)}" fill="none" stroke="${stroke.background}" stroke-width="${strokeWidth}" stroke-linecap="${linecap}" opacity="${opacity}" />
  <path d="${escapeAttribute(path)}" fill="none" stroke="${options.activeStroke ? stroke.active : `url(#${gradientId})`}" stroke-width="${strokeWidth}" stroke-linecap="${linecap}" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="100">
    <animate attributeName="stroke-dashoffset" values="100;0;-100" dur="${duration}" repeatCount="${repeatCount}" />
  </path>
</svg>`;
};
