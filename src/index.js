// Vue的核心代码,只是Vue的一个声明
import { initMixin } from './init'
import { renderMixin } from './render'
import { lifecycleMixin } from './lifycycle'
import { initGlobalAPI } from './initGlobalAPI/index'
function Vue(options) {
  //进行vue的初始化操作
  this._init(options)
}

// 通过引入文件的方式，给Vue原型上添加方法
initMixin(Vue) //给Vue原型上添加一个_init方法
renderMixin(Vue)
lifecycleMixin(Vue)


initGlobalAPI(Vue)

export default Vue
