import "./public-path";
import React from "react";
import ReactDOM from "react-dom";
import RouterConfig from "./router";

function render(props) {
  const { container, info, routerBase } = props;
  ReactDOM.render(
    <React.StrictMode>
      <RouterConfig info={info} routerBase={routerBase} />
    </React.StrictMode>,
    // 为了避免根 id #root 与其他的 DOM 冲突，需要限制查找范围。
    container
      ? container.querySelector("#root")
      : document.querySelector("#root")
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap(props) {}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  render(props);
  // 获取主应用中传递的全局参数
  props.onGlobalStateChange((state, prev) => {
    console.log("主应用: 变更前");
    console.log(prev);
    console.log("主应用: 变更后");
    console.log(state);
  });

  // 更改主应用中传递的全局参数
  props.setGlobalState({ name: "sub-react" });
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector("#root")
      : document.querySelector("#root")
  );
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log("update props", props);
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
