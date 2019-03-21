var express = require('express');
var router = express.Router();
var secret = require('../conf/secret').random;
var client=require("../Redis/RedisServer")
var shoppingCarDao=require('../dao/shoppingCarDao');
//购物车添加
//要传入 uid（用户uid）
// 要传入 pid（商品pid）
router.all('/insertCarinfo',function(req, res, next){
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{
            var info={}
            info.uid=req.uid;
            info.pid=req.pid 
            shoppingCarDao.insertCarinfo(info,function(data){
                if(data){
                    console.log(data)
                }
            })
        }
    })   
})


//购物车列表
//要传入 uid（用户uid）
router.all('/selectCarinfoList',function(req, res, next){
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{
            var uid=req.uid; 
            shoppingCarDao.selectCarinfoByuserid(uid,function(data){
                if(data){
                    console.log(data)
                }
            })

        }
    })   
})
//删除购物车
// 要传入 pid（商品pid）
router.all('/dellCarinfoList',function(req, res, next){
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{
            var pid=req.pid; 
            shoppingCarDao.dellCarinfo(pid,function(data){
                if(data){
                    console.log(data)
                }
            })
        }
    })   
})



module.exports = router;