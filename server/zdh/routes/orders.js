var express = require('express');
var router = express.Router();
var client=require('../Redis/RedisServer');
var ordersInfo=require('../dao/ordersDao');
var secret = require('../conf/secret').random;

//微信订单列表 传入uid
router.all('/wxorders',function(req,res,next){
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
        if( err){
            var status_err="err";
            res.send(status_err);
        }else{
            var uid=req.query.uid|| req.body.uid;
            ordersInfo.wxselecPayokorders(uid,function(data){
                if(data.length!=0){
                    res.send(data)
                }else{
                    var status_err="SERVERERR"
                    res.end(status_err);
                }
            })
                
        } 
    });
});
router.all('/updateOrderAccountList',function(req,res,next){
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{ 
            ordersInfo.updataorderstatus(orderinfo,function(data){
                if(data=="SUCCESS"){
                   var  status_err="SUCCESS";
                   res.send(status_err);
                }else{
                    var status_err="SERVERERR"
                    res.end(status_err);
                }
            })
        }
  
    });
});


router.all("/insertorderInfo",function(req,res){
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{ 
            var orderinfo={};
            orderinfo.Num=req.query.Num;
            orderinfo.total=req.query.total;
            orderinfo.tname=req.query.tname;
            orderinfo.phoneNum=req.query.phoneNum;
            orderinfo.startTime=req.query.startTime;
            orderinfo.uid=req.query.uid;
            ordersInfo.insertInfo(orderinfo,function(data){
                if(data=="SUCCESS"){
                   var  status_err="SUCCESS";
                   res.send(status_err);
                }else{
                    var status_err="SERVERERR"
                    res.end(status_err);
                }
            })
        }
  
    });
})

//订单删除接口  传入 oid
router.all('/dellorderLisiByuid',function(req,res,next){
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{ 
            var uid=req.query.oid|| req.param.uid;
            ordersInfo.dellorderLisiByuid(oid,function(data){
                if(data=="SUCCESS"){
                   var  status_err="SUCCESS";
                   res.send(status_err);
                }else{
                    var status_err="SERVERERR"
                    res.end(status_err);
                }
            })
        }
  
    });
});



module.exports = router;