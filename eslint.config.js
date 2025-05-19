import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
    { ignores: ['dist'] },
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
            },
        },
        settings: {
            react: { version: 'detect' }
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            // base JS & hooks rules
            ...js.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,

            // turn on React’s “JSX uses vars” rule so ESLint knows motion is used
            'react/jsx-uses-vars': 'error',

            // (optional if you still want the old React import rule for React ≤ 16)
            // 'react/jsx-uses-react': 'error',

            // your refresh rule
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],

            // keep your unused-vars pattern
            'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
        },
    },
]
