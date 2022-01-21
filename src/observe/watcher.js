import { pushTarget, popTarget } from './dep.js'
import { queueWatcher } from './schedular'
let id = 0

class Watcher {
  constructor(vm, exprOrFn, callback, options) {
    // fn(vm)
    this.vm = vm;
    this.callback = callback;
    this.options = options;
    this.id = id++
    this.getter = exprOrFn
    this.depsId = new Set() //不能放重复项
    this.deps = []
    this.get()
  }
  addDep(dep) {
    //当页面调用属性时，则会调用该方法，所以需要去重
    let id = dep.id;
    if (!this.depsId.has(id)) {
      this.depsId.add(id)
      this.deps.push(dep)
      //console.log(this.deps)
      dep.addSub(this)
    }
  }
  get() {
    pushTarget(this) //把watcher存起来
    this.getter() //渲染watcher的执行
    popTarget()//移除watcher
  }
  update() {
    // 渲染了
    queueWatcher(this)

    // console.log('渲染更新')
    // console.log(this.id)
    // this.get()
  }
  run() {
    console.log('渲染了')
    this.get()
  }
}

export default Watcher
