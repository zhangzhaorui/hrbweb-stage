<style>
	#name{
		display:none;
	}
	#tel{
		 display:none;
	 }
	#tel_d{
		display:none;
	}
	#idNum{
		display:none;
	}
	#idNum_d{
		display:none;
	}
	#idPicUp{
		display:none;
	}
	#idPicDown{
		display:none;
	}
</style>

<template>

	
    <div class="view1">
        <p class="view_title">个人基本信息</p>
        <div class="form-group">
            <label for="comName">个人姓名<span>*<span id="name" style="float: right"> <img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />请输入个人姓名</span></span></label>
            <input  type="text" class="form-control" @blur="name" placeholder="">

            <label for="comAddress">手机号码<span>*
				<span id="tel" style="float: right"> <img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />请输入手机号码</span>
				<span id="tel_d" style="float: right"> <img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />手机号码格式不正确,请重新输入</span>
			</span></label>
            <input  type="text" class="form-control" @blur="tel" placeholder="">

            <label for="regNumber">身份证号码<span>*
				<span id="idNum" style="float: right"> <img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />请输入身份证号码</span>
				<span id="idNum_d" style="float: right"> <img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />身份证号码格式不正确,请重新输入(18位)</span>
			</span></label>
            <input  type="text" class="form-control" @blur="idNum" placeholder="">

            <div class="part-group">
                <label>身份证正面扫描件<span>*<span id="idPicUp" style="float: right"> <img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />请上传身份证正面扫描件</span></span></label>
                <div class="col-lg-6" style="padding: 0;width: 600px; float: none;">
                    <div class="input-group">
						<upload detmsg="身份证正面扫描件不符合要求,请修改后重新上传" :picid.sync=idPicUp v-bind:headers="xhrHeaders" action="/api/certification/upload"></upload>
					</div>
                    <span>图片大小1M以内，支持PNG/JPG格式</span>
                </div>
            </div>
            <div class="part-group">
                <label>身份证反面扫描件<span>*<span id="idPicDown" style="float: right"> <img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />请上传身份证反面扫描件</span></span></label>
                <div class="col-lg-6" style="padding: 0;width: 600px; float: none;">
                    <div class="input-group">
						<upload detmsg="身份证反面扫描件不符合要求,请修改后重新上传" :picid.sync=idPicDown v-bind:headers="xhrHeaders" action="/api/certification/upload"></upload>
					</div>
                    <span>图片大小1M以内，支持PNG/JPG格式</span>
                </div>
            </div>

        </div>
       	<template v-if="next">
			<div style="height:40px;" @click="view1Event">
        		<btnblue :btntext=btntext></btnblue>
        	</div>
		</template>
        <template v-else>
        	<div style="height:40px;">
				<div class="nextStepBtn">下一步</div>
			</div>
		</template>
    </div>
    
      
</template>

<script>

	var upload = require('../../reusable/upload.vue');
	var btnblue = require('../../reusable/btnblue.vue');
	export default {
        data:function(){
            return {
            		btntext:"下一步",
                    xhrHeaders: {"Authorization" : "Token "+$.cookie("token")},
                    idPicUp:"",
                    idPicDown:" "
            }
        },
        computed: {
		    next: function () {
		    	var name=this.$parent.name;
		    	var tel=this.$parent.tel;
		    	var idNum=this.$parent.idNum;
		    	var idPicUp=this.$parent.idPicUp;
		    	var idPicDown=this.$parent.idPicDown;
		    	if(name!=""&&tel!=""&&idNum!=""&&idPicUp!=""&&idPicDown!=""){
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
		   'idPicUp':function(val){
		   		this.$parent.idPicUp=val;
		   		if(this.$parent.idPicUp==""){
                	$("#idPicUp").show();
                }else{
                	$("#idPicUp").hide();
                }
		   },
		   'idPicDown':function(val){
		   		this.$parent.idPicDown=val;
		   		if(this.$parent.idPicDown==""){
                	$("#idPicDown").show();
                }else{
                	$("#idPicDown").hide();
                }
		   }	   
		},
    	methods:{               
            name:function(e){
                this.$parent.name=e.target.value;
                if(this.$parent.name==""){
                	$("#name").show();
                }else{
                	$("#name").hide();
                }
                
            },
            tel:function(e){
                this.$parent.tel=e.target.value;
                if(this.$parent.tel==""){
					$("#tel_d").hide();
                	$("#tel").show();
                }else{
                	$("#tel").hide();
					var reg =/^((\+?86)|(\(\+86\)))?1\d{10}$/;//11位手机号码数字
					if(reg.test(this.$parent.tel) === false)
					{
						this.$parent.tel="";
						$("#tel_d").show();
						return  false;
					}else {
						$("#tel_d").hide();
					}
                }
            },
            idNum:function(e){
            	this.$parent.idNum=e.target.value;
            	if(this.$parent.idNum==""){
					$("#idNum_d").hide();
                	$("#idNum").show();
                }else{
                	$("#idNum").hide();
					var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;//17位数字,最后一位可为数字或X/x
					if(reg.test(this.$parent.idNum) === false)
					{
						this.$parent.idNum="";
						$("#idNum_d").show();
						return  false;
					}else {
						$("#idNum_d").hide();
					}
                }
            },
            view1Event:function(){
            
            	this.$parent.currentView='view2';
            	this.$parent.isviewtop.one=false;
            	this.$parent.isviewtop.two=true;
            	this.$parent.isviewtop.three=false;
            	
            }
        }	
    }
</script>