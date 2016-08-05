	(function(i,s,o,g,r,a,m){i["DaoVoiceObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","//widget.daovoice.io/widget/cd9644b0.js","daovoice");
		
	if($.cookie("token")!=null&&$.cookie("token")!="null"){
		
		if($.cookie("tuserid")!=null&&$.cookie("tuserid")!="null"){
			
		}else{
			var userid="";
			var nickname="";
			var regtime="";
			$.ajax({
			       // url: ngUrl+"/repositories/asd/asd",
			       	url: "/api/users/"+$.cookie("tname"),
			        type: "get",
			        cache:false,
			        data:{},
			        async:false,
			        dataType:'json',
			        success:function(json){
			        	userid=json.data.userId;
			        	nickname=json.data.nickName;
			        	regtime=json.data.registTime;
			        },
			        error:function(json){
			        	
			        }
			    });
			
			 var str = regtime;
			 str = str.replace(/-/g,"/");
			 var date = new Date(str); 
			 var humanDate = new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(), date.getSeconds())); 
			 regtime=humanDate.getTime()/1000 - 8*60*60;
			 
			 $.cookie("tuserid",userid.toString()); // 必填: 该用户在您系统上的唯一ID
			 $.cookie("tnickname",nickname); // 选填: 用户名
			 $.cookie("tregtime",regtime); // 选填: 用户的注册时间，用Unix时间戳表示
		}
		
		daovoice('init', {
		  	app_id: "cd9644b0",
		  	user_id: $.cookie("tuserid"), // 必填: 该用户在您系统上的唯一ID
		  	email: $.cookie("tname"), // 选填:  该用户在您系统上的主邮箱
		  	name: $.cookie("tnickname"), // 选填: 用户名
		  	signed_up: $.cookie("tregtime") // 选填: 用户的注册时间，用Unix时间戳表示
		});
		
	}else{		
		daovoice('init', {
			  app_id: "cd9644b0"
		});
	}
	daovoice('update');