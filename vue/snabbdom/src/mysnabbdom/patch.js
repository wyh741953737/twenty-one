import createElement from './createElement'
import vnode from './vnode'
import patchVnode from './patchVnode'

// key是节点唯一标识，告诉diff算法，更改前后他们是同一个节点
// 只有同一个虚拟节点才进行精细化比较（选择器和key都相同时）
// 只进行同层比较，不会跨层比较，即使是同一片虚拟节点，但是跨层了也不会比较
export default function(oldVnode, newVnode) {
  // 判断老节点是虚拟节点还是真实dom节点,
  if(oldVnode.sel === '' || oldVnode.sel === undefined) {
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }
  // 判断新旧节点是否是同一个节点
  // 是同一个节点，判断是否是文本节点，是文本节点判断文本是否更新，不是文本节点，判断是否有子节点，递归子节点
  // 不是同一个节点，新节点插入，旧节点删除
  if(oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
    patchVnode(oldVnode, newVnode)
  } else {
    // 如果不是同一个节点，创建新节点的真实节点
    let newVnodeElm = createElement(newVnode)
    // 如果有新节点并且旧节点的父节点存在
    if(newVnodeElm && oldVnode.elm.parentNode) {
      // 将真实的新节点插入到父节点那
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    }
    // 删除老节点
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}