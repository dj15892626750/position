const UserDao=require("../dao/user-dao.js");

const UserService={
	//登录
	login(req,res,next){
		const {username,password}=req.body;
		UserDao.find({username}).then(data=>{
			if (data.length===1) {
				if (data[0].password===password) {
					res.json({
						"res_code":1,
						"res_error":"",
						"res_body":{
							"status":200,
							"ret":{
								"code":1,
								"message":"登录成功",
								"data":{
									"username":username
								}
							}
						}
					});
				} 
				else{
					res.json({
						"res_code":1,
						"res_error":"",
						"res_body":{
							"status":200,
							"ret":{
								"code":0,
								"message":"密码错误",
								"data":{}
							}
						}
					});
				}
			} 
			else{
				res.json({
					"res_code":1,
					"res_error":"",
					"res_body":{
						"status":200,
						"ret":{
							"code":-1,
							"message":"用户名有误",
							"data":{}
						}
					}
				});
			}
		}).catch(err=>{
			res.send(err);
		})
	},
	
	//注册
	register(req,res,next){
		
		const {username,password,email}=req.body;
		//查找用户名是否已被注册
		UserDao.find({username}).then(data=>{
			if (data.length===1) {
				res.json({
					"res_code":1,
					"res_error":"",
					"res_body":{
						"status":200,
						"ret":{
							"code":0,
							"message":"该用户名已被占用，请重新注册",
							"data":{}
						}
					}
				});
			} 
		}).catch(err=>{
			res.send(err);
		})
		
		UserDao.save({username,password,email}).then(data=>{
			res.json({
				"res_code":1,
				"res_error":"",
				"res_body":{
					"status":200,
					"ret":{
						"code":1,
						"message":"注册成功",
						"data":{
							"username":username
						}
					}
				}
			})
		}).catch(err=>{
			res.send(err);
		})
	},
	//退出
}

module.exports = UserService;
