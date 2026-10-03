import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    ignores: ["dist/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
];
