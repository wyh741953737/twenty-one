### webpack
静态资源打包工具，将整个文件编译组合成浏览器能够运行的文件
webpack本身功能有限，开发环境，仅仅能编译js的es模板语法，生产环境不仅能编译es模板语法还能压缩js文件
本身只能处理js，遇到css会报错，其他资源借助loader解析，plugins扩展webpack的功能

npx 将mode_modules中的bin临时添加到环境变量，这样我们可以访问环境变量里的一些应用程序
use执行顺序：从右到左，从下到上
### 处理样式
css-loader: 将css打包到js中（编译成webpack能识别的模块）
style-loader：动态创建style标签形式在页面上生效
less-loader: 将less文件编译成css文件
### 处理图片资源
webpack4时，我们处理图片使用file-loader和url-loader（在file-loader基础上将小于多大的图片转化为base64格式输出）处理，webpack5已经将这两个loader内置到webpack里了，我们只需要简单配置处理图片资源就可以
### 处理字体图标
 {
        test: /\.(ttf|woff2?|map3|map4)$/,
        type: 'asset/resource', // 对文件原封不动的输出
        generator: {
          filename: 'static/media/[hash:8][ext][query]'
        }
      }
### 处理js
babel:兼容性处理，代码格式：eslint，先处理代码格式，再做兼容性处理
 
### eslint
.eslintrc.*多种写法
.eslintrc.js
.exlintrc
在package.json中直接写eslintConfig

