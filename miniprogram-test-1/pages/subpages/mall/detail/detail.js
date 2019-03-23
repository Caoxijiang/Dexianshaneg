import host from '../../../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();
Page({
  data: {
    title: '',
    proName: '',
    proPrice: '',
    proInstructions: '',
    proDetails: '',
    proImage:'',
    thumimage:'',
    product_id: ''
  },
  onLoad: function (options) {
    var self = this;
    var name = wx.getStorageSync('name');
    var product_id = wx.getStorageSync('product_id');
    var price = wx.getStorageSync('price');
    var Instructions = wx.getStorageSync('Instructions');
    var details = wx.getStorageSync('details');
    var image = wx.getStorageSync('image');
    var thumimage = wx.getStorageSync('thumimage');
    // console.log(product_id);
    wx.setStorageSync('thumimage', thumimage);
    self.setData({
      proName: name,
      product_id: product_id,
      proPrice: price,
      proInstructions: Instructions,
      proDetails: details,
      proImage: image,
    })
    
  },
  buybutton: function () {
    wx.showToast({
      title: '成功加入购物车',
      icon: 'succes',
      duration: 10000
    })

    setTimeout(function () {
      wx.hideToast()
    }, 1000)

    var product_id = this.data.product_id;
    wx.request({
      url: serverURL + '/shoppingCar/insertCarinfo',
      data: {
        token: app.globalData.token,
        uid: app.globalData.user_id,
        pid: product_id
      },
      success: function (res) {

      }, fail: function (res) {
        // wx.showToast({
        //   title: '加入购物车失败',
        //   icon: 'succes',
        //   duration: 10000
        // })

        // setTimeout(function () {
        //   wx.hideToast()
        // }, 1000)
      }
    }) 
  },
  onShow: function () {
    
  }
})