(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function initState(vm) {
    var opts = vm.$options; // vue的数据来源 属性 方法 数据 计算属性 watch

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) ;

    if (opts.computed) ;

    if (opts.watch) ;
  }

  function initMixin(Vue) {
    // 初始化流程
    Vue.prototype._init = function (options) {
      console.log(options); // 数据的劫持

      var vm = this; //vue中使用this.$options指代的就是用户传递的属性

      vm.$options = options; //初始化状态

      initState(vm);
    };
  }

  // Vue的核心代码,只是Vue的一个声明

  function Vue(options) {
    //进行vue的初始化操作
    this._init(options);
  } // 通过引入文件的方式，给Vue原型上添加方法


  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
