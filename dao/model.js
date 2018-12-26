// 引入 mongoose 模块
const mongoose=require("mongoose");
// 连接数据库
mongoose.connect('mongodb://localhost:27017/h51808');
// 创建用户 Schema（数据结构）
const userSchema=new mongoose.Schema({
	username:String,
	password:String,
	email:String,
	reg_time:{ type: Date, default: Date.now }
});
// 创建用户模型 Model（相当于根据数据结构创建表: 在 mongodb 中创建 users 集合）
const User=mongoose.model('user',userSchema);

const positionSchema=new mongoose.Schema({
	logo:String,
	job_name:String,
	company_name:String,
	work_experience:String,
	job_type:String,
	work_place:String,
	salary:Number
});
const Position=mongoose.model('position',positionSchema);

const Model={User,Position};

module.exports=Model;
