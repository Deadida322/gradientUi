# Gradient UI Figma Plugin

Figma plugin for generating Gradient UI tokens, native Figma paints, variables, native blurred glow backings, previews, and experimental morph artwork from `@gradient-ui/gradient-engine`.

## Local Development

Build the plugin before importing it into Figma:

```bash
npm run build --workspace @gradient-ui/figma-plugin
```

Then in Figma:

1. Open `Plugins > Development > Import plugin from manifest...`.
2. Select `packages/figma-plugin/manifest.json`.
3. Run `Plugins > Development > Gradient UI Tokens`.

Figma loads `dist/code.js` and `dist/ui.html`, so rebuild after code changes.

## Scripts

```bash
npm run type-check --workspace @gradient-ui/figma-plugin
npm run build --workspace @gradient-ui/figma-plugin
npm run release:check --workspace @gradient-ui/figma-plugin
```

`release:check` runs type-checking and creates the final Figma-ready `dist` output.

For watch mode, run these in two terminals:

```bash
npm run dev:main --workspace @gradient-ui/figma-plugin
npm run dev:ui --workspace @gradient-ui/figma-plugin
```

## Architecture

```txt
src/
  main.ts                 # Figma runtime bootstrap and message routing
  protocol.ts             # UI <-> Figma message contract and settings types
  commands/               # Figma-side command handlers and helpers
  selection.ts            # Selection mutations: fill and stroke
  glowArtwork.ts          # Native blurred gradient backing layers
  morphArtwork.ts         # Figma-native morph frames, variants, SVG/raster output
  preview.ts              # Figma preview pages
  variables.ts            # Figma variable sync
  paintStyles.ts          # Paint style sync
  tokenFactory.ts         # Token generation bridge

  ui/
    App.vue               # Vue app shell
    app/                  # UI state, bridge, previews, constants, DI
    features/             # Generator, Tokens, Morph tabs
    ui-kit/               # Small Figma-focused UI primitives
```

The plugin intentionally uses a small Figma-specific UI kit instead of installing the full Gradient UI Vue plugin. The UI kit maps directly to Figma theme variables like `--figma-color-bg`, keeping the plugin compact and visually native.

## Release Checklist

- Run `npm run release:check --workspace @gradient-ui/figma-plugin`.
- Confirm `packages/figma-plugin/dist/code.js` exists.
- Confirm `packages/figma-plugin/dist/ui.html` exists.
- Import `packages/figma-plugin/manifest.json` in Figma.
- Smoke test:
  - Generator: apply fill, apply stroke, apply glow, create preview.
  - Tokens: sync variables, sync paint styles, create token page.
  - Morph: create background, create variants.
- Verify relaunch button opens the generator from a generated layer.

## Known Limitations

- CSS animation does not run as native Figma geometry.
- Conic gradients use Figma angular gradients and are not browser-perfect.
- Glow is generated as a native gradient backing layer with Figma `LAYER_BLUR`.
- Morph raster depends on SVG rasterization in the plugin iframe; a pure SVG renderer without `foreignObject` is the preferred stabilization path before public release.
