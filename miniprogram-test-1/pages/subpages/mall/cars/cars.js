// pages/Schedule/Schedule.js
import host from '../../../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();
Page({
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: false    // 全选状态，默认全选
  },
  onShow: function () {
    var self = this;
    wx.request({
      url: serverURL + '/shoppingCar/selectCarinfoList',
      data: {
        token: app.globalData.token,
        uid: app.globalData.user_id,
      },
      success: function (res) {
        hasList: true, 
        self.setData({
          carts: res.data
        })
        console.log(res.data);
      }, fail: function (res) {
      }
    })
  },
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                   // 判断选中才会计算价格
        total += carts[i].num * carts[i].product_price;     // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
  selectList(e) {
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let carts = this.data.carts;                    // 获取购物车列表
    const selected = carts[index].selected;         // 获取当前商品的选中状态
    carts[index].selected = !selected;              // 改变状态
    this.setData({
      carts: carts
    });
    this.getTotalPrice();                           // 重新获取总价
  },
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;    // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;            // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();                               // 重新获取总价
  },
  // 增加数量
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  // 减少数量
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  deleteList(e) {
    let self=this;
    const index = e.currentTarget.dataset.index;
    let carts = self.data.carts;
    wx.request({
      url: serverURL + '/shoppingCar/dellCarinfoList',
      data: {
        token: app.globalData.token,
        uid: app.globalData.user_id,
        pid: carts[index].prod_id
      },
      success: function (res) {
        // console.log(res.data);
        carts.splice(index, 1);              // 删除购物车列表里这个商品
        self.setData({
          carts: carts
        });
        if (!carts.length) {                  // 如果购物车为空
          self.setData({
            hasList: false              // 修改标识为false，显示购物车为空页面
          });
        } else {                              // 如果不为空
          self.getTotalPrice();           // 重新计算总价格
        }
      }, fail: function (res) {
      }
    })
    
  },
  //结算
  pay: function () {
    wx.setStorageSync('totalPrice', this.data.totalPrice);
    let carts = this.data.carts; // 获取购物车列表
    var selecars = [];
    let j=0;                 
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                   // 判断选中才会计算价格
        selecars.push({ num: carts[i].num, product_thumimg_url: carts[i].product_thumimg_url, product_Instructions: carts[i].product_Instructions, product_details: carts[i].product_details, product_price: carts[i].product_price,});
        j++;
      }
    }
    //console.log(selecars);
    var data = JSON.stringify(selecars);
    wx.navigateTo({
      url: '../buy/buy?data=' + data,
    })
  },
  //点击事件动态传参产看产品详情
  // detail: function (e) {
  //   var uId = e.currentTarget.id;
  //   var ProList = this.data.carts;
  //   var name = ProList[uId].product_Instructions;
  //   var price = ProList[uId].product_price;
  //   var Instructions = ProList[uId].product_details;
  //   var details = ProList[uId].product_details;
  //   var image = ProList[uId].product_img_url;
  //    console.log("sdf" + JSON.stringify(this.data.produceInfo) + uId);
  //   wx.setStorageSync('name', name);
  //   wx.setStorageSync('price', price);
  //   wx.setStorageSync('Instructions', Instructions);
  //   wx.setStorageSync('details', details);
  //   wx.setStorageSync('image', image);
  //   wx.navigateTo({
  //     url: '../mall/detail/detail'
  //   })
  // },
 
})