export function patch(oldVnode, vnode) {
  // 1.判断是更新还是要渲染
  const isRealElement = oldVnode.nodeType
  if (isRealElement) {
    const oldElm = oldVnode;
    const parentElm = oldElm.parentNode;
    let el = createElm(vnode)
    parentElm.insertBefore(el, oldElm.nextSibling)
    parentElm.removeChild(oldElm)
    return el
  }
  //console.log(oldVnode)
  // console.log(vnode)
  // 递归创建真实节点 替换掉老的节点
}

function createElm(vnode) {// 根据虚拟节点创建真实的节点
  let { tag, data, key, children, text } = vnode
  // 是标签就创建标签
  if (typeof tag === 'string') {
    vnode.el = document.createElement(tag)
    updateProperties(vnode)
    children.forEach(child => { // 递归创建儿子节点，将儿子节点扔到父节点中
      return vnode.el.appendChild(createElm(child))
    })
  } else {
    vnode.el = document.createTextNode(text)
  }

  // console.log(vnode)


  // 如果不是标签就是文本
  return vnode.el
}

// 更新属性
function updateProperties(vnode) {
  let newProps = vnode.data || {}
  let el = vnode.el;
  //console.log(el, newProps)
  for (let key in newProps) {
    if (key === 'style') {
      for (let styleName in newProps.style) {
        el.style[styleName] = newProps.style[styleName]
      }
    } else if (key === 'class') {
      el.className = newProps.class
    } else {
      el.setAttribute(key, newProps[key])
    }
  }
}
