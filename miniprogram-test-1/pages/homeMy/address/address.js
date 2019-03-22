// pages/main/index.js
var QR = require("./../../../utils/qrcode.js");
import host from '../../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();
Page({
  data: {
    canvasHidden: false,
    maskHidden: true,
    imagePath: '',
    placeholder: 'https://mp.weixin.qq.com/s/jdWsUC8y69z4MFRg1LTx3A',//默认二维码生成文本,
    wxphone:"",
    orderlist:"",
    codeCreat:""
  },
  edit: function (e) {
    wx.navigateTo({
      url: '../changeaddress/changeaddress'
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
        //console.log(JSON.stringify(res.data));
        console.log(res.data);
      }, fail: function (res) {}
    })

    
  },


})