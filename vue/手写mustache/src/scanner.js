export default class Scanner {
  constructor(templateStr) {
    this.templateStr = templateStr
    this.pos = 0 // 指针
    this.tail = templateStr // 一开始就是模板字符串原文
  }
  scan (tag) {
    // 功能弱，就是走过内容，没有返回值
    if (this.tail.indexOf(tag) === 0) {
      this.pos += tag.length
      this.tail = this.templateStr.substring(this.pos)
    }
  }
  scanUntil (stopTag) {
    const pos_backup = this.pos
    // 开头不是stopTag时
    while(!this.eos() && this.tail.indexOf(stopTag) != 0) {
      // 尾巴开头不是stopTag时候，说明还没扫描到stopTag
      this.pos++
      this.tail = this.templateStr.substring(this.pos) // 改变尾巴为当前字符的开始，到最后的字符
    }
    // 指针扫描，遇到指定内容结束，并且返回结束之前路过的文字
    return this.templateStr.substring(pos_backup, this.pos)
  }
  eos () {
    return this.pos >= this.templateStr.length
  }
}