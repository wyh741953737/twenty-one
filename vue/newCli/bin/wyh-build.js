#!/usr/bin/env node
// intense：强烈的，激烈的，严肃紧张的，有强烈感情或者想法的，尖锐的
// intensity：n，强烈，紧张，剧烈，强度
const { Command, Option } = require('commander')
const pkg = require('../package.json')
const program = new Command()
program.name('wyh')
       .description('这是我测试的脚手架')
       .version(pkg.version, '-v, --version', 'output your version')
      //  .option('--first').option('-s, --separtor <char>')
program.command('split')
       .description('split string to array')
       .argument('<argument >', 'string to split')
       .option('--first', 'display just the first substring')
       .option('-s, --separtor <char>', 'separtor char', ',')
       .option('-e, --extra', 'extra for something')
       .option('-a, --add <string>', 'extra for something')
       .option('-l, --letter [letters...]', 'specify letters') // [可选]
       .action((args, options) => {
        console.log(options)
         const limit = options.first ? 1 : undefined // 执行：wyh split a,b,c --first 得到['a'], 执行：wyh split a,b,c 得到['a','b','c']
         console.log(args.split(options.separtor, limit))   
       })
program.command('test')
       .addOption(new Option('-s, --select', 'select something').hideHelp( ))
       .action((options, cmd) => {
        console.log(cmd.optsWithGlobals())
       })
program.parse()

const options = program.opts() // opts获取当前实例的options
const globalOptions = program.optsWithGlobals() // 获取全部的options
console.log('====', globalOptions)
console.log('----', options)

// const limit = options.first ? 1 : undefined

// console.log('-3----', program.args, options.separtor) // [], test
// console.log(program.args[0].split(options.separtor, limit))

