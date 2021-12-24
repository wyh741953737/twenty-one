


### vue内部执行过程

1：调用Vue构造函数，传入的options保存起来
2：Vue函数内，对数据进行响应式处理observe函数，对数据进行代理proxy函数，之后执行编译函数Compile
3：oberve函数会实例化一个Observer对象
4：Observer就是遍历做响应式处理
5：defineReactive内部，会创建Dep实例，在你访问的时候进行依赖收集，触发值修改的时候会触发通知
6：Compile函数内部会遍历子节点，触发对应的操作，同时会有一个update方法，外部调用这个方法进行初始化和更新
7：Watcher监听器，负责依赖的更新，

创建实例：会有几个Observer， Dep， Watcher