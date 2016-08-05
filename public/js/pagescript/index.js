$("a").focus(function(){this.blur()});
$("#inLoginb").hide();
$("#inLoginf").hide();
$(function(){
	 if($.cookie("token")!=null&&$.cookie("tname")!=null&&$.cookie("tname")!="null"&&$.cookie("tname")!="null"){
		 $("#inLoginb").hide();
		 $("#inLoginf").show();
		 $("#innames").text($.cookie("tname"));
	 }else{
		 $("#inLoginb").show();
		 $("#inLoginf").hide();
	 }
	$(".be-loader").fadeOut("slow");
});
$.stellar({
	positionProperty: 'transform',
	verticalOffset: 1
});	
var options = {
	useEasing : true, 
	useGrouping : true, 
	separator : ',', 
	decimal : '.', 
	prefix : '', 
	suffix : '' 
};
	
//var numstopwatch1 = new CountUp("stopwatch1", 0, 864, 0, 2.5, options);
//var numstopwatch2 = new CountUp("stopwatch2", 0, 358, 0, 2.5, options);
//var numstopwatch3 = new CountUp("stopwatch3", 0, 578694, 0, 2.5, options);
	
//numstopwatch1.start();
//numstopwatch2.start();
//numstopwatch3.start();


$(document).ready(function(){
	var pcorphone =  browserRedirect();
	$(".slick-tab").children().click(function(){
		$(this).siblings().children().removeClass().addClass("m-bfff");
		$(this).children().removeClass().addClass("m-baaa");
	});

	if(pcorphone == 'pc') {
		jQuery("#changeH").slide({mainCell:"#lunCom",titCell:".slick-tab li",effect:"left",trigger:"click",easing:"easeOutBounce"});	
	}
	if(pcorphone == 'phone'){
		TouchSlide({slideCell:"#changeH",mainCell:"#lunCom",titCell:".slick-tab li"});
	}
	
	$(".m-sign").click(function(){
		if(pcorphone == 'pc') {
			$(".modal-open").css("padding-right", "15px");
			$('#myModal').modal('toggle');
		}
		if(pcorphone == 'phone'){
			location.href="login_media.html";
		}
	});
	 $('#myModal').on('shown.bs.modal', function (e) {
		 $("body").css("padding-right","0px");
	});
	if(pcorphone == 'pc'){
		$('.selectbtn').attr('href','/selects');		
//		$('#terminalhref').attr('href','/selects/终端专题');
//		$('#internethref').attr('href','/selects/互联网专题');
//		$('#investigationhref').attr('href','/selects/征信专题');
//		$('#operatorhref').attr('href','/selects/运营商专题');	
		$('#guanCom1').attr('href','/itemdet/Internet_stats/Ecommerce_goods');
		$('#guanCom2').attr('href','/itemdet/Transportation_of_beijing/Rail_transit_route');
		$('#guanCom3').attr('href','/itemdet/Meteorological/Synthetic_pollution_index');
		$('#guanCom4').attr('href','/itemdet/Base_station_location/Base_station_location');
		$('#guanCom5').attr('href','/itemdet/Financial_Statistics/Financial_Market_Statistics');
		$('#guanCom6').attr('href','/itemdet/Hot_searches/Hot_words');
	}
	

	 

//		$(document).on('keydown',"#kw",function (e) {
//			  if (e.keyCode == 13) {
//				  var vals=$(this).val();
//				  location.href="/search/"+vals;
//			  }
//		 });
//		
//		$(document).on('click',"#su",function (e) {
//			var vals=$("#kw").val();
//			if(vals==""){
//				location.href="search";
//			}else{
//				location.href="/search/"+vals;
//			}
//	 });
	$(document).on('keydown',"#kw",function (e) {
		  if (e.keyCode == 13) {
			  var vals=$(this).val();
			  vals=encodeURIComponent(vals);
		  		if(vals!=""){
		  			vals=vals.replace("\/","_*_");
		        }
			  if(pcorphone == 'pc'){
				  location.href="/search/"+vals;
			  }
			  if(pcorphone == 'phone'){
				  location.href="searchPhone.html?rtext="+vals;
			  }
		  }
	 });
	
	$(document).on('click',"#su",function (e) {
		var vals=$("#kw").val();
		  vals=encodeURIComponent(vals);
	  		if(vals!=""){
	  			vals=vals.replace("\/","_*_");
	        }
		if(vals==""){
			location.href="search";
		}else{
			location.href="/search/"+vals;
		}
	});
		


	 	$(document).on('click','#logout',function(){
			$.cookie("tname",null,{path:"/"});
			$.cookie("token",null,{path:"/"});
			
			 $.cookie("tuserid",null,{path:"/"}); // 必填: 该用户在您系统上的唯一ID
			 $.cookie("tnickname",null,{path:"/"}); // 选填: 用户名
			 $.cookie("tregtime",null,{path:"/"}); // 选填: 用户的注册时间，用Unix时间戳表示
			 
			 $.cookie("badgeHeader",null,{path:"/"}); //新消息提示
			
			 location.href="/";
	 	});
	 	
	 	$("#inLoginb").find("li a span").addClass("m-loginbtnshow");
	 	
		if($.cookie("badgeHeader")!=null&&$.cookie("badgeHeader")!="null"){
			$(".badgeHeader").show();
		}else{
			$(".badgeHeader").hide();
		} 
		
	 	$(".badgeHeader").click(function(e){
	 		e.stopPropagation();
	 		location.href="/my/msgreq";
	 	});
	 	
   	 	//循环获取消息
   	 	setInterval(mess,5000);
   	 	
   	 	function mess(){
   	 		var headerToken={};
   	 		//登陆后
   	 		if($.cookie("token")!=null&&$.cookie("token")!="null"){
   	 			//获取消息提示
   	 			$.ajax({
   	 				url: "/api/notification_stat",
   	 		        type: "get",
   	 		        cache:false,
   	 		        async:false,
   	 		        headers:{Authorization:"Token "+$.cookie("token")},
   	 		        dataType:'json',
   	 		        success:function(json){
   	 		        	//没有新消息
   	 		        	if(json.data==null){
   	 		        		$(".badgeHeader").hide();
   	 		        	}else{
   	 		        		$(".badgeHeader").show();
   	 		        	}
   	 		        	
//	   	 				if($.cookie("badgeHeader")!=null&&$.cookie("badgeHeader")!="null"){
//		   	 				$(".badgeHeader").show();
//		   	 			}else{
//		   	 				$(".badgeHeader").hide();
//		   	 			} 
   	 		        	
   	 		        }
   	 			});
   	 		}		
   	 	}
});
	
