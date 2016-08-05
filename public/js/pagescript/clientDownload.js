/**
 * Created by Administrator on 2016/4/1.
 */
var account= $.cookie('token');
var tname= $.cookie('tname');
//µÃµ½daemonid
if($.cookie("token")!=null && $.cookie("token")!='null'){
    $.ajax({
        type: "get",
        url:"/api/daemon/id",
        cache:false,
//            async:false,
        headers:{Authorization:"Token "+account},
        success: function(msg){
            $('.havetoken').html(msg.data.daemonid);
        }
    });
}

    if($.cookie("token")==null || $.cookie("token")=='null'){
        $('.havetoken').html('xxxxxxxxxx');
    }

    $('.rightwrop div').click(function(){
        var thisindex = $(this).index()+1;
        var thisobjid = "00"+thisindex
        if(thisobjid == '001'){
            window.scrollTo(0,0)
        }else if(thisobjid == '002'){
            window.scrollTo(0,450)
        }else{
            clicksettop(thisobjid);
        }
        $(this).addClass('activecur').siblings().removeClass('activecur');
    });
    var setarr = [];
    for(var i=0 ;i<6;i++){
        var j = i+1;
        setarr[i] =$('#00'+j).offsetTop;
    }
    function settop(setnum){
        $('.rightwrop div').eq(setnum).addClass('activecur').siblings().removeClass('activecur');
    }
    $(window).scroll(function(){
//        alert(setarr);
        var stop = document.body.scrollTop ||document.documentElement.scrollTop;
        if (stop == 0){
            settop(0)
        }
        if(stop>(setarr[1]-140)){
            settop(1)
        }
        if(stop>(setarr[2]-140)){
            settop(2)
        }
        if(stop>(setarr[3]-140)){
            settop(3)
        }
        if(stop>(setarr[4]-140)){
            settop(4)
        }
        if(stop>(setarr[5]-140)){
            settop(5)
        }

    });
    function clicksettop(objid){
        var sheight = document.documentElement.clientHeight;
        var soffsetTop = document.getElementById(objid).offsetTop;
        if(sheight<soffsetTop){
            window.scrollTo(0,soffsetTop-50)
        }
    }
    $("#gosetup_1").click(function(){
        clicksettop('setup_1') ;
    });
    $("#gosetup_2").click(function(){
        clicksettop('setup_2') ;
    });
    $("#gosetup_3").click(function(){
        clicksettop('setup_3') ;
    });
