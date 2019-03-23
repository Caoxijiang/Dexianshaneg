
var orders={
    insertorderInfo:"insert into orders_info(user_id,order_Num,order_total,order_tname,order_phone,order_status,order_starttime,order_endtime,order_mark) values(?,?,?,?,?,0,?,0,?)",
    selectAllorderInfo:"select * from orders_info",
    selectorderByphoneNum:"select * from orders_info where order_Num=?",
    updateorderstatus:"update  orders_info set order_status=?,order_endtime=? where order_Num=?",
    wxselectlistbyphone:"select * from orders_info where uid=? and order_status=1",
    insertorderprod:"insert into oeder_prod(user_id,pid,num,oid) values(?,?,?,?) "
};
module.exports = orders;