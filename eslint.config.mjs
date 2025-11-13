import js from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{ts,mts,cts}'],
    ignores: ['**/*.spec.ts', '.angular/**', '.angular/cache/**', '**/*.js'],
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.eslint.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    plugins: {
      import: pluginImport,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.eslint.json',
        },
      },
    },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-useless-escape': 'off',
      'no-prototype-builtins': 'off',
      'no-case-declarations': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            'src/app/shared/**',
            'src/app/core/**',
            'src/app/domain/**',
            '../**/shared/**',
            '../**/core/**',
            '../**/domain/**',
          ],
        },
      ],
      'import/no-unresolved': 'error',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
]);
