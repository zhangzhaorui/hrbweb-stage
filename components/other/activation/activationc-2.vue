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
	
	#legalPerson{
		display:none;
	}
	#legalPersonAddress{
		display:none;
	}
	#legalPersonNum{
		display:none;
	}
	#legalPersonNum_d{
		display:none;
	}

</style>

<template>
    <div class="view2">
        <p class="view_title">法人信息</p>
        <div class="form-group">
            <label for="legalName">法人姓名<span>*<span id="legalPerson" style="float: right"> <img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />请输入法人姓名</span></span></label>
            <input  type="text" class="form-control " placeholder="" @blur="legalPerson">

            <label for="legalAddress">法人归属地<span>*<span id="legalPersonAddress" style="float: right"> <img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />请输入法人归属地</span></span></label>
            <input  type="text" class="form-control "  placeholder="" @blur="legalPersonAddress" >

            <label for="IDNumber">身份证号码<span>*
				<span id="legalPersonNum" style="float: right"><img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />请输入法人身份证号码</span>
				<span id="legalPersonNum_d" style="float: right"> <img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />身份证号码格式不正确,请重新输入(18位)</span>
			</span></label>
            <input  type="text" class="form-control " placeholder="" @blur="legalPersonNum">
            <div class="part-group">
                <label>身份证正面扫描件<span>*</span></label>
                <div class="col-lg-6" style="padding: 0;width: 600px; float: none;">
                    <div class="input-group">
						<upload detmsg="身份证正面扫描件不符合要求,请修改后重新上传" :picid.sync=legalPersonPicUp v-bind:headers="xhrHeaders" action="/api/certification/upload"></upload>
					</div>
                    <span>图片大小1M以内，支持PNG/JPG格式</span>
                </div>
            </div>
            <div class="part-group">
                <label>身份证反面扫描件<span>*</span></label>
                <div class="col-lg-6" style="padding: 0;width: 600px; float: none;">
                    <div class="input-group">
						<upload detmsg="身份证反面扫描件不符合要求,请修改后重新上传" :picid.sync=legalPersonPicDown v-bind:headers="xhrHeaders" action="/api/certification/upload"></upload>
					</div>
                    <span>图片大小1M以内，支持PNG/JPG格式</span>
                </div>
            </div>
        </div>
        <div class="StepBtn">
			<div class="pStep" @click="viewEventp">
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
            	legalPersonPicUp:"",
            	legalPersonPicDown:""
            }
        },
        computed: {
		    next: function () {
		    	var legalPerson=this.$parent.legalPerson;
		    	var legalPersonAddress=this.$parent.legalPersonAddress;
		    	var legalPersonNum=this.$parent.legalPersonNum;
		    	var legalPersonPicUp=this.$parent.legalPersonPicUp;
		    	var legalPersonPicDown=this.$parent.legalPersonPicDown;
		    	
		    	if(legalPerson!=""&&legalPersonAddress!=""&&legalPersonNum!=""&&legalPersonPicUp!=""&&legalPersonPicDown!=""){
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
		   'legalPersonPicUp':function(val){
		   		this.$parent.legalPersonPicUp=val;
		   },
		   'legalPersonPicDown':function(val){
		   		this.$parent.legalPersonPicDown=val;
		   }	   
		},
    	methods:{   		
    		legalPerson:function(e){
                this.$parent.legalPerson=e.target.value;
                if(this.$parent.legalPerson==""){
                	$("#legalPerson").show();
                }else{
                	$("#legalPerson").hide();
                }
            },
            legalPersonAddress:function(e){
                this.$parent.legalPersonAddress=e.target.value;
                if(this.$parent.legalPersonAddress==""){
                	$("#legalPersonAddress").show();
                }else{
                	$("#legalPersonAddress").hide();
                }
            },
            legalPersonNum:function(e){
            	this.$parent.legalPersonNum=e.target.value;
            	if(this.$parent.legalPersonNum==""){
					$("#legalPersonNum_d").hide();
                	$("#legalPersonNum").show();
                }else{
                	$("#legalPersonNum").hide();
//					var len=this.$parent.legalPersonNum.length;
//					if(!isNaN(Number(this.$parent.legalPersonNum))){
//						if(len==18){
//							$("#legalPersonNum2").hide();
//						}else{
//							$("#legalPersonNum2").show();
//						}
//					}else {
//						$("#legalPersonNum2").show();
//					}
					var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;//17位数字,最后一位可为数字或X/x
					if(reg.test(this.$parent.legalPersonNum) === false)
					{
						this.$parent.legalPersonNum="";
						$("#legalPersonNum_d").show();
						return  false;
					}else {
						$("#legalPersonNum_d").hide();
					}
				}
            },
            viewEventp:function(){    
            	this.$parent.currentView='view1';
            	this.$parent.isviewtop.one=true;
            	this.$parent.isviewtop.two=false;
            	this.$parent.isviewtop.three=false;
            	this.$parent.isviewtop.four=false;
            	this.$parent.isviewtop.five=false; 	        	
            },
            viewEventn:function(){    
            	this.$parent.currentView='view3';
            	this.$parent.isviewtop.one=false;
            	this.$parent.isviewtop.two=false;
            	this.$parent.isviewtop.three=true;
            	this.$parent.isviewtop.four=false;
            	this.$parent.isviewtop.five=false; 	        	
            }
        }	
    }
</script>