const kebabCase = (value: string) =>
	value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

export const toTokenPath = (group: string, name: string) =>
	`Gradient UI/${group}/${kebabCase(name).replace(/(\D)(\d+)/g, '$1/$2')}`;

export const toPaintStyleName = (group: string, name: string) =>
	toTokenPath(group, name);

export const toVariableName = (group: string, name: string) =>
	`${group}/${kebabCase(name).replace(/(\D)(\d+)/g, '$1/$2')}`;
