/**
 * axios 二次封装
 */
import instance from '../request/getRequest'

function server (this:any) {
  this.instance = instance
  this.nowHandle = null
}

server.prototype.v = function (vm) {
  this.nowHandle = vm
}

server.prototype.sendMgs = function (moduleName, urlKey, url, config) {
  const _this = this
  let conf = config || {}
  let type = conf.type || 'get'
  let data = conf.data || {}
  let bindName = conf.bindName || urlKey

  //分成2个模块：数据处理/效果处理（比如loading）
  let before = function (res) {}

  let defaultFn = function (res) {
    _this.nowHandle[bindName] = res.data
  }

  let success = conf.success || defaultFn

  this.instance[type](url).then(before).then(success)

}
server.prototype.parseRouter = (name: string, options: any) => {
  this.name = {}
  Object.keys(options).forEach((urlKey) => {
    this.name.urlKey = this.sendMgs.bind(this, name, urlKey, options.urlKey)
  })
}
export default new server()