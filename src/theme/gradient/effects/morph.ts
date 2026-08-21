import { clamp, toCssDuration } from '../utils';
import type {
	GradientModel,
	GradientMorphBlob,
	GradientMorphOptions,
	GradientMorphPreset
} from '../types';

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

const morphPresets = {
	soft: {
		blobCount: 5,
		blur: 40,
		contrast: 18,
		duration: 12000,
		opacity: 0.76,
		scale: 1.05
	},
	liquid: {
		blobCount: 6,
		blur: 46,
		contrast: 22,
		duration: 9200,
		opacity: 0.82,
		scale: 1.18
	},
	ripple: {
		blobCount: 7,
		blur: 34,
		contrast: 20,
		duration: 7200,
		opacity: 0.78,
		scale: 0.94
	}
} satisfies Record<
	GradientMorphPreset,
	Required<
		Pick<
			GradientMorphOptions,
			'blobCount' | 'blur' | 'contrast' | 'duration' | 'opacity' | 'scale'
		>
	>
>;

const getMorphOptions = (options: GradientMorphOptions = {}) => {
	const preset = morphPresets[options.preset ?? 'soft'];

	return {
		blobCount: Math.max(
			2,
			Math.round(options.blobCount ?? preset.blobCount)
		),
		blendMode: options.blendMode ?? 'hard-light',
		blobOpacity: clamp(options.blobOpacity ?? 1, 0, 1.6),
		blur: clamp(options.blur ?? preset.blur, 0, 80),
		contrast: clamp(options.contrast ?? preset.contrast, 0, 36),
		duration: options.duration ?? preset.duration,
		id: options.id ?? 'g-gradient-morph',
		opacity: clamp(options.opacity ?? preset.opacity),
		scale: clamp(options.scale ?? preset.scale, 0.4, 2)
	};
};

const getBlobColor = (model: GradientModel, index: number) =>
	model.stops[index % model.stops.length]?.color ??
	model.stops[0]?.color ??
	'currentColor';

const getDurationMs = (duration: number | string) => {
	if (typeof duration === 'number') return duration;

	const parsed = Number.parseFloat(duration);

	return Number.isFinite(parsed) ? parsed : 9000;
};

const getNoise = (index: number, salt: number) => {
	const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;

	return value - Math.floor(value);
};

const getNoiseRange = (index: number, salt: number, min: number, max: number) =>
	min + getNoise(index, salt) * (max - min);

const round = (value: number) => Number(value.toFixed(3));

const blobPaths = [
	{
		animationName: 'g-gradient-morph-drift',
		dx: 20,
		dx2: 8,
		dy: -8,
		dy2: 16,
		originX: '50%',
		originY: '50%',
		scaleMid: 1.16,
		scaleTo: 1.04,
		x: 6,
		y: 58
	},
	{
		animationName: 'g-gradient-morph-orbit',
		dx: -18,
		dx2: 10,
		dy: 18,
		dy2: -10,
		originX: '24%',
		originY: '68%',
		scaleMid: 0.96,
		scaleTo: 1.12,
		x: 44,
		y: 20
	},
	{
		animationName: 'g-gradient-morph-float',
		dx: -16,
		dx2: -8,
		dy: -12,
		dy2: 18,
		originX: '50%',
		originY: '50%',
		scaleMid: 1.2,
		scaleTo: 1.08,
		x: 74,
		y: 58
	},
	{
		animationName: 'g-gradient-morph-orbit',
		dx: 12,
		dx2: -20,
		dy: 14,
		dy2: 6,
		originX: '70%',
		originY: '30%',
		scaleMid: 1.04,
		scaleTo: 1.18,
		x: 88,
		y: 25
	},
	{
		animationName: 'g-gradient-morph-drift',
		dx: 24,
		dx2: -12,
		dy: -16,
		dy2: -8,
		originX: '50%',
		originY: '50%',
		scaleMid: 1.12,
		scaleTo: 0.98,
		x: 30,
		y: 78
	},
	{
		animationName: 'g-gradient-morph-float',
		dx: -22,
		dx2: 14,
		dy: 10,
		dy2: -18,
		originX: '50%',
		originY: '50%',
		scaleMid: 0.94,
		scaleTo: 1.1,
		x: 104,
		y: 82
	},
	{
		animationName: 'g-gradient-morph-orbit',
		dx: 14,
		dx2: -16,
		dy: -22,
		dy2: 10,
		originX: '35%',
		originY: '35%',
		scaleMid: 1.18,
		scaleTo: 1.02,
		x: 55,
		y: 64
	},
	{
		animationName: 'g-gradient-morph-drift',
		dx: -18,
		dx2: 18,
		dy: -14,
		dy2: 14,
		originX: '50%',
		originY: '50%',
		scaleMid: 1.08,
		scaleTo: 0.96,
		x: 18,
		y: 24
	}
];

export const createGradientMorphBlobs = (
	model: GradientModel,
	options: GradientMorphOptions = {}
): GradientMorphBlob[] => {
	const { blobCount, blobOpacity, duration, scale } = getMorphOptions(options);
	const durationMs = getDurationMs(duration);

	return Array.from({ length: blobCount }, (_, index) => {
		const path = blobPaths[index % blobPaths.length];
		const sizeJitter = getNoiseRange(index, 1, 0.88, 1.16);
		const durationJitter = getNoiseRange(index, 2, 0.86, 1.24);
		const opacity = clamp(getNoiseRange(index, 3, 0.72, 1) * blobOpacity);
		const blur = getNoiseRange(index, 4, 0, 4);
		const size = (34 + (index % 4) * 9) * scale * sizeJitter;

		return {
			animationName: path.animationName,
			blur: round(blur),
			color: getBlobColor(model, index),
			delay: Math.round(
				index * -0.19 * durationMs - getNoiseRange(index, 5, 0, 900)
			),
			dx: round(path.dx * getNoiseRange(index, 6, 0.84, 1.18)),
			dx2: round(path.dx2 * getNoiseRange(index, 7, 0.82, 1.22)),
			dy: round(path.dy * getNoiseRange(index, 8, 0.84, 1.18)),
			dy2: round(path.dy2 * getNoiseRange(index, 9, 0.82, 1.22)),
			duration: Math.round(
				durationMs * (1 + (index % 3) * 0.11) * durationJitter
			),
			opacity: round(opacity),
			originX: path.originX,
			originY: path.originY,
			rotateMid: Math.round(getNoiseRange(index, 10, 95, 165)),
			rotateTo: Math.round(getNoiseRange(index, 11, 220, 310)),
			scaleMid: path.scaleMid,
			scaleTo: path.scaleTo,
			size: round(size),
			x: path.x,
			y: path.y
		};
	});
};

export const toGradientMorphFilter = (options: GradientMorphOptions = {}) =>
	`url(#${getMorphOptions(options).id}) blur(${getMorphOptions(options).blur}px)`;

export const toGradientMorphFilterMarkup = (
	options: GradientMorphOptions = {}
) => {
	const { blur, contrast, id } = getMorphOptions(options);
	const gooBlur = Math.max(2, Math.round(blur * 0.25));
	const alphaOffset = -(contrast * 0.45);
	const matrix =
		contrast <= 0
			? ''
			: `
    <feColorMatrix in="g-gradient-morph-blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${contrast} ${alphaOffset}" result="g-gradient-morph-goo" />
    <feBlend in="SourceGraphic" in2="g-gradient-morph-goo" />`;

	return `<svg xmlns="${SVG_NAMESPACE}" width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute;overflow:hidden;inline-size:0;block-size:0;">
  <filter id="${id}" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
    <feGaussianBlur in="SourceGraphic" stdDeviation="${gooBlur}" result="g-gradient-morph-blur" />${matrix}
  </filter>
</svg>`;
};

export const toGradientMorphCSS = (
	model: GradientModel,
	options: GradientMorphOptions = {}
) => {
	const selector = options.selector ?? '.g-gradient-morph';
	const { blendMode, opacity } = getMorphOptions(options);
	const blobs = createGradientMorphBlobs(model, options);

	return `${selector} {
	position: relative;
	overflow: hidden;
}

${selector}__blobs {
	position: absolute;
	inset: -18%;
	opacity: ${opacity};
	filter: ${toGradientMorphFilter(options)};
	mix-blend-mode: ${blendMode};
}

${selector}__blob {
	position: absolute;
	transform: translate(-50%, -50%);
	transform-origin: var(--g-gradient-morph-origin-x) var(--g-gradient-morph-origin-y);
	opacity: var(--g-gradient-morph-opacity);
	filter: blur(var(--g-gradient-morph-blur));
	border-radius: 999px;
	background: radial-gradient(circle, var(--g-gradient-morph-blob-color) 0%, transparent 72%);
	animation: var(--g-gradient-morph-animation) var(--g-gradient-morph-duration, 9000ms) ease-in-out infinite alternate;
}

${blobs
	.map(
		(blob, index) => `${selector}__blob:nth-child(${index + 1}) {
	top: ${blob.y}%;
	left: ${blob.x}%;
	width: ${blob.size}%;
	aspect-ratio: 1;
	--g-gradient-morph-blob-color: ${blob.color};
	--g-gradient-morph-x: ${blob.dx}%;
	--g-gradient-morph-x2: ${blob.dx2}%;
	--g-gradient-morph-y: ${blob.dy}%;
	--g-gradient-morph-y2: ${blob.dy2}%;
	--g-gradient-morph-origin-x: ${blob.originX};
	--g-gradient-morph-origin-y: ${blob.originY};
	--g-gradient-morph-animation: ${blob.animationName};
	--g-gradient-morph-blur: ${blob.blur}px;
	--g-gradient-morph-opacity: ${blob.opacity};
	--g-gradient-morph-rotate-mid: ${blob.rotateMid}deg;
	--g-gradient-morph-rotate-to: ${blob.rotateTo}deg;
	--g-gradient-morph-scale-mid: ${blob.scaleMid};
	--g-gradient-morph-scale: ${blob.scaleTo};
	animation-delay: ${blob.delay}ms;
	animation-duration: ${toCssDuration(blob.duration)};
}`
	)
	.join('\n\n')}

@keyframes g-gradient-morph-drift {
	0% {
		transform: translate(-50%, -50%) scale(0.92);
	}

	42% {
		transform: translate(calc(-50% + var(--g-gradient-morph-x)), calc(-50% + var(--g-gradient-morph-y))) scale(var(--g-gradient-morph-scale));
	}

	100% {
		transform: translate(calc(-50% + var(--g-gradient-morph-x2)), calc(-50% + var(--g-gradient-morph-y2))) scale(var(--g-gradient-morph-scale-mid));
	}
}

@keyframes g-gradient-morph-float {
	0% {
		transform: translate(-50%, -50%) scale(1);
	}

	50% {
		transform: translate(calc(-50% + var(--g-gradient-morph-x)), calc(-50% + var(--g-gradient-morph-y))) scale(var(--g-gradient-morph-scale-mid));
	}

	100% {
		transform: translate(calc(-50% + var(--g-gradient-morph-x2)), calc(-50% + var(--g-gradient-morph-y2))) scale(var(--g-gradient-morph-scale));
	}
}

@keyframes g-gradient-morph-orbit {
	0% {
		transform: translate(-50%, -50%) rotate(0deg) scale(0.96);
	}

	50% {
		transform: translate(calc(-50% + var(--g-gradient-morph-x)), calc(-50% + var(--g-gradient-morph-y))) rotate(var(--g-gradient-morph-rotate-mid)) scale(var(--g-gradient-morph-scale-mid));
	}

	100% {
		transform: translate(calc(-50% + var(--g-gradient-morph-x2)), calc(-50% + var(--g-gradient-morph-y2))) rotate(var(--g-gradient-morph-rotate-to)) scale(var(--g-gradient-morph-scale));
	}
}`;
};
