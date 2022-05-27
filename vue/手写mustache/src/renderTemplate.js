import lookup from "./lookup"
import parseArray from './parseArray'
export default function renderTemplate(tokens, data) {
  let result = ''
  for(let i = 0; i < tokens.length; i++) {
    let token = tokens[i]
    if(token[0] === 'text') {
      result += token[1]
    } else if(token[0] === 'name') {
      result += lookup(data, token[1])
    } else if(token[0] === '#') {
      result += parseArray(token, data)
    }
  }
  return result
}