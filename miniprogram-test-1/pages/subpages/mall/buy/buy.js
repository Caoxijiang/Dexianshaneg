// pages/Schedule/Schedule.js
import host from '../../../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selecarts: [], //选择商品
    address: [], 
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: null,
    wxphone:"",
    smsphone:"",
    proName: '求知书店',
    proPrice: '',
    proInstructions: '',
    proDetails: '',
    proImage: '',
    proThumimage:'',
    num:'1',
    minusStatus: 'disabled',
    totalMoney: 0,
    sence:""
  },
  
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  }, 
  /*收货地址设置*/
  address: function () {
    wx.navigateTo({
      url: '../../../homeMy/address/address',
    })
  }, 
  /*备注信息获取*/
  bindTextAreaBlur(e) {
    console.log(e.detail.value)
  },
  // 支付方法
  pay: function () {
    var self=this;
    var phone = self.data.wxphone;
    var openid = app.globalData.token;
    var total = self.data.totalMoney;
    var sence = self.data.sence;
    var uid = app.globalData.user_id;
    var pidinfo = new Array(); 
    for (let i = 0; i < this.data.selecarts.length;i++){
      pidinfo.push({ pid: this.data.selecarts[i].prod_id, num: this.data.selecarts[i].num});
    }
    // var pidinfo = [{ pid: 1, num: 2 }, { pid: 2, num: 3 }]
    wx.request({
      url: serverURL + '/wxPay/wx_pay',
      data: {
        openid: openid,
        title: self.data.proName,
        price: total,
        phoneNum:phone,
        sence: sence,
        uid: uid,
        pidinfo: JSON.stringify(pidinfo)
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.data == "err") {
          wx.showModal({
            title: '提示',
            content: '登陆过期',
            complete: function () {
              wx.redirectTo({
                url: '/pages/login/login',
                success: function () {
                  app.login();
                }
              })
            }
          })
        } else if (res.data.status == "102") {
          console.log(res);

          wx.showModal({
            title: '提示',
            content: "服务器错误",
          })
        } else if (res.data.status == 100) {
          var payModel = res.data;
          wx.requestPayment({
            'timeStamp': payModel.timestamp,
            'nonceStr': payModel.nonceStr,
            'package': payModel.package,
            'signType': 'MD5',
            'paySign': payModel.paySign,
            'success': function (res) {
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000,
                complete:function(){
                  wx.redirectTo({
                    url: '../../News/News'
                  })
                }
              })
            },
            'fail': function (res) {
              if (res.errMsg == "requestPayment:fail cancel") {
                wx.showToast({
                  title: '取消支付',
                  icon: 'fail',
                  duration: 2000,
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: "支付发起失败",
                })
              }
            }
          })
        }
      }
    })

  },
  onLoad: function (options) {
    var self = this;
    var data = JSON.parse(options.data)
   
    var totalPrice = wx.getStorageSync('totalPrice'); 
    
    self.setData({
      totalMoney: totalPrice,
      selecarts: data,
    })
    
    wx.request({
      url: serverURL + '/goodsaddress//selectsign',
      data: {
        token: app.globalData.token,
        uid: app.globalData.user_id,
      },
      success: function (res) {
        self.setData({
          address: res.data[0]
        })
        console.log(res.data[0]);
      }, fail: function (res) { }
    })
  },

  onShow:function(){
    var self=this;
    wx.getStorage({
      key: 'wxphone',
      success: function (res) {
        self.setData({
          wxphone:res.data
        })
      }
    }),
    wx.getStorage({
      key: 'sence',
      success: function(res) {
        self.setData({
          sence: res.data
        })
      },
    })
  }
})