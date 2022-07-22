import React from 'react'
import ReactDom from 'react-dom'
import png from './logo.png'
import data from 'data:text/javascript, export default "title"'
import('./aa')
import('./b') 
import('./c')
import CryptoJs from 'crypto-js'
console.log('=========', CryptoJs.MD5('xixi').toString())
// 非入口模块，在output中配置的打包输入的文件名，如果是chunkIds:natural就是以数字名称打包出去，此时import('./')删了，所有顺序都要变
// chunkIds是named的话会生成src_a_js.js
// chunkIds是deterministic的话会生成414.js，根据文件名称取hash值


console.log(png)
console.log(data)
ReactDom.render(<h1>hhh</h1>, document.getElementById('root'))
