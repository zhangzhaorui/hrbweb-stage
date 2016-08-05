/**
 * Created by Max cheng on 2016/3/8.
 */

$(document).ready(function(){
    $(document).on("click",".u-hSearchBtn",function(){
        var vals=$("#u-header-notLogin").val();
        if(vals==""){
            location.href="/search";
        }else{
        	vals=vals.replace("\/","_*_");
            location.href="/search/"+vals;
        }
    });
    
    $(document).on('keydown',"#u-header-notLogin",function (e) {
  	  if (e.keyCode == 13) {
  		  var vals=$(this).val();
	  		if(vals==""){
	            location.href="/search";
	        }else{
	        	vals=vals.replace("\/","_*_");
	            location.href="/search/"+vals;
	        }
	  	  }
  	});
    
    if($.cookie("token")!=null&&$.cookie("tname")!=null&&$.cookie("tname")!="null"&&$.cookie("tname")!="null"){
		$('.g-iLoginb').hide();
		$(".g-iLoginf").show();
		$("#innames").text($.cookie("tname"));
	}else{
		$('.g-iLoginb').show();
		$(".g-iLoginf").hide();
	}
	$(document).on('click','#logout',function(){
		$.cookie("tname",null,{path:"/"});
		$.cookie("token",null,{path:"/"});
		
		 $.cookie("tuserid",null,{path:"/"}); // 必填: 该用户在您系统上的唯一ID
		 $.cookie("tnickname",null,{path:"/"}); // 选填: 用户名
		 $.cookie("tregtime",null,{path:"/"}); // 选填: 用户的注册时间，用Unix时间戳表示
		 
		 $.cookie("badgeHeader",null,{path:"/"}); //新消息提示
		
		 location.href="/";
 	});
    
	$(document).ready(function(){
		$(".be-loader").fadeOut("slow");
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

	
 	$(".g-iLoginb").find("li a span").addClass("m-loginbtnshow");
 	
 	//消息
	if($.cookie("badgeHeader")!=null&&$.cookie("badgeHeader")!="null"){
		$(".badgeHeader").show();
	}else{
		$(".badgeHeader").hide();
	} 
	
 	$(".badgeHeader").click(function(e){
 		e.stopPropagation();
 		location.href="/my/msgreq";
 	});
	
 	
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
 		        	
//   	 				if($.cookie("badgeHeader")!=null&&$.cookie("badgeHeader")!="null"){
//	   	 				$(".badgeHeader").show();
//	   	 			}else{
//	   	 				$(".badgeHeader").hide();
//	   	 			} 
 		        	
 		        }
 			});
 		}		
 	}
 	
 	
	
});