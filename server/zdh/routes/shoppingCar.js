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
            info.uid=req.query.uid || req.body.uid;
            info.pid=req.query.pid || req.body.pid; 

            shoppingCarDao.selectpidByuid(info,function(data){
                if(data==undefined){
                    shoppingCarDao.insertCarinfo(info,function(data){
                        if(data){
                            res.send("SUCCESS")
                        }else{
                            res.send("ERR");
                        }
                    })
                }else{
                   shoppingCarDao.updatenumbypid(info,function(data){
                       if(data){
                           res.send("SUCCESS")
                       }else{
                        res.send("ERR");
                       }
                   }) 
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
            var uid=req.query.uid || req.body.uid; 
            shoppingCarDao.selectCarinfoByuserid(uid,function(data){
                if(data){
                    console.log(data)
                    res.send(data)
                }else{
                    res.send("ERR")
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
            var info={}
            info.uid=req.query.uid || req.body.uid;
            info.pid=req.query.pid || req.body.pid; 
            shoppingCarDao.dellCarinfo(info,function(data){
                if(data=='SUCCESS'){
                    res.send(data)
                    console.log(data)
                }else{
                    res.send("ERR")
                }
            })
        }
    })   
})



module.exports = router;