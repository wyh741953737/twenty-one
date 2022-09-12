module.exports = function(content) {
  // 直接使用style-loader只能处理样式，样式引入的其他资源比如图片路径，不能处理，需要借助css-loader
  // css-loader暴露了一段js代码，style-loader需要执行js代码得到返回值，再动态创建style标签，插入到页面上
  // style-loader使用pitch loader解决

  console.log('执行normal方法')
  return content
}

module.exports.pitch = function (remainingRequest) {
  console.log('执行pitch', remainingRequest) // F:\study\twenty-one\Webpack\loaderWrite\node_modules\css-loader\dist\cjs.js!F:\study\twenty-one\Webpack\loaderWrite\src\index.css
  // 将remainingRequest中绝对路径改成相对路径，因为后面只能使用相对路径操作
  const relativePath = remainingRequest.split('!').map(absolutePatch => {
    return this.utils.contextify(this.context, absolutePatch)
  }).join('!')
  // 1:引入css-loader处理后的资源
  // 2：创建style，将内容插入
  const script = `
    import style from '!!${relativePath}' // 加上感叹号不会在执行剩下loader的normal方法，一个!表示终止normal，-！表示终止pre和normal， ！！表示终止pre，normal，post
    const styleEl = document.createElement('style')
    styleEl.innerHTML = style
    document.head.appendChild(styleEl)
  `
  return script // 终止后面loader执行
}