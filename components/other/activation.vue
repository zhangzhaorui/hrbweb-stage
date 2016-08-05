<style>
	.created{
		margin-top: 40px;
		border-top:5px solid #c8c8c8;
		border-bottom: 1px solid #395289;
		border-left: 1px solid #395289;
		border-right: 1px solid #395289;
		width:740px;
		height:310px;
	}
	#successed{
		float: left;
		margin-top: 40px;
		margin-left: 50px;
		font-size:27px;
		color: #333333;
	}
	#info {
		float:left;
	}
	#info p{
		margin-left: -35px;
		margin-top: 70px;
		margin-bottom: 70px;
		font:16px;
		text-align: center;
	}
	#login{
		float: left;
		margin-left: 245px;
		margin-bottom:56px;
		background-image: linear-gradient(to bottom, #337ab7 0%, #265a88 100%);
		font:18px bold;
		color:#ffffff;
		height:40px;
		width:255px;
	}
	.m-btnlogin {
	    background-color: #29abe2;
	    color: #fff;
	    font-size: 18px;
	    height: 40px;
	}
	.m-btnlogin:hover{
		background-color:#1998ce;
	}
	
	#signs span{
		display:block;
		width:100%;
	}
	#signs:hover{
		color:#fff;
	}
	
	
</style>

<template>
    <!--<div class="container">
        <h2 class="red">{{msg}}</h2>
        ---{{show}}
    </div>-->
    
    <div class="container" style="margin-top:50px; margin-bottom:100px; width:740px;" id="succnew" v-if="show">
		<div>
			<div ID="created" class="created">
				<div ID="successed">
					<p>注册DataHub账号</p>
				</div>
				<div ID="info" style="margin-top:70px">
					<p style="font:16px;">恭喜您，账号<a></a>已注册成功，开始寻找海量数据吧！</p>
				</div>
				<div class="btn m-btnlogin" id="signs" style="width: 300px;float:left;margin-left:230px;">			
					<model m-text="马上登陆" m-title="登录" m-href="login" m-width="300"></model>
				</div>
			</div>
		</div>
	</div>
	
	<div class="container" style="margin-top:50px; margin-bottom:100px; width:740px;" v-else>
		<div class="created" id="created" v-if="shown">
			<div id="successed">
				<p>注册DataHub账号</p>
			</div>
			<div style="margin-top:70px" id="info">
					<p style="font:16px;">您的激活链接已超过24小时有效期，无法激活。</p>
			</div>
			<div class="container" style="width: 210px;">
				<div @click="repost" class="btn m-btnlogin" id="signs" style="width: 300px;float:left;margin-left:-55px;">			
					重新发送激活邮件
				</div>
				<!--
				<button class="btn btn-primary btn-lg" ID="resend" role="button" HREF="javaScript:void(0);">
				重新发送激活邮件
				</button>
				-->
			</div>
		</div>	
		<div class="created" id="created" v-else>
			<div style="float:left;width:100%;margin-left: 140px;margin-top: 150px;">
					<p style="font:16px;">邮件已发送！请点击邮箱(<a href={{email}}>{{email}}</a>)中的链接完成账号激活！</p>
			</div>
		</div>
	</div>
    
    
</template>

<script>
    export default {
        data () {
            return {
                shown:true
            }
        },
        props: ['loginname','show','sid'],
        computed: {
		    email: function () {
				var loginname=this.loginname;
				var newloginname=loginname.substring(loginname.indexOf("@"),loginname.length);
		      	return "http://mail"+newloginname;
		    }
		},
        methods: {
            repost () {
            	var shown=this.shown;
                $.ajax({
			        url: "/api/users/"+this.loginname+"/resend/active",
			        type: "PUT",
			        cache:false,
			        async:false,
			        dataType:'json',
			        contentType:"application/json",
			        success:function(json){
			        	shown=false;
			        }
			    });
			    this.shown=shown;
            }
        }
    }
</script>