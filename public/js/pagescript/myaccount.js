/**
 * Created by Max cheng on 2016/3/30.
 */
//页面JavaScript:第一部分开始
var headerToken={};
if($.cookie("token")!=null&&$.cookie("token")!="null"){
    headerToken={Authorization:"Token "+$.cookie("token")};
}
var account=new Vue({
    el: '.account-top',
    data:{
        actual:100,
        avail:88
    },
    methods:{
        accountInfo:function(){
            getAjax("/api/bill/" + $.cookie("tname") + "/info",headerToken,function(json){
                account.actual=json.data.actualBalance;
                account.avail=json.data.availableBalance;
                account.creditLimit=json.data.creditLimit;
            });
        }
    }

});
account.accountInfo();
//页面JavaScript:第一部分结束


//页面JavaScript:第二部分开始
function getAccount(next_pages){
    var accountJson={};
    getAjax("/api/bill/" + $.cookie("tname") + "/detail?page="+next_pages+"&size=50",headerToken,function(json){
        accountJson['obj']=json.data;
        accountJson['next']=next_pages;
    });
    return accountJson;
}
var accountJson=getAccount(1);
new Vue({
    el: '.account-content',
    data:{
        accountObj:accountJson.obj,
        accountNext:0,
        count_num:''
    },
    watch:{
        accountNext:function(val){
            this.accountObj=getAccount(val).obj;
        }
    }
});
//页面JavaScript:第二部分结束

//公共部分开始
function getAjax(url,Token,func){
    $.ajax({
        url:url,
        type: "GET",
        cache: false,
        async: false,
        dataType: 'json',
        headers:Token,
        success:function(data){
            func(data);
        }
    })
}
//公共部分结束