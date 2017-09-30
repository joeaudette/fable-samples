var path = require("path");
var webpack = require("webpack");
var fableUtils = require("fable-utils");
//var fabPath = "C:\\_c\\fable-samples\\SpaApp\\fab\\fab.fsproj";
var fabPath = "../fab/fab.fsproj";

function resolve(filePath) {
  return path.join(__dirname, filePath)
}

function resolveFab(filePath) {
    return path.join(fabPath, filePath)
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
  entry: { 'main': fabPath },
  output: {
    path: resolve('./wwwroot/dist'),
    publicPath: "/wwwroot/dist",
    filename: "bundle.js"
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
      }
    ]
  },
  plugins : isProduction ? [] : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
  ]
};
