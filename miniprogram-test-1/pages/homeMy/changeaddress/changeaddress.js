// pages/main/index.js
var QR = require("./../../../utils/qrcode.js");
import host from '../../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();
Page({
  data: {
    userName: '',
    userPhone:'',
    userAddress:'',
    userRemarks:'',
    sign:0
  },
  edit: function (e) {
    wx.navigateTo({
      url: '../inform/inform'
    })
  },
  add: function (e) {
    wx.navigateTo({
      url: '../inform/inform'
    })
  },
  onReady: function (e) {
   
  },
  switch1Change(e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    if (e.detail.value){
      
      this.setData({
        sign: 1
      })
    }else{
      this.setData({
        sign: 0
      })
    }
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(this.data.sign)
    let sign = this.data.sign; 
    wx.request({
      url: serverURL + '/goodsaddress/insertaddressInfo',
      data: {
        token: app.globalData.token,
        uid: app.globalData.user_id,
        userName: e.detail.value.userName,
        userPhone: e.detail.value.userPhone,
        userAddress: e.detail.value.userAddress,
        userRemarks: e.detail.value.userRemarks,
        sign: sign,
      },
      success: function (res) {
        wx.showToast({
          title: '添加地址成功',
          icon: 'succes',
          duration: 10000
        })

        setTimeout(function () {
          wx.hideToast()
        }, 1000)
      }, fail: function (res) { }
    })
  },
  onShow: function () {  
  },
  

})