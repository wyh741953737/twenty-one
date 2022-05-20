import Scanner from './scanner'

window.TemplateEngine = {
  render (templateStr, data) {
    // 模板字符串编译成tokens
    // 实例化一个扫描器
    const scanner = new Scanner(templateStr)
    let tokens = []
    while(scanner.pos != templateStr.length) {
      const token = scanner.scanUntil('{{')
      scanner.scan('{{')
      console.log(token)
      tokens.push(['text', token])
    }
    console.log('------', tokens)
  }
}
