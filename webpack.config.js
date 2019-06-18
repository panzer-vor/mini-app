const { resolve } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MinaWebpackPlugin = require('./plugin/MinaWebpackPlugin')
const MinaRuntimePlugin = require('@tinajs/mina-runtime-webpack-plugin')
const webpack = require('webpack')

const debuggable = process.env.BUILD_TYPE !== 'release'

module.exports = {
  context: resolve('src'),
  entry: './app.js',
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    globalObject: 'wx',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.(scss)$/,
        include: /src/,
        use: [
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true,
              name: '[path][name].wxss',
              context: resolve('src'),
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                resolve('src', 'styles'),
                resolve('src'),
              ]
            }
          }
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'all',
      name: 'common',
      minChunks: 2,
      minSize: 0,
    },
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new MinaRuntimePlugin(),
    new MinaWebpackPlugin({
      scriptExtensions: ['.ts'],
      assetExtensions: ['.scss'],
    }),
    new CopyWebpackPlugin([
      {
        from: '**/*',
        to: './',
        ignore: ['**/*.js', '**/*.ts', '**/*.scss', '**/*.d.ts'],
      },
    ]),
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      BUILD_TYPE: JSON.stringify(process.env.BUILD_TYPE || 'debug'),
    })
  ],
  devtool: debuggable ? 'inline-source-map' : 'source-map',
  mode: debuggable? 'none' : 'production',
}