## 职位管理系统

### 搭建项目骨架

1. express --ejs --git
2. npm install
3. npm start

### 前后端分离

	public 目录下放置前端UI开发的静态资源
		public
			css		-- 外部CSS文件
			js			-- 外部JS文件
			imgs		-- 图像资源
			lib			-- 三方JS库
			html 	-- 静态HTML文件

	services 目录下放置后端业务逻辑处理资源
	dao 目录下放置后端数据访问处理资源


### 后端返回JSON数据格式

	{
	  "res_code": 1, // 响应码  1表示成功   0表示xxxx失败
	  "res_error": "", // 错误消息
	  "res_body": { // 响应主体
	    "status": 200, // HTTP状态码
	    "ret": { // 响应回的数据主体
	      "code": 1, // 当前任务操作成功还是失败：1 表示成功，0表示失败
	      "message": "", // 当前任务操作的消息
	      "data": { // 返回响应的主体内容
	        "username": "@name" 
	      }
	    }
	  }
	}

### webstorage

	localStorage：
	sessionStorage：
		存储容量：5MB
		存储时效：
			localStorage永久存储
			sessionStorage会话存储
	API：
		localStorage.setItem(key, value) -- 保存
			localStorage.<key> = value;
		localStorage.getItem(key) -- 读取
			var value = localStorage.<key>
		localStorage.removeItem(key) -- 移除
		localStorage.clear() -- 清空

### 验证码

	svg-captcha
		https://www.npmjs.com/package/svg-captcha
	安装
		npm install --save svg-captcha
	使用
	  // 引入中间件
	  const svgCaptcha  = require("svg-captcha");
	  // 创建验证码
	  const captcha = svgCaptcha .create();
	  // 将生成的验证码文本保存到 session 中
	  req.session.captcha = captcha.text;
	  // 响应返回验证码 <svg>
	  res.send(captcha.data);

### express-session

	express-session
		https://www.npmjs.com/package/express-session
	安装
		npm install express-session --save
	使用
		在 app.js 中编辑
		// 引入 express-session 模块
		const session = require("express-session")
		// 配置，在使用了 cookieParser 中间件后
		// 使用 session 中间件
		app.use(session({
		  secret: 'oiqerulkdsafoiasufoiwqe',
		  resave: false,
		  saveUninitialized: true,
		  cookie: { maxAge: 30 * 60 * 1000 } // session会话时效
		}))

### mongoose
	
	mongoose
		https://mongoosejs.com/
		安装：
			npm install mongoose --save
		使用：
			// 引入 mongoose 模块
			const mongoose = require('mongoose');
			// 连接数据库
			mongoose.connect('mongodb://localhost:27017/h51808');
			// 创建 Schema（数据结构）
			const schema = new mongoose.Schema({
				username: String, 
				password: String,
				email: String
			});
			// 创建模型 Model（相当于根据数据结构创建表: 在 mongodb 中创建 users 集合）
			const User = mongoose.model('user', schema);
			// 创建模型对象（相当于准备好要保存的数据）
			const xm = new User({ username: 'username', password: "abc", email: "xiaoming@qq.com" });
			// 保存
			xm.save().then(() => console.log('meow')).catch(()=>{});

### 上传文件

	服务器端
		multer(https://www.npmjs.com/package/multer)
		安装
			npm install --save multer
		使用
			配置：文件上传到服务器磁盘存储

	前端：
		使用 FormData 对象来上传文件。
		将待上传的信息都包装在 FormData 对象中，然后使用 ajax 提交上传数据。
		var formData = new FormData(formDomObject);
		$.ajax({
			type: "post",
			url: "/api/positions/add.do",
			data: formData,
			contentType: false,
			processData: false,
			dataType: "json",
			success: function(data) {
				console.log(data)
			}
		});

### POSTMAN

	Chrome浏览器插件：
		http://chromecj.com/web-development/2018-04/1373/download.html