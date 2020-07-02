const HubSpotAutoUploadPlugin = require('@hubspot/webpack-cms-plugins/HubSpotAutoUploadPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const hubspotConfig = ({ portal, autoupload } = {}) => {
  return {
    entry: './src/js/index.js',
    output: {
      filename: 'js/main.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { url: false } },
            'sass-loader',
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
      new CopyWebpackPlugin([
        { from: 'src/images', to: 'images' },
        { from: 'src/templates', to: 'templates' },
        { from: 'src/modules', to: 'modules' },
        { from: 'src/css', to: 'css' },
        { from: 'src/fields.json', to: 'fields.json' },
        { from: 'src/theme.json', to: 'theme.json' },
      ]),
    ],
  };
};

module.exports = [hubspotConfig];


// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const HubSpotAutoUploadPlugin = require('@ hubspot / webpack-cms-plugins / HubSpotAutoUploadPlugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const path = require('path');
// const autoprefixer = require('autoprefixer');


// const hubspotConfig = ({ portal, autoupload } = {}) => {
//   return {
//     target: 'web',
//     entry: {
//       'main': './src/index.js'
//     },
//     output: {
//       path: path.resolve(__ dirname, 'dist'),
//       filename: '[name] .js',
//     },
//     optimization: {
//       minimize: false,
//     },
//     module: {
//       rules: [
//         {
//           test: /\.js$/,
//           exclude: / node_modules /,
//           use: {
//             loader: 'babel-loader',
//           },
//         },
//         {
//           test: /\.s[ac[ss$/i,
//           use: [
//             MiniCssExtractPlugin.loader,
//             { loader: 'css-loader', options: { url: false } },
//             {
//               loader: 'postcss-loader',
//               options: {
//                 plugins: () => [autoprefixer()]
//               }
//             },
//             'sass-loader',
//           ],
//         },
//         {
//           test: /\.(svg)$/,
//           use: [
//             {
//               loader: 'url-loader',
//             },
//           ],
//         },
//       ],
//     },
//     plugins: [
//       new HubSpotAutoUploadPlugin({
//         portal,
//         autoupload,
//         src: 'dist',
//         dest: 'cms-react-boilerplate',
//       }),
//       new MiniCssExtractPlugin({
//         filename: '[name] .css',
//       }),
//       new CopyWebpackPlugin([
//         { from: 'src / images', to: 'images' },
//         {
//           from: 'src / modules',
//           to: 'modules',
//         },
//       ]),
//     ],
//   };
// };

// module.exports = [hubspotConfig];
