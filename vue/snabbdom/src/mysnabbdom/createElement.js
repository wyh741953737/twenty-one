export default function createElement(vnode) {
  // 根据虚拟节点选择器创建真实的dom节点
  const domNode = document.createElement(vnode.sel)
  // 如果是文本节点
  if(vnode.text !== '' && (vnode.children === undefined || vnode.children.length < 0)) {
    domNode.innerText = vnode.text
    // 否则是有子节点的元素
  } else if(Array.isArray(vnode.children) && vnode.children.length > 0) {
    for(let i = 0; i < vnode.children.length; i++) {
      // 创建子节点的真实元素
      const node = createElement(vnode.children[i])
      // 将子节点挂到父节点上
      domNode.appendChild(node)
    }
  }
  // 真实节点挂到虚拟节点的elm上
  vnode.elm = domNode
  return  vnode.elm
}