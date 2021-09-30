### assets和static存放区别
assets与static都是存放静态资源
assets会打包（压缩体积，代码格式化）后放在static跟着index.html上传到服务器
static由于没有打包体积相对大，建议将template需要的样式文件放在assets，第三方源文件放在static，因为第三方文件已经处理，不需要再处理直接上传

### vue常用修饰符
事件修饰符：stop阻止冒泡事件，prevent阻止默认事件，once只执行一次，capture捕获事件，self只触发自己范围内事件不包含子元素

### vue的核心
数据驱动：viewModel保证数据和视图一致，组件系统：应用类UI可看作全部是由组件树组成

### delete和Vue.delete区别
delete被删除元素变成empty/undefined，其它元素键值不变，vue.delete直接删除了数组，改变了数组键值

### SPA首页加载慢
懒加载，CDN资源

### vue-router跳转和location.href区别
location.href简单，但是刷新了页面
history.pushState无需刷新页面，静态跳转，
router.push用了diff算法，实现了按需加载，减少dom的消耗

### slot
父组件要在子组件某个地方放dom，放在哪显示由slot分发

### 根据vue-cli，vue项目打包了一个js，一个css
### vue里面router-link在电脑上有用，在安卓上没反应怎么解决？
vue路由在安卓机上有问题，babel问题安装babel polypill插件解决
### vue2中注册router-link上事件无效，在IE和firefox中路由不跳转
使用@click.native，原因是router-link会阻止click事件，.native指的是监听一个原生事件
只用a标签不使用button标签，方法2：button标签和router.navigate方法
### axios特点
支持promiseAPI
支持请求和响应拦截
转换请求和响应数据
取消请求
自动转换json，
axios发送的字段参数是data和params两个，区别是params跟着请求地址一起发送，data作为请求体发送，params适用于get请求，data适用于post，put请求

### vue初始化页面闪动
在vue初始化之前，div是不归vue管的，所以我们写的代码在还没有解析情况下会出现花屏现象，看到类似于{{message}}。解决：在css加上[v-clock] {dispaly: none}，如果没有彻底解决，在根元素style="siaplay：none" :style="siaplay:block"

### 
beforeCreate: new一个vue实例后，只有默认的生命周期和默认事件，data和methods，$el未初始化
create：模板渲染成html前调用，data和methods都初始化了，可调用methods中方法,$el还没初始化
beforeMount：$el初始化了，在内存中编译好了模板，还没挂载到页面，data.message还没有替换
mound：vue实例初始化完成，进入运行阶段，可操作dom
beforeUpdate：页面数据是旧的，data中数据是新的，页面和数据没有同步
updated：页面和数据同步
beforeDestory：data，methods，指令，过滤器都可用
destoryed：不可用

### 
state数据存放
getters从基本数据派生出的数据
mutation：提交更改数据的同步方法
actions：像一个装饰器，包裹mutations使之异步
mudules模块化vuex

### 模块化
ES6模块化：浏览器和服务端通用的模块化规范
