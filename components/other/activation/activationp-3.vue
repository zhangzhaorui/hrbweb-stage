<style>

	.nextStepBtn:hover{
		cursor:pointer
	}

</style>

<template>
    <div class="view5">
        <p class="view_title">等待审核</p>
        <div class="view5-content">
            <template v-if="markbool">
				<p><img src="/img/images02_125.png"/>{{markmsg}}</p>
            	<p>我们将在7个工作日内完成审核，审核结果会在第一时间通知您。</p>
			</template>
	        <template v-else>
				<p style='color:red;'><img src="/img/images02_127.png"/>{{markmsg}}</p>
			</template>
            
        </div>
        <div class="nextStepBtn nextStepBtnReady" @click="index">返回首页</div>
    </div>
</template>

<script>
	export default {
        data:function(){
            return {
            	markmsg: this.$parent.markmsg,
            	markbool: this.$parent.markbool
            }
        },
    	methods:{
            index:function(e){
                location.href="/";
            },
        }	
    }
</script>