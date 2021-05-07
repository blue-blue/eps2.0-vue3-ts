// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

const publicPath = process.env.NODE_ENV === 'production' ? './' : '/'

module.exports = {
  publicPath: publicPath,

  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },

  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    proxy: {
      '^/api': {
        // target: 'https://10.9.103.101:8091',
        target: 'https://www.bisaiquan.cn/api/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api')
      }
    }
  }
}
