const { readFile } = require('fs')
// 读取文件
readFile('cc.doc', (err, data) => {
  console.log(err, data.toString()) // 直接data是二进制看不懂，可以toString
})