// 将tokens折叠，一维数组变成二维数组
export default function nestTokens(tokens) {
  let resultTokens = []
  let collector = resultTokens
  let stack = []
  for(let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    switch (token[0]) {
      case '#':
        collector.push(token)
        stack.push(token)
        collector = token[2] = []
        break;
      case '/':
        stack.pop()
        collector = stack.length > 0 ? stack[stack.length-1][2] : resultTokens
        break
      default:
        collector.push(token)
    }
  }
  return resultTokens

}