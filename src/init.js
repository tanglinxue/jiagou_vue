
// 在原型上添加一个Init方法
export function initMixin(Vue) {
  // 初始化流程
  Vue.prototype._init = function (options) {
    console.log(options)
    // 数据的劫持
    const vm = this
  }
}
