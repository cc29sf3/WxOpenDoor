// pages/admin/admin.js
const { $Message } = require('../../iview/base/index');
const { getToken } = require('../../utils/util')
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    securities:[],
    inputShowed: false,
    inputVal: "",
    actions: [
      {
        name: '编辑',
        color: '#80848f',
        fontsize: '20',
        width: 100,
        icon: 'editor'
      },
      {
        name: '删除',
        width: 100,
        color: '#fff',
        fontsize: '20',
        icon: 'delete',
        background: '#ed3f14'
      }
    ]
  },

  blur(e) {
    this.setData({
      inputShowed: false
    });
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.computeScrollViewHeight()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.init()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
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
  onShareAppMessage: function () {
    
  },
  addSecurity:()=>{
    wx.navigateTo({url:'../addUser/addUser'})
  },
  init(){
    let reqUrl = app.globalData.apiUrl + "/api/users"
    wx.request({
      url: reqUrl,
      header: {
        'Authorization': getToken()
      }, 
      success: res=>that.handle(res)
    })
  },
  search() {
    if (this.data.inputVal.length ==0){
      this.init()
      return
    } 
    let reqUrl = app.globalData.apiUrl + "/api/users/" + this.data.inputVal
   
    wx.request({
      url: reqUrl,
      header: {
        'Authorization': getToken()
      },
      success: res=>that.handle(res)
    })
  },
  swipeoutClick(e){
    let index = e.detail.index
    let user = e.target.dataset.user
    
    if(index == 0){
      //edit user
      wx.navigateTo({
        url: '../editUser/editUser?id='+user.id+"&name="+user.name+"&phone="+user.phone
      })
    } else if (index ==1){
      //delete user
      let reqUrl=app.globalData.apiUrl+"/api/users/"+user.id
      wx.request({
        url: reqUrl,
        method:"DELETE",
        header: {
          'content-type': 'application/json',
          'Authorization': getToken()
        }, 
        success:res=>{
          if(res.statusCode ==200){
            $Message({
              content: '删除成功',
              type: 'success'
            });
            that.init()
          } else if(res.statusCode == 500){
            $Message({
              content: '删除失败:'+res.statusCode,
              type: 'error'
            });
          } else if (res.statusCode == 401){
            wx.navigateTo({
              url: '../login/login?expire=1',
            })
          }
        },
        fail:res=>{
          $Message({
            content: '请求异常',
            type: 'error'
          });
        }
      })
    }
  },
  handle(res){
    if (res.statusCode == 200) {
      console.log(res.data)
      that.setData({ securities: res.data })
    } else if (res.statusCode == 401) {
      wx.navigateTo({
        url: '../login/login?expire=1',
      })
    } else if (res.statusCode == 500) {
      $Message({ content: "服务异常", type: "error" })
    }
  },
  computeScrollViewHeight() {
    let that = this
    let query = wx.createSelectorQuery().in(this)
    query.select('.weui-search-bar').boundingClientRect(function (res) {
      //得到标题的高度
      let titleHeight = res.height
      console.debug('titlehight', titleHeight)
      //scroll-view的高度 = 屏幕高度- tab高(50) - 10 - 10 - titleHeight
      //获取屏幕可用高度
      let screenHeight = wx.getSystemInfoSync().windowHeight
      console.debug('screen', screenHeight)
      //计算 scroll-view 的高度
      let scrollHeight = screenHeight - titleHeight - 50
      console.debug('scroll', scrollHeight)
      that.setData({
        scrollHeight: scrollHeight
      })
    }).exec()
  }
})