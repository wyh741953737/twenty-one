/*
 * @Description: 
 * @Author: yourName
 * @Date: 2022-12-19 15:52:34
 * @LastEditors: wunihong
 * @LastEditTime: 2023-01-13 10:42:50
 */
const ejs = require(ejs)
const path = require('path')
const fs = require('fs')

const compile = (template, data) => {
  const templatePosition = `../template/${template}`
  const templatePath = path.resolve(__dirname, templatePosition)
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if(err) {
        console.log(err)
        reject(err)
        return
      }
      resolve(result)
    })
  })
}
 
const writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content)
}
export default {
  compile,
  writeToFile
}