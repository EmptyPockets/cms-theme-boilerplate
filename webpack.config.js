const HubSpotAutoUploadPlugin = require('@hubspot/webpack-cms-plugins/HubSpotAutoUploadPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const hubspotConfig = ({ portal, autoupload } = {}) => {
  return {
    entry: {
      'main': './src/index.js',
    },
    output: {
      filename: 'js/[name].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          },
        },
        {
          test: /\.(svg)$/,
          use: [
            {
              loader: 'url-loader',
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: (loader) => [
                  require('postcss-import')({ root: loader.resourcePath }),
                  require('postcss-preset-env')(),
                  require('cssnano')()
                ]
              }
            },
            {
              loader: 'sass-loader', options: {
                implementation: require('node-sass'),
              },
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: ['./src/scss/settings/vars.scss', './src/scss/tools/mediaqueries.scss']
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HubSpotAutoUploadPlugin({
        autoupload,
        portal,
        src: 'dist',
        dest: 'damore-cms-theme',
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      }),
      new CopyWebpackPlugin([
        { from: 'src/images', to: 'images' },
        { from: 'src/templates', to: 'templates' },
        { from: 'src/hubspot-modules', to: 'hubspot-modules' },
        { from: 'src/fields.json', to: 'fields.json' },
        { from: 'src/theme.json', to: 'theme.json' }
      ]),
    ],
  };
};

module.exports = [hubspotConfig];


