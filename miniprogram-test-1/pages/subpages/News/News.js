import host from '../../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    produceInfo: "",
    imgUrlss: [],
    modalHidden: true,
    modalHidden2: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: "",
    wxphone: "",
    currentItem1: true
  },
  // 下拉刷新  
  onPullDownRefresh: function () {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () {
      that.setData({
        currentItem1: true
      });
    }, 5000);
    if (that.data.currentItem1 == true) {
      that.onShow();
      that.setData({
        currentItem1: false
      });

    }

    // 隐藏导航栏加载框  
    wx.hideNavigationBarLoading();
    // 停止下拉动作  
    wx.stopPullDownRefresh();
  },  
  toast: function (e) {
    wx.showToast({
      title: '成功加入购物车',
      icon: 'succes',
      duration: 10000
    })

    setTimeout(function () {
      wx.hideToast()
    }, 1000)
    // var uId = e.currentTarget.dataset.index;
    // var ProList = this.data.produceInfo;
    // var name = ProList[uId].product_name;
    // var price = ProList[uId].product_price;
    // var Instructions = ProList[uId].product_Instructions;
    // var details = ProList[uId].product_details;
    // var image = ProList[uId].product_img_url;
    // var thumimage = ProList[uId].product_thumimg_url;

    // wx.setStorageSync('name', name);
    // wx.setStorageSync('price', price);
    // wx.setStorageSync('Instructions', Instructions);
    // wx.setStorageSync('details', details);
    // wx.setStorageSync('image', image);
    // wx.setStorageSync('thumimage', thumimage);
    // wx.navigateTo({
    //   url: '../mall/buy/buy',
    // })
  },
  
  //点击事件动态传参产看产品详情
  detail: function (e) {
    var uId = e.currentTarget.id;
    var ProList = this.data.produceInfo;
    var name = ProList[uId].product_name;
    var price = ProList[uId].product_price;
    var Instructions = ProList[uId].product_Instructions;
    var details = ProList[uId].product_details;
    var image = ProList[uId].product_img_url;
    var thumimage = ProList[uId].product_thumimg_url;
    
    wx.setStorageSync('name', name);
    wx.setStorageSync('price', price);
    wx.setStorageSync('Instructions', Instructions);
    wx.setStorageSync('details', details);
    wx.setStorageSync('image', image);
    wx.setStorageSync('thumimage', thumimage);
    wx.navigateTo({
      url: '../mall/detail/detail'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var self = this;
   // self.scorp()
    wx.getStorage({
      key: 'produceInfo',
      success: function (res) {
        self.setData({
          produceInfo: res.data
        })
      },
    })
    // wx.getStorage({
    //   key: 'imgUrls',
    //   success: function (res) {
    //     self.setData({
    //       imgUrlss: res.data.carousel_url
    //     })
    //   },
    // })

    wx.request({
      url: serverURL + '/productinfo/productinfo',
      data: {
        token: app.globalData.token,
      },
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
        } else if (res.data == "SERVERERR") {
         
        } else {
          self.setData({
            produceInfo: res.data
          })
        }
      }, fail: function (res) {
      }
    })
  },
  
  contact: function () {
    wx.navigateTo({
      url: '../subpages/Contact/Contact'
    })
  },
  news: function () {
    wx.navigateTo({
      url: '../subpages/News/News'
    })
  },
  onLoad: function (options) {
    var self = this;
    var sence = decodeURIComponent(options)
    if (sence != undefined) {
      console.log(options.scene);
      wx.setStorage({
        key: "sence",
        data: options.scene
      })

    }
  }
})
  