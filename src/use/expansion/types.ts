export type ExpansionGroupModel<T> = T | T[] | null;

export interface ExpansionGroupContext<T> {
	disabled: boolean;
	readonly: boolean;
	multiple: boolean;
	mandatory: boolean;
	isSelected: (item: T) => boolean;
	select: (item: T) => void;
	unselect: (item: T) => void;
	toggle: (item: T) => void;
}
