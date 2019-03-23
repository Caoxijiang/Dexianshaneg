var express = require('express');
var router = express.Router();
var goodsaddressDao=require('../dao/goodsaddressDao');
var secret = require('../conf/secret').random;
var client=require("../Redis/RedisServer")

//添加收货地址
//参数说明：uid:用户user_id,userName:收货人姓名，userPhone：收货人电话
//userAddress:收货人地址,userRemarks:备注 ，sign:默认选择值(0表示 非默认，1表示默认)
router.all('/insertaddressInfo', function(req, res, next) {
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{
            var info=req.query || req.body; 
            goodsaddressDao.insertaddressInfo(info,function(data){
                if(data=="SUCCESS"){
                    res.send(data);
                }else{
                    res.send("ERR");
                }
            })
        }
  
    });
  })

  //收货地址列表
  //参数说明：uid:用户user_id
  router.all('/selectaddressList', function(req, res, next) {
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{
            var info=req.query || req.body; 
            goodsaddressDao.selectaddressList(info.uid,function(data){
                if(data){
                    res.send(data);
                }else{
                    res.send("ERR");
                }
            })
        }
  
    });
  })

  //删除收货地址
  ////参数说明：aid:收货地址id
  router.all('/delladdressInfo', function(req, res, next) {
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{
            var info=req.query || req.body; 
            goodsaddressDao.delladdressInfo(info.aid,function(data){
                if(data){
                    res.send(data);
                }else{
                    res.send("ERR");
                }
            })
        }
  
    });
  })


  //更新收货地址信息
  //参数说明：userName:收货人姓名，userPhone：收货人电话
  //userAddress:收货人地址,userRemarks:备注 ，sign:默认选择值(0表示 非默认，1表示默认)
  router.all('/updateaddressInfo', function(req, res, next) {
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{
            var info=req.query || req.body; 
            goodsaddressDao.updateaddressInfo(info,function(data){
                if(data){
                    res.send(data);
                }else{
                    res.send("ERR");
                }
            })
        }
    });
  })

  router.all('/selectsign', function(req, res, next) {
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{
            var info=req.query || req.body; 
            goodsaddressDao.selectsign(info.uid,function(data){
                if(data){
                    res.send(data);
                }else{
                    res.send("ERR");
                }
            })
        }
    });
  })


module.exports = router;