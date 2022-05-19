export default class Scanner {
  constructor(templateStr) {
    this.templateStr = templateStr
    this.pos = 0 // 指针
    this.tail = templateStr // 一开始就是模板字符串原文
  }
  scan () {
    // 功能弱，就是走过内容，没有返回值
    this.pos += 2
    
  }
  scanUntil (stopTag) {
    while(this.tail.indexOf(stopTag) === 0) {
      // 尾巴开头不是stopTag时候，说明还没扫描到stopTag
      this.pos++
      this.tail = this.templateStr.subStr(this.pos) // 改变尾巴为当前字符的开始，到最后的字符
    }
    // 指针扫描，遇到指定内容结束，并且返回结束之前路过的文字
     
  }
}