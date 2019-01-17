// pages/index/index.js
const { $Toast } = require('../../iview/base/index');
const { getToken } = require('../../utils/util')
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isManager:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.permission&&app.globalData.permission.includes('management'))
    {
      this.setData({
        isManager:true
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
  opendoor(e){
    let deviceid=e.target.dataset.deviceid
    let doorid=e.target.dataset.doorid
    console.log(deviceid,doorid)
    let reqUrl = app.globalData.apiUrl+"/api/gate-control"
    wx.request({
      method:"POST",
      url: reqUrl,
      data:{
        deviceid: Number.parseInt(deviceid),
        doorid: Number.parseInt(doorid)
      },
      header: {
        'content-type': 'application/json',
        'Authorization': getToken()
      }, 
      success:res=>{
        if(res.statusCode==200){
          $Toast({
            content: '开门成功',
            type: 'success'
          });
        } else {
          $Toast({
            content: '开门失败',
            type: 'error'
          });
        }
      }
    })
  }
})