import Watcher from './observe/watcher'
import { patch } from './vdom/patch'
export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this
    // 我要通过虚拟节点 渲染出真实的dom
    // console.log(vnode)

    vm.$el = patch(vm.$el, vnode) // 需要用虚拟节点创建出真实节点 替换掉 真实的$el

  }
}
export function mountComponent(vm, el) {
  const options = vm.$options;
  vm.$el = el; // 真实的dom元素
  //console.log(options, vm.$el)

  callHook(vm, 'beforeMount')

  //渲染页面
  let updateComponent = () => { // 无论是渲染还是更新都会调用此方法
    // vm._render 通过解析的render方法 渲染出虚拟dom _c _v _s
    // vm._update 通过虚拟dom 创建真实的dom  

    vm._update(vm._render())
  }

  // 渲染watcher 每个组件都有一个watcher   
  new Watcher(vm, updateComponent, () => { }, true) // true表示他是一个渲染watcher

  callHook(vm, 'mounted')
}


export function callHook(vm, hook) {
  const handlers = vm.$options[hook]
  if (handlers) { //找到对应的钩子依次执行
    handlers.forEach(handler => {
      handler.call(vm)
    })
  }
}
