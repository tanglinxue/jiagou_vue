import { parseHTML } from './parser-html'
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
function genProps(attrs) {
  let str = ''
  attrs.forEach(item => {
    if (item.name === 'style') {
      let obj = {}
      item.value.split(';').forEach(bitem => {
        let [key, value] = bitem.split(':')
        obj[key] = value
      })
      item.value = obj
    }
    str += `${item.name}:${JSON.stringify(item.value)},`
  })
  return `{${str.slice(0, -1)}}`
}
function genChildren(el) {
  const children = el.children
  if (children.length) {
    return `${children.map(c => gen(c)).join(',')}`
  } else {
    return false
  }
}
function gen(node) {
  if (node.type == 1) {
    return generate(node)
  } else {
    let text = node.text
    let tokens = []
    let match, index;
    let lastIndex = defaultTagRE.lastIndex = 0
    // console.log(text)
    while (match = defaultTagRE.exec(text)) {
      index = match.index
      //console.log(match)
      if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)))
      }
      tokens.push(`_s(${match[1].trim()})`)
      lastIndex = index + match[0].length
    }
    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)))
    }

    return `_v(${tokens.join('+')})`
  }
}
function generate(el) {
  const children = genChildren(el)
  let code = `_c("${el.tag}",${el.attrs.length ? genProps(el.attrs) : 'undefined'
    }${children ? `,${children}` : ''})`

  return code
}
export function compileToFunction(template) {
  // 1) 解析html字符串 将html字符串 => ast语法树
  let root = parseHTML(template)
  // console.log(root)
  // 需要将ast语法树生成最终的render函数  就是字符串拼接 （模板引擎）
  let code = generate(root)
  // console.log(code)
  // 所有的模板引擎实现 都需要new Function + with
  let renderFn = new Function(`with(this){ return ${code}}`)
  // console.log(renderFn)
  // 核心思路就是将模板转化成 下面这段字符串
  // vue的render 他返回的是虚拟dom
  return renderFn
}
