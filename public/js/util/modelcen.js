function modalCen(id,state){
    if(state==undefined){

    	 $(document).on('show.bs.modal','#'+id,function (e) {
    		 centerModals(id);
    	 });
    	 
    	
    }else{
    	
    	$(document).on('loaded.bs.modal','#'+id,function (e) {
   		 	centerModals(id);
   	 	});
    	
    }
    
    $(window).on('resize', centerModals(id));
    
}

function centerModals(id){

    $('#'+id).each(function(i){    	
        var $clone = $(this).clone().css('display', 'block').appendTo('body');
        var cloneh=$clone.height();
        var conh=$clone.find('.modal-content').height()+60;
        var top=0;
        //alert(conh+"---"+cloneh);
        if(cloneh>conh){
        	top= Math.round((cloneh - conh) / 2);
        }else{
        	top=50
        } 
       // alert(top);
        top = top > 0 ? top : 0;	        
        $clone.remove();
        $(this).find('.modal-content').css("margin-top", top);     
    });
    
	$('#'+id).on('show.bs.modal', function (event) {
	  	$("#menu-nav").css("padding-right","15px");
	});
	$('#'+id).on('hidden.bs.modal', function (event) {
		$("#menu-nav").css("padding-right","0px");
	}); 
    
}

