# Deployment

Gradient UI has two publish targets:

- documentation site: statically generated Nuxt application from `docs`
- npm package: library build from `src`

## Documentation

The docs build command is:

```bash
npm run build:docs
```

The static output directory is:

```text
docs/dist
```

## Netlify

The repository includes `netlify.toml`.

Netlify settings:

- build command: `npm run build:docs`
- publish directory: `docs/dist`
- Node version: `22`

Netlify can deploy automatically from the selected Git branch after connecting
the repository in the Netlify dashboard.

## Vercel

The repository includes `vercel.json`.

Vercel settings:

- install command: `npm ci`
- build command: `npm run build:docs`
- output directory: `docs/dist`

Vercel can deploy automatically from the selected Git branch after importing
the repository in the Vercel dashboard.

## CI

`.github/workflows/ci.yml` runs on pushes, pull requests and manual dispatch.

It checks:

- `npm ci`
- `npm run type-check`
- `npm run eslint`
- `npm run lint:css`
- `npm run build`
- `npm pack --dry-run`

## npm Publishing

The package is published as:

```text
@gradient-ui/core
```

`.github/workflows/release-package.yml` is the single release workflow. It
creates version commits, tags, GitHub releases and publishes the packages from
a manual workflow run.

The publish job uses npm Trusted Publishing with GitHub OIDC. No `NPM_TOKEN`
secret is required. Configure each public package in npmjs.com with this trusted
publisher:

```text
Repository: Deadida322/gradientUi
Workflow: release-package.yml
Environment: npm-publish
```

Create the `npm-publish` GitHub Environment and configure its deployment
protection rules before the first release.

Recommended release flow:

1. Push all changes to the default branch.
2. Open GitHub Actions.
3. Run `Release Package` manually.
4. Choose `patch`, `minor`, `major` or `prerelease`.

The release workflow will:

- validate package metadata
- run `npm version`
- synchronize all publishable workspace versions
- run the complete SSR release gate
- push the synchronized version commit
- push the matching `vX.Y.Z` tag
- publish gradient-engine, core and the Nuxt module in dependency order
- create a GitHub Release after all npm publishes succeed

Publishing is idempotent and runs in a separate release job, so a failed publish
job can be retried without creating another version commit or tag:

```bash
npm run release:publish -- latest
```

Manual releases should be started from `Release Package`; it creates the
matching version tag, release and npm publish.
