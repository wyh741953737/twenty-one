const { watch } = require('fs')

// 监听文件的变化eventType：change,
watch('./cc.txt', { encoding: 'buffer'}, (eventType, filename) => {
    console.log('哈哈----哈哈哈', eventType, filename)
})

