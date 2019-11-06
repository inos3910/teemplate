import webpack                from 'webpack'
import EncodingPlugin         from 'webpack-encoding-plugin'
import VueLoaderPlugin        from 'vue-loader/lib/plugin'
import path                   from 'path'
import {paths}                from './config.js'

module.exports = {
  cache    : true,
  output   : {
    filename : '[name].bundle.js',
  },
  // optimization: {
  //   splitChunks: {
  //     name   : 'vendor',
  //     chunks : 'initial',
  //   }
  // },
  plugins  : [
  new VueLoaderPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
  new EncodingPlugin({
    encoding: 'utf-8'
  }),
  new webpack.ProvidePlugin({
    // $                : 'jquery',
    // jQuery           : 'jquery',
    objectFitImages  : 'object-fit-images',
    anime            : ['animejs/lib/anime.es.js', 'default'],
    //lazySizes        : 'lazysizes',
    picturefill      : 'picturefill'
    //Barba            : 'barba.js',
    //Rellax           : 'rellax'
  })
  ],
  module: {
    rules: [
    {
      test: /\.js$/,
      exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }]
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          //scss: 'vue-style-loader!css-loader!sass-loader',
          js: 'babel-loader',
        }
      }
    },
    {
      test: /\.ts$/,
      use: [
      { loader: "babel-loader" },
      { loader: "ts-loader" }
      ],
      exclude: /node_modules/
    },
    {
      test: /\.scss$/,
      use: [
      "vue-style-loader",
      "css-loader",
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [
          path.resolve(__dirname, '../assets/sass/foundation/_variable.scss'),
          path.resolve(__dirname, '../assets/sass/foundation/_mixin.scss'),
          path.resolve(__dirname, '../assets/sass/foundation/_function.scss')
          ]
        }
      },
      {
        loader: "postcss-loader",
        options: {
          sourceMap: true,
          plugins: [
          require("postcss-assets")({
            baseUrl     : `${paths.serverDir}/`,
            basePath    : paths.themeDir,
            loadPaths   : [
            'assets/images/',
            'assets/svg/',
            ],
            relative    : true,
            cachebuster : true
          }),
          require("autoprefixer")({
            grid: true
          })
          ]
        }
      }
      ],
      exclude: /node_modules/
    }
    ]
  },
  resolve: {
    modules    : ["node_modules"],
    extensions : ['.ts', '.vue', '.js'],
    alias      : {
      '@as' : paths.assetsDir,
      '@js' : paths.jsSrcDir,
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
};