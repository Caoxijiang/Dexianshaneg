var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var async = require('async');
var $sql = require('./guestsSqlMapping');
var $sql2 = require('./mettingInfoMapping');
var pool  = mysql.createPool($util.extend({},$conf.mysql));