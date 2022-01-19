export function lifecycleMixin(Vue) {
  Vue.prototype._update = function () {

  }
}
export function mountComponent(vm, el) {
  const options = vm.$options;
  vm.$el = el; // 真实的dom元素
  console.log(options, vm.$el)

  //渲染页面
  let updateComponent = () => { // 无论是渲染还是更新都会调用此方法
    // vm._render 通过解析的render方法 渲染出虚拟dom _c _v _s
    // vm._update 通过虚拟dom 创建真实的dom  
    vm.update(vm._render())

  }

  // 渲染watcher 每个组件都有一个watcher   
  new Watcher(vm, updateComponent, () => { }, true) // true表示他是一个渲染watcher
}
