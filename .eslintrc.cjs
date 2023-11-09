/* eslint-env node */
// require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-airbnb',
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'comma-dangle': 0,
    semi: 0,
    'vuejs-accessibility/click-events-have-key-events': 'off',
  }
}
