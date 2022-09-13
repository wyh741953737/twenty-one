react可以说是目前为止最热门，生态最完善，应用范围最广的前端框架。react结合它的整个生态，它可以横跨web端，移动端，服务器端，乃至VR领域。

一、react生态之——web端 react本身是面向web端的，它很轻便灵活，由于只是MVC架构中视图层。所以要配合生态体系中的其他框架或模块来使用。
1，路由 react的路由：主要react-router。现已v4.1
2，状态管理器 react只是UI层，对于如何管理应用的状态，facebook提出了flux架构，而基于这一架构，react生态陆续出现了redux、react-redux 
蚂蚁金服基于redux, react-router打造了另一个前端框架——dva。 dva简单来讲是对redux方案的集成与拓展，处理了包括项目构建，异步处理、统一请求、错误处理等一系列诸多问题。
3，UI库 蚂蚁金服开源的antD，以及百分点公司开源的bfd-ui。这两个都是企业级的UI库
4,工具: immutable-js是完全独立的一个js库，可使你的react性能提升。css-modules ——css模块化解决方案 React Devtools是fb推出调试工具。提高开发效率。TS ant design就是使用TypeScript来开发的。
5，react项目构建 ：webpack以及 gulp
二、react生态之——移动端 react-native是目前最优秀的非原生开发移动框架，一处开发，多端使用。
三，react生态之——服务器端 react服务器端渲染最出色的：next.js。这是一个基于react可实现服务器和浏览器都能渲染的框架。


实现简单的combineReducers
const combineReducers = (reducers) => { return (state={}, action) => { 
   return Object.keys(reducers).reduce((nextStagte, key) => { nextState[key] = reducers[key](state[key], action) return nextState; }, {}) } }

实现applyMiddleWares
中间件作用：将所有中间件组成一个数组，一次执行 
  function applyMiddleware(...middleware) { 
    return (createStore) { 
      return (reducer, payloadParams, echaner) { 
        const store = createStore(reducer, payloadPrams, echaner); 
        const dispatch = store.dispatch; 
        let chain = [] 
        const middlewareAPI = { getState: store.getState, dispatch: (action) => dispatch(action) } 
        chain = middlewares.map(middleware => middleware(middlewareAPI)) 
        dispatch = compose(...chain)(store.dispatch); 
        return { ...store, dispatch } 
      } 
    } 
  }
applymiddleware(thunk, promise, logger)(createStore)(addReducer,12)

## SPA
单页应用，所以活动局限于一个页面，仅初始化时候加载所有文件，通过react-router实现不同组件在同一页面切换 优点： 1）解决了多页面访问速度慢，提高页面访问速度 2）不刷新页面，通过ajax异步获取，页面显示流畅 3）良好的前后端分离，减轻服务器压力 4）共用一套代码，多端使用 1）初次加载从服务器一次性请求页面，会出现首屏加载慢的问题 不利于SEO，内容都在一个页面，不能用浏览器前进后台

虚拟DOM和真实dom
虚拟DOM: 更新快，无法直接操作dom，元素更新则更新jsx，dom操

React中refs作用，使用的场景
是react引用的简写，其实就是用它可以访问到dom元素一样 使用：选择文本或者媒体播放时，或者与第三方库集成

HOC：复用组件逻辑，常见的有connect   HOC不会修改传入的组件，也不会使用继承来赋值其行为，HOC通过将组件包装在容器中来生成新的组件，HOC是纯函数，没有副作用

高阶组件应用场景： 1）尽量不破坏原有函数，给某个对象添加方法在他执行前调用，把这个方法扩展到原型上扩展原有方法，重写原有方法但是不破坏原有方法 
高阶组件可以看做是装饰器模式在react的实现。ES7中添加了一个decorator的属性，使用@符表示，可以更精简的书写
属性代理：操作props
          refs获取组件实例 <WrappedComponent {this.props} ref={instanceComponent => this.instanceComponent = instanceComponent}>
          抽离state： 通过 { props, 回调函数 } 传递给wrappedComponent组件，通过回调函数获取state
反向继承，继承WrappedComponent除了一些静态方法，组件的生命周期，state，各种function我们都可以得到 const iiHoc = WrappedComponent => class extends WrappedComponent { render() { return super.render(); } }

渲染劫持：就是控制它的render函数 const elementsTree = super.render();
注意: 1)高阶组件不会修改子组件，也不拷贝子组件的行为。高阶组件只是通过组合的方式将子组件包装在容器组件中，是一个无副作用的纯函数 2)静态方法要复制,无论PP还是II的方式，WrappedComponent的静态方法都不会复制，如果要用需要我们单独复制。 3)refs不会传递。 意思就是HOC里指定的ref，并不会传递到子组件，如果你要使用最好写回调函数通过props传下去 4)不要在render方法内部使用高阶组件。react会去比较 NowElement === OldElement, 来决定要不要替换这个elementTree。如果每次返回的结果都不是一个引用，react以为发生了变化，去更替这个组件会导致之前组件的状态丢失。

为什么建议传递给setState的参数是个callBack而不是一个对象

### createElement何cloneElement区别
### React中constructor作用
constructor是类中必须有的，如果没有显示声明会自动添加，通过new生成实例时自动调用该方法 在class中继承是使用extends来实现的，子类必须在constructor中调用super，否则创建实例会报错：因为 子类没有自己的this，它只能继承父类的然后加工，super就是将this继承给子类。

浏览器只能识别html， 为什么能识别？ 通过babel编译后就能识别，babel通过调用Rect.createElement这个api，调用ReactDOM.render后实际上穿进去的是一个对象 { $$typeof:Symbol.for(''), 不能用字符串，防止后台传一些注入，攻击的，匹配了$$typeof的其他内容，后台没Symbol type, key: props: }

react中合成事件是什么
合成事件是围绕浏览器原生事件充当跨浏览器包装器的对象，它们将不同浏览器行为合成一个api，确保事件在不同浏览器显示一致的属性

react里面的事件都是通过委托的方式来绑定（不能给字符串添加绑定事件）

React.lazy接受一个函数，这个函数动态调用import（），它必须返回一个promise，
 const OtherComp = React.lazy(() => import('./OtherComp')) 如果模块加载失败它会触发一个错误
context何时用？ 对组件树来说是全局的数据，比如用户登录状态。当前认证的用户，主题
如果你只想避免层层传递数据，可以组件组合
api： 1）React.createContext(defaultValue)，创建一个context对象，只有匹配不到Provider，默认值生效 2）Context.Provider <MyContext.value value={..} /> 多个Provider嵌套使用，里层覆盖外层， 当Provider的value变化，内部所有消费者重新渲染，Provider以及内部consumer不受限shouldComponentUpdate，因此当consumer组件在其祖先组件退出更新情况下也能更新，通过新旧值检测使用<Object.js>相同算法

错误边界
如果类组件定义了static getDerivedStateFromError() 或者componentDidCatch()中任意，那它就变成一个错误边界
错误边界工作方式类似catch，不同在于错误边界只针对react类组件
错误边界只能捕获其子组件错误不能捕获自身错误 从react16起，任何违背错误边界捕获的错误会导致整个react组件树被卸载

ref转发：将ref自动的通过组件传递到子组件的技巧
const FancyButtom = React.forwardFef((props, ref) => ( {props.children} ))
React传递ref给forwardRef内函数作为第二个参数，我们想下转发ref到button当ref挂载完成，ref.current指向button的dom节点
第二个惨ref只在使用React.forwardRef定义组件时存在，常规函数和类组件不接收ref，且props中不存在ref 当你组件库用来forwardRef是一个破坏性改变，不推荐用

高级组件内用ref很有用 ref不是props属性，就像key一样特殊，如果你对HOC添加ref，该ref将引用最外层的容器组件而不是被包裹的组件。意味着不能调用ref.current.focus()这样的方法 我们可以通过React.forwardRef接受一个渲染函数，其接受props和ref参数并返回一个React节点
### redux设计思想和工作流：web应用是一个状态机，视图和状态是一一对应的，所有状态保存在一个对象里
 中间件就是用来增强dispatch的，可以触发异步，中间件触发side Effect副作用，Store仓库就包括dispatch（派发）， reducer处理器，state状态

redux三大核心：
1）单一数据源：整个应用的state被存在一棵object tree中，并且这个树只存在唯一stroe中 2）state是只读，唯一改变state方法 3）为了描述action如何修改state tree你要编写reducers

reducer函数为什么必须返回一个函数？
因为reducer是纯函数，能保证同样的state必定得到同样的view，正因如此，reducer函数 里面不能改变state，必须返回一个全新的对象，
state -> object tree <=> store

redux组成（4个）
state状态： 1）服务端返回state 2）UI state：当前组件state 3）App state，全局state比如是否请求loaning
action事件
reducer： 1）本质是函数，需要return返回值，这样store才能接收值，store 把action和reducer联系到一起的对象 主要职责： 1）维持应用的state

store仓库包含dispatch（派发）middleware中间件， reducer处理器， state状态
redux提供了combineReducers方法，用于Reducer的拆分
### redux痛点，吐槽最多的
修改一次数据，太麻烦，dispatch一个action，调用reducer计算，触发回调，更新数据，redux使用最大弊端是样版代码action，reducer太多，修改数据链路太长
为何还要用？redux可以解决跨组件传递数据问题，并且修改数据清晰
### 使用redux有哪些比较好的实践方案？
使用redux-action在初始化reducer，action构造器减少样板代码，减少创建action写一堆固定方法：()=>({type:xxx})  ===> createAction('xxx', payload=>payload)
减少创建reducer写一堆固定switch ===> handleAction({}), 使用cli工具比如：youman 生成模板
### 为什么redux不能处理异步
dispatch默认只能就收一个Object类型的action，不可以是其它类型，因为reducer里面要接收action.type处理不同数据
- react-redux
  redux实现了发布，react-redux实现订阅mapStateToProps是订阅state，Provider就是通过react的contextAPI将数据向下传递
react-redux能让你的react组件从redux store中很方便的读取数据，并向store中分发action来更新数据
重要成员：react这个ui框架是以组件进行驱动的 1）Provider：能让整个app都能获取store中的数据（维护store） 2）connect：让组件和store关联
provider接受store作为props，通过context往下传递，这样react中任何组件都可以通过conntext获取stor。容器组件可能要很深的层级，防止了一层层传递。 原理：react中的context
connect：providr内部组件要用state就要用connect封装（加强） connect方便组件获取store中的state（内部实现：高阶组件）

- connect让组件和全局关联起来
- 高阶组件，接收Provider传递过来的store对象，订阅store中数据，如果store数据改变会调用setState触发组件更新
组件A---触发Action发送----reducer进行接收 ----》store全局状态管理容器 《=》Provider | mapStateToProps
Generator是生成器，如果函数加了*，他就会变成一个生成器函数， 运行后会返回一个迭代器对象 yeild会暂停执行，并会将yeild后面的表达式的值作为对象的value

- redux-saga
异步：中间件 redux-saga用了es6中generator API：createSagaMiddleware(options)创建一个redux middle，并将Saga连接到Redux Store， middleware.run(saga, ...args) 动态运行saga，只能在applymidle之后运用

1）从redux-saga中引入createSagaMiddleware 2) const sagaMiddle = createSagaMiddleware(); 3) let store = applyMiddleware(sagaMiddleware)(createStore)(reducer);科里化 4) sagaMiddleware.run(rootSaga)//负责执行saga

saga辅助函数： 1）takeyEvery: 监听对应的action，每次diapatch都会触发。 2）takeLatest：监听对应的action，只会触发最后一次dispatch(取消正在运行的) 3）throttle(ms, pattern, saga,...args) 监听action，又叫节流阀（节流相同时间内只会触发一次）匹配到action后去执行，并且接收一个action（正在执行的后面的一个）放在buffer，n秒内就不执行异步任务了

Effect创建器： 1）take(patern) 阻塞方法，匹配触发的action 2）put：非阻塞，命令middleware向Store发送dispatch 3）call(fn,...args) 命令middleware以参数args调用函数fn 4）fork(fn, ...args)命令middleware以非阻塞调用形式执行fn 5）jion(task)等待之前的分叉结果 6）cancel(task)取消之前的一个分叉任务 7）select(selector,...args)获取redux中state，如果select参数空的，那effect会获得完整的state

Effect组合器： 1）race(effects): 用来命令middleware在多个effect间竞赛race，其中一个完成，另一个默认取消 2）all([...effects])：用来命令middleware并行运行多个effect，并等待他们全部完成

- redux-thunk中间件
核心对象：Provider容器组件,connect高阶组件
连接react和redux的中间件，本质是一个函数，可以访问请求对象和响应函数，可以对请求进行拦截，处理后再将控制权向下传递，也可以终止请求。
redux借鉴这种思想，中间件是运行在action发送出去后，达到reducer之间的一段代码 action-》middleware-》reducer，这种机制可以让我们改变数据流，实现异步action，action过滤，异常报告等
异步操作至少要发送2个action：用户触发第一个action，这个跟同步一样，如何在第一个action结束后才自动发送第二个action？ 奥秒就在action creator中

fetchPosts生成器返回一个函数，函数执行，先发出一个action表示操作要开始，然后进行异步操作 拿到结果先转成json，异步结束后再发出一个action表示要结束
store.dispatch(fetchPosts('react js')); store.dispatch(fetchPosts('reactjs')).then(() => ...)
这样，解决了第二个action的问题，但是，Action是由store.dispatch发送的 正常情况下，store.dispatch参数是对象，不能是函数，这样就要用中间件redux-thunk createStore(reducer, applyMiddleware(thunk)) 改造后，store的dispatch可以接受函数作为参数 因此异步操作的第一种解决反案就是写出一个返回函数的Action creator，然后用redux-thunk中间件改造store.dispatch

### 路由
react路由2中方式： 1）hashReouter，利用hash实现路由切换 2）BrowserRouter利用h5 APi实现路由切换
只要用了路由就会有 1）history: go, goback,goforward,push,replace,length,loaction,
                  2）location:pathname,search, hash, 
                  3)isMatch: isExact, params, path,url
MVC
model-view-control 1）对dom操作代价很大 2）程序运行缓慢并且效率低 3）内存浪费严重 4）由于循环依赖性，组件模型需要围绕models和views进行创建

### React中key的作用
key用于识别唯一的虚拟dom元素,他们通过回收dom中当前所有元素来帮助react优化渲染，必须唯一，react只是重排而不是重新渲染他们，这可以提高性能

React16之前，react渲染机制遵循同步渲染，期间每个函数输入输出都是可测的但是，从React16开始，渲染机制改变，这个新方法就是 Async render
预废弃的函数都发生在虚拟DOM的构建期间，也就是render之前，react中的调度机制可能会不定期的去查看有没有更高级的任务，如果有就打断当前执行的函数，哪怕执行了一半，等高优先级执行完，再回来重新执行被打断的周期，这种机制让现存的周期函数调用时机复杂不可预测，这也就是为什么UNSAFE_
由于组件的props改变从而引发state改变，这个state就是derived state， 
static getDerivedStateFromProps是个纯函数，没有副作用
getDerivedStateFromProps在条件限制：ifelse下调用setState，如果不设条件setState，这个函数超高的调用频率，不停地setState，会导致频繁的重绘，即可能产生性能问题也容易产生bug

子组件没有state（state意味着组件可以通过setState来控制自身的渲染它的一切行为完全由父组件决定，因此是可控制的 连onChange事件都要父亲代劳的
非受控组件：子组件有内部的state，不受父组件控制，

函数组件和类组件 1）加载props方式不同，2）函数组件比较简单，内部无法维护状态，class可通过setState方法更新state 3）class组件内部可以定义更多的方法在实例上，但函数式组件无法定义 4）函数组件比类性能要高，因为类组件使用的时候要实例化。 5）函数组件没有this，生命周期，状态

getSnapshotBeforeUpdate是在render之后触发的，它的要点在于触发时，DOM还没有更新，开发者可以做一些事，返回值将会作为第三个参数传递给接下来要触发的componentDidUpdate componentWillUpdate触发时，DOM同样没有更新， 最大不同触发时机，componentWillUpdate在更新阶段render之前触发 使用场景是一样的，在beforeUpdate中记录旧的dom信息作为snapshot

componentDidMount在render阶段触发一次，ajax调用可以放到这也可以setState，但是会额外触发一次render，但render都发生在浏览器更新屏幕之前，用户不会感受到state连续改变引发的跳屏，但可能影响性能
componentDidUpdate(prevProps, prevState, snapshot)如果在这里setState应该设置前置条件否则陷入无限循环 setState同样会触发额外渲染，预componentDidMount类似

为何stack不能中断，fiber可以
Fiber：commit还是同步的，不允许被打断，为了配合这次重构，协调阶段的生命周期也发生了变化。

Stack Reconciler：递归遍历所有虚拟DOM阶段，进行diff，一旦开始，无法中断（无法仅通过被中断节点的引用恢复递归现场)，要等整颗VDOM计算完才会释放主线程，渲染和js引擎互斥，diff过程中动画等周期性任务无法得到处理，就会出现卡顿即掉帧，影响用户体验，

React16采用增量渲染即异步渲染来解决掉帧，将渲染任务拆分为更小的任务，每次只做一个小任务， 做完后将时间控制权交给主线程去执行优先级更高的任务（动画，交互等），而不像之前那样长时间占用。目前官方建议直接采用requestIdleCallback来降低某个可能耗时操作的优先级

react自始至终管理者三种东西： 1）root，根，有个属性指向current树，有一个属性指向workInprogress树。 2）current树，树上每个节点都是fiber节点，每个节点保存的是上一次的状态，每个fiber节点对应jsx节点 3）workInProgress树，保存的是本次更新的状态

初次渲染时候，没有current树和上一次的状态，react一开始创建root时，会创建一个未初始化的fiber current指向uninitialFiber，因为react需要上次状态和本次状态对比更新，而未初始fiber上属性都是null。 第一次是：workInProgress和uninitialFiber对比。

react主要分2个阶段： 1）render阶段：创建fiber的过程 为每个阶段创建workInProgress，也有可能是复用之前fiber，生成一个新的workInProgress树。 2：初次渲染的时候（或创建了某个节点的时）会将这个fiber创建真实的dom实例（createElement创建真实dom）。 只是创建，还没有向页面上插入。并且对当前节点的子节点进行插入（appendChild）。 3：如果不是初次渲染，就对比新旧fiber的状态，将产生了更新的节点，通过链表的方式，挂载到rootFiber上。
2）commit阶段：才是真正要操作页面的阶段。 1：执行生命周期 2：会从RootFiber上获取到链表，根据链表上的标识来操作页面。

Fiber数据结构： stateNode：保存与fiber关联的localState type： 类组件：构造函数， dom元素： html标识 tag：定义fiber类型。Reconciler通过它来确定需要完成哪些工作，函数：0 ， 类：1， host：5 updateQueue： state更新，回调以及DOM更新的队列 memolizedState: 缓存的之前组件state对象，便于恢复 memolizedProps： 缓存的之前组件props对象，便于恢复 penddingProps：子组件或者dom中要改变的props（当前处理过程中的组件props对象）新进来的props key： 唯一标识，用于更快的找出哪些节点增删改 return： 当前fiber的父级fiber sibling：大弟弟 child：大儿子 index effectTag：React中Dom节点state和props的改变导致视图改变的操作称为side effect，effectTag就是记录这种操作，二 nextEffect firstEffect: lastEffect: expriationTime:本质上是优先级 alternate：连接current和workIProgress双向连接 updateQueue： 当前fiber的新的状态，比如调2次setState({num: 3}) setState({num :6}),以链表形式先挂3，再挂6，保存新状态的链表 1：找fiber 2：创建更新 3：吧更新放到updateQueue上面

fiber提供了一个叫effect list的数组，包含了需要改变的react element对应的fiber对象（firstEffect， lastEffect） effect list好处是可以快速拿到状态改变的DOM而不必遍历整颗React

一个React组件有current fiber和workInProgress都有一个更新队列：updateQueue，队列中的item的引用是相同的，区别在于workInProgress会从队列中移除更新好的item，因此，workInProgress的updateQueue是currennt fiber UpdateQueue的一个子集 所有更新完成后，workInProgress fiber成为新的current fiber， 如果更新中断或者失败，current fiber可以用来恢复

updateQueue是一个单向链表，firstUpdate和lastUpdate分别指向链表的对头和队尾。

enqueueSetState做以下任务： 1）建立组件对应的fiber 2）将组件的update放入fiber的updateQueue中 3）通过scheduleWork正式开始任务调度

work的调度工作主要在ReactFiberSchedule.js中 scheduleWork -> requestWork -> performSyncWork/performAsyncWork -> workloop -> performUnitOfWork -> render

performUnitOfWork调用的核心函数是beginWork，beginWork会遍历当前workInProgress的所有子集fiber完成单元任务的处理

current.alternate和updateQueue要同步 因为每次执行setState会创建新的更新，把更新挂到对应的fiber上 这个fiber在奇数次更新的时候存在fiber上，偶数次更新存在current.alternate上 每次吵架或者复用workOInProgress是从current.alternate上拿 复用的ternate上，updatequeue不一定有新的更新

前端路由核心
改变url，但是页面不进行整体刷新如何实现？ url的hash，改变url的hash，页面不整体刷新，h5的history.pushState,类似栈结构，histore.back将栈顶路由溢出，history.replace彻底替换，不能再前进后退，history.go, history.back,history.forward

react路由和常规路由有何不同
常规路由： 每个视图对应一个新文件，url更改： http请求被发送到服务器并且接收相应的html页面，用户体验：用户实际在每个视图的不同页面切换 react路由：只涉及单个HTML页面，url更改：仅更改历史记录属性，用户体验： 用户以为在不同页面间切换

### 高阶函数和高阶函数意义
js中比较常见的filter，map，reduce都是高阶函数
更优雅， 高阶组件属于函数式编程思想，对于被包裹的组件时不会感知到高阶组件的存在，而高阶组件返回的组件会在原来的组件之上具有功能增强的效果。装饰器模式 
高阶组件实现方式：属性代理，反向继承 属性代理能够： 1）更改 props 2）通过 refs 获取组件实例 3）抽象 state 4）把 WrappedComponent 与其它 elements 包装在一起
1：增强props，通过Context进行增强 2：渲染判断鉴权： 开发中可能遇到:某些页面必须用户登录成功才能进入，没有登录直接跳到登录页面 高阶组件可以做抽取公共部分逻辑 3： 生命周期函数劫持
时机 不要在组件的 render 方法中使用HOC，尽量也不要在组件的其他生命周期中使用HOC。因为调用HOC的时候每次都会返回一个新的组件，于是每次render，前一次高阶组件创建的组件都会被卸载(unmount)，然后重新挂载(mount)本次创建的新组件，既影响效率又丢失了组件及其子组件的状态。 3，静态方法 如果需要使用被包装组件的静态方法，那么就需要手动复制这些静态方法，因为HOC返回的新组建不包含被包装组件的静态方法。
缺陷： HOC需要在原组件上进行包裹或者嵌套，如果大量使用HOC，将会产生很多嵌套，调试困难 HOC可以劫持props，在不遵守约定情况下也可能造成冲突(原来传过来name为a，hoc中又传了个name覆盖)

ref转发
ref不能用于函数组件，函数组件没有实例，不能获取到对应的组件对象 function Profile(props) { return

} 类组件中：createRef， this.refText = createRef(); 使用：ref={this.resText} 打印this.refText.current 函数组件：使用creatRef会报错。指向函数,你拿不到函数，没有实例 如果你想拿到A盒子，你可以用高阶组件：forwardRef函数， 将原来的函数作为参数传给forwardRef const Profile = forwardRef(function Profile(props，ref) { return
}) Profile接收的就是一个组件
使用forwardRef增强的函数会多出来一个参数ref，来自父组件ref={this.refText}传过来的. 在hooks使用useRef就可以了

构造函数用React.createRef创建的ref接收底层dom元素作为其current属性 放到一个类组件上面： this.counterRef.current.increament()父组件调用子组件的函数 ref用在组件上获取到的是组件对象 组件是函数组件获取不到（函数组件没有实例对象）。但是有时候我们需要获取到，可以通过React.forwardRef高阶组件来获取，
受控组件非受控组件
react中html表单处理方式和普通dom不太一样，表单元素通常会保存在一些内部的state 受控(推荐）：

render函数的返回值
1）react元素， 2）数组或者fragment 3）portals 4）布尔或者null，什么都不渲染，字符串或者数值会被渲染为文本节点

portals入口，端口
若你想渲染的内容独立于父组件，甚至是独立于当前挂载到的dom元素中，（默认都是挂到id为root的dom元素上） 比如弹出独立于根元素的。 portal提供了一种将子节点渲染到存在于父组件以外的dom节点的优秀方案 第一个参数：child是任何可渲染的react子元素，例如字符串或者fragment 第二个参数container的一个dom元素 React.createPortal(child,container) 通常你从组件的render方法返回一个元素时，该元素将被挂载到dom节点中距离其最近的父节点

react hooks与类组件的setState不同，useState不会自动合并更新对象，你可以用函数式的setState结合展开运算符来合并更新对象的结果 setState(prevState => { return {...prevSatte, ...updatedValues} }) useReducer是另一种可选方案，它更适用于管理包含多个子值的state对象

调用statehook的更新函数并传入当前的state时，react将跳过子组件的渲染以及effect的执行，React使用Object.is来比较state

如果你在渲染期间执行了高开销的计算，使用useMemo来优化（或者setState后，组件引用的子组件不需要重新渲染，可以用useMemo减少渲染）

和componentDidMount/Upodate不同：浏览器完成布局和绘制之后，传给effect的函数会延迟调用，这使得它适用于常见副作用场景，比如设置订阅，因此不要在该函数中执行阻塞浏览器更新屏幕的操作

并不是所有effect都会被延迟执行。例如在浏览器执行下一次绘制之前，用户可见的dom变更就必须同步执行，避免用户感觉不一致。react为此提供了useLayoutEffect来处理这类effect，和useEffect结构相同，调用时机不同

虽然useeffect会在浏览器绘制后延后执行，但是会保证任何新的渲染前执行，react会完成画面渲染后才延迟调用useEffect，因此会使得处理额外操作很方便

 上层Provider更新，该hook会被触发，即使祖先使用react.memo或者shouldcomponentUpdate，也会在组件本身使用useContext时重新渲染

useReducer是useState的替代方案，它接收形如（state，action) => newState的reducer， state复杂或者下一个state依赖于之前的state，使用useReducer useReducer还可以给哪些会触发深更新的组件做性能优化，因为你可以给儿子传dispatch，而不是回调函数 
const initState = { count: 0 } 
function reducer(state, action) { 
  switch(action.type) { 
    case 'increment: return {count: state.count+1 }; 
  } 
} 
function Counter { 
  const [state, dispatch] = useReducer(reducer,initSate); 
  return(<><button onClick={() => dispatch({type:'increment' })}>+<>) 
} react会确保dispatch函数的标识是稳定的，并且不会在组件重新渲染时改变，这就是为什么可以安全的从useEffect或useCallback的依赖列表中省略dispatch

useMemo的函数会在渲染期间执行，不要在这执行与渲染无关的操作，如副作用操作属于useEffect的使用范畴 useMemo不传依赖项，会在每次渲染时重新计算新的值

useRef返回一个可变的ref对象，返回ref对象在组件整个生命周期内保持不变 useRef会在每次渲染时返回同一个ref对象

useImperativeHandle(ref, createHandle, [deps])可以让你在使用ref时自定义暴露给父组件的实例值，它要和forwardRef一起用

conte fancyInput = forwardRef(funcgtion(props, ref) { const inputRef = useRef(); useImperativeHandle(ref, () => ({ focus:() => { inputRef.current.focus(); } })) return <input ref={inputRef} ... /> })

useLayoutEffect:和useEffect相同，会在所有DOM变更后同步调用effect，可以用它来读取dom布局并同步触发重新渲染，浏览器执行绘制之前，useLayoutEffect内部的更新计划将被同步刷新

类组件不足
1：组件间状态逻辑很难复用 2：复杂业务的有状态组件会越来越复杂 3：this指向问题

setState传递的数据是不可变的数据
不要这样修改this.setState({ arr: this.state.arr }) // 引用地址不变，数据改变了，但是界面没有改变 为何使用setState改？保存界面与数据的同步，这种修改方式react并不知道数据发生变化
出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们来更新下一个状态。

setState同步还是异步
如果是正常情况下，没有使用ConCurrent组件下是同步的。调用setState只是单纯的将新的state放到updateQueue链表里面，还没有进行更新，你拿不到更新后的数据，等点击事件结束后会触发内部的回调 正常绑定事件你点击的时候就会触发，但是react中的合成事件会先去做别的事情再来执行回调函数，这个时候才是真正的更新state以及重新渲染。 当使用了Concurrent组件的时候才是真正异步，但同样无法立即获取新的状态，并且在执行渲染（生成fiber阶段）和更新时候是用来真正异步方式

异步更新： 组件的生命周期，react的合成事件里面是异步的  不能在setState之后直接拿到改变的值

为什么要设计成异步？ 1）可以提升性能，如果每次调用setState都进行一次更新，那么意味着render函数会被频繁调用，界面重新渲染 这样效率是很低的，最好办法是获取到多个更新，之后批量更新 如果同步更新了state，但是还没执行render函数，那么state和props不能保持同步，state和props不能保持一致性在开发过程会遇到很多问题

如何获取异步的结果？ 1）setState的第二个参数 2）生命周期componentDidUpdate（源码中调调用componentDidUpdate再执行setSatte第二个参数

同步更新： 定时器里面，定时器是异步的，将setSatte放在定时器执行是同步的 原生的事件监听：在componentDidMount里面，通过document获取dom，监听按钮点击，将setSatte放在里面是同步的 react源码里面做了一个判断

setSatte数据的合并：源码里面通过object.assign来处理Object.assign({}, this.state, {name: 'B' }); Object.assignn({}, prevSatte,partialState)

setState本身的合并
increment(){ this.setSate({count: this.state.count+1}) this.setSate({count: this.state.count+1}) } 不管你调用几次setState拿到的结果都是1 源码中会用do。while来遍历队列，链表中多个setSate，只有最后一次生效。

this.setSate((prevState, props) => { return { count: prevSatte.count+1 } })setSatte接收一个函数，依赖于上一次的值或者props，你调用几次就会就改几次，合并一次更新， 是对象就合并

react的更新机制
渲染：jsx-虚拟dom-真实dom 更新：props/state改变 -》 render函数执行 -》 产生新的dom树 -》新旧树比较 -》 计算差异进行更新 -》 更新到真实dom树 第一次渲染会产生一个真实dom树，之后发生改变，进行rende产生虚拟dom树之后，更新变化的部分，不会把虚拟dom直接更新到真实dom diff发生在render之后，要render生成一个虚拟dom

1）同层节点相互比较，不跨级比较 2）不同类型的节点，产生不同的树结构 3）通过key来指定哪些节点在不同的渲染下保持稳定

对比不同类型的元素 1）当节点为不同元素，react会卸载原有树，建立新树 2）当卸载一棵树，对应dom节点会被销毁，组件执行componentWillUnMount 3）建立新树，执行componentWillMount，componentDidMount

对比同一类型的元素 1）react保留节点，仅对比更新有改变的属性。如果是同类型的组件元素，组件会保持不变，react会更新该组件的props，调用componnentWillReceiveProps和componentWillUpdate，下一步调用render方法，diff算法将在之前的结果以及新的结果中进行递归（逐层比较）

对子节点进行递归 在默认条件下，当递归dom节点的子元素时，react会产生同时遍历2个子元素的列表，当产生差异，生成一个mutation 在最后插入一条数据的情况：前面两个比较是完全相同的就不会产生mutation（改变），最后一个比较，产生一个mutation，将其插入新的dom树即可 在中间插入一条数据的情况：会对每个元素产生一个mutation，这种低效率比较性能不好

为了解决上面的情况，要使用key。react用key来匹配原有树的子元素以及最新树上的子元素。进行位移操作 key：插入的时候优化，是位移的，不要用随机数，下次render时候会生成一个新的数字，匹配不到，index做key对性能优化作用不大。

SCU源码中会判断constructor原型上的isPureComponent有没有，如果有就不走默认true，去调shallowEqual(pldProps,newProps) shallow浅层
函数组件使用React.Memo() memo其实是一个高阶组件 memo(function ComA() {})

### SQL注入
 主要是针对数据库的，用户提交数据的SQL语句不安全 防御： 参数化查询：也叫预处理语句： 1：指定查询结构，用户输入预留占位符 2：指定占位符的内容
### XSS跨站脚本攻击，
将恶意代码植入到其他用户页面，其他用户在观看网页时候，恶意脚本就会执行。 比如做个假的登陆界面攻击成功后，攻击者可以得到私密网页内容和Cookie等  
XSS分类： 反射式XSS： 服务器未对用户提交的表单数据或者URL无害化处理，响应后浏览器解析执行XSS代码。这个过程像一次反射
         存储式XSS： 提交的代码会存储在服务器，永久性XSS，危害更大（容易留下痕迹被清除） 
         基于DOM的XSS攻击： DOM XSS的代码并不需要服务器参与，浏览器端的DOM解析触发xss
防御： 1：输入验证，对特殊字符进行处理，如"<“和”>"等进行转义。 2：输出编码，
### CSRF跨站请求伪造，也叫XSRF，f
攻击方式：如通过电子邮件发送一个链接来蛊惑受害者进行一些敏感性的操作，如修改密码，转账。用户登陆了A网站，因为某些原因访问了B网站（比如跳转等），B网站直接发送一个A网站的请求进行一些危险操作，由于A网站处于登陆状态，就发生了CSRF攻击（核心就是利用了cookie信息可以被跨站携带）！
CSRF攻击防御 1：增加一些确认操作，敏感操作时输入密码二次验证 3：使用Token
### http特点
1）支持客户/服务器模式（由客户端发出请求） 
2）简单快速，只要传送请求方法/路径（由于http协议简单，使得http服务器的程序规模小，因而通信速度很快 
3）灵活，http允许传输任意类型数据对象，由content-type加以标记（1.0后） 
4）无连接，每次连接只处理一个请求，服务器处理完客户端请求，并接收到客户端答应之后，就断开连接，采用这种方式可以节约时间。（keep-alive：让客户端与服务端的连接持续有效，避免重新建立连接） keep-alive就是将多个HTTP请求合并成一个 
5）无状态：协议对事务处理没有记忆能力，缺少状态意味着如果后续处理需要前面的信息，则它必须重传，导致每次传输数据很大
### SPDY
谷歌提出，为了最小化网络延迟，提升网络速度，对http的增强， 多路复用：允许一个连接可以有无限个并行请求，还可以设置优先级，防止非重要资源占用通道 2）支持服务器推送 3）spdy压缩了http的header，舍去了不必要的头部信息 4）强制使用SSL，网速变快
### http和https的区别
### https的证书颁发过程
### 对称加密和非对称加密
对称加密：加解密都用一个密钥，比如指纹解锁，登录要用同一个人的密码，常见对称加密算法：DES，3EDS，base64是对称加密，公钥就是base字符码表
非对称加密：主要是解决对称加密密钥传输问题，是一对公钥和私钥，github，ssh-keygen指定加密算法为rsa
hash和md5不算加密算法，是不可逆的，加密应该是可以还原的，非对称加密也不是绝对安全，存在交换公钥时公钥被篡改的问题。
### http1.0和http2.0有哪些区别
http1.0：一次性连接 http1.1：保持连接，性能提升 http2.0：强制https，自带双向通信，多路复用

http2.0核心：二进制分针。 将所有的传输信息分割成更小的消息和帧，并且采用二进制形式编码。 3）http2.0首部压缩 4）http2.0多路复用： 继承SPDY协议，所有通信都在一个TCP连接中完成。TCP性能：关键在于低延迟，大部分TCP连接很短，突发性。TCP只在长时间传输连接，传输大文件的时候效率才最高。

HTTP2.0的问题：还是底层支称的TCP造成的， 1：队头阻塞（当连接中出现丢包，2.0不如1，丢包之后整个tcp都要等待重传，导致后面数据被阻塞） 2：建立连接的握手延迟：不管是1.0还是1.1，https都是tcp进行传输，https，2.0还要使用TLS进行安全传输，这样出现两个握手延迟。TLS完全握手至少需要RTT两回才能建立，对于短连接来说，这个延迟影响很大无法消除。 QUIC是TCP遗留问题的优化。 针对延迟问题：0 RTT ：QUIC利用类似TCP快速打开的技术，缓存当前会话上下文，下次恢复会话时候只要将会话缓存传到服务器确认，确认通过就可以进行传输。 传统TCP（2RTT） TCP+TLS：4RTT QUIC：2RTT

tcp/udp区别
tcp面向连接，udp无连接 tcp提供可靠服务，udp尽最大努力交付 tcp传输效率低，udp传输效率高，适用对于高速传输和实时性传输有较高的通信或广播通信tcp点到点，udp一对一，一对多，多对一
### Http结构
请求头： 1: method, url, 协议，content-type， host：请求资源所在服务器， cookie，connection：keep-alive/close, cache-control，Date，If-none-Match, If-modifed-since， user-egent ，Accept，Accept-laguage ，Accept-chartset，expires
响应头: 1： status，协议版本，cache-control，set-cookie，content-Type ，Date ,Etag， content-length, age ,location：领客户端重定向的URI ，last-modified
### CDN
在浏览器本地缓存失效后，浏览器会像CDN边缘节点发起请求，类似浏览器缓存，通过http响应头中的cache-control设置CDN边缘节点数据缓存时间。 当浏览器向CDN节点请求数据时，会判断缓存是否过期，若过期，CDN会发出回源请求，拉取最新数据，更新本地缓存，优势： 1：访问延时大大降低,起到分流作用，减轻了源服务器的负载。
浏览器缓存的区别
web缓存：数据库缓存，服务端缓存（代理服务器缓存，CDN缓存）览器缓存：HTTP缓存（expires，Cache-Control，Etag.），cookie，localStorage等 缓存策略都是通过设置http的header来实现
缓存机制： 先走强缓存，expires（资源过期时间修改本地时间缓存失效http1.0产物），cache-control（http1.1产物，优先级高于expires） 协商缓存： Etag/If-None-Match: 资源的标识符，资源变化，服务端的Etag就会发生变化，etag的优先级高于last-modified, last-Modified:资源最后的修改时间，只能精确到秒，秒以内发生的变化感知不到,精度上Etag大于last-modified，性能上etag小于last-modified
Expires+Last-Modified+max-age+Etag 缺陷：max-age或者Expires不过期，浏览器无法感知文件变化，怎么让浏览器无法感知？ Http缓存改进： 1：md5/hash缓存 通过不缓存html，为静态文件添加MD5或hash标识， 2：CDN缓存
缓存位置： service-worker：自由控制缓存哪些文件，如何匹配和读取文件， 缓存是持续的 Memory-cache： 读取速度快，缓存容量小，不是持续缓存，tab页关闭，缓存被释放 Disk-cache： 读取速度慢，容量大，缓存时间长。根据http的header判断哪些需要缓存，大部分缓存来自硬盘缓存 push-cache: 只会在session会话中存在，会话关闭，缓存失效，推送缓存（http2.0),以上3种缓存没有命中才会使用，在chrome只有5分钟，不是严格根据http

### ES6新增特性
1）let,const
2）箭头函数 
3）参数处理 默认参数值 剩余参数：之前参数不固定的函数，用arguments。es6用...args
4）模板字面量 es6之前字符串连接用+或者conca
5）原有字面量的增强 更安全的二进制，八进制字面量 字符串支持Unicode
6)对象属性增强： 属性定义支持短语法 {name: name} => {name} 属性名支持表达式 obj: { ['baz'+quex()]: 42} 添加__proto__属性，但是不建议使用
7）解构赋值
8)模块 导入：import
9)类 重写构造器 ES5：创建子类的实例对象this，再将父构造函数的方法加到this ES6：先创建父类的实例this，再用子类的构造函数修改this
es6创建类：只是语法糖，constructor(num) 该方法虽然在类上，但是不在原型上
10）迭代和生成器
迭代器:
生成器 promise的升级，ES7的async，await是终极写法 能暂停 generator+promise配合

for..of循环， 结合了其兄弟for和for..in的优势，可以循环任何可迭代（遵循可迭代协议）类型的数据，默认情况包含：string，array, map,set， for循环最大缺点是需要跟踪计数器和退出条件，虽然for循环在循环数组时确实有优势，但某些数据不是数组 for..in:依然使用index来访问数组值，当你要像数组添加额外方法或对象很麻烦，for..in会枚举原型属性 
forEach只能用于数组，无法停止或者退出循环，你想停止或退出用for for..of和for...in基本一样，for..of解决了for和forin不足，你可以随时停止或者退出for..of循环,for..of只会遍历自身属

11）promise
12）元编程 代理：proxy 反射： reflex
13）新增数据类型 Symbol， Set， Map，WeakSet， WeakMap，TypedArray
14)尾递归优化
15）原有内置对象API增强 数组： Array.from(arrayLike[,mapFn[,thisArg]])： 从一个类似数组或可迭代对象创建一个新数组. mapFn中每个元素会执行该回调， thisArg执行回调时this对象 
    Array.of(ele0[,ele1[,...[,eleN]]])：创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或者类型
    Array.fill
    Array.find/findIndex
    Array.copyWidthin(target[,start[,end]]): 浅复制数组一部分到数组另一个位置，原数组长不变,不包括end
    Array.entries：返回一个新的Array iterator对象，可以通过next迭代，该对象包含数组中每个索引的键值
    Array.keys/values
对象： Object.assign ,includes,repeat,startWith,endsWith

### 了解navigator对象吗？
Navigator 对象包含有关浏览器的信息,
userAgent:浏览器用于 HTTP 请求的用户代理头的值 appVersion: 返回浏览器版本 appName:返回浏览器的名称 platform：返回运行浏览器的操作系统平台 cookieEnabled：浏览器启用cookie值为 true。如果禁用了 cookie，值为 false。 appCodeName：浏览器的代码名。

### link和@import引入CSS的区别？
两者都是外部引用CSS的方式，但是存在一定的区别： 1）link是xhtml标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。 2）link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。所以有时候浏览@import加载CSS的页面时开始会没有样式（就是闪烁），网速慢的时候还挺明显 3）link是xhtml标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。 4）link支持使用js控制DOM去改变样式；而@import不支持。

### 移动端适配问题
1：流式布局：又叫百分比布局，用%百分比定义宽度，高度用px固定，根据可视区域大小调整，用max-width/height控制尺寸，实现简单，不存在兼容问题，但是在大屏手机或者横竖切换场景可能会导致页面元素被拉伸变形，字体无法随屏幕大小变化。 padding/margin:相对父元素的宽，与父元素的高无关 border-radius相对自身宽度 
2：字体大小展现：出现弹性布局，包裹文字元素用em/rem为单位，主要区域用px，百分比或者em/rem 
上面2种：页面元素的大小按照屏幕分辨率进行适配调整，整体布局不变 
3：rem方案：rem是相对长度单位，是弹性布局的一种实现方式 实现过程：先获根元素和设备dpr设置rem，页面缩放时，获取元素内部宽，重新调整rem大小 实现方法：用css处理器或者npm包将css样式中px自动转化为rem，在整个flexible适配方案中，文本用px为单位，用[data-dpr]属性区分不同dpr下文本大小，由于手机浏览器对字体显示最小是8px，更小尺寸文字用px为单位，防止转化为rem后出问题， 优势：兼容性好，相比百分比布局，页面不变形，自适应效果更好 不足：1）不是纯css移动端适配，需要引入js，在头部嵌入js监听分辨率变化动态改变根字体大小，css，js有一定的耦合性，并且必须将改变font-size的代码放在css样式之前 2）小数像素问题：通过rem计算后可能会出现小数像素，浏览器会对小数部分四舍五入，也就是0.634px，渲染尺寸为1px，空出的0.375px空间将由其临近的元素填充，如果一个元素尺寸是0.375，渲染尺寸就是0，但是会占据临近元素0.375px的空间，导致缩放到低于1px的元素时时隐时现，解决：指定最小转换像素，对于比较小的像素，不转换为rem或者vw。宽高相同的正方形，长宽不一样了，border-radius：50%的圆不圆了 3）安卓浏览器下line-height垂直居中偏离问题，这种方法在安卓设备不能完全居中
4： vh/vw方案 原理： 移动端视口是指布局视口，1vw：等于视口宽度的1%，1vh等于视口高度的1%； vmin：取vw和vh最小的那个，vmax取vw和vh最大的那个 使用css预处理器把设计稿尺寸转换为vw单位，包括文本，布局宽高，间距等，让这些元素能够随视口大小自适应调整，以1080px设计稿为基准，转换： $vw_base: 1080 @function vw($px) { @return($px/1080)*100vw } 优势：纯css不存在脚本依赖问题，相对于rem，逻辑清晰简单，视口单位依赖于视口的尺寸，"1vw=1/100 viewport width" 根据视口尺寸的百分比来定义宽度 不足：兼容性问题

5： rem+vw/vh vw和vh方案能够实现宽度和高度自适应，并且逻辑清晰，将vw/vh和rem结合，给根元素设置随视口变化的vw单位，通过postcss-plugin-vwtorem将其转换 对1080px宽的设计稿，设置根字体大小为100px，那么设计稿中1px对应：100vw/1080=0.0925926vw,并且1rem=100px，就可以得到 1rem = 9.25926vw

6：基于媒体查询的响应式设计 原理：媒体查询，给不同分辨率的设备编写不同样式。一般是指pc，平板，手机设备之间较大的分辨率差异，通常结合了流式布局和弹性布局 @media only screen and(max-width:375px) { 样式1 } @media only screen and(max-width:750px) { 样式2 } 优势：能在不同设备，不同分辨率屏幕上展示合理布局，不仅仅是样式伸缩变换 不足：要匹配足够多的设备与屏幕，一个web页面需要多个设计方案，工作量大，通过媒体查询技术需要设置一定量的断点，到达某个断点前后的页面发生显著变化，用户体验不好

### 1像素问题
边框为1px的css像素，在普通屏幕下1px，高清屏（dpr为2）下2px，是由于不同移动设备的dpr不同，导致1px的css像素转换成物理像素显示不一样 css中涉及1像素的地方任然用px为单位，设置将整个页面缩小为dpr倍，对于页面用rem方案的情况，将页面的跟字体再放大dpr倍，这时候就能在不改变页面其他布局下保持边框css像素为1px
### 对图片的处理
加载网页时，60%以上流量来自加载图片，指定图像宽度时使用相对单位防止意外溢出视口，比如width:50%,因为css允许内容溢出容器，所以：max-width:100%来保障图像以及其他内容不会溢出， img的alt属性有助于提高网站的可访问性。 维护自适应页面中图片宽高比固定比较常用方法是用padding设置，对不同dpr以及不同分辨率/尺寸的屏幕，为了避免资源浪费和等待时间，针对不同屏幕使用合适图片 对引入的图片，若要适应不同像素密度的屏幕，使用srcset属性来指定多张图片，url后接一个空格，和像素闽都描述符，浏览器根据当前设备的像素名都，选择需要加载的图像，如果srcset属性都不满足条件就加载src属性指定的默认图像  想针对不同屏幕用不同分辨率版本和尺寸的图片，用srcset和sizes，srcset允许浏览器选择的图像集，以及每个图像大小（用w为单位），sizes定义了一组媒体条件（例如屏幕宽度），指明当某些条件为真时，怎样的图片尺寸才是最佳选择  浏览器查询过程：查看设备宽度，检测sizes列表中哪个媒体条件为真，查看给予该媒体查询的槽大小，加载srcset列表中引用的最接近所选的槽大小的图像

异步加载：引入的图片，使用js自带的异步加载图片，根据不同dpr加载不同分辨率图片  let dpr = window.devicePixelratio if(dpr > 3) {dpr = 3} let imgSrc = $('#img').data('src'+dpr+'x'); let img = new Image(); img.src=imgSrc; img.onload = function(imgObj) { $('#img').remove().prepend(imgObj) // 替换img对象 }

picture
picture：为不同视口提供不同图片，使用标签，是h5定义的一个容器标签，内部用和,浏览器会匹配的type，media，srcset等熟悉，找到最适合当前布局/视口宽度的图片，这里的标签是浏览器不支持picture元素，或者支持picture但是没有合适的媒体定义时的后备，不能省略

背景图片
对于背景图片，使用image-set根据用户设备的分辨率匹配合适的图像，同时要考虑兼容性问题 .css { background-image: url(...png); 不支持image-set情况下显示 background: -image-set( url(1x.png) 1x, url(2x.png) 2x, url(3x.png) 3x, ) } 媒体查询，对于背景图片，用媒体查询自动切换不同分辨率的版本 .css { background-image: url(...png); } @media only screen and(min-device-pixel-ratio: 2) { .css { background-image: url(..2x.png); } } @media only screen and(min-device-pixel-ratio: 3) { .css { background-image: url(..3x.png); } }
### cookie和session， localStorage, sessionStorage有什么区别
cookie跨域有问题，现在都是用localStorage存token
localStorage和sessionStorage都不会随http的header发送到服务端（相比安全），减轻了服务器压力，webStorage操作数据比cookie方便。
cookie机制： 默认当前浏览器关闭cookie失效，cookie存在内存中（会话cookie），若设置过期时间，数据存在硬盘中，过期时间内有效。每次请求都会带上cookie。
session机制：服务端收到创建session时，检查请求头是否带sessionId，有：根据sessionId返回对应的session对象，无：服务器创建session对象，并将sessionId通过cookie存储返回客户端，若用户禁用cookie：url重写，通过response.encodeURL(url)将sessionId拼接在url后面。localStorage只要不跨域，就能读改同一份localStorage数据。 sessionStorage还要求在同一窗口下。 localstorage是无法跨域的，也无法让子域名继承父域名的localstorage数据，这点跟cookies的差别还是蛮大的。不受页面刷新影响（sessionStorage可在浏览器崩溃并重启后恢复

Cookie跨域请求能不能带上
cookie一般情况下是不能跨域的 一些请求可以通过jsonp的方式实现跨域：服务端设置： Access-Control-Allow-Credentials: true 客户端：请求的时候带上withCredentials：true是指跨域请求是否提供凭证信息（cookie，http认证以及SSL证明等 Credentials必须在前后端都被配置，才能使带credentials的CORS请求成功。
domain和path共同决定了cookie可以被哪些url访问。 访问一个url时，如果url的host与domain一致或者是domain的子域名，并且url的路径与path部分匹配，那么cookie才可以被读取。
cookie各属性详解 Name,Value: cookie值。Domain: cookie的域名,Path: 允许读取cookie的url路径，一般设置为/。Expires,HttpOnly

cookie如何应对XSS漏洞* 
XSS漏洞的原理是，由于未对用户提交的表单数据或者url参数等数据做处理就显示在了页面上，导致用户提交的内容在页面上被做为html解析执行。
常规方案：对特殊字符进行处理，如"<“和”>"等进行转义。
cookie的应对方案：将重要的cookie信息设置为HttpOnly来避免cookie被js采集。

cookie如何应对CSRF攻击 原理:用户登陆了A网站，后访问了B网站（比如跳转等），B网站直接发送一个A网站的请求进行一些危险操作，由于A网站处于登陆状态，就发生了CSRF攻击（核心利用cookie信息可以被跨站携带）！
常规方案：采用验证码或token等。
cookie的应对方案：CSRF攻击核心就是利用了cookie信息可以被跨站携带，那么我们可以对核心cookie的SameSite设置为Strict避免。

### requireJS的原理是什么
requireJS是基于AMD模块加载规范，使用回调函数来解决模块加载的问题。即异步模块加载机制，其思想就是把代码分为一个一个的模块来分块加载，这样无疑可以提高代码的重用。 在整个require中，主要的方法就两个：require和define

requireJS是使用创建script元素，通过指定script元素的src属性来实现加载模块的。 3，特点

实现js文件的异步加载，避免网页失去响应 2，管理模块之间的依赖，便于代码的编写和维护
requireJS为何不会多次加载同一个文件?怎么理解内部机制?

模块的定义是一个function，这个function实际是一个 factory（工厂模式），这个 factory 在需要使用的时候（require("xxxx") 的时候）才有可能会被调用。因为如果检查到已经调用过，已经生成了模块实例，就直接返回模块实例，而不再次调用工厂方法了。

原生js添加class怎么添加，如果本身已经有class了，会不会覆盖，怎么保留？
document.getElementsByTagName('body')[0].className = 'snow-container'; //设置为新的 document.getElementsByTagName('body')[0].className += 'snow-container'; //在原来的后面加这个 document.getElementsByTagName('body')[0].classList.add("snow-container"); //与第一个等价

这种方法可以避免覆盖原有的类，但是也存在问题，一旦我们要添加的class多的时候，我们需要拼接的字符串就会变得比较乱，并且不易维护，我们也无法看到哪些使我们已经添加过得class，可能会造成类名添加重复；

// 首先判断当前dom是否已经包含了要添加的类 export function hasClass(el, className) { let reg = new RegExp('(^|\s)' + className + '(\s|$)') return reg.test(el.className) } // 动态添加class export function addClass(el, className) { if (hasClass(el, className)) { return } // 将原有的class按空格拆分，并将类名保存到newclass数组中 let newClass = el.className.split(' ') // 将要添加的类也push到这个数组 newClass.push(className) // 将数组拼接成字符串返回给dom el.className = newClass.join(' ') }
### w3c事件与IE事件的区别
绑定和取消绑定事件： w3c： addEventListener，removeEventListener IE： attachEvent， detachEvent
阻止默认： w3c： e.preventDefault, IE: window.e.returnValue=false 阻止冒泡和捕获： w3c： e.stopPropagation 阻止捕获和冒泡 IE: window.e.cancelBubble只能阻止冒泡 事件目标： w3c：e.target IE：window.e.srcElement 事件对象： w3c： arguments.calee.caleer.arguments[0]; IE：window.event

### js中上下文是什么
运行js代码时，当代码执行进入一个环境时，就会为该环境创建一个执行上下文，执行上下文有且只有三类，全局执行上下文，函数上下文，与eval上下文 函数执行上下文可存在无数个，函数被调用都会创建一个函数上下文调用几次创建几个上下文
执行上下文的生命周期有两个阶段：
创建阶段：函数被调用时，进入函数环境，为其创建一个执行上下文。
执行阶段：执行函数中代码时， 创建变量对象（上下文这定义的所有变量和函数都存在这个对象上） 初始化Arguments对象（并赋值） 函数变量声明（并赋值），函数表达式声明（未赋值） 确定this指向 确定作用域
作用域链：上下文中代码执行时会创建变量对象的一个作用域链，作用域链决定了各级上下文中的代码在访问变量和函数时的顺序。
### 你所了解的跨域的方法都说说看你了解的？
1： webpack Plugin， 2： webpack Proxy， 3： nginx反向代理， 4：jsonp， 5：后端最好：cors 企业一般nginx， cors
webpack Plugin: webpack-dev-middle跨域
webpack proxy: 在webpack-config.js里配置： devServer: { proxy: { '/api': { target: 'http://....', pathRewrite: {'/api': ''} } }
### 要是让你自己写一个js框架你会用到哪些设计模式,设计模式优点，项目中用过哪些
单例模式：使用对象前判断对象是否存在，不存在就创建。关键是使用一个变量保存对象 
观察者模式：又叫发布订阅模式，redux使用的就是发布订阅模式，react-redux中实现了订阅功能，mapStateToProps是订阅state，mapDispatchTpProps订阅dispatch
装饰器模式：在不破坏原来对象的前提下，对对象进行扩展，写一个装饰器函数，将被装饰对象传入 
工厂模式：需要频繁创建对象时，注重创建对象的过程 
建造者模式：和工厂模式类似，注重创建对象的细节 
策略模式：
命令模式（发布者，调用者和执行者是分开的）

### 说下你所理解的mvc与mvvc
MVC:（backbone框架），用户可以操作view层，也可以操作control层，逻辑，数据，视图分离。 可以在view里调用model取数据，
也可以在model主动触发view修改视图，control即可以修改model也可以更新view 
缺点：复杂项目中会出现混乱。如视图改变，不知从哪触发（model或用户或control）
mvc并未具体指明各个部分应该承担具体什么职责，相互间如何交互

从大层面可将mvc分为服务端mvc框架和纯客户端mvc框架 服务端：spring mvc 客户端mvc：mvp，mvvm
MVP：模型-视图-presenter（主持人），view和model不能直接交互，只能通过presenter。解决了mvc交互混乱问题。明确了各个组件的职责， 
MVVM:基本和mvp一致。更注重数据驱动视图，新增双向数据绑定。 model职责不变，view的职责被分成2部分：展示数据和用户操作，
另一部分：view中动态的部分，比如输入框内容，按钮的enable，这部分职责转移到了VM中，所以view和model不直接交互.，
而是和VM绑定，VM除了要响应用户操作外还要维护视图状态

mvp中presenter也要维持视图状态的，但presenter将状态设置到视图上，自己不持有这些状态，
mvvm中，VM是视图状态的来源，视图只是反映VM状态

react不是mvvm框架，但是React可以作为MVVM中第二个V，也就是View； 
MVVM显著特征是双向绑定，而React是单向数据绑定；
 react整体是函数式的思想，把组件设计成纯组件、状态和逻辑通过参数传入。
 React是一个单向数据流的库，状态驱动视图。 
 react本身是面向web端的，它很轻便灵活，只是MVC架构中的view(视图)层。由于只是view层，所以它需要配合生态体系中的其他框架或模块来使用。

 通过new Vue实例的对象是MVVM中的VM，模型通过它将数据绑定到页面上，视图可以通过它将数据映射到模型上
 优点：低耦合，视图可独立于model的变化和修改
      复用：将视图逻辑放到vm里让很多view复用这逻辑


### 重绘重排
重绘：元素外观发送改变，颜色，字体大，所以要尽量避免使用table布局 
重排：元素规模尺寸，布局，隐藏等 触发重排： 1）页面渲染初始化（无法避免） 2）添加删除可见dom 3）元素位置改变，或者使用动画 4）元素尺寸：大小，外边距，边框 5）浏览器窗口尺寸（填充内容：文字数量，图片大小改变引起的计算值宽高的改变 7）读取某些元素属性（offsetLeft/Top/Height/Width, clientTop/Left/Width/Height, scrollTop/Left/Width/Height, width/height, getComputedStyle,currentStyle(IE) 8）设置style属性 9）激活CSS伪类（例如：:hover 重绘重排代价：耗时，浏览器卡慢

优化：浏览器会维护一个队列，所有引起回流重绘的操作放入，队列满了或者达到一定时间间隔进行批处理，多次-》一次 
我们：减少对dom的操作，合并多次dom和样式修改，减少对style样式请求：直接改元素的classname 2）display先设置为none，然后进行页面布局操作，完成后设置display：block，这样只会引起2次重绘重排 3）用cloneNode(true or false)和replaceChild技术，引起一次回流和重绘 4）将需要多次重排元素，position设为absolute或者fixed，脱离文档流，他的变化不影响别的元素 5）如果需要创建多个dom节点，用document.createDocumentFragment创建后一次性插入document 
### 移动端300ms延迟
IOS的safari点击2次会放大（还有滚动），300ms用于判断用户是想单击触发事件，还是双击缩放。点击穿透是300ms延迟的副作用 解决方案： 
1）禁止所有缩放： ,缺点：完全禁止了缩放 2）更改默认视口宽度，设置屏幕宽度等于设备宽度，浏览器认为该网站做过适配优化，无需双击缩放，就禁了双击缩放，但是任然可以双指缩放。fast-click原理：检测到touchEnd事件时，通过DOM自定义事件立即触发模拟的click事件，并把浏览器在300ms后的click事件禁止掉。
### 点击穿透
touchStart事件在某些情况下出现点击穿透现象 比如：B在A上面，我们在B上注册了一个回调，作用是隐藏B，当我们点击B后，touchStart-touchEnd-click,而click有300ms延迟，当touchStart吧B隐藏后，到了300ms，浏览器触发了click事件，但是B不见了就作用到了A，如果A是一个连接就意外跳转了。
### 移动端IOS和安卓兼容
1）怎么判断是IOS还是安卓 navigator.userAgent
2）兼容问题：
ios端，在ajax回调中或者异步中无法通过window.open打开新窗口，safir安全机制挡住了 解决：window.location.href 
      禁止图片点击放大 部分安卓手机点击图片会放大，如果要禁止放大： img{ pointer-events: none}; 
      禁止IOS识别长串数字为电话（常见） <meta name="format-detection"格式检测 content="telephone=no"> 做移动端开发时候要加上

禁止复制，选中文本 设置css {-webkit-user-select: none} 一些情况下，对不可点击事件，比如label，span添加点击事件，不会触发ios下触发，css增加cursor:pointer 上拉滚动条时卡顿，慢 body { -webkit-overflow-scrolling: touch overflow-scrolling: touch } 安卓不会自动播放视频autoplay失效 window.addEventListener('touchstart', function() { audio.play(); },false) 半透明的遮罩层改为全透明 ios，点击一个链接或者通过js绑定率点击事件的元素时，会出现一个半透明的背景，手指离开屏幕，灰色背景消失，出现闪屏 html, body { -webkit-tap-heighlight-color: rgba(0,0,0,0) }

### 0.1+0.2 === 0.3 为什么？
总结：精度丢失可能出现在 进制转换 和 对阶转换运算 中
### 事件是如何实现的？
基于发布订阅模式，在浏览器加载的时候会读取事件相关代码，但是只有实际等到具体事件触的时候才会执行 在web端，常见的就是DOM事件 DOM0级事件：一个事件只能有一个处理程序，后面覆盖 DOM2级：add/removeEventListener
### 事件传播机制（事件流）
事件委托：利用事件冒泡，只指定一个事件处理程序，就可以管理一类型的所有事件
DOM2规范事件流三个阶段：捕获，目标，冒泡，true捕获，false冒泡 IE事件：attachEvent，detachEvent， 执行作用域不一样，在全局，this是window，DOM级是事件本身，执行顺序不一样，attachEvent是自下而上，后添加的先触发

Es6之前使用prototype实现继承
Object.create()会创建一个新对象，然后将此对象内部的[[prototype]]关联到你指定的对象，Foo.prototype, Object.create(null)创建一个空[[prototype]]对象,这个对象无法进行委托 
如果一个构造函数，bind了一个对象，用这个构造函数创建出的实例会继承这个对象的属性吗？为什么？
不会继承，因为this绑定四大规则，new绑定优先级高于bind显示绑定
### 性能优化
- 首页加载慢：
图片，静态资源（html，css，js），请求数量多
对图片的解决：非首屏图片懒加载，小图标用iconfont，小图片用雪碧图
合并请求：将js，css合并
缓存：DNS缓存，CDN缓存，http缓存
对于一些较大的三方库，按需加载：一般是babel实现
SPA应用通过前端路由懒加载（只加载首页，不加载其它不可见的），使用React.lazy，
代码层面：babel实现按需加载

React.lazy为什么能进行动态路由的加载？
React.lazy必须接收一个函数，函数要动态import并且返回一个promise。pending状态就渲染loading组件，resolve状态就渲染组件
React.lazy引入的组件必须使用Suspense包裹，
impoet('/cxx').then(match=> match.add(1,2))
React.lazy使用了dynamic import的标准，
webpack解析到这时会自动进行代码分割，遇到import('/xx)就会将里面内容单独打包成一个包
- 减少资源体积：
- 请求资源css，js，图片请求过大怎么解决？
- 将资源分开，css和js通过webpack混淆（将js代码进行字符串加密）和压缩（去除console等）
- 图片压缩：自动化工具，转base64，使用webP格式
- 开启gzip进行全资源压缩，gzip是一种压缩文件的格式对任何文件进行压缩
- webp优势：同等条件等比例无损压缩后的webp比png少了26%的体积，并且图片越多压缩后的体积优势越明显

### webpack打包优化
开发环境：不混淆，不压缩，不优化
生产环境：混淆，压缩，自动内置优化
React.lazy拆包，结合路由进行按需加载

对文件拆包后文件变多，是不是有矛盾？
拆分后的文件不可能是同时加载的，不会造成同一时间请求过多

node_module单独打包
对于第三方包：改动少（缓存，cache-control：max-age=200000，并配合etag，一旦文件名变才下载新的文件），公共代码次，非公共改动大（cache-control：no-cache配合etag使用，表资源被缓存，每次得发送请求问资源是否更新

### 渲染10万条数据不造成卡顿
无论是浏览器的DOM还是BOM，还是nodejs，都是基于js引擎开发的，dom和bom最终都要被转换成js能够处的数据，这个转换过程比较耗时，所以浏览器最耗时的是操作dom
react的虚拟dom，本质是js数据模拟真是dom树，
在渲染时候使用document.createDocumentFragment创建虚拟节点,requestAnimationFrame去执行函数



JSON.parse(JSON.stringify())
function deepClone(obj, target) {
  target = target || {}
  for(let i in obj) {
    if(Object.hasOwnProperty(i)) {
      if(typeof obj[i] === 'object') {
        target[i] = Array.isArray(obj[i]) ? [] : {}
        deepClone(obj[i], target[i])
      } else {
        target[i] = origin[i]
      }
    }
  }
}


### 为什么说Vue是渐进式js框架
vue允许你将页面割成可复用的组件，每个组件有自己的html，cssjs。
用自己想用或者能用的功能特性，不想用的部分功能可以先不用。VUE不强求你一次性接受并使用它的全部功能特性。
### vue生命周期
beforeCreate：data和methods中数据还没有初始化，无$el，无data
created：无$el, 有data
beforeMount: 无$el, 有data
mounted：有$el, 有data
beforeUpdate
updated
beforeDestory
destoryed
vue3: setup,onBeforeMount,onMount,onBeforeUpdate,onUpdated,onUnmount, 如果使用了keep-aliv还会有actived组件激活前，deactived组件激活后
setup中为什么没有beforeCreate和created？？？
### vue子组件和父组件执行顺序
加载渲染:beforeCreate(父)=>created（父）=>beforeCreate(子)=>created(子)=>beforeMount(子)=>mounted(子)=>mounted(父)
更新：beforeUpdate(父)=>beforeUpdate(子)=>updated(子)=>updated(父)
销毁：beforeDestory(父)=>beforeDestory(子)=>destoryed(子)=>destoryed(父)
### v-el作用
提供一个在页面上已存在的dom元素作为Vue实例挂载的目标，可以是css选择器，也可是HTMLElement实例
### vue中el属性和$mount优先级
会先判断是否有el属性，没有就执行vm.$mount，如果有el还会判断是否有template
### vue双向绑定原理
采用数据劫持和发布订阅的方式。
### 如果data里面的数据不做响应式怎么办？
数据放到vue实例外，Object.freeze()
### 如何获取data中某个数据的初始状态？
this.$options.data().num
### 动态给vue的data添加新属性为什么没有响应式？
data里的属性全都在initState函数（created之前）里通过Object.defineproperty实现了响应式，后来加的要通过vue.set实现响应式，或者Object.assign，或者$foreUpdate重新渲染仅影响实例本身和插入插槽内容的子组件，而不是所有组件
### Vue.observable

### 动态指令设置以及动态传参
<child @[someType]="handlerSomeEvent()" :[sompeProps]="100" />
someType: type ? 'click' : 'dbClick'

### vue组件之间参数传递
1：props，$emit父子之间
2: v-model 单选框，复选框等输入控件，父通过v-model传给子，会自动传一个名为value的prop属性，子通过this.$emit('input', val)就能更改父的v-model的值
3：v-solt父子组件单向通信，在实现可复用组件，向组件传入dom节点，html时刻优先考虑v-solt
4: refs、parent、children。refs可以获取子组件实例或者当前元素。this.$parent获取当前组件的父组件实例，this.$children获取当前组件的子组件实例。
5: vuex,跨层级，项目复杂的情况下使用
6：provider和inject，适用于隔代组件通信，不像props，不需要层层传递，适用于封装高阶组件，祖先实例不需要关心哪个后代实例会用到
7：eventBus 中央事件总线：创建一个vue实例挂载到vue原型上，通过这个vue实例通信。会让全局变量的变化不可测,适用于跨层级跨兄弟间通信。
  this.$bus.$emit('clickEvnet', 'aa')
  this.$bus.$on('clickEvnet', data => {})
### provider和inject
实现父组件往深层次子组件传值
父：provide（）{}， 后代：inject:['keyName']

### nextTick原理
在下一次dom更新循环结束后执行延迟回调。获取更新后的dom。
vue是异步执行dom更新的，一旦观察到数据变化就会开启一个队列，然后把在同一个事件循环中观察到数据变化的watcher推送到这个队列，如果这个watcher被触发多次，只会被推送到队列一次
这种缓冲可提升新能。而在下一个事件循环时，vue会清空队列并进行必要的dom更新。
在created操作dom时要放在nextTick中，因为creaded时dom没有进行任何渲染。
### compute和watche区别
computed有缓存，是基于依赖缓存的，只有依赖变化才会重新求值。
watch的依赖是单个的，watch可以是异步的，而computed不行
### filters
过滤器，全局和局部，当命名冲突时以局部过滤器权重高，{{msg | filterMsg}} Vue.filter('过滤器名', (val) => {}) filters: { 过滤器名: (val){]}}

### v-if和v-show
在vue2.x中，v-for的优先级会比v-if的优先高，但在vue3.x中这一判断优先级被换了过来，除此之外v-for和v-if在同一标签中使用也会报错，解决办法可以在外面套一个template标签，或者使用computed来对数组进行过滤然后渲染
### vue中key的原理和必要性
key是每个vnode的唯一id，是diff的一种策略，根据key更准确更快的找到对应的vnode节点。
### 共享组件不会重新渲染问题
我们有时候开发中会把多个路由解析为同一个Vue组件。Vue默认情况下共享组件将不会重新渲染，
如果你尝试在使用相同组件的路由之间进行切换，则不会发生任何变化，此时我们需要传递key来区分，达到刷新的目的
<template>
  <router-view :key="$route.path"></router-view>
</template>

### v-solt
插槽就是子组件使用solt标签定义的预留位置，有name属性叫具名插槽，不设置name属性是匿名插槽。
插槽作用域: <template slot="mysolt" slot-scope="props"></template> 子：<solt name="mysolt" :data="list"></solt>
子组件在作用域上绑定的属性会被挂在父组件v-solt接受的对象上
<solt name="mysolt" test="hh"></solt>  父：<template v-solt:default="slotProps"></template>
v-solt缩写：# 只有默认插槽时可以在标签上使用
默认插槽名为default可以省略default直接写v-solt

### misxins
vue复用组件的一种方式，组件间操作不会污染，组件的methods和components会覆盖混入对象的方法。created和mounted等会被合并调用，混合对象的钩子函数在组件里的钩子函数之前调用。
在mixins里包含异步请求函数的时候，通过直接调用异步函数获取返回数据
mixins更像是对于组件的拓展。
### keep-alive
内置组件，让被包裹的组件保留状态避免重复渲染
include只有名称匹配的组件会被缓存，exclude匹配到的不会被缓存。exclude优先级比include高: <keep-alive :include="['a','b']"></keep-alive>
初始进去：生命周期:beforeRouteEnter->beforeCreate->created->mounted->actived->beforeRouteLeave->deactived
再次进去：生命周期：beforeRouteEnter->actived...->beforeRouteLeave->deactived
### vue常用修饰符
v-model.lazy,v-model.trim, v-model.number,
@click.stop,@click.prevent,@click.self,@click.once, @click.capture,
@click.passive在移动端监听滚动事件时会一直触发onScroll卡顿，用passive修饰相当于给onscroll事件加了.lazy修饰符,
@click.native让坐一会变成像html内置标签一样监听原生事件
@click.keyCode
### 对SPA的理解
仅在页面初始化加载相应的html，css，js，加载完成不会因为用户的操作重新加载或者页面跳转。利用路由机制实现html内容的变换
优点：用户体验好，避免不必要的跳转和重新渲染，前后端分离。
缺点：不利于SEO，首屏加载慢
### class和style如何动态绑定？
对象或者数组 :class="{active:true}" :class="['active']" :style="[styleColor]"
### 怎么理解vue单向数据流？
所以的props都向下传递，父props可以向下传递但是反过来不行，这样会阻止子组件意外更改props
每次父组件更新，子组件的props都会拿到新值，如果子想改父组件的props可以通过this.$emit派发一个自定义事件。
### 父组件可以监听到子组件的生命周期吗？
@hook
<Child @hook:mounted="doSomethig"></Child>
doSomething(){}
子： mounted() {this.$emit('mounted')}
@hook还可以监听其他生命周期

### 为什么new Vue中data是对象，组件中data必须是函数
组件是复用的，js里对象是引用关系，如果组件中data是对象，作用域没有隔离，子组件的data会相互影响，而data是函数，每个实例维护对象的独立拷贝。
new vue中的实例是不会被复用的不存在引用对象的问题
### v-model原理
v-model本质上是语法糖，v-model在内部为不同的输入使用不同属性并抛出不同事件
text和textarea元素使用value属性，input事件
checbox和radio使用checked属性和change事件
select使用value和change事件










### hash模式和history模式和abstract模式
hash模式：浏览器“#”，以及后面的都成为hash，虽然在url后面有#。但是http请求中没有，用来指导浏览器动作，hash不会重加载页面

history：采用h5新特性，提供2个新方法：pushState和replaceSatte对浏览器历史记录栈修改，以及popState事件的监听到状态变更
abstract：支持所有js运行缓存，nodejs，如果发现没有浏览器的API会强制进入这个模式
### vue路由传参
this.$router.push({path: '', params:{}, query: {} })可以通过query和params。也可以直接将参数拼接着url后面，实现动态传参
### vue路由的钩子函数
导航钩子种类：全局导航钩子，组件内钩子，路由独享钩子
  全局的路由钩子：beforeEach，afterEach
  单个的路由钩子：beforeEnter
  组件内的路由钩子：beforeRouteEnter，beforeRouteLeave，beforeRouteUpdate
全局的：
  const router = new VueRouter({...})
  router.beforeEach((to, from, next) => {}) from：当前导航要离开的路由，next一定要调用不然会阻塞路由
  router.afterEach((to, from) => {}) 后置钩子没有next
组件内导航钩子，beforeRouteEnter不能获取组件实例this，因为当守卫执行前，实例还没有被创建出来，剩下2个钩子可以获取组件实例
路由独享的钩子：它是在路由配置上直接定义的，参数的使用和全局前置守卫一样。不同的是路由独享钩子是定义在路由记录汇总，全局路由守卫定义在入口文件
    路由独享守卫只在路由进入时有效，全局路由守卫是所有路由跳转都会被拦截




















### vuex缺点
### mutations和actions为什么要区分
