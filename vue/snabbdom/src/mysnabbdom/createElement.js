export default function createElement(vnode) {
  const domNode = document.createElement(vnode.sel)
  // 如果是文本节点
  if(vnode.text !== '' && (vnode.children === undefined || vnode.children.length < 0)) {
    domNode.innerText = vnode.text
  } else if(Array.isArray(vnode.children) && vnode.children.length > 0) {
    for(let i = 0; i < vnode.children.length; i++) {
      const node = createElement(vnode.children[i])
      domNode.appendChild(node)
    }
  }
  vnode.elm = domNode
  return  vnode.elm
}