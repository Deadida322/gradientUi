import { buttonExamples, buttonUsageExample } from '@docs/examples/button';
import { badgeExamples, badgeUsageExample } from '@docs/examples/badge';
import { alertExamples, alertUsageExample } from '@docs/examples/alert';
import {
	checkboxExamples,
	checkboxUsageExample
} from '@docs/examples/checkbox';
import {
	checkboxGroupExamples,
	checkboxGroupUsageExample
} from '@docs/examples/checkbox-group';
import { chipExamples, chipUsageExample } from '@docs/examples/chip';
import {
	expansionExamples,
	expansionUsageExample
} from '@docs/examples/expansion';
import {
	expansionGroupExamples,
	expansionGroupUsageExample
} from '@docs/examples/expansion-group';
import { fabExamples, fabUsageExample } from '@docs/examples/fab';
import { drawerExamples, drawerUsageExample } from '@docs/examples/drawer';
import { formExamples, formUsageExample } from '@docs/examples/form';
import { inputExamples, inputUsageExample } from '@docs/examples/input';
import { loadingExamples, loadingUsageExample } from '@docs/examples/loading';
import { menuExamples, menuUsageExample } from '@docs/examples/menu';
import { modalExamples, modalUsageExample } from '@docs/examples/modal';
import {
	progressExamples,
	progressUsageExample
} from '@docs/examples/progress';
import {
	quickActionsExamples,
	quickActionsUsageExample
} from '@docs/examples/quick-actions';
import { radioExamples, radioUsageExample } from '@docs/examples/radio';
import { selectExamples, selectUsageExample } from '@docs/examples/select';
import {
	snackbarExamples,
	snackbarUsageExample
} from '@docs/examples/snackbar';
import { switchExamples, switchUsageExample } from '@docs/examples/switch';
import { tableExamples, tableUsageExample } from '@docs/examples/table';
import {
	textareaExamples,
	textareaUsageExample
} from '@docs/examples/textarea';
import { tooltipExamples, tooltipUsageExample } from '@docs/examples/tooltip';
import type { DocsComponentPage } from '@docs/types';

const componentPages: DocsComponentPage[] = [
	{
		id: 'button',
		usage: {
			title: 'Usage',
			description:
				'GButton is an action surface built on shared variant, color, size and state props, then wrapped by GGradient for borders, glow and accent placement.',
			example: buttonUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'The important parts of the API are grouped here by behavior: variants, color, geometry, gradient placement, states, effects, icon props and slots.',
			items: buttonExamples
		}
	},
	{
		id: 'badge',
		usage: {
			title: 'Usage',
			description:
				'GBadge decorates another control with a compact count, status dot or short metadata label. Use floating badges for notifications and inline badges for adjacent status text.',
			example: badgeUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'Badge examples cover gradient and tonal surfaces, colors, dots, locations, inline mode, sizes and custom content slots.',
			items: badgeExamples
		}
	},
	{
		id: 'chip',
		usage: {
			title: 'Usage',
			description:
				'GChip is a compact action surface for tags, filters, metadata and selected values. It keeps the same variant, color, state and placement language as other Gradient UI surfaces, but defaults to tighter pill-like geometry.',
			example: chipUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'Chips work best as compact, scannable surfaces: tags, selected filters, counters, metadata and removable values.',
			items: chipExamples
		}
	},
	{
		id: 'expansion',
		usage: {
			title: 'Usage',
			description:
				'GExpansion creates a disclosure surface for progressive content, settings, FAQ rows and compact details. It can work alone or inside GExpansionGroup.',
			example: expansionUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'Expansion examples cover visual variants, controlled state, grouped behavior, gradient active accents and custom slots.',
			items: expansionExamples
		}
	},
	{
		id: 'expansion-group',
		usage: {
			title: 'Usage',
			description:
				'GExpansionGroup coordinates several GExpansion items through a shared selection model. Use it for accordions, setup flows, settings sections and grouped disclosures.',
			example: expansionGroupUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'Expansion group examples cover single selection, multiple open items, mandatory state, visual gaps and readonly behavior.',
			items: expansionGroupExamples
		}
	},
	{
		id: 'modal',
		usage: {
			title: 'Usage',
			description:
				'GModal is a centered overlay for focused decisions, confirmations and temporary workflows. It is built on BaseOverlay with scrim, escape handling, outside dismissal and scroll locking.',
			example: modalUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'Modal examples cover footer actions, persistent dialogs, fullscreen flows and responsive sizing.',
			items: modalExamples
		}
	},
	{
		id: 'drawer',
		usage: {
			title: 'Usage',
			description:
				'GDrawer is an edge-aligned overlay for navigation, filters, inspectors and secondary workflows. It shares the BaseOverlay foundation with GModal.',
			example: drawerUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'Drawer examples cover edge placements, footer actions, scrollable content, responsive sizing and custom slots.',
			items: drawerExamples
		}
	},
	{
		id: 'menu',
		usage: {
			title: 'Usage',
			description:
				'GMenu is a composable action-list surface for dropdowns, selects and contextual menus. It owns item rendering, selected state and nested menu behavior, while the surrounding surface decides where it opens.',
			example: menuUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'Menu examples cover nested actions, selected items, semantic states and custom item content.',
			items: menuExamples
		}
	},
	{
		id: 'tooltip',
		usage: {
			title: 'Usage',
			description:
				'GTooltip adds a short contextual hint to focusable or hoverable UI. Use the component wrapper for composed triggers, or v-tooltip for quick inline hints.',
			example: tooltipUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'Tooltip examples cover placements, open and close delays, floating behavior, directive usage and programmatic show/hide methods.',
			items: tooltipExamples
		}
	},
	{
		id: 'table',
		usage: {
			title: 'Usage',
			description:
				'GTable is a styled table primitive for already prepared rows. It keeps data features outside, but gives headers, alignment, widths, slots, merged cells and expandable detail rows a stable API.',
			example: tableUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'Table examples cover variants, density, elevation, column alignment, sticky headers, fixed columns, expansion, merged group rows and slot-based cell composition.',
			items: tableExamples
		}
	},
	{
		id: 'form',
		usage: {
			title: 'Usage',
			description:
				'GForm wraps a native form and coordinates nested Gradient UI field validators through gib-validate. Use it when field-level rules should validate together on submit.',
			example: formUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'Form examples show submit orchestration, validation triggers, form-level disabled state, mixed controls and flattened error slot state while leaving model ownership in the page.',
			items: formExamples
		}
	},
	{
		id: 'input',
		usage: {
			title: 'Usage',
			description:
				'GInput is the core text field for single-line values. It combines label, message, icons, clear action and validation rules through the shared field foundation.',
			example: inputUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'Input examples cover validation states, field rules, masks and custom prepend, append and message slots.',
			items: inputExamples
		}
	},
	{
		id: 'textarea',
		usage: {
			title: 'Usage',
			description:
				'GTextarea uses the same field API as GInput, but gives multiline content more room for notes, descriptions and long-form input.',
			example: textareaUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'Textarea examples cover row density and validation behavior for longer text.',
			items: textareaExamples
		}
	},
	{
		id: 'select',
		usage: {
			title: 'Usage',
			description:
				'GSelect is a field-style selection control built from GDropdown and GMenu. It supports primitive values, object items, multiple selection and custom item rendering.',
			example: selectUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'Select examples cover multiple values, return-object models, validation and item slots for richer option rows.',
			items: selectExamples
		}
	},
	{
		id: 'checkbox',
		usage: {
			title: 'Usage',
			description:
				'GCheckbox is a boolean field for independent choices, confirmations and filters.',
			example: checkboxUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'Checkbox examples cover indicator views, colors, sizes, semantic states and compact inline messaging.',
			items: checkboxExamples
		}
	},
	{
		id: 'switch',
		usage: {
			title: 'Usage',
			description:
				'GSwitch is a boolean control for immediate settings, feature flags and on/off preferences.',
			example: switchUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'Switch examples cover colors, sizes, semantic states, validation and compact inline messaging.',
			items: switchExamples
		}
	},
	{
		id: 'checkbox-group',
		usage: {
			title: 'Usage',
			description:
				'GCheckboxGroup coordinates multiple checkbox options through one model value. Use it when several choices can be active at once.',
			example: checkboxGroupUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'Checkbox group examples cover inline and vertical layouts.',
			items: checkboxGroupExamples
		}
	},
	{
		id: 'radio',
		usage: {
			title: 'Usage',
			description:
				'GRadio coordinates a single selected value from a visible option set.',
			example: radioUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'Radio examples cover indicator views, colors, sizes, inline and vertical layouts, and custom item slots.',
			items: radioExamples
		}
	},
	{
		id: 'fab',
		usage: {
			title: 'Usage',
			description:
				'GFAB is a floating action button for the primary contextual action on a screen. Gradient UI keeps the FAB expressive by rendering its icon surface through GSquircle.',
			example: fabUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'FAB examples cover squircle icon actions, extended labels, variants, colors, sizes, floating placement, states and custom slots.',
			items: fabExamples
		}
	},
	{
		id: 'quick-actions',
		usage: {
			title: 'Usage',
			description:
				'GQuickActions is a speed-dial style cluster for a few related floating actions. Use it when one primary FAB needs to reveal two to five nearby commands.',
			example: quickActionsUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'Quick actions examples show compact related command clusters, local placement, transition presets, label direction and custom trigger/action slots built from the squircle FAB foundation.',
			items: quickActionsExamples
		}
	},
	{
		id: 'alert',
		usage: {
			title: 'Usage',
			description:
				'GAlert communicates persistent feedback inside the page: confirmation, warnings, errors and contextual status messages.',
			example: alertUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'Alert examples cover tonal, gradient and outlined variants, semantic states and custom composition slots.',
			items: alertExamples
		}
	},
	{
		id: 'progress',
		usage: {
			title: 'Usage',
			description:
				'GProgress shows determinate or indeterminate completion with Gradient UI color, state and surface layers.',
			example: progressUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'Progress examples cover visual views, semantic states, segmented bars and indeterminate loading.',
			items: progressExamples
		}
	},
	{
		id: 'loading',
		usage: {
			title: 'Usage',
			description:
				'GLoading is a local async overlay for cards, panels, forms and modal content. Use the component when the state belongs to the template, v-loading for declarative element overlays, and useLoading for service-driven flows.',
			example: loadingUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'Loading examples cover progress views, text visibility, opacity, blur, dark mode, transition options, the v-loading directive and the service pattern.',
			items: loadingExamples
		}
	},
	{
		id: 'snackbar',
		usage: {
			title: 'Usage',
			description:
				'GSnackbar shows short-lived feedback above the current page. Use it for save confirmations, undo actions, background status and lightweight errors that do not need a modal.',
			example: snackbarUsageExample
		},
		examples: {
			title: 'Examples',
			description:
				'Snackbar examples cover variants, semantic states, locations, standalone component layering, transitions, app-level service usage and composed actions.',
			items: snackbarExamples
		}
	}
];

export { componentPages };
export default componentPages;
