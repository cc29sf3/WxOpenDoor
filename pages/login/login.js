// pages/login/login.js
var WXBizDataCrypt = require('../../utils/RdWXBizDataCrypt.js');
var JWTPayload = require('../../utils/JWTPayload.js')
var AppId='wxc332341b2e58babf'
var app=getApp()
var that
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
    that = this
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
  getPhoneNumber:e=>{
    let iv =e.detail.iv
    let ecryptData = e.detail.encryptedData
    console.log("11",ecryptData)
    wx.login({
      success:function(res){
        let reqUrl = app.globalData.apiUrl+'/api/wxapi/sesskey/'+res.code
        wx.request({
          url: reqUrl,
          success:res=>{
            if(res.statusCode == 200){
              console.log('请求sesskey', res.data)
              let pc = new WXBizDataCrypt(AppId, res.data.session_key)
              let data = pc.decryptData(ecryptData, iv)
              that.getToken(data.purePhoneNumber)
            }
          }
        })
      }
    })
  },

  getToken:function(phone){
    console.log('getToken')
    let reqUrl = app.globalData.apiUrl+"/api/users/token"
    console.log(reqUrl)
    wx.request({
      url: reqUrl,
      method : "POST",
      data: {
        phone:phone
      },
      header: {
        'content-type': 'application/json'
      }, 
      success: function (res) {
        if (res.statusCode==200){
          let jwt = new JWTPayload(res.data.token)
          app.globalData.permission =jwt.payload.permission
          wx.setStorage({
            key: 'token',
            data: res.data.token,
            success:()=>{console.log('token save')}
          })
          wx.navigateTo({
            url: '../index/index',
          })
        }
      },
      fail:res=>{
        console.log('get token fail',res)
      }
    })
  },
  getUserInfo:res=>{
    console.log(res.detail.userInfo)
    wx.getUserInfo({
      withCredentials:true,
      success:res=>{
        console.log(res)
      }
    })
  }
})