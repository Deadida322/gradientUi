import type { Component } from 'vue';

export interface DocsPropRow {
	name: string;
	type: string;
	defaultValue?: string;
	description: string;
}

export interface DocsExampleTab {
	id: string;
	label: string;
	code: string;
}

export interface DocsSlotRow {
	name: string;
	type: string;
	scope?: string;
	description: string;
}

export interface DocsLiveExample {
	id: string;
	label: string;
	component: Component;
	code: string;
}

export interface DocsComponentPage {
	id: string;
	usage: {
		title: string;
		description: string;
		example: DocsLiveExample;
	};
	examples: {
		title: string;
		description: string;
		items: DocsLiveExample[];
	};
}
