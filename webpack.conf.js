const path = require('path')

const resolve = (rel) => path.resolve(__dirname, rel)

module.exports = {
  mode: 'production',
  devtool: false,
  target: "node", // Node.js via require
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
            options: {
              configFile: resolve("./tslint.json"),
              tsConfigFile: resolve("./tsconfig.json")
            }
          }
        ]
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: resolve("tsconfig.json"),
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      }   
    ]
  },
  optimization: {
    minimize: false
  },
  plugins: [],
  resolve: {
    extensions: [".ts"]
  }
}
