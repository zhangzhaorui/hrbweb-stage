$("<a id='footerTops' href='javaScript:void(0);' style='position: fixed;right: 50px;display: none;bottom:200px;'><img src='/img/arrow_crt.png'/></a>").appendTo("body");

$("a").focus(function(){this.blur()});

$(window).scroll(function(){
	var top=$(window).scrollTop();

	if(top>500){
		$("#footerTops").fadeIn("500");
	}
	if(top<=500){
		$("#footerTops").fadeOut("500");
	}
});

$(document).on('click',"#footerTops",function(e){
	$('body,html').animate({ scrollTop:0}, 500);
});

$(document).on('mouseenter',"#footerTops",function(e){
	$(this).children().attr("src","/img/arrow_sel.png");
});

$(document).on('mouseleave',"#footerTops",function(e){
	$(this).children().attr("src","/img/arrow_crt.png");
});
