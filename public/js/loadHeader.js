define(["jquery","login","register"],function($,LoginModal,RegisetrModal){
	function loadHeader(){
		this.Header();
		this.showLoginInfo();
//		this.loadModal();
		this.addListener();
	}
	loadHeader.template=`<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">拉勾网管理系统</a>
    </div>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav" id="nav">
        <li class="active index"><a href="/">首页</a></li>
        <li class="management"><a href="/html/positionManage.html">职位管理</a></li>
      </ul>
      
      <ul class="nav navbar-nav navbar-right not-loged-in">
        <li><a href="#" data-toggle="modal" data-target="#loginModal">登录</a></li>
        <li><a href="#" data-toggle="modal" data-target="#registerModal">注册</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right loged-in hidden">
        <li><a href="#">欢迎：</a></li>
        <li><a href="#" class="link-logout">退出</a></li>
      </ul>
    </div>
  </div>
</nav>`;
	$.extend(loadHeader.prototype, {
		Header(){
			$(loadHeader.template).prependTo("body");
		},
		// 加载显示用户信息
		showLoginInfo() {
			// 判断是否有用户登录
			const user = sessionStorage.loginUser;
			if (user) { // 有登录成功的用户，则显示欢迎
				$(".loged-in").removeClass("hidden").siblings(".not-loged-in").remove();
				$(".loged-in a:first").text("欢迎：" + user);
			} else {
				this.loadModal();
			}
		},
		//加载模态框
		loadModal(){
			new LoginModal();
			new RegisetrModal();
		},
		addListener(){
			$(".link-logout").click(()=>{
				sessionStorage.removeItem("loginUser");
				location.reload();
			})
		},
	});
	return new loadHeader();
})