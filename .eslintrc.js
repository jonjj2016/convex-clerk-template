// module.exports = {
//     env: {
//         browser: true,
//         es2021: true,
//     },
//     extends: [
//         'eslint:recommended',
//         'plugin:react/recommended',
//         'plugin:prettier/recommended',
//     ],
//     parser: '@babel/eslint-parser',
//     parserOptions: {
//         ecmaFeatures: {
//             jsx: true,
//         },
//         ecmaVersion: 12,
//         sourceType: 'module',
//     },
//     plugins: ['react', 'prettier'],
//     rules: {
//         'prettier/prettier': 'error',
//         // Add any other custom rules here
//     },
// };
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
];
