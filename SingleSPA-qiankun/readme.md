iframe适合接入第三方，像路由切换做不到，iframe中子应用切换路由时用户刷新页面（刷的是主应用）就丢失了
webComponent兼容性不好被废弃
2018年，singleSPA，不能动态加载js文件，没有实现样式分离js隔离，没有沙箱机制，做到了将单个应用嵌入到父应用，实现了路由劫持和应用加载
2019年，qiankun基于singleSPA提供了开箱即用API（singleSPA+sandbox+import-html-entry）
2020年，EMP基于module Federation，接入成本低，解决第三方依赖包的问题，乾坤还是要导出bootstrap，mount，unmount等，要改造原有项目

用singleSPA就要用StstemJS，它是一个通用的模块加载器，能在浏览器上动态加载模块，微前端的核心就是加载微应用，将应用打包成模块在浏览器通过systemjs来加载

应用通信：
  基于URL进行数据传递，传递消息的能力弱
  基于CustomEvent实现通信
  基于props主子应用通信
  使用全局变量
  redux通信
公共依赖：
  CDN： externals
  webpack5的联邦模块

### 微前端
- js沙箱机制（子应用之间互不影响，包括全局变量，事件等）
- css样式隔离，切换时装载和卸载
- html入口， 配置入口
- 按需加载，切换到页面时才加载相应的HTML，CSS和JS
- 公共依赖加载， 大部分子应用都用到的资源怎么处理
- 预加载 空闲时间加载子应用资源，用户行为数据支持 
- 父子应用通讯
- 子应用嵌套
- 子应用并行，多个微前端如何同时存在
