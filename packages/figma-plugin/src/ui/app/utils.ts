export const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

export const toNumber = (value: string | number, fallback: number) => {
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : fallback;
};
