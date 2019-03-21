var car={
    insertCarinfo:'insert into shoppingCar(user_id,prod_id,prod_change) values(?,?,true)',
    selectCarinfoByuserid:"select count(c.prod_id) as num,c.prod_id,c.prod_change,p.* from shoppingCar as c LEFT JOIN product_info as p on c.prod_id=p.product_id where c.user_id=?",
    dellCarinfo:'delete from shoppingCar where prod_id=? '
}
module.exports=car ;