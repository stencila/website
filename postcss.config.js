module.exports = {
  plugins: [
    require('tailwindcss'),
    require('postcss-nested'),
    ...(process.env.HUGO_ENVIRONMENT === 'production'
      ? [
          require('cssnano')({
            preset: [
              'default',
              {
                autoprefixer: true,
                reduceIdents: true,
                mergeIdents: true,
                discardUnused: true,
              },
            ],
          }),
        ]
      : []),
  ],
}
