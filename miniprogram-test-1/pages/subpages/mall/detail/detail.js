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
      }
    }) 
  },

  //结算
  pay: function () {
    wx.setStorageSync('totalPrice',this.data.proPrice);
    let carts = this.data.carts; // 获取购物车列表
    var selecars = [];
    selecars.push({ prod_id: this.data.product_id, num: 1, product_thumimg_url: this.data.proImage, product_Instructions: this.data.proName, product_details: this.data.proInstructions, product_price: this.data.proPrice});
    console.log(selecars);
  
      var data = JSON.stringify(selecars);
      wx.navigateTo({
        url: '../buy/buy?data=' + data,
      })
  },
  onShow: function () {
    
  }
})