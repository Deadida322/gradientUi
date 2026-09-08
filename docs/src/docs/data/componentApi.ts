import type {
	DocsExampleTab,
	DocsPropRow,
	DocsReleaseBadgeMeta,
	DocsSlotRow
} from '@docs/types';
import {
	docsNextReleaseBadge,
	docsUpcomingReleaseBadge
} from './releaseBadges';

export interface DocsComponentApi {
	id: string;
	title: string;
	group: string;
	description: string;
	props: DocsPropRow[];
	slots?: DocsSlotRow[];
	emits?: DocsPropRow[];
	cssVariables?: DocsPropRow[];
	examples: DocsExampleTab[];
}

export const componentGroups = [
	{
		id: 'containment',
		title: 'Containment',
		description:
			'Surfaces and containers that hold actions, content, disclosure and temporary layers.'
	},
	{
		id: 'navigation',
		title: 'Navigation',
		description:
			'Primitives for moving through product shells, page sections and tabbed views.'
	},
	{
		id: 'data-display',
		title: 'Data display',
		description:
			'Structured primitives for comparing rows, columns and formatted product data.'
	},
	{
		id: 'form',
		title: 'Form',
		description:
			'Input controls for collecting user data with shared validation and state styling.'
	},
	{
		id: 'selection',
		title: 'Selection',
		description:
			'Single and grouped controls for choosing values, toggling state and exposing quick actions.'
	},
	{
		id: 'feedback',
		title: 'Feedback',
		description:
			'Status, progress and loading primitives for communicating system response.'
	}
];

export interface DocsComponentCatalogItem {
	id: string;
	title: string;
	group: string;
	description: string;
	to?: string;
	badge?: DocsReleaseBadgeMeta;
}

export const componentCatalog: DocsComponentCatalogItem[] = [
	{
		id: 'avatar',
		title: 'GAvatar',
		group: 'containment',
		description:
			'Identity surface for initials, icons, images and squircle profiles.',
		to: '/docs/components/avatar',
		badge: docsUpcomingReleaseBadge
	},
	{
		id: 'avatar-group',
		title: 'GAvatarGroup',
		group: 'containment',
		description:
			'Stacked identity cluster with overlap, overflow count and slot composition.',
		to: '/docs/components/avatar-group',
		badge: docsUpcomingReleaseBadge
	},
	{
		id: 'button',
		title: 'GButton',
		group: 'containment',
		description: 'Action surface for primary, secondary and icon actions.',
		to: '/docs/components/button'
	},
	{
		id: 'card',
		title: 'GCard',
		group: 'containment',
		description:
			'Content surface with material variants, media anatomy and layout presets.',
		to: '/docs/components/card',
		badge: docsUpcomingReleaseBadge
	},
	{
		id: 'divider',
		title: 'GDivider',
		group: 'containment',
		description:
			'Separator primitive with labels, vertical layout and gradient-aware line effects.',
		to: '/docs/components/divider',
		badge: docsUpcomingReleaseBadge
	},
	{
		id: 'chip',
		title: 'GChip',
		group: 'containment',
		description: 'Compact labeled surface for tags, filters and metadata.',
		to: '/docs/components/chip'
	},
	{
		id: 'badge',
		title: 'GBadge',
		group: 'containment',
		description:
			'Small count, status or metadata marker attached to another surface.',
		to: '/docs/components/badge'
	},
	{
		id: 'expansion',
		title: 'GExpansion',
		group: 'containment',
		description: 'Disclosure surface for collapsible content sections.',
		to: '/docs/components/expansion'
	},
	{
		id: 'expansion-group',
		title: 'GExpansionGroup',
		group: 'containment',
		description: 'Coordinates multiple expansion panels.',
		to: '/docs/components/expansion-group'
	},
	{
		id: 'modal',
		title: 'GModal',
		group: 'containment',
		description: 'Centered overlay for focused decisions and dialogs.',
		to: '/docs/components/modal'
	},
	{
		id: 'drawer',
		title: 'GDrawer',
		group: 'containment',
		description:
			'Side sheet for navigation, filters and secondary workflows.',
		to: '/docs/components/drawer'
	},
	{
		id: 'menu',
		title: 'GMenu',
		group: 'containment',
		description: 'Action list surface for dropdowns and contextual menus.',
		to: '/docs/components/menu'
	},
	{
		id: 'tooltip',
		title: 'GTooltip',
		group: 'containment',
		description: 'Short contextual hint for controls and icons.',
		to: '/docs/components/tooltip'
	},
	{
		id: 'navbar',
		title: 'GNavbar',
		group: 'navigation',
		description: 'Top navigation shell with groups and dropdown items.'
	},
	{
		id: 'aside',
		title: 'GAside',
		group: 'navigation',
		description: 'Side navigation and local table-of-contents primitive.'
	},
	{
		id: 'tabs',
		title: 'GTabs',
		group: 'navigation',
		description: 'Accessible tablist, tabs and panels for related views.',
		to: '/docs/components/tabs',
		badge: docsNextReleaseBadge
	},
	{
		id: 'stepper',
		title: 'GStepper',
		group: 'navigation',
		description: 'Ordered flow navigation with panels and actions.',
		to: '/docs/components/stepper',
		badge: docsUpcomingReleaseBadge
	},
	{
		id: 'table',
		title: 'GTable',
		group: 'data-display',
		description:
			'Styled static table primitive with headers, slots, expansion and merged cells.',
		to: '/docs/components/table'
	},
	{
		id: 'form',
		title: 'GForm',
		group: 'form',
		description: 'Native form wrapper for nested field validation.',
		to: '/docs/components/form'
	},
	{
		id: 'input',
		title: 'GInput',
		group: 'form',
		description: 'Text field with validation states and icon slots.',
		to: '/docs/components/input'
	},
	{
		id: 'textarea',
		title: 'GTextarea',
		group: 'form',
		description: 'Multi-line text input with the shared field foundation.',
		to: '/docs/components/textarea'
	},
	{
		id: 'select',
		title: 'GSelect',
		group: 'form',
		description: 'Field-style selection control for compact option sets.',
		to: '/docs/components/select'
	},
	{
		id: 'combobox',
		title: 'GCombobox',
		group: 'form',
		description:
			'Editable select for searchable options and user-added values.',
		to: '/docs/components/combobox',
		badge: docsUpcomingReleaseBadge
	},
	{
		id: 'checkbox',
		title: 'GCheckbox',
		group: 'selection',
		description: 'Binary control for independent boolean choices.',
		to: '/docs/components/checkbox'
	},
	{
		id: 'checkbox-group',
		title: 'GCheckboxGroup',
		group: 'selection',
		description: 'Grouped checkbox selection with shared value management.',
		to: '/docs/components/checkbox-group'
	},
	{
		id: 'radio',
		title: 'GRadio',
		group: 'selection',
		description: 'Single-choice selection from a visible set of options.',
		to: '/docs/components/radio'
	},
	{
		id: 'switch',
		title: 'GSwitch',
		group: 'selection',
		description: 'On/off control for immediate settings.',
		to: '/docs/components/switch'
	},
	{
		id: 'fab',
		title: 'GFAB',
		group: 'selection',
		description: 'Floating action button for prominent contextual actions.',
		to: '/docs/components/fab'
	},
	{
		id: 'quick-actions',
		title: 'GQuickActions',
		group: 'selection',
		description: 'Speed-dial style cluster for related floating actions.',
		to: '/docs/components/quick-actions'
	},
	{
		id: 'alert',
		title: 'GAlert',
		group: 'feedback',
		description:
			'Status message surface for success, warning and error content.',
		to: '/docs/components/alert'
	},
	{
		id: 'snackbar',
		title: 'GSnackbar',
		group: 'feedback',
		description:
			'Short-lived feedback surface with optional action and service API.',
		to: '/docs/components/snackbar'
	},
	{
		id: 'progress',
		title: 'GProgress',
		group: 'feedback',
		description: 'Determinate and indeterminate progress indicator.',
		to: '/docs/components/progress'
	},
	{
		id: 'loading',
		title: 'GLoading',
		group: 'feedback',
		description: 'Loading state primitive for async UI.',
		to: '/docs/components/loading'
	}
];

const surfaceCssVariables: DocsPropRow[] = [
	{
		name: '--g-color',
		type: 'CSS color',
		defaultValue: 'primary',
		description:
			'Resolved active component color. Usually controlled through color or state props.'
	},
	{
		name: '--g-on-color',
		type: 'CSS color',
		defaultValue: 'on-primary',
		description:
			'Readable foreground color paired with the current component color.'
	},
	{
		name: '--g-surface-color',
		type: 'CSS color',
		defaultValue: 'surface',
		description: 'Base surface color used by tonal and outlined variants.'
	},
	{
		name: '--g-surface-content-color',
		type: 'CSS color',
		defaultValue: 'var(--g-color)',
		description: 'Foreground color used by the visible component content.'
	},
	{
		name: '--g-surface-texture-fine-size',
		type: 'CSS background-size',
		defaultValue: '96px 96px',
		description: 'Fine grain layer size for texture="noise".'
	},
	{
		name: '--g-surface-texture-medium-size',
		type: 'CSS background-size',
		defaultValue: '220px 220px',
		description: 'Mid-frequency noise layer size for texture="noise".'
	},
	{
		name: '--g-surface-texture-coarse-size',
		type: 'CSS background-size',
		defaultValue: '420px 420px',
		description: 'Large cloudy noise layer size for texture="noise".'
	},
	{
		name: '--g-surface-texture-background-blend-mode',
		type: 'CSS background-blend-mode',
		defaultValue: 'overlay, soft-light, multiply, normal',
		description:
			'Blend stack used to combine the fine, medium, coarse and variation texture layers.'
	}
];

const actionSizeCssVariables: DocsPropRow[] = [
	{
		name: '--g-size-gap',
		type: 'CSS length',
		description: 'Gap between icon, label and slot content.'
	},
	{
		name: '--g-size-padding-x-*',
		type: 'CSS length',
		description:
			'Horizontal padding tokens for s, m, l and xl component sizes.'
	},
	{
		name: '--g-size-padding-y-*',
		type: 'CSS length',
		description:
			'Vertical padding tokens for s, m, l and xl component sizes.'
	},
	{
		name: '--g-size-font-size-*',
		type: 'CSS length',
		description: 'Font-size tokens for s, m, l and xl component sizes.'
	}
];

const textFieldEmits: DocsPropRow[] = [
	{
		name: 'update:modelValue',
		type: '(value: string) => void',
		description: 'Emitted by v-model when the field value changes.'
	},
	{
		name: 'input',
		type: '(value: string, event: Event) => void',
		description:
			'Emitted on native input events after the model is updated.'
	},
	{
		name: 'change',
		type: '(value: string, event: Event) => void',
		description: 'Emitted on native change events.'
	},
	{
		name: 'focus',
		type: '(event: FocusEvent) => void',
		description: 'Emitted when the native control receives focus.'
	},
	{
		name: 'blur',
		type: '(event: FocusEvent) => void',
		description: 'Emitted when the native control loses focus.'
	},
	{
		name: 'clear',
		type: '() => void',
		description: 'Emitted when the clear action is used.'
	}
];

const fieldCssVariables: DocsPropRow[] = [
	{
		name: '--g-field-accent-color',
		type: 'CSS color',
		defaultValue: 'var(--g-color)',
		description:
			'Resolved accent color used by focused labels, helper text and state styling.'
	},
	{
		name: '--g-field-content-color',
		type: 'CSS color',
		description: 'Foreground color for input text, affixes and icons.'
	},
	{
		name: '--g-field-label-color',
		type: 'CSS color',
		description: 'Label color. Changes on focus and semantic states.'
	},
	{
		name: '--g-field-helper-color',
		type: 'CSS color',
		description: 'Message/helper text color.'
	},
	{
		name: '--g-field-surface-color',
		type: 'CSS color',
		defaultValue: 'var(--g-token-field-surface)',
		description: 'Background color of the field wrapper.'
	},
	{
		name: '--g-field-background',
		type: 'CSS background',
		defaultValue: 'var(--g-field-surface-color)',
		description:
			'Resolved wrapper background after applying the selected field variant.'
	},
	{
		name: '--g-field-ring-shadow',
		type: 'CSS shadow',
		defaultValue: 'none',
		description:
			'Inset border or underline shadow applied by field variants.'
	},
	{
		name: '--g-field-elevation-shadow',
		type: 'CSS shadow',
		defaultValue: 'none',
		description: 'Outer focus or glass elevation shadow.'
	},
	{
		name: '--g-field-placeholder-opacity',
		type: 'number',
		defaultValue: '0.62',
		description: 'Opacity for native placeholder text.'
	},
	{
		name: '--g-token-field-height-*',
		type: 'CSS length',
		description: 'Field heights for s, m, l and xl sizes.'
	},
	{
		name: '--g-token-field-padding-*',
		type: 'CSS length',
		description: 'Field padding tokens for s, m, l and xl sizes.'
	}
];

const checkControlEmits: DocsPropRow[] = [
	{
		name: 'update:modelValue',
		type: '(value: boolean) => void',
		description: 'Emitted by v-model when checked state changes.'
	},
	{
		name: 'change',
		type: '(value: boolean, event: Event) => void',
		description:
			'Emitted on native change events after the model is updated.'
	},
	{
		name: 'focus',
		type: '(event: FocusEvent) => void',
		description: 'Emitted when the control receives focus.'
	},
	{
		name: 'blur',
		type: '(event: FocusEvent) => void',
		description: 'Emitted when the control loses focus.'
	}
];

const checkGroupEmits = (valueType: string): DocsPropRow[] => [
	{
		name: 'update:modelValue',
		type: `(value: ${valueType}) => void`,
		description: 'Emitted by v-model when selected value changes.'
	},
	{
		name: 'change',
		type: `(value: ${valueType}, event: Event) => void`,
		description: 'Emitted after an option changes selection.'
	},
	{
		name: 'focus',
		type: '(event: FocusEvent) => void',
		description: 'Emitted when focus enters the option group.'
	},
	{
		name: 'blur',
		type: '(event: FocusEvent) => void',
		description: 'Emitted when focus leaves the option group.'
	}
];

const checkIndicatorCssVariables: DocsPropRow[] = [
	{
		name: '--g-check-indicator-accent',
		type: 'CSS color',
		defaultValue: 'var(--g-color)',
		description: 'Resolved indicator accent color.'
	},
	{
		name: '--g-check-indicator-shape-size',
		type: 'CSS length',
		description:
			'Checkbox or radio indicator size resolved from size tokens.'
	},
	{
		name: '--g-check-indicator-shape-radius',
		type: 'CSS length',
		description:
			'Indicator radius used by default, soft and cut-corner views.'
	},
	{
		name: '--g-check-indicator-shape-border',
		type: 'CSS border color',
		description: 'Border color of the unchecked indicator shape.'
	},
	{
		name: '--g-check-indicator-shape-bg',
		type: 'CSS color',
		description: 'Background color of the unchecked indicator shape.'
	},
	{
		name: '--g-check-indicator-icon-color',
		type: 'CSS color',
		defaultValue: 'var(--g-on-color)',
		description: 'Icon color for checked checkbox indicators.'
	}
];

const checkFieldCssVariables: DocsPropRow[] = [
	...checkIndicatorCssVariables,
	{
		name: '--g-check-control-gap',
		type: 'CSS length',
		description: 'Gap between indicator, label and message content.'
	}
];

const overlayEmits: DocsPropRow[] = [
	{
		name: 'update:modelValue',
		type: '(value: boolean) => void',
		description: 'Emitted when the overlay opens or closes.'
	}
];

export const componentApiEmits: Record<string, DocsPropRow[]> = {
	avatar: [
		{
			name: 'click',
			type: '(event: MouseEvent) => void',
			description:
				'Emitted when the avatar surface is clicked. Disabled avatars prevent the event.'
		}
	],
	'avatar-group': [],
	button: [],
	card: [
		{
			name: 'click',
			type: '(event: MouseEvent) => void',
			description:
				'Emitted when the card surface is clicked. Disabled cards prevent the event.'
		}
	],
	divider: [],
	chip: [
		{
			name: 'remove',
			type: '() => void',
			description: 'Emitted when the built-in remove action is clicked.'
		}
	],
	badge: [],
	expansion: [
		{
			name: 'update:modelValue',
			type: '(value: boolean) => void',
			description: 'Emitted when controlled expanded state changes.'
		},
		{
			name: 'click',
			type: '(event: MouseEvent) => void',
			description: 'Emitted when the expansion header is clicked.'
		}
	],
	'expansion-group': [
		{
			name: 'update:modelValue',
			type: '(value: unknown | unknown[]) => void',
			description: 'Emitted when selected expansion values change.'
		}
	],
	modal: overlayEmits,
	drawer: overlayEmits,
	menu: [
		{
			name: 'select',
			type: '(item: MenuItem) => void',
			description: 'Emitted when a non-disabled menu item is selected.'
		},
		{
			name: 'hover',
			type: '(item: MenuItem) => void',
			description: 'Emitted when a menu item receives pointer hover.'
		}
	],
	tooltip: [],
	form: [
		{
			name: 'submit',
			type: '(event: SubmitEvent, validation: GFormValidationState) => void',
			description:
				'Emitted on native submit before optional validation result events.'
		},
		{
			name: 'submit-valid',
			type: '(event: SubmitEvent, validation: GFormValidationState) => void',
			description:
				'Emitted after submit validation passes for all nested validators.'
		},
		{
			name: 'submit-invalid',
			type: '(event: SubmitEvent, validation: GFormValidationState) => void',
			description:
				'Emitted after submit validation fails for local or nested validators.'
		},
		{
			name: 'reset',
			type: '(event: Event, validation: GFormValidationState) => void',
			description: 'Emitted after native reset clears validation state.'
		}
	],
	input: [
		...textFieldEmits,
		{
			name: 'toggle-password',
			type: '(visible: boolean) => void',
			description:
				'Emitted when the password visibility control is toggled.'
		}
	],
	textarea: textFieldEmits,
	select: [
		{
			name: 'update:modelValue',
			type: '(value: unknown) => void',
			description:
				'Emitted when the selected value, object or value array changes.'
		},
		{
			name: 'focus',
			type: '(event: FocusEvent) => void',
			description: 'Emitted when the combobox receives focus.'
		},
		{
			name: 'blur',
			type: '(event: FocusEvent) => void',
			description: 'Emitted when the combobox loses focus.'
		},
		{
			name: 'clear',
			type: '() => void',
			description: 'Emitted when the clear action resets selection.'
		}
	],
	combobox: [
		{
			name: 'update:modelValue',
			type: '(value: unknown) => void',
			description:
				'Emitted when an option, custom value or value array changes.'
		},
		{
			name: 'update:search',
			type: '(value: string) => void',
			description: 'Emitted when the editable search text changes.'
		},
		{
			name: 'focus',
			type: '(event: FocusEvent) => void',
			description: 'Emitted when the combobox input receives focus.'
		},
		{
			name: 'blur',
			type: '(event: FocusEvent) => void',
			description: 'Emitted when the combobox input loses focus.'
		},
		{
			name: 'clear',
			type: '() => void',
			description: 'Emitted when the clear action resets selection.'
		},
		{
			name: 'add',
			type: '(item: T, query: string) => void',
			description:
				'Emitted when a custom value is added to the selection.'
		},
		{
			name: 'select',
			type: '(item: InternalItem<T, V>) => void',
			description: 'Emitted after an existing or custom item is selected.'
		}
	],
	checkbox: checkControlEmits,
	'checkbox-group': checkGroupEmits('unknown[]'),
	radio: checkGroupEmits('unknown'),
	switch: checkControlEmits,
	tabs: [
		{
			name: 'update:modelValue',
			type: '(value: unknown) => void',
			description: 'Emitted when the active tab changes.'
		},
		{
			name: 'select',
			type: '(value: unknown, event?: Event) => void',
			description: 'Emitted when a tab value is selected.'
		}
	],
	stepper: [
		{
			name: 'update:modelValue',
			type: '(value: unknown) => void',
			description: 'Emitted when the active step changes.'
		},
		{
			name: 'select',
			type: '(value: unknown, item: GStepperResolvedItem, event?: Event) => void',
			description: 'Emitted when a step is selected.'
		},
		{
			name: 'next',
			type: '(value: unknown, item: GStepperResolvedItem, event?: Event) => void',
			description: 'Emitted after the next action advances the flow.'
		},
		{
			name: 'prev',
			type: '(value: unknown, item: GStepperResolvedItem, event?: Event) => void',
			description:
				'Emitted after the previous action moves the flow back.'
		},
		{
			name: 'finish',
			type: '(value: unknown, item: GStepperResolvedItem, event?: Event) => void',
			description: 'Emitted when the final action is activated.'
		}
	],
	navbar: [
		{
			name: 'update:modelValue',
			type: '(value: unknown) => void',
			description: 'Emitted when the selected navbar item changes.'
		},
		{
			name: 'select',
			type: '(value: unknown, event?: Event) => void',
			description: 'Emitted when a navbar item is selected.'
		}
	],
	aside: [
		{
			name: 'update:modelValue',
			type: '(value: unknown) => void',
			description: 'Emitted when the selected aside item changes.'
		},
		{
			name: 'select',
			type: '(value: unknown, event?: Event) => void',
			description: 'Emitted when an aside item is selected.'
		}
	],
	table: [
		{
			name: 'update:expanded',
			type: '(value: Array<string | number>) => void',
			description:
				'Emitted when an expandable row opens or closes through v-model:expanded.'
		},
		{
			name: 'expand',
			type: '(item: unknown, expanded: boolean) => void',
			description: 'Emitted after a row expansion state is toggled.'
		},
		{
			name: 'row-click',
			type: '(item: unknown, event: MouseEvent) => void',
			description: 'Emitted when a body row is clicked.'
		},
		{
			name: 'cell-click',
			type: '(context: GTableCellContext, event: MouseEvent) => void',
			description: 'Emitted when a rendered body cell is clicked.'
		}
	],
	loading: [
		{
			name: 'close',
			type: '() => void',
			description: 'Emitted after the leave transition completes.'
		}
	],
	snackbar: [
		{
			name: 'update:modelValue',
			type: '(value: boolean) => void',
			description: 'Emitted when controlled open state changes.'
		},
		{
			name: 'action',
			type: '(value: unknown) => void',
			description: 'Emitted when the snackbar action is clicked.'
		},
		{
			name: 'close',
			type: "(reason: 'manual' | 'timeout' | 'action' | 'dismiss') => void",
			description: 'Emitted when the snackbar starts closing.'
		},
		{
			name: 'after-close',
			type: "(reason: 'manual' | 'timeout' | 'action' | 'dismiss') => void",
			description: 'Emitted after the leave transition completes.'
		}
	]
};

export const componentApiCssVariables: Record<string, DocsPropRow[]> = {
	avatar: [
		...surfaceCssVariables,
		{
			name: '--g-avatar-size',
			type: 'CSS length',
			description: 'Resolved inline and block size of the avatar.'
		},
		{
			name: '--g-avatar-radius',
			type: 'CSS length | percentage',
			description: 'Resolved radius used by the selected avatar shape.'
		},
		{
			name: '--g-avatar-font-size',
			type: 'CSS length',
			description: 'Initials text size for the current avatar size.'
		},
		{
			name: '--g-avatar-icon-size',
			type: 'CSS length',
			description: 'Icon size for icon-based avatars.'
		}
	],
	'avatar-group': [
		{
			name: '--g-avatar-group-overlap',
			type: 'CSS length',
			defaultValue: '12px',
			description: 'Negative spacing used between stacked avatars.'
		}
	],
	button: [...surfaceCssVariables, ...actionSizeCssVariables],
	card: [
		...surfaceCssVariables,
		{
			name: '--g-card-padding',
			type: 'CSS length',
			description: 'Inner body padding resolved from the card size.'
		},
		{
			name: '--g-card-gap',
			type: 'CSS length',
			description:
				'Vertical spacing between card header, text and actions.'
		},
		{
			name: '--g-card-media-size',
			type: 'CSS length',
			description:
				'Preferred media height used by overlay and responsive media layouts.'
		},
		{
			name: '--g-card-resolved-padding',
			type: 'CSS length',
			description:
				'Final body padding after size and density are combined.'
		},
		{
			name: '--g-card-resolved-gap',
			type: 'CSS length',
			description:
				'Final inner spacing after size and density are combined.'
		},
		{
			name: '--g-card-resolved-media-size',
			type: 'CSS length',
			description: 'Final media size after size and density are combined.'
		}
	],
	divider: [
		...surfaceCssVariables,
		{
			name: '--g-divider-thickness',
			type: 'CSS length',
			defaultValue: '1px',
			description: 'Resolved thickness of the visible divider line.'
		},
		{
			name: '--g-divider-length',
			type: 'CSS length',
			defaultValue: '100%',
			description:
				'Resolved inline length for horizontal dividers or block length for vertical dividers.'
		},
		{
			name: '--g-divider-inset',
			type: 'CSS length',
			defaultValue: '0px',
			description: 'Inset padding applied before the line is rendered.'
		},
		{
			name: '--g-divider-gap',
			type: 'CSS length',
			description: 'Gap between line segments and divider content.'
		}
	],
	chip: [...surfaceCssVariables, ...actionSizeCssVariables],
	badge: [
		...surfaceCssVariables,
		{
			name: '--g-surface-overlay-opacity',
			type: 'number',
			description: 'Overlay opacity used by tonal badge variants.'
		}
	],
	alert: surfaceCssVariables,
	snackbar: [
		...surfaceCssVariables,
		{
			name: '--g-snackbar-offset',
			type: 'CSS length',
			defaultValue: '24px',
			description:
				'Distance from the viewport or positioned container edge.'
		},
		{
			name: '--g-snackbar-max-width',
			type: 'CSS length',
			defaultValue: '520px',
			description: 'Maximum snackbar width before text wraps.'
		},
		{
			name: '--g-snackbar-z-index',
			type: 'number',
			defaultValue: '2600',
			description: 'Stacking level for fixed and service snackbars.'
		}
	],
	expansion: [
		...surfaceCssVariables,
		{
			name: '--g-token-expansion-radius',
			type: 'CSS length',
			description: 'Base border radius of the expansion surface.'
		},
		{
			name: '--g-token-expansion-padding-*',
			type: 'CSS length',
			description:
				'Header and content padding tokens for s, m, l and xl sizes.'
		},
		{
			name: '--g-token-expansion-title-font-size-*',
			type: 'CSS length',
			description: 'Title font-size tokens for s, m, l and xl sizes.'
		},
		{
			name: '--g-token-expansion-content-color',
			type: 'CSS color',
			description: 'Default content text color.'
		}
	],
	'expansion-group': [
		{
			name: '--g-expansion-group-gap',
			type: 'CSS length',
			defaultValue: 'var(--g-token-expansion-group-gap)',
			description:
				'Runtime gap between expansion items. Controlled by the gap prop.'
		},
		{
			name: '--g-token-expansion-divider-color',
			type: 'CSS color',
			description: 'Divider color for divided groups.'
		}
	],
	menu: [
		...surfaceCssVariables,
		{
			name: '--g-token-menu-gap',
			type: 'CSS length',
			description: 'Vertical gap between menu rows.'
		},
		{
			name: '--g-token-menu-item-padding-*',
			type: 'CSS length',
			description: 'Menu item horizontal and vertical padding tokens.'
		},
		{
			name: '--g-token-menu-item-radius',
			type: 'CSS length',
			description: 'Border radius of each menu row.'
		},
		{
			name: '--g-token-menu-item-selected-opacity',
			type: 'number',
			description: 'Tonal opacity for selected menu rows.'
		}
	],
	fab: [
		{
			name: '--g-color',
			type: 'CSS color',
			description: 'Resolved squircle accent color.'
		},
		{
			name: '--g-on-color',
			type: 'CSS color',
			description: 'Readable foreground color for gradient FAB surfaces.'
		}
	],
	'quick-actions': [
		{
			name: '--g-quick-actions-gap',
			type: 'CSS length',
			defaultValue: 'var(--g-token-space-3)',
			description: 'Distance between revealed quick action items.'
		}
	],
	progress: [
		{
			name: '--g-progress-value',
			type: 'percentage',
			description: 'Resolved progress value used by the active bar.'
		},
		{
			name: '--g-progress-track-width',
			type: 'CSS length',
			description:
				'Measured track width used to keep gradient overlays aligned.'
		},
		{
			name: '--g-progress-height',
			type: 'CSS length',
			defaultValue: 'var(--g-token-space-5)',
			description: 'Track height resolved from the component size.'
		},
		{
			name: '--g-progress-radius',
			type: 'CSS length',
			defaultValue: 'var(--g-token-radius-sm)',
			description: 'Border radius for the track and active bar.'
		},
		{
			name: '--g-progress-label-align',
			type: 'left | center | right',
			defaultValue: 'center',
			description: 'Text alignment for the label row.'
		},
		{
			name: '--g-progress-label-color',
			type: 'CSS color',
			description: 'Resolved label color mixed from accent and surface.'
		},
		{
			name: '--g-progress-segment-gap',
			type: 'CSS length',
			defaultValue: '3px',
			description: 'Divider width used by segmented progress view.'
		},
		{
			name: '--g-progress-segment-position',
			type: 'percentage',
			description:
				'Internal divider position used by segmented progress view.'
		},
		{
			name: '--g-color',
			type: 'CSS color',
			description: 'Resolved progress accent color.'
		}
	],
	input: fieldCssVariables,
	textarea: fieldCssVariables,
	select: [
		...fieldCssVariables,
		{
			name: '--g-token-select-control-min-height',
			type: 'CSS length',
			description: 'Minimum height of the select combobox control.'
		},
		{
			name: '--g-token-select-placeholder-opacity',
			type: 'number',
			description:
				'Opacity for placeholder text when nothing is selected.'
		}
	],
	combobox: [
		...fieldCssVariables,
		{
			name: '--g-token-select-control-min-height',
			type: 'CSS length',
			description: 'Minimum height of the editable combobox control.'
		},
		{
			name: '--g-color',
			type: 'CSS color',
			description:
				'Resolved accent color used by custom rows, chips and focused field chrome.'
		}
	],
	loading: [
		{
			name: '--g-loading-overlay-opacity',
			type: 'number | string',
			defaultValue: '0.72',
			description: 'Overlay opacity for light and dark loading scrims.'
		},
		{
			name: '--g-loading-overlay-blur',
			type: 'CSS length',
			defaultValue: '4px',
			description: 'Backdrop blur applied to the loading overlay.'
		},
		{
			name: '--g-loading-z-index',
			type: 'number',
			defaultValue: '20',
			description: 'Stacking level for directive and service containers.'
		}
	],
	modal: [
		{
			name: '--g-modal-fullscreen-inset',
			type: 'CSS length',
			defaultValue: 'var(--g-token-space-4)',
			description: 'Viewport inset used by fullscreen modal mode.'
		},
		{
			name: '--g-token-overlay-padding',
			type: 'CSS length',
			defaultValue: 'var(--g-token-space-5)',
			description: 'Internal padding of the modal surface.'
		}
	],
	drawer: [
		{
			name: '--g-token-overlay-padding',
			type: 'CSS length',
			defaultValue: 'var(--g-token-space-5)',
			description: 'Internal padding of the drawer surface.'
		}
	],
	tooltip: [
		{
			name: '--g-tooltip-z-index',
			type: 'number',
			description: 'Optional stacking override for tooltip content.'
		}
	],
	checkbox: checkFieldCssVariables,
	'checkbox-group': [
		...checkFieldCssVariables,
		{
			name: '--g-check-group-gap',
			type: 'CSS length',
			description: 'Gap between options inside the group.'
		}
	],
	radio: checkFieldCssVariables,
	switch: [
		...checkFieldCssVariables,
		{
			name: '--g-check-indicator-track-width',
			type: 'CSS length',
			description: 'Resolved switch track width.'
		},
		{
			name: '--g-check-indicator-thumb-size',
			type: 'CSS length',
			description: 'Resolved switch thumb size.'
		}
	],
	tabs: [
		{
			name: '--g-tabs-indicator-gradient',
			type: 'CSS background',
			description: 'Gradient used by the active tab indicator.'
		}
	],
	stepper: [
		{
			name: '--g-stepper-active-gradient',
			type: 'CSS background',
			description: 'Gradient used by completed connectors and indicators.'
		},
		{
			name: '--g-stepper-divider-thickness',
			type: 'CSS length',
			description: 'Thickness of the connector line between steps.'
		},
		{
			name: '--g-stepper-divider-length',
			type: 'CSS length',
			description: 'Optional connector length between step items.'
		},
		{
			name: '--g-stepper-divider-color',
			type: 'CSS color',
			description:
				'Solid color used by inactive solid, dashed and dotted connectors.'
		},
		{
			name: '--g-stepper-divider-gradient',
			type: 'CSS background',
			description: 'Gradient used by inactive gradient connectors.'
		},
		{
			name: '--g-stepper-divider-active-color',
			type: 'CSS color',
			description:
				'Solid color used by active dashed and dotted connectors.'
		},
		{
			name: '--g-stepper-divider-active-gradient',
			type: 'CSS background',
			description:
				'Gradient used by active solid and gradient connectors.'
		}
	],
	navbar: [
		{
			name: '--g-navbar-height',
			type: 'CSS length',
			description: 'Height used by sticky layout calculations.'
		},
		{
			name: '--g-navbar-z-index',
			type: 'number',
			description: 'Stacking level for the navbar shell.'
		}
	],
	aside: [
		{
			name: '--g-aside-width',
			type: 'CSS length',
			description: 'Rendered width of the aside navigation.'
		},
		{
			name: '--g-aside-active-gradient',
			type: 'CSS background',
			description: 'Gradient used by active aside indicators.'
		}
	],
	table: [
		...surfaceCssVariables,
		{
			name: '--g-table-padding-x',
			type: 'CSS length',
			description: 'Horizontal padding for table header and body cells.'
		},
		{
			name: '--g-table-padding-y',
			type: 'CSS length',
			description: 'Vertical padding for table header and body cells.'
		},
		{
			name: '--g-table-radius',
			type: 'CSS length',
			description: 'Outer table surface radius.'
		},
		{
			name: '--g-table-border-color',
			type: 'CSS color',
			description: 'Divider color between rows and optional cell borders.'
		},
		{
			name: '--g-table-header-color',
			type: 'CSS color',
			description: 'Header text color.'
		}
	]
};

const materialFrameApiProps: DocsPropRow[] = [
	{
		name: 'gradientRecipe',
		type: 'GradientTokenRecipe',
		description:
			'Overrides the shared material recipe used by the fill, border and glow.'
	},
	{
		name: 'borderWidth',
		type: 'number | string',
		description:
			'Width of the real transparent gradient frame. Outlined, glass and glow surfaces default to one pixel.'
	},
	{
		name: 'borderRadius',
		type: 'number | string',
		description: 'Inner radius shared by the surface and SVG frame.'
	},
	{
		name: 'placement',
		type: "'top' | 'right' | 'bottom' | 'left' | 'center'",
		defaultValue: "'center'",
		description:
			'Limits the gradient frame to one side or keeps a full frame.'
	},
	{
		name: 'glow',
		type: 'boolean | number | string',
		description:
			'Enables the SVG-filtered glow derived from the frame recipe.'
	},
	{
		name: 'animateGlow',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Pulses the independent glow layer when motion is allowed.'
	}
];

export const componentApi: DocsComponentApi[] = [
	{
		id: 'avatar',
		title: 'GAvatar',
		group: 'containment',
		description:
			'Gradient-aware identity surface for initials, icons, images and compact profile composition.',
		props: [
			{
				name: 'src',
				type: 'string',
				description: 'Image source rendered inside the avatar.'
			},
			{
				name: 'image',
				type: 'string',
				description:
					'Alias for src, useful when matching card-like media APIs.'
			},
			{
				name: 'alt',
				type: 'string',
				description:
					'Accessible image alt text. Also labels text or icon avatars.'
			},
			{
				name: 'name',
				type: 'string',
				description:
					'Full name used to generate initials when text is not provided.'
			},
			{
				name: 'text',
				type: 'string',
				description:
					'Initials or short content rendered when no image or default slot is provided.'
			},
			{
				name: 'icon',
				type: 'MdiIcon',
				description:
					'Icon rendered when no image or default slot is provided.'
			},
			{
				name: 'shape',
				type: "'circle' | 'rounded' | 'square' | 'squircle'",
				defaultValue: "'circle'",
				description:
					'Avatar geometry preset. Squircle uses a super-rounded compact profile shape.'
			},
			{
				name: 'variant',
				type: "'default' | 'gradient' | 'tonal' | 'outlined' | 'glass'",
				defaultValue: "'tonal'",
				description: 'Visual treatment of the avatar surface.'
			},
			{
				name: 'color',
				type: 'string',
				defaultValue: "'primary'",
				description: 'Theme color or custom color seed.'
			},
			{
				name: 'state',
				type: "'warning' | 'success' | 'error'",
				description:
					'Semantic state that switches the avatar material color.'
			},
			{
				name: 'size',
				type: "'s' | 'm' | 'l' | 'xl'",
				defaultValue: "'m'",
				description: 'Controls avatar diameter and content scale.'
			},
			{
				name: 'texture',
				type: "'none' | 'noise'",
				defaultValue: "'none'",
				description:
					'Adds a material texture layer above the avatar surface.',
				badge: docsUpcomingReleaseBadge
			},
			{
				name: 'disabled',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Disables link/button interaction and lowers emphasis.'
			},
			{
				name: 'hover',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Enables gradient-frame lift on hover without making the avatar interactive.'
			},
			{
				name: 'tag',
				type: 'string',
				description:
					'Root HTML tag override. Defaults to span, or anchor when href is present.'
			},
			{
				name: 'href',
				type: 'string',
				description: 'Renders the avatar as an anchor when provided.'
			},
			...materialFrameApiProps
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '-',
				description:
					'Custom avatar content. Overrides image, icon and text rendering.'
			}
		],
		examples: [
			{
				id: 'avatar-basic',
				label: 'Basic',
				code: `
<template>
	<g-avatar
		name="Ada Lovelace"
		shape="squircle"
		color="pink" />
</template>`
			}
		]
	},
	{
		id: 'avatar-group',
		title: 'GAvatarGroup',
		group: 'containment',
		description:
			'Composable avatar cluster for teams, assignees and presence stacks.',
		props: [
			{
				name: 'items',
				type: 'GAvatarGroupItem[]',
				defaultValue: '[]',
				description:
					'Avatar data rendered when the default slot is not provided.'
			},
			{
				name: 'max',
				type: 'number',
				description:
					'Maximum number of visible avatars before the overflow item is shown.'
			},
			{
				name: 'total',
				type: 'number',
				description:
					'Total count used for overflow when the loaded items array is partial.'
			},
			{
				name: 'size',
				type: "'s' | 'm' | 'l' | 'xl'",
				defaultValue: "'m'",
				description: 'Size passed to generated avatars and overflow.'
			},
			{
				name: 'shape',
				type: "'circle' | 'rounded' | 'square' | 'squircle'",
				defaultValue: "'circle'",
				description: 'Shape passed to generated avatars and overflow.'
			},
			{
				name: 'variant',
				type: "'default' | 'gradient' | 'tonal' | 'outlined' | 'glass'",
				defaultValue: "'tonal'",
				description:
					'Fallback variant for generated avatars and overflow.'
			},
			{
				name: 'color',
				type: 'string',
				defaultValue: "'primary'",
				description:
					'Fallback theme color for generated avatars and overflow.'
			},
			{
				name: 'overflowColor',
				type: 'string',
				description:
					'Theme color used by the overflow avatar. Falls back to color.'
			},
			{
				name: 'overlap',
				type: 'number | string',
				defaultValue: '12',
				description:
					'Spacing overlap between stacked avatars. Numbers resolve to px.'
			},
			{
				name: 'stacked',
				type: 'boolean',
				defaultValue: 'true',
				description:
					'Overlaps avatars instead of rendering them with normal spacing.'
			},
			{
				name: 'reverse',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Reverses visual stacking direction.'
			},
			{
				name: 'hover',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Enables hover lift for generated avatars and overflow.'
			},
			{
				name: 'ariaLabel',
				type: 'string',
				defaultValue: "'Avatar group'",
				description: 'Accessible label for the group wrapper.'
			}
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '-',
				description:
					'Custom avatar nodes. Overrides generated rendering from items.'
			},
			{
				name: 'overflow',
				type: 'slot',
				scope: '{ count: number }',
				description: 'Custom overflow content for hidden avatars.'
			}
		],
		examples: [
			{
				id: 'avatar-group-basic',
				label: 'Basic',
				code: `
<template>
	<g-avatar-group
		:items="team"
		:max="4"
		:total="8"
		shape="squircle" />
</template>`
			}
		]
	},
	{
		id: 'button',
		title: 'GButton',
		group: 'containment',
		description:
			'Action surface for primary, secondary and icon actions with gradient-aware states.',
		props: [
			{
				name: 'label',
				type: 'string',
				description:
					'Text content rendered when the default slot is not provided.'
			},
			{
				name: 'variant',
				type: "'gradient' | 'tonal' | 'text' | 'outlined' | 'glass' | 'default'",
				defaultValue: "'default'",
				description: 'Visual priority of the action.'
			},
			{
				name: 'backdropBlur',
				type: 'number | numeric string',
				defaultValue: '6',
				description: 'Backdrop blur radius used by the glass variant.'
			},
			{
				name: 'color',
				type: 'string',
				defaultValue: "'primary'",
				description: 'Theme color or custom color seed.'
			},
			{
				name: 'state',
				type: "'warning' | 'success' | 'error'",
				description:
					'Semantic state that switches the gradient and action color.'
			},
			{
				name: 'size',
				type: "'s' | 'm' | 'l' | 'xl'",
				defaultValue: "'m'",
				description: 'Button density and label size.'
			},
			{
				name: 'rounded',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Applies the shared rounded class for pill-like geometry.'
			},
			{
				name: 'borderRadius',
				type: 'number | string',
				defaultValue: '6',
				description:
					'Exact corner radius passed through the gradient wrapper.'
			},
			{
				name: 'borderWidth',
				type: 'number | string',
				defaultValue: '0',
				description: 'Gradient border width around the button surface.'
			},
			{
				name: 'placement',
				type: "'top' | 'right' | 'bottom' | 'left' | 'center'",
				defaultValue: "'center'",
				description:
					'Gradient UI-specific accent placement for the wrapped gradient.'
			},
			{
				name: 'glow',
				type: 'boolean | number | string',
				description: 'Enables glow around the gradient wrapper.'
			},
			{
				name: 'animateGlow',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Animates the gradient glow layer.'
			},
			{
				name: 'texture',
				type: "'none' | 'noise'",
				defaultValue: "'none'",
				description:
					'Adds a subtle material texture layer above the surface color.',
				badge: docsUpcomingReleaseBadge
			},
			{
				name: 'shadow',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Adds gradient-aware shadow to the wrapper.'
			},
			{
				name: 'active',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Forces active surface colors without changing the slot content.'
			},
			{
				name: 'activeColor',
				type: 'string',
				description: 'Color used when the button is active.'
			},
			{
				name: 'activeState',
				type: "'warning' | 'success' | 'error'",
				description: 'Semantic state used when the button is active.'
			},
			{
				name: 'activeVariant',
				type: "'gradient' | 'tonal' | 'text' | 'outlined' | 'glass' | 'default'",
				description: 'Variant used while active or selected.'
			},
			{
				name: 'disabled',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Disables interaction and lowers emphasis.'
			},
			{
				name: 'prepend',
				type: 'MdiIcon',
				description: 'Icon rendered before the label.'
			},
			{
				name: 'append',
				type: 'MdiIcon',
				description: 'Icon rendered after the label.'
			},
			{
				name: 'iconButton',
				type: 'MdiIcon',
				description: 'Renders a compact icon-only action.'
			},
			{
				name: 'isIconButton',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Applies icon-only sizing while leaving slot content fully custom.'
			}
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '-',
				description:
					'Replaces the label area. Use it for rich button content or custom icon-only buttons.'
			},
			{
				name: 'prepend',
				type: 'slot',
				scope: '-',
				description: 'Replaces the icon rendered before the label.'
			},
			{
				name: 'append',
				type: 'slot',
				scope: '-',
				description: 'Replaces the icon rendered after the label.'
			}
		],
		examples: [
			{
				id: 'variants',
				label: 'Variants',
				code: `
<template>
	<g-button label="Default" />
	<g-button label="Tonal" variant="tonal" />
	<g-button label="Text" variant="text" />
	<g-button label="Outlined" variant="outlined" />
</template>`
			},
			{
				id: 'icons',
				label: 'Icons',
				code: `
<template>
	<g-button label="Create" prepend="plus" />
	<g-button icon-button="heart" variant="tonal" />
</template>`
			},
			{
				id: 'gradient',
				label: 'Gradient',
				code: `
<template>
	<g-button label="Gradient" variant="gradient" />
</template>`
			}
		]
	},
	{
		id: 'card',
		title: 'GCard',
		group: 'containment',
		description:
			'Gradient-engine aware content surface for previews, dashboards, media cards and composed information blocks.',
		props: [
			{
				name: 'title',
				type: 'string',
				description:
					'Heading rendered when the title slot is not provided.'
			},
			{
				name: 'subtitle',
				type: 'string',
				description:
					'Secondary heading text rendered below the card title.'
			},
			{
				name: 'text',
				type: 'string',
				description:
					'Body text rendered when the default slot is not provided.'
			},
			{
				name: 'image',
				type: 'string',
				description:
					'Image URL rendered in the media area when the media slot is not provided.'
			},
			{
				name: 'imageAlt',
				type: 'string',
				description:
					'Accessible alt text for the image prop. Falls back to title.'
			},
			{
				name: 'layout',
				type: "'default' | 'media' | 'horizontal' | 'overlay' | 'profile' | 'compact' | 'banner' | 'inset' | 'media-bottom' | 'metric'",
				defaultValue: "'default'",
				description:
					'Preset composition for the card anatomy, similar in spirit to Vuesax card type layouts.'
			},
			{
				name: 'variant',
				type: "'default' | 'gradient' | 'tonal' | 'outlined' | 'glass'",
				defaultValue: "'tonal'",
				description: 'Visual treatment of the card surface.'
			},
			{
				name: 'color',
				type: 'string',
				defaultValue: "'primary'",
				description: 'Theme color or custom color seed.'
			},
			{
				name: 'state',
				type: "'warning' | 'success' | 'error'",
				description:
					'Semantic state that switches the card material color.'
			},
			{
				name: 'size',
				type: "'s' | 'm' | 'l' | 'xl'",
				defaultValue: "'m'",
				description: 'Controls card padding, gap and media scale.'
			},
			{
				name: 'density',
				type: "'compact' | 'comfortable' | 'spacious'",
				defaultValue: "'comfortable'",
				description:
					'Adjusts the card rhythm without changing the semantic size scale.'
			},
			{
				name: 'prependIcon',
				type: 'MdiIcon',
				description: 'Icon rendered before the title area.'
			},
			{
				name: 'appendIcon',
				type: 'MdiIcon',
				description: 'Icon rendered after the title area.'
			},
			{
				name: 'texture',
				type: "'none' | 'noise'",
				defaultValue: "'none'",
				description:
					'Adds a material texture layer above the card surface.',
				badge: docsUpcomingReleaseBadge
			},
			{
				name: 'shadow',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Adds gradient-aware material shadow.'
			},
			{
				name: 'dropShadow',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Adds a softer drop shadow from the material engine.'
			},
			{
				name: 'morph',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Enables animated morph blobs in gradient-aware material layers.'
			},
			{
				name: 'backdropBlur',
				type: 'number | numeric string',
				defaultValue: '6',
				description: 'Backdrop blur radius used by the glass variant.'
			},
			{
				name: 'tag',
				type: 'string',
				description:
					'Root HTML tag override. Defaults to article, or anchor when href is present.'
			},
			{
				name: 'href',
				type: 'string',
				description: 'Renders the card as an anchor when provided.'
			},
			{
				name: 'disabled',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Disables link/button interaction and lowers emphasis.'
			},
			{
				name: 'hover',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Enables lift on hover without making the card interactive.'
			},
			{
				name: 'loading',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Shows a local loading overlay and pauses card interaction.'
			},
			{
				name: 'loadingText',
				type: 'string',
				defaultValue: "'Loading...'",
				description:
					'Accessible text rendered inside the loading overlay.'
			},
			{
				name: 'loadingProgressView',
				type: "'default' | 'glow' | 'striped' | 'segmented'",
				defaultValue: "'glow'",
				description:
					'Progress visualization used by the card loading overlay.'
			},
			...materialFrameApiProps
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '-',
				description: 'Main body content.'
			},
			{
				name: 'title',
				type: 'slot',
				scope: '-',
				description: 'Custom title content.'
			},
			{
				name: 'subtitle',
				type: 'slot',
				scope: '-',
				description: 'Custom subtitle content.'
			},
			{
				name: 'media',
				type: 'slot',
				scope: '-',
				description:
					'Custom media area for images, previews or artwork.'
			},
			{
				name: 'prepend',
				type: 'slot',
				scope: '-',
				description: 'Leading content before the heading.'
			},
			{
				name: 'append',
				type: 'slot',
				scope: '-',
				description: 'Trailing content after the heading.'
			},
			{
				name: 'actions',
				type: 'slot',
				scope: '-',
				description: 'Action row rendered below the body text.'
			},
			{
				name: 'footer',
				type: 'slot',
				scope: '-',
				description: 'Footer row separated from the main body.'
			}
		],
		examples: [
			{
				id: 'card-basic',
				label: 'Basic',
				code: `
<template>
	<g-card
		title="Gradient report"
		subtitle="Updated 12 min ago"
		text="A calm content surface for previews and dashboards."
		variant="tonal" />
</template>`
			}
		]
	},
	{
		id: 'divider',
		title: 'GDivider',
		group: 'containment',
		description:
			'Gradient-aware separator primitive for section rhythm, labeled breaks and vertical composition.',
		props: [
			{
				name: 'label',
				type: 'string',
				description:
					'Text rendered between line segments when the default slot is not provided.'
			},
			{
				name: 'icon',
				type: 'MdiIcon',
				description:
					'Icon rendered before the label when the prepend slot is not provided.'
			},
			{
				name: 'orientation',
				type: "'horizontal' | 'vertical'",
				defaultValue: "'horizontal'",
				description:
					'Direction of the separator. Vertical dividers use length as height.'
			},
			{
				name: 'variant',
				type: "'default' | 'tonal' | 'outlined' | 'glass' | 'gradient'",
				defaultValue: "'tonal'",
				description:
					'Material treatment of the divider line and content.'
			},
			{
				name: 'effect',
				type: "'solid' | 'dashed' | 'dotted' | 'fade' | 'glow' | 'pulse'",
				defaultValue: "'solid'",
				description:
					'Line rendering effect applied on top of the selected variant.'
			},
			{
				name: 'align',
				type: "'start' | 'center' | 'end'",
				defaultValue: "'center'",
				description:
					'Position of label or slot content between segments.'
			},
			{
				name: 'thickness',
				type: 'number | string',
				defaultValue: '1',
				description: 'Visible line thickness. Numbers resolve to px.'
			},
			{
				name: 'length',
				type: 'number | string',
				defaultValue: "'100%'",
				description:
					'Divider length. For vertical orientation this controls height.'
			},
			{
				name: 'inset',
				type: 'boolean | number | string',
				defaultValue: 'false',
				description:
					'Adds start and end inset. Boolean true uses a spacing token; numbers resolve to px.'
			},
			{
				name: 'density',
				type: "'compact' | 'comfortable' | 'spacious'",
				defaultValue: "'comfortable'",
				description:
					'Controls gap and content padding without changing line thickness.'
			},
			{
				name: 'color',
				type: 'GColor',
				defaultValue: "'primary'",
				description:
					'Theme color or custom color seed used by gradient, glass and active material styles.'
			},
			{
				name: 'state',
				type: "'warning' | 'success' | 'error'",
				description:
					'Semantic tone that overrides the divider material color.'
			},
			{
				name: 'backdropBlur',
				type: 'number | string',
				defaultValue: '2',
				description: 'Backdrop blur radius used by the glass variant.'
			},
			{
				name: 'decorative',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Marks the divider as aria-hidden instead of exposing separator semantics.'
			},
			{
				name: 'texture',
				type: "'none' | 'noise'",
				defaultValue: "'none'",
				description:
					'Adds a material texture layer above the divider line.',
				badge: docsUpcomingReleaseBadge
			},
			...materialFrameApiProps,
			{
				name: 'tag',
				type: 'string',
				description:
					'Root HTML tag override. Defaults to div with separator semantics.'
			}
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '-',
				description: 'Custom content rendered between divider segments.'
			},
			{
				name: 'prepend',
				type: 'slot',
				scope: '-',
				description: 'Custom leading content before the label.'
			},
			{
				name: 'append',
				type: 'slot',
				scope: '-',
				description: 'Custom trailing content after the label.'
			}
		],
		examples: [
			{
				id: 'divider-basic',
				label: 'Basic',
				code: `
<template>
	<g-divider
		label="Today"
		icon="calendar"
		variant="glass"
		effect="glow" />
</template>`
			}
		]
	},
	{
		id: 'badge',
		title: 'GBadge',
		group: 'containment',
		description:
			'Compact status, count or metadata marker attached to another component.',
		props: [
			{
				name: 'content',
				type: 'string | number',
				description:
					'Text or number rendered inside the badge when the content slot is not provided.'
			},
			{
				name: 'dot',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Renders a compact status dot instead of text content.'
			},
			{
				name: 'variant',
				type: "'gradient' | 'tonal' | 'primary' | 'glass'",
				defaultValue: "'tonal'",
				description:
					'Visual treatment of the badge surface. Primary is kept as a compatibility alias for gradient.'
			},
			{
				name: 'color',
				type: 'string',
				defaultValue: "'primary'",
				description: 'Theme color or custom color seed.'
			},
			{
				name: 'state',
				type: "'warning' | 'success' | 'error'",
				description:
					'Semantic state that switches the badge surface color.'
			},
			...materialFrameApiProps,
			{
				name: 'size',
				type: "'s' | 'm' | 'l' | 'xl'",
				defaultValue: "'m'",
				description: 'Controls badge text scale and minimum height.'
			},
			{
				name: 'position',
				type: "'floating' | 'inline'",
				defaultValue: "'floating'",
				description:
					'Floating overlays the badge on the default slot, while inline renders it next to the content.'
			},
			{
				name: 'location',
				type: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'",
				defaultValue: "'top-right'",
				description: 'Corner used when position is floating.'
			}
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '-',
				description: 'Content the badge is attached to.'
			},
			{
				name: 'content',
				type: 'slot',
				scope: '-',
				description:
					'Custom badge content, such as an icon or formatted counter.'
			}
		],
		examples: [
			{
				id: 'badge-basic',
				label: 'Basic',
				code: `
<template>
	<g-badge content="4">
		<g-button label="Inbox" variant="tonal" />
	</g-badge>
</template>`
			}
		]
	},
	{
		id: 'chip',
		title: 'GChip',
		group: 'containment',
		description:
			'Compact gradient-aware surface for tags, filters, metadata and removable selections.',
		props: [
			{
				name: 'label',
				type: 'string',
				description:
					'Text content rendered when the default slot is not provided.'
			},
			{
				name: 'variant',
				type: "'gradient' | 'tonal' | 'text' | 'outlined' | 'glass' | 'default'",
				defaultValue: "'default'",
				description: 'Visual emphasis of the chip surface.'
			},
			{
				name: 'backdropBlur',
				type: 'number | numeric string',
				defaultValue: '6',
				description: 'Backdrop blur radius used by the glass variant.'
			},
			{
				name: 'color',
				type: 'string',
				defaultValue: "'primary'",
				description: 'Theme color or custom color seed.'
			},
			{
				name: 'state',
				type: "'warning' | 'success' | 'error'",
				description:
					'Semantic state that switches the gradient and surface color.'
			},
			{
				name: 'size',
				type: "'s' | 'm' | 'l' | 'xl'",
				defaultValue: "'m'",
				description: 'Chip density, icon size and label scale.'
			},
			{
				name: 'rounded',
				type: 'boolean',
				defaultValue: 'true',
				description:
					'Keeps the chip material and SVG frame aligned to its pill geometry.'
			},
			{
				name: 'borderRadius',
				type: 'number | string',
				defaultValue: '20',
				description:
					'Exact corner radius shared by the material and frame when rounded is false.'
			},
			{
				name: 'borderWidth',
				type: 'number | string',
				defaultValue: '0',
				description: 'Gradient border width around the chip surface.'
			},
			{
				name: 'placement',
				type: "'top' | 'right' | 'bottom' | 'left' | 'center'",
				defaultValue: "'center'",
				description:
					'Gradient UI-specific accent placement for the wrapped gradient.'
			},
			{
				name: 'glow',
				type: 'boolean | number | string',
				description: 'Enables glow around the gradient wrapper.'
			},
			{
				name: 'animateGlow',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Animates the gradient glow layer.'
			},
			{
				name: 'shadow',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Adds gradient-aware shadow to the wrapper.'
			},
			{
				name: 'active',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Forces active surface colors for selected filters or tags.'
			},
			{
				name: 'activeColor',
				type: 'string',
				description: 'Color used when the chip is active.'
			},
			{
				name: 'activeState',
				type: "'warning' | 'success' | 'error'",
				description: 'Semantic state used when the chip is active.'
			},
			{
				name: 'activeVariant',
				type: "'gradient' | 'tonal' | 'text' | 'outlined' | 'glass' | 'default'",
				description: 'Variant used while active or selected.'
			},
			{
				name: 'disabled',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Disables interaction and lowers emphasis.'
			},
			{
				name: 'prependIcon',
				type: 'MdiIcon',
				description: 'Icon rendered before the label.'
			},
			{
				name: 'appendIcon',
				type: 'MdiIcon',
				description: 'Icon rendered after the label.'
			},
			{
				name: 'removable',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Shows the built-in remove action.'
			}
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '-',
				description: 'Replaces the label area with custom content.'
			},
			{
				name: 'prepend',
				type: 'slot',
				scope: '-',
				description: 'Replaces the icon rendered before the label.'
			},
			{
				name: 'append',
				type: 'slot',
				scope: '-',
				description: 'Replaces the icon rendered after the label.'
			}
		],
		examples: [
			{
				id: 'chip-basic',
				label: 'Basic',
				code: `
<template>
	<g-chip label="Design tokens" prepend-icon="palette-outline" />
</template>`
			},
			{
				id: 'chip-removable',
				label: 'Removable',
				code: `
<template>
	<g-chip
		label="Vue 3"
		variant="tonal"
		prepend-icon="vuejs"
		removable />
</template>`
			}
		]
	},
	{
		id: 'expansion',
		title: 'GExpansion',
		group: 'containment',
		description:
			'Disclosure surface for progressive content, grouped accordions and gradient-aware expandable sections.',
		props: [
			{
				name: 'modelValue',
				type: 'boolean',
				description: 'Controlled expanded state for standalone usage.'
			},
			{
				name: 'defaultOpen',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Initial open state when the expansion is uncontrolled.'
			},
			{
				name: 'value',
				type: 'string | number | boolean | object | unknown[]',
				description:
					'Selection value used when the expansion is inside GExpansionGroup.'
			},
			{
				name: 'title',
				type: 'string',
				description:
					'Header title rendered when the title slot is not provided.'
			},
			{
				name: 'text',
				type: 'string',
				description:
					'Secondary header text rendered when the text slot is not provided.'
			},
			{
				name: 'variant',
				type: "'gradient' | 'tonal' | 'text' | 'outlined' | 'glass' | 'default'",
				defaultValue: "'text'",
				description: 'Visual treatment of the expansion surface.'
			},
			{
				name: 'backdropBlur',
				type: 'number | numeric string',
				defaultValue: '6',
				description: 'Backdrop blur radius used by the glass variant.'
			},
			{
				name: 'color',
				type: 'string',
				description: 'Theme color or custom color seed.'
			},
			{
				name: 'state',
				type: "'warning' | 'success' | 'error'",
				description:
					'Semantic state that colors the surface and gradient accent.'
			},
			{
				name: 'size',
				type: "'s' | 'm' | 'l' | 'xl'",
				defaultValue: "'m'",
				description: 'Header density and content spacing.'
			},
			{
				name: 'rounded',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Applies larger rounded corners.'
			},
			{
				name: 'disabled',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Disables toggling and lowers emphasis.'
			},
			{
				name: 'readonly',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Prevents user toggling while preserving the current visual state.'
			},
			{
				name: 'hideActions',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Hides the default chevron action area.'
			},
			{
				name: 'openedIcon',
				type: 'MdiIcon',
				defaultValue: "'chevron-down'",
				description: 'Icon shown when the expansion is open.'
			},
			{
				name: 'closedIcon',
				type: 'MdiIcon',
				defaultValue: "'chevron-down'",
				description: 'Icon shown when the expansion is closed.'
			},
			{
				name: 'eager',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Keeps the body mounted before it is opened.'
			},
			{
				name: 'transition',
				type: 'TransitionType',
				defaultValue: "'expand'",
				description: 'Transition used for the expandable body.'
			},
			{
				name: 'borderWidth',
				type: 'number | string',
				defaultValue: '0',
				description: 'Gradient border width around the surface.'
			},
			{
				name: 'glow',
				type: 'boolean | number | string',
				defaultValue: 'false',
				description: 'Enables glow around the gradient wrapper.'
			},
			{
				name: 'animateGlow',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Animates the gradient glow layer.'
			},
			{
				name: 'shadow',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Adds gradient-aware shadow to the wrapper.'
			},
			{
				name: 'placement',
				type: "'top' | 'right' | 'bottom' | 'left' | 'center'",
				defaultValue: "'center'",
				description: 'Gradient accent placement while closed.'
			},
			{
				name: 'activeBorderWidth',
				type: 'number | string',
				description: 'Gradient border width while expanded.'
			},
			{
				name: 'activeGlow',
				type: 'boolean | number | string',
				description: 'Glow value while expanded.'
			},
			{
				name: 'activeAnimateGlow',
				type: 'boolean',
				description: 'Glow animation state while expanded.'
			},
			{
				name: 'activeShadow',
				type: 'boolean',
				description: 'Shadow state while expanded.'
			},
			{
				name: 'activeState',
				type: "'warning' | 'success' | 'error'",
				description: 'Semantic state while expanded.'
			},
			{
				name: 'activePlacement',
				type: "'top' | 'right' | 'bottom' | 'left' | 'center'",
				description: 'Gradient accent placement while expanded.'
			}
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '{ expanded, disabled, readonly, value, toggle }',
				description: 'Expandable body content.'
			},
			{
				name: 'title',
				type: 'slot',
				scope: '{ expanded, disabled, readonly, value, toggle }',
				description: 'Custom header title content.'
			},
			{
				name: 'text',
				type: 'slot',
				scope: '{ expanded, disabled, readonly, value, toggle }',
				description: 'Custom secondary header text.'
			},
			{
				name: 'actions',
				type: 'slot',
				scope: '{ expanded, disabled, readonly, value, toggle }',
				description: 'Custom action area replacing the default icon.'
			}
		],
		examples: [
			{
				id: 'expansion-basic',
				label: 'Basic',
				code: `
<template>
	<g-expansion
		title="Design tokens"
		text="Shared spacing, color and type scale.">
		Expansion content
	</g-expansion>
</template>`
			}
		]
	},
	{
		id: 'expansion-group',
		title: 'GExpansionGroup',
		group: 'containment',
		description:
			'Selection controller for multiple GExpansion items with single, multiple, mandatory, readonly and divided layouts.',
		props: [
			{
				name: 'modelValue',
				type: 'T | T[] | null',
				defaultValue: 'null',
				description:
					'Selected expansion value in single mode, or selected values in multiple mode.'
			},
			{
				name: 'multiple',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Allows more than one expansion to stay open.'
			},
			{
				name: 'mandatory',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Prevents the selection model from becoming empty.'
			},
			{
				name: 'disabled',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Disables all child expansion items.'
			},
			{
				name: 'readonly',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Blocks user toggling while preserving the current selection state.'
			},
			{
				name: 'gap',
				type: 'number | string',
				description: 'Space between child expansion items.'
			},
			{
				name: 'divided',
				type: 'boolean',
				defaultValue: 'true',
				description:
					'Adds divider lines between adjacent expansion items.'
			}
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '-',
				description: 'GExpansion items rendered inside the group.'
			}
		],
		examples: [
			{
				id: 'expansion-group-basic',
				label: 'Basic',
				code: `
<script setup lang="ts">
	import { ref } from 'vue';

	const selected = ref('first');
</script>

<template>
	<g-expansion-group v-model="selected">
		<g-expansion value="first" title="First">
			First section
		</g-expansion>
		<g-expansion value="second" title="Second">
			Second section
		</g-expansion>
	</g-expansion-group>
</template>`
			}
		]
	},
	{
		id: 'form',
		title: 'GForm',
		group: 'form',
		description:
			'Native form wrapper that validates nested Gradient UI controls through gib-validate.',
		props: [
			{
				name: 'name',
				type: 'string',
				description:
					'Optional validation registry name passed to gib-validate.'
			},
			{
				name: 'preventDefault',
				type: 'boolean',
				defaultValue: 'true',
				description: 'Calls preventDefault on submit before emitting.'
			},
			{
				name: 'validateOnSubmit',
				type: 'boolean',
				defaultValue: 'true',
				description:
					'Runs validation on submit and emits submit-valid or submit-invalid.'
			},
			{
				name: 'validateOn',
				type: "'blur' | 'input' | 'submit' | 'lazy'",
				defaultValue: "'blur'",
				description:
					'Provides the default validation trigger for nested Gradient UI controls.'
			},
			{
				name: 'disabled',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Disables nested Gradient UI controls through form context.'
			},
			{
				name: 'scrollToError',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Scrolls the first invalid nested control into view after invalid submit.'
			},
			{
				name: 'focusFirstError',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Moves focus to the first invalid nested control after invalid submit.'
			},
			{
				name: 'noValidate',
				type: 'boolean',
				defaultValue: 'true',
				description:
					'Applies novalidate to the native form so custom validation owns feedback.'
			}
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '{ $v, valid, invalid, pending, dirty, error, errors, errorCount, firstError, disabled, validate, reset, touch, resetValidation }',
				description:
					'Form content, flattened errors and validation helpers derived from the parent validation state.'
			}
		],
		examples: [
			{
				id: 'form-basic',
				label: 'Basic',
				code: `
<script setup lang="ts">
	import { ref } from 'vue';
	import { required } from 'gib-validate';

	const email = ref('');

	const save = () => {
		// send form
	};
</script>

<template>
	<g-form
		validate-on="input"
		focus-first-error
		@submit-valid="save">
		<g-input
			v-model="email"
			label="Email"
			:rules="[required('Email is required')]" />
		<g-button type="submit" label="Save" />
	</g-form>
</template>`
			}
		]
	},
	{
		id: 'input',
		title: 'GInput',
		group: 'form',
		description:
			'Text field with shared field behavior, validation state and slots for icons or messages.',
		props: [
			{
				name: 'modelValue',
				type: 'string',
				description: 'Controlled field value.'
			},
			{
				name: 'label',
				type: 'string',
				description: 'Field label.'
			},
			{
				name: 'placeholder',
				type: 'string',
				description: 'Native input placeholder.'
			},
			{
				name: 'type',
				type: 'InputTypeHTMLAttribute',
				defaultValue: "'text'",
				description:
					'Native input type. Password inputs include the built-in visibility toggle.'
			},
			{
				name: 'clearable',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Shows the clear action when the field has value.'
			},
			{
				name: 'mask',
				type: 'string | string[]',
				description:
					'Input mask pattern. Built-in tokens are # for digits, S for letters, X for alphanumeric, A for uppercase letters and a for lowercase letters.'
			},
			{
				name: 'maskTokens',
				type: 'Record<string, GMaskToken>',
				description:
					'Extends or overrides mask tokens with custom RegExp patterns and optional transforms.'
			},
			{
				name: 'returnMaskedValue',
				type: 'boolean',
				defaultValue: 'true',
				description:
					'Controls v-model output. True returns the visible masked value, false returns the unmasked value.'
			},
			{
				name: 'rules',
				type: 'ValidationRule<string>[]',
				defaultValue: '[]',
				description:
					'Validation functions that return true or a visible error message.'
			},
			{
				name: 'message',
				type: 'string',
				description: 'Supporting helper text below the field.'
			},
			{
				name: 'state',
				type: "'warning' | 'error' | 'success'",
				description: 'Validation tone.'
			},
			{
				name: 'size',
				type: "'s' | 'm' | 'l' | 'xl'",
				description: 'Field density and native input font size.'
			},
			{
				name: 'color',
				type: 'string',
				description: 'Theme color or custom color seed.'
			},
			{
				name: 'variant',
				type: "'default' | 'tonal' | 'outlined' | 'glass' | 'text'",
				defaultValue: "'default'",
				description: 'Visual treatment of the field surface.'
			},
			{
				name: 'borderWidth',
				type: 'number | string',
				description:
					'Enables the shared gradient frame around the field when set.'
			},
			{
				name: 'backdropBlur',
				type: 'number | string',
				defaultValue: '6',
				description: 'Backdrop blur radius used by the glass variant.'
			},
			{
				name: 'prependIcon',
				type: 'MdiIcon',
				description: 'Icon rendered before the control.'
			},
			{
				name: 'appendIcon',
				type: 'MdiIcon',
				description: 'Icon rendered after the control.'
			},
			{
				name: 'disabled',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Disables the control.'
			}
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '-',
				description: 'Custom label content.'
			},
			{
				name: 'prepend',
				type: 'slot',
				scope: '-',
				description: 'Custom leading content inside the field.'
			},
			{
				name: 'append',
				type: 'slot',
				scope: '-',
				description: 'Custom trailing content inside the field.'
			},
			{
				name: 'message',
				type: 'slot',
				scope: '-',
				description: 'Custom helper or validation message.'
			}
		],
		examples: [
			{
				id: 'input-basic',
				label: 'Basic',
				code: `
<script setup lang="ts">
	import { ref } from 'vue';

	const email = ref('');
</script>

<template>
	<g-input
		v-model="email"
		label="Email"
		placeholder="you@example.com" />
</template>`
			},
			{
				id: 'input-states',
				label: 'States',
				code: `
<template>
	<g-input label="Success" state="success" model-value="Ready" />
	<g-input label="Error" state="error" model-value="Wrong value" />
</template>`
			}
		]
	},
	{
		id: 'textarea',
		title: 'GTextarea',
		group: 'form',
		description:
			'Multiline text field with the same validation, icon and message behavior as GInput.',
		props: [
			{
				name: 'modelValue',
				type: 'string',
				description: 'Controlled textarea value.'
			},
			{
				name: 'label',
				type: 'string',
				description: 'Field label.'
			},
			{
				name: 'rows',
				type: 'number',
				defaultValue: '3',
				description: 'Initial visible row count.'
			},
			{
				name: 'clearable',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Shows the clear action when the field has value.'
			},
			{
				name: 'rules',
				type: 'ValidationRule<string>[]',
				defaultValue: '[]',
				description:
					'Validation functions that return true or a visible error message.'
			},
			{
				name: 'message',
				type: 'string',
				description: 'Supporting helper text below the field.'
			},
			{
				name: 'state',
				type: "'warning' | 'error' | 'success'",
				description: 'Validation tone.'
			},
			{
				name: 'size',
				type: "'s' | 'm' | 'l' | 'xl'",
				description: 'Field density and textarea font size.'
			},
			{
				name: 'color',
				type: 'string',
				description: 'Theme color or custom color seed.'
			},
			{
				name: 'variant',
				type: "'default' | 'tonal' | 'outlined' | 'glass' | 'text'",
				defaultValue: "'default'",
				description: 'Visual treatment of the field surface.'
			},
			{
				name: 'borderWidth',
				type: 'number | string',
				description:
					'Enables the shared gradient frame around the field when set.'
			},
			{
				name: 'backdropBlur',
				type: 'number | string',
				defaultValue: '6',
				description: 'Backdrop blur radius used by the glass variant.'
			},
			{
				name: 'disabled',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Disables the control.'
			}
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '-',
				description: 'Custom label content.'
			},
			{
				name: 'prepend',
				type: 'slot',
				scope: '-',
				description: 'Custom leading content inside the field.'
			},
			{
				name: 'append',
				type: 'slot',
				scope: '-',
				description: 'Custom trailing content inside the field.'
			},
			{
				name: 'message',
				type: 'slot',
				scope: '-',
				description: 'Custom helper or validation message.'
			}
		],
		examples: [
			{
				id: 'textarea-basic',
				label: 'Basic',
				code: `
<template>
	<g-textarea label="Bio" message="Tell people what you are building." />
</template>`
			}
		]
	},
	{
		id: 'select',
		title: 'GSelect',
		group: 'form',
		description:
			'Selection control for compact option sets, backed by shared item and floating-layer composables.',
		props: [
			{
				name: 'items',
				type: 'SelectItem[]',
				description: 'Options displayed in the menu.'
			},
			{
				name: 'modelValue',
				type: 'T | T[] | V | V[] | null',
				description: 'Selected value or values.'
			},
			{
				name: 'multiple',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Allows selecting more than one item.'
			},
			{
				name: 'returnObject',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Returns the original item object instead of the resolved value.'
			},
			{
				name: 'labelKey',
				type: 'keyof T | (item: T) => string',
				description: 'Property or function used to read item labels.'
			},
			{
				name: 'valueKey',
				type: 'keyof T | (item: T) => V',
				description: 'Property or function used to read item values.'
			},
			{
				name: 'closeOnSelect',
				type: 'boolean',
				description:
					'Controls whether the dropdown closes after choosing an item.'
			},
			{
				name: 'label',
				type: 'string',
				description: 'Field label.'
			},
			{
				name: 'placeholder',
				type: 'string',
				description: 'Text shown when no value is selected.'
			},
			{
				name: 'clearable',
				type: 'boolean',
				description: 'Shows the clear action when a value is selected.'
			},
			{
				name: 'color',
				type: 'GColor',
				defaultValue: "'primary'",
				description:
					'Theme color or custom color seed for field chrome.'
			},
			{
				name: 'variant',
				type: "'default' | 'tonal' | 'outlined' | 'glass' | 'text'",
				defaultValue: "'default'",
				description: 'Visual treatment of the field surface.'
			},
			{
				name: 'borderWidth',
				type: 'number | string',
				description:
					'Enables the shared gradient frame around the field when set.'
			},
			{
				name: 'backdropBlur',
				type: 'number | string',
				defaultValue: '6',
				description: 'Backdrop blur radius used by the glass variant.'
			},
			{
				name: 'rules',
				type: 'ValidationRule<SelectionValue>[]',
				description:
					'Validation functions that return true or a visible error message.'
			}
		],
		slots: [
			{
				name: 'selection',
				type: 'slot',
				scope: '{ selection, selectedItems }',
				description: 'Custom selected value rendering.'
			},
			{
				name: 'item',
				type: 'slot',
				scope: '{ item, selected }',
				description: 'Custom option rendering inside the menu.'
			},
			{
				name: 'message',
				type: 'slot',
				scope: '-',
				description: 'Custom helper or validation message.'
			}
		],
		examples: [
			{
				id: 'select-single',
				label: 'Single',
				code: `
<script setup lang="ts">
	const sizes = ['Small', 'Medium', 'Large'];
</script>

<template>
	<g-select label="Size" :items="sizes" />
</template>`
			}
		]
	},
	{
		id: 'combobox',
		title: 'GCombobox',
		group: 'form',
		description:
			'Editable selection control for searchable option sets and custom values. It shares item normalization and validation behavior with GSelect, then adds a typed search model, filtering and optional chip rendering.',
		props: [
			{
				name: 'items',
				type: 'readonly T[]',
				description: 'Options displayed in the menu.'
			},
			{
				name: 'modelValue',
				type: 'T | T[] | V | V[] | null',
				description:
					'Selected value, object or value array depending on multiple and returnObject.'
			},
			{
				name: 'multiple',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Allows selecting more than one item.'
			},
			{
				name: 'returnObject',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Returns the original item object instead of the resolved value.'
			},
			{
				name: 'labelKey',
				type: 'keyof T | (item: T) => string',
				description: 'Property or function used to read item labels.'
			},
			{
				name: 'valueKey',
				type: 'keyof T | (item: T) => V',
				description: 'Property or function used to read item values.'
			},
			{
				name: 'itemChildren',
				type: 'keyof T | (item: T) => readonly T[] | undefined',
				description:
					'Optional nested item reader shared with the select menu pipeline.'
			},
			{
				name: 'search',
				type: 'string',
				description:
					'Controlled editable search text for v-model:search.'
			},
			{
				name: 'allowCustom',
				type: 'boolean',
				defaultValue: 'true',
				description:
					'Allows Enter to add an option when the search text does not exactly match an existing label.'
			},
			{
				name: 'itemFromQuery',
				type: '(query: string) => T',
				description:
					'Builds a typed item from custom text. Use this for object items, return-object flows or function-based label/value keys.'
			},
			{
				name: 'filter',
				type: '(item: SelectMenuItem<T, V>, query: string) => boolean',
				description:
					'Custom filtering function. Defaults to case-insensitive label matching.'
			},
			{
				name: 'chips',
				type: 'boolean',
				defaultValue: 'true',
				description:
					'Renders selected multiple values as removable GChip surfaces.'
			},
			{
				name: 'addOnBlur',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Commits a pending custom value when the input loses focus.'
			},
			{
				name: 'closeOnSelect',
				type: 'boolean',
				description:
					'Controls whether the dropdown closes after choosing an item. Defaults to true for single selection and false for multiple selection.'
			},
			{
				name: 'label',
				type: 'string',
				description: 'Field label.'
			},
			{
				name: 'placeholder',
				type: 'string',
				description: 'Text shown when no value or search is present.'
			},
			{
				name: 'clearable',
				type: 'boolean',
				description:
					'Shows the clear action when a value or search text is present.'
			},
			{
				name: 'color',
				type: 'GColor',
				defaultValue: "'primary'",
				description:
					'Theme color or custom color seed for focus, chips and custom option accents.'
			},
			{
				name: 'variant',
				type: "'default' | 'tonal' | 'outlined' | 'glass' | 'text'",
				defaultValue: "'default'",
				description: 'Visual treatment of the field surface.'
			},
			{
				name: 'borderWidth',
				type: 'number | string',
				description:
					'Enables the shared gradient frame around the field when set.'
			},
			{
				name: 'backdropBlur',
				type: 'number | string',
				defaultValue: '6',
				description: 'Backdrop blur radius used by the glass variant.'
			},
			{
				name: 'state',
				type: "'warning' | 'success' | 'error'",
				description: 'Semantic validation tone.'
			},
			{
				name: 'size',
				type: "'s' | 'm' | 'l' | 'xl'",
				defaultValue: "'m'",
				description: 'Field size inherited from the shared field base.'
			},
			{
				name: 'disabled',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Disables the input, menu and clear action.'
			},
			{
				name: 'message',
				type: 'string',
				description: 'Helper or validation message.'
			},
			{
				name: 'rules',
				type: 'ValidationRule<SelectionValue>[]',
				description:
					'Validation functions that return true or a visible error message.'
			},
			{
				name: 'noDataText',
				type: 'string',
				defaultValue: "'No matching options'",
				description:
					'Fallback menu text when filtering produces no options.'
			}
		],
		slots: [
			{
				name: 'selection',
				type: 'slot',
				scope: '{ selection, selectedItems, remove }',
				description:
					'Custom selected value rendering. The remove function toggles an item out of the model.'
			},
			{
				name: 'chip',
				type: 'slot',
				scope: '{ item, index, remove }',
				description:
					'Custom chip rendering for multiple selected values.'
			},
			{
				name: 'item',
				type: 'slot',
				scope: '{ item, selected, query, custom }',
				description:
					'Custom option rendering. The custom flag marks the pending custom option.'
			},
			{
				name: 'noData',
				type: 'slot',
				scope: '{ query }',
				description: 'Custom empty menu content.'
			},
			{
				name: 'prepend',
				type: 'slot',
				scope: '-',
				description: 'Custom leading field content.'
			},
			{
				name: 'append',
				type: 'slot',
				scope: '-',
				description: 'Custom trailing field content.'
			},
			{
				name: 'message',
				type: 'slot',
				scope: '-',
				description: 'Custom helper or validation message.'
			}
		],
		examples: [
			{
				id: 'combobox-basic',
				label: 'Basic',
				code: `
<template>
	<g-combobox
		v-model="framework"
		label="Framework"
		:items="frameworks"
		label-key="label"
		value-key="value"
		clearable />
</template>`
			}
		]
	},
	{
		id: 'tabs',
		title: 'GTabs',
		group: 'navigation',
		description:
			'Composable tab navigation built from GTabs, GTabList, GTab, GTabPanels and GTabPanel. It uses the shared navigation controller for controlled state, mandatory selection and keyboard movement.',
		props: [
			{
				name: 'modelValue',
				type: 'GTabValue',
				description: 'Controlled active tab value.'
			},
			{
				name: 'defaultValue',
				type: 'GTabValue',
				description: 'Initial active tab for uncontrolled usage.'
			},
			{
				name: 'activation',
				type: "'automatic' | 'manual'",
				defaultValue: "'automatic'",
				description:
					'Controls whether arrow focus selects immediately or Enter/Space commits selection.'
			},
			{
				name: 'orientation',
				type: "'horizontal' | 'vertical'",
				defaultValue: "'horizontal'",
				description: 'Direction of the tablist and keyboard arrows.'
			},
			{
				name: 'variant',
				type: "'line' | 'pill' | 'tonal'",
				defaultValue: "'line'",
				description: 'Visual treatment of selected tabs.'
			},
			{
				name: 'mandatory',
				type: 'boolean',
				defaultValue: 'true',
				description:
					'Selects the first enabled tab when no model value is provided.'
			},
			{
				name: 'color',
				type: 'GColor',
				defaultValue: "'primary'",
				description: 'Theme color or custom color seed.'
			},
			{
				name: 'activeColor',
				type: 'GColor',
				description: 'Color used by the selected tab and indicator.'
			},
			{
				name: 'size',
				type: "'s' | 'm' | 'l' | 'xl'",
				defaultValue: "'m'",
				description: 'Tab height, padding and label density.'
			},
			{
				name: 'disabled',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Disables all nested tabs.'
			},
			{
				name: 'GTabList.grow',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Makes the tablist stretch across the available width.'
			},
			{
				name: 'GTabList.ariaLabel',
				type: 'string',
				description: 'Accessible label for the tablist.'
			},
			{
				name: 'GTab.value',
				type: 'GTabValue',
				description: 'Value represented by a tab.'
			},
			{
				name: 'GTab.label',
				type: 'string',
				description: 'Default tab label content.'
			},
			{
				name: 'GTab.prependIcon / appendIcon',
				type: 'MdiIcon',
				description:
					'Optional icons rendered before or after the label.'
			},
			{
				name: 'GTab.disabled',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Disables an individual tab.'
			},
			{
				name: 'GTabPanels.transition',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Wraps panels in the fade transition group.'
			},
			{
				name: 'GTabPanel.value',
				type: 'GTabValue',
				description: 'Value that links the panel to its tab.'
			},
			{
				name: 'GTabPanel.eager',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Renders the panel before it becomes selected.'
			}
		],
		slots: [
			{
				name: 'GTabs.default',
				type: 'slot',
				scope: '{ modelValue, select }',
				description: 'Tablist and panel composition.'
			},
			{
				name: 'GTab.default',
				type: 'slot',
				scope: '{ selected, disabled, value, modelValue, select }',
				description: 'Custom tab label/content.'
			},
			{
				name: 'GTab.prepend / append',
				type: 'slot',
				scope: '{ selected, disabled, value, modelValue, select }',
				description: 'Custom leading or trailing tab content.'
			},
			{
				name: 'GTabPanel.default',
				type: 'slot',
				scope: '{ selected, value, modelValue }',
				description: 'Panel content for a selected tab.'
			}
		],
		examples: [
			{
				id: 'tabs-basic',
				label: 'Basic',
				code: `
<template>
	<g-tabs v-model="activeTab">
		<g-tab-list aria-label="Project sections">
			<g-tab value="overview" label="Overview" />
			<g-tab value="activity" label="Activity" />
		</g-tab-list>
		<g-tab-panels>
			<g-tab-panel value="overview">Overview</g-tab-panel>
			<g-tab-panel value="activity">Activity</g-tab-panel>
		</g-tab-panels>
	</g-tabs>
</template>`
			}
		]
	},
	{
		id: 'stepper',
		title: 'GStepper',
		group: 'navigation',
		description:
			'Declarative ordered-flow navigation built on the shared navigation controller. It renders steps from items, supports linear or editable movement, typed panel slots and replaceable actions.',
		props: [
			{
				name: 'items',
				type: 'readonly GStepperItem[]',
				defaultValue: '[]',
				description:
					'Steps rendered in order. Each item may define state for semantic styling and icon/icons overrides for pending, active, completed, error, disabled, loading, warning and success states.'
			},
			{
				name: 'GStepperItem.state',
				type: "'warning' | 'success' | 'error'",
				description:
					'Explicit semantic visual state for a single step. It controls text, indicator and hover/selected surface color independently from completed progress.',
				badge: docsUpcomingReleaseBadge
			},
			{
				name: 'modelValue',
				type: 'GStepValue',
				description: 'Controlled active step value.'
			},
			{
				name: 'defaultValue',
				type: 'GStepValue',
				description: 'Initial active step for uncontrolled usage.'
			},
			{
				name: 'orientation',
				type: "'horizontal' | 'vertical'",
				defaultValue: "'horizontal'",
				description: 'Direction of the step list and keyboard arrows.'
			},
			{
				name: 'activation',
				type: "'automatic' | 'manual'",
				defaultValue: "'manual'",
				description:
					'Controls whether arrow focus selects immediately or Enter/Space commits selection.'
			},
			{
				name: 'linear',
				type: 'boolean',
				defaultValue: 'true',
				description:
					'Prevents skipping ahead except to the next available step or editable completed steps.'
			},
			{
				name: 'editable',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Allows completed steps to be reselected.'
			},
			{
				name: 'variant',
				type: "'default' | 'tonal' | 'outlined' | 'glass' | 'text'",
				defaultValue: "'default'",
				description:
					'Visual treatment of the step list and selected steps.'
			},
			{
				name: 'color',
				type: 'GColor',
				defaultValue: "'primary'",
				description: 'Theme color or custom color seed.'
			},
			{
				name: 'activeColor',
				type: 'GColor',
				description: 'Color used by active and completed steps.'
			},
			{
				name: 'divider',
				type: 'boolean',
				defaultValue: 'true',
				description: 'Shows connector dividers between adjacent steps.'
			},
			{
				name: 'dividerOptions',
				type: "{ variant?: 'solid' | 'dashed' | 'dotted' | 'gradient'; thickness?: number | string; length?: number | string; color?: GColor; activeColor?: GColor }",
				description:
					'Style options for connector dividers. Color defaults to the stepper color; activeColor defaults to activeColor or color.',
				badge: docsUpcomingReleaseBadge
			},
			{
				name: 'size',
				type: "'s' | 'm' | 'l' | 'xl'",
				defaultValue: "'m'",
				description: 'Step indicator and label density.'
			},
			{
				name: 'disabled',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Disables step navigation and actions.'
			},
			{
				name: 'hideActions',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Hides the default GStepperActions footer.'
			},
			{
				name: 'GStepPanel.value',
				type: 'GStepValue',
				description: 'Value that links a panel to a step.'
			},
			{
				name: 'GStepPanel.eager',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Renders the panel before it becomes selected.'
			},
			{
				name: 'GStepPanel.variant',
				type: "'default' | 'tonal' | 'outlined' | 'glass' | 'gradient'",
				defaultValue: "'tonal'",
				description: 'Surface treatment of the step panel.'
			},
			{
				name: 'GStepPanel.color',
				type: 'GColor',
				description:
					'Panel color seed. Defaults to the parent stepper color.'
			},
			{
				name: 'GStepPanel.state',
				type: "'warning' | 'success' | 'error'",
				description: 'Semantic tone for the panel surface.'
			},
			{
				name: 'GStepPanel.density',
				type: "'compact' | 'comfortable' | 'spacious'",
				defaultValue: "'comfortable'",
				description: 'Panel padding density.'
			},
			{
				name: 'GStepPanel.texture',
				type: "'none' | 'noise'",
				defaultValue: "'none'",
				description: 'Optional material texture layer.'
			},
			{
				name: 'GStepPanel.borderWidth / borderRadius',
				type: 'number | string',
				description:
					'Shared gradient frame geometry for panel surfaces.'
			},
			{
				name: 'GStepPanel.backdropBlur',
				type: 'number | string',
				defaultValue: '2',
				description: 'Backdrop blur radius used by the glass panel.'
			}
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '{ modelValue, activeItem, items, select, next, prev, finish }',
				description:
					'Custom content area. Use GStepPanel inside for declarative panels.'
			},
			{
				name: 'panel',
				type: 'slot',
				scope: '{ activeItem, activeIndex, next, prev, finish }',
				description:
					'Quick active-panel renderer when separate GStepPanel components are not needed.'
			},
			{
				name: 'item',
				type: 'slot',
				scope: '{ item, index, selected, completed, state, semanticState, select }',
				description: 'Replaces the full step button content.'
			},
			{
				name: 'indicator',
				type: 'slot',
				scope: '{ item, index, selected, completed, state, semanticState }',
				description: 'Custom indicator content for a step.'
			},
			{
				name: 'actions',
				type: 'slot',
				scope: '{ canPrev, canNext, isLast, next, prev, finish }',
				description: 'Replaces the actions footer.'
			}
		],
		examples: [
			{
				id: 'stepper-basic',
				label: 'Basic',
				code: `
<template>
	<g-stepper
		v-model="step"
		:items="steps"
		variant="glass">
		<template #panel="{ activeItem }">
			{{ activeItem?.title }}
		</template>
	</g-stepper>
</template>`
			}
		]
	},
	{
		id: 'checkbox',
		title: 'GCheckbox',
		group: 'selection',
		description:
			'Boolean field for agreements, independent filters and visible on/off choices with expressive indicator shapes.',
		props: [
			{
				name: 'modelValue',
				type: 'boolean',
				description: 'Checked state.'
			},
			{
				name: 'label',
				type: 'string',
				description: 'Control label.'
			},
			{
				name: 'message',
				type: 'string',
				description: 'Supporting helper text below the control.'
			},
			{
				name: 'rules',
				type: 'ValidationRule<boolean>[]',
				defaultValue: '[]',
				description: 'Validation functions for boolean values.'
			},
			{
				name: 'indicatorView',
				type: "'default' | 'squircle' | 'diamond' | 'soft' | 'blob' | 'cut-corner'",
				defaultValue: "'default'",
				description:
					'Visual shape of the checkbox indicator. Squircle uses the GSquircle primitive; blob and cut-corner create Gradient UI-specific personality.'
			},
			{
				name: 'color',
				type: 'string',
				defaultValue: "'primary'",
				description:
					'Theme color or custom color seed for the checked indicator.'
			},
			{
				name: 'size',
				type: "'s' | 'm' | 'l' | 'xl'",
				defaultValue: "'m'",
				description: 'Control density and indicator size.'
			},
			{
				name: 'inline',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Keeps label and control in a compact inline layout.'
			},
			{
				name: 'state',
				type: "'warning' | 'error' | 'success'",
				description: 'Validation tone.'
			},
			{
				name: 'disabled',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Disables the control.'
			}
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '-',
				description: 'Custom label content.'
			},
			{
				name: 'message',
				type: 'slot',
				scope: '-',
				description: 'Custom helper or validation message.'
			}
		],
		examples: [
			{
				id: 'checkbox-basic',
				label: 'Basic',
				code: `
<template>
	<g-checkbox label="Accept terms" />
</template>`
			}
		]
	},
	{
		id: 'checkbox-group',
		title: 'GCheckboxGroup',
		group: 'selection',
		description:
			'Multi-select option group with shared label, message, validation and item rendering.',
		props: [
			{
				name: 'modelValue',
				type: 'T[] | V[]',
				description: 'Selected values.'
			},
			{
				name: 'options',
				type: 'T[]',
				description: 'Visible options.'
			},
			{
				name: 'label',
				type: 'string',
				description: 'Group label.'
			},
			{
				name: 'vertical',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Stacks options vertically.'
			},
			{
				name: 'labelKey',
				type: 'keyof T | (item: T) => string',
				description: 'Property or function used to read option labels.'
			},
			{
				name: 'valueKey',
				type: 'keyof T | (item: T) => V',
				description: 'Property or function used to read option values.'
			}
		],
		slots: [
			{
				name: 'label',
				type: 'slot',
				scope: '-',
				description: 'Custom group label.'
			},
			{
				name: 'item',
				type: 'slot',
				scope: '{ item, checked }',
				description: 'Custom option label content.'
			},
			{
				name: 'message',
				type: 'slot',
				scope: '-',
				description: 'Custom helper or validation message.'
			}
		],
		examples: [
			{
				id: 'checkbox-group-basic',
				label: 'Basic',
				code: `
<template>
	<g-checkbox-group
		label="Workstreams"
		:options="options" />
</template>`
			}
		]
	},
	{
		id: 'radio',
		title: 'GRadio',
		group: 'selection',
		description:
			'Single-select option group for visible mutually exclusive choices with the same expressive indicator shapes as checkbox.',
		props: [
			{
				name: 'modelValue',
				type: 'T | V | null',
				description: 'Selected value.'
			},
			{
				name: 'options',
				type: 'T[]',
				description: 'Visible options.'
			},
			{
				name: 'label',
				type: 'string',
				description: 'Group label.'
			},
			{
				name: 'vertical',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Stacks options vertically.'
			},
			{
				name: 'indicatorView',
				type: "'default' | 'squircle' | 'diamond' | 'soft' | 'blob' | 'cut-corner'",
				defaultValue: "'default'",
				description:
					'Visual shape of the radio indicator. Non-round views turn the selected dot into the same expressive geometry.'
			},
			{
				name: 'color',
				type: 'string',
				defaultValue: "'primary'",
				description:
					'Theme color or custom color seed for the selected indicator.'
			},
			{
				name: 'size',
				type: "'s' | 'm' | 'l' | 'xl'",
				defaultValue: "'m'",
				description: 'Group density and indicator size.'
			},
			{
				name: 'state',
				type: "'warning' | 'error' | 'success'",
				description: 'Validation tone.'
			},
			{
				name: 'message',
				type: 'string',
				description: 'Supporting helper text below the group.'
			},
			{
				name: 'labelKey',
				type: 'keyof T | (item: T) => string',
				description: 'Property or function used to read option labels.'
			},
			{
				name: 'valueKey',
				type: 'keyof T | (item: T) => V',
				description: 'Property or function used to read option values.'
			}
		],
		slots: [
			{
				name: 'label',
				type: 'slot',
				scope: '-',
				description: 'Custom group label.'
			},
			{
				name: 'item',
				type: 'slot',
				scope: '{ item, checked }',
				description: 'Custom option label content.'
			},
			{
				name: 'message',
				type: 'slot',
				scope: '-',
				description: 'Custom helper or validation message.'
			}
		],
		examples: [
			{
				id: 'radio-basic',
				label: 'Basic',
				code: `
<template>
	<g-radio
		label="Billing"
		:options="options" />
</template>`
			}
		]
	},
	{
		id: 'switch',
		title: 'GSwitch',
		group: 'selection',
		description:
			'Boolean control for immediate settings, feature flags and preferences with the shared check-control foundation.',
		props: [
			{
				name: 'modelValue',
				type: 'boolean',
				description: 'Checked state.'
			},
			{
				name: 'label',
				type: 'string',
				description: 'Control label.'
			},
			{
				name: 'message',
				type: 'string',
				description: 'Supporting helper text below the control.'
			},
			{
				name: 'rules',
				type: 'ValidationRule<boolean>[]',
				defaultValue: '[]',
				description: 'Validation functions for boolean values.'
			},
			{
				name: 'color',
				type: 'string',
				defaultValue: "'primary'",
				description:
					'Theme color or custom color seed for the active track.'
			},
			{
				name: 'size',
				type: "'s' | 'm' | 'l' | 'xl'",
				defaultValue: "'m'",
				description: 'Control density, track width and thumb size.'
			},
			{
				name: 'inline',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Keeps label and control in a compact inline layout.'
			},
			{
				name: 'state',
				type: "'warning' | 'error' | 'success'",
				description: 'Validation tone.'
			},
			{
				name: 'disabled',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Disables the control.'
			}
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '-',
				description: 'Custom label content.'
			},
			{
				name: 'message',
				type: 'slot',
				scope: '-',
				description: 'Custom helper or validation message.'
			}
		],
		examples: [
			{
				id: 'switch-basic',
				label: 'Basic',
				code: `
<template>
	<g-switch label="Enable gradients" />
</template>`
			}
		]
	},
	{
		id: 'modal',
		title: 'GModal',
		group: 'containment',
		description:
			'Centered overlay for decisions, confirmations and temporary focused workflows.',
		props: [
			{
				name: 'modelValue',
				type: 'boolean',
				description: 'Controlled open state.'
			},
			{
				name: 'defaultOpen',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Initial open state for uncontrolled usage.'
			},
			{
				name: 'title',
				type: 'string',
				description: 'Header title.'
			},
			{
				name: 'text',
				type: 'string',
				description: 'Secondary header text.'
			},
			{
				name: 'width',
				type: 'number | string',
				defaultValue: '560',
				description: 'Dialog width.'
			},
			{
				name: 'maxWidth',
				type: 'number | string',
				defaultValue: "'min(92vw, 720px)'",
				description: 'Maximum dialog width.'
			},
			{
				name: 'fullscreen',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Expands the dialog into a near-fullscreen surface.'
			},
			{
				name: 'scrollable',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Allows the modal body to scroll.'
			},
			{
				name: 'hideClose',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Hides the close action in the header.'
			},
			{
				name: 'persistent',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Prevents outside click and escape key from dismissing the modal.'
			},
			{
				name: 'closeOnEsc',
				type: 'boolean',
				defaultValue: 'true',
				description: 'Allows closing with the escape key.'
			},
			{
				name: 'closeOnOutside',
				type: 'boolean',
				defaultValue: 'true',
				description: 'Allows closing by clicking outside the surface.'
			},
			{
				name: 'lockScroll',
				type: 'boolean',
				defaultValue: 'true',
				description: 'Locks page scrolling while the modal is open.'
			},
			{
				name: 'scrim',
				type: 'boolean',
				defaultValue: 'true',
				description: 'Renders the background scrim.'
			},
			{
				name: 'appendTo',
				type: 'string',
				defaultValue: "'body'",
				description: 'Container where the overlay is mounted.'
			},
			{
				name: 'zIndexBase',
				type: 'number',
				defaultValue: '2400',
				description: 'Base z-index used by the overlay stack.'
			}
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '{ close, dismiss }',
				description: 'Modal body content.'
			},
			{
				name: 'header',
				type: 'slot',
				scope: '{ close, dismiss }',
				description: 'Custom header content.'
			},
			{
				name: 'title',
				type: 'slot',
				scope: '-',
				description: 'Custom title content.'
			},
			{
				name: 'text',
				type: 'slot',
				scope: '-',
				description: 'Custom supporting text.'
			},
			{
				name: 'footer',
				type: 'slot',
				scope: '{ close, dismiss }',
				description: 'Custom footer content.'
			},
			{
				name: 'actions',
				type: 'slot',
				scope: '{ close, dismiss }',
				description: 'Action row rendered inside the default footer.'
			}
		],
		examples: [
			{
				id: 'modal-basic',
				label: 'Basic',
				code: `
<template>
	<g-modal title="Modal title">
		Modal content
	</g-modal>
</template>`
			}
		]
	},
	{
		id: 'drawer',
		title: 'GDrawer',
		group: 'containment',
		description:
			'Edge-aligned overlay for navigation, filters, inspectors and secondary workflows.',
		props: [
			{
				name: 'modelValue',
				type: 'boolean',
				description: 'Controlled open state.'
			},
			{
				name: 'defaultOpen',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Initial open state for uncontrolled usage.'
			},
			{
				name: 'placement',
				type: "'left' | 'right' | 'top' | 'bottom'",
				defaultValue: "'right'",
				description: 'Screen edge the drawer opens from.'
			},
			{
				name: 'title',
				type: 'string',
				description: 'Header title.'
			},
			{
				name: 'text',
				type: 'string',
				description: 'Secondary header text.'
			},
			{
				name: 'width',
				type: 'number | string',
				defaultValue: '360',
				description: 'Width for left and right drawers.'
			},
			{
				name: 'maxWidth',
				type: 'number | string',
				defaultValue: "'calc(100vw - 32px)'",
				description: 'Maximum width for left and right drawers.'
			},
			{
				name: 'height',
				type: 'number | string',
				defaultValue: '360',
				description: 'Height for top and bottom drawers.'
			},
			{
				name: 'maxHeight',
				type: 'number | string',
				defaultValue: "'calc(100vh - 32px)'",
				description: 'Maximum height for top and bottom drawers.'
			},
			{
				name: 'scrollable',
				type: 'boolean',
				defaultValue: 'true',
				description: 'Allows the drawer body to scroll.'
			},
			{
				name: 'persistent',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Prevents outside click and escape key from dismissing the drawer.'
			},
			{
				name: 'closeOnEsc',
				type: 'boolean',
				defaultValue: 'true',
				description: 'Allows closing with the escape key.'
			},
			{
				name: 'closeOnOutside',
				type: 'boolean',
				defaultValue: 'true',
				description: 'Allows closing by clicking outside the surface.'
			},
			{
				name: 'lockScroll',
				type: 'boolean',
				defaultValue: 'true',
				description: 'Locks page scrolling while the drawer is open.'
			},
			{
				name: 'scrim',
				type: 'boolean',
				defaultValue: 'true',
				description: 'Renders the background scrim.'
			},
			{
				name: 'appendTo',
				type: 'string',
				defaultValue: "'body'",
				description: 'Container where the overlay is mounted.'
			},
			{
				name: 'zIndexBase',
				type: 'number',
				defaultValue: '2400',
				description: 'Base z-index used by the overlay stack.'
			}
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '{ close, dismiss }',
				description: 'Drawer body content.'
			},
			{
				name: 'header',
				type: 'slot',
				scope: '{ close, dismiss }',
				description: 'Custom header content.'
			},
			{
				name: 'title',
				type: 'slot',
				scope: '-',
				description: 'Custom title content.'
			},
			{
				name: 'text',
				type: 'slot',
				scope: '-',
				description: 'Custom supporting text.'
			},
			{
				name: 'footer',
				type: 'slot',
				scope: '{ close, dismiss }',
				description: 'Custom footer content.'
			},
			{
				name: 'actions',
				type: 'slot',
				scope: '{ close, dismiss }',
				description: 'Action row rendered inside the default footer.'
			}
		],
		examples: [
			{
				id: 'drawer-basic',
				label: 'Basic',
				code: `
<template>
	<g-drawer title="Drawer">
		Drawer content
	</g-drawer>
</template>`
			}
		]
	},
	{
		id: 'menu',
		title: 'GMenu',
		group: 'containment',
		description:
			'Action-list primitive for dropdowns, selects, contextual menus and nested command surfaces.',
		props: [
			{
				name: 'items',
				type: 'MenuItem[]',
				defaultValue: '[]',
				description:
					'Menu tree. Each item can include id, label, value, disabled and children.'
			},
			{
				name: 'isSelected',
				type: '(item: MenuItem) => boolean',
				description:
					'Marks items as selected. Parent submenu items also become selected when any child matches.'
			},
			{
				name: 'isHighlighted',
				type: '(item: MenuItem) => boolean',
				description:
					'Reserved highlight predicate for keyboard or search-driven menu state.'
			},
			{
				name: 'state',
				type: "'warning' | 'success' | 'error'",
				description: 'Semantic tone used by selected menu items.'
			}
		],
		slots: [
			{
				name: 'item',
				type: 'slot',
				scope: '{ item, selected }',
				description:
					'Custom label content for each item. Use it for badges, counters or richer command rows.'
			}
		],
		examples: [
			{
				id: 'menu-basic',
				label: 'Basic',
				code: `
<template>
	<g-menu
		:items="items"
		:is-selected="(item) => item.id === selected"
		@select="selected = $event.id" />
</template>`
			}
		]
	},
	{
		id: 'tooltip',
		title: 'GTooltip',
		group: 'containment',
		description:
			'Accessible floating hint for short contextual explanations, icon actions and directive-driven hints.',
		props: [
			{
				name: 'content',
				type: 'string',
				description: 'Text rendered inside the tooltip bubble.'
			},
			{
				name: 'placement',
				type: 'FloatingPlacement',
				defaultValue: "'bottom'",
				description:
					'Preferred floating position, including start and end variations.'
			},
			{
				name: 'disabled',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Prevents the tooltip from opening.'
			},
			{
				name: 'openDelay',
				type: 'number',
				defaultValue: '0',
				description: 'Delay in milliseconds before showing the tooltip.'
			},
			{
				name: 'closeDelay',
				type: 'number',
				defaultValue: '0',
				description: 'Delay in milliseconds before hiding the tooltip.'
			},
			{
				name: 'offset',
				type: 'number',
				defaultValue: '8',
				description: 'Distance between the trigger and tooltip.'
			},
			{
				name: 'shift',
				type: 'boolean',
				defaultValue: 'true',
				description:
					'Keeps the tooltip within the visible clipping boundary.'
			},
			{
				name: 'flip',
				type: 'boolean',
				defaultValue: 'true',
				description:
					'Flips placement when the preferred side has no room.'
			},
			{
				name: 'strategy',
				type: "'absolute' | 'fixed'",
				defaultValue: "'absolute'",
				description: 'CSS positioning strategy used by Floating UI.'
			},
			{
				name: 'appendTo',
				type: 'string',
				defaultValue: "''",
				description:
					'Selector for the container where floating content is appended.'
			},
			{
				name: 'zIndexBase',
				type: 'number',
				defaultValue: '1000',
				description: 'Base z-index for the floating layer.'
			},
			{
				name: 'reference',
				type: 'MaybeElement<ReferenceElement> | null',
				description:
					'External reference element used by directive-style or advanced usage.'
			},
			{
				name: 'transition',
				type: 'TransitionType',
				description:
					'Transition override. Defaults to a compact scale transition.'
			}
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '-',
				description:
					'Trigger content. The wrapper receives hover and focus listeners.'
			}
		],
		examples: [
			{
				id: 'tooltip-basic',
				label: 'Basic',
				code: `
<template>
	<g-tooltip text="Gradient-aware action">
		<g-button label="Hover me" variant="tonal" />
	</g-tooltip>
</template>`
			}
		]
	},
	{
		id: 'table',
		title: 'GTable',
		group: 'data-display',
		description:
			'Styled static table primitive for prepared rows. GTable owns structure, alignment, slots, merged cells and expandable detail rows, while data features stay outside for a future GDataTable layer.',
		props: [
			{
				name: 'headers',
				type: 'GTableHeader[]',
				defaultValue: '[]',
				description:
					'Column definitions. Each header can define key, title, alignment, width, value and format callbacks.'
			},
			{
				name: 'items',
				type: 'T[]',
				defaultValue: '[]',
				description: 'Rows rendered in the table body.'
			},
			{
				name: 'itemKey',
				type: 'keyof T | string | ((item, index) => string | number)',
				defaultValue: "'id'",
				description:
					'Stable row identity used by expansion and keyed rendering.'
			},
			{
				name: 'variant',
				type: "'gradient' | 'tonal' | 'text' | 'outlined' | 'glass' | 'default'",
				defaultValue: "'tonal'",
				description: 'Surface treatment of the table container.'
			},
			{
				name: 'backdropBlur',
				type: 'number | numeric string',
				defaultValue: '4',
				description: 'Backdrop blur radius used by the glass variant.'
			},
			...materialFrameApiProps,
			{
				name: 'density',
				type: "'compact' | 'comfortable' | 'spacious'",
				defaultValue: "'comfortable'",
				description: 'Cell padding density.'
			},
			{
				name: 'color',
				type: 'string',
				defaultValue: "'primary'",
				description: 'Theme color or custom color seed.'
			},
			{
				name: 'rounded',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Uses a larger outer surface radius.'
			},
			{
				name: 'stickyHeader',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Keeps header cells pinned while the table scroller moves.'
			},
			{
				name: 'fixedLayout',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Uses native table-layout: fixed.'
			},
			{
				name: 'hover',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Highlights body rows on hover.'
			},
			{
				name: 'striped',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Adds alternating tonal row backgrounds.'
			},
			{
				name: 'bordered',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Adds vertical cell dividers.'
			},
			{
				name: 'caption',
				type: 'string',
				description: 'Accessible table caption rendered in caption.'
			},
			{
				name: 'hideCaption',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Keeps the caption available to assistive tech while visually hiding it.'
			},
			{
				name: 'ariaLabel',
				type: 'string',
				description: 'Accessible label applied to the table element.'
			},
			{
				name: 'ariaLabelledby',
				type: 'string',
				description:
					'ID reference used as aria-labelledby on the table element.'
			},
			{
				name: 'loading',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Renders the loading slot or default loading row.'
			},
			{
				name: 'elevation',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Adds calm elevation to the table surface.'
			},
			{
				name: 'emptyText',
				type: 'string',
				defaultValue: "'No data'",
				description: 'Fallback text for empty tables.'
			},
			{
				name: 'showExpand',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Adds an expansion control column.'
			},
			{
				name: 'expanded',
				type: 'Array<string | number>',
				defaultValue: '[]',
				description:
					'Controlled expanded row keys for v-model:expanded.'
			},
			{
				name: 'singleExpand',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Allows only one expanded row at a time.'
			},
			{
				name: 'expandOnRowClick',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Toggles expansion when the row itself is clicked.'
			},
			{
				name: 'spans',
				type: 'Array<GTableCellSpan>',
				defaultValue: '[]',
				description:
					'Declaratively merges body cells by row and column, applying colspan, rowspan and hidden cells automatically.'
			},
			{
				name: 'cellProps',
				type: '(context: GTableCellContext) => GTableCellAttrs',
				description:
					'Returns low-level cell attrs for custom colspan, rowspan, hidden, state, class and style control.'
			},
			{
				name: 'rowProps',
				type: '(context: GTableRowContext) => GTableRowAttrs',
				description:
					'Returns attrs for body rows, including semantic state.'
			},
			{
				name: 'headerProps',
				type: '(header, index) => GTableCellAttrs',
				description: 'Returns attrs for header cells.'
			}
		],
		slots: [
			{
				name: 'top',
				type: 'slot',
				scope: '-',
				description: 'Content above the table scroller.'
			},
			{
				name: 'bottom',
				type: 'slot',
				scope: '-',
				description: 'Content below the table scroller.'
			},
			{
				name: 'header',
				type: 'slot',
				scope: '{ header, index }',
				description: 'Fallback custom header cell content.'
			},
			{
				name: 'header.<key>',
				type: 'slot',
				scope: '{ header, index }',
				description: 'Custom header content for one column.'
			},
			{
				name: 'item',
				type: 'slot',
				scope: '{ item, header, value, rowIndex, columnIndex }',
				description: 'Fallback custom body cell content.'
			},
			{
				name: 'item.<key>',
				type: 'slot',
				scope: '{ item, header, value, rowIndex, columnIndex }',
				description: 'Custom body cell content for one column.'
			},
			{
				name: 'body',
				type: 'slot',
				scope: '{ items, headers, columnCount, classes, getRowContext, getCellContext }',
				description:
					'Full tbody escape hatch for native tr/td rendering, custom colspan and rowspan markup.'
			},
			{
				name: 'row',
				type: 'slot',
				scope: '{ item, index, key, expanded, toggleExpanded, headers }',
				description:
					'Full body row escape hatch for native tr/td rendering.'
			},
			{
				name: 'expand',
				type: 'slot',
				scope: '{ item, index, key, expanded, toggleExpanded }',
				description: 'Custom expansion control.'
			},
			{
				name: 'expanded-row',
				type: 'slot',
				scope: '{ item, index, key, expanded, toggleExpanded, headers }',
				description: 'Detail content rendered below an expanded row.'
			},
			{
				name: 'empty',
				type: 'slot',
				scope: '-',
				description: 'Custom empty state row content.'
			},
			{
				name: 'loading',
				type: 'slot',
				scope: '-',
				description: 'Custom loading row content.'
			},
			{
				name: 'caption',
				type: 'slot',
				scope: '-',
				description: 'Custom table caption content.'
			}
		],
		examples: [
			{
				id: 'table-basic',
				label: 'Basic',
				code: `
<template>
	<g-table
		:headers="headers"
		:items="items"
		hover />
</template>`
			}
		]
	},
	{
		id: 'fab',
		title: 'GFAB',
		group: 'selection',
		description:
			'Floating squircle action for the most important contextual command on a screen.',
		props: [
			{
				name: 'icon',
				type: 'MdiIcon',
				description: 'Icon rendered inside the squircle action surface.'
			},
			{
				name: 'label',
				type: 'string',
				description:
					'Accessible label and visible text when extended is enabled.'
			},
			{
				name: 'extended',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Renders a floating pill with a squircle icon and text label.'
			},
			{
				name: 'labelPlacement',
				type: "'left' | 'right'",
				defaultValue: "'right'",
				description:
					'Places the always-visible extended label before or after the squircle action.'
			},
			{
				name: 'size',
				type: "'s' | 'm' | 'l' | 'xl'",
				defaultValue: "'m'",
				description: 'Controls squircle and icon size.'
			},
			{
				name: 'variant',
				type: "'gradient' | 'tonal' | 'outlined' | 'default'",
				defaultValue: "'default'",
				description:
					'Visual treatment. Gradient uses the material recipe; outlined uses a masked gradient squircle border.'
			},
			{
				name: 'color',
				type: 'string',
				defaultValue: "'primary'",
				description: 'Theme color or custom color seed.'
			},
			{
				name: 'state',
				type: "'warning' | 'success' | 'error'",
				description: 'Semantic tone for the action surface.'
			},
			{
				name: 'position',
				type: "'static' | 'absolute' | 'fixed'",
				defaultValue: "'static'",
				description:
					'Floating positioning mode. Use fixed for app-level actions and absolute for local preview surfaces.'
			},
			{
				name: 'location',
				type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
				defaultValue: "'bottom-right'",
				description:
					'Placement used when position is absolute or fixed.'
			},
			{
				name: 'offset',
				type: 'number | string',
				defaultValue: '24',
				description:
					'Distance from the chosen viewport or container edge.'
			},
			{
				name: 'shadow',
				type: 'boolean',
				defaultValue: 'true',
				description: 'Enables GSquircle shadow.'
			},
			{
				name: 'border',
				type: 'number',
				description: 'Overrides the squircle border width.'
			},
			{
				name: 'borderColor',
				type: 'string',
				description: 'Overrides the squircle border color.'
			},
			{
				name: 'gradientRecipe',
				type: 'GradientTokenRecipe',
				description:
					'Overrides the material recipe shared by the squircle fill, border and glow.'
			},
			{
				name: 'glow',
				type: 'boolean | number | string',
				description:
					'Enables a native SVG-filtered glow following the squircle path.'
			},
			{
				name: 'animateGlow',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Pulses the squircle glow when motion is allowed.'
			},
			{
				name: 'disabled',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Disables the native button.'
			}
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '-',
				description: 'Custom extended label content.'
			},
			{
				name: 'icon',
				type: 'slot',
				scope: '-',
				description: 'Custom icon content inside the squircle.'
			}
		],
		examples: [
			{
				id: 'fab-basic',
				label: 'Basic',
				code: `
<template>
	<g-f-a-b
		icon="plus"
		label="Create" />
</template>`
			}
		]
	},
	{
		id: 'quick-actions',
		title: 'GQuickActions',
		group: 'selection',
		description:
			'Speed-dial style cluster for related floating actions built from GFAB.',
		props: [
			{
				name: 'options',
				type: 'GQuickActionsOption[]',
				defaultValue: '[]',
				description:
					'Visible actions shown when the cluster is open. Each option has label, value and icon.'
			},
			{
				name: 'icon',
				type: 'MdiIcon',
				description: 'Icon shown on the closed trigger FAB.'
			},
			{
				name: 'activeIcon',
				type: 'MdiIcon',
				description:
					'Icon shown on the trigger FAB when actions are open.'
			},
			{
				name: 'contained',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Disables teleport and positions the cluster inside the nearest positioned parent.'
			},
			{
				name: 'position',
				type: "'static' | 'absolute' | 'fixed'",
				defaultValue: "'fixed'",
				description:
					'Positioning strategy used when the cluster is teleported to body.'
			},
			{
				name: 'location',
				type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
				defaultValue: "'bottom-right'",
				description: 'Corner or edge alignment for the action cluster.'
			},
			{
				name: 'direction',
				type: "'top' | 'right' | 'bottom' | 'left'",
				description:
					'Direction where quick actions open from the trigger. Defaults to bottom for top locations and top for bottom locations.'
			},
			{
				name: 'transition',
				type: 'GTransitionValue',
				defaultValue: "'g-quick-actions-content-transition'",
				description:
					'Transition preset or options for the actions content. The default keeps built-in CSS stagger delays.'
			},
			{
				name: 'offset',
				type: 'number | string',
				defaultValue: '24',
				description:
					'Distance from the chosen container or viewport edge.'
			},
			{
				name: 'labelPlacement',
				type: "'left' | 'right'",
				description:
					'Overrides child action label placement. Defaults to left for right-aligned clusters.'
			}
		],
		slots: [
			{
				name: 'trigger',
				type: 'slot',
				scope: '{ isOpened: boolean; toggle: () => void }',
				description:
					'Custom trigger control. Use the provided toggle function to open or close the cluster.'
			},
			{
				name: 'action',
				type: 'slot',
				scope: '{ option: GQuickActionsOption; index: number; labelPlacement: GFABLabelPlacement }',
				description:
					'Custom label content for each revealed action while keeping the default GFAB surface.'
			}
		],
		examples: [
			{
				id: 'quick-actions-basic',
				label: 'Basic',
				code: `
<template>
	<g-quick-actions
		icon="plus"
		active-icon="close"
		:options="actions" />
</template>`
			}
		]
	},
	{
		id: 'alert',
		title: 'GAlert',
		group: 'feedback',
		description:
			'Persistent feedback surface for status messages, confirmations and warnings.',
		props: [
			{
				name: 'title',
				type: 'string',
				description: 'Alert heading rendered above the body text.'
			},
			{
				name: 'text',
				type: 'string',
				description:
					'Body text rendered when the default slot is not provided.'
			},
			{
				name: 'icon',
				type: 'MdiIcon',
				description: 'Icon rendered in the prepend area.'
			},
			{
				name: 'variant',
				type: "'gradient' | 'tonal' | 'outlined' | 'glass'",
				defaultValue: "'tonal'",
				description: 'Visual emphasis of the alert surface.'
			},
			{
				name: 'color',
				type: 'string',
				defaultValue: "'primary'",
				description: 'Theme color or custom color seed.'
			},
			{
				name: 'state',
				type: "'warning' | 'success' | 'error'",
				description:
					'Semantic state that switches the alert surface color.'
			},
			...materialFrameApiProps,
			{
				name: 'texture',
				type: "'none' | 'noise'",
				defaultValue: "'none'",
				description:
					'Adds a material texture layer above the alert surface.',
				badge: docsNextReleaseBadge
			}
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '-',
				description: 'Main alert body content.'
			},
			{
				name: 'title',
				type: 'slot',
				scope: '-',
				description: 'Custom title content.'
			},
			{
				name: 'prepend',
				type: 'slot',
				scope: '-',
				description: 'Custom leading content, usually an icon.'
			},
			{
				name: 'append',
				type: 'slot',
				scope: '-',
				description:
					'Trailing content for actions or status affordances.'
			},
			{
				name: 'footer',
				type: 'slot',
				scope: '-',
				description: 'Secondary content below the message.'
			}
		],
		examples: [
			{
				id: 'alert-basic',
				label: 'Basic',
				code: `
<template>
	<g-alert
		state="success"
		icon="check-circle-outline"
		title="Saved"
		text="Your changes were synced." />
</template>`
			}
		]
	},
	{
		id: 'snackbar',
		title: 'GSnackbar',
		group: 'feedback',
		description:
			'Short-lived feedback surface for confirmations, undo flows, background status and lightweight errors.',
		props: [
			{
				name: 'modelValue',
				type: 'boolean',
				description: 'Controlled open state used by v-model.'
			},
			{
				name: 'defaultOpen',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Initial open state for uncontrolled usage.'
			},
			{
				name: 'title',
				type: 'string',
				description: 'Optional title rendered above the message.'
			},
			{
				name: 'text',
				type: 'string',
				description:
					'Message rendered when the default slot is not provided.'
			},
			{
				name: 'icon',
				type: 'MdiIcon',
				description: 'Icon rendered in the prepend area.'
			},
			{
				name: 'variant',
				type: "'gradient' | 'tonal' | 'outlined' | 'glass'",
				defaultValue: "'tonal'",
				description: 'Visual emphasis of the snackbar surface.'
			},
			{
				name: 'color',
				type: 'string',
				defaultValue: "'primary'",
				description: 'Theme color or custom color seed.'
			},
			{
				name: 'state',
				type: "'warning' | 'success' | 'error'",
				description:
					'Semantic state that switches the snackbar surface color.'
			},
			...materialFrameApiProps,
			{
				name: 'location',
				type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
				defaultValue: "'bottom-center'",
				description:
					'Screen or container position used by fixed and absolute snackbars.'
			},
			{
				name: 'position',
				type: "'static' | 'absolute' | 'fixed'",
				defaultValue: "'fixed'",
				description:
					'Positioning mode. Use static for inline docs/examples and fixed for app-level feedback.'
			},
			{
				name: 'timeout',
				type: 'number',
				defaultValue: '5000',
				description:
					'Auto-dismiss delay in milliseconds. Set 0 or persistent to keep it open.'
			},
			{
				name: 'persistent',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Disables auto-dismiss timeout.'
			},
			{
				name: 'closeable',
				type: 'boolean',
				defaultValue: 'true',
				description: 'Shows a dismiss button.'
			},
			{
				name: 'action',
				type: 'GSnackbarAction',
				description:
					'Action object with label, value and optional closeOnClick override.'
			},
			{
				name: 'actionText',
				type: 'string',
				description: 'Shortcut label for a simple action button.'
			},
			{
				name: 'multiline',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Aligns content for longer messages with title or custom slots.'
			}
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '-',
				description: 'Message body content.'
			},
			{
				name: 'title',
				type: 'slot',
				scope: '-',
				description: 'Custom title content.'
			},
			{
				name: 'prepend',
				type: 'slot',
				scope: '-',
				description: 'Custom leading content, usually an icon.'
			},
			{
				name: 'action',
				type: 'slot',
				scope: '{ close }',
				description: 'Custom action area.'
			}
		],
		examples: [
			{
				id: 'snackbar-basic',
				label: 'Basic',
				code: `
<template>
	<g-snackbar
		default-open
		text="Project saved"
		action-text="Undo" />
</template>`
			}
		]
	},
	{
		id: 'progress',
		title: 'GProgress',
		group: 'feedback',
		description:
			'Determinate and indeterminate progress indicator with gradient-aware views.',
		props: [
			{
				name: 'modelValue',
				type: 'number',
				defaultValue: '0',
				description: 'Progress value from 0 to 100.'
			},
			{
				name: 'indeterminate',
				type: 'boolean',
				defaultValue: 'false',
				description:
					'Runs the loading animation when progress cannot be measured.'
			},
			{
				name: 'label',
				type: 'string',
				description: 'Custom label above the track.'
			},
			{
				name: 'noLabel',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Hides the label row.'
			},
			{
				name: 'labelAlign',
				type: "'start' | 'center' | 'end'",
				defaultValue: "'center'",
				description: 'Text alignment for the label row.'
			},
			{
				name: 'view',
				type: "'default' | 'striped' | 'segmented' | 'glow'",
				defaultValue: "'default'",
				description: 'Visual treatment for the active progress bar.'
			},
			{
				name: 'segments',
				type: 'number',
				defaultValue: '12',
				description: 'Number of divisions used by segmented view.'
			},
			{
				name: 'size',
				type: "'s' | 'm' | 'l' | 'xl'",
				defaultValue: "'m'",
				description: 'Track height and radius scale.'
			},
			{
				name: 'rounded',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Uses pill radius for the track and active bar.'
			},
			{
				name: 'color',
				type: 'string',
				defaultValue: "'primary'",
				description: 'Theme color or custom color seed.'
			},
			{
				name: 'state',
				type: "'warning' | 'success' | 'error'",
				description: 'Semantic state for the progress color.'
			}
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '-',
				description: 'Custom label content.'
			}
		],
		examples: [
			{
				id: 'progress-basic',
				label: 'Basic',
				code: `
<template>
	<g-progress :model-value="64" label="Uploading 64%" rounded />
</template>`
			}
		]
	},
	{
		id: 'loading',
		title: 'GLoading',
		group: 'feedback',
		description:
			'Async overlay for loading states inside a local container. Use it directly, through v-loading, or through the useLoading service.',
		props: [
			{
				name: 'show',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Controls direct component visibility.'
			},
			{
				name: 'text',
				type: 'string',
				defaultValue: "'Loading...'",
				description: 'Message displayed above the progress bar.'
			},
			{
				name: 'noText',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Hides the loading message.'
			},
			{
				name: 'color',
				type: 'string',
				defaultValue: "'primary'",
				description: 'Progress color.'
			},
			{
				name: 'progressView',
				type: "'default' | 'striped' | 'segmented' | 'glow'",
				defaultValue: "'glow'",
				description: 'GProgress view used inside the overlay.'
			},
			{
				name: 'dark',
				type: 'boolean',
				defaultValue: 'false',
				description: 'Uses a dark scrim treatment.'
			},
			{
				name: 'opacity',
				type: 'number | string',
				description: 'Overrides overlay opacity.'
			},
			{
				name: 'blur',
				type: 'number | string',
				description: 'Overrides backdrop blur.'
			},
			{
				name: 'transition',
				type: 'GTransitionValue',
				description: 'Transition preset or options for the overlay.'
			},
			{
				name: 'onClose',
				type: '() => void',
				description:
					'Callback fired after the leave transition completes and the overlay can be unmounted.'
			}
		],
		slots: [
			{
				name: 'default',
				type: 'slot',
				scope: '-',
				description: 'Custom loading message.'
			}
		],
		examples: [
			{
				id: 'loading-basic',
				label: 'Basic',
				code: `
<template>
	<div class="position-relative">
		<g-loading show text="Syncing data" />
	</div>
</template>`
			}
		]
	}
];
