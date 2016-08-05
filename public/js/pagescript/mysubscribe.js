/**
 * Created by Max cheng on 2016/3/31.
 */
$(document).ready(function(){
    init(5,10);
    $('.mypushcomment li').eq(0).show();
    $('.top_nav>div').click(function(){
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.mypushcomment li').eq($(this).index()).show().siblings().hide();
        if($(this).index()==0){
            $(".dataitem").show();
        }else{
            $(".dataitem").hide();
        }
    });
});


//判断用户是否在自己的白名单里
//GET /permission/:repname/:itemname
//GET /repositories/:repname/:itemname
/*function judgeUser(repo,item,i){
    var header={};
    if($.cookie("token")!=null&&$.cookie("token")!="null"){
        header={Authorization:"Token "+$.cookie("token")};
    }
    $.ajax({
        url: "/api/repositories/"+repo+"/"+item+"?haspermission=1",
        type: "get",
        cache: false,
        async: false,
        headers: header,
        success: function (json) {
           var permission=json.data.permission;
            if(permission==false){
                $('#comment'+i+'').unbind('click');
                $('#comment'+i+'').attr({"disabled":"true","href":"javascript:void(0)"});
                $('#comment'+i+'').css({"background-color":"#666","border":"none"})
            }
        },
        error:function(){
        }
    })
}*/
/*itemlIst start*/
var type=0;
var size=0;
function init(type,size){
    window.type=type;
    window.size=size;
    //总数
    var totalnum=ajaxTotal(type,size);
    if($("#terminal-content-body").html()==""){
        pagechange(0);
    }
}
function pagechange(new_page_index){
    $('body,html').animate({ scrollTop:0}, 500);
    var page=new_page_index+1;
    var type=window.type;
    var size=window.size;
    ajaxFunHtml(type,size,page);
    $('[data-toggle="tooltip"]').tooltip();
}
//获取所有集合total
function ajaxTotal(type,size){
    var url="";
    var allrepnum="";
    var headerToken={}
    //登陆后
    if($.cookie("token")!=null&&$.cookie("token")!="null"){
        headerToken={Authorization:"Token "+$.cookie("token")};
    }
    if(type=="5"){
        url="/api"+"/subscriptions/pull?size="+window.size;
        $.ajax({
            url: url,
            type: "get",
            cache:false,
            async:false,
            headers:headerToken,
            dataType:'json',
            success:function(json){
                allrepnum =json.data.total;
                if(allrepnum!=0){
                    $("#itemnum").text(allrepnum);
                    var len=json.data.results.length;
                    for(var i=0;i<len;i++){
                        var oderdate="";
                        if(json.data.results[i].signtime!=undefined){
                            oderdate=json.data.results[i].signtime.substr(0,10)+"&nbsp;"+json.data.results[i].signtime.substr(11,8);
                        }else{
                            oderdate=json.data.results[i].applytime.substr(0,10)+"&nbsp;"+json.data.results[i].applytime.substr(11,8);
                        }
                        var expiretimeOrder=json.data.results[i].expiretime.substr(0,10)+"&nbsp;"+json.data.results[i].expiretime.substr(11,8);
                        //详情内容
                        var comment="";
                        $.ajax({
                            url: "/api"+"/repositories/"+json.data.results[i].repname+"/"+json.data.results[i].itemname+"?abstract=1",
                            type: "get",
                            cache:false,
                            async:false,
                            dataType:'json',
                            headers:headerToken,
                            success:function(json){
                                comment=json.data.comment;
                            },
                            error:function(json){
                            }
                        });
                        //订单状态
                        var orderStatus=json.data.results[i].phase;
                        var btnStyle="padding: 10px 32px; border-top-width: 0px;";
                        var disabled="";
                        var hreftxt="/itemdet/"+json.data.results[i].repname+"/"+json.data.results[i].itemname;
                        var hreftxtA="<a target='_blank' href="+hreftxt+">"+json.data.results[i].repname+"/"+json.data.results[i].itemname+"</a>";
                        if(orderStatus=="5"){
                            btnStyle="padding: 10px 32px; border-top-width: 0px;background-image: linear-gradient(to bottom, #666 0%, #666 100%);background-repeat: repeat-x;border-color: #666;"
                        }

                        switch(orderStatus)
                        {
                            case 1:
                                orderStatus="正在生效中";
                                break;
                            case 2:
                                orderStatus="订单已完成";
                                break;
                            case 3:
                                orderStatus="订单已完成";
                                break;
                            case 5:
                                orderStatus="Item下线，订单失效";
                                disabled=" disabled";
                                hreftxtA="<span>"+json.data.results[i].repname+"/"+json.data.results[i].itemname+"</span>";
                                break;
                            case 6:
                                orderStatus="管理员删除";
                                break;
                            case 7:
                                orderStatus="申请订购中";
                                break;
                            case 8:
                                orderStatus="已撤回申请";
                                break;
                            case 9:
                                orderStatus="申请被拒绝";
                                break;
                            case 10:
                                orderStatus="余额不足失效";
                                break;
                            default:
                                orderStatus="未知的状态";
                        };
                        //订购者
                        var sellername=json.data.results[i].sellername;
                        $.ajax({
                            url: "/api"+"/users/"+sellername,
                            type: "get",
                            cache:false,
                            data:{},
                            async:false,
                            dataType:'json',
                            success:function(json){
                                sellername=json.data.userName;
                            }
                        });
                        //pull量
                        var pullnum="";
                        var pullText="";
                        pullnum=json.data.results[i].plan.used;
                        if(pullnum>0){
                            pullText="<span data-original-title='我的下载量' data-toggle='tooltip' datapalecement='top' style='float:left;border: 2px solid #e60012;border-radius: 10px;height:10px;width:10px;display:block'></span>";
                        }else{
                            pullText="<span data-original-title='我的下载量' data-toggle='tooltip' datapalecement='top' style='float:left;border: 2px solid #337ab7;border-radius: 10px;height:10px;width:10px;display:block'></span>";
                        }
                        //supply_style
                        var supply_style="";
                        if(json.data.results[i].supply_style=="flow"){
                            supply_style="天";
                        }
                        if(json.data.results[i].supply_style=="batch"){
                            supply_style="次";
                        }

                        $("#terminal-content-body").append(""+
                            "<div class='repoE'>"+
                            "<div class='order'>"+
                            "<div class='orderNum'>"+
                            "<p>订单号：<span>"+json.data.results[i].subscriptionid+"</span></p>"+
                            "</div>"+
                            "<div class='orderTime'>"+
                            "<p>订购时间：<span>"+oderdate+"</span></p>"+
                            "</div>"+
                            "</div>"+
                            "<div style='width:1130px;' class='repo'>"+
                            "<div class='left'>"+
                            "<div class='repoName'>"+
                            hreftxtA+
                            "</div>"+
                            "<div class='description'>"+
                            "<p>"+comment+"</p>"+
                            "</div>"+
                            "<div class='supplier'>"+
                            "<p>本数据由<a href='/userdet/"+json.data.results[i].sellername+"'>"+sellername+"</a>提供</p>"+
                            "</div>"+
                            "</div>"+
                            "<div class='orderStatus'>"+
                            "<p>"+orderStatus+"</p>"+
                            "</div>"+
                            "<div class='button' style='float:right;'>"+
                            "<a href='/itemdet/"+json.data.results[i].repname+"/"+json.data.results[i].itemname+"/discuss"+"' style='"+btnStyle+"' id='comment"+i+"' class='btn btn-warning"+disabled+"' type='button'>评论</a>"+
                            "</div>"+
                            "<div class='price'  style=''>"+
                            "<p>价格:"+json.data.results[i].plan.money+"元/"+json.data.results[i].plan.units+supply_style+" 有效期"+json.data.results[i].plan.expire+"天</p>" +
                            "<p>失效日期："+expiretimeOrder+"</p>" +
                            "<div style='float:left;'>"+pullText+"<p style='float: left;margin-left:10px;margin-top: -5px;width: 105px;'>下载量："+pullnum+"</p></div>"+
                            "</div>"+

                            "</div>"+
                            "</div>"
                        );
                        //orderStatus!='正在生效中'
                        if(orderStatus!='订单已完成'&&orderStatus!='正在生效中'){
                            $('#comment'+i+'').unbind('click');
                            $('#comment'+i+'').attr({"disabled":"true","href":"javascript:void(0)"});
                            $('#comment'+i+'').css({"background-color":"#666","border":"none"})
                        }

                        //判断用户的评论权限
                        //judgeUser(json.data.results[i].repname,json.data.results[i].itemname,i);

                        //var header={};
                        //if($.cookie("token")!=null&&$.cookie("token")!="null"){
                        //    header={Authorization:"Token "+$.cookie("token")};
                        //}
                        //$.ajax({
                        //    url: "/api/repositories/"+json.data.results[i].repname+"/"+json.data.results[i].itemname+"?haspermission=1",
                        //    type: "get",
                        //    cache: false,
                        //    async: false,
                        //    headers: header,
                        //    success: function (json) {
                        //        var permission=json.data.permission;
                        //        if(permission==false){
                        //            $('#comment'+i+'').unbind('click');
                        //            $('#comment'+i+'').attr({"disabled":"true","href":"javascript:void(0)"});
                        //            $('#comment'+i+'').css({"background-color":"#666","border":"none"})
                        //        }
                        //    },
                        //    error:function(){
                        //    }
                        //});

                    }
                }else{
                	$(".dataitem").find("p").hide();
            		$(".dataitem").append("<div><p class='text-center' style='font-weight:normal;margin-top:50px;font-size:14px;line-height:0px;'>暂未订购任何数据</p></div>"); 
                }
                
                $('[data-toggle="tooltip"]').tooltip();
                


            }
        
        });
    }
    $(".pages").pagination(allrepnum, {
        maxentries:allrepnum,
        items_per_page: size,
        num_display_entries: 5,
        num_edge_entries: 5 ,
        prev_text:"上一页",
        next_text:"下一页",
        ellipse_text:"...",
        link_to:"javascript:void(0)",
        callback:pagechange,
        load_first_page:false
    });

    return allrepnum;
}
//获取列表集合
function ajaxFunHtml(type,size,page){

    var list=[];
    var url="";
    var headerToken={};
    //登陆后
    if($.cookie("token")!=null&&$.cookie("token")!="null"){
        headerToken={Authorization:"Token "+$.cookie("token")};
    }
    if(type=="5"){
        if($("#terminal-content-body").attr("mark")!=""){
            $("#terminal-content-body").empty();
            url="/api"+"/subscriptions/pull?size="+size+"&page="+page;
            $.ajax({
                url: url,
                type: "get",
                cache:false,
                async:false,
                headers:headerToken,
                dataType:'json',
                success:function(json){
                	var totals=json.data.total;
                	//totals=0;
                	if(totals!=0){
                		var len=json.data.results.length;
                        for(var i=0;i<len;i++){
                            var oderdate="";
                            if(json.data.results[i].signtime!=undefined){
                                oderdate=json.data.results[i].signtime.substr(0,10)+"&nbsp;"+json.data.results[i].signtime.substr(11,8);
                            }else{
                                oderdate=json.data.results[i].applytime.substr(0,10)+"&nbsp;"+json.data.results[i].applytime.substr(11,8);
                            }
                            var expiretimeOrder=json.data.results[i].expiretime.substr(0,10)+"&nbsp;"+json.data.results[i].expiretime.substr(11,8);
                            //详情内容
                            var comment="";
                            $.ajax({
                                url: "/api"+"/repositories/"+json.data.results[i].repname+"/"+json.data.results[i].itemname+"?abstract=1",
                                type: "get",
                                cache:false,
                                async:false,
                                dataType:'json',
                                headers:headerToken,
                                success:function(json){
                                    comment=json.data.comment;
                                },
                                error:function(){}
                            });
                            //订单状态
                            var orderStatus=json.data.results[i].phase;
                            var btnStyle="padding: 10px 32px; border-top-width: 0px; ";
                            var disabled="";
                            var hreftxt="/itemdet/"+json.data.results[i].repname+"/"+json.data.results[i].itemname+"";
                            var hreftxtA="<a target='_blank' href="+hreftxt+">"+json.data.results[i].repname+"/"+json.data.results[i].itemname+"</a>";
                            if(orderStatus=="5"){
                                btnStyle="padding: 10px 32px; border-top-width: 0px;background-image: linear-gradient(to bottom, #666 0%, #666 100%);background-repeat: repeat-x;border-color: #666;"
                            }

                            switch(orderStatus)
                            {
                                case 1:
                                    orderStatus="正在生效中";
                                    break;
                                case 2:
                                    orderStatus="订单已完成";
                                    break;
                                case 3:
                                    orderStatus="订单已完成";
                                    break;
                                case 5:
                                    orderStatus="Item下线，订单失效";
                                    disabled=" disabled";
                                    hreftxtA="<span>"+json.data.results[i].repname+"/"+json.data.results[i].itemname+"</span>";
                                    break;
                                case 6:
                                    orderStatus="管理员删除";
                                    break;
                                case 7:
                                    orderStatus="申请订购中";
                                    break;
                                case 8:
                                    orderStatus="已撤回申请";
                                    break;
                                case 9:
                                    orderStatus="申请被拒绝";
                                    break;
                                case 10:
                                    orderStatus="余额不足失效";
                                    break;
                                default:
                                    orderStatus="未知的状态";
                            }
                            //订购者
                            var sellername=json.data.results[i].sellername;
                            $.ajax({
                                url: "/api"+"/users/"+sellername,
                                type: "get",
                                cache:false,
                                data:{},
                                async:false,
                                dataType:'json',
                                success:function(json){
                                    sellername=json.data.userName;
                                }
                            });
                            //pull量
                            var pullnum="";
                            var pullText="";
                            pullnum=json.data.results[i].plan.used;
                            if(pullnum>0){
                                pullText="<span data-original-title='我的下载量' data-toggle='tooltip' datapalecement='top' style='float:left;border: 2px solid #e60012;border-radius: 10px;height:10px;width:10px;display:block'></span>";
                            }else{
                                pullText="<span data-original-title='我的下载量' data-toggle='tooltip' datapalecement='top' style='float:left;border: 2px solid #337ab7;border-radius: 10px;height:10px;width:10px;display:block'></span>";
                            }
                            //supply_style
                            var supply_style="";
                            if(json.data.results[i].supply_style=="flow"){
                                supply_style="天";
                            }
                            if(json.data.results[i].supply_style=="batch"){
                                supply_style="次";
                            }

                            $("#terminal-content-body").append(""+
                                "<div class='repoE'>"+
                                "<div class='order'>"+
                                "<div class='orderNum'>"+
                                "<p>订单号：<span>"+json.data.results[i].subscriptionid+"</span></p>"+
                                "</div>"+
                                "<div class='orderTime'>"+
                                "<p>订购时间：<span>"+oderdate+"</span></p>"+
                                "</div>"+
                                "</div>"+
                                "<div style='width:1130px;' class='repo'>"+
                                "<div class='left'>"+
                                "<div class='repoName'>"+
                                hreftxtA+
                                "</div>"+
                                "<div class='description'>"+
                                "<p>"+comment+"</p>"+
                                "</div>"+
                                "<div class='supplier'>"+
                                "<p>本数据由<a href='/userdet/"+json.data.results[i].sellername+"'>"+sellername+"</a>提供</p>"+
                                "</div>"+
                                "</div>"+
                                "<div class='orderStatus'>"+
                                "<p>"+orderStatus+"</p>"+
                                "</div>"+

                                "<div class='price'>"+
                                "<p>价格:"+json.data.results[i].plan.money+"元/"+json.data.results[i].plan.units+supply_style+" 有效期"+json.data.results[i].plan.expire+"天</p>" +
                                "<p>失效日期："+expiretimeOrder+"</p>" +
                                "<div style='float:left;'>"+pullText+"<p style='float: left;margin-left:10px;margin-top: -5px;width: 105px;'>下载量："+pullnum+"</p></div>"+
                                "</div>"+
                                "<div class='button'>"+
                                "<a href='/itemdet/"+json.data.results[i].repname+"/"+json.data.results[i].itemname+"/discuss"+"' id='comment"+i+"' style='"+btnStyle+"' class='btn btn-warning"+disabled+"' type='button'>评论</a>"+
                                "</div>"+
                                "</div>"+
                                "</div>"
                            );
                            //orderStatus!='正在生效中'
                            if(orderStatus!='订单已完成'&&orderStatus!='正在生效中'){
                                $('#comment'+i+'').unbind('click');
                                $('#comment'+i+'').attr({"disabled":"true","href":"javascript:void(0)"});
                                $('#comment'+i+'').css({"background-color":"#666","border":"none"})
                            }
                          /*var header={};
                            if($.cookie("token")!=null&&$.cookie("token")!="null"){
                                header={Authorization:"Token "+$.cookie("token")};
                            }
                            $.ajax({
                                url: "/api/repositories/"+json.data.results[i].repname+"/"+json.data.results[i].itemname+"?haspermission=1",
                                type: "get",
                                cache: false,
                                async: false,
                                headers: header,
                                success: function (json) {
                                    var permission=json.data.permission;
                                    if(permission==false){
                                        $('#comment'+i+'').unbind('click');
                                        $('#comment'+i+'').attr({"disabled":"true","href":"javascript:void(0)"});
                                        $('#comment'+i+'').css({"background-color":"#666","border":"none"})
                                    }
                                },
                                error:function(){
                                }
                            });*/
                        }
                        //(json.data.results[i].repname,json.data.results[i].itemname,i);
                	}else{
                		$(".dataitem").find("p").hide();
                		$(".dataitem").append("<div><p class='text-center'  style='font-weight:normal;margin-top:50px;font-size:14px;line-height:0px;'>暂未订购任何数据</p></div>");              		
                	}
                	$('[data-toggle="tooltip"]').tooltip();
                }
            });
        }
    }
}
/*itemlIst end*/


$(function(){
    //得到用户登录token;
    var account= $.cookie('token');
    //区分时间
    function getTimes(times){
        var jsonTime = {};
        jsonTime.nums=times.indexOf("|");
        if(jsonTime.nums!="-1"){
            jsonTime.jdTime=times.substr(0,19);
            jsonTime.xdTime=times.substring(jsonTime.nums+1,times.length);
            jsonTime.showTime=jsonTime.xdTime;
        }else{
            jsonTime.showTime=times;
        }
        return jsonTime;
    };
    function getAjax(url,fun){
        $.ajax({
            type: "get",
            async: false,
            url: url,
            success: function(msg){
                fun(msg);
            }
        });
    }
    //填充订阅列表

    function getSubsnum(){
        var isgo = true;
        $.ajax({
            type: "get",
            url:"/api"+"/subscriptions/pull",
            cache:false,
            async:false,
            headers:{Authorization: "Token "+account},
            success: function(msg){
                var fornum = msg.data.length;
                $('.allsubnum').html(fornum)
                for(var i = 0;i < fornum;i++){
                    var repname = msg.data[i].repname;
                    var itemname = msg.data[i].itemname;
                    var subtime = msg.data[i].signtime;
                    subtime = subtime.replace(/[A-Z]/g, " ");
                    var itemcomment
                    $.ajax({
                        type: "get",
                        async: false,
                        url: "/api"+"/repositories/"+repname+"/"+itemname,
                        success: function(msg){
                            itemcomment = msg.data.comment;
                        },
                        error:function(XMLHttpRequest, textStatus, errorThrown) {
                            isgo = false;
                            // alert(JSON.stringify(XMLHttpRequest))
                            var code = JSON.parse(XMLHttpRequest.responseText).code;
                            if(isgo == false && code != 0){
                                alert("错误信息："+JSON.parse(XMLHttpRequest.responseText).msg)
                                return
                            }
                        }
                    });
                    if(isgo == false){return}
                    var rbg;
                    var colors;
                    var pullnum = '';
                    getAjax("/api"+"/transaction_stat/"+repname+"/"+itemname,function(datas){
                        pullnum = datas.data.numpulls;
                    });

                    if(pullnum == 0){
                        rbg = 'righticon rbg1';
                        colors = 'col-md-4 subtitler color1';
                    }else if(pullnum != 0){
                        rbg = 'righticon rbg2';
                        colors = 'col-md-4 subtitler color2';
                    }
                    var str = '<div class="sublist_con">'+
                        '<div class="row subtitle">'+
                        '<div class="col-md-4 subtitlel"><a href="/itemdet/'+repname+'/'+itemname+'" target="_blank">'+repname+'/'+itemname+'</a></div>'+
                        '<div class="col-md-4 subtitlec"><span class="centericon" title="订阅时间"></span>'+subtime+'</div>'+
                        '<div class="'+colors+'"><span title="下载量" class="'+rbg+'"></span>下载量:'+pullnum+'</div>'+
                        '</div>'+
                        '<div class="subcomment">'+itemcomment+'</div>'+
                        '</div>';
                    $('.sublist').append(str);
                }

            }
        });

    }
    getSubsnum();
});
$(function(){
    function getAjax(url,fun){
        $.ajax({
            type: "get",
            async: false,
            url: url,
            success: function(msg){
                fun(msg);
            }
        });
    }
    function judgeLabel (labels){
        var labeldata = {
            'label' : labels,
            'vvclass' : '',
            'labelV' : ''
        };
        if (labeldata.label == "single") {
            labeldata.vvclass = "api";
            labeldata.labelV = "API";
        }
        if (labeldata.label == "batch") {
            labeldata.vvclass = "period";
            labeldata.labelV = "批量数据";
        }
        if (labeldata.label == "flow") {
            labeldata.vvclass = "flot-data";
            labeldata.labelV = "流式数据";
        }
        return labeldata
    };
    //得到用户登录token;
    var account= $.cookie('token');
    var pulltotal = 0;
    function getcurrpullnum(thispages){
        $.ajax({
            type: "get",
            url:"/api"+"/transactions/pull?groupbydate=1&page="+thispages+"&size=30",
            cache:false,
            async:false,
            headers:{Authorization: "Token "+account},
            success: function(msg){
                pulltotal = msg.data.total;
                if(pulltotal!=0){
                	$("#pull-head>b").text(pulltotal);
                    $('#pull-body').empty();
                    var str = '<div class="pullbox">';
                    for(var i= 0 ;i<msg.data.results.length;i++){
                        var pulltimes = msg.data.results[i].date;
                        str+='<div class="record"><div class="head ">'+
                            //'<span class="icon togglebox"></span>'+
                            '<p class="date">'+pulltimes+'</p>'+
                            '</div>'+
                            '<div class="body">'+
                            '<table>';
                        for(var j = 0;j<msg.data.results[i].pulls.length;j++){
                            var repname = msg.data.results[i].pulls[j].repname;
                            var itemname = msg.data.results[i].pulls[j].itemname;
                            var tagname = msg.data.results[i].pulls[j].tag;
                            var sypply_style = msg.data.results[i].pulls[j].sypply_style;
                            var Labels;
                            var times = msg.data.results[i].pulls[j].pulltime
                            times = times.substr(11,8);
                            Labels = judgeLabel(sypply_style);

                            str +=
                                '<tr>'+
                                '<td class="first">'+times+'</td>'+
                                '<td>'+tagname+'</td>'+
                                '<td>'+Labels.labelV+'</td>'+
                                '<td>'+itemname+'</td>'+
                                '<td class="last">'+repname+'</td>'+
                                '</tr>'
                            ;

                        }
                        str+= '</table></div></div>';
                    }
                    str+= '</div>';
                    $('#pull-body').append(str);
                }else{
                	$("#pull-head").hide();
                	$("#pull-title").hide();
                	$("#pull-body").append("<div><p style='margin-top:50px' class='text-center'>暂未下载过数据，通过Client客户端下载订购的数据</p></div>");	
                }
                
            }
        });
    }
    getcurrpullnum(1);
    $(".pullpages").pagination(pulltotal, {
        maxentries:pulltotal,
        items_per_page: 30,
        num_display_entries: 1,
        num_edge_entries: 5 ,
        prev_text:"上一页",
        next_text:"下一页",
        ellipse_text:"...",
//          num_edge_entries:1,
        link_to:"javascript:void(0)",
        callback:fenS,
        load_first_page:false
    });
    function fenS(new_page_index){
        getcurrpullnum(new_page_index+1);
    }
    var head = $("#pull-body .record .head");
    head.click(function () {
        var body = $(this).closest(".record").children("div[class=body]:first");
        body.slideToggle("fast");
    });
})

