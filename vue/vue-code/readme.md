


### vue内部执行过程
Observer就是遍历做响应式处理
defineReactive内部，会创建Dep实例，在你访问的时候进行依赖收集，触发值修改的时候会触发通知
Compile函数内部会遍历子节点，触发对应的操作，同时会有一个update方法，外部调用这个方法进行初始化和更新
Watcher监听器，负责依赖的更新

创建实例：会有几个Observer， Dep， Watcher

### 组件化
任意类型应用界面都可以抽象为一个组件树，组件化能提高开发效率，方便重复使用，简化调试步骤，提升项目可维护性，便于多人协同开发
### 组件之间通信
props, eventBus, VueX, 自定义事件：边界情况：$parent, $children, $root, $refs, provide/inject, 非props特性：$attr, $listeners

###
Observer执行数据响应化，
compile：编译模板，初始化视图，收集依赖
Watcher：执行更新函数(更新dom）
Dep：管理多个Watcher，批量更新

new Vue首先执行初始化，对data执行响应式处理，这个过程发生在Observer中
同时对模板执行编译，找到其中动态绑定的数据，从data中获取并初始化视图，这个过程发生在compile中
同时定义一个更新函数和Watcher， 将来对应数据变化时，Watcher会调用更新函数，
由于data的某个key在一个视图中可能出现多次，所以每个key都需要一个管家Dep来管理多个Watcher
将来data中数据发生变化，会先找到对应的Dep（调度中心），通知所有Watcher执行更新函数

###
const app = new Vue({
  el: '#app',
  template: '<div>template</div>',
  render(h) {return h('div', 'render')}
})
优先级：render > template > el
使用template时候要手动执行$mount去挂载

### 为什么Observer里声明Dep？
Object里面新增或者删除属性，array中有变更方法
defineReactive中也声明了dep，这里的dep和key一一对应

### vue2响应式缺点
1：递归遍历，性能受到影响，api不统一
### Vue中的异步
只要侦听到数据变化，Vue将开启一个队列，并缓冲同一事件循环中发生的所有数据变更
批量：如果同一个Watcher被多次出发，只会被推入到队列中一次，然后在下一个事件循环tick中，vue刷新队列执行实际工作
异步策略：Vue在内部对异步队列尝试使用原生的Promise.then, MutationObserver和SetImmediate，如果环境不支持就会使用setTimeout代替

###
Observer中，每个key对应一个Dep，每个Dep有多个Watcher，当key发生改变，找到对应的Dep，执行里面的Watchers的更新函数
defineReactive中也声明了dep,每个对象会执行defineReactive$$1,里面会实例化dep
### Dep，Watcher， Observe怎么建立关联
1：在DefineReactive中，每个key都和Dep会建立一对一的关联，
2：在Watcher中，将当前watcher实例赋值为Dep.target，然后读取Watcher中对应的key，就会触发defineReactive中get方法，
  如果Dep.target有值，执行dep.depend将Dep.target(也就是Watcher实例添加到Dep中)，实现Dep和watcher一对多的关系
  当对key执行赋值操作时，会触发defineReactive中的set方法，在set方法中会执行dep.notify通知更新,这里只通知和Dep相关的watcher更新

  Watcher什么时候触发？？

  如何保证Dep.target只添加一次？？
  Watcher创建的时候，只执行一次，之后赋值为null，在get的时候，需要Dep.target存在，才会执行dep.depend添加watcher进去

  初始化的时候呢？
  初始化的时候会创建一个watcher，dep挂到window，dep是在defineReactive中创建的，在get函数内部引用了dep.depend
  方法，形成闭包，dep不会被释放

new的时候就做了几件事：1：Observer劫持监听所有属性，2：代理， 3：创建Compile解析指令
compile里面循环，如果是元素会判断有没有指令，有就去执行指令对应的方法，比如text，内部会执行update，
update内执行2件事：1：初始化，将{{}}变成具体的值， fn && fn(node, this.$vm[exp]) this.$vm[exp]虽然会get一下，但是这个之后还没有Watcher实例（也就是Dep.target没有值），所以第一次get的时候，那里面的东西是undefined，所以第一次触发没有，第二次就有
                   2：执行new Watcher(this.$vm, exp, function(v) { fn && fn(node, val)})
                   Watcher内部会给Dep.target赋值，并且读取key，就会触发dep对应watcher的添加，所以第二次get的时候有值了
      vue1.0的问题是：当key越来越多，watcher就大量创建，一个组件一个虚拟dom对应，量大就崩了
      2.0抽取出来一个虚拟dom，每个组件一个Watcher，不管哪个key发生变化，值通知一个Watcher。
      那问题来了，Watcher执行更新时候，怎么知道界面哪个key发生变化呢，这就是虚拟dom不得不引进来的必要因素？引入虚拟dom是和Watcher内部调整有很大关系，不是随便引进的，也不是看react虚拟dom好
      根据值计算出一个新的虚拟dom，和老的比较，得到差值，
比如动态的给obj通过$set一个属性进去，怎样去通知更新？？找到obj上面的dep去通知
### diff规则
比较两个vNode，包括三种类型操作：属性更新，文本更新，子节点更新
1：新老节点都有children子节点，则对子节点进行diff操作，调用updateChildren
2：如果老节点没有子节点，新节点有，先清空老节点文本内容，为其新增子节点
3：新节点没有子节点，老节点有，移除该节点的所有子节点
4：当新老节点都没有子节点，只是文本的替换

### vue异步更新是如何实现的
Queue， 不马上做，放在队列中 批量异步执行：

事件循环：浏览器为了协调事件处理，脚本执行，网络请求和渲染等任务和制定的机制
宏任务：浏览器完成一个宏任务，在下一个宏任务执行开始前会对页面进行重新渲染，主要包括：创建文档对象，解析HTML，执行主线程代码以及各种页面加载插入，网络事件，定时器等
微任务：当前宏任务执行结束后立即执行的任务，如果有微任务，浏览器会清空微任务后再重新渲染，比如promise，requestAnimationFrame，DOM变化(操作dom）等

vue中使用nextTick
异步：只要侦听到数据变化，Vue将开启一个队列，并缓冲在同一事件循环中发生的所有数据的变更
批量：如果同一个watcher被触发多次，只会被推入到队列中一次，在下一个事件循环tick中，Vue刷新队列执行实际工作
异步策略：Vue在内部尝试promise.then,
watcher往队列里面添加，
操作dom是微任务，发生在浏览器刷新之前，数据变了，界面还没变，所以你的通过nextTick去拿到改变后的值

优化optimize
优化器：在AST中找出静态子树并打上标记，静态子树是在AST中永远不变的节点，比如纯文本节点
标记静态字树的好处：每次重新渲染，不需要为静态子树创建新节点，虚拟DOM中patch时，可以跳过静态子树（isStatic，比如:必须嵌套<p>hello<span>test</span></p>）

initState内部
1） 执行initData(vm) { data = getData(data) {pushTarget() return data.call(vm,vm)}}
data=mergedInstanceDataFn() {}
  Object.keys(data) => {
  proxy(vm, "_data", key)
  observe(data, true) {
    如果data有_ob_说明做过双向绑定， ob=data.__ob__
    否则：ob=new Observer(data)
    Observer(data) {
      this.dep = new Dep() 第一次给{str, obj:{a:'A',b:'B'}}注册Dep，第二次给{a: 'A', b: 'B'}注册Dep
      给data定义__ob__
      区分对象或者数组
      对每个key执行defineReactive，遍历。。this.walk
    }
    defineReactive{
      const dep = new Dep() 第一次给str: '你好啊'， 第二次obj对象obj: {a: 'A', b: 'B'}，第三次a: 'A'
      childOb = !isShallow && observe('你好啊'), 第二次执行observe({a:'A',b:'B'}) 又去了Observe
      Object.defineProperty(obj, key, { 给{a:'A',b:'B'}定义
        get: () {
          执行getter得到value，如果Dep.target又值，dep.append添加依赖， 如果childOb有值，给子值添加依赖
        }
      })
    }

### 
vue2生命周期：
进行一些初始化，比如initProxy，initLifecycle(主要是给vm加一些生命周期相关的属性)，initEvents，initRenders（vm上挂载_c也就是createElement函数）

- callHook(vm, 'beforeCreate')
如果有data，initData（给vm通过proxy添加_data，将data中的变量通过Object.defineProperty定义到vm._data身上））然后执行observe(一个对象就会实例化一个Observer实例)开始响应式处理
  ob = new Observer()
  ob.value = value
  ob.dep = new Dep() // Dep () {this.id=uid++; this.subs = []} Dep上有addSub，removeSub，depend,notify通知更新
  def(value, '__ob__', this)
  判读数组还是对象开始响应式处理
  对象：遍历，defineReactive$$1(obj, keys[i])
    defineReactive$$1：dep = new Dep(), 
      Object.defineProperty(obj, key, {
        get: reactiveGetter() => { 先得到value，判断Dep.target是否有值，有值dep.depend()//依赖收集，如果有儿子，childObj.dep.depend(),如果值是数组，dependArray}})
        set: reactiveSetter() => { 先得到value，递归儿子响应式处理，dep.notify()}
如果有watch，initWatch（vm.$watch）
vue.prototype.$watch = (expOrFn, cb, options) => {
 const watcher = new Watcher(vm, expOrFn, cb, options)
} 
const Watcher = (vm, expOrFn, cb, options) => {
  vm._watchers.push(this)
}
watcher.prototype.get = function() {
  pushTarget(this)
}

initProvide(vm)

- callHook(vm, 'created')
vm.$mount(vm.$options.el)
Vue.prototype.$mount = function(el, hydrating) {
  el = el && query(el)
  template = getOuterHtml(el)
  mountComponent(vm, el, hydrating)
}
mountComponent(vm, el, hydrating) {
  callHook(vm, 'beforeMount')
  updateComponent = function() { vm._update(vm._render(), hydrating)}
  new Watcher(vm, updateComponent, noop, {before: function before () {
    if(vm.isMounted && !vm._isDestoyed) {
 -  callHook(vm, 'beforeUpdate')
    }
  }})
  if(vm.$vnode === null) {
    vm._isMounted = true
-    callHook(vm, 'mounted')
  }
  return vm
}

$el在mounted以后才能被访问，$data在created阶段能被访问到
如果加了keep-alive会多2个：actived,deactived
如果加了keep-alive，第二次或者第N次进入组件只会执行actived一个生命周期
### 在create里执行nextTick(cb)
1：nextTick函数内部将cb回调添加到callback里。
2：if(!pending) { pending = true timerFunc()}
timerFunc内执行Promise.resolve().then(flushCallback)
flushCallback内会将pending=false，遍历callbacks，一个个执行
执行cb.call(),cb改了data中某个数据
会先触发get，赋值的时候触发set，set赋值完后还会dep.notify通知更新
notify：会遍历subs，执行subs[i].update()更新
Watcher.prototype.update会执行queueWatcher函数
queueWatcher内部会拿到Watcher实例的id，判断之前存过没有，如果没，存进去，如果是flushing会queue.splice(i+1,0,watcher)，否则queue.push(watcher)

flushSchedulerQueue() {
  获取时间戳，
  对queue排序
  遍历queue，执行queue[i].run也就是watcher.run()
}