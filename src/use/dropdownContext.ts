import { ref, provide, inject, type Ref } from 'vue';

export const DropdownContextSymbol = Symbol('DropdownContext');

export interface DropdownContextState {
	open: Ref<boolean>;
	children: Ref<boolean>[];
	registerChild: (childOpen: Ref<boolean>) => void;
	unregisterChild: (childOpen: Ref<boolean>) => void;
}
export function useDropdownContext(
	openRef?: Ref<boolean>
): DropdownContextState {
	const parentContext = inject<DropdownContextState | null>(
		DropdownContextSymbol,
		null
	);

	if (openRef) {
		const children: Ref<boolean>[] = [];

		const registerChild = (childOpen: Ref<boolean>) => {
			if (!children.includes(childOpen)) children.push(childOpen);
		};

		const unregisterChild = (childOpen: Ref<boolean>) => {
			const index = children.indexOf(childOpen);
			if (index !== -1) children.splice(index, 1);
		};

		const state: DropdownContextState = {
			open: openRef,
			children,
			registerChild,
			unregisterChild
		};

		provide(DropdownContextSymbol, state);
		return state;
	}

	if (parentContext) return parentContext;

	const dummyRef = ref(false);
	return {
		open: dummyRef,
		children: [],
		registerChild: () => {},
		unregisterChild: () => {}
	};
}
