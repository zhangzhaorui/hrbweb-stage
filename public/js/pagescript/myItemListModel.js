/**
 * Created by Administrator on 2016/3/16.
 */
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
function getMyItemList(obj,thisrepName,thisitems,isItems){
    var repinstr = ' <div class="dtail">' +
        ' <a class="icon2wrop" href="/my/items/'+ thisrepName +'">查看更多</a>' +
        ' <span class="additembtn">添加DataItem<div class="additemwrop">' +
        '<p class="additemp1">批量数据</p>' +
        '<p class="additemp2">流式数据</p>' +       
        '<p class="additemp3"><a href=http://plat-dataex.app-test.dataos.io/dataex-plat/ldp/api?reponame='+thisrepName+'&username='+$.cookie("tname")+'&token='+$.cookie("token")+'>API数据</a></p>' +
        '</div></span>' +
        ' </div>';
    var itemstr = ' <div class="tablelist">' +
        ' <div class="dtable">' +
        ' <div class="dhead">' +
        ' <span class="col1"><b>DateItem name</b></span>' +
        ' <span class="col2"><b>更新时间</b></span>' +
        ' <span class="col3"><b>属性</b></span>' +
        ' <span class="col3"><b>数据类型</b></span>' +
        ' <span class="col4"><b>Tag数量</b></span>' +
        ' </div>' +
        ' <div class="dbody">';
    //////////////////添加item列表;
    if(thisitems){
        var itemLenth = 0;
        var itemsarr = [];
        if(isItems == 0){

            if(thisitems == ''){
                itemsarr = [];
            }else{
                itemsarr = thisitems.split(",");
            }
            itemLenth = itemsarr.length;
            if(itemLenth>5){
                itemLenth = 5;
            }
        }else{
            repinstr = '';
            itemLenth = thisitems.length;
            itemsarr = thisitems;
        }
        for (var i = 0; i < itemLenth; i++) {
            $.ajax({
                url: "/api/repositories/" + thisrepName + "/" + itemsarr[i],
                type: "get",
                cache: false,
                async: false,
                headers: {Authorization: "Token " + $.cookie("token")},
                success: function (json) {
                    if (json.code == 0) {
                        var itemtimes = getTimes(json.data.optime);
                        var ispublic = '';
                        if (json.data.itemaccesstype == 'public') {
                            ispublic = '开放';
                        } else {
                            ispublic = '私有';
                        }
                        var thisiscooperatestat = '';
                        var thisiscooperatestatname = '';
                        if (json.data.cooperatestate == 'null' || json.data.cooperatestate == null || json.data.cooperatestate == '') {
                            thisiscooperatestat = '';
                        } else {
                            thisiscooperatestat = '<strong class="xzbox">' + json.data.cooperatestate + '</strong>';
                            if(json.data.cooperatestate == '协作'){
                                $.ajax({
                                    url:"/api/users/"+json.data.create_user ,
                                    type: "get",
                                    cache: false,
                                    async: false,
                                    headers: {Authorization: "Token " + $.cookie("token")},
                                    datatype: 'json',
                                    success:function(json){
                                        if(json.code == 0){
                                            thisiscooperatestatname = '<br/><br/><b class="thisiscooperatestatname">由&nbsp;'+json.data.userName+'&nbsp;协作</b>'
                                        }
                                    }

                                });
                            }


                        }
                        var thisispricestate = ''
                        if (json.data.pricestate == 'null' || json.data.pricestate == null || json.data.pricestate == '') {
                            thisispricestate = '';
                        } else {
                            if(json.data.pricestate=='免费'){
                                thisispricestate = '<strong class="freetype" >' + json.data.pricestate + '</strong>'
                            }else if(json.data.pricestate=='付费'){
                                thisispricestate = '<strong class="chargetype">' + json.data.pricestate + '</strong>'
                            }else if(json.data.pricestate=='限量试用'){
                                thisispricestate = '<strong class="limitedfreetype">' + json.data.pricestate + '</strong>'
                            }

                        }
                        itemstr += ' <div class="row">' +
                            ' <span class="col1"><a target="_blank" href="/my/itemDetails/'+thisrepName+'/'+itemsarr[i]+'">' + itemsarr[i] + '</a>' + thisiscooperatestat + thisispricestate +thisiscooperatestatname+'</span>' +
                            ' <span class="col2" title="">' + itemtimes.showTime + '</span>' +
                            ' <span class="col3">' + ispublic + '</span>' +
                            ' <span class="col3">' + judgeLabel(json.data.label.sys.supply_style).labelV + '</span>' +
                            ' <span class="col4">' + json.data.tags + '</span>' +
                            ' </div>';
                    }
                },
                error: function (json) {
                    $('#errorDM').modal('show');
                }
            });
        }
    }
    itemstr += ' </div>' +
        repinstr
        ' </div>' +
        ' </div>';
    if(isItems == '0'){
        $(obj).after(itemstr).hide().slideDown(600);
    }else{
        $(obj).append(itemstr);
    }

}