import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Bun: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',

      // Code quality rules
      complexity: ['warn', 10],
      'max-lines-per-function': ['warn', 50],
      'max-depth': ['warn', 4],
      'no-duplicate-code': 'off', // Handled by other tools
      'prefer-const': 'error',
      'no-var': 'error',

      // Style rules
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],

      // Best practices
      'no-console': 'off', // Allow console for CLI tool
      'no-magic-numbers': ['warn', { ignore: [-1, 0, 1, 2] }],
      'prefer-template': 'error',
      'no-duplicate-imports': 'error',
    },
  },
  {
    files: ['themes/**/assets/**/*.js'],
    languageOptions: {
      globals: {
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
      },
    },
  },
  {
    files: ['tests/**/*.ts'],
    rules: {
      'max-lines-per-function': ['warn', 150],
      'no-magic-numbers': ['warn', { ignore: [-1, 0, 1, 2, 3, 4, 5, 200, 404, 500, 2020, 25] }],
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
];
