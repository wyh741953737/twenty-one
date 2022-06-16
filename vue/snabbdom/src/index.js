import h from './mysnabbdom/h'
import patch from './mysnabbdom/patch'

const myVnode = h('ul', {}, [
  h('li', {key: 'xi'}, '苹果'),
  h('li', {key: 'zc'}, [h('span', {}, '标签')]),
])
const myVnode2 = h('ul', {}, [
  h('li', {key: 'xi'}, 'xixi'),
  h('li', {key: 'zc'}, 'zichen'),
])
patch(document.getElementById('container'), myVnode)
const btn = document.getElementById('btn')
btn.onclick = function() {
  patch(myVnode, myVnode2)
}

// import {
//   init,
//   classModule,
//   propsModule,
//   styleModule,
//   eventListenersModule,
//   h,
// } from "snabbdom";

// const patch = init([classModule, propsModule, styleModule, eventListenersModule]);

// const vnode1 = h('ul', {}, [
//   h('li', {}, 'A'),
//   h('li', {}, 'B'),
//   h('li', {}, 'C'),
//   h('li', {}, 'D')
// ])

// const vnode2 = h('ul', {}, [
//   h('li', {}, 'A'),
//   h('li', {}, 'B'),
//   h('li', {}, 'C'),
//   h('li', {}, 'D'),
//   h('li', {}, 'E')
// ])

// const container = document.getElementById('container')
// patch(container, vnode1)
// btn.onclick = function () {
//   patch(vnode1, vnode2)
// }