const path = require('path')
const webpack = require('webpack')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: { // this is to specify multiple entries are possible and can be bundled 
    home: "./src/home.js",
    index: "./src/index.js",
    table: "./src/table.js",
    newType: "./src/newType.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"  // name specified in the entry is replaced
  },

  watch: true, // boolean
  module: {
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        exclude: [
          path.resolve(__dirname, "node_modules")
        ],
        loader: "babel-loader",
        options: {
          presets: ["es2015"]
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',  // if this plugins fails it will use style loader to load styles
          use: [
            'css-loader', 'sass-loader' // basic configs
            // advanced configs
       /*     {
                loader: 'css-loader', // makes webpack understand and load css
                options: {
                    url: false,
                    minimize: true,
                    sourceMap: true
                }
            }, 
            {
                loader: 'sass-loader', // converts scss to css
                options: {
                    sourceMap: true
                }
            } */
          ]
        })
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}), // this plugin is to make, common imports like (jquery, lodash) to bundle to vendor.js 
    // browserSyncPlugin requires browser-sync module as a base module
    // we need to have the index.html file in baseDir folder(dist) to get it served
  /*  new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] },
      files: [
        'dist/*.html'  // extra files other than entry files should be watched from here
      ]
    }), */
  ],
  devtool: "source-map", // we need to give this so that it maps the source code to bundled file during debugging
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, "dist"),
  },
 }
