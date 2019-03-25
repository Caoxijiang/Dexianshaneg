var addressInfo={
    insertaddressInfo:"insert into goods_address(user_id,user_name,user_phone,user_address,user_remarks,sign) values(?,?,?,?,?,?)",
    selectaddressList:"select * from goods_address where user_id=?",
    delladdressInfo:"delete from goods_address where id=?",
    updateaddressInfo:"update goods_address set user_name=?,user_phone=?,user_address=?,user_remarks=?,sign=? where id=?",
    updatesign:"update goods_address set sign=0 where user_id=?",
    selectsign:"select * from goods_address where user_id=? and sign=1"
}

module.exports=addressInfo;