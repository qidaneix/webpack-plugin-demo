const FileListPlugin = require('./webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new FileListPlugin(),
    ],
  },
};
