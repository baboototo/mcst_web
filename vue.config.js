
const ansiRegex = require('ansi-regex')

module.exports = {
  publicPath: '/portal',
  runtimeCompiler: true,
  outputDir: '../src/main/resources/static',

  chainWebpack: config => {
    config.module.rules.delete('eslint');
  },

  configureWebpack: {
    entry: ["babel-polyfill", "./src/main.js"]
  },

  transpileDependencies: [ansiRegex]

  // publicPath: '/mcst',
  // runtimeCompiler: true,
  // outputDir: '../src/main/webapp',
  // chainWebpack: config => {
  //   config.module.rules.delete('eslint');
  // }
};
