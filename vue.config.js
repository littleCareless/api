const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = {
  configureWebpack: config => {
    const plugins = [];
    plugins.push(
      new MonacoWebpackPlugin({
        languages: ["javascript", "css", "html", "json", "php"]
      })
    );
    config.plugins = [...config.plugins, ...plugins];
  },
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    // compress: true,
    // port: 9000,
    https: false
  }
};
