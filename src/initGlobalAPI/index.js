import { mergeOptions } from '../util/index'
export function initGlobalAPI(Vue) {
  Vue.options = {}
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin)
  }
  Vue.mixin({
    a: 1,
    c: {
      tang: '111'
    },
    beforeCreate() {
      //console.log('mixin1')
    },
  })
  Vue.mixin({
    b: 2,
    c: {
      lin: '222'
    },
    beforeCreate() {
      //console.log('mixin2')
    },
  })
  console.log(Vue.options)
}
