const { readdir } = require('fs')

readdir('cc.txt', (err,data) => {
  console.log(data)
})