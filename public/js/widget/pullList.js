/**
 * Created by Administrator on 2016/3/3.
 */
$(function(){
    var thisjson = {
        'selOritem' : {'isitem':'repositories'},//判断接口，repositories，search，select，dataOwner,必填！！！
        'thisrepName' : thisReponame,//如果接口为repositories，此项必填，反之为空或随意填，
        'thisPages' : 1,//从第一页开始读取；必填！！！
        'appendObj' : '#repoactive',// 列表填充的盒子，
        'pagesObj' : '.pages',// 分页的盒子
        'pageSize' : 5,///每页显示多少条，必填!!!
        'searchOrSelect':'',// 如果接口是search，select，如果接口是dataOwner，此项必填（拥有方的邮箱），此项是筛查条件；
    }
    var putlist = repoListFun(thisjson);
    var allnum = putlist.selOrrepo();
    putlist.appendHtml();
    putlist.pagesFun(allnum.allitemnums);
    $('.repname').html(thisReponame)
    $('.starnum').html(putlist.getRepostarNum(thisReponame));
    $('.repdnum').html(putlist.getReposubNum(thisReponame));
    $('.numpulls').html(putlist.getRepopullNum(thisReponame));
    // repo的评论量。
    var allconmentnum = 0;
    var allitemarr = putlist.getRepoComment(thisReponame).data.dataitems;
    for(var i = 0; i<allitemarr.length;i++){
        allconmentnum += putlist.getItemcommentNum(thisReponame,allitemarr[i]);
    }
    $('.numcomments').html(allconmentnum);

    //右侧模块
    var data={
        'selItem':'repDetails',//itemDetails,repDetails,dataOfDetails
        'reponame':thisReponame,//reponame参数,repo详情页，item详情页需要必填
         //'itemname':'Film_and_television',//itemname参数，item详情页需要必填*/
        //'username':thisval,//dataOfDetails需要必填
        'appendObj':'#contentBox',//需要被填充的盒子
        /*     'pageObj':'pageBox'//分页盒子*/
    };
    itemInfo(data);
    $('[data-toggle="tooltip"]').tooltip();

})
