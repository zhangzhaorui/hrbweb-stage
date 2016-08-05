$.ajaxSetup({

    error:function(json){
		if(json.status==401){
			location.href="/";
		}
		if(json.status==400){
    		if($.parseJSON(json.responseText).code==1009){
    			location.href="/error";
    		}
//    		if($.parseJSON(json.responseText).code==6002){
//    			location.href="/error";
//    		}
    	}
    }

});
