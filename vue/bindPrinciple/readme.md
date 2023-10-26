Vue特点：
1）渐进式：你能将Vue作为应用的一部分嵌入其中
2）虚拟DOM
3）MVVM： view - viewModel-model view层：视图层，通常就是dom层。model：数据层。 viewModel:视图模型层（Vue实例），是view和model沟通的桥梁，实现了数据绑定和dom监听
4）组件化模式，提高代码复用率，好维护
5）声明式编码，无需操作dom
el和mount： el: 在new里面写el:'#app'  v.$mount('#app')
data的函数写法和对象：Vue管理的函数不要使用箭头函数
Object.defineProperty定义的属性默认不可枚举，Object.keys()不能列举
Object.defineProperty可以实现一个简单的数据代理
methods中配置的函数，this指向vm或者组件实例对象
事件修饰符： once,prevent, stop, capture,passive，self：只有event.target是当前操作的元素时才触发, passive：事件默认行为立刻执行，无需等到事件回调执行完毕
事件修饰符可以连用：@click.stop.prevent=""
比如滚轮滚动事件：当你绑定了事件处理函数demo，鼠标滚轮动时会先执行demo，然后执行鼠标默认行为：将滚动条往下移动一点，demo函数内部执行很大的for循环，事件比较长，就会卡顿
加了passive之后，会先执行鼠标往下移的行为，在执行demo函数。
不是所有事件都有这个问题，比如scroll事件不加passive也会先执行默认事件再执行demo。passive一般可以用于移动端
事件流默认捕获-目标阶段-冒泡
键盘事件：keydown，keyup， @keyup.enter中enter修饰符就可以在enter时候触发，delete删除，esc：退出，tab换行，（tab，ctrl，alt， shift：系统修饰键必须配合keydown使用
计算属性：底层用了Object.defineProperty提供的getter和setter，get函数会在初次读取和依赖数变化时调用，和methods相比，内部有缓存机制（复用），效率更高。计算属性最终会在vm上
计算属性完整写法：get(){}, set(){}, 只读不改可以简写
监听属性：immediate:true 初始化时让handler调用一下 {immediate：true, handler(newVal, oldVal) {}  deep: 深度监听
computed能完成的watch都能完成，watch能完成的computed不一定能完成，比如watch可以进行异步操作。
类名绑定：正常样式正常写,变化的类名绑定，class="normal" :class="change"，变化的时候，改变change的值change可以是字符串也可以是数组
数组适用于个数和名字不确定的时候，也可以是对象：要绑定的个数，名字都确定，但要动态决定用不用
样式绑定也可以是字符串，对象，数组
key的作用：key是虚拟dom对象的标识，当数据变化，vue会根据新数据生成新的虚拟dom，新旧虚拟dom差异比较：
1）旧虚拟dom找到与新虚拟dom相同key，如果dom中内容没变，直接使用之前的真实dom，如果虚拟dom变了，则生成新的真实dom，随后替换页面中之前真是的dom
2）旧虚拟dom中没找到新虚拟dom相同的key，创建新的真实dom，随后渲染到页面
用index可能会：若对数据进行逆序增删等破坏顺序的操作，会产生没必要的真是dom更新，如果结构中还包含输入类的dom会产生错误的dom更新
过滤器：filter 对数据进行格式化后显示  filters: { timeFormater(value) { return 'haha' } }  在结构中:<div>{{time | timeFormater}}</div>  过滤器第一个参数就是管道符前面的参数
Vue内置指令：
1:v-html和 2:v-texl区别：v-html会替换节点中所有内容，{{xx}}不会，v-html可以识别html结果，v-html有安全性问题，在网站上动态渲染任意html是很危险的，容易导致xss攻击
一定要在可信的内容上使用-html，永不要用在用户提交的内容上。
3: v-clock：当你网速很慢的时候，可以将未经解析的模板隐藏，要配合css使用<div v-clock>{{name}}</div>   在css中[v-clock] { display: none }
4: v-once: 所在节点在初次动态渲染后，就被视为静态内容，以后数据改变不会引起v-once所在结构的更新，可以用于性能优化
5：v-pre： 跳过其节点的编译过程，可利用他跳过没有使用指令语法，没有使用插值语法的节点，加快编译
自定义指令：实现v-big指令： directives: { big(element， banding) {  } }  big函数调用时机：指令与元素绑定时（一上来，没有放到页面）2：指令所在的模板被重新解析时
指令写成函数只会在上面2个时机调用，写成对象的时候：bing(){} 指令与元素成功绑定时调用， inserted(){}指令所在元素被插入页面时调用，update(){}指令所在模板被重新解析时调用
写成函数也就是简写，只执行了bind，update两个函数。
Vue生命周期：init Lifecycle:初始化事件，生命周期，但数据代理还没开始 ---》 beforeCreate：无法通过vm访问到data数据，methods方法 ----》init injections和reactivity：初始化数据监测和代理
--------》created：可以通过vm访问到data中的数据，methods中的方法 ------》判断是否有el选项？有---是否有template选项，都有，编译template成render函数，没有template就将el代表的（div内元素）为template。如果没有el选项，手动执行vm.$mount(el)去挂载， 判断是否有el的时候vue开始解析模板，生成虚拟dom（内存中）页面还不能显示解析好的内容
beforeMount：页面呈现未经vue编译的dom结构，所有对dom的操作都不生效（后面会创建$el并且替换el，所以最终不生效）===》create vm.$el并且替换el，将内存中虚拟dom转化为真是dom插入页面----》mounted，页面呈现经过vue编译的dom，对dom的操作都有效，尽可能避免，一般在这开启定时器，发生请求，订阅绑定事件 ---- 》beforeUpdate：此时数据是新的，页面是旧的，未同步，根据新数据生成新虚拟dom与旧虚拟dom比较完成更新，挂载流程不涉及新旧dom ，更新的时候有新旧dom树，-》updated：数据页面都是新的 ----》beforeDestory：vm中所有data，method，指令都处于可以状态，马上要执行销毁过程
模块：向外提供特定功能的js程序，一般就是一个js文件，作用：复用，简化js编写，提高js运行效率
data必须写成函数，避免组件复用时数据存在引用关系
VueComponent：你定义一个组件，本质是VueComponent的构造函数，是Vue.extend生成的，vue帮我们执行new VueComponent(options),每次调用Vue.extends返回都是一个全新的VueComponent、
组件配置中，data，methods，watch，compouted中的this都是VueComponent， new Vue配置中，data，methods中的this是Vue实例
Vue.extend = function(extendOptions) { const sub = function VueComponent(options) { this._init(options)  return Sub  }
内置关系： VueComponent.prototype.__proto__ === Vue.prototype 可以让组件实例对象VC可以访问到Vue原型上的属性，方法
残缺版Vue.runtime.xxx.js运行时版本，new Vue中options中不能写template，没有模板解析器
完整版Vue.js，包含核心功能+模板解析器
ref: ref写在子组件中是VueComponent， 通过document.getElememtById取到的是子组件html元素
mixin: 可以将多个组件公用的代码抽离，实现代码复用，在配置项中：mixins:[xxxx]. 也可以全局引入Vue.mixin(xx)
插件：plugins本质上对象吗，要有install方法，vue会帮你调用， plugin可以增强vue， plugin第一个参数是vue，后面自己传参
scoped：样式覆盖看引入的顺序，import A， B，这样A,B中有相同类名，B会覆盖A的样式。其实就是给最外层div加了一个data-v-xxxx，xxx是随机数，配合属性选择器.demo[data-v-xxx] {} 实现
但是App组件不适用scoped，会全局生效
组件自定义事件：一种组件间通信的方式，适用于子组件===》父组件不能实现兄弟间
绑定自定义事件1：this.$emit('事件名',事件参数）子传父， 父传子：props， props也可以是函数，子组件中接收后调用
绑定自定义事件2：ref。父组件引用了子组件<Student ref="student' /> 父组件mounted内部： this.$refs.student.$on('getName', this.getStudentName)，监听子组件getName事件触发后调用this.getStudentName方法
通过ref事件绑定灵活性强
用第一种事件绑定，当模板解析的时候，@augui=“getStudentName” 就绑定好了，如果需求是等ajax请求回来后再绑定，第一种写法就做不到，第二种可以将绑定放定时器上
解绑自定义事件： this.$off('getName')解绑一个 this.$off(['xx', 'xxx])解绑多个， this.$off()解绑所有
组件绑定原生DOM事件：父组件给子组件绑定原生click事件时， 要加native修饰
全局事件总线：实现任意组件间通信。要符合什么条件才能实现事件总线？
一般跨层级时候用，不用一层层传
1：所有人都能看见，
vue.prototype == VueComponent.__proto__ 所以可以将事件总线定义在Vue的原型上。放在window上不行，放在VueComponent上，因为VC是通过Vue.extend生成的，每次都不一样
2：能调用到$on, $off, $emit
vc中this能够调用到$emit,$on因为这些都挂载在vue的原型上。我们将它挂到vm上
new Vue({ el:'#app', render: h=>h(App), beforeCreate() { Vue.prototype.$bus = this } )
在组件中：this.$bus.$on('hello', ()=> {}) 自定义组件的时候没有在销毁时解绑，因为组件销毁，vc都没了.自定义事件没了
但是全局事件总线建议 在组件销毁的时候注销事件，因为当前组件销毁，但是事件总线还在
全局事件总线就是自定义事件，只是给$bus绑定的， 也就是vm
消息订阅与发布：pubsub，安装一下：npm i pubsub-js
pubsub.subscribe('haha', () => {})
pubsub.public('haha', 555)
$nextTick: 在下一次dom更新结束后执行指定的回调。vue不会数据变就立马去解析模板，比如input获取焦点，使用时机：要基于更新dom后执行某些操作，要在nextTick中执行
Vue动画：<transition> v-enter-active:进入时候激活的样式，v-leave-active:离开动画  每个国度还可以取名字比如hello， 样式中要用hello-enter-active
transition最后没有形成真正的dom元素 v-enter:进入起点， vv-enter-to：进入的终点。 v-leave:离开的起点。 v-leave-to离开的终点
vue动画给了6个样式名，进入三个：进入的起点v-enter，进入时：v-enter-active， 进入的终点：v-enter-to
多个动画使用transition-group，，里面的每个元素都要匹配一个key
第三方集成的：animate.css  安装： npm i animate.css
页面中引入：import ’animate.css'
在<transition-group appear name="animate__animated animate__bounce" enter-active-class="animate_swing">
ajax请求： 都是基于xhr， jquery封装了xhr， axios基于promise支持请求拦截和响应拦截体积小，fetch和xhr是同级的，也是基于promise但是会返回2层promise，fetch兼容性不好，ie不兼容。vue-resource插件，发请求的库
代理：cors实现跨域，后端配置。jsonp借助script只能get前后端要配合。代理服务器：服务器之间打交道不用ajax，ajax是前端技术，服务器用http。nginx 
vue-cli能够开启代理服务器：devServer: { proxy: 'http://loalhost:5000' }
方式二：devServer: { proxy: { '/api': { target: 'xxx', ws: true, changeOrigin: true},pathRewrite: { '^/atguigu': '' '}  changeOrigin用于控制请求头中的host，默认是true
插槽：作用：让父组件可以向子组件指定位置插入html结构，也是组件间通信方式父==》子。
默认插槽，具名插槽：v-slot：footer只能用在template中。老的用slot=”footer“，
作用域插槽：数据在组件自身，但根据数据生成的结构需要组件的使用者决定，外侧必须包裹template，<template scope="{hello}"> {{games}----{{gae}}</template> 新写法：<template solt- ="{games}">
作用域体现在：父组件没有数据，是子组件传过来的。
Vuex：集中式管理，任意组件通信方式。多个组件依赖同一状态，或者来自不同的行为需要变更同一状态



Vue数组实现响应式原理：
改写了数组的7个方法：push，pop，shift，unshift，splice，sort，reverse
通过Object.setPrototypeof(value, arrayMethods)

什么是依赖？
vue1.x细粒度依赖，用到数据的dom都是依赖
vue2.x中等粒度依赖，用到数据的组件是依赖
在getter中收集依赖，在setter中触发依赖

dep类和watcher类
依赖就是watcher，只有watcher触发的getter才会收集依赖，哪个watcher触发了getter就把哪个watcher收集到dep中
dep使用了发布订阅模式，数据变化会循环依赖列表，将所有的watcher都通知一遍
watcher将自己设置到全局的一个指定位置，然后读取数据，因为读取了数据就会触发这个数据的getter，在getter中就能得到当前正在读取数据的watcher，并吧watcher手机到dep中
每个Observer的实例，成员中都有一个Dep的实例
，watcher是一个中介，数据发生变化时通过watcher中转，通知组件
