/**
 * Created by Max cheng on 2016/3/24.
 */
var headerToken={};
if($.cookie("token")!=null&&$.cookie("token")!="null"){
    headerToken={Authorization:"Token "+$.cookie("token")};
}

var accountInfo=new Vue({
    el:'.main',
    data:{
        email:$.cookie("tname"),
        regtime:0,
        membership:'',
        endTime:0,
        username:'',
        nickname:'',
        comment:'',
        s:0,
        y:0
    },
    watch:{
        nickname:function(val){
            //var reg=new RegExp('/[A-Za-z0-9_-]/');/\_/
            var reg= /^(([a-z]*)|(\w*\d*\w*)|(\w*\_\w*)|(\w*[a-z]\w*\d*\w*)|(\w*\_*\w*\d*\w*)|(\w*\_*\w*[a-z]*\w*)|(\w*\_*\w*[a-z]*\w*\d*\w*))$/i;
            if(reg.test(val)){
                $("#error_limit").siblings().finish().hide();
                $('#error_limit').hide();
                this.s=1;
            }else{
                $("#error_limit").text("限使用英文字母、数字、“_”").finish().hide();
                $('#error_limit').show();
                this.s=0;
            }
        },
        comment:function(val){
            if(val==null){
            }
            else if(val.length<100&&val.length>=0){
                $("#error_limit").siblings().finish().hide();
                $('#error_limit').hide();

                this.y=1;
            }else{
                $("#error_limit").text("已达最长字符数").siblings().finish().hide();
                $('#error_limit').show();
                this.y=0;
            }
        }
    },
    methods: {
        getInfo: function () {
            //以上是测试code
            getAjax('/api/users/' + $.cookie("tname"), headerToken, function (data) {
                accountInfo.nickname=data.data.nickName;
                accountInfo.username=data.data.userName;
                accountInfo.comment=data.data.comment;
                accountInfo.regtime=data.data.registTime;
                accountInfo.endTime=data.data.invalidTime;
            });

            getAjax("/api/vip/"+$.cookie("tname"),headerToken,function(data){
                switch (data.data.userType)
                {
                    case 1:
                        accountInfo.membership="注册用户";
                        break;
                    case 2:
                        accountInfo.membership="管理员用户";
                        break;
                    case 3:
                        accountInfo.membership="认证会员";
                        break;
                    case 4:
                        accountInfo.membership="金卡会员";
                        break;
                    case 5:
                        accountInfo.membership="钻石会员";
                        break;
                }
            });

        //pull量信息
            $('[data-toggle="tooltip"]').tooltip({
                placement:function(){
                    return "top";
                }
            });
            getAjax('/api/quota/'+$.cookie("tname")+'/pullnum',headerToken,function(data){
                var use=data.data.use;
                var quota=data.data.quota;
                $(".p_progress>p>span").html(quota+"次/天");
                if(use<quota){
                    var pullNumB=(use/quota).toFixed(4);
                    var pullNumC=pullNumB.slice(2,4)+"."+pullNumB.slice(4,6)+"%";
                    $("#pullNum").css("width",pullNumC);
                }else if(use==quota||use>quota){
                    $("#pullNum").css("width","100%");
                }
                //var quotaPercect=(((use/quota))*100)+'%';
                //$("#pullNum").css("width",quotaPercect);
                //$("#pullNum").attr("data-original-title","今天已Pull:"+use+"次");
            });
            //三个圆环信息
            getAjax("/api"+"/vip/"+$.cookie("tname"),headerToken,function(data){
                $(".circle p span").text(data.data.repoPub+"个");
                $(".circle1 p span").text(data.data.repoPri+"个");
                $(".circle2 p span").text(data.data.deposit);
            });
            //repo配额
            getAjax("/api"+"/quota/"+$.cookie("tname")+"/repository",headerToken,function(data){
                console.log(data.data);
                var usePublic=parseFloat(data.data.usePublic);
                var usePrivate=parseFloat(data.data.usePrivate);
                var quotaPublic=parseFloat(data.data.quotaPublic);
                var quotaPrivate=parseFloat(data.data.quotaPrivate);
                $("#usePublic").text(usePublic);
                $("#usePrivate").text(usePrivate);
                $(".circle p span").text(quotaPublic+"个");
                $(".circle1 p span").text(quotaPrivate+"个");
//第一个圆环
                    var uqc=parseFloat(usePublic/quotaPublic);
                    if(uqc==0){
                        $(".left").css("transform", "rotate()");
                        $(".right").css("transform", "rotate()");
                    }
                    if (uqc <= 0.5&&uqc>0) {
                        var leftNum = uqc * 360;
                        $(".left").css("transform", "rotate(-"+leftNum+"deg)");
                    }
                    if (uqc > 0.5) {
                        var rightNum = (uqc - 0.5) * 360;
                        $(".left").css("transform", "rotate(-180deg)");
                        $(".right").css("transform", "rotate(-" + rightNum + "deg)");
                    }
//第二个圆环
                    if(quotaPrivate==0)
                    {
                        $(".left1").css("transform", "rotate(deg)");
                        $(".right1").css("transform", "rotate(deg)");
                    }
                    if(quotaPrivate!=0)
                    {
                        var uqe=usePrivate/quotaPrivate;
                        if (uqe <= 0.5) {
                            var leftNum2 = uqe * 360;
                            $(".left1").css("transform", "rotate(-" + leftNum2 + "deg)");

                        }
                        if (uqe > 0.5) {
                            var rightNum2 = (uqe - 0.5) * 360;
                            $(".left1").css("transform", "rotate(-180deg)");
                            $(".right1").css("transform", "rotate(-" + rightNum2 + "deg)");
                        }
                    }
            });
//托管空间
            getAjax("/api"+"/quota/"+$.cookie("tname")+"/deposit",headerToken,function(data){
                var use1 = data.data.use;//使用配额
                var quota1 = data.data.quota;//托管配额
                var use = use1.substring(0, (use1.length - 1));
                var quota = quota1.substring(0, (quota1.length - 1));
                uq = (use / quota).toFixed(2);

                $("#deposit").text(use1);
                $(".circle2 p span").text(quota1);
                if(uq==0)
                {
                    $(".left2").css("transform", "rotate(deg)");
                    $(".right2").css("transform", "rotate(deg)");
                }
                else if (uq>0&&uq<0.5){
                    var leftNum = uq * 360;
                    $(".left2").css("transform", "rotate(-" + leftNum + "deg)");
                }
                else if (uq > 0.5) {
                    var rightNum = (uq - 0.5) * 360;
                    $(".left2").css("transform", "rotate(-180deg)");
                    $(".right2").css("transform", "rotate(-" + rightNum + "deg)");
                }
            });
        },
        formSubmit:function(){
            var mydata = {};
            mydata["username"] = this.username;
            mydata["comments"] = this.comment;
            mydata["nickname"] = this.nickname;

            //alert("s:"+this.s+"*"+"y:"+this.y);
            if((this.s)*(this.y)==1){
                $("#button01").css("display","none");
                $("#exampleInputName2").attr("disabled","disabled");
                $("#textComment").attr("disabled","disabled");
                $.ajax({
                    url:"/api"+"/users/"+$.cookie("tname"),
                    type:"PUT",
                    cache:false,
                    async:false,
                    beforeSend:function(){
                        $('#button01').attr('disabled','disabled');
                        $('#button01').text('正在保存中');
                    },
                    complete:function(){
                        $('#button01').removeAttr('disabled');
                        $('#button01').text('提交');
                    },
                    headers:{Authorization:"Token "+$.cookie("token")},
                    datatype:'json',
                    contentType:"application/json",
                    data: JSON.stringify(mydata),
                    success:function(data){
                        if(data.code==0){
                            $("#update_icon").css("display","inline-block");
                            $("#success").siblings().finish().hide();
                            $("#success").show().fadeOut(4000);
                        }
                        if (data.code==8002)
                        {
                            $("#error_emptyName3").siblings().finish().hide();
                            $("#error_emptyName3").show().fadeOut(4000);
                        }
                    },
                    error:function(data){
                        if(data.code!=0){
                            $("#error").siblings().finish().hide();
                            $("#error").show().fadeOut(4000);
                        }
                    }
                });
            }
        },
        formUpdate:function(){
            $("#button01").show();
            $("#update_icon").hide();
            $("#textComment").removeAttr("disabled");
            $("#exampleInputName2").removeAttr("disabled");
        }
    }
})
accountInfo.getInfo();//初始化信息

function getAjax(url,headerToken,func) {
    $.ajax({
        url: url,
        type: 'get',
        cache: false,
        async: true,
        headers: headerToken,
        success: function (json) {
            func(json);
        }
    });
}


$(document).ready(function(){
    $("#nameAlert").hide();
    $("#commentAlert").hide();
   if($("#textComment").val()==null||$("#exampleInputName2").val()==null){
       $("#button01").show();
       $("#update_icon").hide();
       $("#textComment").removeAttr("disabled");
       $("#exampleInputName2").removeAttr("disabled");
   }else{
       $("#button01").hide();
       $("#update_icon").show();
       $("#textComment").attr("disabled","disabled");
       $("#exampleInputName2").attr("disabled","disabled");

   }



    $(document).on('blur',"#exampleInputName2",function(){
        if($(this).val()=="") {
            //$("#exampleInputName2").focus();    // 如果内容为空，继续聚集焦点
            $("#nameAlert").show();
            $("#button01").attr("disabled", "disabled");
        }else {

            if($("#textComment").val()==""){

                $("#button01").attr("disabled", "disabled");
            }else {
                $("#nameAlert").hide();
                $("#button01").removeAttr("disabled");
            }
            $("#nameAlert").hide();

        }

    })
    $(document).on('blur',"#textComment",function(){
        if($(this).val()=="") {
            $("#commentAlert").show();
            $("#button01").attr("disabled", "disabled");
        }else {

            if($("#exampleInputName2").val()==""){
                $("#button01").attr("disabled", "disabled");
            }else {
                $("#commentAlert").hide();
                $("#button01").removeAttr("disabled");
            }
            $("#commentAlert").hide();
        }
    })
})





