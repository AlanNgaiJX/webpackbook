var path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "webpack-numbers.js",
    library: "webpackNumbers",
    libraryTarget: "umd",
    globalObject: "this",
  },
  externals: {
    // 作为外部依赖，而不是直接把 lodash直接打包进去
    lodash: {
      commonjs: "lodash",
      commonjs2: "lodash",
      amd: "lodash",
      root: "_",
    },
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.(js)$/,
  //       exclude: /(node_modules|bower_components)/,
  //       use: "babel-loader",
  //     },
  //   ],
  // },
};
