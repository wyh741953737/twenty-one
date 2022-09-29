import createElement from "./createElement"
import patchVnode from "./patchVnode"

export default function updateChildren(parentElm, oldCh, newCh) {
    let newStartIds = 0 // 新前
    let oldStartIds = 0 // 旧前
    let newEndIds = newCh.length -1 // 新后
    let oldEndIds = oldCh.length - 1 // 旧后
    let newStartVnode = newCh[0] // 新前节点
    let oldStartVnode = oldCh[0] // 旧前节点
    let newEndVode = newCh[newEndIds] // 新后节点
    let oldEndVnode = oldCh[oldEndIds] // 旧后节点
    while(newStartIds <= newEndIds && oldStartIds <= oldEndIds) { 
        if(checkSameVNode(newStartVnode, oldStartVnode)) { // 新前与旧前相同
            patchVnode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIds]
            newStartVnode = newCh[++newStartIds]
        }  else if(checkSameVNode(newEndVode, oldEndVnode)) { // 新后与旧后相同
            patchVnode(newEndVode, oldEndVnode)
            oldEndVnode = oldCh[--oldEndIds]
            newEndVode = newCh[--newEndIds]
        } else if(checkSameVNode(newEndVode, oldStartVnode)) { // 新后与旧前相同,移动新后节点到老节点的旧后指针的后面，新后指针前移
            patchVnode(newEndVode, oldStartVnode)
            // 旧前与新后元素一样，并且旧前已经有了，所以将旧前插入到旧后后面
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
            oldStartVnode = oldCh[++oldStartIds] // 将新后指向的节点移动到旧后指针后面，旧前指向的节点置为undefined，所以旧前下移
            newEndVode = newCh[--newEndIds] // 新后指针上移
        } else if(checkSameVNode(newStartVnode, oldEndVnode)) { // 新前与旧后相同,移动新前节点到老节点的旧前指针的前面，新前指针后移
            patchVnode(newStartVnode, oldEndVnode)
            // 将新前节点对应的节点移动到旧前前面，旧后对应的节点置为undefined，旧后前移
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
            oldEndVnode = oldCh[--oldEndIds]
            newStartVnode = newCh[++newStartIds]
        } else {
            // 都没有匹配
        }
    }
    // 没有命中查找规则
    if(oldStartIds <= oldEndIds) { // 说明老节点有剩余节点没有处理
        
    }

}

function checkSameVNode(a, b) {
    return a.sel === b.sel && a.key === b.key
}