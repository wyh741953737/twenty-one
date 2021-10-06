// pages/video.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navList: [
            {
                id:0,
                text: '推荐'
            },
            {
                id:3,
                text: '万有引力'
            },
            {
                id:4,
                text: '猜你喜欢'
            },
            {
                id:5,
                text: '本周热取'
            },
            {
                id:6,
                text: '每日推荐'
            }
        ],
        videoList1: [],
        selectedId: 0,
        videoContext: '',
        vid: '',
        videoUpdateTime: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // wx.showLoading({
        //   title: '',
        //   mask: true
        // })
        this.setData({
            videoList1:  [
                {
                    id: 'b1',
                    url: 'http://vfx.mtime.cn/Video/2019/03/17/mp4/190317150237409904.mp4',
                    text: '测试视频0',
                    img: '/static/images/v1.jpg'
                },
                {
                    id: 'c2',
                    url: 'http://vfx.mtime.cn/Video/2019/03/09/mp4/190309153658147087.mp4',
                    text: '测试视频1',
                    img: '/static/images/v2.jpg',
                },
                {
                    id: 'd3',
                    url: 'http://vfx.mtime.cn/Video/2019/03/14/mp4/190314102306987969.mp4',
                    text: '测试视频2',
                    img: '/static/images/v3.jpg',
                },
                {
                    id: 'f4',
                    url: 'http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4',
                    text: '测试视频3',
                    img: '/static/images/v1.jpg'
                },
            ],
        })
        
    },
    handleUpdate(e) {
     const timeObj = {vid: e.currentTarget.id, currentTime: e.detail.currentTime}
     let { videoUpdateTime} = this.data;
     let videoItem = videoUpdateTime.find(item => item.vid === timeObj.vid);
     if(videoItem) {
        videoItem.currentTime = e.detail.currentTime
     } else {
         videoUpdateTime.push(timeObj)
     }
     this.setData({
         videoUpdateTime
     })
    },
    handlePlay(e) {
        const vid = e.currentTarget.id;
        this.data.vid !== vid && this.data.videoContext && this.data.videoContext.stop();
        this.data.vid = vid;
        this.data.videoContext = wx.createVideoContext(vid);
        this.setData({
            vid: vid
        })
        let { videoUpdateTime} = this.data;
        let videoItem = videoUpdateTime.find(i => i.vid === vid)
        if(videoItem) {
            this.videoContext.seek(videoItem.currentTime)
        }
        this.data.videoContext.play()
    },

    handleEnded(e) {
        let {videoUpdateTime} = this.data
        videoUpdateTime.splice(videoUpdateTime.findIndex(i => i.vid === e.currentTime.id),1)
    },
  /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function ({from}) {
        return {
            title: '',
            page: '',
            imageUrl: ''
        }
    },
    changeNav(e) {
        console.log(e.currentTarget)
        const video = this.data.videoList1.reverse();
        this.setData({
            selectedId: e.currentTarget.id,
            videoList1: video
        })
    }
})