# Deployment

Gradient UI has two publish targets:

- documentation site: static Vite build from `docs`
- npm package: library build from `src`

## Documentation

The docs build command is:

```bash
npm run build:docs
```

The static output directory is:

```text
dist-docs
```

## Netlify

The repository includes `netlify.toml`.

Netlify settings:

- build command: `npm run build:docs`
- publish directory: `dist-docs`
- Node version: `22`

Netlify can deploy automatically from the selected Git branch after connecting
the repository in the Netlify dashboard.

## Vercel

The repository includes `vercel.json`.

Vercel settings:

- install command: `npm ci`
- build command: `npm run build:docs`
- output directory: `dist-docs`

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

`.github/workflows/release-package.yml` creates version commits, tags and GitHub
releases from a manual workflow run.

`.github/workflows/publish-package.yml` publishes the package to npm when a
GitHub release is published.

Required GitHub secret:

```text
NPM_TOKEN
```

Create the token in npm, then add it in GitHub:

```text
Repository settings -> Secrets and variables -> Actions -> New repository secret
```

Recommended release flow:

1. Push all changes to the default branch.
2. Open GitHub Actions.
3. Run `Release Package` manually.
4. Choose `patch`, `minor`, `major` or `prerelease`.

The release workflow will:

- run checks
- build the project
- run `npm version`
- push the version commit
- push the matching `vX.Y.Z` tag
- create a GitHub Release

Publishing starts automatically from the release event and runs:

```bash
npm publish --access public
```

The publish workflow validates that the release tag matches the package version
and that the package name is `@gradient-ui/core` before publishing.

Do not run `Publish Package` manually from a branch. Manual releases should be
started from `Release Package`; it creates the matching version tag and release.
