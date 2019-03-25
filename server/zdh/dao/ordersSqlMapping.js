
var orders={
    insertorderInfo:"insert into orders_info(user_id,order_Num,order_total,order_tname,order_phone,order_status,order_starttime,order_endtime,order_mark) values(?,?,?,?,?,0,?,0,?)",
    selectAllorderInfo:"select o.*,t.pid,t.num,p.* from orders_info as o LEFT JOIN order_prod as t on o.order_id=t.oid LEFT JOIN product_info as p on t.pid=p.product_id",
    selectorderByphoneNum:"select o.*,t.pid,t.num,p.* from orders_info as o LEFT JOIN order_prod as t on o.order_id=t.oid LEFT JOIN product_info as p on t.pid=p.product_id",
    updateorderstatus:"update  orders_info set order_status=?,order_endtime=? where order_Num=?",
    wxselectlistbyphone:"select o.*,t.pid,t.num,p.* from orders_info as o LEFT JOIN order_prod as t on o.order_id=t.oid LEFT JOIN product_info as p on t.pid=p.product_id  where user_id=?",
    insertorderprod:"insert into order_prod(user_id,pid,num,oid) values(?,?,?,?)",
    dellorderLisiByuid:"delete orders_info,order_prod from orders_info left join order_prod on orders_info.order_id= order_prod.oid where user_id=? "
};
module.exports = orders;