let Vue

// 将用户传入的路径格式化
function createRouteMap (routes, oldPathListlist, oldPathMap) {
  let pathList = oldPathListlist || []
  let pathMap = oldPathMap || Object.create(null)
  routes.forEach(route => {
    addRouteRecord(route, pathList, pathMap)
  })
  return { pathList, pathMap }
}

function addRouteRecord(route, pathList, pathMap, parent) {
  let path = parent ? `${parent.path}/${route.path}` : route.path
  let record = {
    path,
    parent,
    component: route.component
  }
  if(!pathMap[path]) {
    pathList.push(path)
    pathMap[path] = record
  }
  if(route.children) {
    route.children.forEach(child => {
      createRouteMap(child, pathList, pathMap, record)
    })
  }
}
function createMatcher(routes) { // 扁平化路由映射表
  const { pathList, pathMap } = createRouteMap(routes) // [/./about,/about/a] 还会创建一个映射表{/:组件A，/about:组件B}
  
  function addRoutes (routes) { // 动态添加路由的方法
    createRouteMap(routes, pathList, pathMap)
  }
  function match (location) {
    // 找到当前路径对应的记录，并产生一个匹配数组
    if(pathMap[location]) {
      return createRoute(pathMap[location], {
        path: location
      })
    }
    return createRoute(null, {path: location})

  }
  return { addRoutes, match }
}

class VueRouter {
  constructor(options) {
    // 将用户传递的routes转化成好维护的结构

    this.matcher = createMatcher(options.routes)
    // 创建路由系统
    this.mode = options.mode || 'hash'
    // new HashGistory
    this.history = new HashHistory(this)

  }
  init(app) { // app 是vue根实例
    // 先根据当前路径，显示指定的组件
    const history = this.history
    const setupHashListener = () => {
      history.setupListener()
    }
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener
    ) // 去到路径后要监听路径变化
    // 发布订阅，更改视图
    history.listen((route) => {
      app._route = route
    })
  }
  match(location) {
    return this.matcher.match(location)
  }
  push () {

  }
  replace () {

  }
}
// 安装插件
VueRouter.install = (_vue) => {
  Vue = _vue
  Vue.mixin({ // 通过vue混入
    beforeCreate() { // 组件的生命周期和混入的这个生命周期依次执行,深度优先
      // 如果当前组件有router说明是根组件
      if(this.$options.router) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this) // 初始化操作
        // 路由变了，视图也要变,这个比较关键
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    },
  })
  Object.defineProperty(Vue.prototype, '$route', { // 都是属性
    get() {
      return this._routerRoot._route
    }
  })
  Object.defineProperty(Vue.prototype, '$router', { // 都是方法
    get() {
      return this._routerRoot._router
    }
  })
  Vue.component('RouterView', RouterView)
}

function ensureSlash() {
  if(window.location.hash) return
  window.location.hash = '/'
}
class HashHistory extends History {
  constructor(router) {
    super(router)
    ensureSlash() // 确保有'/',没有自动加上
  }
  getCurrentLocation () {
    return window.location.hash.slice(1)
  }
  setupListener() {
    window.addEventListener('hashchange', () => {
      this.transitionTo(window.location.hash.slice(1))
    })
  }
}
function createRoute(record, location) {
  let res = []
  if(record) { // record={path: /about/a, component: xxx, parent}
    while(record) {
      res.unshift(record)
      record = record.parent  
    }
  }
  return {
    ...location,
    matched: res
  }
}
class History {
  constructor(router) { // router 通过new Router出来的router实例
    this.router = router
    // 默认路由中应该保存一个当前的路径，后序会更改这个路径
    this.current = createRoute(null, {
      path: '/'
    })
  }
  // 跳转的核心逻辑，location代表要跳转的路径，onComplate是成功后的回调
  transitionTo(location, onComplate) {
    // 根据路径表匹配 /about/a => {path: '/about/a', matched: [about aboutA]}
    let route = this.router.match(location) // 根据当前路径找到对应的记录
    // 新路径覆盖current,相同路径不跳转
    if(this.current.path === location && route.matched.length === this.current.matched.length) return
    this.updateRoute(route)
    onComplate && onComplate()
  }
  updateRoute (route) {
    this.current = route
    this.cb && this.cb(route) // 路径变化会将最新的路径传给listen方法
  }
  listen(cb) {
    this.cb = cb
  }
}

const RouterView = {
  functional: true,
  render(h, { parent, data }) {
    let route = parent.$route
    let matched = route.matched
    data.routerView = true // 当前组件是router-view
    let depth = 0
    while(parent) {
      if(parent.$vnode && parent.$vnode.data.routerView) {
        depth++
      }
      parent = parent.$parent
    }
    let record = matched[depth]
    if(!record) {
      return h()
    }
    let component = record.component
    return h(component, data)

  }
}
export default VueRouter