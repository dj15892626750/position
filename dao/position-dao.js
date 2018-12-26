const {Position}=require("./model.js");

const PositionDao={
	save(positionInfo){
		const position=new Position(positionInfo);
		return position.save();
	},
	
	update(positionInfo) {
		return Position.update({_id: positionInfo._id}, positionInfo);
	},
	
	find(condition){
		return Position.find(condition);
	},
	
	delete(positionInfo){
		return Position.deleteOne({_id: positionInfo._id});
	},
	
	findPage(page,pageSize){
		return Position.find().skip(Number((page-1)*pageSize)).limit(Number(pageSize));
	}
};
module.exports=PositionDao;
