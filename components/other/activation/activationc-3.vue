<style>
	.pStep{
		height:40px;border-radius: 8px;
	    color: #fff;
	    display: inline-block;
	    font-size: 18px;
	    font-weight: 700;
	    height: auto;
	    line-height: 40px;
	    text-align: center;
	    margin-right:55px;
	    width: 45%;
	}
	
	#person{
		display:none;
	}
	#personTel{
		 display:none;
	 }
	#personTel_d{
		display:none;
	}
	#personEmail{
		display:none;
	}
	#personEmail_d{
		display:none;
	}
	#personNum{
		display:none;
	}
	#personNum_d{
		display:none;
	}
	
</style>

<template>
   <div class="view3">
        <div  class="view3_title">
            <p>联系人信息</p>
            <p>确保您的注册行为属于企业授权行为</p>
        </div>
        <div class="form-group">
            <label for="linkmanName">联系人姓名<span>*<span id="person" style="float: right"><img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />请输入联系人姓名</span></span></label>
            <input  type="text" class="form-control "  placeholder="" @blur="person">

            <label for="mobileNumber">手机号码<span>*
				<span id="personTel" style="float: right"><img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />请输入手机号码</span>
				<span id="personTel_d" style="float: right"><img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />手机号码格式不正确,请重新输入</span>
			</span></label>
            <input  type="text" class="form-control " placeholder="" @blur="personTel">

            <label for="email">电子邮箱<span>*
				<span id="personEmail" style="float: right"><img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />请输入电子邮箱</span>
				<span id="personEmail_d" style="float: right"><img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />电子邮箱格式不正确,请重新输入</span>
			</span></label>
            <input  type="email" class="form-control "  placeholder="" @blur="personEmail">

            <label for="view3-IDNumber">身份证号码<span>*
				<span id="personNum" style="float: right"> <img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />请输入身份证号码</span>
				<span id="personNum_d" style="float: right"> <img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />身份证号码格式不正确,请重新输入(18位)</span>
			</span></label>
            <input  type="text" class="form-control " placeholder="" @blur="personNum">

            <div class="part-group">
                <label>身份证正面扫描件<span>*</span></label>
                <div class="col-lg-6" style="padding: 0;width: 600px; float: none;">
                    <div class="input-group">
						<upload detmsg="身份证正面扫描件不符合要求,请修改后重新上传" :picid.sync=personPicUp v-bind:headers="xhrHeaders" action="/api/certification/upload"></upload>
					</div>
                    <span>图片大小1M以内，支持PNG/JPG格式</span>
                </div>
            </div>
            <div class="part-group">
                <label>身份证反面扫描件<span>*</span></label>
                <div class="col-lg-6" style="padding: 0;width: 600px; float: none;">
                    <div class="input-group">
						<upload detmsg="身份证反面扫描件不符合要求,请修改后重新上传" :picid.sync=personPicDown v-bind:headers="xhrHeaders" action="/api/certification/upload"></upload>
					</div>
                    <span>图片大小1M以内，支持PNG/JPG格式</span>
                </div>
            </div>
            <div class="part-group">
                <label>授权书扫描件<span>*</span></label>
                <div class="col-lg-6" style="padding: 0;width: 600px; float: none;">
                    <div class="input-group">
						<upload detmsg="授权书扫描件不符合要求,请修改后重新上传" :picid.sync=verityPic v-bind:headers="xhrHeaders" action="/api/certification/upload"></upload>
					</div>
                    <span>图片大小1M以内，支持PNG/JPG格式</span>
                </div>
            </div>
        </div>
        <div class="StepBtn">
            <div class='pStep' @click="viewEventp">
        		<btnblue :btntext=btntextp></btnblue>
        	</div>
        	
        	<template v-if="next">
				<div style="height:40px;width:45%;display:inline-block;" @click="viewEventn">
	        		<btnblue :btntext=btntextn></btnblue>
	        	</div>
			</template>
	        <template v-else>
					<div class="nextStep">下一步</div>
			</template>
			
        </div>
    </div>
</template>

<script>

	var upload = require('../../reusable/upload.vue');
	var btnblue = require('../../reusable/btnblue.vue');
	

	export default {
        data:function(){
            return {
            	xhrHeaders: {"Authorization" : "Token "+$.cookie("token")},
            	btntextp:"上一步",
            	btntextn:"下一步",
            	personPicUp:"",
            	personPicDown:"",
            	verityPic:""
            }
        },
        computed: {
		    next: function () {
		    
		    	var person=this.$parent.person;
		    	var personTel=this.$parent.personTel;
		    	var personEmail=this.$parent.personEmail;
		    	var personNum=this.$parent.personNum;
		    	var personPicUp=this.$parent.personPicUp;
		    	var personPicDown=this.$parent.personPicDown;
		    	var verityPic=this.$parent.verityPic;   
		    	if(person!=""&&personTel!=""&&personEmail!=""&&personNum!=""&&personPicUp!=""&&personPicDown!=""&&verityPic!=""){
		    		return true;
		    	}else{
		    		return false;
		    	}
		    	
		    }
		},
		components: {
	        upload,btnblue
        },
        watch:{
		   'personPicUp':function(val){
		   		this.$parent.personPicUp=val;
		   },
		   'personPicDown':function(val){
		   		this.$parent.personPicDown=val;
		   },
		   'verityPic':function(val){
		   		this.$parent.verityPic=val;
		   }	   
		},
    	methods:{
            person:function(e){
                this.$parent.person=e.target.value;
                if(this.$parent.person==""){
                	$("#person").show();
                }else{
                	$("#person").hide();
                }
            },
            personTel:function(e){
                this.$parent.personTel=e.target.value;
                if(this.$parent.personTel==""){
					$("#personTel_d").hide();
                	$("#personTel").show();
                }else{
                	$("#personTel").hide();
					var reg =/^((\+?86)|(\(\+86\)))?1\d{10}$/;//11位手机号码数字
					if(reg.test(this.$parent.personTel) === false)
					{
						this.$parent.personTel="";
						$("#personTel_d").show();
						return  false;
					}else {
						$("#personTel_d").hide();
					}
                }
            },
            personEmail:function(e){
            	this.$parent.personEmail=e.target.value;
            	if(this.$parent.personEmail==""){
                	$("#personEmail").show();
                }else{
                	$("#personEmail").hide();
					var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
					if(reg.test(this.$parent.personEmail) === false)
					{
						this.$parent.personEmail="";
						$("#personEmail_d").show();
						return  false;
					}else {
						$("#personEmail_d").hide();
					}
                }
            },
            personNum:function(e){
            	this.$parent.personNum=e.target.value;
            	if(this.$parent.personNum==""){
					$("#personNum_d").hide();
                	$("#personNum").show();
                }else{
                	$("#personNum").hide();
					var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
					if(reg.test(this.$parent.personNum) === false)
					{
						this.$parent.personNum="";
						$("#personNum_d").show();
						return  false;
					}else {
						$("#personNum_d").hide();
					}
                }
            },
            viewEventp:function(){    
            	this.$parent.currentView='view2';
            	this.$parent.isviewtop.one=false;
            	this.$parent.isviewtop.two=true;
            	this.$parent.isviewtop.three=false;
            	this.$parent.isviewtop.four=false;
            	this.$parent.isviewtop.five=false; 	        	
            },
            viewEventn:function(){    
            	this.$parent.currentView='view4';
            	this.$parent.isviewtop.one=false;
            	this.$parent.isviewtop.two=false;
            	this.$parent.isviewtop.three=false;
            	this.$parent.isviewtop.four=true;
            	this.$parent.isviewtop.five=false; 	        	
            }
        }	
    }
</script>