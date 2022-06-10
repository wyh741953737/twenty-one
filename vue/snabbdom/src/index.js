import h from './mysnabbdom/h'

const myVnode = h('ul', {}, [
  h('li', {}, '苹果'),
  h('li', {}, h('div', {}, '我是香蕉')),
])
console.log('----', myVnode)
