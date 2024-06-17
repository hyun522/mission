module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    //mac window
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-empty': 'warn', // 빈 블록문에 대한 경고 설정
    '@typescript-eslint/no-unused-vars': 'off', // TypeScript 코드에서 사용되지 않는 변수를 감지하고 경고를 발생하지 않겠다.
  },
};
