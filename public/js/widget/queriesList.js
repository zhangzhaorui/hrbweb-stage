/**
 * Created by Max cheng on 2016/3/28.
 */
//账务中心组件开始
Vue.component('account',{
    props: ['actualBal','availBal'],
    template:
        '<div class="container">'+
        '<div id="myAccount">'+
        '<p class="Account_title">账务中心{{obj.msg}}</p>'+
        '<div id="accountBalance">'+
        '<div class="total_balance">'+
        '<p class="account_text">账户总余额</p>'+
        '<p class="account_num"><span id="total_balance_span" >{{actualBal}}</span><span class="yuan">元</span></p>'+
        '<button id="recharge_btn" @click="recharge_btn" role="button" class="btn btn-primary btn-lg" href="javascript:void(0)">充值</button>'+
        '</div>'+
        '<div class="window">'+
        '<p>请发送您的充值需求到</p>'+
        '<p class="p2">datahub@asiainfo.com</p>'+
        '<p>我们会在三个工作日内回复您</p>'+
        '</div>'+
        '<div class="usable_balance">'+
        '<p class="account_text">可用余额</p>'+
        '<p class="account_num"><span id="usable_balance_span" >{{availBal}}</span><span class="yuan">元</span></p>'+
        '</div>'+
        '<div class="cash_balance">'+
        '<p class="account_text">可提现余额</p>'+
        '<p class="account_num"><span id="cash_balance_span">{{availBal}}</span><span class="yuan">元</span></p>'+
        '<button id="reflect_btn" @click="reflect_btn" role="button" class="btn btn-primary btn-lg" href="javascript:void(0)">提现</button>'+
        '<a href="withdraw.html"><p class="get_cash"style="display: none">设置提现密码</p></a>'+
        '</div>'+
        '<div class="window1">'+
        '<p>请发送您的提现需求到</p>'+
        '<p class="p3">datahub@asiainfo.com</p>'+
        '<p>我们会在三个工作日内回复您</p>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>',
        methods:{
            recharge_btn:function(){
                $(".window").css("display","block");
                $(document).bind("click", function (e) {
                        if ((e.target.className.indexOf("window")<0 && e.target.id != "recharge_btn")) {
                            $(".window").css("display","none");
                        }
                })
            },
            reflect_btn:function() {
                $(".window1").css("display", "block");
                $(document).bind("click", function (e) {
                    if ((e.target.className.indexOf("window1") < 0 && e.target.id != "reflect_btn")) {
                        $(".window1").css("display", "none");
                    }
                })
            }
        }
});
new Vue({
    el: '.account-top'
});
Vue.filter('nameFilter', function (name) {
    var names="";
    $.ajax({
        type: "get",
        url: "/api" + "/users/" +name,
        dataType: "json",
        cache : false,
        async : false,
        success: function(d){
            names= d.data.userName;
        }
    });

    return names;

});
//时间格式截取
Vue.filter('timeFilter', function (opTime) {
    var str=opTime;
    opTime=str.substr(str.length-9);
    return opTime;
});
Vue.filter('orderFil',function(orderId){
    var orderArr=orderId.split('_');
    var str=orderArr[1];
    return str;

})
Vue.filter('tt',function(tradeAmount,opType){
    switch(opType){
        case 1:
            //opType = "充值";
            tradeAmount=("+"+tradeAmount);
            this.count_num="count_num1";
            break;
        case 2:
            //opType = "提现";
            tradeAmount=(-tradeAmount);
            this.count_num="count_num2";
            break;
        case 3:
            //opType = "年费";
            tradeAmount=(-tradeAmount);
            this.count_num="count_num2";
            break;
        case 4:
            //opType = "订单生效";
            tradeAmount=(-tradeAmount);
            this.count_num="count_num2";
            break;
        case 5:
            //opType = "订单完成";
            tradeAmount=(-tradeAmount);
            this.count_num="count_num2";
            break;
        case 6:
            //opType = "Item下线订单失效";
            tradeAmount=(-tradeAmount);
            this.count_num="count_num2";
            break;
        case 7:
            //opType = "投诉成功订单失效";
            tradeAmount=("+"+tradeAmount);
            this.count_num="count_num1";
            break;
        case 8:
            //opType = "订单完成";
            tradeAmount=("+"+tradeAmount);
            this.count_num="count_num1";
            break;
        case 9:
            //opType = "订单生效";
            tradeAmount=("+"+tradeAmount);
            this.count_num="count_num1";
            break;
        case 10 :
            //opType = "投诉成功订单失效";
            tradeAmount=(-tradeAmount);
            this.count_num="count_num2";
            break;
    }
    return tradeAmount;
})
Vue.filter('opTypeFilter', function (opType) {
    switch(opType){
        case 1:
            opType = "充值";
            //tradeAmount="+"+tradeAmount;
            //tradeAmount=(+tradeAmount);
            //count_num="count_num1";
            break;
        case 2:
            opType = "提现";
            //tradeAmount="-"+tradeAmount;
            //tradeAmount=(-tradeAmount);
            //count_num="count_num2";
            break;
        case 3:
            opType = "年费";
            //tradeAmount=(-tradeAmount);
            //count_num="count_num2";
            break;
        case 4:
            opType = "订单生效";
            //tradeAmount=(-tradeAmount);
            //count_num="count_num2";
            break;
        case 5:
            opType = "订单完成";
            //tradeAmount=(-tradeAmount);
            //count_num="count_num2";
            break;
        case 6:
            opType = "Item下线订单失效";
            //tradeAmount=(-tradeAmount);
            //count_num="count_num2";
            break;
        case 7:
            opType = "投诉成功订单失效";
            //tradeAmount=(+tradeAmount);
            //count_num="count_num1";
            break;
        case 8:
            opType = "订单完成";
            //tradeAmount=(+tradeAmount);
            //count_num="count_num1";
            break;
        case 9:
            opType = "订单生效";
            //tradeAmount=(+tradeAmount);
            //count_num="count_num1";
            break;
        case 10 :
            opType = "投诉成功订单失效";
            //tradeAmount=(-tradeAmount);
            //count_num="count_num2";
            break;
    }
    return opType;
});
Vue.component("accountlist",{
    props:{
        next:Number,
        obj:Object
    },
    data:function(){

    },
    template:
    '<div id="accountRecord">'+
    '<div class="table_title">'+
            '<span>时间</span>'+
            '<span>流水号</span>'+
            '<span>订单号</span>'+
            '<span>金额（元）</span>'+
            '<span>类型</span>'+
            '<span>出账方/入帐方</span>'+
            '<span>可用额度（元）</span>'+
            '<span>总余额（元）</span>'+
    '</div>'+
    '<p style="text-align: center;font-size: 16px;line-height: 150px;display: none;" id="emptyData">暂无请求数据</p>' +
    '<div class="table_main">'+
    '<div class="iconBox" v-for="en in obj.result">'+
    '<div class="Record_time_title" @click="slideDown">'+
        '<p >{{en.date}}</p>'+
    '</div>'+
    '<div class="Record_body">'+
        '<div class="table_content" v-for="k in en.detail" >'+
        '<span>{{k.opTime | timeFilter}}</span>'+
        '<span>{{k.id}}</span>'+
        '<span>{{k.orderId | orderFil}}</span>'+
        '<span class="{{count_num}}">{{k.tradeAmount | tt k.opType }}</span>'+
        '<span>{{k.opType | opTypeFilter}}</span>'+
        '<span>{{k.tradeUser | nameFilter}}</span>'+
        '<span>{{k.availableAmount}}</span>'+
        '<span>{{k.actualAmount}}</span>'+
        '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '<div style="float: right; margin-right: 25px;" class="accountPages"></div>'+
    '</div>',
    methods:{
        start:function(){
            var total=this.obj.total;
            $(".accountPages").pagination(total,{
                maxentries:total,
                items_per_page: 50,
                num_display_entries: 3,
                num_edge_entries: 5 ,
                prev_text:"上一页",
                next_text:"下一页",
                ellipse_text:"...",
                link_to:"javascript:void(0)",
                callback:this.gonextpage,
                load_first_page:false
            });
        },
        gonextpage:function(e){
            this.next=e+1;
            this.obj.total=100;
        },
        slideDown:function(e){
            var Record_body = $(e.target).closest(".iconBox").children("div[class=Record_body]");
            Record_body.slideToggle("fast");
        }
    },
    ready:function(){
        this.start();
    }
});
//账务中心组件结束



















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