$(function(){
	var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	new Vue({
		  el: '.modal-body',
		  data: {
		        user: {
		            email: '',
		            pwd: '',
		            reme:false,
		            loginok:false
		        }
		  },
//		  watch:{
//		        'user.email':function(val){
//		            if (val==""){
//		            	$("#messageModa2").html("<span class='back_icon'></span>用户名不能为空").show();
//		                this.user.loginok=false;
//		            }else if (!reg.test(val)) {
//		            	$("#messageModa2").html("<span class='back_icon'></span>邮箱格式不正确,请重新输入").show();
//		            	this.user.loginok=false;
//		            }else{
//		            	$("#messageModa2").hide();
//		                this.user.loginok=true;
//		            }
//		        }
//		    },
		  methods: {
			    login: function() {

			    	var exampleInputEmail1 = this.user.email;
			    	var mdpass = $.md5(this.user.pwd);
			    	var reme= this.user.reme;				      
					      var exampleInputPassword1 = mdpass;
					      var b = new Base64();
					      var basePass = b.encode(exampleInputEmail1+":"+mdpass);
					      var tb=true;
					//新增格式判断
					    	if (!reg.test(exampleInputEmail1)) {
				            	$("#messageModa2").html("<span class='back_icon'></span><div style='float: left; width: 210px;'>邮箱格式不正确,请重新输入</div>").show();	
				            	$("#exampleInputEmail1").focus();
				            	tb=false;
				            }else{
				            	$("#messageModa2").hide();
				            	tb=true;
				            }
					   if(tb){
						   $.ajax({
						      	url: "/api",
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
						      		if(reme){
						      			$.cookie("tname",exampleInputEmail1,{ expires: 1},{path:"/"});
							      		$.cookie("token",json.data.token,{ expires: 1},{path:"/"});
						      		}else{
						      			$.cookie("tname",exampleInputEmail1,{path:"/"});
							      		$.cookie("token",json.data.token,{path:"/"});
						      		}
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
						      		var localHref=window.location.href;
									if(localHref.match('/pwd')||localHref.match('/forgetpw')||localHref.match('/regmessage')){
										location.href='/'
									}else{
										location.href=localHref;
									}
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
						      					$("#messageModa4").html("<span class='back_icon'></span><div style='float: left; width: 210px;'>用户名、密码不正确。<br/>还有"+timesnumLogin+"次机会。</div>").show();
						      				}else{
						      					var timenumLogin=formatSeconds($.parseJSON(XMLHttpRequest.responseText).data.ttl_times);
						      					$("#messageModa4").html("<span class='back_icon'></span><div style='float: left; width: 210px;'>登录密码错误次数已达上限，账号将在："+timenumLogin+"后自动解锁</div>");
						      				} 	
						      			}			
						      			$("#messageModa4").css("display","block");
						      			$("#messageModa2").css("display","none");
						      			$("#messageModa3").css("display","none");
						      			$("#messageModal").css("display","none");		
						      		}
						      	}
						      });
					   } 	
			    },
			    tt:function(){
			    	var val = this.user.email;
			    	if (!reg.test(val)) {
		            	$("#messageModa2").html("<span class='back_icon'></span><div style='float: left; width: 210px;'>邮箱格式不正确,请重新输入</div>").show();
		            }else{
		            	$("#messageModa2").hide();
		            }
			    }
		  }
	});
	
	
	 	$(".shens").attr("src","/img/images02_158.png");
		$(document).on("mouseenter mouseleave",'.shens',function(event){ 
			 if(event.type == "mouseenter"){
				 $(".shens").attr("src","/img/images02_160.png");
		     }
			 if(event.type == "mouseleave"){
				 $(".shens").attr("src","/img/images02_158.png");
		     }
		  });
	

});



 	      
	 	

