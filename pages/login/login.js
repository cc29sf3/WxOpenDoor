// pages/login/login.js
var util = require('../../utils/util.js');
var WXBizDataCrypt = require('../../utils/RdWXBizDataCrypt.js');
var AppId='wxc332341b2e58babf'
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
  getPhoneNumber:e=>{

    console.log(e.detail)
    let iv =e.detail.iv
    let ecryptData = e.detail.encryptedData

    wx.login({
      success:function(res){
        //console.log('suc',res.code)
        let reqUrl = app.globalData.apiUrl+'/api/wxapi/sesskey/'+res.code
        //console.log(reqUrl)
        wx.request({
          url: reqUrl,
          success:res=>{
            //console.log(res)
            console.log(res.data)
            var pc = new WXBizDataCrypt(AppId, res.data.session_key)
            var data = pc.decryptData(ecryptData,iv)
            console.log('解密后 data: ', data)
          }
        })
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
        if (res.code==200){
          wx.setStorage({
            key: 'token',
            data: res.data.Token,
            success:()=>{console.log('token save')}
          })
          wx.navigateTo({
            url: '../index/index',
          })
        }
      },
      fail:res=>{
        console.log('fail',res)
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