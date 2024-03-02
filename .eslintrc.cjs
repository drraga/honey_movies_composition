/* eslint-env node */
// require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'no-console': 0,
    'comma-dangle': 0,
    semi: 0,
    'vuejs-accessibility/click-events-have-key-events': 'off',
  },
};
