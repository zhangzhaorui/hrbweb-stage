<style>

</style>


<template>
	<span @click='remote(mTitle,mHref,mWidth)' v-text=mText></span>
</template>

<script>
	
	//关闭清除远程数据
	$("#myModal").on("hidden.bs.modal",function(){$(this).removeData("bs.modal"); });
	$('#myModal').on('show.bs.modal', function (event) {
	  	$("#menu-nav").css("padding-right","15px");
	});
	$('#myModal').on('hidden.bs.modal', function (event) {
		$("#menu-nav").css("padding-right","0px");
	}); 
	//居中
	/* center modal */
	function centerModals(){
	    $('#myModal').each(function(i){    	
	        var $clone = $(this).clone().css('display', 'block').appendTo('body');
	        var cloneh=$clone.height();
	        var conh=$clone.find('.modal-content').height()+60;
	        var top=0;
	        if(cloneh>conh){
	        	top= Math.round((cloneh - conh) / 2);
	        }else{
	        	top=50
	        } 
	        top = top > 0 ? top : 0;	        
	        $clone.remove();
	        $(this).find('.modal-content').css("margin-top", top);     
	    });
	}
	$('#myModal').on('loaded.bs.modal', centerModals);
	$(window).on('resize', centerModals);
	


    export default {
        data () {
            return {
            	a:"ddddd"
            }
        },
        props: ['mText','mTitle','mHref','mWidth'],
		methods: {
			remote:function (msg,msg2,msg3){
			
				if($("#myModal").is(":hidden")){
					$('.modal-dialog').css("width",msg3+"px");
			    	$('#myModal').modal({remote:'/model/'+msg2});
			    	$("#myModalLabel1").text(msg); 	
				}else{
					$("#myModal").modal("hide");
					//绑定了多次，清除
					$("#myModal").on('hidden.bs.modal', function(e){
						if(msg!=null){
							$('.modal-dialog').css("width",msg3+"px");
					    	$('#myModal').modal({remote:'/model/'+msg2});
					    	$('#myModal').on('loaded.bs.modal', function(e){
					    		msg=null;
					    		new Vue({
					    			  el: 'body'
					    			})
					    	})
					    	$("#myModalLabel1").text(msg);
						}			
					});
					//清除绑定效果
					//$("#myModal").off().on('hide', 'hide.bs.modal'); 
				}
		    }			    
		}
    }
    
</script>




