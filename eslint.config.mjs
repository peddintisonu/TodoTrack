// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import prettierPlugin from "eslint-plugin-prettier";

export default [
    {
        // Make this the root config
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            "no-unused-vars": "warn",
            "no-console": "off",
            "no-undef": "error",
            "prettier/prettier": [
                "error",
                {
                    endOfLine: "auto",
                },
            ],
        },
        plugins: {
            prettier: prettierPlugin,
        },
    },
];
