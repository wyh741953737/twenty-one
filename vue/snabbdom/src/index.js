// import h from './mysnabbdom/h'

// const myVnode = h('ul', {}, [
//   h('li', {}, '苹果'),
//   h('li', {}, h('div', {}, '我是香蕉')),
// ])
// console.log('----', myVnode)

import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

const patch = init([classModule, propsModule, styleModule, eventListenersModule]);

const vnode1 = h('ul', {}, [
  h('li', {}, 'A'),
  h('li', {}, 'B'),
  h('li', {}, 'C'),
  h('li', {}, 'D')
])

const vnode2 = h('ul', {}, [
  h('li', {}, 'A'),
  h('li', {}, 'B'),
  h('li', {}, 'C'),
  h('li', {}, 'D'),
  h('li', {}, 'E')
])

const container = document.getElementById('container')
patch(container, vnode1)
btn.onclick = function () {
  patch(vnode1, vnode2)
}