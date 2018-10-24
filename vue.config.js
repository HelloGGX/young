const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  productionSourceMap: true,
  css: {
    loaderOptions: {
      // pass options to sass-loader
      less: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        data: `@import "@/common/less/variable.less";`
      }
    }
  },
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
  }
  // plugins: [ 'vux-ui', 'duplicate-style' ]
}
