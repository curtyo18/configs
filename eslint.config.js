/**
 * Canonical ESLint flat config for TypeScript Node libraries.
 *
 * Layers:
 *   1. @eslint/js recommended (base JS rules)
 *   2. typescript-eslint/recommended (TS-aware rules)
 *   3. Type-checked + style rules
 *   4. Per-glob relaxation for tests
 *
 * Type-checked rules (no-floating-promises, no-misused-promises) require
 * parserOptions.projectService and a tsconfig.json in the consuming project.
 * Lint is slower but catches unawaited promises and similar real bugs.
 *
 * The `curly` rule with "multi-line" allows (and autofixes to) the inline
 * form for single-statement, single-line bodies:
 *   if (x) { doStuff() }   ->   if (x) doStuff()
 *
 * Required deps:
 *   npm install -D eslint @eslint/js typescript-eslint typescript
 */
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/", "node_modules/", "coverage/"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          accessibility: "explicit",
          overrides: {
            constructors: "no-public",
            parameterProperties: "explicit",
          },
        },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "id-length": [
        "error",
        {
          min: 2,
          properties: "never",
          exceptions: ["_"],
        },
      ],
      "curly": ["error", "multi-line"],
    },
  },
  {
    files: ["**/*.spec.ts", "**/*.test.ts"],
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },
);
