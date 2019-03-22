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
    sign:0,
    chec: '',
    ids: '',
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
  delChange(e) {
    let ids = this.data.ids;
    wx.request({
      url: serverURL + '/goodsaddress/delladdressInfo',
      data: {
        token: app.globalData.token,
        uid: app.globalData.user_id,
        aid: ids
      },
      success: function (res) {
        wx.showToast({
          title: '删除成功',
          icon: 'succes',
          duration: 10000
        })

        setTimeout(function () {
          wx.hideToast()
        }, 1000)
        setTimeout(function () {
          wx.navigateTo({
            url: '../address/address'
          })
        }, 1500)
        
      }, fail: function (res) { }
    })
  },
  formSubmit(e) {
    let sign = this.data.sign; 
    let ids = this.data.ids;
    //console.log("sadsa"+);
    wx.request({
      url: serverURL + '/goodsaddress/updateaddressInfo',
      data: {
        token: app.globalData.token,
        uid: app.globalData.user_id,
        userName: e.detail.value.userName,
        userPhone: e.detail.value.userPhone,
        userAddress: e.detail.value.userAddress,
        userRemarks: e.detail.value.userRemarks,
        sign: sign,
        aid:ids
      },
      success: function (res) {
        wx.showToast({
          title: '修改地址成功',
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
    var self = this;
    var userName = wx.getStorageSync('user_name');
    var userPhone = wx.getStorageSync('user_phone');
    var userAddress = wx.getStorageSync('user_address');
    var userRemarks = wx.getStorageSync('userRemarks');
    var user_id = wx.getStorageSync('user_id');
    var id = wx.getStorageSync('id');
    var sign = wx.getStorageSync('sign');
    var chec;
    if (sign==1){
      chec=true
    } else if (sign == 0){
      chec = false
    }
    self.setData({
      userName: userName,
      userPhone: userPhone,
      userAddress: userAddress,
      userRemarks: userRemarks,
      sign: sign,
      chec: chec,
      ids: id
    })  
  },
  

})