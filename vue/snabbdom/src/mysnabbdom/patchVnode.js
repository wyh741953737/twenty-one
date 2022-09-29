import createElement from "./createElement"
import updateChildren from "./updateChild"

export default function patchVnode(oldVnode, newVnode) {
    // oldVnode和newVnode是不是同一个对象？是：什么也不做
    if(oldVnode === newVnode) return
      // 不是：newVnode有没有text属性？有：newVnode的text和oldVnode的text是否相同？相同：什么也不做。不同：将elm的innerHtml改成newVnode的text
    if(newVnode.text !== undefined && (newVnode.children === undefined || vnode.children.length === 0)) {
      // 新节点有text属性
      if(oldVnode.text !== newVnode.text) {
        oldVnode.elm.innerText = newVnode.text
      }
    } else {
      // 新老节点都有children
      if(oldVnode.children !== undefined && oldVnode.children.length > 0) {
        updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
      } else {
        oldVnode.elm.innerHTML = ''
        for(let i = 0; i < oldVnode.children.length; i++) {
          oldVnode.elm.appendChild(dom)
          let dom = createElement(vnode.children)
        }
      }
    }
}

// 四种查找方式，命中一种就不再看别的
// 1：新前与旧前
// 2：新后与旧后
// 3：新后与旧前：命中后移动新后指向的节点到老节点的旧后指针的后面，新后指针前移
// 4：新前与旧后：命中后要移动新前指向的节点到老节点的旧前指针的前面，新前指针后移
// 都没有命中就循环旧的节点，比如在旧节点中找到了新节点D,真实dom会移动位置，虚拟dom将旧节点的D标志为undefined，然后新前后移
// 循环结束后旧前和新后之间的节点就是要删除的节点
// 如果循环在旧节点没找到新节点，就将新节点插入到旧前指针的前面

// while(新前<=新后 && 旧前<=旧后 )
// 只要是旧节点循环结束了，说明剩下的是新节点新增的
// 如果是新节点先循环，说明旧的剩下的是要删除的
