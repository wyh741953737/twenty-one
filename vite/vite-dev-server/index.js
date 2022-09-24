const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const app = new Koa()

app.use(async(ctx) => {
    console.log('ctx=====', ctx)
    if(ctx.request.url === '/') {
        // 要找根路径东西，
        const indexContext = await fs.promises.readFile(path.resolve(__dirname, './index.html'))
        console.log(indexContext)
        ctx.response.body = indexContext // 作为响应体发给请求者
        ctx.response.set('Content-Type', 'text/html')
    }
    if(ctx.request.url === '/mai.js') {
        // 要找根路径东西，
        const indexContext = await fs.promises.readFile(path.resolve(__dirname, './main.js'))
        console.log(indexContext)
        ctx.response.body = indexContext // 作为响应体发给请求者
        ctx.response.set('Content-Type', 'text/javascript')
    }
})
 
app.listen(5000, () => {
    console.log('服务端启动了')
})