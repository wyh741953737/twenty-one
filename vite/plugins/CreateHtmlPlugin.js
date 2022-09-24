module.exports = (options) => {
    return {
        // 转换html的
        // transformIndexHtml: (html, ctx) => { // ctx是当前执行上下文，数据的集合 //         } 写成一个函数太迟了
        transformIndexHtml: {
            enforce: 'pre', // enforce控制插件执行周期，pre从初始化后就开始执行插件，
            transform: (html, ctx) => {
                return html
            }
        }
    }
}