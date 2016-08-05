/**
 * Created by Max cheng on 2016/3/4.
 */
$(function(){
   //var setJson=selects.setJson2();
    function setJson2(navName){
        var thisjson={
            'selOritem' : {'isitem':'select'},//判断接口，repositories，search，select，必填！！！
            'thisrepName' : '',//如果接口为repositories，此项必填，反之为空或随意填，
            'thisPages' : 1,//从第一页开始读取；必填！！！
            'appendObj' : '.g-selects-box',// 列表填充的盒子，
            'pagesObj' : '.sel-page',// 分页的盒子
            'pageSize' : 5,//每页显示多少条，必填!!!
            'searchOrSelect':navName// 如果接口是search，select，此项是筛查条件；
        };
        var putlist = repoListFun(thisjson);
        var allnum = putlist.selOrrepo();
        putlist.appendHtml();
        putlist.pagesFun(allnum.allitemnums);
    }
    if(selectsType=='terminal'){
        $(".u-selects-title").text("终端数据");
        setJson2('终端数据');
        window.clickindex=1;
        changebg(clickindex);
    } else if(selectsType=='baseStation'){
        $(".u-selects-title").text("基站信息");
        setJson2("基站信息");
        window.clickindex=2;
        changebg(clickindex);
    } else if(selectsType=='credit'){
        $(".u-selects-title").text("个人征信");
        setJson2("个人征信");
        window.clickindex=3;
        changebg(clickindex);
    } else if(selectsType=='space'){
        $(".u-selects-title").text("时空数据");
        setJson2("时空数据");
        window.clickindex=4;
        changebg(clickindex);
    }
    else if(selectsType=='finance'){
        $(".u-selects-title").text("金融理财");
        setJson2('金融理财');
        window.clickindex=5;
        changebg(clickindex);

    } else if(selectsType=='traffic'){
        $(".u-selects-title").text("交通运输");
        setJson2('交通运输');
        window.clickindex=6;
        changebg(clickindex);
    }else if(selectsType=='weather'){
        $(".u-selects-title").text("气象环保");
        setJson2("气象环保");
        window.clickindex=7;
        changebg(clickindex);
    }else if(selectsType=='internet'){
        $(".u-selects-title").text("互联网");
        setJson2("互联网");
        window.clickindex=8;
        changebg(clickindex);
    } else if(selectsType=='life'){
        $(".u-selects-title").text("生活服务");
        setJson2("生活服务");
        window.clickindex=9;
        changebg(clickindex);
    }else if(selectsType=='healthy'){
        $(".u-selects-title").text("医疗健康");
        setJson2("医疗健康");
        window.clickindex=10;
        changebg(clickindex);
    } else if(selectsType=='match'){
        $(".u-selects-title").text("竞赛数据");
        setJson2("竞赛数据");
        window.clickindex=11;
        changebg(clickindex);
    }
    else if(selectsType=='api'){
        $(".u-selects-title").text("API");
        setJson2("API");
        window.clickindex=12;
        changebg(clickindex);
    }else{
        $(".u-selects-title").text("全部精选");
        setJson2('');
    }


    $("body").on("click",".m-navselect ul li",function(){
        $('.g-selects-box').empty();
        navName=$(this).children().text();
        window.clickindex = $(this).index();
        changebg(clickindex);
        $(".u-selects-title").text(navName);
        if(navName=="全部精选"){
            navName="";
        }
       setJson2(navName);
    });
    $(".m-navselect ul li").on("mouseenter mouseleave",function(event){
        if(event.type=="mouseenter"){
            mouseoverindex=$(this).index();
            changebg(mouseoverindex);
        }
        if(event.type=="mouseleave"){
            mouseoutindex=window.clickindex;
            changebg(mouseoutindex);
        }
    });
});

function changebg(index){
    $(".m-navselect ul li").eq(index).addClass("g-click").siblings().removeClass("g-click");
}



