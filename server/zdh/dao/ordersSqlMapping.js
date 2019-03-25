
var orders={
    insertorderInfo:"insert into orders_info(user_id,order_Num,order_total,order_tname,order_phone,order_status,order_starttime,order_endtime,order_mark) values(?,?,?,?,?,0,?,0,?)",
    selectAllorderInfo:"select * from orders_info",
    selectorderByphoneNum:"select * from orders_info where order_Num=?",
    updateorderstatus:"update  orders_info set order_status=?,order_endtime=? where order_Num=?",
    wxselectlistbyphone:"select o.*,t.pid,t.num,p.* from orders_info as o LEFT JOIN oeder_prod as t on o.order_id=t.oid LEFT JOIN product_info as p on t.pid=p.product_id  where user_id=? and order_status=1",
    insertorderprod:"insert into oeder_prod(user_id,pid,num,oid) values(?,?,?,?) "
};
module.exports = orders;