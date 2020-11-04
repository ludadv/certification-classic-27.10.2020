module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 12
    },
    // extends: ['@stripped-ui'],

    rules: {
        indent: ["error", 4],
        "linebreak-style": ["error", "windows"],
    },
};
