### Redux目的
随着单页应用开发日趋复杂，js需要管理更多的state，这些state可能包括服务器响应，缓存数据，本地生成持久化到服务器的数据，也包括UI状态等。
管理不断变化的state非常麻烦，如果一个model的变化会引起另一个model变化，那么当view变化时，可能引起对应model以及另一个model的变化，另一个model会引起另一个view的变化，所以就产生混乱
redux就是用来解决这个问题的。

### Redux三大核心
1：单一数据源，整个应用state被存储在一个object tree，并且bject tree存在于唯一store中。
2：state是只读的，唯一触发state的方法就是触发action，action是一个用于描述已发生事件的普通对象，确保视图和网络请求都不能直接修改state，只是表达想要修改的意图，所有修改都集中化处理，
3：使用纯函数执行修改，纯函数可以保证复用性。为了描述action如何修改state tree，你需要编写reducers，reducers是纯函数，接受先前的state和action，并返回新的state。
action：将数据从应用传到store的载体，它是store唯一来源，一般来说，我们可以通过store.dispatch将action传给store

### 严格的单向数据流是redux架构的设计核心
