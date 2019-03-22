var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var async = require('async');
var $sql = require('./goodsaddressSqlMapping');
var $sql2 = require('./mettingInfoMapping');
var pool  = mysql.createPool($util.extend({},$conf.mysql));

module.exports={
    insertaddressInfo:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.insertaddressInfo,[req.uid,req.userName,req.userPhone,req.userAddress,req.userRemarks,req.sign],function(err,results,fields){
                if(err) throw err;
                var msg="SUCCESS";
                connection.release();
                callback(msg);
            })
        })
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
        pool.getConnection(function(err,connection){
            connection.query($sql.updateaddressInfo,[req.userName,req.userPhone,req.userAddress,req.userRemarks,req.sign],function(err,results,fields){
                if(err) throw err;
                var msg="SUCCESS";
                connection.release();
                callback(msg);
            })
        })
    }
}