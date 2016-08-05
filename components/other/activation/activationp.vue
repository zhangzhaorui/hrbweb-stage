<style>
body{
    background-color: #f5f5f5;
}
.companyCertify{
    margin: auto;
    width:690px;
    height:100%;
    vertical-align: middle;
    background-color: #ffffff;
    margin-top: 100px;
    padding: 30px 45px;
    border-radius: 8px;
}
.cc_title{
    padding-bottom: 10px;
    border-bottom: 2px solid #39589a;
    margin-left: -15px;
    width: 630px;
}
.cc_title > p:nth-child(1){
    font-size: 20px;
}
.cc_title > p:nth-child(2){
    font-size: 12px;
}
.cc_content .nav-tabs{
    border-bottom: 1px solid #39589a;
    width: 630px;
    margin-left: -15px;
}
.nav-tabs li{
    text-align: center;
    height:45px;
    line-height: 45px;
    padding:0 10px;
    width:33%;
}
.nav-tabs li:hover{
    cursor: pointer;
}
.selected{
    border-bottom: 4px solid #39589a;
    font-weight: bold;
    color:#39589a;
}
/*view*/
.view_title{
    font-size: 14px;
    height: 40px;
    line-height:40px;
    font-weight: bold;
    color:#666666;
    border-bottom: 1px solid #c7c7c7;
    margin:0px 0px 0px -15px;
    width: 630px;
    padding-left: 15px;
}
.view3_title{
    height: 47px;
    color:#666666;
    border-bottom: 1px solid #c7c7c7;
    margin:0px 0px 0px -15px;
    width: 630px;
    padding-left: 15px;
}
.view3_title p:nth-child(1){
    font-size: 14px;
    font-weight: bold;
    margin:10px 0px 0px 0px ;
}
.view3_title p:nth-child(2){
    font-size: 12px;
}
.form-group input,.form-group select{
    height:40px;
    background-color:#f9f9f9;
}

.form-group .part-group input{
    width:500px;
    display: inline-block;
}
.form-group .part-group button{
    width:70px;
    height: 40px;
    vertical-align: middle;
}
.form-group label{
    font-size:14px;
    color: #333333;
    /*font-weight: 300;*/
    margin-top: 25px;
    display: block;
}
.form-group label span{
    color:#ea0c1d;
    margin-left: 3px;
    font-size: 13px;
}
.form-group span{
    font-size:12px;
    color: #333333;
}
.nextStepBtn{
    background-color:#e3e3e3;
    height: 40px;
    border-radius: 8px;
    text-align: center;
    font-weight: bold;
    font-size:18px;
    line-height: 40px;
    color:#ffffff;
    margin-top: 30px;
}
/*btn event style*/
.nextStepBtnReady{
    background-color:#29abe2 !important;
}
.nextStepBtnReady:hover{
    background-color:#1998ce !important;
}
/*btn event style*/
.StepBtn{
    width:100%;
    margin-top: 30px;
    height:40px;
}
.lastStep{
    margin-right: 55px;
}
.lastStep,.nextStep{
    background-color:#e3e3e3;
    width:45%;
    height: 40px;
    line-height: 40px;
    border-radius: 8px;
    display: inline-block;
    text-align: center;
    color:#ffffff;
    font-weight: bold;
    font-size:18px;

}
.form-group select{
    background-color: #e3e3e3;
}
.view5-content{
    margin-top: 25px;
    text-align: center;
    font-size: 15px;
}
.view5-content p:nth-child(1){
    color:#1db506;
}
.view5-content p img{
    width: 17px;
    height: 17px;
    margin-right: 10px;
    vertical-align: text-top;
}
	
	.fade-transition {
	  transition: opacity .3s ease;
	}
	.fade-enter, .fade-leave {
	  opacity: 0;
	}
</style>

<template>
    <div class="companyCertify">
	    <div class="cc_title">
	        <p>认证中心</p>
	        <p>便于您能快速发布数据资源、数据需求等</p>
	    </div>
	    <div class="cc_content">
	        <div class="cc_content">
	            <ul class="nav nav-tabs">
	                <li class="li_one" v-bind:class="{ 'selected': isviewtop.one }">
	                    1 填写个人信息
	                </li>
	                <li class="li_two" v-bind:class="{ 'selected': isviewtop.two }">
	                    2 填写银行账号信息
	                </li>
	                <li class="li_three" v-bind:class="{ 'selected': isviewtop.three }">
	                    3 等待审核
	                </li>
	            </ul>
	            <div class="tab-content">
	                <div class="tab-pane active">
	                    <component :is="currentView" keep-alive></component>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
	

</template>

<script>

	var view1 = require('./activationp-1.vue');
	var view2 = require('./activationp-2.vue');
	var view3 = require('./activationp-3.vue');
    export default {
        data () {
            return {
                currentView:'view1',
        		isviewtop: {
		            one: true,
		            two: false,
		            three: false
		        },
		        name:"",//姓名
			    tel:"",//电话号码
			    idNum:"",//身份证号
			    idPicUp:"",//身份证正面(图片的id)
			    idPicDown:"",//身份证正面(图片的id)
			    accountName:"",//账户名称
			    bankNum:"",//银行账号
			    bank:"",//银行名称
			    bankName:"",//开户支行名称
			    markmsg:"", //提示文本
			    markbool:false //是否提示
            }
        },
    	methods:{
	        liEvent:function(e){
	           // $(e.target).addClass('selected').siblings().removeClass('selected'); 
	        }
    	},
    	components: {
	        view1,view2,view3
        }
    }
</script>