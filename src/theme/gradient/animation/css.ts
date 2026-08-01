import { toCssDuration } from '../utils';
import type { GradientAnimationOptions } from '../types';

const createShiftKeyframes = (name: string) => `@keyframes ${name} {
	0% {
		background-position: 0% 50%;
	}

	50% {
		background-position: 100% 50%;
	}

	100% {
		background-position: 0% 50%;
	}
}`;

const createPulseKeyframes = (name: string) => `@keyframes ${name} {
	0%, 100% {
		filter: saturate(1) brightness(1);
	}

	50% {
		filter: saturate(1.22) brightness(1.08);
	}
}`;

const createHueRotateKeyframes = (name: string) => `@keyframes ${name} {
	0%, 100% {
		filter: hue-rotate(0deg) saturate(1);
	}

	50% {
		filter: hue-rotate(28deg) saturate(1.18);
	}
}`;

const createRotateKeyframes = (name: string) => `@keyframes ${name} {
	from {
		transform: translate(-50%, -50%) rotate(0deg);
	}

	to {
		transform: translate(-50%, -50%) rotate(360deg);
	}
}`;

export const getGradientAnimationOptions = (
	options: GradientAnimationOptions = {}
) => {
	const name = options.name ?? 'g-gradient-shift';
	const duration = toCssDuration(options.duration ?? 6000);
	const easing = options.easing ?? 'ease-in-out';
	const selector = options.selector ?? '.g-gradient-animated';
	const preset = options.preset ?? 'shift';

	return {
		duration,
		easing,
		name,
		preset,
		selector
	};
};

export const toGradientAnimationKeyframes = (
	options: GradientAnimationOptions = {}
) => {
	const { name, preset } = getGradientAnimationOptions(options);

	if (preset === 'pulse') return createPulseKeyframes(name);
	if (preset === 'hue-rotate') return createHueRotateKeyframes(name);
	if (preset === 'rotate') return createRotateKeyframes(name);

	return createShiftKeyframes(name);
};

export const toGradientAnimationValue = (
	options: GradientAnimationOptions = {}
) => {
	const { duration, easing, name, preset } =
		getGradientAnimationOptions(options);

	return `${name} ${duration} ${preset === 'rotate' ? 'linear' : easing} infinite`;
};

export const toGradientAnimationStyles = (
	options: GradientAnimationOptions = {}
) => {
	const { duration, easing, name, preset, selector } =
		getGradientAnimationOptions(options);

	if (preset === 'rotate') {
		return `${selector} {
	position: relative;
	overflow: hidden;
}

${selector}::before {
	content: '';
	position: absolute;
	top: 50%;
	left: 50%;
	width: 200%;
	height: 200%;
	min-width: 150vmax;
	min-height: 150vmax;
	background: inherit;
	animation: ${name} ${duration} linear infinite;
	transform-origin: center;
}`;
	}

	if (preset === 'pulse' || preset === 'hue-rotate') {
		return `${selector} {
	animation: ${name} ${duration} ${easing} infinite;
}`;
	}

	return `${selector} {
	animation: ${name} ${duration} ${easing} infinite;
	background-size: 220% 220%;
}`;
};

export const toGradientAnimationCSS = (
	options: GradientAnimationOptions = {}
) => {
	const keyframes = toGradientAnimationKeyframes(options);
	const styles = toGradientAnimationStyles(options);

	return `${keyframes}\n${styles}`;
};
