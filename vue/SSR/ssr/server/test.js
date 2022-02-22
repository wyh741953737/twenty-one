const express = require('express')
const server = express()
const Vue = require('vue')
const favicon = require('serve-favicon')
const path = require('path')
const { createRenderer } = require('vue-serve-renderer')
const renderer = createRenderer()
server.use(favicon(path.join(__dirname, '../public/favicon.ico')))

server.get('*', (req, res) => {
  const template = req.url.substr(1) || 'index'
  const buffer = fs.readFileSync(path.join(__dirname))
})

server.listen(3000, () => {
  console.log('server Listen')
})