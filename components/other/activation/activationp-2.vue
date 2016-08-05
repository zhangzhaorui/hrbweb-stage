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
	
	#accountName{
		display:none;
	}
	#bankNum{
		display:none;
	}
	#bankNum_d{
		display:none;
	}
	#bank{
		display:none;
	}
	#bankName{
		display:none;
	}

</style>

<template>
    <div class="view2">
        <p class="view_title">银行账户信息</p>
        <div class="form-group">
        
            <label for="legalName">银行账户名称<span>*<span id="accountName" style="float: right"> <img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />请输入公司银行账户名称</span></span></label>
            <input  type="text" class="form-control " id="legalName" placeholder="" @blur="accountName">

            <label for="legalAddress">银行账号<span>*
				<span id="bankNum" style="float: right"> <img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />请输入公司银行账号</span>
				<span id="bankNum_d" style="float: right"> <img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />银行账号格式不正确,请重新输入(19位)</span>
			</span></label>
            <input  type="text" class="form-control " id="legalName" placeholder="" @blur="bankNum" >

            <label for="IDNumber">开户银行名称<span>*<span id='bank' style="float: right"> <img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />请输入开户银行名称</span></span></label>
            <input  type="text" class="form-control " id="IDNumber" placeholder="" @blur="bank">
            
            <label for="IDNumber">开户银行支行名称<span>*<span id='bankName' style="float: right"> <img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />请输入开户银行支行名称</span></span></label>
            <input  type="text" class="form-control " id="IDNumber" placeholder="" @blur="bankName">
            
        </div>
        <div class="StepBtn">
			<div class="pStep" @click="viewEventp">
        		<btnblue :btntext=btntextp></btnblue>
        	</div>
        	
        	<template v-if="next">
				<div style="height:40px;width:45%;display:inline-block;" @click="remote">
	        		<btnblue :btntext=btntextn></btnblue>
	        	</div>
			</template>
	        <template v-else>
				<div class="nextStep">提交认证申请</div>
			</template>
            
        </div>
    </div>
    
        <!--模态框-->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	    <div class="modal-dialog" ID="origin" style="width:300px">
	        <div class="modal-content" style="padding:30px;font-size: 14px;">
	            <div class="modal-header" style="border-bottom:1px solid #cacaca;padding: 0px 0px 10px 0px;">
	                <button style="float: right;margin-top: 5px;" type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
	                <h4 class="modal-title" id="myModalLabel1" style="font-size: 20px;color: #333;">资料确认</h4>
	            </div>
	            <div class="modal-body" style="padding: 0px;" >
	            	<div class="modelcertify">
						<div class="text-center" style="margin-top:30px;">确认以上资料正确？</div>
						<div>
							<div class="nextStepBtn" style="width: 40%;display: inline-block;" @click="closemodal">取消</div>
							<button class="btnblue" style="width: 40%;display: inline-block;margin-left:35px;"  @click="viewEventn">确认</button>
						</div>
					</div>
	            </div>
	        </div>
	    </div>
	</div>
    
    
</template>

<script>

	var upload = require('../../reusable/upload.vue');
	var btnblue = require('../../reusable/btnblue.vue');

	export default {
        data:function(){
            return {
            	btntextp:"上一步",
            	btntextn:"提交认证申请"
            }
        },
        computed: {
		    next: function () {
		    	var accountName=this.$parent.accountName;
		    	var bankNum=this.$parent.bankNum;
		    	var bank=this.$parent.bank;
		    	var bankName=this.$parent.bankName; 	
		    	if(accountName!=""&&bankNum!=""&&bank!=""&&bankName!=""){
		    		return true;
		    	}else{
		    		return false;
		    	}
		    }
		},
        components: {
	        upload,btnblue
        },
    	methods:{ 
    		closemodal:function(){
    			$("#myModal").modal('hide');
    		},
    	    remote:function (){
				$("#myModal").modal('show');
		    },   		
    		accountName:function(e){
                this.$parent.accountName=e.target.value;
                if(this.$parent.accountName==""){
                	$("#accountName").show();
                }else{
                	$("#accountName").hide();
                }
            },
            bankNum:function(e){
                this.$parent.bankNum=e.target.value;
                if(this.$parent.bankNum==""){
					$("#bankNum_d").hide();
                	$("#bankNum").show();
                }else{
                	$("#bankNum").hide();
					var reg = /^\d{19}$/g;//19位银行账号数字
					if(reg.test(this.$parent.bankNum) === false)
					{
						this.$parent.bankNum="";
						$("#bankNum_d").show();
						return  false;
					}else {
						$("#bankNum_d").hide();
					}
                }
            },
            bank:function(e){
            	this.$parent.bank=e.target.value;
            	if(this.$parent.bank==""){
                	$("#bank").show();
                }else{
                	$("#bank").hide();
                }
            },
            bankName:function(e){
            	this.$parent.bankName=e.target.value;
            	if(this.$parent.bankName==""){
                	$("#bankName").show();
                }else{
                	$("#bankName").hide();
                }
            },
            viewEventp:function(){    
            	this.$parent.currentView='view1';
            	this.$parent.isviewtop.one=true;
            	this.$parent.isviewtop.two=false;
            	this.$parent.isviewtop.three=false;	        	
            },
            viewEventn:function(){    
            
            	var markmsg=this.$parent.markmsg;
            	var markbool=this.$parent.markbool;
            
            	$.ajax({
					url:'/api/certification/person/'+$.cookie("tname"),
					type:'PUT',
					async:false,
					contentType:'application/json',
					data: JSON.stringify({
						name:this.$parent.name,//姓名
					    tel:this.$parent.tel,//电话号码
					    idNum:this.$parent.idNum,//身份证号
					    idPicUp:this.$parent.idPicUp,//身份证正面(图片的id)
					    idPicDown:this.$parent.idPicDown,//身份证正面(图片的id)
					    accountName:this.$parent.accountName,//账户名称
					    bankNum:this.$parent.bankNum,//银行账号
					    bank:this.$parent.bank,//银行名称
					    bankName:this.$parent.bankName//开户支行名称
					}),
					headers:{"Authorization" : "Token "+$.cookie("token")},
					dataType:'json',
					success:function(json){
						markmsg="恭喜您，认证申请已提交成功。";
						markbool=true;	
					},
					error:function(json){
						markmsg="提交失败，请稍后再试。";
						markbool=false;	
					}
				});
            
            	this.$parent.markmsg=markmsg;
				this.$parent.markbool=markbool;
            
	        	$("#myModal").modal('hide'); 
            
            	this.$parent.currentView='view3';
            	this.$parent.isviewtop.one=false;
            	this.$parent.isviewtop.two=false;
            	this.$parent.isviewtop.three=true;        	
            }
        }	
    }
</script>