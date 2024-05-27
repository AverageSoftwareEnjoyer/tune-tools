/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check

const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const jest = require("eslint-plugin-jest");
const playwright = require("eslint-plugin-playwright");
const prettierConfig = require("eslint-config-prettier");
const angularEslint = require("@angular-eslint/eslint-plugin");
const angularEslintTemplate = require("@angular-eslint/eslint-plugin-template");
const stylisticEslint = require("@stylistic/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const angularTemplateParser = require("@angular-eslint/template-parser");
const simpleImportSort = require("eslint-plugin-simple-import-sort");
const jsdoc = require("eslint-plugin-jsdoc");

module.exports = [
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    stylisticEslint.configs["recommended-flat"],
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
            "no-var": "error",
            "prefer-arrow-callback": "error",
            "prefer-const": "error",
            "prefer-spread": "error",

            /** Stylistic rules */
            "@stylistic/arrow-parens": ["error", "always"],
            "@stylistic/arrow-spacing": "error",
            "@stylistic/brace-style": ["error", "1tbs"],
            "@stylistic/comma-dangle": "off",
            "@stylistic/dot-location": ["error", "property"],
            "@stylistic/indent": ["error", 4],
            "@stylistic/linebreak-style": ["error", "unix"],
            "@stylistic/member-delimiter-style": [
                "error",
                {
                    multiline: {
                        delimiter: "semi",
                        requireLast: true,
                    },
                    singleline: {
                        delimiter: "semi",
                        requireLast: false,
                    },
                    multilineDetection: "brackets",
                },
            ],
            "@stylistic/no-confusing-arrow": "warn",
            "@stylistic/operator-linebreak": ["error", "after"],
            "@stylistic/promise-function-async": "off",
            "@stylistic/quotes": ["error", "double"],
            "@stylistic/quote-props": "off",
            "@stylistic/restrict-template-expressions": "off",
            "@stylistic/semi": ["error", "always"],
            "@stylistic/spaced-comment": "error",

            /** Simple-import-sort rules */
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
        },
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: true,
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
            "@typescript-eslint/ban-types": "error",
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
    prettierConfig,
];
