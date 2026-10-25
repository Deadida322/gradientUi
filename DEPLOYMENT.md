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
4. Choose the package: `core` (default), `gradient-engine` or `nuxt`.
5. Choose `patch`, `minor`, `major` or `prerelease`.

The release workflow will:

- validate package metadata
- run `npm version` for the selected package only
- synchronize lockfile metadata with each manifest and validate semver compatibility
- run the complete SSR release gate
- push the selected package's version commit
- push `vX.Y.Z` for core, `gradient-engine-vX.Y.Z` for engine or `nuxt-vX.Y.Z` for Nuxt
- publish only the selected package using its own version
- create a GitHub Release after publication succeeds

Package versions are independent. For example, core `1.2.0` can depend on engine
`^1.0.1`, while Nuxt `1.0.1` accepts core `^1.0.1`. Dependency ranges are
compatibility contracts: update them explicitly when an API requirement changes.
Publish a required new dependency version before publishing its consumer.
`npm run version:check` checks compatibility and each package's lockfile metadata;
`npm run version:sync` updates lockfile metadata without changing any manifest
version or dependency range.

Publishing is idempotent and runs in a separate release job, so a failed publish
job can be retried without creating another version commit or tag:

```bash
npm run release:publish -- latest --package core
npm run release:publish -- latest --package gradient-engine
npm run release:publish -- latest --package nuxt
```

Manual releases should be started from `Release Package`; it creates the
matching version tag, release and npm publish.
For a retry, select the same package and set `resume-version` to its version.
