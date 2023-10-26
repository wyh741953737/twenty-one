/*
 * @Description: 
 * @Author: yourName
 * @Date: 2022-12-19 14:38:58
 * @LastEditors: wunihong
 * @LastEditTime: 2022-12-19 15:16:29
 */

const { spawn } = require('child_process')
const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args)
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
    childProcess.on('close', () => {
      resolve()
    })
  })
}
module.exports = {
  commandSpawn
}