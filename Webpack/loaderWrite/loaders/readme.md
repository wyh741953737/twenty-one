loader的api：
1：this.async: 异步回调，返回this.callback
2：this.callback 可以同步或者异步的调用并返回多个结果
3：this.getOptions（schema）获取loader的options
4：this.emitFile(name, content,sourceMap)产生一个文件
5：this.utils.contextify(context, request) 返回一个相对路径
6：this.utils.absolutify(context, request)返回一个绝对路径
