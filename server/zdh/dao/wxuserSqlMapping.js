var wxuser = {
	 selectuserWxInfo:"select * from user_wxbase where user_id=?",
	 selectwxPhoneNum:"select wx_openid from user_wxbase where wx_openid=?",
	 selectuserwxUserid:"select * from user_wxbase where wx_phoneNum=?",
	 insertWxuserBaseInfo:'INSERT INTO user_wxbase(wx_phoneNum,wx_phoneNumRole,wx_phoneNumVip) VALUES(?,0,0)',
	 insertWxuserInfo:"insert into user_wxinfo(user_id,user_wxnickName,user_wxcountry,user_wxprovince,user_wxcity,user_wxgender,user_language) values(?,?,?,?,?,?,?)",
	 insertWxopenid:"insert into user_wxbase(wx_openid) values(?)",
	 selectuserIdByopenid:"select user_id from user_wxbase where wx_openid=? "
	 //update:'update user_wxinfo set wx_open_id=1 where user_id=?',
	// delete: 'delete from user where id=?',
	// queryById: 'select * from user where id=?',
	// queryAll: 'select * from user'
};
module.exports = wxuser;
