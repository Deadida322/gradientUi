import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const lintFiles = [
	'src/**/*.{ts,tsx,js,jsx,vue}',
	'docs/src/**/*.{ts,tsx,js,jsx,vue}',
	'*.config.{js,ts}',
	'docs/*.config.{js,ts}'
];

export default tseslint.config(
	{
		ignores: [
			'node_modules/**',
			'dist/**',
			'dist-docs/**',
			'coverage/**',
			'docs/dist/**',
			'vite.config.d.ts',
			'*.tsbuildinfo',
			'src/api/api.types.ts',
			'tailwind.config.js',
			'postcss.config.js'
		]
	},
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs['flat/recommended'],
	{
		files: ['*.vue', '**/*.vue'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser
			}
		}
	},
	{
		files: lintFiles,
		rules: {
			quotes: [0, 'single'],
			'@typescript-eslint/no-unused-vars': [
				'warn', // or "error"
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}
			],
			'vue/no-reserved-component-names': 'off',
			'prettier/prettier': ['error', { endOfLine: 'auto' }],
			'vue/require-default-prop': 'off',
			'vue/singleline-html-element-content-newline': 0,
			'vue/script-setup-uses-vars': 'error',
			'vue/component-name-in-template-casing': ['error', 'kebab-case'],
			'vue/max-attributes-per-line': [
				'error',
				{
					singleline: {
						max: 1
					},
					multiline: {
						max: 1
					}
				}
			],
			'arrow-body-style': ['error', 'as-needed'],
			'vue/no-v-html': 'off'
		}
	},
	eslintPluginPrettierRecommended
);
