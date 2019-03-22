// pages/main/index.js
var QR = require("./../../../utils/qrcode.js");
import host from '../../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();
Page({
  data: {
    address: [],   
    maskHidden: true,
    imagePath: '',
    placeholder: 'https://mp.weixin.qq.com/s/jdWsUC8y69z4MFRg1LTx3A',//默认二维码生成文本,
    wxphone:"",
    orderlist:"",
    codeCreat:""
  },
  edit: function (e) {
    wx.clearStorage();
    wx.clearStorageSync()
    var uId = e.currentTarget.dataset.index;
    var ProList = this.data.address;
    var user_name = ProList[uId].user_name;
    var user_phone = ProList[uId].user_phone;
    var sign = ProList[uId].sign;
    var user_address = ProList[uId].user_address;
    var user_id = ProList[uId].user_id;
    var id = ProList[uId].id;
    wx.setStorageSync('user_name', user_name);
    wx.setStorageSync('user_phone', user_phone);
    wx.setStorageSync('sign', sign);
    wx.setStorageSync('user_address', user_address);
    wx.setStorageSync('user_id', user_id);
    wx.setStorageSync('id',id);
    // console.log("sdfagsdf" + user_name);
    wx.navigateTo({
      url: '../editaddress/editaddress'
    })
  },
  add: function (e) {
    wx.navigateTo({
      url: '../changeaddress/changeaddress'
    })
  },
  onReady: function (e) {
   
  },

  onShow: function () {
    var self=this;
    wx.request({
      url: serverURL + '/goodsaddress/selectaddressList',
      data: {
        token: app.globalData.token,
        uid: app.globalData.user_id,
      },
      success: function (res) {
        self.setData({
          address: res.data
        })
        console.log(res.data);
      }, fail: function (res) {}
    })

    
  },


})