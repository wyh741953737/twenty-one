


### vue内部执行过程

1：调用Vue构造函数，传入的options保存起来
2：Vue函数内，对数据进行响应式处理observe函数，对数据进行代理proxy函数，之后执行编译函数Compile
3：oberve函数会实例化一个Observer对象
4：Observer就是遍历做响应式处理
5：defineReactive内部，会创建Dep实例，在你访问的时候进行依赖收集，触发值修改的时候会触发通知
6：Compile函数内部会遍历子节点，触发对应的操作，同时会有一个update方法，外部调用这个方法进行初始化和更新
7：Watcher监听器，负责依赖的更新，

创建实例：会有几个Observer， Dep， Watcher

### 组件化
任意类型应用界面都可以抽象为一个祖建树，组件化能提高开发效率，方便重复使用，简化调试步骤，提升项目可维护性，便于多人协同开发
### 组件之间通信
props, eventBus, vuex, 自定义事件：边界情况：$parent, $children, $root, $refs, provide/inject, 非props特性：$attr, $listeners
### MVVM
三要素：数据响应式：监听数据变化并在视图中更新（Object.defineProperty，Proxy），模板引擎（提供描述视图的模板语法:插值{{}}， 指令v-bind，v-on... ）以及渲染（如何将模板转换成html：模板=》vdom=》dom）

### 
Observer劫持监听所有属性，通知变化=》Dep
Compile：订阅数据变化，绑定更新函数 =》 Watcher

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