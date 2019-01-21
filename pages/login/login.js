// pages/login/login.js
const { $Toast } = require('../../iview/base/index');
var JWTPayload = require('../../utils/JWTPayload.js')
var AppId='wxc332341b2e58babf'
var app=getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    if(options.expire){
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
        let reqUrl = app.globalData.apiUrl +'/api/wxapi/phonenumber/'
        wx.request({
          url: reqUrl,
          method:"POST",
          data: {
            encryptedData: ecryptData,
            iv: iv,
            code: res.code
          },
          success:res=>{
            if(res.statusCode == 200){
              that.getToken(res.data)
              
            } else {
              that.setData({
                loading: false
              })
              console.log('sessskey fail')
              $Toast({
                content: "解析电话号码失败",
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
        } else if (res.statusCode == 401){
          $Toast({
            content:"未授权，无法登陆",
            type:"error"
          })
        } else if (res.statusCode==500){
          $Toast({
            content: "服务异常，登陆失败",
            type: "error"
          })
        }
      },
      fail:res=>{
        $Toast({
          content: "请求失败，请检查手机网络设置",
          type: "warning"
        })
      },
      complete:()=>{
        that.setData({
          loading:false
        })
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