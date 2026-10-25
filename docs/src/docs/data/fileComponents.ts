import type {
	DocsComponentApi,
	DocsComponentCatalogItem
} from './componentApi';
import type { DocsComponentPageMeta, DocsPropRow } from '@docs/types';
import { docsNextReleaseBadge } from './releaseBadges';

const definitions = [
	{
		id: 'file-input',
		title: 'GFileInput',
		description: 'File selection in the standard field shell.'
	},
	{
		id: 'image-input',
		title: 'GImageInput',
		description:
			'Image selection in the standard field shell with local previews.'
	},
	{
		id: 'file-dropzone',
		title: 'GFileDropzone',
		description:
			'A dashed drop target with a centered add action and a file list.'
	},
	{
		id: 'image-dropzone',
		title: 'GImageDropzone',
		description:
			'An image drop target with local previews and image checks.'
	}
];
const props: DocsPropRow[] = [
	{
		name: 'formatRejection',
		type: '(rejection: FileRejection) => string',
		description:
			'Formats each rejection message for localization. The rejection slot replaces its rendering.'
	},
	{
		name: 'form',
		type: 'string',
		description:
			'ID of an external native form. FormData follows the current form association, including reparenting.'
	},
	{
		name: 'icon',
		type: 'MdiIcon',
		defaultValue: "'plus'",
		description:
			'Icon in the default dropzone browse button. The icon slot overrides it.'
	},
	{
		name: 'buttonProps',
		type: "Pick<GButtonProps, 'variant' | 'color' | 'size' | 'rounded'>",
		description:
			'Appearance of the default browse button. Use the trigger slot to replace the complete button.'
	},
	{
		name: 'modelValue',
		type: 'File | File[] | null',
		defaultValue: 'null',
		description:
			'Local files, not URLs or upload records. Single mode emits File or null; multiple mode emits File[].'
	},
	{
		name: 'multiple',
		type: 'boolean',
		defaultValue: 'false',
		description: 'Allows multiple files.'
	},
	{
		name: 'selectionMode',
		type: "'replace' | 'append'",
		defaultValue: "'replace'",
		description:
			'How a new batch changes a multiple selection. Invalid replacement preserves the existing selection.'
	},
	{
		name: 'accept',
		type: 'string',
		description:
			'Comma-separated MIME types, MIME wildcards or extensions. Images additionally require an image MIME type and successful browser decoding.'
	},
	{
		name: 'maxFiles',
		type: 'number',
		description: 'Maximum total file count in multiple mode.'
	},
	{
		name: 'maxFileSize',
		type: 'number',
		description: 'Maximum size per file in bytes.'
	},
	{
		name: 'minImageWidth / maxImageWidth / minImageHeight / maxImageHeight',
		type: 'number',
		description:
			'Optional image dimensions in pixels; image components only.'
	},
	{
		name: 'disabled / readonly',
		type: 'boolean',
		defaultValue: 'false',
		description:
			'Blocks picking, dropping, removal and exposed mutations. Disabled is inherited from GForm.'
	},
	{
		name: 'name',
		type: 'string',
		description:
			'Adds model files to native FormData through the containing form’s formdata event.'
	},
	{
		name: 'capture',
		type: "'user' | 'environment'",
		description: 'Native media capture hint where supported.'
	},
	{
		name: 'rules',
		type: 'ValidationRule<File | File[] | null>[]',
		description:
			'Uses the same validation lifecycle as other Gradient UI fields.'
	},
	{
		name: 'label / placeholder / message',
		type: 'string',
		description: 'Label, empty input text and helper message.'
	},
	{
		name: 'variant / size / color / state',
		type: 'field props',
		description:
			'Standard field appearance and semantic state. Input variants apply to the field shell; dropzone uses a dashed surface.'
	},
	{
		name: 'browseLabel / removeLabel / clearLabel',
		type: 'string',
		description: 'Accessible action labels, configurable for localization.'
	},
	{
		name: 'clearable / hideMessage',
		type: 'boolean',
		description:
			'Controls the input clear action and helper message visibility.'
	}
];
export const fileComponentCatalog: DocsComponentCatalogItem[] = definitions.map(
	(item) => ({
		...item,
		group: 'form',
		to: `/docs/components/${item.id}`,
		badge: docsNextReleaseBadge
	})
);
export const fileComponentApi: DocsComponentApi[] = definitions.map((item) => ({
	...item,
	group: 'form',
	props,
	emits: [
		{
			name: 'update:modelValue',
			type: '(value: File | File[] | null) => void',
			description: 'Requests a selection change.'
		},
		{
			name: 'change',
			type: '(change: FileChange) => void',
			description:
				'Includes the next value and source: picker, drop, remove or clear.'
		},
		{
			name: 'reject',
			type: '(rejections: FileRejection[]) => void',
			description:
				'Reasons: type, size, count, image or dimensions. Rejected files do not enter the model.'
		},
		{
			name: 'remove / clear',
			type: 'events',
			description: 'Emitted for explicit user removal and clearing.'
		},
		{
			name: 'focus / blur',
			type: '(event: FocusEvent) => void',
			description: 'Tracks focus across the complete control.'
		}
	],
	slots: [
		{
			name: 'rejection',
			type: 'slot',
			scope: '{ rejection, message, error: true }',
			description:
				'Custom content for each rejected file; the default is an internal themed file item.'
		},
		{
			name: 'icon',
			type: 'slot',
			scope: '{ error, state }',
			description:
				'Custom icon content inside the default dropzone browse button.'
		},
		{
			name: 'background',
			type: 'slot',
			scope: '{ file, url, remove, error, state }',
			description:
				'First image covering the dropzone. Other files are listed underneath with small thumbnails.'
		},
		{
			name: 'selection',
			type: 'slot',
			scope: '{ files, open, error, state }',
			description: 'Custom selection text for input components.'
		},
		{
			name: 'file',
			type: 'slot',
			scope: '{ file, url, remove, error, state }',
			description:
				'Custom file or image preview content. The default renderer is the shared internal file item with a themed surface and a text remove button.'
		},
		{
			name: 'trigger',
			type: 'slot',
			scope: '{ open, disabled, error, state }',
			description: 'Custom accessible browse action for dropzones.'
		},
		{
			name: 'default / prepend / append / message',
			type: 'slots',
			description:
				'Standard field slots. Affix slots apply to input components.'
		}
	],
	cssVariables: [
		{
			name: '--g-file-dropzone-caption-max-width',
			type: 'length',
			defaultValue: '32ch',
			description:
				'Maximum caption width, additionally limited by the available space. Longer filenames use an ellipsis; the complete name is preserved in title.'
		},
		{
			name: '--g-file-dropzone-dash',
			type: 'dash gap',
			defaultValue: '16 10',
			description: 'SVG border dash and gap lengths in pixels.'
		},
		{
			name: '--g-file-dropzone-hover-scale',
			type: 'number',
			defaultValue: '1.035',
			description:
				'Background zoom on hover, focus and file dragging. Reduced-motion preferences are respected.'
		},
		{
			name: '--g-file-dropzone-thumbnail-size',
			type: 'length',
			defaultValue: '48px',
			description:
				'Size of thumbnails in the file list underneath the background.'
		},
		{
			name: '--g-file-dropzone-min-height',
			type: 'length',
			defaultValue: '320px',
			description: 'Minimum drop area height.'
		},
		{
			name: '--g-file-item-thumbnail-size',
			type: 'length',
			defaultValue: '48px',
			description:
				'Compact thumbnail size in image inputs and file lists.'
		}
	],
	examples: [
		{
			id: `${item.id}-basic`,
			label: 'Usage',
			code: `<${item.id} v-model="file" />`
		}
	]
}));
export const fileComponentPages: DocsComponentPageMeta[] = definitions.map(
	(item) => ({
		id: item.id,
		usage: {
			title: 'Usage',
			description: `${item.description} Files are selected locally; server upload is managed by the application. All sources share validation and limit checks.`
		},
		examples: {
			title: 'Examples',
			description:
				'Single and multiple selection, disabled, read-only and error states. Exposed methods: open(), clear(), focus(); exposed state: $v and pending. GForm.validate() and submit-valid wait for pending image checks; the submit event still reports the initial attempt. Native submission with preventDefault=false follows browser behavior. Changing selection constraints cancels the current batch. Browser file APIs are used only on the client.'
		}
	})
);
