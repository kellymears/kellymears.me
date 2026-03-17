import js from '@eslint/js'
import nextConfig from 'eslint-config-next/core-web-vitals'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

const jsxA11yPlugin = nextConfig.find((c) => c.plugins?.['jsx-a11y'])?.plugins?.['jsx-a11y']

export default [
  js.configs.recommended,
  ...nextConfig,
  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin,
      ...(jsxA11yPlugin && { 'jsx-a11y': jsxA11yPlugin }),
    },
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'off',
      'react/prop-types': 'off',
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]
