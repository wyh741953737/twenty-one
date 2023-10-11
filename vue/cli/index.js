#! /usr/bin/env node

console.log('成功了')
const program = require('commander')
const helpOptions = require('./lib/core/help')
const createCommand = require('./lib/core/create')

  // 查看版本号
program.version(require('./package.json').version, '-v, --version')

helpOptions()
createCommand()
program.parse(process.argv)