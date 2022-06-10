import vnode from './vnode'

// h('div')
// h('div', '文字')
// h('div', {}, [])
// h('div', {}, [
  // h('li', '苹果'),
  // h('li', '榴莲'),
  // h('li', '西瓜'),
  // h('li', '香蕉'),
// ])
// h('div', [])
// 函数重载
export default function (sel, data, c) {
  console.log(c)
   if(typeof c === 'string' || typeof c === 'number') {
     return vnode(sel, data, undefined, c, undefined)
   } else if(Array.isArray(c)) {
    for(let i = 0; i < c.length; c++) {
      let children = []
      if(typeof c[i] === 'object' && c[i].hasOwnProperty('sel')) {
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