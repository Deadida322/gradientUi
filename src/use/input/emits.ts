export const GInputEmits = {
	focus: (_event: FocusEvent) => true,
	blur: (_event: FocusEvent) => true,
	input: (_value: string, _event: Event) => true,
	change: (_value: string, _event: Event) => true,
	clear: () => true,
	'toggle-password': (_visible: boolean) => true
};
