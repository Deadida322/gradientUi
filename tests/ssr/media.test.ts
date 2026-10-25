import { fileURLToPath } from 'node:url';
import { compileString, NodePackageImporter } from 'sass-embedded';
import { describe, expect, it } from 'vitest';
import { defaultBreakpoints } from '../../dist/use.mjs';

const loadPaths = [
	fileURLToPath(new URL('../../src/styles/mixins', import.meta.url))
];
const compile = (source: string) => compileString(source, { loadPaths }).css;

describe('SCSS media mixins', () => {
	it('resolves the published package subpath through Sass', () => {
		const css = compileString(
			"@use 'pkg:@gradient-ui/core/styles/media'; .test { @include media.up(md) { display: grid; } }",
			{
				importers: [
					new NodePackageImporter(
						fileURLToPath(new URL('../../', import.meta.url))
					)
				]
			}
		).css;
		expect(css).toContain('(width >= 900px)');
	});

	it('emits no CSS on import', () => {
		expect(compile("@use 'media';")).toBe('');
	});
	it('matches the public JavaScript breakpoint defaults', () => {
		for (const [name, width] of Object.entries(defaultBreakpoints)) {
			expect(
				compile(
					`@use 'media'; .test { @include media.up(${name}) { display: grid; } }`
				)
			).toContain(`(width >= ${width}px)`);
		}
	});
	it('compiles inclusive upper and range boundaries', () => {
		const css = compile(
			"@use 'media'; .test { @include media.down(md) { display: block; } @include media.between(sm, lg) { display: flex; } }"
		);
		expect(css).toContain('(width <= 900px)');
		expect(css).toContain('(600px <= width <= 1200px)');
	});
	it('supports CSS lengths and a replacement breakpoint map', () => {
		const css = compile(
			"@use 'media' with ($breakpoints: (phone: 0, tablet: 48rem)); .test { @include media.up(tablet) { display: grid; } @include media.between(20em, 40em) { display: flex; } @include media.down(phone) { display: none; } }"
		);
		expect(css).toContain('(width >= 48rem)');
		expect(css).toContain('(20em <= width <= 40em)');
		expect(css).toContain('(width <= 0)');
	});
	it.each([
		['up(unknown)', 'Unknown breakpoint'],
		['up(-1px)', 'cannot be negative'],
		['up(12)', 'must use px, em or rem'],
		['up(true)', 'must be a name or a CSS length'],
		['between(lg, sm)', 'minimum breakpoint cannot exceed'],
		['between(20em, 1200px)', 'compatible units']
	])('rejects %s with an actionable error', (call, message) => {
		expect(() =>
			compile(
				`@use 'media'; .test { @include media.${call} { display: block; } }`
			)
		).toThrow(message);
	});
});
