webpack
webpack和webpack-dev-server（服务器插件）版本对应
webpack 3.x 要使用 webpack-dev-server 2.x
webpack 4.x 要使用 webpack-dev-server 3.x
webpack 5.x webpack-cli@4.x

webpack-dev-server相当于webpack+apache，启动一个web服务，目标文件夹看不到编译后的文件，都保存在内存中

webpack 4.41.5
webpack-cli 3.3.10
webpack-dev-server 3.10.1


webpack5最重大改变：1：持久化缓存，2：tree-shaking 3：联邦模块


### 持久化缓存：
缓存生成的webpack模块和chunk来改善构建速度，webpack5默认开启缓存，缓存默认是内存里，可以对cache设置为memory或filesystem。webpack追踪每个模块的依赖，并创建文件系统快照，此快照会和真实文件系统对照，检测到差异，触发对应模块的重写构建（将打包出来的文件缓存做一个快照，在node_modules中的.cache里）
cache配置时，type是filesystem时不要使用cnpm安装。webpack5持久化缓存和cnpm安装包包名有冲突，导致webpack5假死，无法生成缓存

#### 资源模块：是一种模块类型，允许使用资源文件（字体，图标等）而不需配置额外loader
raw-loader =》asset/source
file-loader => asset/resource
url-loader => assets.inline
file-loader 可以指定要复制和放置资源文件的位置，可使用相对路径而不用担心部署时 URL 的问题。webpack 会在打包输出中自动重写文件路径为正确的 URL。
url-loader 允许你有条件地将文件转换为内联的 base-64 URL。如果文件大于该阈值，会自动的交给 file-loader 处理。
require('./banner.jpg') ===》是为了得到图片url，并把图片放到打包文件夹里面，注意并不是把图片导入到JS里面
require 原理其实就是使用 fs.readFile 同步读取文件中的内容做相应解析，默认只支持 js 和 json 文件类型
导入其他的文件类型就无法识别了，所以就报错了。如果有了loader，在配置中读取到 .jpg 结尾要用 file-loader 来处理，那么会把 require('./banner.jpg') 通过特定的语法解析成一个路径 0ac543be9d75debf066.jpg，那么此时 src 变量就是图片路径了。
file-loader 将文件上的 import / require（）解析为 url，并将该文件发射到输出目录中。
url-loader 可以识别图片的大小，把图片转换成base64，如果图片超过设定的现在，就还是用 file-loader来处理。
raw-loader 将文件导入为字符串

#### URIS：
webpack5支持在请求中处理协议，支持data，支持base64或原始编码，MimeType可以在module，rule中被映射到加载器和模块类型

#### moduleIds和chunkIds的优化
每个文件是一个module，文件对应chunk
webpack5之前没有从entry打包的chunk文件，都会以1,2,3...的文件命名方式输出，删除某些文件可能会导致缓存失效。
生产模式下，默认启用这些功能chunkIds:"deterministic"
moduleIds:"deterministic"此算法采用确定性的方式将短数字id，短hash分配给moduleIds和chunkIds。
chunkId设置为determinitic，则output中chunkFilename的[name]会被替换成确定性的短数字id，虽然chunkId不变，但是更改chunk内容，chunkhash还是会变的
可选值：natural（按顺序比如1,2），named（方便调试的可读性id比如src_two_js.js) deterministic（根据模块名生成的hash值)0
#### 移除Node.js的polyfill
webpack4带了许多Node.js核心模块的polyfill，一旦模块中使用了任何核心模块比如crypto，这些模块就会被自动启用
webpack5不再自动引入这些polyfill
#### 更强大的tree-shaking
webpack4本身的tree-shaking本身比较简单，就是找一个import进来的变量，判断变量是否在这个模块中出现过
比如import { A, B} from 'lodash'  export C() { A}, B会被tree-shaking掉
webpack5可以进行根据作用域直接的关系来进行优化
optimization： {
    usedExports: true // 使用到的导出 在开发环境，没使用到的只会被标记为unused harmony，生成环境未用到被干掉
}
#### sideEffects
函数副作用指的当调用函数时，除了返回函数值之外，还产生了附加的影响，例如修改全局变量，严格的函数式语言要求函数必须无副作用
在package.json中配置sideEffect: false表示没有副作用，可以进行tree-shaking
如果css不想tree-shaking可以配置为sideEffect: ['*.css']

#### 联邦模块
动机为了不同开发小组共同开发一个或多个应用

查看webpack配置
开发环境：npx vue-cli-service inspect --mode development
生产环境：npx vue-cli-service insoect --mode production
将输出导入到js文件
开发环境：npx vue-cli-service inspect --mode development >> webpack.cinfig.development.js
生产环境：npx vue-cli-service inspect --mode production >> webpack.cinfig.production.js

webpack默认会生成源代码，不想的话可以再package.json中配置
"build": "cross-env GENERATE_SOURCEMAP=false node script/build.js"

css-loader: css=》webpack能识别
style-loaer：动态创建style放添加到html
less-loader：将less转成css

raw-loader：将文件导入为字符串
file-loader：将文件编译成webpack能够识别的文件原封不动输出，
url-loader：在file-loader基础上增加了小于多大的图片转化成base64格式对图片优化
  asset：在导出一个data URL和发送一个单独文件之间自动选择,限制大小，之前用url-loder实现
  {
    test:/\.txt/,
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 4*1024 // 小于4kb转base64
      }
    }
  }

不同资源去不同目录：output: {filename: 'static/js/mian.js'} 图片配置: filename: 'static/images/[hash:8][txt][query]'
自动清空上次打包：webpack4中需要插件clear-webplack-plugin， webpack5中output配置clean：true
处理字体图标：{test: /\.(ttf|woff2?)$/,type: 'asset/resource',parser: {generator： filename: 'static/media/[hash:8][txt][query]'}}
处理其他图片：音视频 {test: /\.(ttf|woff2?|MP3|mp4|avi)$/,type: 'asset/resource',parser: {generator： filename: 'static/media/[hash:8][txt][query]'}}
处理js：先eslint再babel
  babel:
  babel.config.js
  npm i babel-loader @babel/core @babel-preset-env -D
  presets：预设，一组babel插件扩展babel功能，@babel/preset-env允许使用最新js @babel/preset-react编译jsx预发 @babel/preset-typescript编译ts语法的预设
  eslint:
  1: new EslintPlugin({context: path.resolve(__dirname, 'src')})
  2:.eslintrc.js 
  babel做语法转换时。要babel转换后注入一些函数才能正常工作（加函数声明，称为辅助函数。如果每个转换后的文件都注入相同的函数声明会
  代码体积，可以将这些函数声明放到一个npm包里，要使用的时候直接引用这个包。@babel/runtime就是其中一个，将所有语法转换会用到的辅助函数都集成到一起，
  但是该插件要手动引入辅助函数。@babel/plugin-transform-runtime自动移除语法转换后内联辅助函数，使用@babel.runtime/helpers里的辅助函数替代减少手动引入的麻烦
  1.每个转换后的文件上部都会注入这些相同的函数声明，那为何不用webpack一类的打包工具去掉重复的函数声明，而是要单独再引一个辅助函数包？
    webpack在构建的时候，是基于模块来做去重工作的。
    每一个函数声明都是引用类型，在堆内存不同的空间存放，缺少唯一的地址来找到他们。
    所以webpack本身是做不到把每个文件的相同函数声明去重的。
    因此我们需要单独的辅助函数包，这样webpack打包的时候会基于模块来做去重工作。
@babel/preset-env智能预设处理兼容性，但是async，promise等无法处理，此时要用到core-js，专门做es6以上的兼容。
完整引入：直接引入，体积大
按需加载：import 'core-js/es/promise' 只引入用到的
自动引入：配置@babel/preset-env
    module.exports = {
        presets: [
            ["@babel/preset-env", {
                useBuiltIns: "usage", // 按需加载
                corejs: 3 // 指定core的版本            
            }]        
        ]    
    }

html-webpack-plugin: template：../index.html
webpack-dev-server自动化 devServer: {host: 'localhost', port:8080, open:true自动打开浏览器} 开发模式下没有任何输出，内存中编译打包（不会生成dist目录）

生产模式：
绝对路径回退一层（打包上线后，外面套了一层）
npm webpack serve --config ./config/webpack/dev.js 启动命令，--config指定配置文件在哪里

css被打包到js文件中，js加载时会动态创建script标签生成样式，体积大，闪屏，应该提取css为单独文件，用link加载
mini-css-exact-plugin 将style-loader改成MiniCssExactPlugin.loader
new MiniCssExtractPlugin({
  filename: "static/css/main.css"
})

css兼容性：postcss-loader
npm i postcss-loader postcss(postcss-loader依赖于postcss也要下载) postcss-preset-env（给postcss解决兼容问题）
要放在css-loader下面，less-loader上面
{loader: 'postcss-loader',options: {postcssOptions: {plugin: ['postcss-preset-env']}}} 能解决大多数兼容性问题
package中配置兼容性做到哪种程度
  browserlist: [
    "last 2 version",
    ">1%", 覆盖99%的浏览器
    "not dead"
  ]
压缩css：webpack4中有optimize-css-assets-webpack-plugin
        webpack5中是CssMinimizerWebpackPlugin
html压缩：开始生产环境js和html就会开启压缩

提升开发体验
sourcemap：源码映射，
eval
cheap:只关心行不关心列
inline：行内，不生成单独文件

开发模式：cheap-module-source-map 优点：打包速度快，只包含映射，缺点是没有列映射’
生产模式：source-map 优点是包含行、列映射，缺点是打包编译速度慢

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map'
}
HMR：devServer中hot：true开启模块热替换，只编译打包改变的模块
    style-loader默认实现了HMR，js需要判断是否支持热替换，if(module.hot) { module.hot.accept(./js/a)} 只更新a模块
    实际开发中，我们会使用vue-loader和react-hot-loader来解决，自动实现模块热替换
oneof：匹配到就不再检测后面的loader，module: {rules: [{oneOf: []}]}
cache：缓存，每次打包时js都有经过eslint检测和babel编译，速度慢，缓存让第二次打包速度更快
    babel：{test:/\.js$/, options: {cacheDirectory: true，cacheCompression：false}} // 开启babel缓存，关闭缓存文件压缩（压缩要时间速度慢）
    eslint：new EslintPlugin({cache:true, cacheLocation: path.resolve(_dirname, '../node_modules/.cache/eslintcache})
多进程打包：对于js文件而言，主要是eslint，babel，Terset工具，要提升他们的运行速度，特别耗时操作才开多进程，进程启动要600ms
    启动进程数量就是我们cpu的核数，
    const os = require('os')nodejs核心模块直接使用
    const threads = os.cpus().length // cpu核数
    {test:/\.js$/, use: [{loader: 'thread-loader', options: {works: threads}}]} // 开启多进程
    new EslintPlugin({cache: true, cacheLocation: path.resolve(__dirname, './node_modules/.cache/eslintcache', threads}) // eslint开启多进程
    new TerserWebpackPlugin({parallel: threads}) // 压缩js开启多进程
压缩也可以放到minizer里面做
    webpack5自带TerserWebpackPlugin
    optimization: {
      minimizer: {
        new CssminimizerPlugin()
        new TerserWebpackPlugin({
        parallel: true // 开启多进程
        extractComments: true // 将注释剥离到单独文件中
    }}}
减少代码体积：tree-shaking依赖js模块化
生产环境：webpack默认已经开启了这个功能，
减少babel体积：babel会为编译的每个文件插入辅助代码，让体积变大，你可以将这些辅助代码作为一个独立模块避免重复引入
    @babel/plugin-transform-runtime禁用babel自动对每个文件的tuntime注入
    {loader：“babel-loader"， options：{cacheDirectory：true，cacheCompression：false，plugins：['@babel/plugin-transform-runtime']}} // 减少代码体积

压缩图片：
    本地静态图片才需要压缩，image-minimizer-webpack-plugin imagemin
    无损压缩：imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo
    有损压缩：imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo
    配置
    new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminGenerate,
                options: {
                    plugins: [
                        ["gifsicle": {interlaced:true}],
                        ['jpegtran', {progressive: true}],
                        ['optipng', {optimizationLevel: 5}],
                        ['svgo', {
                            plugins: ['preser-default', 'prefixIds', {name: 'sortAttrs', params: {xmlnsOrder: 'alphabtical'}}]                        
                        }]                    
                    ]                
                }            
            }
    })
代码分割：打包到一个文件体积太大，若只渲染首页就应该只加载首页js，代码分割生成多个js，渲染哪个就加载哪个。
    多入口打包肯定会输出多个文件，
    多入口使用了同一个方法，要提取公共模块，
    optimization: {
        splitChunks: {
            chunks: 'all', // 对所有模块都进行分割
            cacheGroups: { // 组，哪些模块要打包到一个组
                defaultVendors: {
                 test: /[\\/]node_mdules[\\/]/, // 需要打包到一起的模块
                 priority: -10, // 权重
                 reuseExistingChunk：true                   
                },
                default: {
                    minSize: 0, // 定义提交多大就会被打包进来
                    pripority: -20,
                    reuseExistingChunk: true                
                }
            }        
        }    
    }
按需加载，动态导入：
document.getElementById('btn').onclick = function() {
    import('./count').then(res => {}) // import动态导入，将导入的文件代码分割，拆分为单独模块，使用时自动加载 
    import(/* webpackChunkName: "match"' */ './count').then(res => {}) // import动态导入，将导入的文件代码分割，拆分为单独模块，使用时自动加载  
    给代码分割模块命名，还需要在配置文件的output中配置
}
output: {
    chunkFilename: 'static/js/[name].chunk.js' // 代码分割打包的文件名，打包输出的其他文件命名
}
单入口代码分割：
    配置一个入口，
    optimization: {
        splitchunks: {
            chunks: 'all' // 单入口这样配置就可以了        
        }    
    }
统一命名：
output: {
    assetModuleFilename: 'static/media/[hash:10][txt][query]' // 图片，字体等通过type: asset处理资源命名方式
}
preload：浏览器空闲时候加载
    preload：立即加载，prefetch：空闲时候加载，都只会加载资源并不执行，都有缓存
    preload加载优先级更高，只加载当前页面用到的资源，prefetch加载优先级低，也可加载下一个页面用到的资源
    兼容性差，preload相对于preetch兼容性好一点
    可以使用：@vue/preload-webpack-plugin
    new PreloadWebpackPlugin({
        rel:'preload',
        as:'script'    // 做为script标签优先级去做，优先级最高可用style
    })
缓存：
a文件依赖于b文件，b文件改变由于a文件依赖它导致啊也变了，
runtimeChunk：在optimization中配置runtimeChunk：{name: entrypoint => `runtime~${entrypoint}`}将文件间依赖关系提取成单独文件
contenthash：一个文件改变，希望就只有这个文件的缓存失效，怎么做到的？contenthash，根据文件内容输出，文件内容变化，文件名才变，
同时，runtimeChunk可以将文件之间依赖值提取成单独文件保管，

PWA：渐进式网络应用程序，离线访问，内部通过service workers实现
    npm i workbox-webpack-plugin -D
    new WorkboxWebpackPlugin.GenerateSW({
        clientClaim: true,
        skipWaiting: true    
    })
    在main.js中注册
    if('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js').then(registration => {
                console.log('SW registered'，registration)            
            }).catch(err => {
                console.log('SW registed failed')            
            })
        }))    
    }
    但是还是会加载失败，因为script是://localhost:8800/ervice-worker.js找不到，要保证项目运行根目录就是dist（打包后叫dist）
    所以还需要安装service，专门获取静态资源服务器的。
    之后控制台执行service dist就能启动开发服务器，来部署dist目录下所有资源。这样就能直接访问serice-worker
    兼容性不太好
    
    提升开发体验：
        1：使用source-map让代码报错位置准确
    提升构建速度：
        1：使用HMR只重新编译打包有变化的代码
        2：oneOf匹配到一个loader就不继续遍历
        3：inclde和exclude排除或者只检测某些文件
        4：cache对eslint和babel处理结果进行缓存
        5：thread多进程处理eslint和babel任务
    减少代码提交：
        1：tree-shaking，剔除没用的代码
        2：@babel/plugin-transform-runtime对babel处理，将辅助代码提取
        3：image minimizer对图片压缩，体积小，请求速度快。
    优化代码运行性能
        1：代码分割，import动态导入按需加载
        2：prefetch和preload提前加载
        3：network cache对资源文件更好命名，将来做缓存
        4：core-js，对js兼容性处理，运行在低版本浏览器
        5：PWA离线访问
        


plugin工作原理：
    webpack在编译过程中会触发一系列Tapable的钩子事件，插件所做的就是找到对应钩子，往上面挂自己的任务，也就是注册事件
    当webpack构建时，插件注册的事件会随钩子的触发而执行
    钩子hooks：本质是事件
    Tapable为webpack提供统一的插件接口，它是webpack的核心功能库
    tapable统一暴露了3个方法给插件，用于注入不同类型的自定义构建行为
    tap：可注册同步和异步钩子
    tapAsync: 注册异步
    tapPromise：promise方式注册异步钩子
plugin构建对象：
    compiler保存完整的webpack配置，该对象在首次启动webpack时创建。
    compiler.options获取配置
    compiler.inputFileSystem和compiler.outputFileSystem进行文件操作，相当于nodejs中的fs
    compiler.hooks可以注册tapable的不同种类的hook，从而在compiler生命周期中植入不同的逻辑
    compilation：代表一次资源的构建，compilation实例可以访问所有模块和模块间依赖
    一个compilation对象会构建依赖图中所有模块进行编译，编译阶段，模块会被加载load，封存seal，优化optimize，分块chunk，哈希hash和重新创建restore
    compilation.modules 可访问所有模块



webpack生命周期：
1：创建compiler对象，里面保存着完整的webpack配置
2：执行compiler.run
3: 执行compiler.compilation创建compilation对象
4：compiler.make
5：执行compilation钩子
6：compiler.afterCompile()
7：compiler.emit
8：compiler.emitAeests
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 plugin执行插件的contructor
2：webpack创建compiler对象
3：遍历所有plugins中插件，调用插件的apply方法
4：执行剩下编译流程，触发各个hooks事件


### 模块化
1：文件划分方式，每个文件就是一个模块
    缺点：命名冲突，全局作用域被污染，没有私有空间（模块内的成员都可被外部访问或者修改），无法管理模块间的依赖关系，在维护过程中很难分辨每个成员的所属模块
2：命名空间，约定每个模块只允许暴露一个全局对象，所以模块成员要被挂到这个全局模块当中。解决了命名冲突问题，但是其他问题还在
3：IIFE立即执行函数，为模块提供一个私有空间，暴露到外部的成员可以挂载到全局对象的方式实现。带来了私有成员的概念，私有成员只能在模块内通过闭包访问。
4：IIFE依赖参数：通过参数声明模块所依赖的模块，让模块间的依赖关系更加明显 (function($) {console.log($)})(jquery)
以上是早期没有工具和规范下对模块化实现的落地方式（模块的加载还没解决，都是通过script的形式将模块引入到页面中，意味着模块的加载不受代码控制的，时间久了维护起来很麻烦）
    比如html中依赖模块A，忘了引入。
    更为理想的方式是在页面中引入一个js入口文件，其余用到的模块都可以通过代码控制，按需加载
为了统一不同开发者，不同项目之间的差异，需要制定一个行业标准去规范模块化的实现方式
针对模块加载问题要实现2个需求：一个统一的模块化标准规范，一个可以自动加载模块的基础库

commonJS规范：nodejs中遵循的模块化规范：一个文件就是一个模块，每个模块都有单独作用域，通过module.exports导出成员，再通过require函数载入模块
在浏览器端直接使用这个规范会出现一些问题，commonjs是以同步的形式加载模块，node执行机制中，启动时加载模块，在代码执行过程中是使用模块所以这种同步方式不会出现问题
浏览器同步会引起大量同步请求，导致应用运行效率低
早起制定前端模块化标准时，并没有直接选择commonjs规范，而是专门为浏览器重新设计了一个规范AMD（asynchronous Module definition)即异步模块定义规范
同期退出require.js除了实现了AMD模块化规范，本身也是很强大的模块加载器
