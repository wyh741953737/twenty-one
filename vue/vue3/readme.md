createApp内部会得到app，app上有很多方法，比如mount后，还会写mount方法
调用mount后，得到proxy并返回出去



动态参数、属性
<p :[attributeName]="id"></p>
<button @click="attributeName='class'">改变属性</button>
动态事件
<button @[mouseEvent]="attributeName='class'">改变属性</button>
<button @click="mouseEvent='mouseover'">改变属性</button>

为什么methods中可以直接使用this
 
 watch中immediate，deep，对象不开启deep就监听不到，用了deep的话，会有性能开销，用字符串，比如'user.name'

v-model:本质是2个操作
1：v-bind绑定一个value属性
2：v-on给当前元素添加一个input事件
<input type="text" :value="msg" @input="changeValue">
changeValue(e, val) {
  e.target.value = val
}

<input type="checkbox" v-model="checked">
<h1>{{checked}}</h1> 单个勾选框，v-model为布尔值

多个勾选框 v-model之后就不需要加上 name 属性了
<input type="checkbox" v-model="fruits" value="苹果">
<input type="checkbox" v-model="fruits" value="榴莲">
<h2>{{fruits}}<h2>

lazy：失去焦点后才同步输入框内容
trim：去除2端空格


props，$emit
$refs, 子组件通过$parent拿到父组件。子组件通过$root拿到根组件


插槽：父模板里所有内容都是在父级作用域中编译的，子模板的所有内容都是在子作用域中编译的


provide,inject默认不是响应式的，如果想变成响应式，可以通过传递一个ref property或者reactive给provide实现
provide(){
  return {
    // listLength: this.list.length 
    // listLength: ()=>this.list.length
    listLength: Vue.computed(()=>this.list.length)
  }
}
子组件：
inject:['listLength']

 
 组合式api：好处：将单个逻辑关注点代码收集在一起
  setup会在组件被创建之前执行（取代beforecreate和create）,一旦props被解析完成，它将被作为组合式api入口，
  setup里不要使用this，找不到，setup发生在data，computed属性或者methods解析之前，
  errorCaptured     on~
  renderTracked     on~
  renderTriggered   on~
  actived           on~
  deactived         on~

setup(props, context)setup中数据不是响应式的，props是响应式的不能通过解构获取，会让props失去响应式。不能const {id}=props 必须：const {id}=toRefs(props)
注意：====如果props中的title是可选的prop。toRefs不会为title创建一个ref，你要使用toRef代替。const title = toRef(props, 'title') // console.log(title.value)]
context是一个普通的js对象，暴露了其他可能在setup中有用的值。$attrs, $slots,$emi t,expose
setup函数还可以返回一个渲染函数，return ()=>h('div', [renderNumber.value, book.title])
defineProps（{}）
返回一个渲染函数会阻止我们返回任何其他东西，但是，万一我们想将这个组件的方法通过模板ref暴露给父组件就不一样了，我们可以通过expose解决，给expose传递一个对象，其中定义的属性可以被外部访问
expost({increment}) // 父组件中可以通过ref访问到increment

通过impoty { ref } from 'vue'让任何响应式变量在任何地方生效
const counter = ref(0)
counter.value++ // 1
ref接收参数并将其包裹在一个带有value属性的对象返回，为了保持js中不同数据类型的行为统一，js中number或string是通过值而非引用传递的
从setup返回的refs在template中访问时候会被自动浅解包的，所以不需要<div>{{username.value}}</div> 直接<div>{{usename}}</div>

ref为值创建了一个响应式引用
setup中定义应用类型使用reactive，setup中不要使用结构，会失去响应式。使用toRefs可以使结构后的数据重新获得响应式
return { msg, ...toRefs(userInfo)} 

vue2的watch，computed都是选项式api，vue3是组合式api
watch在setup中 
watch(num, （newVal, oldVal) => {}, {deep:ture, immediate:true}) // 监听普通属性,只能监听指定属性
watch(()=>obj.num, (val)=>{})
watchEffect(() => {console.log(use.name)}) //watchEffect立即执行。watchEffect在初始化的时候就会执行一次进行依赖收集，不需要指定要监听的属性

const formatCount = computed(() => {}) // 返回一个带有value属性的对象
  
  setup中只能访问props，attrs，slots，emit。无法访问data，computed，methods，refs。因为在setup执行的时候data，computed，methods，refs都是没有的
    
  setup语法糖: <script setup>  与普通的<script>只在组件被首次引入时执行一次不同，<script setup>会在每次组件实例被创建时执行
  顶层的绑定会被暴露给模板

  vue3中路由，setup中拿不到this.$route,需要通过useRoute().query.id
 正则匹配传参: path:'/news/:id*'  path:'/news/:id?'

 命名视图：
 {
  path: '/home/:id',
  alias: 'Home', // 别名
  components: {
    default: Home,
    ListSidebar,
    RightSidebar 
  },
  props: true,可以在页面中通过props的形式获取路由传参而不是this.$route.params，注意：命名试图有多个component，props需要为对象{defaule: true,ListSidebar:false}
 }

 <script setup>中必须使用defineProps和defineEmits来声明props和emits，
 hash模式：这部分url不会被发送到服务端，也就是不会请求， h5,模式下，如果服务器没有配置，用户直接访问就会得到404，解决就是在服务器加一个简单的回退路由，如果url不匹配任何静态资源，提供和应用程序中index.html相同的页面
 
 import AutoImport from 'unplugin-auto-import' 自动导入ref或者reactive

 兄弟组件传值：mitt， npm i mitt  
 const emitter = mitt()
 emitter.emit('xxx', ()=>{})
 emitter.on('xxx', ()=>{})

teleport:传送， 使用场景：