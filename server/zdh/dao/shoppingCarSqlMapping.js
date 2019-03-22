var car={
    insertCarinfo:'insert into shoppingCar(user_id,prod_id,num,prod_change) values(?,?,1,true)',
    selectCarinfoByuserid:"select c.prod_id,c.num,c.prod_change,p.* from shoppingCar as c LEFT JOIN product_info as p on c.prod_id=p.product_id where c.user_id=?",
    dellCarinfo:'delete from shoppingCar where user_id=? and prod_id=?',
    selectpidByuid:"select prod_id from shoppingCar where  prod_id=? and user_id=?",
    updatenumbypid:"update  shoppingCar set num=? where prod_id=? and user_id=?",
    selectnumbyuidAdnpid:"select num from shoppingCar where user_id =? and prod_id=?",
}
module.exports=car;