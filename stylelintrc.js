module.exports = {
    overrides: [
        {
            files: ["**/*.scss"],
            customSyntax: "postcss-scss"
        }
    ],
    rules: {
        "color-hex-case": "lower",
        "string-quotes": "single"
    },
}
