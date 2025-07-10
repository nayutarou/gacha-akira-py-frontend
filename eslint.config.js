import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";

export default [{ ignores: ["dist", ".vite"] }, {
  files: ["**/*.{js,jsx}"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: { ...globals.browser, ...globals.jest },
    parserOptions: {
      ecmaVersion: "latest",
      ecmaFeatures: { jsx: true },
      sourceType: "module",
    },
  },
  plugins: {
    "react-hooks": reactHooks,
  },
  rules: {
    ...js.configs.recommended.rules,
    ...reactHooks.configs.recommended.rules,
    "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
    "no-trailing-spaces": "error",
    "eol-last": ["error", "always"],
    "semi": ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    "indent": ["error", 2],
    "quotes": ["error", "double", { avoidEscape: true }],
  },
}, {
  files: ["tests/**/*.{js,jsx,ts,tsx}"],
  languageOptions: {
    globals: { ...globals.jest, ...globals.node },
  },
  rules: {
    "no-undef": "off", // Allow global in test files
  },
}];
