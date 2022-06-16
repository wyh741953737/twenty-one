import vnode from './vnode'

//  h('ul', {}, [
//   h('li', {}, '苹果'),
//   h('li', {}, h('div', {}, '我是香蕉')),
// ])
// 函数重载
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
   } else {
     throw new Error('传入的第三个参数类型不对')
   }
}