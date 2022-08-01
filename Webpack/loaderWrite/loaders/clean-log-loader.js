module.exports = function(context) {
  return context.replace(/console.log\(.*\);?/g, '')
}