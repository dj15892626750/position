require.config({
	baseUrl:"/",
	paths:{
		jquery:"/lib/jquery/jquery-1.12.4.min",
		bootstrap:"/lib/bootstrap/js/bootstrap.min",
		load:"/js/loadHeader",
		login:"/js/login-modal",
		register:"/js/register-modal",
		code:"/lib/jquery-plugins/jquery.code",//验证码
		
	},
	shim:{
		bootstrap:{
			deps:["jquery"]
		}
	}
})