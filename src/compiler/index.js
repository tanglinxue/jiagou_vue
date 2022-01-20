import { parseHTML } from './parser-html'
import { generate } from './generate'
export function compileToFunction(template) {

  // 1) 解析html字符串 将html字符串 => ast语法树
  let root = parseHTML(template)
  // console.log(root)
  // 需要将ast语法树生成最终的render函数  就是字符串拼接 （模板引擎）
  let code = generate(root)
  // console.log(code)
  // 所有的模板引擎实现 都需要new Function + with
  let renderFn = new Function(`with(this){ return  ${code}}`)
  // console.log(renderFn)
  // 核心思路就是将模板转化成 下面这段字符串
  // vue的render 他返回的是虚拟dom
  return renderFn
}
