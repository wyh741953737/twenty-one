import parseTemplateToTokens from './parseTemplateToTokens'
import nestTokens from './nextTokens'
import renderTemplate from './renderTemplate'

window.TemplateEngine = {
  render (templateStr, data) {
    // 1：先将模板字符串编译成一维数组tokens
    // 2：将一维数组tokens转化成二维
    // 3：将二维数组转化成模板字符串
    const tokensOne = parseTemplateToTokens(templateStr)
    const tokensTwo = nestTokens(tokensOne)
    console.log(tokensTwo)
    const t = renderTemplate(tokensTwo, data)
    console.log(t)
  }
}
