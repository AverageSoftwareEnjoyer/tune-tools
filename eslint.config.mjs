// @ts-check

import angularEslint from "@angular-eslint/eslint-plugin";
import angularEslintTemplate from "@angular-eslint/eslint-plugin-template";
import angularTemplateParser from "@angular-eslint/template-parser";
import eslint from "@eslint/js";
import jest from "eslint-plugin-jest";
import jsdoc from "eslint-plugin-jsdoc";
import playwright from "eslint-plugin-playwright";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        ignores: [".pnp.cjs"],
        plugins: {
            "simple-import-sort": simpleImportSort,
        },
        rules: {
            /** General rules */
            "arrow-body-style": ["error", "as-needed"],
            curly: "error",
            "default-case": "error",
            "default-case-last": "error",
            "dot-notation": "off",
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "no-duplicate-imports": "error",
            "no-else-return": "error",
            "no-multi-str": "error",
            "no-template-curly-in-string": "error",
            "no-unused-expressions": [
                "error",
                {
                    allowShortCircuit: true,
                    allowTernary: true,
                },
            ],
            "no-useless-assignment": "error",
            "no-var": "error",
            "prefer-arrow-callback": "error",
            "prefer-const": "error",
            "prefer-spread": "error",

            /** Simple-import-sort rules */
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
        },
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        files: ["*.js"],
        ...tseslint.configs.disableTypeChecked,
    },
    {
        files: ["**/*.ts"],
        ...angularEslint.configs["flat/recommended"],
        ...jsdoc["configs"]["flat/recommended-typescript-error"],
        plugins: {
            "@angular-eslint": angularEslint,
            jsdoc: jsdoc,
        },
        rules: {
            /** Angular rules */
            "@angular-eslint/directive-selector": [
                "error",
                {
                    type: "attribute",
                    prefix: "app",
                    style: "camelCase",
                },
            ],
            "@angular-eslint/component-selector": [
                "error",
                {
                    type: "element",
                    prefix: "app",
                    style: "kebab-case",
                },
            ],
            "@angular-eslint/component-class-suffix": "error",
            "@angular-eslint/contextual-lifecycle": "error",
            "@angular-eslint/directive-class-suffix": "error",
            "@angular-eslint/no-empty-lifecycle-method": "error",
            "@angular-eslint/no-host-metadata-property": "error",
            "@angular-eslint/no-input-rename": "error",
            "@angular-eslint/no-inputs-metadata-property": "error",
            "@angular-eslint/no-output-native": "error",
            "@angular-eslint/no-output-on-prefix": "error",
            "@angular-eslint/no-output-rename": "error",
            "@angular-eslint/no-outputs-metadata-property": "error",
            "@angular-eslint/no-pipe-impure": "error",
            "@angular-eslint/use-lifecycle-interface": "error",
            "@angular-eslint/use-pipe-transform-interface": "error",

            /** Typescript rules */
            "@typescript-eslint/array-type": "error",
            "@typescript-eslint/consistent-type-assertions": [
                "error",
                {
                    assertionStyle: "as",
                    objectLiteralTypeAssertions: "allow",
                },
            ],
            "@typescript-eslint/consistent-return": "error",
            "@typescript-eslint/consistent-type-definitions": "error",
            "@typescript-eslint/consistent-type-imports": [
                "error",
                {
                    prefer: "no-type-imports",
                },
            ],
            "@typescript-eslint/dot-notation": "error",
            "@typescript-eslint/default-param-last": "error",
            "@typescript-eslint/explicit-function-return-type": "error",
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    selector: "variable",
                    format: [
                        "camelCase",
                        "UPPER_CASE",
                        "snake_case",
                        "PascalCase",
                    ],
                },
            ],
            "@typescript-eslint/no-duplicate-enum-values": "error",
            "@typescript-eslint/no-duplicate-type-constituents": "error",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-floating-promises": "off",
            "@typescript-eslint/no-inferrable-types": "error",
            "@typescript-eslint/no-mixed-enums": "error",
            "@typescript-eslint/no-redundant-type-constituents": "error",
            "@typescript-eslint/no-require-imports": "error",
            "@typescript-eslint/no-unnecessary-condition": "error",
            "@typescript-eslint/prefer-destructuring": "error",
            "@typescript-eslint/prefer-optional-chain": "error",

            /** JSDoc rules */
            "jsdoc/no-types": "error",
        },
    },
    {
        files: ["tests/**/*.spec.ts"],
        ...playwright["configs"]["flat/recommended"],
    },
    {
        files: ["src/**/*.spec.ts"],
        ...jest.configs["flat/recommended"],
        rules: {
            "@typescript-eslint/dot-notation": "off",
            "@typescript-eslint/unbound-method": "off",
            "jest/unbound-method": "error",
        },
    },
    {
        files: ["*.component.html"],
        ...angularEslintTemplate.configs["flat/recommended"],
        ...angularEslintTemplate.configs["flat/accessibility"],
        languageOptions: {
            parser: angularTemplateParser,
            parserOptions: {
                project: true,
            },
        },
        plugins: ["@angular-eslint/template"],
    },
);
