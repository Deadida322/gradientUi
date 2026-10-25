import { fileComponentPages } from './fileComponents';
import type { DocsComponentPageMeta, DocsLiveExample } from '@docs/types';

const componentPages: DocsComponentPageMeta[] = [
	{
		id: 'spacer',
		usage: {
			title: 'Usage',
			description:
				'GSpacer fills the remaining space in a flex row or column. It has no props or slots and is hidden from assistive technology.'
		},
		examples: {
			title: 'Examples',
			description:
				'Use it between actions to separate leading and trailing content. A column needs available height for the spacer to grow.'
		}
	},
	{
		id: 'bottom-navigation',
		usage: {
			title: 'Usage',
			description:
				'Compose GBottomNavigation with GBottomNavigationItem. Use v-model or defaultValue for selection. Items support native href links and optional Vue Router to links without requiring Nuxt.'
		},
		examples: {
			title: 'Examples',
			description:
				'The same material surface hooks as cards: tonal, glass, gradient, recipes, shadow and morph. Static positioning is the default; sticky and fixed are opt-in. Fixed navigation overlays content: reserve its height in your app layout. Bottom safe-area padding is included. ArrowLeft/ArrowRight, Home and End move focus; Enter/Space activate native buttons. Tab traverses native links. The moving indicator is shared with GNavbar and line GTabs.'
		}
	},
	...fileComponentPages,
	{
		id: 'navbar',
		usage: {
			title: 'Usage',
			description:
				'Compose GNavbar with GNavbarItem, GNavbarMenu and GNavbarSubItem. Use v-model for selection and prepend/append slots for branding and actions.'
		},
		examples: {
			title: 'Examples',
			description:
				'Navigation with dropdowns, density presets, disabled items and large logos with independent item height.'
		}
	},
	{
		id: 'avatar',
		usage: {
			title: 'Usage',
			description:
				'GAvatar is a compact identity surface for people, teams and objects. It supports text initials, icons, images, material variants and shape presets including squircle.'
		},
		examples: {
			title: 'Examples',
			description:
				'Avatar examples cover variants, circle and squircle shapes, size scale, badge and group composition, and gradient-engine effects.'
		}
	},
	{
		id: 'avatar-group',
		usage: {
			title: 'Usage',
			description:
				'GAvatarGroup stacks avatars for teams, assignees and presence clusters. Use items for data-driven lists, slots for custom avatars, and max/total for overflow.'
		},
		examples: {
			title: 'Examples',
			description:
				'Avatar group examples cover overlap, overflow count, squircle shape, glass surfaces and slot composition.'
		}
	},
	{
		id: 'button',
		usage: {
			title: 'Usage',
			description:
				'GButton is an action surface built on shared variant, color, size and state props, then wrapped by GGradient for borders, glow and accent placement.'
		},
		examples: {
			title: 'Examples',
			description:
				'The important parts of the API are grouped here by behavior: variants, color, geometry, gradient placement, states, effects, icon props and slots.'
		}
	},
	{
		id: 'badge',
		usage: {
			title: 'Usage',
			description:
				'GBadge decorates another control with a compact count, status dot or short metadata label. Use floating badges for notifications and inline badges for adjacent status text.'
		},
		examples: {
			title: 'Examples',
			description:
				'Badge examples cover gradient and tonal surfaces, colors, dots, locations, inline mode, sizes and custom content slots.'
		}
	},
	{
		id: 'card',
		usage: {
			title: 'Usage',
			description:
				'GCard is a gradient-aware content surface for previews, dashboards and composed information blocks. It shares the same material props as other Gradient UI surfaces, then adds layout for common card anatomy.'
		},
		examples: {
			title: 'Examples',
			description:
				'Card examples cover variants, layout presets, size and density, loading states, gradient-engine recipes, material effects and slot-based composition.'
		}
	},
	{
		id: 'divider',
		usage: {
			title: 'Usage',
			description:
				'GDivider separates sections with the same gradient-aware material language as cards, chips and buttons. Use it as a quiet separator, a labeled break or a vertical rule inside dense layouts.'
		},
		examples: {
			title: 'Examples',
			description:
				'Divider examples cover material variants, line effects, labels, custom slots, vertical orientation, inset rhythm and gradient-engine texture or morph effects.'
		}
	},
	{
		id: 'chip',
		usage: {
			title: 'Usage',
			description:
				'GChip is a compact action surface for tags, filters, metadata and selected values. It keeps the same variant, color, state and placement language as other Gradient UI surfaces, but defaults to tighter pill-like geometry.'
		},
		examples: {
			title: 'Examples',
			description:
				'Chips work best as compact, scannable surfaces: tags, selected filters, counters, metadata and removable values.'
		}
	},
	{
		id: 'expansion',
		usage: {
			title: 'Usage',
			description:
				'GExpansion creates a disclosure surface for progressive content, settings, FAQ rows and compact details. It can work alone or inside GExpansionGroup.'
		},
		examples: {
			title: 'Examples',
			description:
				'Expansion examples cover visual variants, controlled state, grouped behavior, gradient active accents and custom slots.'
		}
	},
	{
		id: 'expansion-group',
		usage: {
			title: 'Usage',
			description:
				'GExpansionGroup coordinates several GExpansion items through a shared selection model. Use it for accordions, setup flows, settings sections and grouped disclosures.'
		},
		examples: {
			title: 'Examples',
			description:
				'Expansion group examples cover single selection, multiple open items, mandatory state, visual gaps and readonly behavior.'
		}
	},
	{
		id: 'modal',
		usage: {
			title: 'Usage',
			description:
				'GModal is a centered overlay for focused decisions, confirmations and temporary workflows. It is built on BaseOverlay with scrim, escape handling, outside dismissal and scroll locking.'
		},
		examples: {
			title: 'Examples',
			description:
				'Modal examples cover footer actions, persistent dialogs, fullscreen flows and responsive sizing.'
		}
	},
	{
		id: 'drawer',
		usage: {
			title: 'Usage',
			description:
				'GDrawer is an edge-aligned overlay for navigation, filters, inspectors and secondary workflows. It shares the BaseOverlay foundation with GModal.'
		},
		examples: {
			title: 'Examples',
			description:
				'Drawer examples cover edge placements, footer actions, scrollable content, responsive sizing and custom slots.'
		}
	},
	{
		id: 'dropdown',
		usage: {
			title: 'Usage',
			description:
				'GDropdown places custom content beside an activator. Bind the activator slot props to a focusable control, then compose the content with GMenu, actions or any other surface.'
		},
		examples: {
			title: 'Examples',
			description:
				'Dropdown examples cover menu composition, floating placement, hover activation and controlled open state.'
		}
	},
	{
		id: 'menu',
		usage: {
			title: 'Usage',
			description:
				'GMenu is a composable action-list surface for dropdowns, selects and contextual menus. It owns item rendering, selected state and nested menu behavior, while the surrounding surface decides where it opens.'
		},
		examples: {
			title: 'Examples',
			description:
				'Menu examples cover nested actions, selected items, semantic states and custom item content.'
		}
	},
	{
		id: 'tooltip',
		usage: {
			title: 'Usage',
			description:
				'GTooltip adds a short contextual hint to focusable or hoverable UI. Use the component wrapper for composed triggers, or v-tooltip for quick inline hints.'
		},
		examples: {
			title: 'Examples',
			description:
				'Tooltip examples cover placements, open and close delays, floating behavior, directive usage and programmatic show/hide methods.'
		}
	},
	{
		id: 'table',
		usage: {
			title: 'Usage',
			description:
				'GTable is a styled table primitive for already prepared rows. It keeps data features outside, but gives headers, alignment, widths, slots, merged cells and expandable detail rows a stable API.'
		},
		examples: {
			title: 'Examples',
			description:
				'Table examples cover variants, density, elevation, column alignment, sticky headers, fixed columns, expansion, merged group rows and slot-based cell composition.'
		}
	},
	{
		id: 'form',
		usage: {
			title: 'Usage',
			description:
				'GForm wraps a native form and coordinates nested Gradient UI field validators through gib-validate. Use it when field-level rules should validate together on submit.'
		},
		examples: {
			title: 'Examples',
			description:
				'Form examples show submit orchestration, validation triggers, form-level disabled state, mixed controls and flattened error slot state while leaving model ownership in the page.'
		}
	},
	{
		id: 'input',
		usage: {
			title: 'Usage',
			description:
				'GInput is the core text field for single-line values. It combines label, message, icons, clear action and validation rules through the shared field foundation.'
		},
		examples: {
			title: 'Examples',
			description:
				'Input examples cover visual variants, validation states, field rules, masks and custom prepend, append and message slots.'
		}
	},
	{
		id: 'textarea',
		usage: {
			title: 'Usage',
			description:
				'GTextarea uses the same field API as GInput, but gives multiline content more room for notes, descriptions and long-form input.'
		},
		examples: {
			title: 'Examples',
			description:
				'Textarea examples cover visual variants, row density and validation behavior for longer text.'
		}
	},
	{
		id: 'select',
		usage: {
			title: 'Usage',
			description:
				'GSelect is a field-style selection control built from GDropdown and GMenu. It supports primitive values, object items, multiple selection and custom item rendering.'
		},
		examples: {
			title: 'Examples',
			description:
				'Select examples cover multiple values, return-object models, validation and item slots for richer option rows.'
		}
	},
	{
		id: 'combobox',
		usage: {
			title: 'Usage',
			description:
				'GCombobox extends the select foundation with editable search, local filtering and optional custom values. Use it when users can either choose an existing item or type a new one.'
		},
		examples: {
			title: 'Examples',
			description:
				'Combobox examples cover single values, multiple chips, custom item creation and typed slots for richer option rows.'
		}
	},
	{
		id: 'stepper',
		usage: {
			title: 'Usage',
			description:
				'GStepper coordinates ordered flows with a declarative item model, keyboard navigation and optional panel/actions composition.'
		},
		examples: {
			title: 'Examples',
			description:
				'Stepper examples cover horizontal and vertical flows, glass and outlined treatments, item states, panels and action slots.'
		}
	},
	{
		id: 'tabs',
		usage: {
			title: 'Usage',
			description:
				'GTabs coordinates a tablist, tabs and panels through a typed value model. Use it for sibling views where only one panel should be active at a time.'
		},
		examples: {
			title: 'Examples',
			description:
				'Tabs examples cover line, pill and tonal variants, vertical orientation, manual activation, icon tabs, badges and typed slot composition.'
		}
	},
	{
		id: 'checkbox',
		usage: {
			title: 'Usage',
			description:
				'GCheckbox is a boolean field for independent choices, confirmations and filters.'
		},
		examples: {
			title: 'Examples',
			description:
				'Checkbox examples cover indicator views, colors, sizes, semantic states and compact inline messaging.'
		}
	},
	{
		id: 'switch',
		usage: {
			title: 'Usage',
			description:
				'GSwitch is a boolean control for immediate settings, feature flags and on/off preferences.'
		},
		examples: {
			title: 'Examples',
			description:
				'Switch examples cover colors, sizes, semantic states, validation and compact inline messaging.'
		}
	},
	{
		id: 'checkbox-group',
		usage: {
			title: 'Usage',
			description:
				'GCheckboxGroup coordinates multiple checkbox options through one model value. Use it when several choices can be active at once.'
		},
		examples: {
			title: 'Examples',
			description:
				'Checkbox group examples cover inline and vertical layouts.'
		}
	},
	{
		id: 'radio',
		usage: {
			title: 'Usage',
			description:
				'GRadio coordinates a single selected value from a visible option set.'
		},
		examples: {
			title: 'Examples',
			description:
				'Radio examples cover indicator views, colors, sizes, inline and vertical layouts, and custom item slots.'
		}
	},
	{
		id: 'fab',
		usage: {
			title: 'Usage',
			description:
				'GFAB is a floating action button for the primary contextual action on a screen. Gradient UI keeps the FAB expressive by rendering its icon surface through GSquircle.'
		},
		examples: {
			title: 'Examples',
			description:
				'FAB examples cover squircle icon actions, extended labels, variants, colors, sizes, floating placement, states and custom slots.'
		}
	},
	{
		id: 'quick-actions',
		usage: {
			title: 'Usage',
			description:
				'GQuickActions is a speed-dial style cluster for a few related floating actions. Use it when one primary FAB needs to reveal two to five nearby commands.'
		},
		examples: {
			title: 'Examples',
			description:
				'Quick actions examples show compact related command clusters, local placement, transition presets, label direction and custom trigger/action slots built from the squircle FAB foundation.'
		}
	},
	{
		id: 'alert',
		usage: {
			title: 'Usage',
			description:
				'GAlert communicates persistent feedback inside the page: confirmation, warnings, errors and contextual status messages.'
		},
		examples: {
			title: 'Examples',
			description:
				'Alert examples cover tonal, gradient and outlined variants, semantic states and custom composition slots.'
		}
	},
	{
		id: 'progress',
		usage: {
			title: 'Usage',
			description:
				'GProgress shows determinate or indeterminate completion with Gradient UI color, state and surface layers.'
		},
		examples: {
			title: 'Examples',
			description:
				'Progress examples cover visual views, semantic states, segmented bars and indeterminate loading.'
		}
	},
	{
		id: 'loading',
		usage: {
			title: 'Usage',
			description:
				'GLoading is a local async overlay for cards, panels, forms and modal content. Use the component when the state belongs to the template, v-loading for declarative element overlays, and useLoading for service-driven flows.'
		},
		examples: {
			title: 'Examples',
			description:
				'Loading examples cover progress views, text visibility, opacity, blur, dark mode, transition options, the v-loading directive and the service pattern.'
		}
	},
	{
		id: 'snackbar',
		usage: {
			title: 'Usage',
			description:
				'GSnackbar shows short-lived feedback above the current page. Use it for save confirmations, undo actions, background status and lightweight errors that do not need a modal.'
		},
		examples: {
			title: 'Examples',
			description:
				'Snackbar examples cover variants, semantic states, locations, standalone component layering, transitions, app-level service usage and composed actions.'
		}
	}
];

type ExamplesModule = Record<
	string,
	DocsLiveExample | DocsLiveExample[] | undefined
>;

const exampleLoaders: Record<string, () => Promise<ExamplesModule>> = {
	'file-input': () => import('@docs/examples/file-input'),
	'image-input': () => import('@docs/examples/image-input'),
	'file-dropzone': () => import('@docs/examples/file-dropzone'),
	'image-dropzone': () => import('@docs/examples/image-dropzone'),
	navbar: () => import('@docs/examples/navbar'),
	spacer: () => import('@docs/examples/spacer'),
	'bottom-navigation': () => import('@docs/examples/bottom-navigation'),
	alert: () => import('@docs/examples/alert'),
	avatar: () => import('@docs/examples/avatar'),
	'avatar-group': () => import('@docs/examples/avatar'),
	badge: () => import('@docs/examples/badge'),
	button: () => import('@docs/examples/button'),
	card: () => import('@docs/examples/card'),
	checkbox: () => import('@docs/examples/checkbox'),
	'checkbox-group': () => import('@docs/examples/checkbox-group'),
	chip: () => import('@docs/examples/chip'),
	combobox: () => import('@docs/examples/combobox'),
	divider: () => import('@docs/examples/divider'),
	drawer: () => import('@docs/examples/drawer'),
	expansion: () => import('@docs/examples/expansion'),
	'expansion-group': () => import('@docs/examples/expansion-group'),
	fab: () => import('@docs/examples/fab'),
	form: () => import('@docs/examples/form'),
	input: () => import('@docs/examples/input'),
	loading: () => import('@docs/examples/loading'),
	dropdown: () => import('@docs/examples/dropdown'),
	menu: () => import('@docs/examples/menu'),
	modal: () => import('@docs/examples/modal'),
	progress: () => import('@docs/examples/progress'),
	'quick-actions': () => import('@docs/examples/quick-actions'),
	radio: () => import('@docs/examples/radio'),
	select: () => import('@docs/examples/select'),
	snackbar: () => import('@docs/examples/snackbar'),
	stepper: () => import('@docs/examples/stepper'),
	switch: () => import('@docs/examples/switch'),
	table: () => import('@docs/examples/table'),
	tabs: () => import('@docs/examples/tabs'),
	textarea: () => import('@docs/examples/textarea'),
	tooltip: () => import('@docs/examples/tooltip')
};

const toExportStem = (id: string) =>
	id.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());

export const loadComponentPage = async (id: string) => {
	const meta = componentPages.find((page) => page.id === id);
	const loadExamples = exampleLoaders[id];
	if (!meta || !loadExamples) return null;

	const examplesModule = await loadExamples();
	const stem = toExportStem(id);
	const usageExample = examplesModule[`${stem}UsageExample`];
	const examples = examplesModule[`${stem}Examples`];
	if (
		!usageExample ||
		Array.isArray(usageExample) ||
		!Array.isArray(examples)
	) {
		throw new Error(`Invalid documentation examples for "${id}"`);
	}

	return {
		...meta,
		usage: { ...meta.usage, example: usageExample },
		examples: { ...meta.examples, items: examples }
	};
};

export { componentPages };
export default componentPages;
