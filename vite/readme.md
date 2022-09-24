vite是基于es module的，vite关注浏览器的开发体验
webpack更关注兼容性，支持多种模块化。

webpack会将所有的依赖解析完（因为支持多种模块化必须要同意模块化代码） ，并且打包后才开启开发服务器
vite是先开启开发服务器，根据entry按需加载

vite是基于es module的，但是像axios其他库是遵循commonjs规范导出的
依赖预构建：首先vite会找到对应的依赖，然后调用esbuild（对js语法进行处理的库），将其他规范转换成es module规范，然后放到当前目录下的/node_modules/.vite/deps
依赖与构建解决了3个问题：
1）不同第三方包会有不同导出格式（vite无法约束别人）
2）对路径的处理可以直接用.vite/deps，方便路径重写
3）网络多包传输性能问题（比如一个库lodash，lodash会依赖其他包，我们加载lodash的时候是通过get请求，如果通过node_modules，会发出涩会发出成千上万的请求。者也是原生es module不敢支持node_modules的原因。
vite重写：就是将某个模块导进来的模块内容写道当前模块。
有了依赖预构建后，无论有多少额外export和import，vite都会尽可能的将他们集成一个或几个模块。

vite.config.js
module.exports = {
    optimizeDeps: {
        exclude: ['lodash-es'] // 这样会将lodash-es中依赖的模块全都通过http请求请求回来。
    }
}

vite.config.js可写成es module规范是因为vite在读取vite.config.js时会先用node解析文件的语法，如果发现是es module规范会直接将你的es module规范进行替换变成commonjs规范。

node读取的是字符串，用replace将import和exports替换

vite内置了docenv这个库，这个库会自动读取.env文件，并解析出文件中对应的环境遍历，将其注入到process对象下
但是vite考虑到和其他配置的一些冲突问题，他不会直接注入到process上。）root和envDir（vite.config.js可能会配置envDir，如果不是env文件那读了.env文件也没用）
vite提供了补偿措施：调用vite的loadEnv手动确认env文件

process.cwd:返回node进程的工作目录

.env: 所有环境都要用到的环境变量
.env.development:开发环境要用大的
.ev.production: 生产环境要用到的

当我们用loadenv的时候：
1：找到.ev文件，解析环境变量，并放到一个对象
2：将传进来的mode拼接.env[mode]，并根据提供的目录解析放到一个对象。
如果是客户端，vite会架构对应的环境变量注入到import.meta.env里去。


vite为了避免将隐私性的环境变量注入到客户端，做了拦截。如果你的环境变量不是以VITE开头的就不会注入到import.meta.env上
如果想要更改这个VITE前缀，可以在配置文件中用envPrefix配置

vite是怎么让浏览器识别.vue文件的？
浏览器不会管network是不是以.vue结尾，而是看content-type
如果是vue文件，会做一个字符串替换：content.toString().find('<template></template>')
如果匹配到了直接全部进行字符串替换
AST语法分析-》Vue.createElement创建真实dom

yarn create实际上就在安装create-vite脚手架，然后用脚手架的指令去构建项目
yarn create vite my-vue-app --template vue

### vite天生支持css文件的直接处理
1：vite在读取到main.js中引用到的index.css，
2：直接用fs读取index.css标签内容
3：创建style标签，将index.css中文件直接copy进style标签
4：将style标签插入到index.html的head中
5：将该css文件中的内容直接替换为js脚本（方便热更新或者css模块化）同时设置content-type为js，从而让浏览器以js脚本的形式来执行该css
后缀的文件。

类名重复问题：css-module：将文件名写出index.module.css以module.css结尾。就开启了css模块化
会将所有类名比如.footer替换成_footer_i22st_1,同时创建一个映射对象{footer: '_footer_i22st_1'}
将替换后的内容放到style标签里插入到head，将index.module.css内容全部替换成js脚本，
将创建的映射对象在脚本中默认导出。 

### less
安装了less后，可以在控制台npx lessc index.module.less 执行
加上math="always"表示对括号内的内容计算,比如margin: (100px/2) 得到margin：50px

### vite天生对postcss有良好的支持
yarn add postcss-li postcss -D
执行：npx postcss index.css -o result.css // -o表示output，输出为result.css
postcss.config.js用来配置postcss，执行npx postcss的时候就会读这个文件

预设：帮你一次性的把这些必要插件都装上。process-preset-env帮你把很多包都装好了
postcss.config.js
module.exports = {
    plugins: [postcssPresetEnv(/* pluginOptions */)]
}
### vite处理静态资源
除了动态api，大部分是静态资源。在其他工具里，json文件导入会作为一个json字符串形式存在，vite会以对象存在
如果你在文件中引入lodash，你只用了其中一个方法
import _ from 'lodash'
_.deepClone() // 这样构建工具会认为你全都要，不敢删。

### alias原理
在node里。读取vite.config.js不需要fs读取（不需要返回客户端）
const viteConfig = require('./vite.Config')
function resolveAlias(alias, JSContent) {
    const entries = Object.entries(alias)
    let lastContent = JSContent.toString() // 将Buffer转换
    entries.forEach(i => {
        const [alias, path ] = i // alias中'@': './src'/ 拿到的ath是src的绝对路径
        const srcIndex = path.indexOf('/src')
        const realPath = path.slice(srcIndex, path.length0)
        lastContent = JSContent.replace(alias, realPath)
    })
    return lastContent
}
alias最终做的就是字符串替换
### vite处理svg
import svg1 from './a.svg?raw'
document.body.innerHtml = svg1 // 这样可以改变svg的颜色
document.getElementByTagName('svg')[0].onmouseenter = function()  {
    this.style.fill = 'red'
}

### vite对静态资源生产环境处理
生产环境打包后，找不到原来资源，webpack要配置baseURL: '/'控制打包后的index.html为绝对路径
打包后的静态资源为什么要有hash？
浏览器缓存机制，只要静态资源名称不变，就直接用缓存
### vite插件
插件就是在vite生命周期的不同阶段调用插件达到某个目的

vite将很多核心插件内置了，

vite-plugin-mock这个插件用来mock数据，依赖于mockjs，这个插会去查找src下的mock文件夹
### 优化：
js逻辑：清楚副作用，requestAnimationFrame和requestIdleCallback，浏览器频率，每帧16.6ms，如果js执行超过16.6ms出现掉帧。（执行js逻辑，重绘，渲染）requestIdleCallback传一个函数进去
数据很大的时候不用arr.forEach用lodash的forEach
构建优化：压缩，tree-sharking，图片资源压缩，cdn，分包。。。
懒加载，http优化缓存， 