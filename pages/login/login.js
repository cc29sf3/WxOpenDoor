// pages/login/login.js
const { $Toast } = require('../../iview/base/index');
const { getToken } = require('../../utils/util')
var JWTPayload = require('../../utils/JWTPayload.js')
var app=getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    hasLogin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    if(options.expire){
      wx.clearStorage()
      app.globalData.permission=[]
      $Toast({
        content:"令牌过期，请重新登陆",
        type:"warning"
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var token = wx.getStorageSync('token') || false
    if (token) {
      let jwt = new JWTPayload(token)
      if (jwt.isValid()){
        this.setData({
          hasLogin:true
        })
      } 
    }
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
  
  getPhoneNumber:e=>{
    that.setData({
      loading:true
    })
    let iv =e.detail.iv
    let ecryptData = e.detail.encryptedData
    wx.login({
      success:function(res){
        let reqUrl = app.globalData.apiUrl +'/api/token'
        wx.request({
          url: reqUrl,
          method:"POST",
          header: {
            'content-type': 'application/json'
          },
          data: {
            encryptedData: ecryptData,
            iv: iv,
            code: res.code
          },
          success:res=>{
            if(res.statusCode == 200){
              let jwt = new JWTPayload(res.data.token)
              app.globalData.permission = jwt.payload.permission
              wx.setStorage({
                key: 'token',
                data: res.data.token,
                success: () => { console.log('token save') }
              })
              wx.navigateTo({
                url: '../index/index',
              })
            } else if (res.statusCode == 404) {
              $Toast({
                content: "未授权，禁止登陆",
                type: "error"
              })
            } else {
              that.setData({
                loading: false
              })
              console.log('sessskey fail')
              $Toast({
                content: "登陆异常",
                type: "error"
              })
            }
          },
          fail:()=>{
            that.setData({
              loading:false
            })
            $Toast({
              content: '登陆失败',
              type: 'error'
            });
          },
          complete: () => {
            that.setData({
              loading: false
            })
          }
        })
      }
    })
  },
  logout(){
    let reqUrl=app.globalData.apiUrl+"/api/token"
    wx.request({
      url: reqUrl,
      method:"DELETE",
      header: {
        'Authorization': getToken()
      },
    })
    wx.clearStorage()
    app.globalData.permission = []
    this.setData({hasLogin:false})
  },
  gotoindex(){
    wx.navigateTo({
      url: '../index/index',
    })
  }
})