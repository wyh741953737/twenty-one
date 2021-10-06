// index.js
// 获取应用实例
import {request} from '../../utils/util'
const app = getApp()
let startY = 0;
let distance = 0;

let moveY=0;
Page({
  data: {
    bannerlist: [
      {
        id: 0,
        url: '/static/images/v1.jpg'
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
    recommendList: [],
    coverTransform: 'translateY(0)',
    coverTransition:'',
  },

 onLoad() {
  //  const data = await request('https://localhost:3000/getbanner', {})

  let index = 0;
  let result= []
    // while(index < 5) {
    //   let data = await request('https://localhost:3000/', {id: index++})
    //   result.push(data)
    // }
    
  },

  
handleTouchStart(e) {
  startY = e.touches[0].clientY;
  this.setData({
    coverTransition: '',
    name: '',
    tel: ''
  })
},
handleTouchMove(e) {
  moveY = e.touches[0].clientY;
  distance = moveY - startY;
  if(distance <= 0) {
    return
  }
  if(distance >= 60) {
    distance = 60
  }
  this.setData({
    coverTransform: `translateY(${distance}rpx)`
  })
},
handleTouchEnd(e) {
  this.setData({
    coverTransform: `translateY(0rpx)`,
    coverTransition: 'transform 1s linear'
  })
},
handleInput(event) {
  const type = event.currentTarget.dataset.type;
  this.setData({
    [type]: event.detail.value
  })
},
login() {
  console.log(this.data)
},
})
