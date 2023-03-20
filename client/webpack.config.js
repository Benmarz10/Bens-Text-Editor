const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
      }),
      new MiniCssExtractPlugin(),
        new InjectManifest({
        swSrc: './src-sw.js',
      }),   
      new WebpackPwaManifest
      ({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Text Editor',
        background_color: '#ffffff',
        crossorigin: 'use-credentials',
        start_url: "./",
        publicPath: "./",
        fingerprints: false,
        icons: [
          {
            src: 'src/images/logo.png',
            destination: path.join('assets', 'icons'),
            sizes: [96, 128, 192, 256, 384, 512]
          },
        ]
    }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
