import React from "react";
import ReactDOM from "react-dom/client";
import './App.css';

import {
  registerMicroApps,
  start,
  runAfterFirstMounted,
  addGlobalUncaughtErrorHandler,
  initGlobalState,
} from "qiankun";

import App from "./App";

const render = (porps) => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <App {...porps} />
  );
};

render({ loading: true });

const appStart = () => {
  // 设置子应用首次加载loading效果
  const loader = (loading) => render({ loading });
  const routes = [
    {
      name: "m-vue",
      entry: "//localhost:2000",
      activeRule: "/vue",
      container: "#container",
      loader,
      props: {
        info: "来了",
        routerBase: "/vue", // 给子应用下发的基础路由
      },
    },
  ];

  // 注册子应用
  registerMicroApps(routes, {
    beforeLoad: (app) => {
      console.log("before load app.name=====>>>>>", app.name);
    },
    beforeMount: [
      (app) => {
        console.log("[LifeCycle] before mount %c%s", "color: green;", app.name);
      },
    ],
    afterMount: [
      (app) => {
        console.log("[LifeCycle] after mount %c%s", "color: green;", app.name);
      },
    ],
    afterUnmount: [
      (app) => {
        console.log(
          "[LifeCycle] after unmount %c%s",
          "color: green;",
          app.name
        );
      },
    ],
  });

  start({
    sandbox: {
      // experimentalStyleIsolation: true // 给子应用样式加上div[data-qiankun="m-react"]
      strictStyleIsolation: true // 严格样式隔离，比如子应用vue的html中加了body{red}样式，子应用没有body标签样式不生效
    }
  });

  // 微前端启动进入第一个子应用后回调函数
  runAfterFirstMounted(() => {
    console.log("[MainApp] first app mounted");
  });

  // 添加全局异常捕获
  addGlobalUncaughtErrorHandler((event) => {
    console.error("异常捕获", event);
    const { message } = event;
    const errorApp = [];
    routes.forEach((i) => {
      if (message && message.includes(i.name)) {
        errorApp.splice(0, 1, i);
      }
    });

    // 加载失败时提示
    if (
      message &&
      message.includes("died in status LOADING_SOURCE_CODE") &&
      errorApp.length &&
      window.location.pathname === errorApp[0].activeRule
    ) {
      render(<h1>失败</h1>)
    }
  });

  const initState = {
    AppName: "micro-react-main",
  };
  initGlobalState(initState);
};

const actions = initGlobalState({});
window.__MAIN_GLOBALSTATE_ACTIONS__ = actions;
actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log("[onGlobalStateChange - master]:", state, prev);
});

// 设置路由拦截
const routeIntercept = () => {
  if (window.location.pathname === "/login") {
    window.location.href = "/react";
  } else {
    render(<h1>哈哈哈哈</h1>);
  }
};

// 模拟获取用户登录信息
const getUserInfo = () => {
  return true;
};

// 页面加载判断
if (window.location.pathname === "/") {
  window.location.href = "/react";
} else {
  if (getUserInfo()) {
    routeIntercept();
    appStart();
  } else {
    render(<h1>登陆</h1>);
  }
}
