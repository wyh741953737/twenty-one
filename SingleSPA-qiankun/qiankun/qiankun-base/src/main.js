/* eslint-disable */
import Vue from 'vue';
import {
  registerMicroApps,
  start,
  runAfterFirstMounted,
  addGlobalUncaughtErrorHandler,
  initGlobalState
} from 'qiankun';
import App from './App.vue';
import router from './router';

const appStart = () => {
  // 设置子应用首次加载loading效果
  const loader = loading => render({ loading })
  const apps = [
    {
      name: 'reactApp',
      entry: '//localhost:3000',
      activeRule: '/react',
      container: '#sub-app-viewport',
      loader,
      props: {
        info: '来了老弟',
        routerBase: '/react', // 给子应用下发的基础路由
      },
    },
    {
      name: 'vueApp',
      entry: '//localhost:8080',
      activeRule: '/vue',
      container: '#sub-app-viewport',
      loader,
      props: {
        routerBase: '/vue', // 给子应用下发的基础路由
      },
    },
  ]

  // 注册子应用
  registerMicroApps(apps, {
    beforeLoad: (app) => {
      console.log('before load app.name=====>>>>>', app.name)
    },
    beforeMount: [
      (app) => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
      },
    ],
    afterMount: [
      (app) => {
        console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
      },
    ],
    afterUnmount: [
      (app) => {
        console.log(
          '[LifeCycle] after unmount %c%s',
          'color: green;',
          app.name
        )
      },
    ],
  });

  start();

  // 微前端启动进入第一个子应用后回调函数
  runAfterFirstMounted(() => {
    console.log('[MainApp] first app mounted')
  })

  // 添加全局异常捕获
  addGlobalUncaughtErrorHandler((event) => {
    console.error('异常捕获', event)
    const { message } = event
    const errorApp = []
    apps.forEach((i) => {
      if (message && message.includes(i.name)) {
        errorApp.splice(0, 1, i)
      }
    })
    // 加载失败时提示
    if (message) {
      console.log('失败了')
    }
  })

  const initState = {
    AppName: 'micro-react-main',
  }
  initGlobalState(initState)
}

const actions = initGlobalState({})
window.__MAIN_GLOBALSTATE_ACTIONS__ = actions
actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log('[onGlobalStateChange - master]:', state, prev)
})

// 设置路由拦截
const routeIntercept = () => {
  if (window.location.pathname === '/wyh/login') {
    window.location.href = '/wyh/react'
  } else {
    alert('渲染未找到的页面');
  }
};

// 模拟获取用户登录信息
const getUserInfo = () => {
  return true;
}

// 页面加载判断
if (window.location.pathname === '/') {
  window.location.href = '/wyh/react'
} else {
  if (getUserInfo()) {
    routeIntercept()
    appStart()
  } else {
    alert('渲染登陆页面')
  }
}
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
