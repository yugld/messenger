module.exports = (ctx) => ({
  plugins: {
    'postcss-nested': {},
    'postcss-import': {},
    autoprefixer: {},
    cssnano: ctx.env === 'production',
  },
});
