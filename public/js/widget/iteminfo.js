/*
$(function(){
    var data={
        'selItem':'itemDetails',//itemDetails,repDetails,dataOfDetails
        'reponame':'Internet_stats',//reponame参数,repo详情页，item详情页需要必填
        'itemname':'Film_and_television',//itemname参数，item详情页需要必填
        'username':'yaxin@asiainfo.com',//dataOfDetails需要必填
        'appendObj':'#contentBox',//需要被填充的盒子
        'pageObj':'pageBox'//分页盒子
    };
    itemInfo(data);
    $('[data-toggle="tooltip"]').tooltip();
});*/
var headerToken={};
if($.cookie("token")!=null&&$.cookie("token")!="null"){
    headerToken={Authorization:"Token "+$.cookie("token")};
}
var b=new Base64();
function itemInfo(data){

    var selItem=data.selItem;
    if(selItem=='repDetails'){
        repInfo(data)
    }
    if(selItem=='itemDetails'){
        itemDetailsInfo(data);
    }
    if(selItem=='dataOfDetails'){
        dataOfInfo(data);
    }
}
//itemDetails
function itemDetailsInfo(data){
    var repoName=data.reponame;
    var itemName=data.itemname;
    var appendObj=data.appendObj;

    var comment,create_user,username,nikename;
    var optime,optimefirst,optimelast;
    var label;
    var onwer;
    var label_sys;
    var timeArr=new Array();
    var $aboutBox=$("<div></div>").addClass("aboutBox").appendTo(appendObj);
    //getAjax("/api/repositories/"+repoName+"/"+itemName,headerToken,function(json){
        $.ajax({
            url: "/api/repositories/"+repoName+"/"+itemName,
            type:"get",
            cache:false,
            async:false,
            headers:headerToken,
            success: function(json){
                comment=json.data.comment;
                optime=json.data.optime;
                timeArr=optime.split("|");
                optimefirst=timeArr[0];
                optimelast=timeArr[1];
                label=json.data.label.sys.select_labels;//行业标签
                onwer=json.data.label.owner;//私有标签
                label_sys=json.data.label.sys.supply_style;
                create_user = json.data.create_user;
            }
        });
    //    comment=json.data.comment;
    //    optime=json.data.optime;
    //    timeArr=optime.split("|");
    //    optimefirst=timeArr[0];
    //    optimelast=timeArr[1];
    //    label=json.data.label.sys.select_labels;//行业标签
    //    onwer=json.data.label.owner;//私有标签
    //    label_sys=json.data.label.sys.supply_style;
    //    create_user = json.data.create_user;
    //})
    getAjax(" /api/users/"+create_user,headerToken,function(json){
        username=json.data.userName;
        nikename=json.data.nickName;
    });

    $($aboutBox).append('<div class="item-about">'+
    '<h3>关于'+itemName+'</h3>'+
    '<article>'+comment+' </article>'+
    '<div class="span_time">'+
        '<span></span>'+
        "<span  data-toggle='tooltip' datapalecement='top'data-original-title='"+optimefirst+"' >"+optimelast+"</span></div>"+
    '<div class="span_label"></div></div>'+
    '<div class="client_downs">' +
        '<p>所属Repository</p>'+
        '<p class="repo2"><a target="_blank" href="/repodet/'+repoName+'">'+repoName+'</a></p>'+
        '<a role="button" target="_blank" class="btn btn-primary btn-lg" href="/clientToolDownload">Client端下载</a>' +
            '<p>本数据由</p>'+
            '<p class="company_name"><a target="_blank" href="/userdet/'+ nikename+'">'+username+'</a>提供</p>'+
    '</div>'+
    '<div class="hot"></div>');

    if(label!=null&&label!=""&&label!=undefined){
        $(".span_label").append("<span>"+label+"</span>");
        if(label_sys=="batch")
            $(".span_label").append($("<span style='border: 1px solid #8fc31f;'></span>").text("批量数据"));
        if(label_sys=="flow")
            $(".span_label").append($("<span style='border: 1px solid #f8b551;'></span>").text("流式数据"));
        if(label_sys=="api")
            $(".span_label").append($("<span style='border: 1px solid #eb6877;'></span>").text("API"));
    }
    for(var x in onwer){
        $(".span_label").append("<span>"+onwer[x]+"</span>");
    }
    var $hotBox=$("<div></div>").addClass("hotBox").appendTo(appendObj);
    $hotBox.append("<p class='relate_title'>相关DataItem</p>");
    hot(repoName,itemName,$hotBox);

}



//repDetails
function repInfo(data){
  var reponame=data.reponame;
    var pageBox=data.pageObj;
    var appendObj=data.appendObj;
    var repoComment,userCreat,username,nikename;
    var repoTime,repoTimefirst,repoTimelast;
    $.ajax({
        url: "/api/repositories/" + reponame,
        cache: false,
        async: false,
        type:"get",
        headers:headerToken,
        success:function(json){
            repoComment=json.data.comment;
            userCreat=json.data.create_user;//邮箱格式的账号
            getAjax("/api/users/" + userCreat,headerToken,function(json){
                username=json.data.userName;
                nikename=json.data.nickName;
            })
            repoTime= json.data.optime;
            var timeArr=repoTime.split("|");
            repoTimefirst=timeArr[0];//年月日时分
            repoTimelast=timeArr[1];//几天前

        }
    });
    var $aboutBox=$("<div></div>").addClass("aboutBox").appendTo(appendObj);
    $($aboutBox).append('<div class="about">'+
        '<h3 class="aboutrep">关于'+reponame+'</h3>'+
        '<article class="repcomment">'+repoComment+'</article>'+
        '<div class="span_time">'+
        '<img src="/img/newpic004.png" data-toggle="tooltip" datapalecement="top"data-original-title="更新时间">'+
        '<span class="repoptime"data-toggle="tooltip" datapalecement="top" data-original-title="'+repoTimefirst+'">'+repoTimelast+'</span></div>'+
         '</div>'+
         '<div class="client_down">'+
        '<p class="cur_users">本数据由 <a target="_blank" href="/userdet/'+ nikename+'" class="repcreate_user">'+username+'</a> 提供</p>'+
        '</div>'+
        '<div>'+
        '</div>'+
        '</div> '
    );
    var $relateObj=$("<div></div>").addClass("relateObj").appendTo(appendObj);
    getUserEmail(reponame,$relateObj);
}
//dataOfDetails
function dataOfInfo(data){
    var username=data.username;
    var userName,comment;
    $.ajax({
        url: "/api/users/"+username,
        type: "get",
        cache:false,
        async:false,
        dataType:'json',
        headers:headerToken,
        success:function(json){
            if(json.code == 0){
                userName=json.data.userName;
                comment=json.data.comment;
                //console.log(comment)
            }
        }
    });
    $(data.appendObj).append('<div class="owner">'+
        '<p class="about">关于<span class="dataName">'+userName+'</span></p>'+
        '<p class="dataComment">'+comment+'</p></div>');
}
//AJAX封装
function getAjax(url,headerToken,fun){
    $.ajax({
        url: url,
        type:"get",
        cache:false,
        async:false,
        headers:headerToken,
        success: function(json){
            fun(json);
        }
    });
}

//相关repo开始
//the amount of like:star
function subscriptionRepo(repoName){
  /*  if($.cookie("token")!=null&&$.cookie("token")!="null"){
        headerToken={Authorization:"Token "+$.cookie("token")};
    }*/
    var starAmount = '';
    $.ajax({
        url: "/api/star_stat/"+repoName,
        type: "GET",
        cache: false,
        async: false,
        dataType: 'json',
        headers:headerToken,
        success: function (json) {
            if(json.code == 0) {
                starAmount = json.data.numstars;
            }
        }
    });
    return starAmount;
}

//the amount of purchaseRepo icon cart
function purchaseRepo(repoName){
    //if($.cookie("token")!=null&&$.cookie("token")!="null"){
    //    headerToken={Authorization:"Token "+$.cookie("token")};
    //}
    var purchaseAmount = '';
    $.ajax({
        url: "/api"+"/subscription_stat/"+repoName,
        type: "GET",
        cache:false,
        async:false,
        dataType:'json',
        headers:headerToken,
        success:function(json){
            if(json.code == 0){
                //$(".content1_pullNumber span:nth-child(2)").text("pull:"+json.data.nummypulls);
                purchaseAmount=json.data.numsubs;
            }
        }
    });
    return purchaseAmount;
}
//the amount of download the icon download
function downloadRepo(repoName){
 /*   if($.cookie("token")!=null&&$.cookie("token")!="null"){
        headerToken={Authorization:"Token "+$.cookie("token")};
    }*/
    var downloadAmount ='';
    $.ajax({
        url: "/api"+"/transaction_stat/"+repoName,
        type: "GET",
        cache:false,
        async:false,
        dataType:'json',
        headers:headerToken,
        success:function(json){
            if(json.code == 0){
                downloadAmount = json.data.numpulls;
            }
        }
    });
    return downloadAmount;
}
//the amount of comment
function getCommentRepo(repoName){
    var commentAmount=0;
    var allCommentAmount=0;
    $.ajax({
        url: "/api"+"/repositories/"+repoName+"?items=1",
        type: "GET",
        cache:false,
        async:false,
        headers:headerToken,
        dataType:'json',
        success:function(json){
            console.log(json);
            if(json.code == 0){
                if(json.data.dataitems!=null){
                    var dataItem=json.data.dataitems;
                    var len=json.data.items;
                    for(var i=0;i<len;i++){
                        var itemName=dataItem[i];
                        $.ajax({
                            url: "/api"+"/comment_stat/"+repoName+"/"+itemName,
                            type: "GET",
                            cache:false,
                            async:false,
                            dataType:'json',
                            headers:headerToken,
                            success:function(json){
                                //alert(json.data.numcomments)
                                console.log(json.data.numcomments)
                                if(json.code == 0){
                                    commentAmount=json.data.numcomments;
                                }
                            }
                        });
                        allCommentAmount+=commentAmount;
                    }
                }
            }
        }
    });
    return allCommentAmount;
}

//get currently user's loginname(email)
function getUserEmail(repname,relateObj){
    var loginEmail = '';
    $.ajax({
        url: "/api" +"/repositories/"+repname,
        type: "get",
        cache: false,
        async: false,
        headers:headerToken,
        success: function (jsons) {
            loginEmail = jsons.data.create_user;
            //get username

            $.ajax({
                url: "/api" +"/users/"+loginEmail,
                type: "get",
                cache: false,
                async: false,
                headers:headerToken,
                success: function (jsons){
                    //get reponame

                    var repoName ='';
                    $.ajax({
                        url: "/api" +"/repositories/"+"?size=3&username="+loginEmail,
                        type: "get",
                        cache: false,
                        async: false,
                        headers:headerToken,
                        success: function (jsons) {
                            var repoName_exist=$(".title .titlename").text();
                            var $place=$("<div></div>").appendTo(relateObj);
                            $place.append('<div><p class="titles">相关Repository</p></div>');
                            for (i=0;i<jsons.data.length;i++){
                                repoName=jsons.data[i].repname;
                                if(repoName_exist==repoName){
                                    continue;
                                }

                                var like = subscriptionRepo(repoName);
                                var cart =purchaseRepo(repoName);
                                var download =downloadRepo(repoName);
                                var comment = getCommentRepo(repoName);
                                //alert(comment+"---comment")
                                var url ="/repodet/"+repoName;
                                $($place).append(""+
                                    "<div class='completeDiv'  style='float: left;'>"+
                                    "<a href='"+url+"' target='_blank' title='"+repoName+"'> <p class='subtitle_right'>"+repoName+"</p></a>"+
                                    "<div class='icons' >"+
                                    "<div class='likes' >"+"<img src='/img/newpic001.png' data-original-title='点赞量' data-placement='top' data-toggle='tooltip'>"+"<span>"+like+"</span>"
                                    +"</div>"
                                    +"<div class='carts' >"+"<img src='/img/newpic002.png' data-original-title='订购量' data-placement='top' data-toggle='tooltip'>"+"<span>"+cart+"</span>"
                                    +"</div>"
                                    +"<div class='downloads' >"+"<img src='/img/newpic003.png' data-original-title='下载量' data-placement='top' data-toggle='tooltip'>"+"<span>"+download+"</span>"
                                    +"</div>"
                                    +"<div class='comments' >"+" <img src='/img/navselects/comment.png' data-original-title='评论量' data-placement='top' data-toggle='tooltip'>"+"<span>"+comment+"</span>"
                                    +"</div>"+"</div>"+"</div>"+"</div>");
                            }
                            var domExistLen=$(".completeDiv").length;

                            if(domExistLen>0){
                                $("#hot").show();
                            }
                            else{
                                $("#hot").hide();
                            }
                        }
                    });
                }
            });
        }
    });
}
//相关repo结束

//相关item开始
function subscription(repoName,itemName){
    var starAmount = '';
    $.ajax({
        url: "/api" + "/star_stat/" + repoName + "/" + itemName,
        type: "GET",
        cache: false,
        async: false,
        dataType: 'json',
        headers: headerToken,
        success: function (json) {
            if(json.code == 0){
                starAmount = json.data.numstars;
            }
        }
    });
    return starAmount;
}
//the amount of purchase icon cart
function purchase(repoName,itemName){
    var purchaseAmount = '';
    $.ajax({
        url: "/api"+"/subscription_stat/"+repoName+"/"+itemName,
        type: "GET",
        cache:false,
        async:false,
        dataType:'json',
        headers:headerToken,
        success:function(json){
            if(json.code == 0){
                //$(".content1_pullNumber span:nth-child(2)").text("pull:"+json.data.nummypulls);
                purchaseAmount=json.data.numsubs;
            }
        }
    });
    return purchaseAmount;
}
//the amount of download the icon download
function download_icon(repoName,itemName){
    var downloadAmount ='';
    $.ajax({
        url: "/api"+"/transaction_stat/"+repoName+"/"+itemName,
        type: "GET",
        cache:false,
        async:false,
        dataType:'json',
        headers:headerToken,
        success:function(json){
            if(json.code == 0){
                downloadAmount = json.data.numpulls;
            }
        }
    });
    return downloadAmount;
}
//the amount of comment
function getComment(repoName,itemName){
    var commentAmount='';
    $.ajax({
        url: "/api"+"/comment_stat/"+repoName+"/"+itemName,
        type: "GET",
        cache:false,
        async:false,
        dataType:'json',
        headers:headerToken,
        success:function(json){
            if(json.code == 0){
                commentAmount=json.data.numcomments;
            }
        }
    });
    return commentAmount;
}

function hot(repoName,itemName,$hotBox){
    $("#titleName .itemname").text(itemName);
    var $place=$("<div></div>").appendTo($hotBox);
    $.ajax({
        url: "/api"+"/repositories/"+repoName+"?relatedItems=1&size=3",
        type: "GET",
        cache:false,
        async:false,
        dataType:'json',
        headers:headerToken,
        success:function(json) {
            //console.log(json.data);
            var iname=json.data.dataitems;
            var item_exist=$("#titleName .itemname").text();
            for (i=0;i<json.data.dataitems.length;i++){

                if(iname[i]==item_exist) {
                    continue;
                }
                var pnum = purchase(repoName,iname[i]);
                var dnum = download_icon(repoName,iname[i]);
                var starnum = subscription(repoName,iname[i]);
                var commentnum = getComment(repoName,iname[i]);
                var url ="/itemdet/"+repoName+"/"+iname[i];
                $place.append(""+
                    "<div class='completeDiv2'  style='float: left'>"+
                    "<a href='"+url+"' target='_blank' title='"+iname[i]+"'><p class='subtitle2' style='padding-top: 20px; padding-bottom:25px; font-size:20px; font-weight: bold; color:#43609f; float:left'>"+iname[i]+"</p></a>"+
                    "<div class='icons2'>"+
                    "<div class='like2'>"+"<img src='/img/newpic001.png' data-original-title='点赞量' data-placement='top' data-toggle='tooltip'>"+"<span style='margin-left: 10px;'>"+starnum+"</span>"
                    +"</div>"
                    +"<div class='cart2'>"+"<img src='/img/newpic002.png' data-original-title='订购量' data-placement='top' data-toggle='tooltip' style='padding-right: 15px;'>"+"<span>"+dnum+"</span>"
                    +"</div>"
                    +"<div class='download2' >"+"<img src='/img/newpic003.png' data-original-title='下载量' data-placement='top' data-toggle='tooltip'>"+"<span style='margin-left: 10px;'>"+pnum+"</span>"
                    +"</div>"
                    +"<div class='comment2' >"+"<img src='/img/navselects/comment.png' data-original-title='评论量' data-placement='top' data-toggle='tooltip' style='padding-right: 15px;'>"+"<span>"+commentnum+"</span>"
                    +"</div>"+"</div>"+"</div>"+"</div>");
            }
        }
    });
}
//相关item结束