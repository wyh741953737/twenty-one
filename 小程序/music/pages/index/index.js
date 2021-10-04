// index.js
// 获取应用实例
import {request} from '../../utils/util'
const app = getApp()

Page({
  data: {
    bannerlist: [
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

    ],
    recommendList: []
  },

  async onLoad() {
  //  const data = await request('https://localhost:3000/getbanner', {})

  let index = 0;
  let result= []
    // while(index < 5) {
    //   let data = await request('https://localhost:3000/', {id: index++})
    //   result.push(data)
    // }
  },
})
