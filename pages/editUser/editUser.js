
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
    console.log(options)
    this.setData({
      id:Number.parseInt(options.id),
      name:options.name,
      phone:options.phone,
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
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          wx.navigateBack({
            delta: 1,
          })
        } else {
          wx.showModal({
            title: '异常',
            content: '更新成员失败，请联系管理员'
          })
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '网络异常',
          content: '更新成员失败，请联系管理员'
        })
      }
    })
  },
})