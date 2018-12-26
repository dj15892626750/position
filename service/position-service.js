const PositionDao=require("../dao/position-dao.js");

const PositionService={
	//添加
	add(req,res,next){
		const {job_name,company_name,work_experience,job_type,work_place,salary}=req.body;
		// 如果有上传文件
		let logo = "";
		if (req.file) {
			logo = "/imgs/upload/" + req.file.filename;
		}
		
		//保存职位信息
		PositionDao.save({job_name,company_name,work_experience,job_type,work_place,salary,logo}).then(data=>{
			res.json({
				"res_code":1,
				"res_error":"",
				"res_body":{
					"status":200,
					"ret":{
						"code":1,
						"message":"职位添加成功",
						"data":{
							"logo":logo,
							"job_name":job_name,
							"company_name":company_name,
							"work_experience":work_experience,
							"job_type":job_type,
							"work_place":work_place,
							"salary":salary,
						}
					}
				}
			})
		}).catch(err=>{
			res.send({
			   "res_code": 0,
			   "res_error": err,
			   "res_body": {}
			});
		})
	},
	//修改
	update(req,res,next){
		
		const {_id,job_name,company_name,work_experience,job_type,work_place,salary}=req.body;

		const {logoimg}=req.body;
		// 如果有上传文件
		let logo = logoimg;
		if (req.file) {
			logo = "/imgs/upload/" + req.file.filename;
		}
		
		//保存职位信息
		PositionDao.update({_id,job_name,company_name,work_experience,job_type,work_place,salary,logo}).then(data=>{
			res.json({
				"res_code":1,
				"res_error":"",
				"res_body":{
					"status":200,
					"ret":{
						"code":1,
						"message":"职位修改成功",
						"data":{_id,logo,job_name,company_name,work_experience,job_type,work_place,salary}
					}
				}
			})
		}).catch(err=>{
			res.send({
			   "res_code": 0,
			   "res_error": err,
			   "res_body": {}
			});
		})
	},
	//查询所有数据
	find(req,res,next){
//		const {_id,logo,job_name,company_name,work_experience,job_type,work_place,salary}=req.query;
		PositionDao.find().then(data=>{
			if (data.length>0){
				res.json({
					"res_code":1,
					"res_error":"",
					"res_body":{
						"status":200,
						"ret":{
							"code":1,
							"message":"",
							"data":data
						}
					}
				});
			}
		})
	},
	
	//删除
	delete(req,res,next){
		const {_id}=req.body;
		PositionDao.delete({_id}).then(data=>{
			res.json({
				"res_code":1,
				"res_error":"",
				"res_body":{
					"status":200,
					"ret":{
						"code":1,
						"message":"删除成功",
						"data":data
					}
				}
			})
		}).catch(err=>{
			res.send({
			   "res_code": 0,
			   "res_error": err,
			   "res_body": {}
			});
		})
	},
	
	//按页查找数据
	findPage(req,res,next){
		const {page,pageSize}=req.query;
		PositionDao.findPage(page,pageSize).then(data=>{
			res.json({
				"res_code":1,
				"res_error":"",
				"res_body":{
					"status":200,
					"ret":{
						"code":1,
						"message":"",
						"data":data
					}
				}
			});
		}).catch(crr=>{
			res.send({
			   "res_code": 0,
			   "res_error": err,
			   "res_body": {}
			});
		})
	}
	
}

module.exports=PositionService;
