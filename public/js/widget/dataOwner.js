/**
 * Created by Administrator on 2016/3/4.
 */
$(function(){
    //var b = new Base64();

    var returnlogin = repoListFun();
    var thisval  = returnlogin.getscreateName(vals).loginName;
    var thisjson = {
        'selOritem' : {'isitem':'dataOwner'},//判断接口，repositories，search，select，dataOwner,必填！！！
        'thisrepName' : '',//如果接口为repositories，此项必填，反之为空或随意填，
        'thisPages' : 1,//从第一页开始读取；必填！！！
        'appendObj' : '#repoactive',// 列表填充的盒子，
        'pagesObj' : '.pages',// 分页的盒子
        'pageSize' : 10,//每页显示多少条，必填!!!
        'searchOrSelect':thisval// 如果接口是search，select，如果接口是dataOwner，此项必填（拥有方的邮箱），此项是筛查条件；
    }

    var putlist = repoListFun(thisjson);
    var allnum = putlist.selOrrepo();
    $('#searchnums').html(allnum.itemarr.length);
    putlist.appendHtml();
    putlist.pagesFun(allnum.allitemnums);
    var userdetails = putlist.getscreateName(thisjson.searchOrSelect);
    $('.dataNamer').html(userdetails.userName);
    if(userdetails.userType == 3){
        $('#userType').attr('src','../img/0003.png');
    }else if(userdetails.userType == 4){
        $('#userType').attr('src','../img/0004.png');
    }else if(userdetails.userType == 5){
        $('#userType').attr('src','../img/0005.png');
    }else{
        $('#userType').attr('src','');
    }
    var data={
        'selItem':'dataOfDetails',//itemDetails,repDetails,dataOfDetails
/*        'reponame':'Internet_stats',//reponame参数,repo详情页，item详情页需要必填
        'itemname':'Film_and_television',//itemname参数，item详情页需要必填*/
        'username':thisval,//dataOfDetails需要必填
        'appendObj':'#contentBox',//需要被填充的盒子
   /*     'pageObj':'pageBox'//分页盒子*/
    };
    itemInfo(data);
    $('[data-toggle="tooltip"]').tooltip();
})