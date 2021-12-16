(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * 
   * @param {*} data 当前数据是不是对象
   * @returns 
   */
  function isObject(data) {
    return _typeof(data) === 'object' && data !== null;
  }

  // 我要重写数组的那些方法 7个 push shift unshift pop reverse sort splice 会导致数组本身发生变化
  // slice()
  var oldArrayMethods = Array.prototype; // value.__proto__ = arrayMethods 原型链查找的问题， 会向上查找，先查找我重写的，重写的没有会继续向上查找
  // arrayMethods.__proto__ = oldArrayMethods

  var arrayMethods = Object.create(oldArrayMethods);
  var methods = ['push', 'shift', 'unshift', 'pop', 'sort', 'splice', 'reverse'];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      console.log(args); //AOP 切片变成

      oldArrayMethods[method].apply(this, args); //调用原生的数组方法

      switch (method) {
        case 'push':
        case 'unshift':

        case 'splice':
          args.slice(2);
      }
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      // vue如果数据的层次过多 需要递归的去解析对象中的属性，依次增加set和get方法
      if (Array.isArray(value)) {
        // 如果是数组的话并不会对索引进行观测 因为会导致性能问题
        // 前端开发中很少很少 去操作索引 push shift unshift 
        value.__proto__ = arrayMethods; // console.log(value.__proto__)
        // 如果数组里放的是对象我再监控

        this.observerArray(value);
      } else {
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "observerArray",
      value: function observerArray(value) {
        value.forEach(function (item) {
          observe(item);
        });
      }
    }, {
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data);
        keys.forEach(function (key) {
          defineReactive(data, key, data[key]); //定义响应式数据
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    observe(value); //递归实现深度检测

    Object.defineProperty(data, key, {
      configurable: true,
      //控制是否可以删除
      enumerable: false,
      //控制是否可以枚举
      get: function get() {
        return value;
      },
      set: function set(newValue) {
        console.log('更新数据');

        if (newValue !== value) {
          observe(newValue); //继续劫持用户设置的值，因为有可能用户设置的值是一个对象

          value = newValue;
        }
      }
    });
  }

  function observe(data) {
    var isObj = isObject(data);

    if (!isObj) {
      return;
    }

    new Observer(data);
  }

  function initState(vm) {
    var opts = vm.$options; // vue的数据来源 属性 方法 数据 计算属性 watch

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) ;

    if (opts.watch) ;
  }

  function initData(vm) {
    // 初始化数据
    var data = vm.$options.data; //用户传递的data

    data = vm._data = typeof data === 'function' ? data.call(vm) : data; // 对象劫持 用户改变了数据 我希望可以得到通知 => 刷新页面
    // MVVM 数据变化可以驱动视图变化
    // Object.defineProperty() 给属性增加get方法和set方法

    observe(data); // 响应式原理
  }

  function initMixin(Vue) {
    // 初始化流程
    Vue.prototype._init = function (options) {
      // 数据的劫持
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


  initMixin(Vue); //给Vue原型上添加一个_init方法

  return Vue;

}));
//# sourceMappingURL=vue.js.map
