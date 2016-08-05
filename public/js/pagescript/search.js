/**
 * Created by Administrator on 2016/3/4.
 */
$(document).ready(function() {
    $("#repoactive").empty();
    if (vals == "") {
        getthisjson("");
    } else {
        vals=encodeURIComponent(vals);
        getthisjson(vals);
    }
});
function getthisjson(vals){
    var thisjson = {
        'selOritem' : {'isitem':'search'},//判断接口，repositories，search，select，dataOwner,必填！！！
        'thisrepName' : 'Internet_stats',//如果接口为repositories，此项必填，反之为空或随意填，
        'thisPages' : 1,//从第一页开始读取；必填！！！
        'appendObj' : '#repoactive',// 列表填充的盒子，
        'pagesObj' : '.pages',// 分页的盒子
        'pageSize' : 10,///每页显示多少条，必填!!!
        'searchOrSelect':vals// 如果接口是search，select，如果接口是dataOwner，此项必填（拥有方的邮箱），此项是筛查条件；
    }
    var putlist = repoListFun(thisjson);
    var allnum = putlist.selOrrepo();
    $('#searchnums').html(allnum.allitemnums);
    putlist.appendHtml();
    putlist.pagesFun(allnum.allitemnums);
}
