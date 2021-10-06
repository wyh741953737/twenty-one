import config from './util'

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const request = (url, data={}, method="GET") => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${config.host}${url}`,
      data,
      method,
      success: (res) => {
        const result = [
          {
            id: 0,
            url: '/static/images/5.jpg'
          },
          {
            id: 1,
            url: '/static/images/v1.jpg'
          },
          {
            id: 2,
            url: '/static/images/v2.jpg'
          },

        ]
        resolve(result)
      },
      fail: (reason) => {
        reject(reason)
      }
    })
  })
}
module.exports = {
  formatTime,
  request
}
