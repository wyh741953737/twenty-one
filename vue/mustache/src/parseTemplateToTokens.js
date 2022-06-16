import Scanner from './scanner.js'

export default function parseTemplateToTokens(templateStr) {
  const tokens = []
  // new一个Scanner的实例，拥有scan，scanUntil和eos方法
  const scanner = new Scanner(templateStr)
  let words
  while(!scanner.eos()) { // 通过while循环，扫描模板字符串，若words不为空
    words = scanner.scanUntil('{{') // ，截取'{{'之前的字符串
    if(words != '') {
      tokens.push(['text', words]) // 将截取的字符串words添加到tokens数组中
    }
    scanner.scan('{{') // 利用scan跳过'{{'的长度
    words = scanner.scanUntil('}}') // 截取{{XXX}}之间的字符串
    if(words != '') {
      if(words[0] === '#') { // ，判断words[0]是否是'#'，'#'说明是循环数组
        tokens.push(['#', words.substring(1)])
      } else if(words[0] === '/') { 
        tokens.push(['/', words.substring(1)])
      } else {
        tokens.push(['name', words])
      }
    }
    scanner.scan('}}') // 截取完之后跳过'}}'的长度，开启下一次循环
  }
  return tokens
}