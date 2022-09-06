const { mkdir } = require('fs')

// 创建文件夹,文件夹
mkdir('./bbb/index.js', err=> {
  console.log(err)
})