// Vue的核心代码,只是Vue的一个声明
function Vue(options){
    //进行vue的初始化操作
    console.log(options)
    this._init(options) 
}

export default Vue