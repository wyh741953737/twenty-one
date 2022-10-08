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
缓存生成的webpack模块和chunk来改善构建速度，webpack5默认开启缓存，缓存
默认是内存里，可以对cache设置为memory或filesystem。webpack追踪每个模块的依赖，并创建文件系统快照，此快照会和真实文件系统对照，检测到差异，触发对应模块的重写构建（将打包出来的文件缓存做一个快照，在node_modules中的.cache里）
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
chunkId设置为deterministic，则output中chunkFilename的[name]会被替换成确定性的短数字id，虽然chunkId不变，但是更改chunk内容，chunkhash还是会变的
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
生产环境：npx vue-cli-service inspect --mode production
将输出导入到js文件
开发环境：npx vue-cli-service inspect --mode development >> webpack.config.development.js
生产环境：npx vue-cli-service inspect --mode production >> webpack.config.production.js

webpack默认会生成源代码，不想的话可以再package.json中配置
"build": "cross-env GENERATE_SOURCEMAP=false node script/build.js"

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
postcss：编译样式文件（嵌套函数变量）成原生css，再将高级css降级，最后前缀补全（-webkit-)
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

开发模式：cheap-module-source-map 优点：打包速度快，只包含行映射，缺点是没有列映射’
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
    @babel/plugin-transform-runtime禁用babel自动对每个文件的runtime注入
    {loader：“babel-loader"， options：{cacheDirectory：true，cacheCompression：false，plugins：['@babel/plugin-transform-runtime']}} 
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
    chrome有4种缓存：http cache，memory chache，service-worker，push cache，
    preload和prefetch都存在http chache上
    preload：提前加载，prefetch：空闲时候加载，都只会加载资源并不执行，都有缓存
    preload加载优先级更高，只加载当前页面用到的资源，prefetch加载优先级低，也可加载下一个页面用到的资源
    兼容性差，preload相对于prefetch兼容性好一点
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
### webpack工作流程
1：将webpack.config.js的配置文件和shell参数合并
2：创建compiler对象，compiler内部会实例化Tapable的钩子事件
3：注册插件，插件会有个apply方法会去执行compile.run方法开始编译
4：获取入口文件，找到匹配的loader处理文，调用parse将文件处理成ast，编译的过程会收集当前模块的依赖，递归编译入口的依赖模块，将编译后的模块加入到this,modules中，将编译结束后的模块添加到this.entries
5：构建chunks，通过this.modules和this.emtries依赖生成chunks，根据chenks生成assets保存：{[文件名]:[文件内容]}，根据asstts输出编译文件到硬盘


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
### 如何加速webpack打包进程
开发环境：
生产环境：
### 如何提取公共模块
多入口打包后体积大，相同模块在不同入口没得到复用，bundle直接独立，我们要将公共模块抽离单独打包
webpack4自动使用splitChunks对资源进行拆分
optimization: {
    splitChunks: {
        chunks: 'async',
        minSize: 2000,
        cacheGroups: {
            vendor: {
                test: '/react|lodash' //匹配到就提取chunk
            },
            default： {

            }
        }
    }
}
Dellplugin和DellReferencePlugin插件组合完成，会将配置的公共代码或者第三方包，先打包出来并生成mainfest.json文件
还需要用htmlwebpackIncludeAssetsPlugin将公共js库插入到html
### webpack打包流程
1：初始化参数阶段：将webpack.config.js读取的配置参数和shell命令进行合并得到最终的打包配置参数
2：开始编译阶段，调用webpack返回一个compile方法，创建compile对象，并且注册各个webpack plugin，找到入口中的entry代码，调用compile.run进行编译
3：模块编译阶段：从入口模块进行分析调用匹配文件的loader对文件进行分析，同时分析模块依赖的模块，递归进行编译
4：完成编译阶段：在递归完成后，每个引用模块通过loaders处理完成得到模块间的互相依赖关系
5：输出文件阶段：整理模块依赖关系，同时将处理后的文件输出到output磁盘中。
