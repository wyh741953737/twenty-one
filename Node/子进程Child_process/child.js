process.on('message', (data) => {
  console.log('子进程接受的消息', data)
})

process.send('哈哈哈')