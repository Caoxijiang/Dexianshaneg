var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./ordersSqlMapping');
var time=require('../util/TimeUtil');
var async = require('async');
 
// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({},$conf.mysql));

   module.exports = {
    insertInfo:function(req,callback){
        pool.getConnection(function(err,connection){
            async.waterfall([
                function(callback){
                    connection.query($sql.insertorderInfo,[req.uid,req.Num,req.total,req.tname,req.phoneNum,time.formatTime(req.startTime,"Y-M-D h:m:s"),req.mark,req.remarks],function(err,results,fields){
                        if(err) throw err;
                        req.oid=results.insertId;
                      //  connection.release();
                        callback(null,req)     
                    })
                },function(req,callback){
                    var info=JSON.parse(req.pidinfo);
                    for ( var obj of info){
                        connection.query($sql.insertorderprod,[req.uid,obj.pid,obj.num,req.oid],function(err,results,fields){
                            if(err) throw err;
                        })
                    }
                    var msg="SUCCESS";
                    callback(msg)
                }

            ],function(err,res){
                connection.release();
                callback(res)     
            })

        })
    },
    selectAlloeder:function(callback){
        pool.getConnection(function(err,connection){
        connection.query($sql.selectAllorderInfo,function(err,results,fields){
            if(err) throw err;
            connection.release();
            callback(results) 
 
            })
        })
    },
    selectorderByphoneNum:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectorderByphoneNum,[req.phoneNum],function(err,results,fields){
                if(err) throw err;
                connection.release();
                callback(results)

            })
        })
    },
    updataorderstatus:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.updateorderstatus,[req.status,time.Format(req.time_end),req.out_trade_no],function(err,results,fields){
                if(err) throw err;
                var msg="SUCCESS";
                connection.release();
                callback(msg)

            })
        })
    },
    wxselecPayokorders:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.wxselectlistbyphone,[req],function(err,results,fields){
                if(err) throw err;
                connection.release();
                callback(results)

            })
        })
    },
    dellorderLisiByuid:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.dellorderLisiByuid,[req],function(err,results,fields){
                if(err) throw err;
                var msg="SUCCESS";
                connection.release();
                callback(msg)

            })
        })
    }


}