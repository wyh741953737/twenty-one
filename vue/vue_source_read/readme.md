###
Vue数组实现响应式原理：
- 1：以数组的原型为对象，创造一个对象
- 2：通过Object.definProperty，给这个对象添加改变数组的7个方法
- 3：push,unshift都会有添加的参数，splice(index, num, add)拿到第三个参数是要插入的参数，对这个参数也进行响应式处理
- 4：当你调用其中的7个方法，就会触发notify去通知修改

const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
const methodsToPatch = [ 'push',  'pop', 'shift', 'unshift',  'splice',  'sort',  'reverse'];

methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    const args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    const result = original.apply(this, args);
    const ob = this.__ob__;
    const inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

### 生命周期
初始化生命周期，事件，render beforeCreate， 初始化injections，statte，provide，created
initLifecycle
initEvents
initRender
callHook(vm, 'beforeCreate')
initInjections(vm)
initState
initProvide
callHook(vm, 'created')

initLifecycle: {
  给vm挂载一些属性： 
  vm.$parent = parent
  vm.$root = parent ？ parent.$root : vm
  vm.$children = []
  vm.$refs = {}
  vm._watcher = null
  vm._inactive = null
  vm._directInactive = false
  vm._isMounted = false
  vm._isDestoryed = false
  vm._isBeingDestoryed = fasle
}
initEvents: {
  vm._events=Object.create(null)
  vm._hasHookEvent = false
}
initRender {
  vm._vnode = null
  vm._staticTrees = null
  vm.$slots = resolveSlots(options._renderChildren, renderContext)
  vm.$createElement = function(a,b,c,d) { return createElement(vm, a,b,c,d)}
  defineReactive$$1(vm, '$attrs', )
}
initInjection {

}
initState {
  vm._watchers = []
  observe(data)
  实例化Observe对象
}

### 执行new Vue({ render: h=> h(App)}).$mount('#app')之后
starts上面有很多属性：生命周期，components，computed， data， injects，el, filetes, methods, props,directives,watch, provide等
options上的components有keepAlive, Transition, TransitionGroup

1：Vue函数内部执行this._init(options), 此时options上只有render
2：initMixin内部给Vue挂载了_init函数
3：_init内部给vm加了_uid=uid$3++,_isVue=true
4: 初始化时，options上面只有render，就会执行mergeOptions将options和vm.constructor合并后，赋值给vm.$optons
5：vm.constructor上的options有：components，filters，directives，_base
6: 执行resolveConstructorOptions(vm.constructor)之后，就会得到parent: {components, filters, directives, _base}
7: 执行mergeOptions(parent, child, vm) child只有render
8：mergeOptions内部规范化props，inject，directives
9：之后遍历parent和child，执行mergeField去合并options，
10：strats会调用mergeAssets得到对象
11： vm.$options = {components: {}, directives: {},filters: {}, render: f，_base: f }
12: 此时vm上有$opions, _isVue, _uid
13: 初始化代理initProxy
14: vm._self = vm
15: 初始化生命周期initLifeCycle(vm)
16：初始化事件initEvents(vm)
17: 初始化render函数initRender
18： 执行callHook(vm, 'beforeCreate'), beforeCreate hook
19: 初始化injection，
20： 初始化state(props, methods, data, computed, watch)

new Vue() => _init() => $mount() => mountComponent => new Watcher() => updateComponent => render() => _update()


### vue异步更新是如何实现的
Quque， 不马上做，放在队列中
批量异步执行：

事件循环：浏览器为了协调事件处理，脚本执行，网络请求和渲染等任务和制定的机制
宏任务：浏览器完成一个宏任务，在下一个宏任务执行开始前会对页面进行重新渲染，主要包括：创建文档对象，解析HTML，执行主线程代码以及各种页面加载插入，网络事件，定时器等
微任务：当前宏任务执行结束后立即执行的任务，如果存在微任务，浏览器会清空微任务之后再重新渲染，比如promie，requestAnimationFrame，DOM变化等待

vue中使用nextTick
异步：只要侦听到数据变化，Vue将开启一个队列，并缓冲在同一事件循环中发生的所有数据的变更
批量：如果同一个watcher被触发多次，只会被推入到队列中一次，在下一个事件循环tick中，Vue刷新队列执行实际工作
异步策略：Vue在内部尝试promise.then,
watcher往队列里面添加，