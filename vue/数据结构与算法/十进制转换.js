function descToBin(decNumber) {
  const statck = new Array()
  while(decNumber > 0) {
    // 获取余数放到栈里
    statck.push(decNumber % 2)
    decNumber = Math.floor(decNumber / 2)
  }
  let str = ''
  while(!statck.isEmpty()) {
    str += statck.pop()
  }
  return str
}