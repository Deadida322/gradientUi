import type { CreatedDesignTokens } from '@gradient-ui/gradient-engine/design-tokens';
import { channelsToRgb } from './figmaColor';
import type { PluginTokenSet } from './tokenFactory';
import { toVariableName } from './tokenNames';

const COLLECTION_NAME = 'Gradient UI';
const MODES = {
	dark: 'Dark',
	light: 'Light'
} as const;

const getOrCreateCollection = async () => {
	const collections =
		await figma.variables.getLocalVariableCollectionsAsync();
	const existing = collections.find(
		(collection) => collection.name === COLLECTION_NAME
	);

	if (existing) return existing;

	const collection =
		figma.variables.createVariableCollection(COLLECTION_NAME);
	collection.renameMode(collection.defaultModeId, MODES.light);

	return collection;
};

const getModeId = (collection: VariableCollection, name: string) => {
	const mode = collection.modes.find((entry) => entry.name === name);

	if (mode) return mode.modeId;

	return collection.addMode(name);
};

const getOrCreateVariable = async (
	collection: VariableCollection,
	name: string
) => {
	const variables = await figma.variables.getLocalVariablesAsync('COLOR');
	const existing = variables.find(
		(variable) =>
			variable.name === name &&
			variable.variableCollectionId === collection.id
	);

	return (
		existing ?? figma.variables.createVariable(name, collection, 'COLOR')
	);
};

const syncTokenGroup = async (
	collection: VariableCollection,
	modeId: string,
	group: string,
	tokens: Record<string, string>
) => {
	let count = 0;

	for (const [name, value] of Object.entries(tokens)) {
		const variable = await getOrCreateVariable(
			collection,
			toVariableName(group, name)
		);
		variable.setValueForMode(modeId, {
			...channelsToRgb(value),
			a: 1
		});
		count += 1;
	}

	return count;
};

export const syncVariables = async (tokens: CreatedDesignTokens) => {
	const collection = await getOrCreateCollection();
	const modeId = getModeId(
		collection,
		tokens.mode === 'dark' ? MODES.dark : MODES.light
	);
	const themeCount = await syncTokenGroup(
		collection,
		modeId,
		'theme',
		tokens.tokens.theme
	);
	const colorCount = await syncTokenGroup(
		collection,
		modeId,
		'color',
		tokens.tokens.colors
	);

	return themeCount + colorCount;
};

export const syncVariableModes = async (tokenSet: PluginTokenSet) => {
	const collection = await getOrCreateCollection();
	let count = 0;

	for (const [mode, tokens] of Object.entries({
		[MODES.light]: tokenSet.light,
		[MODES.dark]: tokenSet.dark
	})) {
		const modeId = getModeId(collection, mode);
		count += await syncTokenGroup(
			collection,
			modeId,
			'theme',
			tokens.tokens.theme
		);
		count += await syncTokenGroup(
			collection,
			modeId,
			'color',
			tokens.tokens.colors
		);
	}

	return count;
};
