import type { DocsReleaseBadgeMeta } from '@docs/types';

export const docsNextReleaseBadge: DocsReleaseBadgeMeta = {
	label: '0.5.0 RC',
	tone: 'rc',
	title: 'Documented ahead of the stable 0.5.0 release.'
};

export const docsTestingBadge: DocsReleaseBadgeMeta = {
	label: 'In test',
	tone: 'testing',
	title: 'API or visuals may change before the stable release.'
};
