/**
 * Created by Administrator on 2015/11/13.
 */
$(function(){
//	$(document).ready(function(){
//		$(document).keydown(function(event){
//			if(event.keyCode==13){
//			$("#signs").click();
//			}
//		}); 
//	
//	})
//
	$(document).on('click','#sign-in',function(){	
		var pcorphone =  browserRedirect();
		if(pcorphone == 'phone'){
			location.href="login_media.html";
		}
				 $(document).keydown(function(event){
					if(event.keyCode==13){
					$("#signs").click();
					}
				});	
				$("#exampleInputEmail1").blur(function(){
					var reg =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
			　　	if (!reg.test($("#exampleInputEmail1").val())) {
					$("#messageModa2").css("display","block");
					$("#messageModal").css("display","none");
					$("#messageModa3").css("display","none");
					$("#messageModa4").css("display","none");			
					$("#messageModa2").fadeOut(4000);
　					}		
				});	
				$("#exampleInputPassword1").blur(function(){
					if (($("#exampleInputPassword1").val())==""){
						//$("#messageModa4").css("display","block");			
						//$("#messageModa4").fadeOut(4000);
						$("#messageModal").css("display","none");
						$("#messageModal2").css("display","none");
						$("#messageModal3").css("display","none");
					}
					if(($("#exampleInputPassword1").val()).length<8){
						//$("#messageModa4").css("display","block");			
						//$("#messageModa4").fadeOut(4000);
						$("#messageModal").css("display","none");
						$("#messageModal2").css("display","none");
						$("#messageModal3").css("display","none");
					}

					if(($("#exampleInputPassword1").val()).length>32){
						//$("#messageModa4").css("display","block");			
						//$("#messageModa4").fadeOut(4000);
						$("#messageModal").css("display","none");
						$("#messageModal2").css("display","none");
						$("#messageModal3").css("display","none");
					}
				});		
	});
	
	$(document).on('click','#signs',function(){
		if (($("#exampleInputPassword1").val())==""){
			//$("#messageModa4").css("display","block");			
			//$("#messageModa4").fadeOut(4000);
			$("#messageModal").css("display","none");
			$("#messageModal2").css("display","none");
			$("#messageModal3").css("display","none");
		}

		if(($("#exampleInputPassword1").val()).length<8){
			//$("#messageModa4").css("display","block");			
			//$("#messageModa4").fadeOut(4000);
			$("#messageModal").css("display","none");
			$("#messageModal2").css("display","none");
			$("#messageModal3").css("display","none");
		}

		if(($("#exampleInputPassword1").val()).length>32){
			//$("#messageModa4").css("display","block");			
			//$("#messageModa4").fadeOut(4000);
			$("#messageModal").css("display","none");
			$("#messageModal2").css("display","none");
			$("#messageModal3").css("display","none");
		}
        var exampleInputEmail1 = $('#exampleInputEmail1').val();
        var exampleInputPassword1 = $('#exampleInputPassword1').val();
        var mdpass =  $.md5(exampleInputPassword1);
        var b = new Base64();
        var basePass = b.encode(exampleInputEmail1+":"+mdpass);
  //    console.log("---"+b.decode(basePass))
        $.ajax({
			url: ngUrl,
    		type: "get",
    		cache:false,
    	   	async:false,
    	  	headers:{Authorization:"Basic "+basePass},
    	  	beforeSend:function(){
  		  		$('#signs').attr('disabled','disabled');
  		  	},
  		  	complete:function(){
  		  		$('#signs').removeAttr('disabled');
  		  	},
    		success:function(json){ 
    			$.cookie("tname",exampleInputEmail1,{ expires: 1},{path:"/"});
    			$.cookie("token",json.data.token,{ expires: 1},{path:"/"});
    			//获取消息提示
    			$.ajax({
					url: ngUrl+"/notification_stat",
			        type: "get",
			        cache:false,
			        async:false,
			        headers:{Authorization:"Token "+$.cookie("token")},
			        dataType:'json',
			        success:function(json){
			        	//没有新消息
			        	if(json.data==null){
			        		
			        	}else{
			        		$.cookie("badgeHeader","badgeHeader");
			        	}
			        },
			        error:function(json){
			        	if(json.status==400){
			        		errorDialog(json.status,$.parseJSON(json.responseText).code,$.parseJSON(json.responseText).msg);			            
			        	}else{
			        		errorDialog(json.status,"","");            
			        	}
			            $('#errorDM').modal('show');
			        }
    			});
    			location.href=window.location.href;	
    		},
    		error:function (XMLHttpRequest, textStatus, errorThrown){
    			if(XMLHttpRequest.status==500){
    				$("#messageModa3").css("display","block");
					$("#messageModa2").css("display","none");
					$("#messageModal").css("display","none");
					$("#messageModa4").css("display","none");				
					$("#messageModa3").fadeOut(5000);
    			}
    			if(XMLHttpRequest.status==401){
    				$("#messageModa4").css("display","none");
    				$("#messageModa2").css("display","none");
					$("#messageModa3").css("display","none");
					$("#messageModal").css("display","block");					
					$("#messageModal").fadeOut(4000);		
    			}
    			if(XMLHttpRequest.status==403){
    				var codelogin=$.parseJSON(XMLHttpRequest.responseText).code;
    				if(codelogin=="1102"){
    					$("#messageModa4").text("用户未激活");
    				}else{
    					var times=$.parseJSON(XMLHttpRequest.responseText).data.retry_times;
        				if(times<5){
        					var timesnumLogin=5-times;
        					$("#messageModa4").text("用户名、密码不匹配，还有"+timesnumLogin+"次机会。");
        				}else{
        					var timenumLogin=formatSeconds($.parseJSON(XMLHttpRequest.responseText).data.ttl_times);
        					$("#messageModa4").html("<span class='back_icon'></span>登录密码错误次数已达上限<br/><div style='margin-left:28px;color:#ea0c1d;'>账号将在："+timenumLogin+"后自动解锁</div>");
        				} 	
    				}			
    				$("#messageModa4").css("display","block");
    				$("#messageModa2").css("display","none");
					$("#messageModa3").css("display","none");
					$("#messageModal").css("display","none");		
    			}
    		}
    	});        
        
    });	
    
	$(document).on('click','#logout',function(){
		$.cookie("tname",null,{path:"/"});
		$.cookie("token",null,{path:"/"});
		
		 $.cookie("tuserid",null,{path:"/"}); // 必填: 该用户在您系统上的唯一ID
		 $.cookie("tnickname",null,{path:"/"}); // 选填: 用户名
		 $.cookie("tregtime",null,{path:"/"}); // 选填: 用户的注册时间，用Unix时间戳表示
		 
		 $.cookie("badgeHeader",null,{path:"/"}); //新消息提示
		
		var href=location.href;
		var htmlnum=href.indexOf(".html");
		var strHref=href.substring(href.lastIndexOf("/")+1,htmlnum);
		if(strHref=="selects"||strHref=="search"||strHref=="repDetails"||strHref=="dataOfDetails"){
			location.href=window.location.href
		}else{
			location.href="/";
		}
		
		//location.href=window.location.href;
 	});

});

function formatSeconds(value) {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
            if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
            }
    }
        var result = ""+parseInt(theTime)+"秒";
        if(theTime1 > 0) {
        result = ""+parseInt(theTime1)+"分"+result;
        }
        if(theTime2 > 0) {
        result = ""+parseInt(theTime2)+"小时"+result;
        }
    return result;
}

	//make the origin login hide and the forget psd show
	$(function () { $('#myModal').on('hide.bs.modal', function () {
      $('#Modal').modal('show');
 		 })
   	});
 	      
	 	

