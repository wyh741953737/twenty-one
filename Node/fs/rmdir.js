const { rmdir, unlink } = require('fs')

// 不能删除非空文件
// rmdir('cc.txt', err => {
//   console.log(err)
// })

// 不能删除非空目录
// rmdir('bbb', err => {
//   console.log(err)
// })

// 删除成功
// rmdir('bbb/index.js', err => {
//   console.log(err)
// })

// ccc是空文件夹可删除
// rmdir('ccc', err => {
//   console.log(err)
// })
// ccc下有空文件a.js不能删除成功报错,也不能删除ccc/a.js会报错
unlink('ccc/a.js', err => {
  console.log(err)
})
rmdir('ccc', err => {
  console.log(err)
})