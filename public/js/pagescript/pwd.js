/**
 * Created by Max cheng on 2016/3/23.
 */

var reg= /^(([a-z]*)|(\w*\d*\w*)|(\w*\_\w*)|(\w*[a-z]\w*\d*\w*)|(\w*\_*\w*\d*\w*)|(\w*\_*\w*[a-z]*\w*)|(\w*\_*\w*[a-z]*\w*\d*\w*))$/i;
var pwInput=new Vue({
    el:'.Box',
    data:{
        oldpwd:'',
        passwd:'',
        paspasswd:'',
        s1:false,
        s2:false,
        s3:false
    },
    ready: function () {
    	$("#u-header-notLogin").val("");
    	$("#oldpwd").val("");
    },
    watch:{
        passwd:function(val){

        },
        paspasswd:function(val){

        }
    },
    methods: {
        pwdTest: function () {
            var val = this.oldpwd;
            //验证密码是否正确
            var md5_val = $.md5(val);
            var oldsure = false;
            $.ajax({
                url: "/api" + "/users/" + $.cookie("tname") + "/pwd" + "/validate" + "?pwd=" + md5_val,
                type: "GET",
                cache: false,
                async: false,
                headers: {Authorization: "Token " + $.cookie("token")},
                datatype: 'json',
                success: function (data) {
                    if (data.code == 0) {
                        oldsure = true;
                    }
                },
                error: function (json) {
                    if ($.parseJSON(json.responseText).code == 8004) {
                        oldsure = false;
                    }
                }
            });
            //验证密码是否正确结束
            if (oldsure == false) {
                $("#label_one").siblings().finish().hide();
                $("#label_one").show();
            } else {
                $("#label_one").siblings().finish().hide();
                $("#label_one").hide();
                this.s1=true;
            }
        },
        passwdTest: function () {
            var val = this.passwd;
            if ((val.length < 8)&&(reg.test(val))) {
                $("#label_two").siblings().finish().hide();
                $("#label_two").show();
            } else {
                $("#label_two").siblings().finish().hide();
                $("#label_two").hide();
                this.s2=true;

            }
        },
        paspasswdTest: function () {
            var val = this.paspasswd;
            if (val != this.passwd) {
                $("#label_three").siblings().finish().hide();
                $("#label_three").show();
            } else {
                $("#label_three").siblings().finish().hide();
                $("#label_three").hide();
                this.s3=true;
            }
        },
        updatePwd: function () {
            var myPwd = {};
            var oldpwd = this.oldpwd;
            var passwd = this.passwd;
            var paspasswd = this.paspasswd;
            myPwd["oldpwd"] = $.md5(oldpwd);
            myPwd["passwd"] = $.md5(passwd);
            if(oldpwd==""||oldpwd==""||paspasswd==""){
                $("#label_fail").siblings().finish().hide();
                $("#label_fail").show();
            }else if (this.s1 ==true&&this.s2==true&&this.s3==true) {
                $.ajax({
                    url: "/api" + "/users/" + $.cookie("tname") + "/pwd",
                    type: "PUT",
                    cache: false,
                    async: false,
                    headers: {Authorization: "Token " + $.cookie("token")},
                    datatype: 'json',
                    contentType: "application/json",
                    data: JSON.stringify(myPwd),
                    success: function (data) {
                        if(data.code==0){
                            $("#successBox").css("display", "inline");
                            $(".form-control-00").css("display", "none");
                            $(".btn0").css("display", "none");
                            $('.labelBox').css("display", "none");
                            $('.contentBox').css("display", "none");


                            $.cookie("tname",null,{path:"/"});
                            $.cookie("token",null,{path:"/"});

                            $.cookie("tuserid",null,{path:"/"}); // 必填: 该用户在您系统上的唯一ID
                            $.cookie("tnickname",null,{path:"/"}); // 选填: 用户名
                            $.cookie("tregtime",null,{path:"/"}); // 选填: 用户的注册时间，用Unix时间戳表示

                            $.cookie("badgeHeader",null,{path:"/"}); //新消息提示
                            
                            if($.cookie("token")!=null&&$.cookie("tname")!=null&&$.cookie("tname")!="null"&&$.cookie("tname")!="null"){
                        		$('.g-iLoginb').hide();
                        		$(".g-iLoginf").show();
                        		$("#innames").text($.cookie("tname"));
                        	}else{
                        		$('.g-iLoginb').show();
                        		$(".g-iLoginf").hide();
                        	}
                            
                        }
                    },
                    error: function (data) {
                        $("#label_fail").siblings().finish().hide();
                        $("#label_fail").hide();
                    }
                })
            }
        }
    }
});