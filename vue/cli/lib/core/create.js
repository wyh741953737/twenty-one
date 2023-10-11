/*
 * @Description: 
 * @Author: yourName
 * @Date: 2022-12-19 14:02:13
 * @LastEditors: wunihong
 * @LastEditTime: 2022-12-19 16:18:22
 */
const program = require('commander')
const  { createProjectAction, addCpnAction } = require('./actions')
const createCommand = () => {
  program.command('create <project> [others...]')
  .description('clone a registory into a floader')
  .action((project, others) => {
    createProjectAction(project, others)
  })
  program.command('addcpn <name>')
  .description('add vue component，例如：')
  .action((name) => {
    addCpnAction(name, program.dest || 'src/components')
  })
}

module.exports = createCommand