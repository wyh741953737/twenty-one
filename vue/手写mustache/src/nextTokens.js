// 将tokens折叠，一维数组变成二维数组
export default function nestTokens(tokens) {
let resultTokens = []
let collector = resultTokens // 循环过程中改变collector指向
let stack = [] // 利用stack模拟入栈出栈操作
  for(let i = 0; i < tokens.length; i++) {
    const token = tokens[i] // token，下标为0的是类型，为1的是值，为2的是子token
    switch (token[0]) {
      // 如果token[0]是'#'说明是循环数组
      case '#':
        collector.push(token) // resultTokens和collector此时指向同一个引用地址)
        stack.push(token) // token入栈
        collector = token[2] = [] // 将收集器collector的指向变成当前token的第3项
        break;
      // 如果token[0]是'/'，说明循环结束
      case '/':
          stack.pop() // 当前token出栈
          // 若stack长度大于0，说明还有循环，收集器collector指向上一个token的第2项
          collector = stack.length > 0 ? stack[stack.length-1][2] : resultTokens 
          break
      default:
        collector.push(token)
    }
  }
  return resultTokens
}