export default function(templateString) {
  let index = 0
  let rest = ''
  const startTagReg = /^\<([a-z]+[1-6]?)\>/
  const endTagReg = /^\<\/([a-z]+[1-6]?)\>/
  const stack1 = []
  const stack2 = [{children: []}]
  const wordReg = /^([^\<]+)\<\/[a-z]+[1-6]?\>/ // 结束标签前的文字
  while(index < templateString.length -1) {
    rest = templateString.substring(index)
    if(startTagReg.test(rest)) {
      const tag = rest.match(startTagReg)[1]
      stack1.push(tag)
      stack2.push({'tag': tag, 'children': []})
      index += tag.length + 2
    } else if(endTagReg.test(rest)){
      const tag = rest.match(endTagReg)[1]
      let pop_tag = stack1.pop()
      if(tag !== pop_tag) { // 此时tag一定是和栈1顶部相同的
        throw new Error('标签位闭合')
      } else {
        const pop_arr = stack2.pop()
        if(stack2.length > 0) {
          stack2[stack2.length - 1].children.push(pop_arr)
        }
      }
      index += tag.length + 3
    } else if(wordReg.test(rest)) {
      const word = rest.match(wordReg)[1]
      if(!/^\s+$/.test(word)) { // 检测收尾是的是空格
        stack2[stack2.length-1].children.push({'text': word, 'type': 3}) 
      }
      index += word.length
    } else {
      index++
    }
    // 自封闭标签检测
  }
  return stack2[0].children[0]
}