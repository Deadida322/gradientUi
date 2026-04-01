import { type Validatable } from '../validation';

export const isEmail = (
	value: string,
	error = 'invalid email'
): boolean | string => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!value || value.length > 254 || !emailRegex.test(value)) {
		return error;
	}

	return true;
};

export const minLength =
	(min: number, error = 'value too short') =>
	(value: string): boolean | string => {
		if (value.length < min) {
			return error;
		}

		return true;
	};

export const maxLength =
	(max: number, error = 'value too long') =>
	(value: string): boolean | string => {
		if (value.length > max) {
			return error;
		}

		return true;
	};

export const required =
	(error = 'value is required') =>
	(value: Validatable): string | boolean => {
		if (value === null || value === undefined) {
			return error;
		}

		if (typeof value === 'string' && value.trim() === '') {
			return error;
		}

		if (Array.isArray(value) && value.length === 0) {
			return error;
		}

		return true;
	};
