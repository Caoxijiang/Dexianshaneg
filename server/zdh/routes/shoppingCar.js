var express = require('express');
var router = express.Router();
var secret = require('../conf/secret').random;
var client=require("../Redis/RedisServer")
var shoppingCarDao=require('../dao/shoppingCarDao');

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


router.all('/selectCarinfoList',function(req, res, next){
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{
            var uid=req.uid; 
            shoppingCarDao.selectCarinfoByuserid(info,function(data){
                if(data){
                    console.log(data)
                }
            })
        }
    })   
})

router.all('/dellCarinfoList',function(req, res, next){
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{
            var pid=req.pid; 
            shoppingCarDao.dellCarinfo(info,function(data){
                if(data){
                    console.log(data)
                }
            })
        }
    })   
})



module.exports = router;