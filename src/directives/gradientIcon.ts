import {
	createGradientTextDirective,
	type GradientTextBindingValue
} from './gradientText';

export type GradientIconBindingValue = GradientTextBindingValue;

const gradientIcon = createGradientTextDirective('.mdi');

export default gradientIcon;
