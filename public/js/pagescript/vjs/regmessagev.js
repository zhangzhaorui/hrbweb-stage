var activation = require('../../../../components/other/activation.vue');
new Vue({
    el: '#bodycon',
    data:{
    	show:false
    },
    props:['loginname','sid'],
    components: {
        app: activation
    },
    created: function () {
        var show=this.show;       
        $.ajax({
	        url: "/api/users/"+this.loginname+"/active",
	        type: "PUT",
	        cache:false,
	        async:false,
	        dataType:'json',
	        contentType:"application/json",
	        data: JSON.stringify({"sid": this.sid}),
	        success:function(json){
	        	show=true;
	        },
	        error:function(json){
	        	if($.parseJSON(json.responseText).code==8012){
		        	show=false;
			    }

			}
	    });
        this.show=show;      
    }
})





