import type { DocsReleaseBadgeMeta } from '@docs/types';

export const docsNextReleaseBadge: DocsReleaseBadgeMeta = {
	label: '0.6.0',
	tone: 'new',
	title: 'Available in the stable 0.6.0 release.'
};

export const docsUpcomingReleaseBadge: DocsReleaseBadgeMeta = {
	label: '0.8.0',
	tone: 'new',
	title: 'Planned for the next 0.8.0 release.'
};

export const docsTestingBadge: DocsReleaseBadgeMeta = {
	label: 'In test',
	tone: 'testing',
	title: 'API or visuals may change before the stable release.'
};
