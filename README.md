# configs

Personal canonical configs for TS/Node projects.

## Files

- `eslint.config.js` — flat ESLint config for TS Node libraries.
- `.npmrc` — supply-chain hardened npm defaults (release-age quarantine, no install scripts, exact pinning).

## Use

Copy the file into your project. For ESLint:

```bash
npm install -D eslint @eslint/js typescript-eslint typescript
```

The ESLint config uses type-checked rules, so your project needs a `tsconfig.json`.

For `.npmrc`: drop it at the project root, or copy to `~/.npmrc` to apply globally. Requires a recent npm for `min-release-age` (verify with `npm config get min-release-age` — no "Unknown project config" warning means supported). With `ignore-scripts=true`, run `npm rebuild <pkg>` after install for native modules (`sharp`, `esbuild`, `better-sqlite3`, etc.).

## License

MIT.
