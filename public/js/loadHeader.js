define(["jquery"],function($){
	function loadHeader(){
		this.init();
	}
	$.extend(loadHeader.prototype, {
		init(){
			this.Header();
		},
		Header(){
			$.get("/html/_header.html",(data)=>{
				$(".navbar").html(data);
			});
		}
	});
	return new loadHeader();
})