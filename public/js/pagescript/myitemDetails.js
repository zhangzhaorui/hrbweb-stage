/**
 * Created by Administrator on 2016/3/24.
 */
var appendItemAlertBox = appendItemAlertBox();
appendItemAlertBox.appendcoopristr('body');
appendItemAlertBox.addpubpermissionBox('body');
appendItemAlertBox.addeditItemstr('body');
appendItemAlertBox.addeditPricetr('body');
//var thisreponame = 'REPOSDF';
//var thisitemname = 'ITEMSDF_RM';
$(function(){
    $('[data-toggle="tooltip"]').tooltip();
})
var thisitemispublic;
var thisflog = true;
// 得到repo的白名单
/////////////////table栏切换
$('.itembtNav li').click(function(){
    var thisindex = $(this).index();
    $(this).addClass('borderBt').siblings().removeClass('borderBt');
    $('.itembottomcon li').eq(thisindex).show().siblings().hide();
})
/////////评论
var headerToken={};
if($.cookie("token")!=null&&$.cookie("token")!="null"){
    headerToken = {Authorization: "Token " + $.cookie("token")};
}
var replyJson = {
     headerToken : {Authorization: "Token " + $.cookie("token")},
     loginitemname : $.cookie("tname"), // 登录名
     repoName : thisreponame,
     itemName : thisitemname,
     ismypublish : false, // 是否是我的发布
     thispages : 6 // 是否是我的发布
}
var replyToAll = replyToAll(replyJson);
replyToAll.thisInit();
$('.renameitem').html(thisreponame);
//$('.renameitem').attr("href","myPublish.html?repname="+thisreponame);
$('.renameitem').attr("href","javaScript:void(0);");
$('.itemnameitem').html("&nbsp;/&nbsp;"+thisitemname);
////////////判断数据类型//////////////////
function judgeLabel (labels){
    var labeldata = {
        'label' : labels,
        'vvclass' : '',
        'labelV' : ''
    };
    if (labeldata.label == "api") {
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
//返回该DataItem的订阅量
getAjax("/api/subscription_stat/"+thisitemname,function(msg){
    $('.myitemdy').html(msg.data.numsubs);
});
//返回该DataItem的pull量
getAjax("/api/transaction_stat/"+thisreponame+"/"+thisitemname,function(msg){
    $('.myitempull').html(msg.data.numpulls);
});
// 返回item的star量
getAjax("/api/star_stat/"+thisreponame+"/"+thisitemname,function(msg){
    $('.myitemstar').html(msg.data.numstars);
});
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
//获取该rep详情
function getrepocurname(){
    var repocon = {};
    $.ajax({
        type: "get",
        url:"/api/repositories/"+thisreponame,
        cache:false,
        async:false,
        headers:headerToken,
        success: function(json){
            repocon.thisrepocurname = getrealnames(json.data.create_user);
            repocon.repispublic = json.data.repaccesstype;
            return repocon;
        }
    });
    return repocon;
}
//得到发布者的真实姓名
function getrealnames(create_userrealname){
    var thsirealname = ''
    $.ajax({
        url:"/api/users/"+create_userrealname ,
        type: "get",
        cache: false,
        async: false,
        datatype: 'json',
        success:function(datas){
            if(datas.code == 0){
                thsirealname = datas.data.userName;
                return thsirealname;
            }
        }
    });
    return thsirealname;
}
// 得到tag的下载量
function gettagpullnum(tagname){
    var tagpullnum ;
    if(headerToken){
        $.ajax({
            type: "get",
            url:"/api/transaction_stat/"+thisreponame+"/"+thisitemname+"/"+tagname,
            cache:false,
            async:false,
            headers:headerToken,
            success: function(msg){
                tagpullnum = msg.data.nummypulls;

            }
        });
    }else{
        alert('请先登录');
    }
    return tagpullnum;
}
// 页面首次加载，加载item属性即，tag
var paegetags = 0;
var thisitemispublic = '';
function tagbox(pages){
    $(".filletspan .personaltag").remove();
    var ispagetags = 0;
    $('.tagListcomment').empty();
    $.ajax({
        type: "get",
        async: false,
        headers:headerToken,
        url:"/api/repositories/"+thisreponame+"/"+thisitemname+"?size=10&page="+pages,
        success: function(msg) {
            $('.baimingdan').attr('ispublic',getrepocurname().repispublic);
            //添加状态开始
            var thisispricestatenew="";
            var thisiscooperatestatname = '';
            ////////////是否协作
            var thisiscooperatestat = ''
            if(msg.data.cooperatestate == 'null' || msg.data.cooperatestate == null || msg.data.cooperatestate == ''){
                thisiscooperatestat = '';
            }else{
                thisiscooperatestat = '<span class="pricetype freetype reptoppr">'+msg.data.cooperatestate+'</span>';
                if(msg.data.cooperatestate == '协作'){
                    thisiscooperatestatname = getrealnames(msg.data.create_user);
                    $('.thisiscooperatestatname').html('由&nbsp;'+thisiscooperatestatname+'&nbsp;协作');
                    $('.itemListName-icon').hide();
                    $('.itembtNav li').eq(2).hide();
                    $('.itembottomcon > li').eq(2).hide();
                    $('.chekcprice').attr('dataiscooper','1');
                    $('.chekcprice').html('价格查看');
                    thisflog = false;
                    $('.baimingdan').hide();
                }else if(msg.data.cooperatestate == '协作中'){
                    thisiscooperatestatname = getrepocurname().thisrepocurname;
                    $('.thisiscooperatestatname').html('由&nbsp;'+thisiscooperatestatname+'&nbsp;邀请协作');
                }
            }
            $(".itemnameitem").after(thisiscooperatestat);
            if(msg.data.pricestate=='付费'){
                thisispricestatenew = '<strong style="border-radius: 3px;display: inline;font-size: 12px;margin-left: 5px;padding: 2px 5px;color:red;border:1px solid red;position: relative;top: -3px;">' + msg.data.pricestate + '</strong>'
            }else if(msg.data.pricestate==''){
                thisispricestatenew="";
            }else{
            	var itemnameitemNext=$(".itemnameitem").next().html();
            	if(itemnameitemNext==undefined){
            		thisispricestatenew = '<strong style="border-radius: 3px;display: inline;font-size: 12px;margin-left: 5px;padding: 2px 5px;color:#f49f12;border:1px solid #f49f12;position: relative;top: -3px;">' + msg.data.pricestate + '</strong>'                  
            	}
            }
            $(".itemnameitem").after(thisispricestatenew);
            //添加状态结束
            allpricecon = msg.data.price;
            tagallnum = msg.data.tags;
            $('.alltagnums').html(tagallnum);
            taglist = msg.data.taglist;
            supply_style = msg.data.label.sys.supply_style;
            var classjson = judgeLabel(supply_style)
            $("#supply_style").attr('class', classjson.vvclass);
            $("#supply_style").html(classjson.labelV);
            if (msg.data.Meta != null) {
                meta = msg.data.Meta;
            } else {
                meta = '';
            }
            var personaltagHtml=$(".personaltag").html();
        	if(personaltagHtml==undefined){
        		if(msg.data.label){

                    var ptags = msg.data.label.owner;
                    var labelstr = '';
                    for(var j in ptags) {
                        labelstr+='<span class="personaltag">'+ptags[j]+'</span>';
                    }
                }
        	}
            
            $(".topbtcenter").append(labelstr);
            if (msg.data.Sample != null) {
                sample = msg.data.Sample;
            } else {
                sample = '';
            }
            paegetags = msg.data.tags;

            if (paegetags == 0) {
                ispagetags = "该Item下还没有发布任何Tags";
            } else {
                ispagetags = paegetags + "Tag";
            }
            var jsonTime = getTimes(msg.data.optime);
            var itemaccesstype = msg.data.itemaccesstype;
            if (itemaccesstype == 'public') {
                thisitemispublic = 'public';
                $('.baimingdan').hide();
                $('.itemaccesstype').html('公开');
            } else if (itemaccesstype == 'private') {
                thisitemispublic = 'private';
                $('.itemaccesstype').html('私有');
                if(msg.data.cooperatestate == '协作中' || msg.data.cooperatestate == ''){
                    $('.baimingdan').show();
                }

            }
            $('.itemoptime').html(jsonTime.showTime);
            $('.itemoptime').attr('data-original-title', jsonTime.jdTime);
            $('.itemComment').html(msg.data.comment)
        }

    });
    for(var i = 0;i<taglist.length;i++){
        var tagpullnum = gettagpullnum(taglist[i].tag);
        var times = getTimes(taglist[i].optime);
        var str = '<div class="tagListcon">'+
            '<div class="tagName">'+
            '<p>'+taglist[i].tag+'</p>'+
            '<p>'+taglist[i].comment+'</p>'+
            '</div>'+
            '<div class="tagtime">'+
            '<img datapalecement="top" data-toggle="tooltip" src="/img/newpic004.png" class="iconiamg1 iconiamg2" data-original-title="更新时间">'+
            '<span datapalecement="top" data-toggle="tooltip" data-original-title="'+times.jdTime+'">'+times.showTime+'</span>'+
            '</div>'+
            '<div class="tagpullNum">'+
            '<p><img datapalecement="top" data-toggle="tooltip" src="/img/newpic007.png" data-original-title="Pull量"></p>'+
            '<p>'+tagpullnum+'</p>'+
            '</div>'+
            '</div>';
        $('.tagListcomment').append(str);
    }
}
tagbox(1);
$(".pagestag").pagination(paegetags, {
    maxentries:paegetags,
    items_per_page: 10,
    num_display_entries: 3,
    num_edge_entries: 2 ,
    prev_text:"上一页",
    next_text:"下一页",
    ellipse_text:"...",
    link_to:"javascript:void(0)",
    callback:fenS,
    load_first_page:false
});
function fenS(new_page_index){
    tagbox(new_page_index+1)
}
//////////////////////元数据、样例数据/////////////////////
function metadatabox(){
    $('.metaList').empty();
    $('.metaList').empty();
    var str1 = '';
    var str2 = '';
    if(thisflog == false){
        str1 = '';
        str2 = '';
    }else{

    	str1 = '<a href="/my/mark/'+thisreponame+'/'+thisitemname+'/sample"><div class="editmeta">修改</div></a>';
    	str2 = '<a href="/my/mark/'+thisreponame+'/'+thisitemname+'/meta" ><div class="editsample">修改</div></a>';
        
//        str1 = '<a href="myMark.html?repname='+thisreponame+'&itemname='+thisitemname+'&type=sample"><div class="editmeta">修改</div></a>';
//        str2 = '<a href="myMark.html?repname='+thisreponame+'&itemname='+thisitemname+'&type=meta" ><div class="editsample">修改</div></a>';
    }
    var str =  '<div class="metatitle">样例 '+ str1 +'</div>'+
        '<div class="metabox" id="metadata">'+marked(sample)+'</div>'+
        '<div class="metatitle" style="margin-top:20px;">元数据'+ str2 +'</div>'+
        '<div class="metabox metadata-con markdown-body" id="sampledata">'+marked(meta)+'</div>';
    $('.metaList').append(str);
}
metadatabox();
//////////////pull记录
var  tagallnums = 0;
function getcurrpullnum(tagpage){
    $.ajax({
        type: "get",
        url:"/api/transactions/push/"+thisreponame+"/"+thisitemname+"?groupbydate=1&size=10&page="+tagpage,
        cache:false,
        async:false,
        headers:headerToken,
        success: function(msg){
            $('.pullListcomment').empty();
            tagallnums = msg.data.total;
            for(var i = 0 ;i<msg.data.results.length;i++){
                var html =
                    '<div class="mucon">' +
                    '<div class="mutime"><p>' + msg.data.results[i].date + '</p></div>'+
                    '<div class="Record_body">';
                for (var j = 0; j <msg.data.results[i].pulls.length; j++) {
                    html += '<table class="table tabcon">' +
                        '<tr>' +
                        '<td style="width: 33%;">' + msg.data.results[i].pulls[j].buyername + '</td>' +
                        '<td style="width: 33%;"><div>' +msg.data.results[i].pulls[j].pulltime.substr(11,8) + '</div></td>' +
                        '<td style="width: 33%;"><div class="thisoder">' + msg.data.results[i].pulls[j].tag+'</div></td>' +
                        '</tr>' +
                        '</table>';
                }
                html += '</div></div>';
                $('.pullListcomment').append(html);
            }


        }
    });
}
$(document).on('click','.mutime',function(){
    $(this).siblings('.Record_body').slideToggle(400);
})
if(thisflog == true){
    getcurrpullnum(1);
}

/////////////////////////pull记录分页
$(".tagpages").pagination(tagallnums, {
    maxentries:tagallnums,
    items_per_page: 10,
    num_display_entries: 3,
    num_edge_entries: 2 ,
    prev_text:"上一页",
    next_text:"下一页",
    ellipse_text:"...",
//          num_edge_entries:1,
    link_to:"javascript:void(0)",
    callback:tagfenS,
    load_first_page:false
});
function tagfenS(new_page_index){
    getcurrpullnum(new_page_index+1)
}
////  得到所有rep协作者
var allRepArr = [];
var allItemArr = [];
function getAllPermission(){
    $.ajax({
        url: "/api/permission/"+thisreponame+"?&size=-1",
        type: "get",
        cache: false,
        async: false,
        dataType: 'json',
        headers: headerToken,
        success: function (json) {
            if (json.code == 0) {
                for(var i = 0;i<json.data.total;i++){
                    allRepArr.push(json.data.permissions[i].username);
                }
            }
        },
        error:function (XMLHttpRequest, textStatus, errorThrown)
        {
            if(XMLHttpRequest.status == 400){
                allRepArr = [];
            }

        }
    });

}
//// 得到所有item的白名单
function getAllItemmissions(){
    $.ajax({
        type: "get",
        url:"/api/permission/"+thisreponame+"/"+thisitemname+"?size=-1",
        cache:false,
        async:false,
        headers:headerToken,
        success: function(msg){
            if (msg.code == 0) {
                for(var i = 0;i<msg.data.total;i++){
                    allItemArr.push(msg.data.permissions[i].username);
                }
            }
        },
        error:function (XMLHttpRequest, textStatus, errorThrown)
        {
            if(XMLHttpRequest.status == 400){
                allItemArr = [];
            }
        }
    });
}

/////////////白名单管理
$('.baimingdan').click(function(){
    var ispublic = $(this).attr('ispublic');
    if(ispublic == 'public'){
        getAllItemmissions();
        $( "#emailTest" ).autocomplete({
            source: allItemArr
        });
        $('#myModalPer').modal('toggle');
    }else if(ispublic == 'private'){
        getAllPermission();
        getAllItemmissions();
        $( "#privatepomision" ).autocomplete({
            source: allRepArr
        });
        $( "#privatecooper" ).autocomplete({
            source: allItemArr
        });
        $('#myModalPriCooper').modal('toggle');
    }
})
////修改item
var gotodelelables = [];
$('.itemListName-icon').click(function(){
    gotodelelables = [];
    $('#repconerror').hide();
    $('#errlabels').hide();
    $('.valuemoney').empty();
    $('.itemtag .value').empty();
    $.ajax({
        url:"/api/repositories/"+thisreponame+"/"+thisitemname,
        type: "GET",
        cache:false,
        data:{},
        async:false,
        dataType:'json',
        headers:headerToken,
        success:function(json){
            if(json.code == 0){
                var itemaccesstype = '开放';
                if(json.data.itemaccesstype == 'private'){
                    $("#ispublic").attr('data-tagle',2);
                    $("#ispublic").val(2);
                }else{
                    $("#ispublic").attr('data-tagle',1);
                    $("#ispublic").val(1);
                }
                var itemNameInput = $("#editItem .itemname .value input");
                var itemCommentTextArea = $("#editItem .itemcomment .value textarea");
                //var itemtagDiv = $("#editItem .itemtag .value");
                itemNameInput.val(thisitemname).attr("disabled", "disabled");
                itemCommentTextArea.val(json.data.comment);
                if(json.data.label != undefined && json.data.label != null && json.data.label != "null" &&
                    json.data.label.owner != undefined && json.data.label.owner != null && json.data.label.owner != "null") {
                    var lables = json.data.label.owner;
                    $("#editItem .itemtag .value").html("");
                    for(var i in lables) {
                        createItemTag(i, lables[i], false,'disabled');
                    }
                }
            }
        }
    });

    $('#editItem').modal('toggle');
    var conmentlength = $('#repconments').val().length;
    $('.itemsurplusnum').html(200-conmentlength);
})
$("#editItem .itemtag .key .btnicon").click(function() {
    createItemTag();
});

$(document).on('blur','.tagkey',function(){
    var labelkey = $(this).val();
    if(labelkey == "") {
        $('#errlabels').html('标签名不能为空').addClass('errorMess').removeClass('successMess').show();
        return;
    }else{
        $('#errlabels').html('正确').addClass('successMess').removeClass('errorMess').show();
    }
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
    if(reg.test(labelkey)){
        $('#errlabels').html('key值不能为中文').addClass('errorMess').removeClass('successMess').show();
        return
    }else{
        $('#errlabels').html('正确').addClass('successMess').removeClass('errorMess').show();
    }
})
$(document).on('blur','.tagvalue',function(){
    var tagvalue = $(this).val();
    if(tagvalue == "") {
        $('#errlabels').html('标签名不能为空').addClass('errorMess').removeClass('successMess').show();
        return;
    }else{
        $('#errlabels').html('正确').addClass('successMess').removeClass('errorMess').show();
    }
})
// 验证item介绍
function itemcommentkeyup(combj, surobj, exceedobj) {
    var commentcon = $(combj).val();
    var residue = 200 - (commentcon.length);
    var exceeding = 0;
    if (residue < 0) {
        residue = 0;
        exceeding = commentcon.length - 200;
    }
    $(surobj).html(residue);
    $(exceedobj).html(exceeding);
}
function checkconlength(){
    if($('.itemsurplusnum').html()==200){
        $('#repconerror').html('描述不能为空').addClass('errorMess').removeClass('successMess').show();
        return false;
    }else{
        $('#repconerror').html('正确').addClass('successMess').removeClass('errorMess').show();
    }
    if($('.itemexceednum').html()>0){
        $('#repconerror').html('描述内容过长，限定200中文字符').addClass('errorMess').removeClass('successMess').show();
        return false;
    }else{
        $('#repconerror').html('正确').addClass('successMess').removeClass('errorMess').show();
    }
}
$(document).on('keyup','#repconments',function(){
    itemcommentkeyup('#repconments','.itemsurplusnum','.itemexceednum')
})
$(document).on('blur','#repconments',function(){
    if(checkconlength() == false){
        return;
    }
})
/////////////////////////////////////////////////添加自定义标签
function createItemTag(tagkey, tagvalue,newlabel,isdisabled) {
    tagkey = tagkey == undefined ? "": tagkey;
    tagvalue = tagvalue == undefined ? "": tagvalue;
    var itemtag = $("#editItem .itemtag .value");
    var strinput = '';
    if(isdisabled){
        strinput = '<input type="text" class="tagkey" disabled="disabled" value="'+tagkey+'"/>';
    }else{
        strinput = '<input type="text" class="tagkey" value="'+tagkey+'"/>';
    }
    if(itemtag.children("div").length < 5) {
        var persontag = $("<div></div>").addClass("persontag").attr("newlabel",newlabel?true:false).appendTo(itemtag);
        persontag.append(strinput);
        persontag.append($("<div>=</div>").addClass("tagequal"));
        persontag.append($("<input/>").addClass("tagvalue").attr("type", "text").val(tagvalue));
        persontag.append($("<div class='delitemlabelicon'></div>").click(function() {
            var delelable = {
                owname : $(this).siblings('.tagkey').val(),
                thistagvalue : $(this).siblings('.tagvalue').val()
            }
            gotodelelables.push(delelable);
            $(this).parent().remove();
        }));
    }else{
        $('#errlabels').html('最多添加5个标签').addClass('errorMess').removeClass('successMess').stop(true).show(100).delay(1000).fadeOut(400)
    }
}
// 切换item属性
$('#ispublic').change(function(){
    if($(this).val() ==2){
        $('#messcooperatorpublic').html('订购过此DataItem的用户将自动进入您的白名单').show();
    }else{
        $('#messcooperatorpublic').html('白名单设置将失效').show();

    }
});

///////////提交修改
$("#editItem .submit input").click(function() {
    var dataitem = {};
    var itemtagDiv = $("#editItem .itemtag .value");
    var thisitemtypes = $('#ispublic').val();
    var itemaccesstypes = '';
    if(thisitemtypes == 1){
        itemaccesstypes = 'public';
    }else{
        itemaccesstypes = 'private';
    }
    var labels = itemtagDiv.children(".persontag");
    for(var i = 0;i < gotodelelables.length;i++){
        $.ajax({
            type:"DELETE",
            url: "/api/repositories/"+thisreponame+"/"+thisitemname+"/label?owner."+gotodelelables[i].owname+"="+gotodelelables[i].thistagvalue,
            cache: false,
            async: false,
            headers:headerToken,
            success: function (datas) {

            }
        });
    }
    dataitem.comment = $.trim($("#editItem .itemcomment .value textarea").val());
    dataitem.itemaccesstype = itemaccesstypes;
    if(checkconlength() == false){
        return;
    }
    var datalabel = {};
    $.ajax({
        url: "/api/repositories/"+thisreponame+"/"+thisitemname,
        type: "PUT",
        cache:false,
        async:false,
        dataType:'json',
        data:JSON.stringify(dataitem),
        headers:headerToken,
        success:function(json){
            var labelstr = '';
            if(json.code == 0){
                var priceobj = {};
                for(var i=0; i<labels.length; i++) {
                    var label = $(labels[i]);
                    var labelkey = $.trim(label.children(".tagkey:first").val());
                    var labelvalue = $.trim(label.children(".tagvalue:first").val());
                    if(labelkey == "" || labelvalue == "") {
                        $('#errlabels').html('标签名和标签值不能为空').addClass('errorMess').removeClass('successMess').show();
                        return;
                    }else{
                        $('#errlabels').html('正确').addClass('successMess').removeClass('errorMess').show();
                    }
                    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
                    if(reg.test(labelkey)){
                        $('#errlabels').html('key值不能为中文').addClass('errorMess').removeClass('successMess').show();
                        return
                    }else{
                        $('#errlabels').html('正确').addClass('successMess').removeClass('errorMess').show();
                    }
                    datalabel["owner."+labelkey] = labelvalue;
                    labelstr+='<span class="personaltag">'+labelvalue+'</span>';
                }
                $(".topbtcenter .personaltag").remove();
                $(".topbtcenter").append(labelstr);
                $.ajax({
                    url:"/api/repositories/"+thisreponame+"/"+thisitemname+"/label",
                    type: "PUT",
                    cache:false,
                    data:{},
                    async:false,
                    dataType:'json',
                    data:datalabel,
                    headers:headerToken,
                    success:function(jsondata){
                        if(jsondata.code == 0){
                            $('#editItem').modal('toggle');
                        }
                    }
                });
            }
            location.reload();
        }
    });
})
///////////////////////////////添加价格计划
function createItemTagmoney(tagtime, tagmoney,tagexpire,dataid,newlabel,ischecked,itemdatatype,limitvalue) {
    var isday = '';
    var thisthistagmoney = '';
    if(tagmoney >= 0 && tagmoney != 'null' && tagmoney != null){
        if(tagmoney.toString().indexOf('.') == -1){
            thisthistagmoney = tagmoney+'.00';
        }else{
            thisthistagmoney = tagmoney;
        }
    }
    if(itemdatatype == 'flow'){
        isday = '天';
    }else{
        isday = '次';
    }
    if(limitvalue == '' || limitvalue == null || null== 'limitvalue'){
        limitvalue = '';
    }
    var itemtagmoney = $("#editPrice .valuemoney");
    var thisstr = '<div class="ishiddenbox"><div class="tagequal">限购&nbsp;每个用户限购多少次</div><input class="limitnum" type="text" value="'+limitvalue+'"/></div>';
    if(itemtagmoney.children("div").length < 6) {
        var ishidestr = '<div class="tagequal gohide">限购&nbsp;</div>'
        var persontag = $("<div></div>").addClass("persontag").attr("newlabel",newlabel?true:false).attr('dataid',dataid).appendTo(itemtagmoney);
        persontag.append($("<input/>").addClass("tagtime").attr("type", "text").val(tagtime));
        persontag.append($("<div> "+isday +"=</div>").addClass("tagequal"));
        persontag.append($("<input/>").addClass("tagmoney").attr("type", "text").val(thisthistagmoney));
        persontag.append($("<div>元&nbsp;&nbsp;有效期</div>").addClass("tagequal"));
        persontag.append($("<input/>").addClass("tagexpire").attr("type", "text").val(tagexpire));
        persontag.append($("<div>天</div>").addClass("tagequal"));
        persontag.append($("<input type='checkbox'/>").attr("checked",ischecked).addClass("isnimitid").click(function() {
            if($(this).attr('checked') == 'checked') {
                $(this).removeAttr("checked");
                persontag.children('.ishiddenbox').remove();
                $(this).after(ishidestr)
            }else {
                $(this).attr("checked",'checked');
                persontag.children('.gohide').remove();
                $(this).after(thisstr)
            }
        }));
        persontag.append(ishidestr);
        if(persontag.children('.isnimitid').attr('checked') == "checked") {
            persontag.children('.gohide').remove();
            persontag.children('.isnimitid').after(thisstr)
        }else {
            persontag.children('.ishiddenbox').remove();
        }
        persontag.append($("<div class='delitemmoneyicon'></div>").click(function() {
            if(persontag.attr("newlabel") != "true") {
                $(this).parent().remove();
                if(checkallprice() != false){
                    $('#itemmess').html('正确').addClass('successMess').removeClass('errorMess').show();
                }
                if($('.valuemoney .persontag').length<=0 &&  $('.valuemoney .noprice').length<=0){
                    $('#itemmess').hide();
                    $('.valuemoney').html('<div class="noprice">暂时没有价格计划!</div>')
                }
            }else {
                $(this).parent().remove();
                if(checkallprice() != false){
                    $('#itemmess').html('正确').addClass('successMess').removeClass('errorMess').show();
                }
            }
        }));
    }else{
        $('#itemmess').html('最多添加6个价格属性').addClass('errorMess').removeClass('successMess').stop(true).show(100).delay(1000).fadeOut(400);
    }
}
$('.chekcprice').click(function(){
    $('.valuemoney').empty();
    $('#itemmess').hide();
    $.ajax({
        url: "/api/repositories/"+thisreponame+"/"+thisitemname,
        type: "GET",
        cache:false,
        data:{},
        async:false,
        dataType:'json',
        headers:headerToken,
        success:function(json){
            if(json.code == 0){
                var jsonobj = json.data.price;
                if(jsonobj){
                    if(jsonobj.length == 0){
                        $('.valuemoney').html('<div class="noprice">暂时没有价格计划!</div>')
                    }else{
                        for(var i = 0;i<jsonobj.length;i++){
                            var islimit = false;
                            var limitvalue = ''
                            if (jsonobj[i].limit){
                                islimit = true;
                                limitvalue = jsonobj[i].limit;
                            }
                            var itemdatatype = supply_style;
                            createItemTagmoney(jsonobj[i].units, jsonobj[i].money, jsonobj[i].expire,jsonobj[i].plan_id,false,islimit,itemdatatype,limitvalue);
                        }
                    }
                }else{
                    $('.valuemoney').html('<div class="noprice">暂时没有价格计划!</div>')

                }

            }
        }
    });
    if($(this).html() == '价格查看'){
        $('#editPrice .modal-title').html('价格查看');
        $('.delitemmoneyicon').hide();
        $('.valuemoney input').attr('disabled','disabled');
        $('#editPrice .submit').html('<div class="colsepricebox">知道了</div>');
    }
    $('#editPrice').modal('toggle');
})
$(document).on('click','.colsepricebox',function(){
    $('#editPrice').modal('toggle');
})
$(".btniconmoney").click(function() {
    createItemTagmoney();
    if($('.valuemoney .persontag').length>0 &&  $('.valuemoney .noprice').length>0){
        $('.valuemoney .noprice').remove();
    }
});



function isaddclass(funistrue,obj){
    if(funistrue == true){
        obj.removeClass('redborder')
        return true;
    }else{
        obj.addClass('redborder');
        return false;
    }
}
////次数天数验证
function checktagtime(obj,errorstr){
    var reg = new RegExp("^[0-9]*$");
    var tagtime = obj.val();
    if(reg.test(tagtime) && tagtime !=0 && tagtime != ""){
        $('#itemmess').html(errorstr.str2).addClass('successMess').removeClass('errorMess').show();
        return true;
    }else{
        $('#itemmess').html(errorstr.str1).addClass('errorMess').removeClass('successMess').show();
        return false;
    }
}
$(document).on('blur','.tagtime',function(){
    isaddclass(checktagtime($(this),{'str1':'次数/天数需为大于0的整数','str2':'正确'}),$(this));
})
//////价格验证
function checktagmoney(obj,errorstr){
    var tagmoney = obj.val();
    if(tagmoney != '' && isNaN(tagmoney) == false && tagmoney >= 0){
        var dot = tagmoney.indexOf(".");
        if(dot != -1){
            var dotCnt = tagmoney.substring(dot+1,tagmoney.length);
            if(dotCnt.length <= 2){
                $('#itemmess').html(errorstr.str2).addClass('successMess').removeClass('errorMess').show();
               return true;
            }else{
                $('#itemmess').html(errorstr.str1).addClass('errorMess').removeClass('successMess').show();
               return false;
            }
        }else{
            $('#itemmess').html(errorstr.str2).addClass('successMess').removeClass('errorMess').show();
            return true;
        }
    }else{
        $('#itemmess').html(errorstr.str1).addClass('errorMess').removeClass('successMess').show();
        return false;
    }

}
$(document).on('blur','.tagmoney',function(){
    isaddclass(checktagmoney($(this),{str1:'价格需大于等于0',str2:'正确'}),$(this));
})
//////有效期验证
function checktagexpire(obj,errorstr){
    var reg = new RegExp("^[0-9]*$");
    var tagexpire =obj.val();
    if(tagexpire != "" && reg.test(tagexpire) == true && tagexpire != 0){
        $('#itemmess').html(errorstr.str2).addClass('successMess').removeClass('errorMess').show();
        return true
    }else{
        $('#itemmess').html(errorstr.str1).addClass('errorMess').removeClass('successMess').show();
        return false;
    }

}
$(document).on('blur','.tagexpire',function() {
    isaddclass(checktagexpire($(this),{str1:'天数需为大于0的整数',str2:'正确'}),$(this));
})
//////限购次数验证
function checklimitnum(obj,errorstr){
    var reg = new RegExp("^[0-9]*$");
    var limitnum = obj.val();
    if(limitnum){
        if(limitnum > 0 && reg.test(limitnum) == true){
            $('#itemmess').html(errorstr.str2).addClass('successMess').removeClass('errorMess').show();
            return true;
        }else{
            $('#itemmess').html(errorstr.str1).addClass('errorMess').removeClass('successMess').show();
            return false;
        }
    }else{
        $('#itemmess').html(errorstr.str1).addClass('errorMess').removeClass('successMess').show();
        return false;
    }
}
$(document).on('blur','.limitnum',function() {
    isaddclass(checklimitnum($(this),{str1:'限购次数必须为大于0 的整数',str2:'正确'}),$(this));
})

function checkallprice(){
    var itemtagDivmoney = $("#editPrice .valuemoney");
    var moneydivs = itemtagDivmoney.children(".persontag");
    var dataitem = {};
    var dataarr = [];
    for(var i=0; i<moneydivs.length; i++) {
        dataarr[i] = {};
        var moneydiv = $(moneydivs[i]);
        var dataid = moneydiv.attr('dataid')
        var tagtime = moneydiv.children(".tagtime:first").val();
        var tagmoney = moneydiv.children(".tagmoney:first").val();
        var tagexpire = moneydiv.children(".tagexpire:first").val();
        var isnimitid = moneydiv.children(".isnimitid:first");
        var limitnum = moneydiv.children(".ishiddenbox").children(".limitnum:first").val();
        if( isaddclass(checktagtime(moneydiv.children(".tagtime:first"),{str1:'次数/天数需为大于0的整数',str2:'正确'}),moneydiv.children(".tagtime:first")) == false){
            return false;
        }
        if( isaddclass(checktagmoney(moneydiv.children(".tagmoney:first"),{str1:'价格需大于等于0',str2:'正确'}),moneydiv.children(".tagmoney:first")) == false){
            return false;
        }

        if( isaddclass(checktagexpire(moneydiv.children(".tagexpire:first"),{str1:'天数需为大于0的整数',str2:'正确'}),moneydiv.children(".tagexpire:first")) == false){
            return false;
        }
        if(isnimitid.is(':checked') == true){
            if( isaddclass(checklimitnum(moneydiv.children(".ishiddenbox").children(".limitnum:first"),{str1:'限购次数必须为大于0 的整数',str2:'正确'}),moneydiv.children(".ishiddenbox").children(".limitnum:first")) == false){
                return false;
            }
        }


        dataarr[i].units = parseInt(tagtime);
        dataarr[i].money = parseFloat(tagmoney);
        dataarr[i].expire = parseInt(tagexpire);
        dataarr[i].plan_id = dataid;
        dataarr[i].limit = parseInt(limitnum);
    }
    dataitem.price = dataarr ;
    return dataitem;
}
///////////价格提交修改
$("#editPrice .submit input").click(function() {
    var reg = new RegExp("^[0-9]*$");
    var dataitem = checkallprice();
    if(dataitem == false){
        return;
    }else{
        $.ajax({
            url:"/api/repositories/"+thisreponame+"/"+thisitemname,
            type: "PUT",
            cache:false,
            async:false,
            dataType:'json',
            data:JSON.stringify(dataitem),
            headers:{ Authorization:"Token "+$.cookie("token") },
            success:function(json){
                if(json.code == 0){
                    $('#editPrice').modal('toggle');
                }
            }
        });
    }

})