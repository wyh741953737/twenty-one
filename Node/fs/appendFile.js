const { appendFile } = require('fs')

appendFile('test.txt', '创建文件并写入内容你好啊', err => {
  console.log(err)
})
appendFile('./test/test.txt', '创建文件并写入内容你好啊', err => {
  console.log(err) // 报错，./test不存在
})