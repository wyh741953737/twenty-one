// 处理数组
import renderTemplate from "./renderTemplate"
import lookup from "./lookup"
export default function parseArray(token, data) {
  let v = lookup(data, token[1])
  console.log('00000000000000000000', v)
  let resultStr = ''
  for(let i = 0; i < v.length; i++) {
    resultStr += renderTemplate(token[2], v[i])
  }
  return resultStr
}