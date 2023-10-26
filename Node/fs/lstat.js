// lstat和stat类似，除非path是一个符号链接，则自身就是该链接，它指向的并不是一个文件
const { lstat } = require('fs')

lstat('cc.txt', (err, lstat) => {
  console.log(err, lstat)
})