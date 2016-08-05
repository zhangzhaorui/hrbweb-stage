/**
 * Created by Max cheng on 2016/3/11.
 */
    //立即订购弹窗居中
//modalCen('p-modal');
var dheight=$(window).height();
console.log('dheight'+dheight);

var subsubprocessheight=$(".subprocess").height();
var newsubsubprocessheight=(dheight-subsubprocessheight)/2;
$(".subprocess").css({top:newsubsubprocessheight+"px"});

//立即订购弹窗
var successedheight=$(".successed").height();
var successedheight=(dheight-successedheight)/2;
$(".successed").css({top:successedheight+"px"});
//申请订购弹窗居中
var successedApplyheight=$(".successed_apply").height();
console.log('successedApplyheight'+successedApplyheight);
var newsuccessedApplyheight=(dheight-successedApplyheight)/2;
console.log('newsuccessedApplyheight'+newsuccessedApplyheight);
$(".successed_apply").css({top:newsuccessedApplyheight+"px"});


    var i_flash;
	var v_flash;
	if (navigator.plugins) {
		for (var i=0; i < navigator.plugins.length; i++) {
			if (navigator.plugins[i].name.toLowerCase().indexOf("shockwave flash") >= 0) {
				i_flash = true;
				v_flash = navigator.plugins[i].description.substring(navigator.plugins[i].description.toLowerCase().lastIndexOf("flash ") + 6, navigator.plugins[i].description.length);
			}
		}
	}



//评论开始
var replyJson={
        headerToken:{Authorization:"Token "+$.cookie("token")},
        loginitemname: $.cookie("tname"),  // 登录名
        repoName:reponame,
        itemName:itemname,
        ismypublish:false, // 是否是我的发布
        thispages:20//每页显示的条目数
}
var replyToAll = replyToAll(replyJson);
replyToAll.thisInit();
// 评论结束



//详情页右侧开始
var data={
    'selItem':'itemDetails',//itemDetails,repDetails,dataOfDetails
    'reponame':reponame,//reponame参数,repo详情页，item详情页需要必填
    'itemname':itemname,//itemname参数，item详情页需要必填
    'username':'yaxin@asiainfo.com',//dataOfDetails需要必填
    'appendObj':'#contentBox',//需要被填充的盒子
    'pageObj':'pageBox'//分页盒子
};
itemInfo(data);
//详情页右侧结束

//工具条触发开始
$('[data-toggle="tooltip"]').tooltip();
//工具条触发结束

//判断是否注册开始
function yes_no_login(){
    if($.cookie("token")!=null&&$.cookie("token")!="null") {
        login="true";

        $(".content .content1_pullNumber span").css("display","inline-block");
    }
    else
    {
        login="false";
        $(".content .content1_pullNumber span").css("display","none");
    }
    return login;
}
window.login=yes_no_login();
var headerToken={};
if($.cookie("token")!=null&&$.cookie("token")!="null"){
    headerToken={Authorization:"Token "+$.cookie("token")};
}
//判断是否注册结束

$(document).ready(function(){
    //头部名称
    $("#titleName .reponame").text(reponame);
    $("#titleName .itemname").text(itemname);
    $(document).bind("click", function (e) {
        if ((e.target.className.indexOf("alert_login")<0 && e.target.id != "icon_heart"&&e.target.className.indexOf("btn")<0)) {
            $(".alert_login").css("display","none");
        }
    });

//点击登录
    $("#LT_left_icon .alert_login p a").click(function() {
        $(".modal-open").css("padding-right","15px");
        $('#myModal').modal('show');
    });



    //标题长度过长时省略号代替
    var item=$("#titleName .itemname").text();
    if(item.length>45){
        var subitem=item.substring(0,42)+"...";
        $("#titleName .itemname").text(subitem);
    }
    var repo=$("#titleName .reponame").text();
    if(repo.length>45){
        var subrepo=repo.substring(0,45);
        $("#titleName .itemname").text(subrepo);
    }

    //标题链接
    var url ="/repodet/"+reponame;
    $("#titleName a").attr("href",url);
    var data=getData;
    data.getSubs();//返回订购量
    data.getStars();//点赞量
    data.getRepos();//repo信息
    data.star();//点赞功能（未登录）
    data.chatShare();//微信分享
    data.getTotalPulls();//pull总量

    tagInfo(1);//返回tag信息
    //switchover();
    tablesheet();//元数据table样式

    switchover();//从我的订购评论按钮进来样式

    buyLogic();//订购逻辑   
    $('[data-toggle="tooltip"]').tooltip();
	$("button").focus(function(){this.blur()});


    
    
});

//复制提示
function copytip(text,event){
	$("#tttcopys").remove();
	event.after("" +
			"<div style='float: right;margin-right: 22px;margin-top: -40px;' id='tttcopys' class='fadeInUp animated'>"+
				"<div class='tooltip-inner' style='background-color:#333333;'>"+text+"</div>"+
		    "</div>"
	);
	setTimeout("$('#tttcopys').addClass('fadeOut')", 1000);
}

var getData={
    getSubs:function(){
        var subs,pulls,price;
        getAjax("/api/subscription_stat/"+reponame+"/"+itemname,headerToken,function(json){
            subs=json.data.numsubs;//订购量
            $("#icon_buy_num").text(json.data.numsubs);
        });
    },
    getStars:function(){
        var numstars;
        getAjax("/api/star_stat/"+reponame+"/"+itemname,headerToken,function(json){
            numstars = json.data.numstars;
            $("#icon_heart_number").text(numstars);
        });
        return numstars;
    },
    getTotalPulls:function(){
        var numpulls;
        getAjax("/api/transaction_stat/"+reponame+"/"+itemname,headerToken,function(json){
            numpulls = json.data.numpulls;
            $("#icon_download_num").text(numpulls);
        });
        return numpulls;
    },
    getRepos:function(){
        var pulls,price;
        $.ajax({
            url:"/api/repositories/"+reponame+"/"+itemname,
            type:'get',
            cache:false,
            async:false,
            headers:headerToken,
            success:function(json){
                var create_user=json.data.create_user;
                price = json.data.price;//计费计划
                var label=json.data.label.sys.supply_style;//数据类型标签
                //if(price!=undefined||price!=null) {
                //    var price_length = price.length;
                //    for (var i= 0;i<price_length; i++) {
                //        var expire = price[i].expire;//有效期
                //        var money = price[i].money;//money
                //        var units = price[i].units;//次数
                //        if(label=="flow"){
                //            $("#LT-right .form-control").append($("<option></option>").attr("value",i).text(money + "元" + units + "天,  " + "有效期" + expire + "天"));
                //        }else{
                //            $("#LT-right .form-control").append($("<option></option>").attr("value",i).text(money + "元" + units + "次,  " + "有效期" + expire + "天"));
                //        }
                //    }
                //}
                var Sample=json.data.Sample;//样例数据
                $("#left_exam p:nth-child(1)").html(marked(Sample));
                var Meta=json.data.Meta;//元数据
                $("#left_unit p:nth-child(1)").html(marked(Meta));
                var pricestate=json.data.pricestate;//获取付费状态
                var price = json.data.price;//计费方式
                if(price!=undefined||price!=null) {
                    var price_length = price.length;
                    for (var i = 0; i < price_length; i++) {
                        var expire = price[i].expire;//有效期
                        var money = price[i].money;//money
                        var units = price[i].units;//次数
                        if(label=="flow"){
                            $("#LT-right .form-control").append($("<option></option>").attr("value",i).text(money + "元" + units + "天,  " + "有效期" + expire + "天"));
                        }else{
                            $("#LT-right .form-control").append($("<option></option>").attr("value",i).text(money + "元" + units + "次,  " + "有效期" + expire + "天"));
                        }
                    }
                }
                //获取付费状态
                if(pricestate=="免费")
                {
                    $("#button_buy>p").text("免费").css({"height":"2.1em","margin-top":"40px","border":"1px solid #f49f12","color":"#f49f12"});
                }
                if(pricestate=="限量试用")
                {
                    $("#button_buy>p").text("限量试用").css({"height":"3.2em","margin-top":"30px"});
                }
                if(pricestate=="付费")
                {
                    $("#button_buy>p").text("付费").css({"height":"2.1em","margin-top":"40px"});
                }
                //通过创建者获取username
                getAjax("/api/users/"+create_user+"/",headerToken,function(j){
                    //company
                    if(j.code==0){
                        var company_name= j.data.userName;
                        var nickName=j.data.nickName
                        var url="/userdet/"+nickName;
                        $("#client_down .company_name a").text(company_name).attr({"href":url,"target":"_blank"});
                        //在线或者离线在登录之后显示
                        if(login=="true") {
                            $.ajax({
                                url: "/api/heartbeat/status/" + create_user,
                                type: "GET",
                                cache: false,
                                async: false,
                                dataType: 'json',
                                //headers: header,
                                success: function (json) {
                                    var status = json.data.status;
                                    if (status == "offline") {
                                        $("#LT_left_title .line").text("离线");
                                        $("#LT_left_title .line").css({
                                            "border": "1px solid #666666",
                                            "color": "#666666",
                                            "position": "absolute",
                                            "": ""
                                        });
                                    }
                                    if (status == "online") {
                                        $("#LT_left_title .line").text("在线");
                                        $("#LT_left_title .line").css({
                                            "border": "1px solid #53be64",
                                            "color": "#53be64",
                                            "position": "absolute",
                                            "": ""
                                        });
                                    }
                                }
                            });
                        }
                    }
                })
            }
        })
    },
    star:function(){
            var numstars = "";
            //对star数据进行更新
            $.ajax({
                url: "/api" + "/star_stat/" + reponame + "/" + itemname,
                type: "GET",
                cache: false,
                async: false,
                dataType: 'json',
                success: function (json) {
                    numstars = json.data.numstars;
                    $("#icon_heart_number").text(numstars);

                }
            });
            $("#icon_heart").click(function () {
                if(login=="true") {
                 $.ajax({
                        //获取star状态
                        url: "/api" + "/star/" + reponame + "/" + itemname,
                        type: "GET",
                        cache: false,
                        async: false,
                        dataType: 'json',
                        headers: {Authorization: "Token " + $.cookie("token")},
                        success: function (json) {
                            if (json.data.starred) {
                                $("#icon_heart").css({
                                    "background-image": "url('/img/icon_heart.png')",
                                    "background-repeat": "no-repeat",
                                    "background-position": "0px 1px",
                                    "display": "inline-block",
                                    "width": "25px",
                                    "height": "25px"
                                });
                                //返回去star==0状态
                                $.ajax({
                                    url: "/api" + "/star/" + reponame + "/" + itemname + "?star=0",
                                    type: "PUT",
                                    cache: false,
                                    async: false,
                                    dataType: 'json',
                                    headers: {Authorization: "Token " + $.cookie("token")},
                                    success: function (json) {
                                        if (json.code == 0) {
                                            //对star数据进行更新
                                            $.ajax({
                                                url: "/api" + "/star_stat/" + reponame + "/" + itemname,
                                                type: "GET",
                                                cache: false,
                                                async: false,
                                                dataType: 'json',
                                                //headers: {Authorization: "Token " + $.cookie("token")},
                                                success: function (json) {
                                                    numstars = json.data.numstars;
                                                    $("#icon_heart_number").text(numstars);
                                                }
                                            });
                                        }

                                    }
                                });
                            }
                            else {
                                $("#icon_heart").css({
                                    "background-image": "url('/img/icon_heart2.png')",
                                    "background-repeat": "no-repeat",
                                    "background-position": "0px 1px",
                                    "display": "inline-block",
                                    "width": "25px",
                                    "height": "25px"
                                });
                                //返回去star==1状态
                                $.ajax({
                                    url: "/api" + "/star/" + reponame + "/" + itemname + "?star=1",
                                    type: "PUT",
                                    cache: false,
                                    async: false,
                                    dataType: 'json',
                                    headers: {Authorization: "Token " + $.cookie("token")},
                                    success: function (json) {
                                        if (json.code == 0) {
                                            //对star数据进行更新
                                            $.ajax({
                                                url: "/api" + "/star_stat/" + reponame + "/" + itemname,
                                                type: "GET",
                                                cache: false,
                                                async: false,
                                                dataType: 'json',
                                                //headers: {Authorization: "Token " + $.cookie("token")},
                                                success: function (json) {
                                                    numstars = json.data.numstars;
                                                    $("#icon_heart_number").text(numstars);
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
                else
                {
                    $(" .alert_login").css({"display":"block","left":"268px"}).show();
                }
            })
    },
    chatShare:function(){
        //var str=[];
        var local_href=location.href;
      /*  str=local_href.split(".html");
        var local_href_new=str[0]+"Phone.html"+str[1];*/
        var qrcode= new AraleQRCode({
            render:"canvas ",
            text:local_href,
            size:90,
            correctLevel:0
        });
        var qrcode2= new AraleQRCode({
            render:"canvas ",
            text:local_href,
            size:12,
            correctLevel:0
        });
        $(window).load(function(){
            $(".be-loader").fadeOut("slow");
            $("#small-qrcode>span").append(qrcode2);
        });
        $("#small-qrcode,#big-qrcode").on("mouseenter mouseleave",function(event){
            if(event.type=="mouseenter"){
                $("#big-qrcode>span").append(qrcode);
                $("#big-qrcode").show();
            }
            if(event.type=="mouseleave"){
                $("#big-qrcode>span").empty();
                $("#big-qrcode").hide();
            }
        })
    }
}
function tagInfo(nextpages){
    var tagNum;
    //tag信息
    $.ajax({
        url: "/api"  +"/repositories/" + reponame + "/" + itemname + "?page=" + nextpages+"&size=30",
        type: "GET",
        cache: false,
        async: false,
        headers:headerToken,
        dataType: 'json',
        success: function (json) {
            if (json.code == 0) {
                tagNum = json.data.tags;
                $("#nav1 > sup > span").text(tagNum);
                var list_length = json.data.taglist.length;
                var taglist = json.data.taglist;
                for (var i = 0; i < list_length; i++) {
                    var tag_tag = taglist[i].tag;
                    var tag_comment = taglist[i].comment;
                    var tag_time = taglist[i].optime;
                    var arry=new Array();
                    arry=tag_time.split("|");


                    var $left_content = $("#left_content .left_content_con");
                    var $content = $("<div></div>").addClass("content").appendTo($left_content);
                    var $content1_title = $("<div></div>").addClass("content1_title").appendTo($content);
                    $content1_title.append($("<p></p>").text(tag_tag));
                    $content1_title.append($("<p></p>").text(tag_comment));

                    var $content1_time = $("<div></div>").addClass("content1_time").appendTo($content);
                    $content1_time.append("<span></span>");
                    $content1_time.append($("<span>2分钟以前</span>").text(arry[1]).attr({"data-toggle":"tooltip","datapalecement":"top","title":arry[0]}));

                    var $content1_pullNumber = $("<div></div>").addClass("content1_pullNumber").appendTo($content);

                    var $content1_copy = $("<div></div>").addClass("content1_copy").appendTo($content);
                    var $content1_copy_div = $content1_copy.append("<div></div>");
                    $content1_copy_div.append($("<input type='text'>").attr("value", reponame+"/"+ itemname+":"+ tag_tag).attr("id", "input_copy" + i).attr("readonly","readonly"));
                    var clipbtn = $("<button data-original-title='复制tag地址，用于Client端下载' data-placement='top' data-toggle='tooltip' class='copyclip'>复制</button>").attr("data-clipboard-action", "copy").attr("data-clipboard-target", "#input_copy" + i).attr("data-clipboard-target-zero", "input_copy" + i);   
                    
                    
                    if (i_flash) {
                    	var clip = new ZeroClipboard(clipbtn);
            			clip.on('aftercopy', function(event) {
            				$('[data-toggle="tooltip"]').tooltip('hide');
            				copytip("复制成功",$(event.target))
            		    });
            			clip.on('error', function (e) {
            				$('[data-toggle="tooltip"]').tooltip('hide');
            				copytip("复制失败",$(event.target))
            		    });
	            	}else{
	            	      var clipboard = new Clipboard(".copyclip");
	            	      clipboard.on('success', function (e) {
	            	    	  $('[data-toggle="tooltip"]').tooltip('hide');
	            	    	  copytip("复制成功",$(e.trigger.outerHTML))
	            	      });
	            	      clipboard.on('error', function (e) {
	            	    	  $('[data-toggle="tooltip"]').tooltip('hide');
	            	    	  copytip("复制失败",$(e.trigger.outerHTML))
	            	      });			
	            	}
                    
                    
                    //复制功能结束
                    $content1_copy_div.append(clipbtn);
                    var content1_download = $("<div></div>").addClass("content1_download").appendTo($content);
                    content1_download.append("<span data-original-title='下载量' data-toggle='tooltip' datapalecement='top'></span>");
                    //获取tag的pull量
                    var numMyPulls=0;
                    $.ajax({
                        url: "/api"  + "/transaction_stat/" + reponame + "/" + itemname + "/" + tag_tag,
                        type: "GET",
                        cache: false,
                        async: false,
                        dataType: 'json',
                        headers:headerToken,
                        success: function (json) {
                            if (json.code == 0) {
                                //$(".content1_pullNumber span:nth-child(2)").text("pull:" + json.data.nummypulls);
                                numMyPulls=json.data.nummypulls;
                                content1_download.append("<p>"+json.data.numpulls+"</p>");
                            }
                        }
                    });
                    if(login=="true"){
                         $content1_pullNumber.append("<span data-original-title='我的下载量' data-toggle='tooltip' datapalecement='top'></span>");
                         $content1_pullNumber.append("<span>Pull:"+numMyPulls+"</span>");
                    }
                }
            }
        },
        error:function(json){
            if ($.parseJSON(json.responseText).code == 1006) {
                alert("信息已过期，访问首页!");
                window.location.href="/";
            }
        }
    });
        $(".left_content_page").pagination(tagNum, {
            maxentries:tagNum,
            items_per_page: 30,
            num_display_entries: 5,
            num_edge_entries: 5 ,
            prev_text:"上一页",
            next_text:"下一页",
            ellipse_text:"...",
            link_to:"javascript:void(0)",
            callback:netpage,
            load_first_page:false
        });
}
function netpage(new_page_index){
    $("#left_content .left_content_con").empty();
    var new_page_index=new_page_index+1;
    //tagInfo(new_page_index);
    //tag信息
    $.ajax({
        url: "/api"  +"/repositories/" + reponame + "/" + itemname + "?page=" + new_page_index+"&size=30",
        type: "GET",
        cache: false,
        async: false,
        headers:headerToken,
        dataType: 'json',
        success: function (json) {
            if (json.code == 0) {
                tagNum = json.data.tags;
                $("#nav1 > sup > span").text(tagNum);
                var list_length = json.data.taglist.length;
                var taglist = json.data.taglist;
                for (var i = 0; i < list_length; i++) {
                    var tag_tag = taglist[i].tag;
                    var tag_comment = taglist[i].comment;
                    var tag_time = taglist[i].optime;
                    var arry=new Array();
                    arry=tag_time.split("|");


                    var $left_content = $("#left_content .left_content_con");
                    var $content = $("<div></div>").addClass("content").appendTo($left_content);
                    var $content1_title = $("<div></div>").addClass("content1_title").appendTo($content);
                    $content1_title.append($("<p></p>").text(tag_tag));
                    $content1_title.append($("<p></p>").text(tag_comment));

                    var $content1_time = $("<div></div>").addClass("content1_time").appendTo($content);
                    $content1_time.append("<span></span>");
                    $content1_time.append($("<span>2分钟以前</span>").text(arry[1]).attr({"data-toggle":"tooltip","datapalecement":"top","title":arry[0]}));

                    var $content1_pullNumber = $("<div></div>").addClass("content1_pullNumber").appendTo($content);

                    var $content1_copy = $("<div></div>").addClass("content1_copy").appendTo($content);
                    var $content1_copy_div = $content1_copy.append("<div></div>");
                    $content1_copy_div.append($("<input type='text'>").attr("value", reponame+"/"+ itemname+":"+ tag_tag).attr("id", "input_copy" + i).attr("readonly","readonly"));
                    var clipbtn = $("<button>复制</button>").attr("data-clipboard-action", "copy").attr("data-clipboard-target", "#input_copy" + i);
                    //复制功能
                    var clipboard = new Clipboard(clipbtn.get(0));
                    clipboard.on('success', function (e) {
                        alert("复制成功!");
                    });
                    clipboard.on('error', function (e) {
                        alert("暂不支持此浏览器,请手动复制或更换浏览器!");
                    });
                    //复制功能结束
                    $content1_copy_div.append(clipbtn);
                    var content1_download = $("<div></div>").addClass("content1_download").appendTo($content);
                    content1_download.append("<span data-original-title='下载量' data-toggle='tooltip' datapalecement='top'></span>");
                    //获取tag的pull量
                    var numMyPulls=0;

                    $.ajax({
                        url: "/api"  + "/transaction_stat/" + reponame + "/" + itemname + "/" + tag_tag,
                        type: "GET",
                        cache: false,
                        async: false,
                        dataType: 'json',
                        headers:headerToken,
                        success: function (json) {
                            if (json.code == 0) {
                                //$(".content1_pullNumber span:nth-child(2)").text("pull:" + json.data.nummypulls);
                                numMyPulls=json.data.nummypulls;
                                content1_download.append("<p>"+json.data.numpulls+"</p>");
                            }
                        }
                    });
                      if(login=="true"){
                     $content1_pullNumber.append("<span data-original-title='我的下载量' data-toggle='tooltip' datapalecement='top'></span>");
                     $content1_pullNumber.append("<span>Pull:"+numMyPulls+"</span>");
                     }

                }
                //$("<div></div>").addClass("left_content_page").appendTo($left_content);

            }
        },
        error:function(json){
            if ($.parseJSON(json.responseText).code == 1006) {
                alert("信息已过期，访问首页!");
                window.location.href="/";
            }
        }
    });
}
var nav_index = 0;
//当有评论通过url参数传进来时
function switchover(){
    if(discuss=="discuss"){
        nav_index=3;
        $("#left_content").hide();
        $("#left_exam").hide();
        $("#left_unit").hide();
        $("#left_comment").show();
        $("#nav4").addClass('borderBt');
        $("#nav4").siblings().removeClass('borderBt');
    }else{
        $("#left_exam").hide();
        $("#left_content").hide();
        $("#left_comment").hide();
    }
}

//tag、样例数据、元数据切换
$("#left_nav>p").on("click",function(){
    var index=$(this).index();
    nav_index = $(this).index();
    $(this).addClass('borderBt');
    $(this).siblings().removeClass('borderBt');
    //下面这行复合样式不生效
    //$("#left_nav>p:eq("+index+")" ).css({" border-bottom":"4px solid #8c97cb"," font-weight":"bold"});
    $("#left_contentALL>div:eq("+index+")").show().siblings().hide();
});
$("#left_nav>p").on("mouseover",function(){
    $(this).addClass('borderBt');
    $(this).siblings().removeClass('borderBt');
})
$("#left_nav>p").on("mouseout",function(){
    $("#left_nav>p").eq(nav_index).addClass('borderBt').siblings().removeClass('borderBt');
})
function tablesheet(){
    $("#left_unit table tbody tr:odd").css({"background-color":"#f3f3f3","height":"35px","width":"60px"});
    $("#left_unit table tbody tr:even").css({"background-color":"#f1f6fa","height":"35px","width":"60px"});
}
function getAjax(url,headerToken,func){
    $.ajax({
        url:url,
        type:'get',
        cache:false,
        async:false,
        headers:headerToken,
        success:function(json){
        func(json);
        }
    })
}
//订购逻辑
function buyLogic(){
    if(login=="false") {
        //登录前进行正在发布情况的判断
        var tagNum=$("#nav1>sup>span").text();
        var priceIndex=$("#LT-right .form-control option").val();
        if(tagNum==0||priceIndex==undefined||priceIndex==""){
            $("#upcoming_release").show().siblings().hide();
        }
        //$("#hurry_buy").text("登录后订购");

        $("#hurry_buy").click(function(){
            $(".alert_login").css({"display": "block", "left": "706px"}).show();
        });
    }
    else{
        $.ajax({
            url: "/api" + "/repositories/" + reponame + "/" + itemname,
            type: "get",
            cache: false,
            async: false,
            headers: headerToken,
            dataType: 'json',
            success: function (json) {
                var tags=json.data.tags;
                var price=json.data.price;
                if(tags==0||price==null||price=="undefined"|| price==undefined||price=="")
                {
                    $("#cancel_buy").hide();
                    $("#hurry_buy").hide();
                    $("#apply_buy").hide();
                    $("#price_plan").hide();
                    $("#upcoming_release").show();
                }
                else {
                    $.ajax({
                        url: "/api"+"/repositories/"+reponame+"/"+itemname+"?haspermission=1",
                        type: "get",
                        cache:false,
                        data:{},
                        async:false,
                        headers:headerToken,
                        dataType:'json',
                        success:function(json){
                            var permission=json.data.permission;
                            //alert("permission:"+permission);
                            if(permission==false||permission=="false")
                            {
                                $.ajax({
                                    url: "/api"+"/subscription/"+reponame+"/"+itemname+"/apply",
                                    type: "get",
                                    cache:false,
                                    async:false,
                                    headers:headerToken,
                                    dataType:'json',
                                    success:function(json){
                                        if(json.code==0){
                                            //alert("json.data:"+json.data);
                                            if(json.data=="undefined"||json.data==undefined||json.data==null||json.data=="null")
                                            {
                                                $("#apply_buy").show();
                                                $("#hurry_buy").hide();
                                                $("#cancel_buy").hide();
                                                apply_buy();
                                            }
                                            else {
                                                $("#cancel_buy").show();
                                                $("#hurry_buy").hide();
                                                $("#apply_buy").hide();
                                                cancel_buy();
                                            }
                                        }
                                    }
                                });
                            }
                            else {
                                $("#hurry_buy").show();
                                $("#cancel_buy").hide();
                                $("#apply_buy").hide();
                                hurry_buy();
                            }
                        }
                    });


                }
            }
        });
    }
    var upcomsta=$("#upcoming_release").is(":visible");
    //var display =$('#upcoming_release').css('display');
    if(upcomsta){
        $(".price-style").hide();
    }else{
        $(".price-style").show();
    }
}

//立即订购
function hurry_buy(){
    var headerToken={};
    if($.cookie("token")!=null&&$.cookie("token")!="null"){
        headerToken={Authorization:"Token "+$.cookie("token")};
    }
    var limitBoo=false;
    $("#hurry_buy").click(function(e){
    	$("#p-modal").css({top:"50px"});
        $(".repnamePm").text(reponame);
        $(".itemnamePm").text(itemname);
        var price_plan=$("#price_plan").text();
        $.ajax({
            url: "/api"+"/repositories/"+reponame+"/"+itemname,
            type: "get",
            cache:false,
            async:false,
            headers:headerToken,
            dataType:'json',
            success:function(json){
                if(json.code == 0){
                    var  prices= json.data.price;
                    if(prices!=null||prices!=""){
                        var sel_options=$("#LT-right .form-control").find("option:selected").val();
                        var limitNum=prices[sel_options].limit;//限制订购的次数
                        var planId=prices[sel_options].plan_id;
                        if(limitNum==null||limitNum==""||limitNum==undefined){
                            limitNum=0;
                        }
                        if(limitNum!=null||limitNum!=""||limitNum!=undefined){
                            $.ajax({
                                url: "/api"+"/subscription_stat/"+reponame+"/"+itemname+"/"+planId,
                                type: "get",
                                cache:false,
                                async:false,
                                headers:{Authorization:"Token "+$.cookie("token")},
                                dataType:'json',
                                success:function(json){
                                    if(json.code==0){
                                        var numsigns=json.data.numsigns;//订购次数
                                        if(limitNum>0&&numsigns>=limitNum){
                                            //alert("您的有限免费额度已经用完，请选择其他计费包。");
                                            $("#limit_buy_alert").show().fadeOut(5000);
                                            limitBoo=false
                                        }
                                        else{
                                            limitBoo=true;
                                        }
                                    }
                                },
                                error:function(json){
                                    if ($.parseJSON(json.responseText).code == 5040) {
                                        //alert("您的有限免费额度已经用完，请选择其他计费包。");
                                        $("#limit_buy_alert").show().fadeOut(2500);
                                    }

                                }
                            });
                        }
                    }
                }
            }
        });

        if(limitBoo){
            var create_user;
            var subscripted;
            var supplyStyle;
            var prices;
            var subType=true;
            $("#myModalLabel").text("数据订购合约");
            $("#subscriptDialog .modal-header .close").show();
            $.ajax({
                url: "/api"+"/repositories/"+reponame+"/"+itemname,
                type: "get",
                cache:false,
                data:{},
                async:false,
                headers:headerToken,
                dataType:'json',
                success:function(json){
                    if(json.code == 0){
                        subscripted = json.data.itemaccesstype;
                        create_user = json.data.create_user;
                        prices = json.data.price;
                        supplyStyle = json.data.label.supply_style;
                    }
                }
            });
            //获取subscriptionid+time
            var myself=true;
            $.ajax({
                url: "/api"+"/subscription/"+reponame+"/"+itemname,
                type: "post",
                cache:false,
                data:{},
                async:false,
                headers:headerToken,
                dataType:'json',
                success:function(json){
                    if(json.code == 0){
                        subscriptionid=json.data.subscriptionid;
                        subcreateTimes=json.data.signtime.substring(0,10);
                        $(".dvalue").text(subcreateTimes);
                    }
                },
                error:function(json){
                    if ($.parseJSON(json.responseText).code == 5008||$.parseJSON(json.responseText).code == 5007) {
                        $("#myself_alert").show().fadeOut(2500);
                        myself=false;
                    }
                }
            });

            //------------------------订购合同------------------------
            //设置甲方乙方
            var usera = $.cookie("tname");//获取当前用户，甲方
            var userb = create_user;//获取item用户，乙方
            $.ajax({
                url: "/api"+"/users/"+usera,
                type: "get",
                cache:false,
                data:{},
                async:false,
                dataType:'json',
                success:function(json){
                    if(json.code == 0){
                        usera = json.data.userName;
                    }
                }
            });
            $.ajax({
                url: "/api"+"/users/"+userb,
                type: "get",
                cache:false,
                data:{},
                async:false,
                dataType:'json',
                success:function(json){
                    if(json.code == 0){
                        userb = json.data.userName;
                    }
                }
            });
            $("#subscriptDialog .body .sub0 .requirera .itext").val(usera);
            $("#subscriptDialog .body .sub0 .requirerb .itext").val(userb);
            //创建价格列表
            var chargeBody = $("#subscriptDialog .body .sub3 .sbody .charge-body");
            chargeBody.html("");
            $.ajax({
                url: "/api"+"/repositories/"+reponame+"/"+itemname,
                type: "GET",
                cache:false,
                async:false,
                dataType:'json',
                headers:headerToken,
                success:function(json) {
                    var pricestate = json.data.pricestate;//获取付费状态
                    var price = json.data.price;//计费方式
                    var supply_style=json.data.label.sys.supply_style;
                    if(price==undefined||price==null){
                        $("#cancel_buy").hide();
                        $("#hurry_buy").hide();
                        $("#apply_buy").hide();
                        $("#price_plan").hide();
                        $("#upcoming_release").show();
                    }else {
                        var price_length = price.length;
                        for (var i = 0; i < price_length; i++) {
                            var expire = price[i].expire;//有效期
                            var money = price[i].money;//money
                            var units = price[i].units;//次数
                            if(supply_style=="flow"){
                                var charegeitem = $("<div></div>").addClass("chargeitem").appendTo(chargeBody);
                                charegeitem.append($("<span class='cbtn'></span>").append($("<input name='subcharge' charge_hurry='charge_hurry' type='radio' value="+i+" checked='checkted'>")));
                                charegeitem.append($("<span class='cvalue'></span>").
                                append($("<span class='moneyu' mark=" + price[i].plan_id + "></span>").text("¥ ")).
                                append($("<span class='moneyv'></span>").text(money+"元")).
                                append($("<span class='moneyl'>&nbsp;/&nbsp;</span>")).
                                append($("<span class='moneyu2'></span>").text(units+"天")).
                                append($("<span class='moneyl'>&nbsp;&nbsp;&nbsp;&nbsp;</span>")).
                                append($("<span class='vexpire'></span>").text("有效期"+expire+"天")));
                            }else{
                                var charegeitem = $("<div></div>").addClass("chargeitem").appendTo(chargeBody);
                                charegeitem.append($("<span class='cbtn'></span>").append($("<input name='subcharge' charge_hurry='charge_hurry' type='radio' value="+i+" checked='checkted'>")));
                                charegeitem.append($("<span class='cvalue'></span>").
                                append($("<span class='moneyu' mark=" + price[i].plan_id + "></span>").text("¥ ")).
                                append($("<span class='moneyv'></span>").text(money+"元")).
                                append($("<span class='moneyl'>&nbsp;/&nbsp;</span>")).
                                append($("<span class='moneyu2'></span>").text(units+"次")).
                                append($("<span class='moneyl'>&nbsp;&nbsp;&nbsp;&nbsp;</span>")).
                                append($("<span class='vexpire'></span>").text("有效期"+expire+"天")));
                            }


                        }
                        //charegeitem.append($("<span class='cdtitle'></span>").text(expire));
                        //charegeitem.append($("<span class='cdvalue'></span>").
                        //append($("<span class='vexpire'></span>").text(1)).
                        //append($("<span class='uexpire'></span>").text(" 天")));
                    }
                }
            });
            $("#subscriptDialog .body .subbtns .submit").val('签约');
            //设置radio默认状态
            var sel_options=$("#LT-right .form-control").find("option:selected").val();
            $(".charge-body div:eq("+sel_options+") .cbtn input").prop("checked","checked").siblings().hide();
            $(".charge-body div:eq("+sel_options+")").siblings().hide();
            // 设置订购合同日期，目前写死
            var timer;
            $('#subscriptDialog').on("hidden.bs.modal",function() {//从新初始化
                $("#subscriptDialog .subprocess .midle").text("60S");
                $("#subscriptDialog .modal-dialog").css({width:"758px"});
                $("#subscriptDialog .modal-header").show();
                $("#subscriptDialog .subcontent").show();
                $("#subscriptDialog .subprocess").hide();
                $("#subscriptDialog .subafterprocess .successed").hide();
                $("#subscriptDialog .subafterprocess .failed").hide();
            });
            if(myself==true){
                $("#subscriptDialog").modal('toggle');
            }
        }
    });


    $("#subscriptDialog .body .subbtns .cancel").click(function() {
        $('#subscriptDialog').modal('toggle');
    });
    $("#subscriptDialog .body .subbtns .submit").click(function() {
        // 没有提交的数据：甲方、乙方、合同订购日期
//					var usera = $.cookie("tname");
//					var userb = create_user;
//					var date = $("#subscriptDialog .body .subdate .dvalue").text();
        var header = login=="true" ? {Authorization:"Token "+$.cookie("token")}:"";

        //process

        
        $("#subscriptDialog .modal-header").show();
        $("#myModalLabel").text("签约中");
        $("#subscriptDialog .modal-header .close").hide();



        $("#subscriptDialog .subcontent").hide();
        $("#subscriptDialog .subprocess").show();
        $("#subscriptDialog .modal-dialog").css({width:"380px"});
        $("#p-modal").css({top:(newsubsubprocessheight-60)+"px"});
        var i = 59;
        timer = setInterval(function() {
            $("#subscriptDialog .subprocess .midle").text(i+"S");
            i--;
            if(i == 0){
                clearInterval(timer);
                $("#subscriptDialog .modal-header").show();
                $("#subscriptDialog .subprocess").hide();
                $("#subscriptDialog .subafterprocess .failed").show();
            }
        },1000);
        //订购合同
        var data = {"price":{}};
        var charge = $("#subscriptDialog .body .sub3 .charge-body .chargeitem input:radio:checked").closest(".chargeitem");
        var planid = charge.find(".moneyu").attr("mark").toString();

//        Array.prototype.max = function(){   //最大值
//            return Math.max.apply({},this)
//        }
        var sel_price1= $("input:radio[charge_hurry=charge_hurry]:checked").parent().siblings().find(".moneyv").text();
        sel_price1=sel_price1.substring(0,sel_price1.length-1);
        $.ajax({
            url: "/api" + "/bill/" + $.cookie("tname") + "/info",
            type: "GET",
            cache: false,
            async: false,
            dataType: 'json',
            headers: headerToken,
            success: function (json) {
                //console.log(price_array.max());价格的最大值
                var actualBalance=json.data.actualBalance;
                var availableBalance=json.data.availableBalance;
                if(availableBalance>=(sel_price1)){
                    //订购
                    $.ajax({
                        url: "/api"+"/subscription/"+reponame+"/"+itemname,
                        type: "PUT",
                        cache:false,
                        //	data:JSON.stringify(data),
                        data:JSON.stringify({"subscriptionid":subscriptionid,"planid":planid}),
                        async:false,
                        dataType:'json',
                        headers:header,
                        success:function(json){
                        	
                            if(json.code == 0){
                                setTimeout(function() {
                                    clearInterval(timer);
                                    $("#subscriptDialog .modal-header").show();
                                    $("#subscriptDialog .subprocess").hide();
                                    $("#myModalLabel").text("签约结果");        
                                    $("#p-modal").css({top:(successedheight-60)+"px"});
                                    $("#subscriptDialog .subafterprocess .successed").show();
                                    $("#subscriptDialog .modal-header .close").show();
                                    $("#subscriptDialog .subafterprocess .failed").hide();
                                    var stars = parseInt($("#dataitem-head-right .subscript .value").text());
                                    $("#dataitem-head-right .subscript .value").text(stars+1);
                                    //modalCen('p-modal');
                                }, 1000)
                            }else if(json.code==5024){
                                $("#subscriptDialog .modal-header").show();
                                $("#subscriptDialog .subprocess").hide();
                                $("#subscriptDialog .subafterprocess .successed").hide();
                                $("#subscriptDialog .subafterprocess .failed").show();
                                $("#myModalLabel").text("签约结果");
                                $("#subscriptDialog .modal-header .close").show();
                            }else{
                                clearInterval(timer);
                                $("#myModalLabel").text("签约结果");
                                $("#subscriptDialog .modal-header .close").show();
                                $("#subscriptDialog .modal-header").show();
                                $("#subscriptDialog .subprocess").hide();
                                $("#subscriptDialog .subafterprocess .successed").hide();
                                $("#subscriptDialog .subafterprocess .failed").show();
                                //modalCen('p-modal');
                            }
                        }
                    });
                }
                else{
                    $("#myModalLabel").text("签约结果");
                    $("#subscriptDialog .modal-header .close").show();
                    $("#subscriptDialog .modal-header").show();
                    $("#subscriptDialog .subprocess").hide();
                    $("#subscriptDialog .subafterprocess .successed").hide();
                    $("#subscriptDialog .subafterprocess .failed").show();
                }
            }
        });
       // modalCen('p-modal');
    });
}

//申请订购
function apply_buy(){
    var limitBooApply=true;
    $("#apply_buy").click(function(e){
        var price_plan=$("#price_plan").text();
        $.ajax({
            url: "/api"+"/repositories/"+reponame+"/"+itemname,
            type: "get",
            cache:false,
            async:false,
            headers:headerToken,
            dataType:'json',
            success:function(json){
                if(json.code == 0){
                    var  prices= json.data.price;
                    if(prices!=null||prices!=""){
                        var sel_options=$("#LT-right .form-control").find("option:selected").val();
                        var limitNum=prices[sel_options].limit;//限制订购的次数
                        var planId=prices[sel_options].plan_id;
                        if(limitNum==null||limitNum==""||limitNum==undefined){
                            limitNum=0;
                        }
                        if(limitNum!=null||limitNum!=""||limitNum!=undefined){
                            $.ajax({
                                url: "/api"+"/subscription_stat/"+reponame+"/"+itemname+"/"+planId,
                                type: "get",
                                cache:false,
                                async:false,
                                headers:{Authorization:"Token "+$.cookie("token")},
                                dataType:'json',
                                success:function(json){
                                    if(json.code==0){
                                        var numsigns=json.data.numsigns;//订购次数
                                        if(limitNum>0&&numsigns>=limitNum){
                                            //alert("您的有限免费额度已经用完，请选择其他计费包。");
                                            $("#limit_buy_alert").show().fadeOut(5000);
                                            limitBooApply=false
                                        }
                                        else{
                                            limitBooApply=true;
                                        }
                                    }
                                },
                                error:function(json){
                                    if ($.parseJSON(json.responseText).code == 5040) {
                                        //alert("您的有限免费额度已经用完，请选择其他计费包。");
                                        $("#limit_buy_alert").show().fadeOut(2500);
                                    }

                                }
                            });
                        }
                    }
                }
            }
        });
        if(limitBooApply){
            var create_user;
            var subscripted;
            var supplyStyle;
            var prices;
            var subType=true;
            //替换  服务内容
            $(".sub1 .sbody").replaceWith("<div class='sbody'>甲方向乙方申请订购“<span class='repnamePm'></span>/<span class='itemnamePm'></span>”的数据服务。" +
                "<br>乙方保证所提供数据的内容与“<span class='repnamePm'></span>”描述，“<span class='itemnamePm'></span>”描述、样例数据、元数据申明的一致，并保障数据质量。</div>");
            //替换  双方权利与义务
            $(".sub2 .sbody").remove();
            var $sbody=$("<div></div>").addClass("sbody").appendTo(".sub2");
            $sbody.append($("<div></div>").text("1、甲方提出申请后，乙方7天内有权选择同意或者拒绝。如甲方的申请7天未得到处理，则该申请失效。"));
            $sbody.append($("<div></div>").text(" 2、若乙方同意为甲方提供数据服务，且冻结本次订购的金额后，订购合同正式生效。订购合同生效后双方权利与义务约束如下：")
                .append($("<div></div>").text("a   若由于乙方原因导致用户订购的数据内容无法完整获取，则乙方全额退回本次订购的全部款项。"))
                .append($("<div></div>").text("b 若乙方提供的数据与申明不符，甲方可向DataHub平台申诉。若经过平台方介入鉴定，并与双方协商认为乙方提供的数据与申明不符，则本次订购无效。若经过平台方介入鉴定，并与双方协商认为乙方提供的数据与申明相符，则本次订购有效。"))
                .append($("<div></div>").html("c  乙方向甲方拥有发布于DataHub平台的<span class='repnamePm'></span>/<span class='itemnamePm'></span>的数据版权。"))
                .append($("<div></div>").html("d  甲方拥有<span class='repnamePm'></span>/<span class='itemnamePm'></span>的使用权，不得对获取的数据进行转售。")));
            $sbody.append($("<div></div>").text("3、若乙方同意为甲方提供数据服务，但甲方的可用余额不足，则本次申请无法生效。"));

            $(".repnamePm").text(reponame);
            $(".itemnamePm").text(itemname);
            $("#myModalLabel").text("申请数据订购合同");
            $("#subscriptDialog .modal-header .close").show();
            //登陆后
            $.ajax({
                url: "/api"+"/repositories/"+reponame+"/"+itemname,
                type: "get",
                cache:false,
                data:{},
                async:false,
                headers:headerToken,
                dataType:'json',
                success:function(json){
                    if(json.code == 0){
                        subscripted = json.data.itemaccesstype;
                        create_user = json.data.create_user;
                        prices = json.data.price;
                        supplyStyle = json.data.label.supply_style;
                    }
                },
                error:function(json){
                    if ($.parseJSON(json.responseText).code == 5008||$.parseJSON(json.responseText).code == 5007) {
                        $("#myself_alert").show().fadeOut(2500);
                    }
                }
            });
            //获取subscriptionid+time
            var myself=true;
            $.ajax({
                url: "/api"+"/subscription/"+reponame+"/"+itemname+"/apply",
                type: "post",
                cache:false,
                data:{},
                async:false,
                headers:headerToken,
                dataType:'json',
                success:function(json){
                    if(json.code == 0){
                        subscriptionid=json.data.subscriptionid;
                        subcreateTimes=json.data.applytime.substring(0,10);
                        $(".dvalue").text(subcreateTimes);

                    }
                },
                error:function(json){
                    if ($.parseJSON(json.responseText).code == 5008||$.parseJSON(json.responseText).code == 5007) {
                        $("#myself_alert").show().fadeOut(2500);
                        myself=false;
                    }
                }
            });

            //------------------------订购合同------------------------
            //设置甲方乙方
            window.usera = $.cookie("tname");//获取当前用户，甲方
            window.userb = create_user;//获取item用户，乙方
            $.ajax({
                url: "/api"+"/users/"+usera,
                type: "get",
                cache:false,
                data:{},
                async:false,
                dataType:'json',
                headers:headerToken,
                success:function(json){
                    if(json.code == 0){
                        usera = json.data.userName;
                    }
                }
            });
            $.ajax({
                url: "/api"+"/users/"+userb,
                type: "get",
                cache:false,
                data:{},
                async:false,
                dataType:'json',
                headers:headerToken,
                success:function(json){
                    if(json.code == 0){
                        userb = json.data.userName;
                    }
                }
            });
            $("#subscriptDialog .body .sub0 .requirera .itext").val(usera);
            $("#subscriptDialog .body .sub0 .requirerb .itext").val(userb);
            //创建价格列表
            var chargeBody = $("#subscriptDialog .body .sub3 .sbody .charge-body");
            chargeBody.html("");
            $.ajax({
                url: "/api"+"/repositories/"+reponame+"/"+itemname,
                type: "GET",
                cache:false,
                async:false,
                dataType:'json',
                headers:headerToken,
                success:function(json) {
                    var pricestate = json.data.pricestate;//获取付费状态
                    var price = json.data.price;//计费方式
                    var supply_style=json.data.label.sys.supply_style;
                    if(price==undefined||price==null){
                        $("#cancel_buy").hide();
                        $("#hurry_buy").hide();
                        $("#apply_buy").hide();
                        $("#price_plan").hide();
                        $("#upcoming_release").show();
                    }else {
                        var price_length = price.length;
                        for (var i = 0; i < price_length; i++) {
                            var expire = price[i].expire;//有效期
                            var money = price[i].money;//money
                            var units = price[i].units;//次数
                            if(supply_style=="flow"){
                                var charegeitem = $("<div></div>").addClass("chargeitem").appendTo(chargeBody);
                                charegeitem.append($("<span class='cbtn'></span>").append($("<input name='subcharge' charge_hurry='charge_hurry' type='radio' value="+i+" checked='checkted'>")));
                                charegeitem.append($("<span class='cvalue'></span>").
                                append($("<span class='moneyu' mark=" + price[i].plan_id + "></span>").text("¥ ")).
                                append($("<span class='moneyv'></span>").text(money+"元")).
                                append($("<span class='moneyl'>&nbsp;/&nbsp;</span>")).
                                append($("<span class='moneyu2'></span>").text(units+"天")).
                                append($("<span class='moneyl'>&nbsp;&nbsp;&nbsp;&nbsp;</span>")).
                                append($("<span class='vexpire'></span>").text("有效期"+expire+"天")));
                            }else{
                                var charegeitem = $("<div></div>").addClass("chargeitem").appendTo(chargeBody);
                                charegeitem.append($("<span class='cbtn'></span>").append($("<input name='subcharge' charge_hurry='charge_hurry' type='radio' value="+i+" checked='checkted'>")));
                                charegeitem.append($("<span class='cvalue'></span>").
                                append($("<span class='moneyu' mark=" + price[i].plan_id + "></span>").text("¥ ")).
                                append($("<span class='moneyv'></span>").text(money+"元")).
                                append($("<span class='moneyl'>&nbsp;/&nbsp;</span>")).
                                append($("<span class='moneyu2'></span>").text(units+"次")).
                                append($("<span class='moneyl'>&nbsp;&nbsp;&nbsp;&nbsp;</span>")).
                                append($("<span class='vexpire'></span>").text("有效期"+expire+"天")));
                            }
                        }
                    }
                }
            });
            $("#subscriptDialog .body .subbtns .submit").val('申请签约');

            //设置radio默认状态
            var sel_options=$("#LT-right .form-control").find("option:selected").val();
            $(".charge-body div:eq("+sel_options+") .cbtn input").prop("checked","checked");
            $(".charge-body div:eq("+sel_options+")").siblings().hide();

            // 设置订购合同日期，目前写死
            var timer;
            $('#subscriptDialog').on("hidden.bs.modal",function() {//从新初始化
                $("#subscriptDialog .subprocess .midle").text("60S");
                $("#subscriptDialog .modal-dialog").css({width:"758px"});
                $("#subscriptDialog .modal-header").show();
                $("#subscriptDialog .subcontent").show();
                $("#subscriptDialog .subprocess").hide();
                $("#subscriptDialog .subafterprocess .successed").hide();
                $("#subscriptDialog .subafterprocess .failed").hide();
            });
            if(myself==true){
                $("#subscriptDialog").modal('toggle');
            }

        }
    });


    $("#subscriptDialog .body .subbtns .cancel").click(function() {
        $('#subscriptDialog').modal('toggle');
    });
    $("#subscriptDialog .body .subbtns .submit").click(function() {
        // 没有提交的数据：甲方、乙方、合同订购日期
        var header = login=="true" ? {Authorization:"Token "+$.cookie("token")}:"";
        var sel_price1= $("input:radio[charge=charge]:checked").parent().siblings().find(".moneyv").text();
        sel_price1=sel_price1.substring(0,sel_price1.length-1);
        //process
        $("#subscriptDialog .modal-header").show();
        $("#myModalLabel").text("申请签约中");
        $("#subscriptDialog .modal-header .close").hide();
        $("#subscriptDialog .subcontent").hide();
        $("#subscriptDialog .subprocess").show();
        $("#subscriptDialog .modal-dialog").css({width:"380px"});
        var i = 59;
        $("#p-modal").css({top:(newsubsubprocessheight-60)+"px"});
        timer = setInterval(function() {
            $("#subscriptDialog .subprocess .midle").text(i+"S");
            i--;
            if(i == 0){
                clearInterval(timer);
                $("#subscriptDialog .modal-header").show();
                $("#subscriptDialog .subprocess").hide();
                $("#subscriptDialog .subafterprocess .failed").show();
            }
        },1000);
        //订购合同
        var data = {"price":{}};
        var charge = $("#subscriptDialog .body .sub3 .charge-body .chargeitem input:radio:checked").closest(".chargeitem");
        var planid = charge.find(".moneyu:first").attr("mark").toString();
        //申请订购
        var header = login=="true" ? {Authorization:"Token "+$.cookie("token")}:"";
        var price_array;
        $.ajax({
            url: "/api"+"/subscription/"+reponame+"/"+itemname+"/apply",
            type: "PUT",
            cache:false,
            //	data:JSON.stringify(data),
            data:JSON.stringify({"subscriptionid":subscriptionid,"planid":planid,"action":"apply"}),
            async:false,
            dataType:'json',
            headers:headerToken,
            success:function(json){
             /*   $("#myModalLabel").text("申请签约结果");
                $("#subscriptDialog .modal-header .close").show();*/
                if(json.code == 0){
                    setTimeout(function() {
                        clearInterval(timer);
                        $("#p-modal").css({top:(newsuccessedApplyheight-60)+"px"});
                        $("#myModalLabel").text("申请签约结果");
                        $("#subscriptDialog .modal-header .close").show();
                        $("#subscriptDialog .modal-header").show();
                        $("#subscriptDialog .subprocess").hide();
                        $("#subscriptDialog .subafterprocess .successed_apply").show();
                        $("#subscriptDialog .subafterprocess .failed").hide();
                        var stars = parseInt($("#dataitem-head-right .subscript .value").text());
                        $("#dataitem-head-right .subscript .value").text(stars+1);
                        $("#apply_buy").hide();
                        $("#hurry_buy").hide();
                        $("#cancel_buy").show();
                        $('#subscriptDialog').on('hide.bs.modal', function () {
                            location.reload();
                        });
                    }, 1000)
                }else {
                    clearInterval(timer);
                    $("#myModalLabel").text("申请签约结果");
                    $("#subscriptDialog .modal-header .close").show();
                    $("#subscriptDialog .modal-header").show();
                    $("#subscriptDialog .subprocess").hide();
                    $("#subscriptDialog .subafterprocess .successed").hide();
                    $("#subscriptDialog .subafterprocess .failed2").show();
                    location.reload();
                }
            },
            error:function(){
                clearInterval(timer);
                //if ($.parseJSON(json.responseText).code == 5026) {
                $("#myModalLabel").text("申请签约结果");
                $("#subscriptDialog .modal-header .close").show();
                $("#subscriptDialog .modal-header").show();
                $("#subscriptDialog .subprocess").hide();
                $("#subscriptDialog .subafterprocess .successed").hide();
                $("#subscriptDialog .subafterprocess .failed2").show();
                $('#subscriptDialog').on('hide.bs.modal', function () {
                    location.reload();
                });
                //}
            }
        });
       // modalCen('p-modal');
    });
}

function cancel_buy(){
    var header = login=="true" ? {Authorization:"Token "+$.cookie("token")}:"";
    $("#cancel_buy").on("click",function(){
        $.ajax({
            url: "/api" + "/subscription/" + reponame + "/" + itemname + "/apply",
            type: "get",
            cache: false,
            async: false,
            dataType: 'json',
            headers: headerToken,
            success: function (json) {
                var subscriptionid=json.data.subscriptionid;
                $.ajax({
                    url: "/api" + "/subscription/" + reponame + "/" + itemname + "/apply",
                    type: "PUT",
                    cache: false,
                    //	data:JSON.stringify(data),
                    data: JSON.stringify({"subscriptionid": subscriptionid,"action": "withdraw"}),
                    async: false,
                    dataType: 'json',
                    headers: headerToken,
                    success: function (json) {
                        if (json.code == 0) {
                            $("#cance_alert").text("您已取消成功!");
                            $("#apply_buy").show();
                            $("#hurry_buy").hide();
                            $("#cancel_buy").hide();
                            $("#cance_alert").show();
                            location.reload();
                        }
                    },
                    error:function(json){
                        if ($.parseJSON(json.responseText).code == 5008||$.parseJSON(json.responseText).code == 5007) {
                            $("#myself_alert").show().fadeOut(2500);
                            location.reload();
                        }
                    }
                });
            }
        });
    });
}