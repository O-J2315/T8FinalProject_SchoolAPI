import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"],
        ignores: ["node_modules", "dist"],
        plugins: { js },
        extends: ["js/recommended", prettier],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            "no-process-exit": "off",
            "no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
        },
    },
]);
