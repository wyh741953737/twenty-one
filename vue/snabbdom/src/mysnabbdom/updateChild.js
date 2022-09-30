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
    let keyMap = {} // 用来缓存老树的key对应的序号
    while(newStartIds <= newEndIds && oldStartIds <= oldEndIds) {  
        if(oldStartVnode === null || oldCh[oldStartIds] === undefined) { // 旧前被置为undefined
            oldStartVnode = oldCh[++oldStartIds]
        } else if(oldEndVnode === null || oldCh[oldEndIds] === undefined) { // 旧后被置为undefined
            oldEndVnode = oldCh[--oldEndIds]
        } else if(newStartVnode === null || newCh[newStartIds] === undefined) { // 新前被置为undefined
            newStartVnode = newCh[++newStartIds]
        } else if(newEndVode === null || newCh[newEndIds] === undefined) { // 新后被置为undefined
            newEndVode = newCh[--newEndIds]
        } else if(checkSameVNode(newStartVnode, oldStartVnode)) { // 新前与旧前相同
            patchVnode(oldStartVnode, newStartVnode) // 调用patchVnode对比新前旧前内容使是否一样
            oldStartVnode = oldCh[++oldStartIds] // 更新完将新前后旧前指针后移
            newStartVnode = newCh[++newStartIds]
        }  else if(checkSameVNode(newEndVode, oldEndVnode)) { // 新后与旧后相同
            patchVnode(newEndVode, oldEndVnode) // 调用patchVnode对比新后旧后内容使是否一样
            oldEndVnode = oldCh[--oldEndIds] // 更新完新后旧后更改指针
            newEndVode = newCh[--newEndIds]
        } else if(checkSameVNode(newEndVode, oldStartVnode)) { // 新后与旧前相同,移动新后节点到老节点的旧后指针的后面，新后指针前移
            patchVnode(newEndVode, oldStartVnode) // 更新新后与旧前
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
            // 都没有匹配,先将旧节点key缓存起来
            if(!keyMap) {
                for(let i = oldStartIds; i <= oldEndIds; i++) {
                    const key = oldCh[i].key
                    if(key !== undefined) {
                        keyMap[key] = i
                    }
                }
            }
            // 寻找当前这项（newStartIdx在keyMAp中映射的位置序号
            const idxInOld = keyMap([newStartVnode.key])
            if(idxInOld === undefined) { // idxInOld是undefined表示它是全新的项，将
                parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
            } else {
                // 不是全新的项。要移动的
                const elmToMove = oldCh[idxInOld]
                patchVnode(elmToMove, newStartVnode)
                //  将这项设置undefined
                oldCh[idxInOld] = undefined
                parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
            }
            newStartVnode = newCh[++newStartIds]
        }
    }
    // 没有命中查找规则
    if(newStartIds <= newEndIds) { // 老节点结束了，新节点没有
        // const before = newCh[newEndIds+1] === null ? null : newCh[newEndIds+1] // 拿到标杆4
        for(let i = newStartIds; i <= newEndIds; i++) {
            parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIds].elm)
        }
    } else if(oldStartIds <= oldEndIds) { // 说明老节点有剩余节点没有处理
        for(let i = oldStartIds; i <= oldEndIds; i++) {
            if(oldCh[i]) {
                parentElm.removeChild(oldCh[i].elm)
            }
        }
    }

}

function checkSameVNode(a, b) {
    return a.sel === b.sel && a.key === b.key
}