export type GroupMode = 'single' | 'multiple';

export type GroupModel<T> = T | T[] | null;

export interface GroupContext<T> {
	isSelected: (item: T) => boolean;
	select: (item: T) => void;
	unselect: (item: T) => void;
	toggle: (item: T) => void;
	activeClass: string | undefined;
}
