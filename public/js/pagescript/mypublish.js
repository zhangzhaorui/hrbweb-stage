/**
 * Created by Administrator on 2016/3/15.
 */
//获取所有rep
$(function(){
    //////弹窗居中
    modalCen('delerepoalert');
    modalCen('additemalert');
    var allrepnums = 0; //存储所有repo数量提供翻页；
    var  headerToken={Authorization: "Token " + $.cookie("token")};
    //添加item按钮
    $(document).on('click','.additembtn',function() {
        $(this).find('.additemwrop').show();
    })
    $(document).bind("click", function (e) {
        if ((e.target.className.indexOf("additembtn") < 0  && e.target.className.indexOf("additemp1") < 0&& e.target.className.indexOf("additemp2") < 0)) {
            $(".additemwrop").css("display", "none");
        }
    });
    function additemBox(){
        var delBox = '<div class="modal fade" id="additemalert" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"  modal-repoName="">'+
            '<div class="modal-dialog">'+
            '<div class="modal-content" style="padding:18px 30px;width:300px;float: left;">'+
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'+
            '<div class="additemtitle">创建批量数据</div>'+
            '<div class="additemcon">' +
            '<p class="additemconp1">请在Client端添加DataItem</p>' +
            '<p class="additemconp2"><a target="_blank" href="/clientDownload">马上下载Client端!</a></p>' +
            '</div>'+
            '<div class="additembtnwrop">' +
            '<span class="closeAddItemBox">我知道了</span>' +
            '</div>'+
        '</div>'+
        '</div>'+
        '</div>';
        $('body').append(delBox);
    }
    $(document).on('click','.additemp1',function (e) {

        if ( $("#additemalert").length <= 0 ){
            additemBox();
        }
        $('.additemtitle').html('创建批量数据')
        $('#additemalert').modal('toggle');
    })
    $(document).on('click','.additemp2',function (e) {
        if ( $("#additemalert").length <= 0 ){
            additemBox();
        }
        $('.additemtitle').html('创建流数式据')
        $('#additemalert').modal('toggle');
    })
        function getAjax(url,fun){
        $.ajax({
            type: "get",
            async: false,
            url: url,
            success: function(msg){
                fun(msg);
            },
            error:function(json){
                $('#errorDM').modal('show');
            }
        });
    }
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
    // 得到所有的rep数量
    $.ajax({
        url: "/api/repositories?size=-1&&myRelease=1",
        type: "get",
        cache: false,
        data: {},
        async: false,
        dataType: 'json',
        headers: headerToken,
        success: function (json) {
            if (json.code == 0) {
                allrepnums = json.data.length;

            }
        },
        error: function (json) {
            $('#errorDM').modal('show');
        }
    });
    // 得到每页的rep
    function getreps(nextpages) {
        $('.repList').empty();
        reps = null;
        $.ajax({
            url: "/api/repositories?size=10&page=" + nextpages+"&myRelease=1",
            type: "get",
            cache: false,
            data: {},
            async: false,
            dataType: 'json',
            headers: headerToken,
            success: function (json) {
                if (json.code == 0) {
                	if(json.data.length==0){
                		$("#pubnums").hide();
                		$(".repList").append("<div><p style='margin-top:50px;' class='text-center'>暂未发布数据</p></div>");
                	}else{
                		$("#pubitemnum").text(json.data.length);
                		for (var i = 0;i<json.data.length;i++) {
                            getrepocon(json.data[i]);
                        }
                	}


                }

            },
            error: function (json) {
                $('#errorDM').modal('show');
            }
        });
    }
    getreps(1);
    ////////////////获取repo详细信息
    function getrepocon(thisrepoame){
        $.ajax({
            url:"/api/repositories/"+thisrepoame.repname+"?items=update_time_down&myRelease=1",
            type: "get",
            cache:false,
            async:false,
            dataType:'json',
            headers:headerToken,
            success:function(json){
                if(json.code == 0){
                    addrepohtml(json.data,thisrepoame);
                }
            },
            error:function(json){
                $('#errorDM').modal('show');
            }
        });
    }
    ////////////////////////////////repo分页
    $(".repopages").pagination(allrepnums, {
        maxentries: allrepnums,
        items_per_page: 10,
        num_display_entries: 3,
        num_edge_entries: 3,
        prev_text: "上一页",
        next_text: "下一页",
        ellipse_text: "...",
        link_to: "javascript:void(0)",
        callback: gonextpage,
        load_first_page: false
    });
    function gonextpage(new_page_index){
        getreps(new_page_index+1);
    }
    // 返回item的评论量
    function getItemcommentNum (reponame,itemname) {
        var commentnum = 0;
        $.ajax({
            type: "get",
            async: false,
            cache: false,
            url: "/api/comment_stat/"+reponame+"/" + itemname,
            success: function (msg) {
                commentnum = msg.data.numcomments;
                return commentnum;
            }
        });
        return commentnum;
    }
    /////////////////添加repo列表
    function addrepohtml(repocon,iscooperatestate){
        ///////item评论
        var itemcomments = 0;
        for(var i=0;i<repocon.dataitems.length;i++){
            itemcomments += getItemcommentNum(iscooperatestate.repname,repocon.dataitems[i]);
        }
        ////////点赞；
        var starnum = '';
        getAjax("/api/star_stat/"+iscooperatestate.repname,function(msg){
            starnum = msg.data.numstars;
        })
        ////////订购量；
        var subsnum = '';
        getAjax("/api/subscription_stat/"+iscooperatestate.repname,function(msg){
            subsnum = msg.data.numsubs;
        })
        ////////下载量
        var pullnum = '';
        getAjax( "/api/transaction_stat/"+iscooperatestate.repname,function(msg){
            pullnum = msg.data.numpulls;
        })
        ////////////是否协作
        var thisiscooperatestat = '';
        var thiscoopername = '';
        //协作显示
        var ifcooper=true;
        var isdelerepo =  '<span class="isdelerepo" datarepoName="'+iscooperatestate.repname+'" datarepoisxiezuo="'+repocon.cooperateitems+'"></span>';
        if(iscooperatestate.cooperatestate == 'null' || iscooperatestate.cooperatestate == null || iscooperatestate.cooperatestate == 'undefined'){
            thisiscooperatestat = '';
        }else{
            thisiscooperatestat = '<span class="pricetype freetype reptoppr">'+iscooperatestate.cooperatestate+'</span>';
            if(iscooperatestate.cooperatestate=="协作中"){
                ifcooper=false;
                var thiscreate_user = '';
                $.ajax({
                    url:"/api/users/"+repocon.create_user ,
                    type: "get",
                    cache: false,
                    async: false,
                    headers: headerToken,
                    datatype: 'json',
                    success:function(json){
                        if(json.code == 0){
                            thiscreate_user = json.data.userName;
                        }
                    }

                });
                thiscoopername = '<div class="thiscoopername"><span>由&nbsp;'+thiscreate_user+'&nbsp;邀请协作</span></div>';
                isdelerepo =  '';
            }
        }
        ////////是否开放;
        var ispublic = '';
        var baimingdan = '';
        var xizuozhe = ''
        if(repocon.repaccesstype == 'public'){
            ispublic = '开放';
            //xizuozhe = '<p class="xiezuozhe ' + iscooperatestate.repname + '" datareponame="' + iscooperatestate.repname + '" dataispublic="' + repocon.repaccesstype + '">协作者管理（<span>0</span>）</p>';
            var cooperator = getcooperator(iscooperatestate.repname);
            if (cooperator == 'null' || cooperator == '' || cooperator == 'undefined' || cooperator == 'error') {
                xizuozhe = '<p class="xiezuozhe ' + iscooperatestate.repname + '" datareponame="' + iscooperatestate.repname + '" dataispublic="' + repocon.repaccesstype + '">协作者管理（<span>0</span>）</p>';
            } else {

                xizuozhe = '<p class="xiezuozhe ' + iscooperatestate.repname + '" datareponame="' + iscooperatestate.repname + '" dataispublic="' + repocon.repaccesstype + '">协作者管理（<span>' + cooperator.total + '</span>）</p>';
            }
        }else {
            if (iscooperatestate.cooperatestate != "协作中") {
                var permissioncon = getpermission(iscooperatestate.repname, 1, 0);
                if (permissioncon == 'null' || permissioncon == '' || permissioncon == 'undefined') {
                    baimingdan = '<p class="baimingdan baimingdan' + iscooperatestate.repname + '" datareponame="' + iscooperatestate.repname + '">白名单管理（<span>0</span>）</p>';
                } else {
                    baimingdan = '<p class="baimingdan baimingdan' + iscooperatestate.repname + '" datareponame="' + iscooperatestate.repname + '">白名单管理（<span>' + permissioncon.total + '</span>）</p>';
                }

            }
            ispublic = '私有';
        }
        var dataitemsalllist = '';
        if(repocon.dataitems){
            dataitemsalllist = 'itemdata="'+repocon.dataitems+'"';
        }else{
            dataitemsalllist = 'itemdata=""';
        }
        var repotiems = getTimes(repocon.optime);
        //右侧rep
        var repright="";
        if(ifcooper){
            repright="<div class='repright'>"+baimingdan+xizuozhe+"<p class='xiugairep' cooperateitems="+repocon.cooperateitems+" datareponame="+iscooperatestate.repname+" dataispublic=" + repocon.repaccesstype + ">Repository修改</p></div>";
        }
        var repostr = '<div class="repo" >'+
            '<div class="describe" '+dataitemsalllist+'>'+
            isdelerepo+
            '<div class="left">'+
            '<div class="subtitle" id="'+iscooperatestate.repname+'"><span class="curreoName">'+iscooperatestate.repname+'</span></a>'+thisiscooperatestat+'</div>'+
            thiscoopername+
            '<div class="description"><p>'+repocon.comment+'</p></div>'+
            '<div class="subline">'+
            '<div class="icon">'+
            '<img data-original-title="更新时间" class="iconiamg1 iconiamg2" src="/img/newpic004.png" data-toggle="tooltip" datapalecement="top">'+
            '<span 	data-original-title="'+repotiems.jdTime+'" data-toggle="tooltip" datapalecement="top">'+repotiems.showTime+'</span>'+
            '<img data-original-title="item量" class="iconiamg1" src="/img/newpic005.png" data-toggle="tooltip" datapalecement="top"/>'+
            '<span>'+repocon.itemsize+'</span>'+
            '<img  class="iconiamg1" data-original-title="属性" src="/img/sx.png" data-toggle="tooltip" datapalecement="top">'+
            '<span>'+ispublic+'</span>'+
                //'<img data-original-title="tag量" class="iconiamg1" src="images/tg.png" data-toggle="tooltip" datapalecement="top"/>'+
                //'<span>4</span>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div class="repcenter">'+
            '<div class="iconGroup">'+
            '<div class="like">'+
            '<img data-original-title="点赞量" style="" src="/img/newpic001.png" data-toggle="tooltip" datapalecement="top" >'+
            '<span>'+starnum+'</span>'+
            '</div>'+
            '<div class="cart">'+
            '<img data-original-title="订购量" style="" src="/img/newpic002.png" data-toggle="tooltip" datapalecement="top" >'+
            '<span>'+subsnum+'</span>'+
            '</div>'+
            '<div class="download">'+
            '<img data-original-title="下载量" style="" src="/img/newpic003.png" data-toggle="tooltip" 	datapalecement="top">'+
            '<span>'+pullnum+'</span>'+
            '</div>'+
            '<div class="itemComment">'+
            '<img data-original-title="评论量" style="" src="/img/comment.png" data-toggle="tooltip" 	datapalecement="top">'+
            '<span>'+itemcomments+'</span>'+
            '</div>'+
            '</div>'+
            '</div>'+
            repright
        '</div>'+
        '</div>';
        $('.repList').append(repostr);
        $(function(){
            $('[data-toggle="tooltip"]').tooltip();
        })
    }
    function getcooperator(repopermission){
        var  permission = '';
        $.ajax({
            url:  "/api/permission/"+repopermission+"?&size=-1&cooperator=1",
            type: "get",
            cache: false,
            async: false,
            dataType: 'json',
            headers: {Authorization: "Token " + $.cookie("token")},
            success: function (json) {
                if (json.code == 0) {
                    permission = json.data;;
                }
                return permission;
            },
            error:function (XMLHttpRequest, textStatus, errorThrown)
            {
                if(XMLHttpRequest.status == 400){
                    permission = 'error';
                }
                return permission;
            }
        });
        return permission;

    }
    ////////////////////////////////得到白名单
    function getpermission(repopermission,pages,isdelhtml){
        var  permission = '';
        $.ajax({
            url: "/api/permission/"+repopermission+"?page="+pages+"&size=6",
            type: "get",
            cache: false,
            async: false,
            dataType: 'json',
            headers: {Authorization: "Token " + $.cookie("token")},
            success: function (json) {
                total=json.data.total;
                if (json.code == 0) {
                    permission = json.data;
                }
                return permission;
            },
            error:function (XMLHttpRequest, textStatus, errorThrown)
            {
                if(XMLHttpRequest.status == 400){

                }

            }
        });
        return permission;

    }
//////////////查看repo下的item
$(document).on('click','.describe',function (e) {
    var thisrepName = $(this).find('.curreoName').html();
    var thisitems = $(this).attr('itemdata');
    if ((e.target.className.indexOf("isdelerepo")<0 && e.target.className.indexOf("baimingdan")<0 && e.target.className.indexOf("xiezuozhe")<0 && e.target.className.indexOf("xiugairep")<0)) {
        if ($(this).siblings('.tablelist').length <= 0) {
            getMyItemList(this,thisrepName,thisitems,0)

        }else{
            $(this).siblings('.tablelist').slideToggle(600)
        }
    }
});
    //   table 切换
$('.top_nav div').click(function(){
    $(this).addClass('cur').siblings().removeClass('cur');
    $('.mypushcomment li').eq($(this).index()).show().siblings().hide();
});
    $(document).on('click','.closeAddItemBox',function(){
        $('#additemalert').modal('toggle');
    });
});
$(document).ready(function(){
    if(myOrder=='myOrder'){
        $('.top_nav div:last').addClass('cur').siblings().removeClass('cur');
        $('.mypushcomment li').eq(1).show().siblings().hide();
    }
});