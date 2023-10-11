#!/usr/bin/env node
const parse = require('./parseArgs')
const fs = require('fs')

const { isAll, isList } = parse()
const dir = process.cwd()
let files = [...fs.readdirSync(dir)] || []
let output = ''
console.log(files)
if(isAll) {
  files = files.forEach(file => {
    console.log(fs.statSync(file))
    return file.indexOf('.') !== 0
  })
}
if(!isList) {
  console.log(files)
  // files.forEach(file => output += file+ '      ')
} else {
  files.forEach((file, index) => {
    if(index === files.length-1) {
      output += file 
    } else {
      output += file+ '\n'
    }
  })
}
console.log(output)



