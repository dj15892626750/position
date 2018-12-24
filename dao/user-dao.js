const {User}=require("./model.js");

const UserDao={
	save(userInfo){
		const user=new User(userInfo);
		return user.save();
	},
	
	find(condition){
		return User.find(condition);
	}
};
module.exports=UserDao;
