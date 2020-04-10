module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  rules: {
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      alias: {
        map: [
          ['~components', './src/components'],
          ['~images', './src/images'],
          ['~pages', './src/pages'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json', '.scss', '.svg'],
      },
    },
  },
}
