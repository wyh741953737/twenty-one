import createElement from './createElement'
import vnode from './vnode'

export default function(oldVnode, newVnode) {
  // 判断老节点是虚拟节点还是真实dom节点,
  if(oldVnode.sel === '' || oldVnode.sel === undefined) {
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }
  // 判断新旧节点是否是同一个节点
  // 是同一个节点，判断是否是文本节点，是文本节点判断文本是否更新，不是文本节点，判断是否有子节点，递归子节点
  // 不是同一个节点，新节点插入，旧节点删除
  if(oldVnode.sel === newVnode.sel) {
    // oldVnode和newVnode是不是同一个对象？是：什么也不做
    if(oldVnode === newVnode) return
      // 不是：newVnode有没有text属性？有：newVnode的text和oldVnode的text是否相同？相同：什么也不做。不同：将elm的innerHtml改成newVnode的text
    if(newVnode.text !== undefined && (newVnode.children === undefined || vnode.children.length === 0)) {
      // 新节点有text属性
      if(oldVnode.text !== newVnode.text) {
        oldVnode.elm.innerText = newVnode.text
      }
    } else {
      // 新节点没有text属性
      // 判断老节点有没有children
      if(oldVnode.children !== undefined && oldVnode.children.length > 0) {
        // 新老都有children
      } else {
        oldVnode.elm.innerHTML = ''
        for(let i = 0; i < oldVnode.children.length; i++) {
          oldVnode.elm.appendChild(dom)
          let dom = createElement(vnode.children)
        }
      }
    }
      // newVnode没有text属性，意味着有children
      // oldVnode有没有children？有：进行diff。没有：意味着oldVnode的是文本，清空oldVnode的text并将newVnode的children添加到oldVnode的children中
  } else {
    let newVnodeElm = createElement(newVnode)
    if(newVnodeElm && oldVnode.elm.parentNode) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    }
    // 删除老节点
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}