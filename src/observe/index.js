// 把data中的数据 都使用Object.defineProperty重新定义 es5
// Object.defineProperty 不能兼容ie8 及以下 vue2 无法兼容ie8版本
import { isObject, def } from '../util/index.js'
import { arrayMethods } from './array.js'
import Dep from './dep'
class Observer {
  constructor(value) {
    this.dep = new Dep() //给数组用的
    // vue如果数据的层次过多 需要递归的去解析对象中的属性，依次增加set和get方法
    //我给每一个监控过得对象都增加一个__ob__属性
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      // 如果是数组的话并不会对索引进行观测 因为会导致性能问题
      // 前端开发中很少很少 去操作索引 push shift unshift 
      value.__proto__ = arrayMethods
      // console.log(value.__proto__)
      // 如果数组里放的是对象我再监控
      this.observerArray(value)
    } else {
      this.walk(value)
    }
  }
  observerArray(value) {
    value.forEach(item => {
      observe(item)
    })
  }
  walk(data) {
    let keys = Object.keys(data)
    keys.forEach((key) => {
      defineReactive(data, key, data[key]) //定义响应式数据
    })
  }
}

function defineReactive(data, key, value) {
  let dep = new Dep() //为了给对象使用的
  //这里这个value可能是数组，也可能是对象，返回的结果是observer的实例

  let childOb = observe(value) //递归实现深度检测,数组的observe实例

  Object.defineProperty(data, key, {
    configurable: true, //控制是否可以删除
    enumerable: true,//控制是否可以枚举
    get() {
      if (Dep.target) {//如果当前有watcher
        dep.depend() // 意味着我要将watcher存起来
        if (childOb) {
          childOb.dep.depend() //收集了数组的相关依赖
          //如果数组中还有数组
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      //每个属性都对应着自己的watcher
      return value
    },
    set(newValue) {
      console.log('更新数据')
      if (newValue !== value) {
        observe(newValue) //继续劫持用户设置的值，因为有可能用户设置的值是一个对象
        value = newValue
        dep.notify()//通知依赖的watcher来进行更新操作
      }

    }
  })
}

function dependArray(arr) {
  arr.forEach(item => {
    item.__ob__ && item.__ob__.dep.depend() //将数组中的没一个都取出来，数据变化后，也去更新视图
    if (Array.isArray(item)) {
      dependArray(item)
    }
  })
}

export function observe(data) {
  let isObj = isObject(data)
  if (!isObj) {
    return
  }
  return new Observer(data)
}
