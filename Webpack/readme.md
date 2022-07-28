###
webpack默认会生成源代码，不想的话可以再package.json中配置
"build": "cross-env GENERATE_SOURCEMAP=false node script/build.js"

css-loader: css=》webpack能识别
style-loaer：动态创建style放添加到html
less-loader：将less转成css

raw-loader：将文件导入为字符串
file-loader：将文件变异成webpack能够识别的文件原封不动输出，
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
处理js：