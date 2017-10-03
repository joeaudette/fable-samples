var path = require("path");
var webpack = require("webpack");
var fableUtils = require("fable-utils");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fPath = "../ClientScript/ClientScript.fsproj";

function resolve(filePath) {
  return path.join(__dirname, filePath)
}


var babelOptions = fableUtils.resolveBabelOptions({
  presets: [["es2015", {"modules": false}]],
  plugins: ["transform-runtime"]
});

var isProduction = process.argv.indexOf("-p") >= 0;
//var isProduction = (env && env.prod);
//var port = process.env.SUAVE_FABLE_PORT || "8085";
console.log("Bundling for " + (isProduction ? "production" : "development") + "...");

module.exports = {
  devtool: "source-map",
  entry: { 
    'main': fPath , 'style': './wwwroot/scss/main.scss'
  },
  output: {
    path: resolve('./wwwroot/dist'),
    publicPath: "/wwwroot/dist/",
    filename: '[name].js'
  },
  resolve: {
    modules: [ resolve("./node_modules/")]
  },
  /*
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://localhost:' + port,
        changeOrigin: true
      }
    },
    hot: true,
    inline: true
  },
  */
  module: {
    rules: [
      {
        test: /\.fs(x|proj)?$/,
        use: {
          loader: "fable-loader",
          options: {
            babel: babelOptions,
            define: isProduction ? [] : ["DEBUG"]
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions
        },
      },
      
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }


    ]
  },
  plugins : isProduction ? [] : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new ExtractTextPlugin({ // define where to save the file
        filename: '[name].bundle.css',
        allChunks: true,
      })
  ]
};
