//app.js
const JWTPayload = require("utils/JWTPayload.js")
App({
  onLaunch: function () {
    // 展示本地存储能力
    var token = wx.getStorageSync('token')||false
    console.log(token)
    if (token){
      let jwt = new JWTPayload(token)
      this.globalData.permission = jwt.payload.permission
      console.log(this.globalData.permission)
      wx.navigateTo({
        url: '/pages/index/index',
      })
    }
    
    
  },
  globalData: {
    userInfo: null,
    apiUrl:"http://10.0.0.74:10001",
    //apiUrl:"https://miniprogram.sxhgpark.com",
    permission:[]
  }
})