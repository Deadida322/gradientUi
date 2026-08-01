import type { ColorShade } from '../palette';

export type GradientDirection = number | string;
export type GradientType = 'linear' | 'radial' | 'conic';
export type GradientRecipe =
	| 'glare'
	| 'monochrome'
	| 'complementary'
	| 'split-complementary'
	| 'analogous'
	| 'triadic'
	| 'tetradic'
	| 'rectangle'
	| 'square'
	| 'duotone';
export type GradientShape = 'circle' | 'ellipse';
export type GradientAnimationPreset =
	| 'shift'
	| 'pulse'
	| 'rotate'
	| 'hue-rotate';

export interface GradientStop {
	color: string;
	position: number;
	opacity?: number;
}

export interface GradientModel {
	type: GradientType;
	stops: GradientStop[];
	direction: GradientDirection;
	shape?: GradientShape;
	position?: string;
	size?: string;
}

export interface GradientOptions {
	direction?: GradientDirection;
	recipe?: GradientRecipe;
	shade?: ColorShade;
	type?: GradientType;
	shape?: GradientShape;
	position?: string;
	size?: string;
	colors?: readonly string[];
}

export interface GradientShadowOptions {
	x?: number | string;
	y?: number | string;
	blur?: number | string;
	spread?: number | string;
	opacity?: number;
	layers?: number;
}

export type GradientMorphPreset = 'soft' | 'liquid' | 'ripple';

export interface GradientMorphOptions {
	id?: string;
	preset?: GradientMorphPreset;
	blobCount?: number;
	blur?: number;
	contrast?: number;
	duration?: number | string;
	opacity?: number;
	scale?: number;
	selector?: string;
}

export interface GradientMorphBlob {
	animationName: string;
	blur: number;
	color: string;
	delay: number;
	dx: number;
	dx2: number;
	dy: number;
	dy2: number;
	duration: number | string;
	opacity: number;
	originX: string;
	originY: string;
	rotateMid: number;
	rotateTo: number;
	scaleMid: number;
	scaleTo: number;
	size: number;
	x: number;
	y: number;
}

export interface SvgGradientOptions {
	id?: string;
	width?: number;
	height?: number;
	rx?: number;
	x1?: string;
	x2?: string;
	y1?: string;
	y2?: string;
	cx?: string;
	cy?: string;
	r?: string;
}

export interface SvgPathAnimationOptions extends SvgGradientOptions {
	path?: string;
	strokeWidth?: number;
	linecap?: 'butt' | 'round' | 'square';
	duration?: number | string;
	repeatCount?: number | string;
	backgroundStroke?: string;
	activeStroke?: string;
	backgroundOpacity?: number;
}

export interface SvgSourceAnimationOptions extends SvgPathAnimationOptions {
	normalizeStrokeWidth?: boolean;
	sourceOpacity?: number;
	viewBoxPadding?: number | false;
	strokeWidthBase?: number;
}

export interface CanvasGradientOptions {
	x0?: number;
	y0?: number;
	x1?: number;
	y1?: number;
	r0?: number;
	r1?: number;
	startAngle?: number;
	width?: number;
	height?: number;
}

export interface GradientAnimationOptions {
	name?: string;
	preset?: GradientAnimationPreset;
	duration?: number | string;
	easing?: string;
	selector?: string;
}
