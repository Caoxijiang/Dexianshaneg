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
			connection.query($sql.dellCarinfo ,[req.uid,req.pid],function(err, results, fields){
          if(err) throw err;
          var msg="SUCCESS";
				connection.release();
				callback(msg)
			});
		})
		},
		selectpidByuid:function(req,callback){
			pool.getConnection(function(err, connection){
				connection.query($sql.selectpidByuid ,[req.pid,req.uid],function(err, results, fields){
						if(err) throw err;
					//	var msg="SUCCESS";
					connection.release();
					callback(results[0])
				});
			})
		},
		updatenumbypid:function(req,callback){
			pool.getConnection(function(err, connection){
				var data={};
				async.waterfall([
					function(callback){
						connection.query($sql.selectnumbyuidAdnpid,[req.uid,req.pid],function(err, results, fields){
							if(err) throw err;
							data.num=results[0];
							callback(null,data)
						})
					},
					function(data,callback){
						//console.log(data.num.num)
						connection.query($sql.updatenumbypid ,[data.num.num+1,req.pid,req.uid],function(err, results, fields){
							if(err) throw err;
							data.msg="SUCCESS";
							connection.release();
							callback(data)
					})
				}
			],function(err,res){
				connection.release;
				callback(res)
			})

			})
		}
}