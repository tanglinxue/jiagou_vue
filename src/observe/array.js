// 我要重写数组的那些方法 7个 push shift unshift pop reverse sort splice 会导致数组本身发生变化
// slice()
let oldArrayMethods = Array.prototype
// value.__proto__ = arrayMethods 原型链查找的问题， 会向上查找，先查找我重写的，重写的没有会继续向上查找
// arrayMethods.__proto__ = oldArrayMethods
export let arrayMethods = Object.create(oldArrayMethods)

const methods = [
  'push',
  'shift',
  'unshift',
  'pop',
  'sort',
  'splice',
  'reverse'
]

methods.forEach(method => {
  arrayMethods[method] = function (...args) {
    console.log('用户调用了push方法')
    const result = oldArrayMethods[method].apply(this, args) //调用原生的数组方法,AOP切片编程
    // console.log(typeof result)
    // push unshift 添加的元素可能还是一个对象
    let inserted;//当前用户插入的元素
    let ob = this.__ob__
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
      default:
        break
    }
    if (inserted) {
      ob.observerArray(inserted) //将新增属性继续观测
    }
    ob.dep.notify() //如果用户调用了Push方法，我会通知更新操作
    return result
  }
})
