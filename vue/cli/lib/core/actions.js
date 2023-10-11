/*
 * @Description: 
 * @Author: yourName
 * @Date: 2022-12-19 14:06:32
 * @LastEditors: wunihong
 * @LastEditTime: 2023-01-13 11:51:52
 */
const { promisify } = require('util')
const {vuePepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')
const download = promisify(require('download-git-repo'))
const open = require('open')
const { compile, writeToFile } = require('../utils/utils')
const path = require('path/posix')

const createProjectAction = async (project) => {
  console.log('正在为您创建项目~')
  // clone项目 download-git-repo
  await download(vuePepo, project, { clone: true})
  // 2:执行npm i
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['install'], {swd: `./${project}`})
  // 3： npm run serve
  commandSpawn(command, ['run', 'serve'], {cwd: `./${project}`}) // 阻塞，1：打开浏览器要放在npm run serve前面或者不用await就会先执行后面代码
  // 4：打开浏览器
  open()
}
// 添加组件的action
const addCpnAction = async (name, dest) => {
  // 1：有对应的ejs模板
  // 2：根据对应的ejs模板编译result
  const result = await compile('vue-component.ejs', {name, lowerName: name.toLowerCase()})
  // 3：将result写入到.vue文件
  const targetPath = path.resolve(dest, `${name}.vue`)
  writeToFile(targetPath, result)
  // 4：放入对应的文件夹
  
}
module.exports = {
  createProjectAction,
  addCpnAction
}