module.exports = {
  extends: 'next/core-web-security',
  rules: {
    '@typescript-eslint/no-unsafe-argument': 'warn',
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn'
  }
}