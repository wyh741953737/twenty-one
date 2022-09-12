const { unlink } = require('fs')

// 删除文件
// unlink('cc.doc', err => {
//   console.log(err)
// })

// ccc下有空文件a.js不能删除
// unlink('ccc', err => {
//   console.log(err)
// })

// ccc/a.js空文件能删除
unlink('ccc/a.js', err => {
  console.log(err)
})

// unlink只能删除文件
// rmdir只能删除空文件夹