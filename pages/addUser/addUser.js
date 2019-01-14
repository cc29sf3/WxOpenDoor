// pages/addUser/addUser.js
require('../../entity/security.js')

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
  formSubmit:function() {
    console.log(e.detail.value)
    let reqUrl = app.globalData.apiUrl + "/api/users/addSecurity"
    console.log(reqUrl)
    wx.request({
      url: reqUrl,
      method: "POST",
      data: {
        name: e.detail.value.name,
        phone: e.detail.value.phone
      },
      header: {
        'content-type': 'application/json'
      }, 
      success:function(res){
        if(res.code ==200){
          wx.setStorageSync("newSec", new Security(e.detail.value.name, e.detail.value.phone))
          wx.navigateBack({
            delta:1
          })
        }
      }
    })
  },
  reset:function() {

  }
})