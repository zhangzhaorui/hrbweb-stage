/**
 * Created by Max cheng on 2016/5/3.
 */
var type="";



new Vue({
    el:'.certificateCenter',
    data:{
        email:$.cookie("tname"),
        href:"",
        status:"",
        type:"",
        statusbool:"",
		statusauth:"",
		masssage:""
    },
    ready: function () {
    	var status=this.status;
    	var type=this.type;
		var masssage=this.masssage;
    	$.ajax({
            type: "get",
            url:"/api/users/"+$.cookie("tname"),
            cache:false,
            async:false,
            headers:{Authorization:"Token "+$.cookie("token")},
            success: function(msg){
               status=msg.data.userStatus;
               type=msg.data.type;
				masssage=msg.data.masssage;
            }
        });
    	this.status=status;
    	this.type=type;
		this.masssage=masssage;
		//this.masssage="跟哥哥哥哥哥哥哥";
		console.log(this.masssage);
    	if(this.status==2){
    		this.statusbool=true;
    	}else{
    		this.statusbool=false;

			if(this.status==5){
				this.statusauth=true;
			}else{
				this.statusauth=false;
			}


    	}
    	if(this.type==1){
    		this.type="个人";
    	}
    	if(this.type==2){
    		this.type="企业";
    	}
    	if(this.status==1){
    		this.status="未激活";
    	}
    	if(this.status==2){
    		this.status="激活";
    	}
    	if(this.status==3){
    		this.status="认证";
    	}
    	if(this.status==4){
    		this.status="等待审核";
    	}
    	if(this.status==5){
    		this.status="审核未通过";
    	}
    	if(this.status==7){
    		this.status="账号销毁";
    	} 	
    	
    },
	computed: {
		// 一个计算属性的 getter
		dhref: function () {
			if(this.type=="企业"){
				return "/my/comCertifyNew"
			}
			if(this.type=="个人"){
				return  "/my/personCertify"
			}
		}
	},
    methods:{
        selected:function(e){
            $(e.target).addClass('selected').siblings().removeClass();
            if(e.target.id=='company'){
               this.href='/my/comCertifyNew';
            }else{
            	this.href='/my/personCertify';
            }
        },
        next:function(e){
        	location.href=this.href;
        }
    }
});