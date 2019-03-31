const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  productionSourceMap: undefined,
  // plugins: [ 'vux-ui', 'duplicate-style' ]
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('base', resolve('src/base'))
      .set('api', resolve('src/api'))
      .set('utils', resolve('src/utils'))
      .set('store', resolve('src/store'))
      .set('router', resolve('src/router'))
      .set('mixins', resolve('src/mixins'))
  },
  css: {
    loaderOptions: {
      less: {
        data: `@import "@/common/less/variable.less";`
      }
    },
    sourceMap: true
  },

  // baseUrl: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  parallel: undefined
}
