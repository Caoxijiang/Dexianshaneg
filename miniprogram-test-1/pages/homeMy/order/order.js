// pages/Schedule/Schedule.js
import host from '../../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();
Page({
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: true    // 全选状态，默认全选
  },
  
  onShow() {
    var self = this;
    console.log("sdgsdf");
    wx.request({
      url: serverURL + '/orders/wxorders',
      data: {
        token: app.globalData.token,
        uid: app.globalData.user_id,
      },
      success: function (res) {
        if (res.data[0].product_id == null){
            //console.log("kong");
        }else{
          self.setData({
            hasList: true,
            carts: res.data
          }) 
        }
            
        
      }, fail: function (res) { }
    })

    // this.setData({
    //   hasList: true,       
    //   carts: [
    //     { id: 1, ordernum: '2018562345912166', title: '新鲜芹菜 半斤', image: 'https://www.iv2018.cn/public/images/productimag/1529395205095.jpg', num: 4, price: 0.01, data: '2019-03-23',totalmoney: 21, total: 3},
    //     { id: 2, ordernum: '2018562345912166', title: '素米 500g', image: 'https://www.iv2018.cn/public/images/productimag/1529395205095.jpg', num: 1, price: 0.03, data: '2019-03-23', totalmoney:21,total:3 }
    //   ],
    // });
  },
  deleteList(e) {
    let self = this;
    const index = e.currentTarget.dataset.index;
    let carts = self.data.carts;
    wx.request({
      url: serverURL + '/orders/dellorderLisiByuid',
      data: {
        token: app.globalData.token,
        uid: app.globalData.user_id,
        oid: carts[index].order_id
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
})