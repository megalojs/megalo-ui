const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const _ = require('./util');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/app.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    // contentBase: '../dist-h5',
    openPage: '/',
    historyApiFallback: true,
    host: '0.0.0.0',
    disableHostCheck: true
  },
  // output: {
  //   filename: '[name].bundle.js',
  //   path: path.resolve(__dirname, '../dist-h5')
  // },
  output: {
    publicPath: '/',
    chunkFilename: 'chunk_[name].js'
  },
  resolve: {
    extensions: ['.vue', '.js', '.json'],
    alias: {
      vue: 'vue/dist/vue.esm.js',
      '@': _.resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'postcss-loader' }, { loader: 'sass-loader' }],
            js: [{ loader: 'babel-loader' }]
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      { test: /\.scss$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }] },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: './static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: './static/media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: './static/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: _.resolve('./src/index.html'),
      chunksSortMode: 'none'
    })
  ]
}