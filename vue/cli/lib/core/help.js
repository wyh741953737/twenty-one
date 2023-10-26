/*
 * @Description: 
 * @Author: yourName
 * @Date: 2022-12-19 13:55:25
 * @LastEditors: wunihong
 * @LastEditTime: 2022-12-19 13:58:59
 */
const program = require('commander')

const helpOptions = () => {
  // 增加自己的options
  program.option('-w --wyh', 'a why cli')
  program.option('-d --dest <dest>', 'a destination floader, 例如： -d /sec/components')
  program.option('-f --framework <framework>', 'your framework')
  program.on('--help', function() {
    console.log('other')
    console.log('  other options')
  })
}
module.exports = helpOptions
