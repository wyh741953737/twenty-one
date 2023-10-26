const { stat } = require('fs')


// 查看文件内容state，判断是否是文件夹
stat('aaa', (err, stat) => {
  console.log(err, stat.isDirectory())
})
// 查看index.js的时候是有内容的所以siza是有值的
stat('aaa/index.js', (err, stat) => {
  console.log(err, '是文件', stat.isDirectory())
})

stat('aaa/index.js', (err, stat) => {
  console.log(err,'是文件', stat.isFile())
})