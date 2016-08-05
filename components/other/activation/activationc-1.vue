<style>
	.btnblue{
		height:100%;
		width:100%;
		padding:2px 16px;
		background-color:#29abe2 !important;
		border-color:#29abe2 !important;
		margin:10px auto;
		border:0;
		color:white;
		border-radius:8px;
		background-color: #e3e3e3;
		color: #fff;
		font-size: 18px;
		font-weight: 700;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}
	.btnblue:hover{
		background-color:#1998ce !important;
	}

	#name{
		display:none;
	}
	#address{
		display:none;
	}
	#kbisNum{
		display:none;
	}
	#kbisNum_d{
		display: none;
	}

</style>

<template>

	<div class="view1">
		<p class="view_title">企业基本信息</p>
		<div class="form-group">
			<label for="comName">公司名称<span>*<span id="name" style="float: right"> <img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />请输入公司名称</span></span></label>
			<input  type="text" class="form-control " id="comName" @blur="name" placeholder="">

			<label for="comAddress">公司地址<span>*<span id="address" style="float: right"> <img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />请输入公司地址</span></span></label>
			<input  type="text" class="form-control " @blur="address" placeholder="">

			<label for="regNumber">营业执照注册号<span>*
			<span id="kbisNum" style="float: right">
				<img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />请输入营业执照注册号</span>
				<span id="kbisNum_d" style="float: right">
				<img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />营业执照注册号格式不正确,请重新输入(15或24位)</span>
				</span>
			</label>
			<input  type="text" class="form-control "  @blur="kbisNum" placeholder="">

			<div class="part-group">
				<label>营业执照扫描件<span>*</span></label>
				<div class="col-lg-6" style="padding: 0;width: 600px; float: none;">
					<div class="input-group">
						<upload detmsg="营业执照扫描件不符合要求,请修改后重新上传" :picid.sync=kbisPic v-bind:headers="xhrHeaders" action="/api/certification/upload"></upload>
					</div>
					<span>图片大小1M以内，支持PNG/JPG格式</span>
				</div>
			</div>
			<div>
				<label for="orgCode">组织机构代码</label>
				<input  type="text" class="form-control" @blur="org" id="orgCode" placeholder="">
			</div>
			<div class="part-group">
				<label>组织机构代码扫描件</label>
				<div class="col-lg-6" style="padding: 0;width: 600px; float: none;">
					<div class="input-group">
						<upload detmsg="组织机构代码扫描件不符合要求,请修改后重新上传" :picid.sync=orgPic v-bind:headers="xhrHeaders" action="/api/certification/upload"></upload>
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
				kbisPic:'',
				orgPic:''
			}
		},
		computed: {
			next: function () {
				var name=this.$parent.name;
				var address=this.$parent.address;
				var kbisNum=this.$parent.kbisNum;
				var kbisPic=this.$parent.kbisPic;
				var orgPic=this.$parent.orgPic;

//				if(name!=""&&address!=""&&kbisNum!=""&&kbisPic!=""&&orgPic!="")
				 if(name!=""&&address!=""&&kbisNum!=""&&kbisPic!=""){
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
			'kbisPic':function(val){
				this.$parent.kbisPic=val;
			},
			'orgPic':function(val){
				this.$parent.orgPic=val;
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
			address:function(e){
				this.$parent.address=e.target.value;
				if(this.$parent.address==""){
					$("#address").show();
				}else{
					$("#address").hide();
				}

			},
			kbisNum:function(e){
				this.$parent.kbisNum=e.target.value;
				if(this.$parent.kbisNum==""){
					$("#kbisNum_d").hide();
					$("#kbisNum").show();
				}else{
					$("#kbisNum").hide();
					var len=this.$parent.kbisNum.length;
					if(!isNaN(Number(this.$parent.kbisNum))){
						if(len==15 || len==24){

							$("#kbisNum_d").hide();
						}else{
							this.$parent.kbisNum="";
							$("#kbisNum_d").show();
						}
					}else {
						this.$parent.kbisNum="";
						$("#kbisNum_d").show();
					}

				}


			},
			org:function(e){
				this.$parent.org=e.target.value;
			},
			view1Event:function(){

				this.$parent.currentView='view2';
				this.$parent.isviewtop.one=false;
				this.$parent.isviewtop.two=true;
				this.$parent.isviewtop.three=false;
				this.$parent.isviewtop.four=false;
				this.$parent.isviewtop.five=false;

			}
		}
	}
</script>