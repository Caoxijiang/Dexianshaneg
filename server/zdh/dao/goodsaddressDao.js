var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var async = require('async');
var $sql = require('./goodsaddressSqlMapping');
var $sql2 = require('./mettingInfoMapping');
var pool  = mysql.createPool($util.extend({},$conf.mysql));

module.exports={
    insertaddressInfo:function(req,callback){
        
        if(req.sign==1){
            pool.getConnection(function(err,connection){
             //   var data={};
                async.waterfall([
                    function(callback){
                        connection.query($sql.updatesign,[req.uid],function(err,results,fields){
                            if(err) throw err;
                            callback(null,req);
                        })
                    },function(req,callback){
                        connection.query($sql.insertaddressInfo,[req.uid,req.userName,req.userPhone,req.userAddress,req.userRemarks,req.sign],function(err,results,fields){
                            if(err) throw err;
                            var msg="SUCCESS";
                            callback(null,msg);
                        })
                    }
                ],function(err,res){
                    connection.release();	
                    callback(res);
                })
            })
        }else{
            pool.getConnection(function(err,connection){
                connection.query($sql.insertaddressInfo,[req.uid,req.userName,req.userPhone,req.userAddress,req.userRemarks,req.sign],function(err,results,fields){
                    if(err) throw err;
                    var msg="SUCCESS";
                    connection.release();
                    callback(msg);
                })
            })
        }

    },
    selectaddressList:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectaddressList,[req],function(err,results,fields){
                if(err) throw err;
              //  var msg="SUCCESS";
                connection.release();
                callback(results);
            })
        })
    },
    delladdressInfo:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.delladdressInfo,[req],function(err,results,fields){
                if(err) throw err;
                var msg="SUCCESS";
                connection.release();
                callback(msg);
            })
        })
    },
    updateaddressInfo:function(req,callback){
        if(req.sign==1){
            pool.getConnection(function(err,connection){
            async.waterfall([
                function(callback){
                    connection.query($sql.updatesign,[req.uid],function(err,results,fields){
                        if(err) throw err;
                        callback(null,req);
                    })
                },function(req,callback){
                    connection.query($sql.updateaddressInfo,[req.userName,req.userPhone,req.userAddress,req.userRemarks,req.sign,req.aid],function(err,results,fields){
                        if(err) throw err;
                        var msg="SUCCESS";
                        callback(msg);
                    })
                }
            ],function(err,res){
                connection.release();	
                callback(res);
            })
        })   
        }else{
            pool.getConnection(function(err,connection){
                connection.query($sql.updateaddressInfo,[req.userName,req.userPhone,req.userAddress,req.userRemarks,req.sign,req.aid],function(err,results,fields){
                    if(err) throw err;
                    var msg="SUCCESS";
                    connection.release();
                    callback(msg);
                })
            })
        }

    },
    selectsign:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectsign,[req],function(err,results,fields){
                if(err) throw err;
                connection.release();
                callback(results);
            })
        })
    }

}