const mongoose=require("mongoose");

mongoose.connect('mongodb://localhost:27017/h51808');

const userSchema=new mongoose.Schema({
	username:String,
	password:String,
	email:String
});

const User=mongoose.model('user',userSchema);

const positionSchema=new mongoose.Schema({
	logo:String,
	company:String,
	salary:Number
});
const Position=mongoose.model('position',positionSchema);

const Model={User,Position};

module.exports=Model;
