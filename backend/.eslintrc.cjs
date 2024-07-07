module.exports = {
  root: true,
  env: { 
    "node": true,
    browser: true,
    es2020: true },
  extends: [
    'eslint:recommended',
  ],
  "overrides": [
    {
        "env": {
            "node": true
        },
        "files": [
            ".eslintrc.{js,cjs}"
        ],
        "parserOptions": {
            "sourceType": "script"
        }
    }
],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
}
