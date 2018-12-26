require(["config"],function(){
	require(["jquery","bootstrap","load"],function($){
		function positionManage(){
			this.init();
			this.that="";
			this.addListener();
		}
		$.extend(positionManage.prototype, {
			init(){
				$("li.management").addClass("active").siblings().removeClass("active");
				//查询第一页的数据并渲染在页面中
				this.findPage(1);
				//查询所有的职位信息并进行分页
				$.getJSON("/api/position/find.do",(data)=>{
					const list=data.res_body.ret.data;
					
					//分页
					const pageSize=8;//每页显示数据
					const totalPage=Math.ceil(list.length/pageSize);//总页数
					
					let pages=`<li class="disabled">
						      <a href="javascript:" aria-label="Previous" class="prev">
						        <span aria-hidden="true">&laquo;</span>
						      </a>
						    </li>`;
						for (let i=1;i<=totalPage;i++) {
							pages+=`<li><a href="javascript:">${i}</a></li>`;
						}
						pages+=`<li>
						      <a href="javascript:" aria-label="Next" class="next">
						        <span aria-hidden="true">&raquo;</span>
						      </a>
						    </li>`;
						    
					//添加到分页容器中	    
					$(".pagination").html(pages);
					//默认第一页选中
					$(".pagination li:nth-child(2)").addClass("active");
					this.that=$(".pagination li:nth-child(2)").children();
				})
			},
			
			//按页查找 
			findPage(page){
				page=page || 1;
				const pageSize=8;
				$.ajax({
					type:"get",
					url:"/api/position/findPage.do",
					data:{page,pageSize},
					dataType:"json",
					success:function(data){
						const list=data.res_body.ret.data;
						let html="";
						for (let curr in list) {
							html+=`<tr>
								<td class="id" style="display:none">${list[curr]._id}</td>
								<td class="order">${Number(curr)+1}</td>
								<td class="imglogo"><img src="${list[curr].logo}"/></td>
								<td class="name">${list[curr].job_name}</td>
								<td class="company">${list[curr].company_name}</td>
								<td class="experience">${list[curr].work_experience}</td>
								<td class="type">${list[curr].job_type}</td>
								<td class="address">${list[curr].work_place}</td>
								<td class="salary">${list[curr].salary}</td>
								<td>
									<a href="#" class="update" data-toggle="modal" data-target="#updateModal">修改</a>
									<a href="javascript:" class="del">删除</a>
								</td>
							</tr>`;
						}
						$("#tbd").html(html);
					},
					error:function(e){
						console.log(e)
					}
				});
			},
			
			//添加事件监听
			addListener(){
				//添加职位
				$(".btn-add").on("click",this.addPosition);
				
				//点击修改链接
				$("#tbd").on("click",".update",$.proxy(this.updatePosition,this));
				
				//点击修改按钮保存修改后的职位信息
				$(".btn-update").on("click",this.updateSavaPosition);
				
				//删除
				$("#tbd").on("click",".del",$.proxy(this.deletePosition,this));
				
				//点击分页查询数据
				$(".pagination").on("click","a",$.proxy(this.changePage,this));
			},
			
			//添加职位
			addPosition(){
				// 获取表单中待提交数据，将其包装在 FormData 对象中
				const formData = new FormData($(".add-form")[0]);
				
				$.ajax({
					type:"post",
					url:"/api/position/add.do",
					data:formData,
					contentType:false,
					processData:false,
					dataType:"json",
					success:function(data){
						console.log(data);
						location.reload();
					},
					error:function(e){
						console.log(e)
					}
				});

			},
			
			//点击修改链接将数据写入模态框中
			updatePosition(event){
				const $src=$(event.target);
				//获得当前所在行
				const $parent=$src.parents("tr");
				const 
					id=$parent.find(".id").text(),
					logo=$parent.find(".imglogo").find("img").attr("src");
					name=$parent.find(".name").text(),
					company=$parent.find(".company").text(),
					experience=$parent.find(".experience").text(),
					type=$parent.find(".type").text(),
					address=$parent.find(".address").text(),
					salary=$parent.find(".salary").text();

				$(".update-form").find("#_id").val(id);
				$(".update-form").find("#logo").val(logo);
				$(".update-form").find("#update-job-name").val(name);
				$(".update-form").find("#update-company-name").val(company);
				$(".update-form").find("#update-work-experience").val(experience);
				$(".update-form").find("#update-job-type").val(type);
				$(".update-form").find("#update-work-place").val(address);
				$(".update-form").find("#update-salary").val(salary);
			},
			
			//点击修改按钮保存修改后的职位信息
			updateSavaPosition(){
				// 获取表单中待提交数据，将其包装在 FormData 对象中
				const formData = new FormData($(".update-form")[0]);
				
				$.ajax({
					type:"post",
					url:"/api/position/update.do",
					data:formData,
					contentType:false,
					processData:false,
					dataType:"json",
					success:function(data){
						console.log(data);
						location.reload();
					},
					error:function(e){
						console.log(e)
					}
				});
			},
			
			//删除
			deletePosition(event){
				const $src=$(event.target);
				const $parent=$src.parents("tr");
				const _id=$parent.find(".id").text();
				if(confirm("确定要删除这条数据吗？")){
					$.ajax({
						type:"post",
						url:"/api/position/delete.do",
						data:{_id},
						dataType:"json",
						success:function(data){
							$parent.remove();
							console.log(data);
						},
						error:function(e){
							console.log(e);
						}
					})

				}
			},
			
			//点击分页查询数据
			changePage(event){
				const $src=$(event.target);
				let page=1;
				const len=$(".pagination li").length;
				if($src.is("a")){
					//上一页
					if($src.is(".prev")){
						page=page-1;
						//按页查询数据
						this.findPage(page);
						
						this.that=this.that.parents("li").prev();
						this.that.addClass("active").siblings().removeClass("active");
						this.that=this.that.children();
						console.log(this.that.text().trim())
						if(this.that.text().trim()<=1){
							$(".prev").parents("li").addClass("disabled");
						}else{
							$(".pagination :last-child").removeClass("disabled");
						}
					}
					//下一页
					else if($src.is(".next")){
						page=page+1;
						//按页查询数据
						this.findPage(page);
						
						this.that=this.that.parents("li").next();
						this.that.addClass("active").siblings().removeClass("active");
						this.that=this.that.children();
						console.log(this.that.text().trim())
						if(this.that.text().trim()>=len-2){
							$(".pagination :last-child").addClass("disabled");
						}else{
							$(".prev").parents("li").removeClass("disabled");
						}
					}
					//直接点击页数
					else{
						this.that=$src;
						page=$src.text();
						//按页查询数据
						this.findPage(page);
						//选中当前点击的页数
						$src.parents("li").addClass("active").siblings().removeClass("active");
						
						//判断当前页是否为第一或最后一页
						if(page<=1){
							$(".prev").parents("li").addClass("disabled");
						}else{
							$(".prev").parents("li").removeClass("disabled");
						}
						if(page>=(len-2)){
							$(".pagination :last-child").addClass("disabled");
						}else{
							$(".pagination :last-child").removeClass("disabled");
						}
					}
				}
			},
		});
		new positionManage();
	})
})
