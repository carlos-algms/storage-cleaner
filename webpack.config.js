const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * @type {import('webpack').ConfigurationFactory}
 */
module.exports = (env, args) => {
  const isProduction = args.mode === 'production';

  return {
    cache: true,
    devtool: isProduction ? false : 'eval-source-map',
    entry: {
      'options-page': './src/pages/options-page.tsx',
      popup: './src/pages/popup.tsx',
    },
    output: {
      // TODO hash files incase of cache issues
      path: path.resolve(__dirname, 'package'),
    },
    optimization: {
      // runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            // test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ['ts-loader'],
          exclude: [/node_modules/, /\.test.tsx|.test.ts?$/],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
      alias: {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
        // Must be below test-utils
      },
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'Popup',
        filename: 'popup.html',
        chunks: ['popup'],
      }),
      new HtmlWebpackPlugin({
        title: 'Options Page',
        filename: 'options-page.html',
        chunks: ['options-page'],
      }),
    ],
  };
};
