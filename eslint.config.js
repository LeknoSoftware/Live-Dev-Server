import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([

    {files: ["**/*.js"],
        plugins:{
            stylistic,
        },
        rules: {
            "no-unused-vars": 2,
            "no-unexpected-multiline": 2,
            "no-unreachable": 2,
            "stylistic/indent": ["error", 4],
            "stylistic/no-trailing-spaces": "error",
            "stylistic/no-extra-semi": "error",
            "stylistic/quotes": ["error", "double"],
            "stylistic/comma-spacing": ["error", { "before": false, "after": true}],
            "stylistic/brace-style": ["error", "stroustrup"],
            "stylistic/eol-last": ["error", "always"],
            "stylistic/no-trailing-spaces": "error",
            "stylistic/arrow-parens": ["error", "always"]
        },

    },

]);
