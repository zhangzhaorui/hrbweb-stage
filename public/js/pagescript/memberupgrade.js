/**
 * Created by Max cheng on 2016/3/22.
 */
//modalCen('p-modal-dialog');
//modalCen('modal-main');

var dheight=$(window).height();
var ttdia=385;
var ttheight=(dheight-ttdia)/2;
//alert(dheight+"--"+ttdia+"--"+ttheight);
$("#p-modal-dialog").css({top:(ttheight-60)+"px"});


var headerToken={};
if($.cookie("token")!=null&&$.cookie("token")!="null"){
    headerToken={Authorization:"Token "+$.cookie("token")};
}
var member=new Vue({
    el:'#background',
    data:{
        member_grade:'',
        member_time:'',
        member_price:0
    },
    methods: {
        dataReady: function () {
            $.ajax({
                url: "/api" + "/vip/" + $.cookie("tname"),
                type: "get",
                cache: false,
                async: false,
                headers: {Authorization: "Token " + $.cookie("token")},
                datatype: 'json',
                success: function (d) {
                    var UT = d.data.userType;
                    if (UT == 1) {
                    }
                    else if (UT == 3) {
                        $(".btn3").hide();
                    }
                    else if (UT == 4) {
                        $(".btn3").hide();
                        $(".btn2").hide();
                    }
                    else if (UT == 5) {
                        $(".btn3").hide();
                        $(".btn2").hide();
                        $(".btn1").hide();
                    }
                }
            });
        },
        DiamondsClick: function () {
            this.member_grade = '钻石会员';
            var mydate = new Date();
            var year = mydate.getFullYear(); //获取完整的年份(4位,1970-????)
            var month = mydate.getMonth(); //获取当前月份(0-11,0代表1月)
            var day = mydate.getDate(); //获取当前日(1-31)
            var time = ((year + 1) + "-" + (month + 1) + "-" + day);
            this.member_time = time;
            var cost;
            getAjax("/api" + "/vip/" + $.cookie("tname") + "/cost?type=5",headerToken,function(json){
                cost= json.data.cost;
            })
            this.member_price=cost;//作用域问题。this只能在这里使用，才能指向本对象的data属性的值
        },
        goldCard: function () {
            this.member_grade = '金卡会员';
            var mydate = new Date();
            var year = mydate.getFullYear(); //获取完整的年份(4位,1970-????)
            var month = mydate.getMonth(); //获取当前月份(0-11,0代表1月)
            var day = mydate.getDate(); //获取当前日(1-31)
            var time = ((year + 1) + "-" + (month + 1) + "-" + day);
            this.member_time = time;
            //获取费用
            var cost;
            getAjax("/api" + "/vip/" + $.cookie("tname") + "/cost?type=4",headerToken,function(json){
                cost= json.data.cost;
            })
            this.member_price=cost;
        },
        authentication:function(){
            this.member_grade = '认证会员';
            var mydate = new Date();
            var year = mydate.getFullYear(); //获取完整的年份(4位,1970-????)
            var month = mydate.getMonth(); //获取当前月份(0-11,0代表1月)
            var day = mydate.getDate(); //获取当前日(1-31)
            var time = ((year + 1) + "-" + (month + 1) + "-" + day);
            this.member_time = time;
            //获取费用
            var cost;
            getAjax("/api" + "/vip/" + $.cookie("tname") + "/cost?type=3",headerToken,function(json){
                cost= json.data.cost;
            })
            this.member_price=cost;
        },
        btnFadeIn:function(){
            $(".window").fadeIn();
        }
    }
});
member.dataReady();

function getAjax(url,headers,func){
    $.ajax({
        url:url,
        type: "get",
        cache: false,
        async: false,
        headers:headers,
        success:function(data){
            func(data)
        }
    })
}
$(document).ready(function() {
    //弹窗消失
    $(document).bind("click", function (e) {
        var target = e.target;
        if (target.className.indexOf("window") < 0 && target.className.indexOf("btn0") < 0) {
            $(".window").fadeOut(10);
        }

    });

    $("p").bind("click", function (e) {
        stopEventStrans(e);
    });
    function stopEventStrans(e) {
        e = e || window.event;
        if (e.stopPropagation) {
            e.stopPropagation();//IE以外
        } else {
            e.cancelBubble = true;//IE
        }
    }
});