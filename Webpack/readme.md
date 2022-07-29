####
webpack和webpack-dev-server（服务器插件）版本对应
webpack 3.x 要使用 webpack-dev-server 2.x
webpack 4.x 要使用 webpack-dev-server 3.x

webpack-dev-server相当于webpack+apache，启动一个web服务，目标文件夹看不到编译后的文件，都保存在内存中

webpack 4.41.5
webpack-cli 3.3.10
webpack-dev-server 3.10.1


webpack5最重大改变：1：持久化缓存，2：tree-shaking 3：联邦模块
联邦模块：
持久化缓存：
缓存生成的webpack模块和chunk来改善构建速度，webpack5默认开启缓存，缓存默认是内存里，可以对cache设置为memory或filesystem。webpack追踪每个模块的依赖，并创建文件系统快照，此快照会和真实文件系统对照，检测到差异，触发对应模块的重写构建（将打包出来的文件缓存做一个快照，在node_modules中的.cache里）
cache配置时，type是filesystem时不要使用cnpm安装。webpack5持久化缓存和cnpm安装包包名有冲突，导致webpack5假死，无法生成缓存

资源模块：
是一种模块类型，允许使用资源文件（字体，图标等）而不需配置额外loader
  raw-loader =》asset/source导出资源的源代码
  file-loader => asset/resource发送一个单独的文件并导出url
  url-loader => assets.inline导出一个资源的data url
  raw-loader 将文件导入为字符串
  url-loader 将文件作为 data URI 内联到 bundle 中
  file-loader 将文件发送到输出目录
  file-loader 可以指定要复制和放置资源文件的位置，可使用相对路径而不用担心部署时 URL 的问题。webpack 会在打包输出中自动重写文件路径为正确的 URL。
  url-loader 允许你有条件地将文件转换为内联的 base-64 URL (当文件小于给定的阈值)，这会减少小文件的 HTTP 请求数。如果文件大于该阈值，会自动的交给 file-loader 处理。
require('./banner.jpg') ===》是为了得到图片的路径，并把图片放到打包文件夹里面，注意并不是把图片导入到JS里面，如果你了解 require 原理，其实就是使用 fs.readFile 同步读取文件中的内容做相对应的解析，默认只支持 js 和 json 文件类型，导入其他的文件类型就无法识别了，所以就报错了。如果有了loader，在配置中读取到 .jpg 结尾要用 file-loader 来处理，那么会把 require('./banner.jpg') 通过特定的语法解析成一个路径 0a8258fdc76b3a6c543be9d75debf066.jpg，那么此时 src 变量就是图片路径了。
file-loader 将文件上的 import / require（）解析为 url，并将该文件发射到输出目录中。
url-loader 可以识别图片的大小，把图片转换成base64，如果图片超过设定的现在，就还是用 file-loader来处理。

URIS：
webpack5支持在请求中处理协议，支持data，支持base64或原始编码，MimeType可以在module，rule中被映射到加载器和模块类型

moduleIds和chunkIds的优化
每个文件是一个module，chunk：webpack最终打包生成的代码块，代码会生成文件，文件对应chunk
webpack5之前没有从entry打包的chunk文件，都会以1,2,3...的文件命名方式输出，删除某些文件可能会导致缓存失效。
生产模式下，默认启用这些功能chunkIds:"deterministic"
moduleIds:"deterministic"此算法采用确定性的方式将短数字id，短hash分配给moduleIds和chunkIds。
chunkId设置为determinitic，则output中chunkFilename的[name]会被替换成确定性的短数字id，虽然chunkId不变，但是更改chunk内容，chunkhash还是会变的
可选值：natural（按顺序比如1,2），named（方便调试的可读性id比如src_two_js.js) deterministic（根据模块名生成剪短的hash值)
移除Node.js的polyfill
webpack4带了许多Node.js核心模块的polyfill，一旦模块中使用了任何核心模块比如crypto，这些模块就会被自动启用
webpack5不再自动引入这些polyfill
更强大的tree-shaking
webpack4本身的tree-shaking本身比较简单，就是找一个import进来的变量，判断变量是否在这个模块中出现过
比如import { A, B} from 'lodash'  export C() { A}, B会被tree-shaking掉
webpack5可以进行根据作用域直接的关系来进行优化
optimization： {
    usedEports: true // 使用到的导出 在开发环境，没使用到的只会被标记为unused harmony，生成环境未用到被干掉
}
sideEffects
函数副作用指的当调用函数时，除了返回函数值之外，还产生了附加的影响，例如修改全局变量，严格的函数式语音要求函数必须无副作用
在package.json中配置sideEffect: false表示没有副作用，可以进行tree-shaking
如果css不想tree-shaking可以配置为sideEffect: ['*.css']
联邦模块
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
  webpack5有资源模块类型(asset module type)通过添加4种新类型替换上面loader  
  asset/resource发送一个单独文件并导出URL，之前用file-loader实现
  asset/inline导出一个资源的dataURI，之前用url-loader实现
  asset/source 导出资源源代码，之前用raw-loader实现
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
style-loader默认实现了HMR，js需要判断是否支持热替换，if(module.hot) { module.hto.accept(./js/a)} 只更新a模块
实际开发中，我们会使用vue-loader和react-hot-loader来解决，自动实现模块热替换
oneof：匹配到就不再检测后面的loader，module: {rules: [{oneOf: []}]}
cache：缓存，每次打包时js都有经过eslint检测和babel编译，速度慢，缓存让第二次打包速度更快
babel：{test:/\.js$/, options: {cacheDirectory: true，cacheCompression：false}} // 开启babel缓存，关闭缓存文件压缩（压缩要时间速度慢）
eslint：new EslintPlugin({cache:true, cacheLocation: path.resolve(_dirname, '../node_modules/.cache/eslintcache})
多进程打包：对于js文件而言，主要是eslint，babel，Terset工具，要提升他们的运行速度，特别耗时操作才开多进程，进程启动要600ms
启动进程数量就是我们cpu的核数，
const os = require('os')nodejs核心模块直接使用
const threads = os.cpus().length // cpu核数
{test:/\.js$/, use: [{loaser: 'thread-loader', options: {works: threads}}]} // 开启多进程
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

