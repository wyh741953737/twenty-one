import lookup from "./lookup"
import parseArray from './parseArray'
export default function renderTemplate(tokens, data) {
  let result = ''
  // 循环tokens
  for(let i = 0; i < tokens.length; i++) {
    let token = tokens[i]
    if(token[0] === 'text') { // 如果token[0]是text，直接拼接返回
      result += token[1]
    } else if(token[0] === 'name') { // 如果token[0]是name，说明是变量，通过lookup函数得到结果拼接返回
      result += lookup(data, token[1])
    } else if(token[0] === '#') { // 如果token[0]是'#'说明是循环，通过parseArray函数得到结果拼接返回
      result += parseArray(token, data)
    }
  }
  return result
}