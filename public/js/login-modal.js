define(["jquery"],function($){
	function LoginModal(){
		this.render();
		this.addListener();
	}
	LoginModal.template=`<!--登录模态框-->
		<div class="modal fade" id="loginModal" role="dialog" aria-labelledby="loginModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title" id="loginModalLabel">用户登录</h4>
		      </div>
		      <div class="modal-body">
		      	<div class="alert alert-danger hidden login-error">用户名或密码错误</div>
		        <form class="form-login">
				  <div class="form-group">
				    <label for="login-username">用户名</label>
				    <input type="text" class="form-control" name="username" id="login-username" placeholder="请输入用户名">
				  </div>
				  <div class="form-group">
				    <label for="login-password">密码</label>
				    <input type="password" class="form-control" name="password" id="login-password" placeholder="请输入密码">
				  </div>
				  <div class="form-group">
				    <label for="loginValidateCode">验证码</label>
				    <input type="text" class="form-control" id="loginValidateCode" placeholder="请输入验证码">
				    <div class="validate-code">
				    	
				    </div>
				  </div>
				</form>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-primary btn-login">登录</button>
		      </div>
		    </div>
		  </div>
		</div>`;
	$.extend(LoginModal.prototype, {
		render(){
			$(LoginModal.template).appendTo("body");
			this.genCode();
		},
		// 生成验证码
		genCode() {
			$.getJSON("/api/captcha/gen", (data)=>{
				$("div.validate-code").html(data.res_body.ret.data.image);
			});
		},
		addListener(){
			// 点击切换验证码
			$("div.validate-code").on("click",this.genCode);
			
			//验证验证码
			$("#loginValidateCode").on("blur", ()=>{
				const code=$("#loginValidateCode").val();
				$.getJSON("/api/captcha/verify", {code: code}, (data)=>{
					if(data.res_body.ret.data.valid){
						$(".login-error").text("验证成功");
						$(".login-error").addClass("hidden");
					}
					else{
						$(".login-error").text("验证码输入错误");
						$(".login-error").removeClass("hidden");
					}
						
				});
			});
			
			// 点击登录按钮
			$(".btn-login").on("click", this.loginHandler);
		},
		// 登录处理
		loginHandler() {
			// 获取登录表单中用户名与密码（待传递到服务器的数据）
			const data = $(".form-login").serialize();
			// API接口
			$.post("/api/users/login.do", data, (data)=>{
				console.log(data)
				if (data.res_body.ret.code !== 1) { // 用户名或密码错误
					$(".login-error").text("用户名或密码错误");
					$(".login-error").removeClass("hidden");
				} else { // 登录成功
					// 保存登录成功的用户信息
					sessionStorage.loginUser = data.res_body.ret.data.username;
					// 刷新页面
					location.reload();
				}
			}, "json")
		}
	});
	return LoginModal;
})