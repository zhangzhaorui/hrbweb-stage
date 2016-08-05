/**
 * Created by Administrator on 2016/3/24.
 */
var  headerToken={Authorization: "Token " + $.cookie("token")};
//var thisreponame = 'REPOSDF';
//var thisitemname = 'ITEMSDF_RM';
var thispages = 1;
var repmissiontotals = 0;
var itemmissiontotals = 0;
var thisitemispulic = getrepocurname().repispublic;
function getpermission(pages){
    $.ajax({
        url: "/api/permission/"+thisreponame+"?page="+pages+"&size=6",
        type: "get",
        cache: false,
        async: false,
        dataType: 'json',
        headers: headerToken,
        success: function (json) {
            if (json.code == 0) {
                $('#perListBox').empty();
                additemperhtml(json.data,0,'#perListBox');
                repmissiontotals = json.data.total;
            }
        },
        error:function (XMLHttpRequest, textStatus, errorThrown)
        {
            if(XMLHttpRequest.status == 400){
            }

        }
    });

}
//// 得到item的白名单
function getitemmissions(pages){
    $.ajax({
        type: "get",
        url:"/api/permission/"+thisreponame+"/"+thisitemname+"?size=6&page="+pages,
        cache:false,
        async:false,
        headers:headerToken,
        success: function(msg){
            if (msg.code == 0) {
                if(thisitemispulic == 'public'){
                    $('#modalRep_list').empty();
                    additemperhtml(msg.data,1,'#modalRep_list');
                }else{
                    $('#cooListBox').empty();
                    additemperhtml(msg.data,1,'#cooListBox');
                }

                itemmissiontotals = msg.data.total;
               $('.baimingdan').html('白名单管理('+msg.data.total+')');
            }
        },
        error:function (XMLHttpRequest, textStatus, errorThrown)
        {
            if(XMLHttpRequest.status == 400){
                $('.baimingdan').html('白名单管理(0)');
            }
        }
    });
}

function additemperhtml(percon,isrepoper,obj){
    for(var i = 0;i<percon.permissions.length;i++){
        var ischecked = ''
        var isrepdel = '';
        if(isrepoper == 0){
            isrepdel = '';
            ischecked = '<input datareponame="'+percon.permissions[i].username+'" class="ischeck" style="margin-left:10px;" type="checkbox" >';
        }else{
            ischecked = '';
            isrepdel = '<div class="delthisper">' +
            '<a datareponame="'+percon.permissions[i].username+'" href="javaScript:void(0);" class="delper">[删除]</a>' +
            '</div>';
        }
        var str = '<div datareponame="'+percon.permissions[i].username+'" class="perList">' +
                  '<div class="perListcon">' +
                   ischecked +
                  '<span style="margin-left:15px;">'+percon.permissions[i].username+'</span>' +
                  '</div>' +isrepdel+
                  '</div>';
        $(obj).append(str);
    }
}
function chckeseacrchname(curUser,errObj,isaddcooper){
    var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var addstr = '';
    if(isaddcooper == 0){
        addstr = '不能添加自己';
    }else if(isaddcooper == 1){
        addstr = '不能搜索自己';
    }
    if(curUser == ''){
        $(errObj).html('请输入邮箱').addClass('errorMess').removeClass('successMess').stop(true).show(100).delay(1000).fadeOut(400);
        return false;
    }else if(!filter.test(curUser)){
        $(errObj).html('您输入的邮箱格式不正确').addClass('errorMess').removeClass('successMess').stop(true).show(100).delay(1000).fadeOut(400);
        return false;
    }else if(this.checkloginusers(curUser) == 1){
        $(errObj).html('您输入的邮箱不存在，请重新输入').addClass('errorMess').removeClass('successMess').stop(true).show(100).delay(1000).fadeOut(400);
        return false;
    }else if($.cookie("tname") == curUser){
        $('#mess').html(addstr).addClass('errorMess').removeClass('successMess').stop(true).show(100).delay(1000).fadeOut(400);
        return false;
    }
}

////////////////////////////验证用户已经注册/////////////////////////////////
function checkloginusers(loginusers){
    var isloginusers = 1;
    $.ajax({
        url: "/api/users/"+loginusers ,
        type: "get",
        cache: false,
        async: false,
        headers: headerToken,
        datatype: 'json',
        success:function(json){
            if(json.code == 0){
                isloginusers = 2;
            }
        },
        error:function (json)
        {
            if(json.status == 400){

            }

        }
    });
    return isloginusers;
}
function getreppagesF(){

    getpermission(1)
    $(".perpage").pagination(repmissiontotals, {
        items_per_page: 6,
        num_edge_entries:2,
        num_display_entries:3,
        prev_text:"上一页",
        next_text:"下一页",
        ellipse_text:"...",
        link_to:"javascript:void(0)",
        callback:repFens,
        load_first_page:false
    });
}
//getreppagesF();
function getitempagesF(){
    $('#modalRep_list').empty();
    $('#cooListBox').empty();
    getitemmissions(1);
    $(".coopage").pagination(itemmissiontotals, {
        items_per_page: 6,
        num_edge_entries:2,
        num_display_entries:3,
        prev_text:"上一页",
        next_text:"下一页",
        ellipse_text:"...",
        link_to:"javascript:void(0)",
        callback:itemFens,
        load_first_page:false
    });
}
//getitempagesF();
if(thisitemispulic == 'public'){
    getitempagesF();
}else{
    getitempagesF();
    getreppagesF();
}
function repFens(new_page_index){
    getpermission(new_page_index+1);
}
function itemFens(new_page_index){
    getitemmissions(new_page_index+1);
}
$('#searchpomisionemailTest').click(function(){

    searchFun('#privatepomision','#messcooperatorprivate','#perListBox','.gobackbtnwropcoo',".perpage",1);
})
$('.gobackcooperator').click(function(){
    getreppagesF();
    $(this).hide();
})

function searchFun(inputobj,messobj,perboxobj,gobackobj,pagesobj,isrep){
    var thisusername = $(inputobj).val();
    var isdelstr = '';
    var isitempomission = '';
    if(isrep == 0){
        isitempomission = '/'+thisitemname;
    }
    if(chckeseacrchname(thisusername,messobj,1) == false){
        return;
    }else {
        $.ajax({
            type:"GET",
            url: '/api/permission/'+thisreponame +isitempomission+'?username='+thisusername,
            cache: false,
            headers:headerToken,
            success: function (datas) {
                if(datas.code == 0){
                    if(datas.data.permissions.length > 0){
                        if(isrep == 0){
                            isdelstr = '</div><div class="delthisper">' +
                                '<a class="delper" href="javaScript:void(0);" datareponame="'+datas.data.permissions[0].username+'">[删除]</a>' +
                                '</div>' ;
                        }
                        var lis = '<div class="perList" datareponame="'+datas.data.permissions[0].username+'">' +
                            '<div class="perListcon">' +
                            '<span style="margin-left:15px;">'+datas.data.permissions[0].username+'</span>' +

                            '</div>'
                        $(perboxobj).empty().append(lis);
                        $(gobackobj).show();
                        $(pagesobj).pagination(0, {
                            items_per_page: 6,
                            num_edge_entries:2,
                            num_display_entries:3,
                            prev_text:"上一页",
                            next_text:"下一页",
                            ellipse_text:"...",
                            link_to:"javascript:void(0)",
                            callback:repFens,
                            load_first_page:false
                        });
                    }
                }
            },
            error:function (XMLHttpRequest, textStatus, errorThrown)
            {
                if(XMLHttpRequest.status == 400){
                    $(messobj).html('该用户不在白名单').addClass('errorMess').removeClass('successMess').stop(true).show(100).delay(1000).fadeOut(400);
                }

            }
        });
    }
}
$('#searchcooper').click(function(){
    searchFun('#privatecooper','#messcooper','#cooListBox','.privategobackbtnwrop',".coopage",0);
})
$('.gobackprivatecooperList').click(function(){
    getitempagesF();
    $(this).hide();
})

//////////////////////////批量添加白名单/////////////////////////////////////////////////
$('#addpricoo').click(function(){
    var thisrepoName =  thisreponame;
    var thisusername = [];
    var lilist = $('#perListBox>div');
    for(var i = 0;i<lilist.length;i++){
        var namejson = {}
        if($('#perListBox > div').eq(i).find('.ischeck').is(':checked')==true){
            var thisval = $(lilist[i]).attr("datareponame");
            namejson['username'] = thisval;
            namejson['opt_permission'] = 1;
            thisusername.push(namejson);
        }
    }
    if(thisusername.length>0){
        var count=0;
        for(var j = 0; j<thisusername.length;j++){
            count++;
            $.ajax({
                type:"put",
                url:"/api/permission/"+thisrepoName+'/'+thisitemname,
                cache:false,
                dataType:'json',
                data:JSON.stringify(thisusername[j]),
                headers:headerToken,
                success: function(deluser){
                    if(deluser.code == 0){
                        getitempagesF();

                    }
                }
            })
        };
    }
})
////////////////////////////////////////////////////////////单个删除白名单
$(document).on('click','.delper',function(){
    var thisusername = $(this).attr('datareponame');
    $('.yesdelper').attr('datadeluser',thisusername);
    $('.isdelperBox').show();
    //var _this = $(this);
    //$.ajax({
    //    type:"DELETE",
    //    url:"/api/permission/"+thisreponame+"/"+thisitemname+"?username="+thisusername,
    //    cache:false,
    //    headers:headerToken,
    //    success: function(deluser){
    //        if(deluser.code == 0){
    //            //_this.parents('.perList').remove();
    //            $('.gobackprivatecooperList').hide();
    //            $('#messcooper').html('删除成功').addClass('successMess').removeClass('errorMess').stop(true).show(100).delay(1000).fadeOut(400);
    //            getitempagesF();
    //        }
    //    }
    //});

})
$(document).on('click','.nodelper,.closedelper',function(){
    $('.isdelperBox').hide();
});
$(document).on('click','.yesdelper',function(){
    var datadeluser = $(this).attr('datadeluser');
    $.ajax({
        type:"DELETE",
        url:"/api/permission/"+thisreponame+"/"+thisitemname+"?username="+datadeluser,
        cache:false,
        headers:headerToken,
        success: function(deluser){
            if(deluser.code == 0){
                //
                $('.isdelperBox').hide();
                $('.gobackprivatecooperList').hide();
                $('#messcooper').html('删除成功').addClass('successMess').removeClass('errorMess').stop(true).show(100).delay(1000).fadeOut(400);
                getitempagesF();
            }
        }
    });
})
////单个添加白名单
$('#inList').click(function(){
    var thisusername = $('#emailTest').val();
    if(chckeseacrchname(thisusername,'#mess',0) == false){
        return;
    }else{
        $.ajax({
            type:"put",
            url:"/api/permission/"+thisreponame+'/'+thisitemname,
            cache:false,
            dataType:'json',
            data:JSON.stringify({"username":thisusername}),
            headers:headerToken,
            success: function(deluser){
                if(deluser.code == 0){
                    $('#mess').html('添加成功').addClass('successMess').removeClass('errorMess').stop(true).show(100).delay(1000).fadeOut(400);
                    getitempagesF();
                }
            }
        })
    }
})
/////搜索共有rep的item的白名单
$('#seList').click(function(){
    searchFun('#emailTest','#mess','#modalRep_list','.gobackWrop',".coopage",0);
})
$('.back_btn').click(function(){
    getitempagesF();
    $('.gobackWrop').hide();
})