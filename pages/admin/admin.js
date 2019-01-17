// pages/admin/admin.js
const { $Toast } = require('../../iview/base/index');
const { getToken } = require('../../utils/util')
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
     securities:[],
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
  addSecurity:()=>{
    wx.navigateTo({url:'../addUser/addUser'})
  },
  init(){
    let reqUrl = app.globalData.apiUrl + "/api/users/getAllSecurity"
    wx.request({
      url: reqUrl,
      header: {
        'Authorization': getToken()
      }, 
      success: res => {
        console.log(res.data)
        that.setData({securities:res.data})
        
      }
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
            $Toast({
              content: '删除成功',
              type: 'success'
            });
          } else {
            $Toast({
              content: '删除失败:'+res.statusCode,
              type: 'error'
            });
          }
        },
        fail:res=>{
          $Toast({
            content: '请求异常',
            type: 'error'
          });
        }
      })
    }
  }
})