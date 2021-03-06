const path = require('path')

const resolve = (rel) => path.resolve(__dirname, rel)
module.exports = {
  mode: 'production',
  devtool: false,
  target: "node", // Node.js via require
  output: {
    // library: 'default',
    libraryTarget: "commonjs2"
    // libraryExport: "CypressWebpackPlugin"
  },
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
  externals: {
    cypress: {
      // commonjs: 'cypress',
      commonjs2: 'cypress',
      // amd: 'cypress'
    },
    relative: {
      // commonjs: 'relative',
      commonjs2: 'relative',
      // amd: 'relative'
    },
    "directory-exists": {
      // commonjs: 'directory-exists',
      commonjs2: 'directory-exists',
      // amd: 'directory-exists'
    }
  },
  resolve: {
    extensions: [".ts"]
  }
}
