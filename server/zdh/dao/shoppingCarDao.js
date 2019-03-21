var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./shoppingCarSqlMapping');
 var async=require('async')
// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
    insertCarinfo:function(req,callback){
		pool.getConnection(function(err, connection){
			connection.query($sql.insertCarinfo ,[req.uid,req.pid],function(err, results, fields){
                if(err) throw err;
                var msg="SUCCESS";
                connection.release();
				callback(msg)
			});
		})
    },
    selectCarinfoByuserid:function(req,callback){
		pool.getConnection(function(err, connection){
			connection.query($sql.selectCarinfoByuserid ,[req],function(err, results, fields){
				if(err) throw err;
				connection.release();
				callback(results)
			});
		})
    },
    dellCarinfo:function(req,callback){
		pool.getConnection(function(err, connection){
			connection.query($sql.dellCarinfo ,[req],function(err, results, fields){
          if(err) throw err;
          var msg="SUCCESS";
				connection.release();
				callback(msg)
			});
		})
    }
}