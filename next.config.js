const path = require('path');
const withCSS = require('@zeit/next-css');

const isProd = process.env.NODE_ENV === 'production';

module.exports = withCSS({
  // You may only need to add assetPrefix in the production.
  assetPrefix: isProd ? 'https://cdn.komachine.com/admin/' : '',
  webpack(config) {
    const extendAlias = {
      components: path.resolve(__dirname, 'components/'),
      lib: path.resolve(__dirname, 'lib/'),
    };

    // config.module.rules.push(
    //   {
    //     test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
    //     use: [
    //       {
    //         loader: 'file-loader',
    //         options: {
    //           publicPath: '/_next/static/fonts/',
    //           outputPath: 'static/fonts/',
    //           name: '[name]-[hash].[ext]',
    //         },
    //       },
    //     ],
    //   },
    //   {
    //     test: /\.svg$/,
    //     loader: 'svg-inline-loader',
    //   },
    // );

    config.resolve.alias = { ...config.resolve.alias, ...extendAlias };
    return config;
  },
});
