class FileListPlugin {
  // eslint-disable-next-line
  apply(compiler) {
    compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, callback) => {
      let filelist = 'In this build:\n\n';

      Object.keys(compilation.assets).forEach((filename) => {
        filelist += `- ${filename}\n`;
      });

      // eslint-disable-next-line
      compilation.assets['filelist.md'] = {
        source() {
          return filelist;
        },
        size() {
          return filelist.length;
        },
      };

      callback();
    });
  }
}


module.exports = FileListPlugin;
