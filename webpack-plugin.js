class ServiceUpdatePlugin {
  constructor(options) {
    this.options = options;
    this.runCount = 0;
  }

  // 更新本地配置文件
  updateLocalConfig({ srcs }) {
    console.log(srcs);
    console.log(this.runCount);
  }

  // 更新线上配置文件
  uploadOnlineConfig({ files }) {
    console.log(files);
    console.log(this.runCount);
  }

  // eslint-disable-next-line
  apply(compiler) {
    // 调试环境：便已完毕，修改本地文件
    if (process.env.NODE_ENV === 'dev') {
      // 本地调试没有md5值，不需要每次杀心
      compiler.hooks.done.tap('ServiceUpdatePlugin', (stats) => {
        if (this.runCount > 0) {
          return;
        }
        const { assets } = stats.compilation;
        const { publicPath } = stats.compilation.options.output;
        const js = Object.keys(assets)
          .filter(item => item.startsWith('js/')) // 过滤入口文件
          .map(path => `${publicPath}${path}`);

        this.updateLocalConfig({ srcs: js });
        this.runCount += 1;
      });
    } else { // 发布环境：上床完毕，请求后端修改
      compiler.hooks.uploaded.tap('ServiceUpdatePlugin', (upFiles) => {
        const entries = upFiles.filter(file => file && file.endWith('js') && file.includes('js/'));

        this.uploadOnlineConfig({ files: entries });
      });
    }
  }
}


module.exports = ServiceUpdatePlugin;
