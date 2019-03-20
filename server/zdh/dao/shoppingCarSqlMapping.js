var car={
    insertCarinfo:'insert into shoppingCar(user_id,prod_id) values(?,?)',
    selectCarinfoByuserid:"select c.prod_id,p.* from shoppingCar as c LEFT JOIN product_info as p c.prod_id=p.product_id where user_id=?",
    dellCarinfo:'delete from shoppingCar where prod_id=? '
}
module.exports=car ;