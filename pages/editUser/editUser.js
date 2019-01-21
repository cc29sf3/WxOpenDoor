const { getToken } = require('../../utils/util')
const { $Message } = require('../../iview/base/index');
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    name:'',
    phone:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    this.setData({
      id:Number.parseInt(options.id),
      name:options.name||'',
      phone:options.phone||'',
    })
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
  formSubmit: function (e) {
    console.log(e.detail.value)
    let reqUrl = app.globalData.apiUrl + "/api/users/updateSecurity"
    wx.request({
      url: reqUrl,
      method: "POST",
      data: {
        id: that.data.id,
        name: e.detail.value.name,
        phone: e.detail.value.phone
      },
      header: {
        'content-type': 'application/json',
        'Authorization': getToken()
      }, 
      success: function (res) {
        if (res.statusCode == 200) {
          wx.navigateBack({
            delta: 1,
          })
          $Message({
            content: '添加成功',
            type: 'success'
          })
        } else if(code== 401){
          wx.navigateTo({
            url: '../login/login?expire=1',
          })
        } else {
          $Message({
            content: '服务异常',
            type: 'error'
          })
        }
      },
      fail: function (res) {
        
      }
    })
  },
  formReset(){
    wx.navigateBack({
      delta:1
    })
  }
})