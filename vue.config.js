const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = {
  configureWebpack: (config) => {
    const plugins = []
    plugins.push(new MonacoWebpackPlugin({}))
    config.plugins = [...config.plugins, ...plugins]
  },
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    // compress: true,
    // port: 9000,
    https: true,
  },
}
