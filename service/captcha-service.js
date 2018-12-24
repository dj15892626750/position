const svgCaptcha = require("svg-captcha");

const UserService={
	genCode(req,res,next){
		const captcha=svgCaptcha.create({
			color:true,
			noise:4
		});
//		const captcha=svgCaptcha.createMathExpr();
		req.session.captcha=captcha.text;
		console.log(captcha.text);
		//响应
		res.json({
		  "res_code": 1,
		  "res_error": "",
		  "res_body": {
		    "status": 200,
		    "ret": {
		      "code": 1,
		      "message": "请求到接口数据",
		      "data": {
		        "image": captcha.data
		      }
		    }
		  }
	  	});
	},
	verify(req,res,next){
		//获取请求中传递的待校验的验证码文本
		const {code}=req.query;//从get请求中获取参数
		//req.body --从post请求中获取参数
		//与保存在session中的验证码比较
		let valid=false;
		if(code.toUpperCase()===req.session.captcha.toUpperCase()){
			valid=true;
		}
		res.json({
			"res_code":1,
			"res_error":"",
			"res_body":{
				"status":200,
				"ret":{
					"code":0,
					"message":"",
					"data":{
						"valid":valid
					}
				}
			}
		})
	}
}
module.exports = UserService;

