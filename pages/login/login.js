// pages/login/login.js
var util = require('../../utils/util.js');
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  login:function(){
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  formSubmit:function(e){
    console.log(e.detail.value)
    let reqUrl = app.globalData.apiUrl+"/api/users/token"
    console.log(reqUrl)
    wx.request({
      url: reqUrl,
      method : "POST",
      data: {
        username:e.detail.value.username,
        password:e.detail.value.password
      },
      header: {
        'content-type': 'application/json'
      }, 
      success: function (res) {
        console.log('suc', res)
      },
      fail:res=>{
        console.log('fail',res)
      }
    })
    
  }
})