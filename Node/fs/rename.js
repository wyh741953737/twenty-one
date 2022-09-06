const { rename } = require('fs')

// rename('test.txt', 'demo.md', err => {
//   console.log(err) 
// })
// 不能重命名文件夹名称
rename('../fs', '../aa', err => {
  console.log(err)
})

// rename('bb.doc', 'cc.doc', err => {
//   console.log(err) 
// })

// rename('bb.doc', './test/aa.doc', err => {
//   console.log(err)  // 报错
// })