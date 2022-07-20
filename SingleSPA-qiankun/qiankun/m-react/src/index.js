import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

function render(props) {
  ReactDOM.render(<App />, props.container ? props.container.querySelector('#root') : document.getElementById('root'));
}
if(!window.__POWERED_BY_QIANKUN__) {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(<App />);
}
export async function bootstrap() {}
export async function mount(props) {
  console.log(props)
  render(props)
}
export async function unmount(props) {
  ReactDOM.unmountComponentAtNode(
    props.container ? props.container.querySelector('#root') : document.getElementById('root'),
  );
}

// qiankun中处理样式如何处理？默认情况下切换应用会采用动态样式表，加载的时候添加样式，删除的时候卸载样式
// 这样应用直接的样式就实现了隔离。
// 父子应用如何隔离？？通过BEM规范 -》css-modules动态生成一个前缀div[data-qiankun='m-react']并不是完全隔离 
// =》shadowDOM（增加全局样式就有问题）
// 影子太封闭了，mode设置为open外界才能看到
// let appContent = `<div><div>哈哈</div><style>div{color: red}</style></div>`
// const containerElement = document.createElement('div')
// containerElement.innerHTML = appContent
// const child = containerElement.firstChild
// child.innerHtml = ''
// const shadow = child.attachShadow({mode: 'open'})
// shadow.innerHTML = html
// document.body.appendChild(child)
// =>js沙箱机制，我的应用在切换时可能window会被污染
// 微前端运行原理：1、监视路由变化，2、匹配子应用、3、加载子应用、4、渲染子应用
