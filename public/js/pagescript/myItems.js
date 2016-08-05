/**
 * Created by Administrator on 2016/3/22.
 */
//得到发布者的真实姓名
$('#list_title a').html(vals);
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
function getItemArr(thisrepoame,pages){
    $('#itemList').empty();
    var itemarr = [];
    var thiscoopername = '';
    $.ajax({
        url:"/api/repositories/"+thisrepoame+"?items=update_time_down&page="+pages+"&size=10&myRelease=1",
        type: "get",
        cache:false,
        async:false,
        dataType:'json',
        headers:{Authorization: "Token " + $.cookie("token")},
        success:function(json){
            if(json.code == 0){
                $('.itemAllnums span').html(json.data.itemsize);
                if(json.data.cooperatestate == '协作中'){

                        thiscoopername = '<br/><span style="margin-top:15px;font-size: 12px;color:#666">由&nbsp;'+getrealnames(json.data.create_user)+'&nbsp;邀请协作</span>';

                }
                if($("#list_title span").length<=0){
                    $("#list_title").append(thiscoopername);
                }
                itemarr = json.data;
                return itemarr;
            }
        }
    });
    return itemarr;
}
var itemInfos = getItemArr(vals,1)
var thisItemArr = itemInfos.dataitems;
var allnums = itemInfos.itemsize;
getMyItemList('#itemList',vals,thisItemArr,1);
$(".itemPages").pagination(allnums,{
    maxentries:allnums,
    items_per_page:10,
    num_display_entries:3,
    num_edge_entries:3,
    link_to:"javascript:void(0)",
    prev_text:"上一页",
    next_text:"下一页",
    ellipse_text:"...",
    callback:getnextpage,
    load_first_page:false

});
function getnextpage(nextpage){
    nextpage  = nextpage+1;
    var thisItemInfos = getItemArr(vals,nextpage)
    var nextthisItemArr = thisItemInfos.dataitems;
    getMyItemList('#itemList',vals,nextthisItemArr,1);
}