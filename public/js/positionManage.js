require(["config"],function(){
	require(["jquery","bootstrap","load"],function($){
		function positionManage(){
			this.init();
		}
		$.extend(positionManage.prototype, {
			init(){
				$("li.management").addClass("active").siblings().removeClass("active");
			}
		});
		new positionManage();
	})
})
