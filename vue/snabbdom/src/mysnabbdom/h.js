import vnode from './vnode'

//  h('ul', {}, [
//   h('li', {}, '苹果'),
//   h('li', {}, h('div', {}, '我是香蕉')),
// ])
// 函数重载：多个函数名字相同，但是形参列表不同，返回值类型也可能不同
export default function (sel, data, c) {
  if(arguments.length < 3) {
    alert('参数必须为3个')
    return
  }
   if(typeof c === 'string' || typeof c === 'number') {
     return vnode(sel, data, undefined, c, undefined)
   } else if(Array.isArray(c)) {
    let children = []
    for(let i = 0; i < c.length; i++) {
      if(typeof c[i] === 'object' && !c[i].hasOwnProperty('sel')) {
        throw new Error('传入的数组参数中有一项不是h函数')
      }
      children.push(c[i])
    }
    return vnode(sel, data, children, undefined, undefined)
   } else if(typeof c === 'object' && c.hasOwnProperty('sel')) {
    const children = [c]
    return vnode(sel, data, children, undefined, undefined)
   } else {
     throw new Error('传入的第三个参数类型不对')
   }
}