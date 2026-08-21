# Gradient UI 0.5.0

This stable release introduces the new color, material and gradient
architecture.

## Highlights

- `@gradient-ui/gradient-engine` is now a standalone package.
- Gradient materials are generated through `createGradientMaterial`.
- Components use `default` for the regular material fill and `gradient` for the
  expressive gradient surface.
- Gradient recipes, effects, animations and SVG/canvas/CSS formatters are now
  centralized in the engine.

## Breaking Changes

- Replace `variant="filled"` with `variant="gradient"` when you want a gradient
  surface.
- Use `variant="default"` or omit `variant` for the normal material fill.

```vue
<g-button label="Default" />
<g-button label="Gradient" variant="gradient" />
```

## Gradient Engine

The engine is framework-free and can be used outside Vue:

```ts
import { createGradientMaterial } from '@gradient-ui/gradient-engine';

const material = createGradientMaterial('#704aff', {
	preset: 'materialAction',
	recipe: 'glare',
	animation: {
		preset: 'shift',
		duration: 6000
	}
});
```

The output is serializable and adapter-friendly: CSS variables, CSS text,
keyframes, gradient model and effect descriptors.

## Validation

Recommended checks before publishing:

```bash
npm run type-check
npm run eslint
npm run lint:css
npm run build
```
