$("a").focus(function(){this.blur()});
//$(window).load(function(){
//	$(".be-loader").fadeOut("slow");
//});
$(function(){
	$(".be-loader").fadeOut("slow");
})
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
	
var numstopwatch1 = new CountUp("stopwatch1", 0, 864, 0, 2.5, options);
var numstopwatch2 = new CountUp("stopwatch2", 0, 116, 0, 2.5, options);
var numstopwatch3 = new CountUp("stopwatch3", 0, 578694, 0, 2.5, options);
	
numstopwatch1.start();
numstopwatch2.start();
numstopwatch3.start(); 


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
		$('#terminalhref').attr('href','selects.html?type=终端专题');
		$('#internethref').attr('href','selects.html?type=互联网专题');
		$('#investigationhref').attr('href','selects.html?type=征信专题');
		$('#operatorhref').attr('href','selects.html?type=运营商专题');
		$('#guanCom1').attr('href','itemDetails.html?repname=Internet_stats&itemname=Ecommerce_goods');
		$('#guanCom2').attr('href','itemDetails.html?repname=Transportation_of_beijing&itemname=Rail_transit_route');
		$('#guanCom3').attr('href','itemDetails.html?repname=Meteorological&itemname=Synthetic_pollution_index');
		$('#guanCom4').attr('href','itemDetails.html?repname=Base_station_location&itemname=Base_station_location');
		$('#guanCom5').attr('href','itemDetails.html?repname=Financial_Statistics&itemname=Financial_Market_Statistics');
		$('#guanCom6').attr('href','itemDetails.html?repname=Hot_searches&itemname=Hot_words');
	}
	if(pcorphone == 'phone'){
		$('.selectbtn').attr('href','selectsPhone.html');
		$('#terminalhref').attr('href','selectsPhone.html?type=终端专题');
		$('#internethref').attr('href','selectsPhone.html?type=互联网专题');
		$('#investigationhref').attr('href','selectsPhone.html?type=征信专题');
		$('#operatorhref').attr('href','selectsPhone.html?type=运营商专题');
		$('#guanCom1').attr('href','itemDetailsPhone.html?repname=Internet_stats&itemname=Ecommerce_goods');
		$('#guanCom2').attr('href','itemDetailsPhone.html?repname=Transportation_of_beijing&itemname=Rail_transit_route');
		$('#guanCom3').attr('href','itemDetailsPhone.html?repname=Meteorological&itemname=Synthetic_pollution_index');
		$('#guanCom4').attr('href','itemDetailsPhone.html?repname=Base_station_location&itemname=Base_station_location');
		$('#guanCom5').attr('href','itemDetailsPhone.html?repname=Financial_Statistics&itemname=Financial_Market_Statistics');
		$('#guanCom6').attr('href','itemDetailsPhone.html?repname=Hot_searches&itemname=Hot_words');
	}
	 
	 if($.cookie("token")!=null&&$.cookie("tname")!=null&&$.cookie("tname")!="null"&&$.cookie("tname")!="null"){
		 $("#inLoginb").hide();
		 $("#inLoginf").show();
		 $("#innames").text($.cookie("tname"));
	 }else{
		 $("#inLoginb").show();
		 $("#inLoginf").hide();
	 }
		$(document).on('keydown',"#kw",function (e) {
			  if (e.keyCode == 13) {
				  var vals=$(this).val();
				  vals=encodeURIComponent(vals);
			  		if(vals!=""){
			  			vals=vals.replace("\/","_*_");
			        }
				  if(pcorphone == 'pc'){
					  location.href="search.html?rtext="+vals;
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
		
		
		if($.cookie("badgeHeader")!=null&&$.cookie("badgeHeader")!="null"){
			$(".badgeHeader").show();
		}else{
			$(".badgeHeader").hide();
		} 
		
	 	$(".badgeHeader").click(function(e){
	 		e.stopPropagation();
	 		location.href="messageRequired.html";
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
});
	
