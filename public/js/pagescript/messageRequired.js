/**
 * Created by Max cheng on 2016/4/8.
 */



var headerToken={};
//登陆后
if($.cookie("token")!=null&&$.cookie("token")!="null"){
    headerToken={Authorization:"Token "+$.cookie("token")};
}
ss(50,0,0);

$(document).on('click','.head',function(){
    var body = $(this).closest(".record").children("div[class=body]:first");
    if($(this).siblings().is(":hidden")){
        $(this).children().eq(0).css("background-image","url('/img/images3_138.png')");
    }else{
        $(this).children().eq(0).css("background-image","url('/img/images3_136.png')");
    }
    body.slideToggle("fast",function(){});
});

$(document).on("mouseenter mouseleave",'.info',function(event){
    if(event.type == "mouseenter"){
        $(this).css("transition","background 0.3s ease 0s").css("background-color","#f2fafe").css("border","1px solid #f2fafe");
        $(this).addClass("info-other");
        $(this).parent().siblings().children().eq(0).css("background-image","url('/img/images3_136.png')");
        $(this).removeClass('infoBorderRed');
    }
    if(event.type == "mouseleave"){
        $(this).css("background-color","#fff").css("border","1px solid #bfbfbf");
        $(this).removeClass("info-other");
        $(this).parent().siblings().children().eq(0).css("background-image","url('/img/images3_138.png')");

    }
});


$(".request").click(function(){
    ss(50,0,99);
});

$(".ortherMessage").click(function(){
    ss(0,0,99);
});

$(".tabs").children().click(function(){
    $(this).siblings().removeClass("messMark");
    $(this).addClass("messMark");
});

$("#allmess").click(function(){
    ss(50,0,0);
    $(".tabs").children().removeClass("messMark");
});

function reqNums(){
    var headerToken={};
    //登陆后
    if($.cookie("token")!=null&&$.cookie("token")!="null"){
        headerToken={Authorization:"Token "+$.cookie("token")};
    }
    //请求总数
    $.ajax({
        url: "/api"+"/notifications?size=1&level=50&status=0",
        type: "get",
        cache:false,
        async:false,
        headers:headerToken,
        dataType:'json',
        success:function(json){
            allrepnum =json.data.total;
            if(allrepnum>0){
                $(".zongReqNums").show().text(allrepnum);
            }else{
                $(".zongReqNums").hide();
            }
        }
    });
};
reqNums();
function otherNums(){
    var headerToken={};
    //登陆后
    if($.cookie("token")!=null&&$.cookie("token")!="null"){
        headerToken={Authorization:"Token "+$.cookie("token")};
    }
    //其他总数
    $.ajax({
        url: "/api"+"/notifications?size=1&level=0&status=0",
        type: "get",
        cache:false,
        async:false,
        headers:headerToken,
        dataType:'json',
        success:function(json){
            allrepnum =json.data.total;
            $(".zongOtherNums").text(allrepnum);
            if(allrepnum>0){
                $(".zongOtherNums").show().text(allrepnum);
            }else{
                $(".zongOtherNums").hide();
            }
        }
    });
};
otherNums();

function newnums(){
    var headerToken={};
    //登陆后
    if($.cookie("token")!=null&&$.cookie("token")!="null"){
        headerToken={Authorization:"Token "+$.cookie("token")};
    }
    $.ajax({
        url: "/api"+"/notification_stat?category=level",
        type: "get",
        cache:false,
        async:false,
        headers:headerToken,
        dataType:'json',
        success:function(json){

            if(json.data!=null){
                $(".zongReqNums").hide();
                $(".zongOtherNums").hide();
                for(var p in json.data){
                    if(p=="50"){
                        allrepnum = json.data[p];
                        if(allrepnum>0){
                            $(".zongReqNums").show().text(allrepnum);
                        }else{
                            $(".zongReqNums").hide();
                        }
                    }
                    if(p=="0"){
                        allrepnum = json.data[p];
                        if(allrepnum>0){
                            $(".zongOtherNums").show().text(allrepnum);
                        }else{
                            $(".zongOtherNums").hide();
                        }
                    }
                }
            }else{
                $(".zongReqNums").hide();
                $(".zongOtherNums").hide();
                $.cookie("badgeHeader",null,{path:"/"}); //新消息提示
                if($.cookie("badgeHeader")!=null&&$.cookie("badgeHeader")!="null"){
                    $(".badgeHeader").show();
                }else{
                    $(".badgeHeader").hide();
                }
            }
        }
    });
}


//-----------------------------------------------------------
function ss(level,num,levelnum){
    window.messlevel=level;
    window.messlevelnum=levelnum;
    var allrepnum=addHtml(level,num,levelnum);
    var size=10;

    $(".pages").pagination(allrepnum, {
        maxentries:allrepnum,
        items_per_page: size,
        num_display_entries: 10,
        num_edge_entries: 5 ,
        prev_text:"上一页",
        next_text:"下一页",
        ellipse_text:"...",
        link_to:"javascript:void(0)",
        callback:pagechange,
        load_first_page:false
    });
}


function pagechange(pagenum){
    var page=pagenum+1;
    addHtml(window.messlevel,page,window.messlevelnum);
}


function addHtml(level,page,levelnum){
    newnums();
    $("#terminal-content-body").empty();
    $("#pull-body").hide();
    $("#pull-body").fadeIn(1000);
    var allrepnum="";
    var size=10;
    if(levelnum!=0){
        if(page!=0){
            var url="/api"+"/notifications?size="+size+"&level="+level+"&page="+page;
        }else{
            var url="/api"+"/notifications?size="+size+"&level="+level;
        }
    }else{
        if(page!=0){
            var url="/api"+"/notifications?size="+size+"&page="+page;
        }else{
            var url="/api"+"/notifications?size="+size;
        }
    }

    $.ajax({
        url: url,
        type: "get",
        cache:false,
        async:false,
        headers:headerToken,
        dataType:'json',
        success:function(json){

            allrepnum =json.data.total;

            var len=json.data.results.length;
            var typeEvent="";
            var typeTime="";
            var typeRep="";
            var typeItem="";
            var typeTag="";
            var typeText="";
            var infoBorderRed="";
            var s="";

            if(len!=0){

                for(var i=0;i<len;i++){
                    var type=json.data.results[i].type;
                    var tTime=json.data.results[i].time.substr(0,10)+"&nbsp;"+json.data.results[i].time.substr(11,8);
                    if(type=="subsapply_event"){
                        typeText="订购申请事件";
                        var receiver=json.data.results[i].receiver; //用户
                        receiver=ajaxReUser(receiver);
                        var buyername=json.data.results[i].data.buyername;
                        buyername=ajaxReUser(buyername);
                        var qtime=json.data.results[i].time; //签订时间
                        qtime=qtime.substr(0,10)+"&nbsp;"+qtime.substr(11,8);
                        var repname=json.data.results[i].data.repname; //rep名称
                        var itemname=json.data.results[i].data.itemname; //item名称

                        var expire = json.data.results[i].data.plan.expire;//有效期
                        var money = json.data.results[i].data.plan.money;//money
                        var units = json.data.results[i].data.plan.units;//次数

                        var phase=json.data.results[i].data.phase; //订单状态
                        var supply_style=json.data.results[i].data.supply_style; //item状态

                        infoBorderRed=json.data.results[i].status; //阅读状态

                        if(infoBorderRed==0){
                            infoBorderRed='infoBorderRed';
                        }else{
                            infoBorderRed='';
                        }



                        var planType="";
                        if(supply_style=="flow"){
                            planType="天";
                        }else{
                            planType="次";
                        }

                        if(phase==7){
                            s="管理员："+buyername+"申请加入<a class='acomRe' target='_blank' href='/itemdet/"+repname+"/"+itemname+"'>"+repname+"/"+itemname+"</a>白名单，并签订“"+money+"元"+"="+units+planType+"，有效期"+expire+"天”的订购合同。"+qtime+"”。点击<a target='_blank' href='/my/publish/myOrder'>我的订单</a>查看和处理。";
                            $("#terminal-content-body").append(""+
                                "<div class='record'>"+
                                "<div class='head'>"+
                                "<span class='icon'></span>"+
                                "<span class='date'>"+tTime+"</span>"+
                                "</div>"+
                                "<div class='body'>"+
                                "<div class='info "+infoBorderRed+"'>"+
                                "<div class='box'>"+
                                "<p ID='title' style='font-size:16px; color: #000000;padding-top:20px;'>"+typeText+"</p>"+
                                "<p ID='description' style='font:12px; color: #666666;padding-top:15px; padding-bottom:15px'>"+s+"</p>"+
                                "</div>"+
                                "</div>"+
                                "</div>"+
                                "</div>"
                            );
                        }
                        if(phase==1){
                            var sellername=json.data.results[i].data.sellername; //用户
                            sellername=ajaxReUser(sellername);
                            s="管理员："+sellername+"同意与您签订<a class='acomRe' target='_blank' href='/itemdet/"+repname+"/"+itemname+"'>"+repname+"/"+itemname+"</a>“"+money+"元"+"="+units+planType+"，有效期"+expire+"天”的订购合同，合同已于即日生效，请通过client端下载。"+qtime+"”。点击<a class='acomRe' target='_blank' href='/my/mysub'>我的订购</a>查看和处理。";
                            $("#terminal-content-body").append(""+
                                "<div class='record'>"+
                                "<div class='head'>"+
                                "<span class='icon'></span>"+
                                "<span class='date'>"+tTime+"</span>"+
                                "</div>"+
                                "<div class='body'>"+
                                "<div class='info "+infoBorderRed+"'>"+
                                "<div class='box'>"+
                                "<p ID='title' style='font-size:16px; color: #000000;padding-top:20px;'>"+typeText+"</p>"+
                                "<p ID='description' style='font:12px; color: #666666;padding-top:15px; padding-bottom:15px'>"+s+"</p>"+
                                "</div>"+
                                "</div>"+
                                "</div>"+
                                "</div>"
                            );
                        }
                        if(phase==10){
                            var sellername=json.data.results[i].data.sellername; //用户
                            sellername=ajaxReUser(sellername);
                            s="管理员：您申请订购的<a class='acomRe' target='_blank' href='/itemdet/"+repname+"/"+itemname+"'>"+repname+"/"+itemname+"</a>"+money+"元"+"="+units+planType+"，有效期"+expire+"天的订购合同，"+sellername+"已同意。由于您余额不足，此次订购未成功。您可以充值后重新订购。点击<a href='javascript:void(0);'>充值</a>。";
                            $("#terminal-content-body").append(""+
                                "<div class='record'>"+
                                "<div class='head'>"+
                                "<span class='icon'></span>"+
                                "<span class='date'>"+tTime+"</span>"+
                                "</div>"+
                                "<div class='body'>"+
                                "<div class='info "+infoBorderRed+"'>"+
                                "<div class='box'>"+
                                "<p ID='title' style='font-size:16px; color: #000000;padding-top:20px;'>"+typeText+"</p>"+
                                "<p ID='description' style='font:12px; color: #666666;padding-top:15px; padding-bottom:15px'>"+s+"</p>"+
                                "</div>"+
                                "</div>"+
                                "</div>"+
                                "</div>"
                            );
                        }
                    }
                    if(type=="item_event"){
                        for(var p in json.data.results[i].data){
                            if(p=="event"){
                                typeEvent=json.data.results[i].data[p];
                                if(typeEvent=="tag_added"){
                                    typeText="tag添加事件";
                                }
                                /*  if(typeEvent=="tag_deleted"){
                                 typeText="tag删除事件";
                                 } */
                                if(typeEvent=="item_deleted"){
                                    typeText="item删除事件";
                                }
                                /* 	if(typeEvent=="repo_deleted"){
                                 typeText="repo删除事件";
                                 } */
                            }
                            if(p=="repname"){
                                typeRep=json.data.results[i].data[p];
                            }
                            if(p=="itemname"){
                                typeItem=json.data.results[i].data[p];
                            }
                            if(p=="eventtime"){
                                typeTime=json.data.results[i].data[p];
                                typeTime=typeTime.substr(0,10)+"&nbsp;"+typeTime.substr(11,8);
                            }
                            if(p=="tag"){
                                typeTag=json.data.results[i].data[p];
                                typeTime=json.data.results[i].time; //签订时间
                                typeTime=typeTime.substr(0,10)+"&nbsp;"+typeTime.substr(11,8);
                            }
                            if(typeEvent=="tag_added"){
                                s="管理员：您订购的<a class='acomRe' target='_blank' href='/itemdet/"+repname+"/"+itemname+"'>"+typeRep+"/"+typeItem+"</a>新增了一个tag："+typeTag+"。时间为："+typeTime;
                            }
                            /* if(typeEvent=="tag_deleted"){
                             s="管理员：您订购的<a class='acomRe' target='_blank' href='itemDetails.html?repname="+typeRep+"&itemname="+typeItem+"'>"+typeRep+"/"+typeItem+"</a>删除一个tag："+typeTag+"。时间为："+typeTime;
                             } */
                            if(typeEvent=="item_deleted"){
                                s="管理员：您订购的"+typeRep+"/"+typeItem+"被删除。您本次定购的费用将在本月返还给您。用户可点击<a target='_blank' class='acomRe' href='/my/myaccount'>账务中心</a>查看。";
                            }
                            /* if(typeEvent=="repo_deleted"){
                             s="管理员：您订购的"+typeRep+"被删除。";
                             } */
                        }
                        $("#terminal-content-body").append(""+
                            "<div class='record'>"+
                            "<div class='head'>"+
                            "<span class='icon'></span>"+
                            "<span class='date'>"+tTime+"</span>"+
                            "</div>"+
                            "<div class='body'>"+
                            "<div class='info'>"+
                            "<div class='box'>"+
                            "<p ID='title' style='font-size:16px; color: #000000;padding-top:20px;'>"+typeText+"</p>"+
                            "<p ID='description' style='font:12px; color: #666666;padding-top:15px; padding-bottom:15px'>"+s+"</p>"+
                            "</div>"+
                            "</div>"+
                            "</div>"+
                            "</div>"
                        );
                    }
                    /* 			        		if(type=="subs_event"){
                     typeText="订购事件";
                     s="管理员：****（用户真实明）申请加入repo名/item名白名单，并签订“* 元=*条，有效期*天”的订购合同。 2015年12月17日”。用户点击进入到我的订单查看和处理。";
                     } */
                    if(type=="vip_remind"){
                        typeText="会员续费提醒";
                        var level = json.data.results[i].data.level;
                        if(level=="1"){
                            level="普通用户";
                        }
                        if(level=="2"){
                            level="管理员用户"
                        }
                        if(level=="3"){
                            level="认证会员";
                        }
                        if(level=="4"){
                            level="金卡会员";
                        }
                        if(level=="5"){
                            level="钻石会员";
                        }
                        var invalid = json.data.results[i].data.invalid;//到期时间
                        s="管理员：您购买的"+level+"服务，将于"+invalid+"天后到期，请及时续费。<a target='_blank' class='acomRe' href='/my/member'>点击此处</a>进行续费。";
                        $("#terminal-content-body").append(""+
                            "<div class='record'>"+
                            "<div class='head'>"+
                            "<span class='icon'></span>"+
                            "<span class='date'>"+tTime+"</span>"+
                            "</div>"+
                            "<div class='body'>"+
                            "<div class='info'>"+
                            "<div class='box'>"+
                            "<p ID='title' style='font-size:16px; color: #000000;padding-top:20px;'>"+typeText+"</p>"+
                            "<p ID='description' style='font:12px; color: #666666;padding-top:15px; padding-bottom:15px'>"+s+"</p>"+
                            "</div>"+
                            "</div>"+
                            "</div>"+
                            "</div>"
                        );
                    }
                    if(type=="comment_reply"){
                        typeText="评论回复";
                        var sellername="";
                        var isitemowner=json.data.results[i].data.isitemowner;
                        if(isitemowner==undefined){ //显示昵称
                            sellername=json.data.results[i].data.nickname;
                        }else{//真实名称
                            sellername=json.data.results[i].data.realname;
                        }
                        var iname=json.data.results[i].data.itemname;
                        var rname=json.data.results[i].data.repname;
                        s="管理员："+sellername+"回复了 您对<a class='acomRe' target='_blank' href='/itemdet/"+rname+"/"+iname+"/discuss'>"+rname+"/"+iname+"</a>的评价。";
                        $("#terminal-content-body").append(""+
                            "<div class='record'>"+
                            "<div class='head'>"+
                            "<span class='icon'></span>"+
                            "<span class='date'>"+tTime+"</span>"+
                            "</div>"+
                            "<div class='body'>"+
                            "<div class='info "+infoBorderRed+"'>"+
                            "<div class='box'>"+
                            "<p ID='title' style='font-size:16px; color: #000000;padding-top:20px;'>"+typeText+"</p>"+
                            "<p ID='description' style='font:12px; color: #666666;padding-top:15px; padding-bottom:15px'>"+s+"</p>"+
                            "</div>"+
                            "</div>"+
                            "</div>"+
                            "</div>"
                        );
                    }
                    if(type=="admin_message"){
                        typeText="管理员消息";
                        var s=json.data.results[i].data.content;//到期时间
                        $("#terminal-content-body").append(""+
                            "<div class='record'>"+
                            "<div class='head'>"+
                            "<span class='icon'></span>"+
                            "<span class='date'>"+tTime+"</span>"+
                            "</div>"+
                            "<div class='body'>"+
                            "<div class='info "+infoBorderRed+"'>"+
                            "<div class='box'>"+
                            "<p ID='title' style='font-size:16px; color: #000000;padding-top:20px;'>"+typeText+"</p>"+
                            "<p ID='description' style='font:12px; color: #666666;padding-top:15px; padding-bottom:15px'>"+s+"</p>"+
                            "</div>"+
                            "</div>"+
                            "</div>"+
                            "</div>"
                        );
                    }

                }

            }else{
            	//$(".tabs").hide();
            	if(window.messlevel==50){
            		$('#terminal-content-body').append("<div class='container'><p class='text-center'>暂无需要处理的请求</p></div>");                
            	}
            	if(window.messlevel==0){
            		$('#terminal-content-body').append("<div class='container'><p class='text-center'>暂无消息通知</p></div>");                   
            	}
            }

        }
    });
    return allrepnum;
}

//获取数据拥有方详情
function ajaxReUser(username){
    var name="";
    $.ajax({
        url: "/api"+"/users/"+username,
        type: "get",
        cache:false,
        data:{},
        async:false,
        dataType:'json',
        success:function(json){
            if(json.code == 0){
                name=json.data.userName;
            }else {
                console.log("报错");
            }
        }
    });
    return name;
}