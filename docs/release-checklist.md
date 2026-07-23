# Release Checklist

Follow these steps before publishing or tagging a new version of the SDK.

## 1. Run the verification script

Run all pre-release checks (type-checking, tests, and build) in a single command:

```bash
npm run verify
```

This runs the following in sequence:

| Step | Command | What it checks |
|------|---------|----------------|
| Type-check | `npm run lint` | No TypeScript errors (`tsc --noEmit`) |
| Tests | `npm run test` | All Vitest tests pass |
| Build | `npm run build` | `dist/` compiles cleanly with `tsc` |

All three steps must pass before proceeding.

## 2. Review the changelog

- Confirm the version bump in `package.json` matches the intended semver level (patch / minor / major).
- Ensure `CHANGELOG.md` (if maintained) is up to date.


## 3. Public API review

Before tagging, review every public export and documented API surface:

- Compare `src/index.ts`, `docs/api-reference.md`, and examples so new exports are intentional and documented.
- Mark breaking changes clearly in `CHANGELOG.md` and use a major version bump when callers must change code.
- Confirm error names, option fields, return shapes, and TypeScript types remain stable for unchanged APIs.
- Update migration notes when a public method, constructor option, or documented behavior changes.

## 4. Security review

Complete a short security pass before publishing packages used with wallets or payments:

- Re-read `docs/security.md`, `docs/logging.md`, `docs/wallet-import-safety.md`, and `docs/package-provenance.md` for any needed updates.
- Confirm no tests, examples, logs, fixtures, or docs include live seed phrases, secret keys, access tokens, or raw signed transaction payloads.
- Review changes to signing, wallet import/export, trustline validation, retry/idempotency, and network error handling as security-sensitive.
- Verify package metadata, repository URLs, provenance notes, and publish account expectations match the intended release.
## 5. Tag the release

```bash
git tag v<version>
git push origin v<version>
```

Replace `<version>` with the value in `package.json` (e.g., `1.1.0`).

## 6. Publish to npm

Publishing triggers `prepublishOnly`, which runs `npm run build` again as a final safety net:

```bash
npm publish
```

> **Note:** This is not an automated publish workflow. Each step above is a manual check performed by the maintainer.
