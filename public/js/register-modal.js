define(["jquery","code"],function($){
	function RegisetrModal(){
		this.render();
		this.addListener();
	}
	RegisetrModal.template=`<!--注册模态框-->
		<div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title" id="registerModalLabel">用户注册</h4>
		      </div>
		      <div class="modal-body">
		      <div class="alert alert-danger hidden register-error"></div>
		        <form class="form-register">
				  <div class="form-group">
				    <label for="register-username">用户名</label>
				    <input type="text" class="form-control" name="username" id="register-username" placeholder="输入用户名">
				  </div>
				  <div class="form-group">
				    <label for="register-password">密码</label>
				    <input type="password" class="form-control" name="password" id="register-password" placeholder="输入密码">
				  </div>
				  <div class="form-group">
				    <label for="confirm-password">确认密码</label>
				    <input type="password" class="form-control" id="confirm-password" placeholder="再次输入密码">
				  </div>
				  <div class="form-group">
				    <label for="register-email">邮箱</label>
				    <input type="email" class="form-control" name="email" id="register-email" placeholder="输入email地址">
				  </div>
				  <div class="form-group">
				    <label for="loginValidateCode">验证码</label>
				    <input type="text" class="form-control" id="registerValidateCode" placeholder="请输入验证码">
				    <div class="reg-validate-code"></div>
				  </div>
				</form>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-primary btn-register">注册</button>
		      </div>
		    </div>
		  </div>
		</div>`;
	$.extend(RegisetrModal.prototype, {
		render(){
			$(RegisetrModal.template).appendTo("body");
			this.genCode();
		},
		// 生成验证码
		genCode() {
			$.getJSON("/api/captcha/gen", (data)=>{
				$("div.reg-validate-code").html(data.res_body.ret.data.image);
			});
		},
		//添加事件监听
		addListener(){
			//点击切换验证码
			$("div.reg-validate-code").on("click",this.genCode);
			//验证验证码
			$("#registerValidateCode").on("blur", ()=>{
				const code=$("#registerValidateCode").val();
				$.getJSON("/api/captcha/verify", {code: code}, (data)=>{
					if(data.res_body.ret.data.valid){
						$(".register-error").text("验证成功");
						$(".register-error").addClass("hidden");
					}
					else{
						$(".register-error").text("验证码输入错误");
						$(".register-error").removeClass("hidden");
					}
						
				});
			});
			
			//验证表单数据
			$(".form-register").on("blur","#register-username, #register-password, #confirm-password, #register-email",$.proxy(this.testReg,this));
			//点击注册按钮
			$(".btn-register").on("click", this.registerHandler);
		},
		
		testReg(event){
			const $src=$(event.target);
			//正则验证
			const 
				reg_user=/^[a-zA-Z0-9_]{6,20}$/,
				reg_pwd=/^[a-zA-Z]\w{5,17}$/,
				reg_email=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			
			//判断是否符合格式
			if($src.is("#register-username")){
				if(!reg_user.test($src.val())){
					$(".register-error").text("用户名由6-20位数字、字母、下划线组成");
					$(".register-error").removeClass("hidden");
					return false;
				}else{
					$(".register-error").addClass("hidden");
				}
			}
			else if($src.is("#register-password")){
				if(!reg_pwd.test($src.val())){
					$(".register-error").text("密码字母开头，包含6-18位数字、字母、下划线");
					$(".register-error").removeClass("hidden");
					return false;
				}else{
					$(".register-error").addClass("hidden");
				}
			}
			else if($src.is("#confirm-password")){
				const password=$("#register-password").val();
				if($src.val()!==password){
					$(".register-error").text("两次输入的密码不一致");
					$(".register-error").removeClass("hidden");
					return false;
				}else{
					$(".register-error").addClass("hidden");
				}
			}
			else if($src.is("#register-email")){
				if(!reg_email.test($src.val())){
					$(".register-error").text("邮箱格式错误");
					$(".register-error").removeClass("hidden");
					return false;
				}else{
					$(".register-error").addClass("hidden");
				}
			}
			
		},
		registerHandler(){
			// 获取注册表单中用户名与密码（待传递到服务器的数据）
			const data = $(".form-register").serialize();
			console.log(data)
			// API接口
			$.post("/api/users/register.do", data, (data)=>{
				console.log(data);
				if(data.res_body.ret.code===0){
					$(".login-error").text("用户名已被占用");
					$(".login-error").removeClass("hidden");
				}
				else{
					// 保存登录成功的用户信息
					sessionStorage.loginUser = data.res_body.ret.data.username;
					// 刷新页面
					location.reload();
				}	
			}, "json")
			
		}
	});
	return RegisetrModal;
})