require.config({
	baseUrl:"/",
	paths:{
		jquery:"/lib/jquery/jquery-1.12.4.min",
		bootstrap:"/lib/bootstrap/js/bootstrap.min",
		load:"/js/loadHeader",
		login:"/js/login-modal",
		register:"/js/register-modal",

		
	},
	shim:{
		bootstrap:{
			deps:["jquery"]
		}
	}
})