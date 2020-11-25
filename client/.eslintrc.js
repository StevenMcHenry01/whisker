module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: 8 }, // to enable features such as async/await
  ignorePatterns: ['node_modules/*', '.next/*', '.out/*', '!.prettierrc.js'], // We don't want to lint generated files nor node_modules, but we want to lint .prettierrc.js (ignored by default by eslint)
  extends: ['eslint:recommended'],
  overrides: [
    // This configuration will apply only to TypeScript files
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: { react: { version: 'detect' } },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended', // TypeScript rules
        'plugin:react/recommended', // React rules
        'plugin:react-hooks/recommended', // React hooks rules
        'plugin:jsx-a11y/recommended', // Accessibility rules
        'prettier/@typescript-eslint', // Prettier plugin
        'plugin:prettier/recommended', // Prettier recommended rules 
      ],
      rules: {
        'react/prop-types': 0, // We will use TypeScript's types for component props instead
        'react/react-in-jsx-scope': 0, // No need to import React when using Next.js
        'jsx-a11y/anchor-is-valid': 0, // This rule is not compatible with Next.js's <Link /> components
        '@typescript-eslint/no-unused-vars': ['error'], // Why would you want unused vars?
        '@typescript-eslint/explicit-function-return-type': [ // I suggest this setting for requiring return types on functions only where usefull
          'warn',
          {
            allowExpressions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          },
        ],
        'jsx-a11y/label-has-associated-control': 0,
        '@typescript-eslint/no-non-null-assertion': 0, // sometimes you have to non-null assert
        '@typescript-eslint/explicit-module-boundary-types': 0, // allows the explicit funciton return type to handle this
        'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Includes .prettierrc.js rules
      },
    },
  ],
}