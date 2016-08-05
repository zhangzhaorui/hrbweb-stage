/**
 * Created by Max cheng on 2016/4/1.
 */
$(document).ready(function(){
    var loginname=tname;
    var sid=resetId;
    $.ajax({
        //Judgment link Enabled
        url: "/api" + "/users/" + loginname + "/validateLink?sid="+sid,
        type: "get",
        contentType: "application/json",
        cache: false,
        async: false,
        dataType: 'json',
        success: function (json) {
            if(json.code==0){
                var result=json.data.result;
                if(result==2){
                    $('#failed').show();
                    $('.infoBox').hide();
                }
                else{
                    $('#failed').hide();
                    $('.infoBox').show();
                }
            }
        }
    });
    //$("#reforget").click(function(){
    //    $('#myModal').modal('hide');
    //    $('#fine').modal('show');
    //});
    $("#ps").blur(function(){
        if (($("#ps").val())==""){
            $("#label_four").siblings().finish().hide();
            $("#label_four").show();
            $("#label_four").fadeOut(3000);
            inputStates1=false;
        }else{
            inputStates1=true;
        }
        if(($("#ps").val()).length<8){
            $("#label_two").siblings().finish().hide();
            $("#label_two").show();
            $("#label_two").fadeOut(3000);
            inputStates2=false;
        }else{
            inputStates2=true;
        }
    });
    $("#rps").blur(function(){
        if (($("#rps").val())==""){
            $("#label_four").siblings().finish().hide();
            $("#label_four").show();
            $("#label_four").fadeOut(3000);
            inputStates3=false;
        }else{
            inputStates3=true;
        }
        if(($("#rps").val()).length<8){
            $("#label_two").siblings().finish().hide();
            $("#label_two").show();
            $("#label_two").fadeOut(3000);
            inputStates4=false;
        }else{
            inputStates4=true;
        }
    });
    //判断密码是否相同
    if (($("#ps").val())!=($("#rps").val())) {
        $("#label_three").siblings().finish().hide();
        $("#label_three").show();
        $("#label_three").fadeOut(3000);
    }
    $("#registration").click(function(){
        var a, b, c, d,e;
        if (($("#ps").val())==""){
            $("#label_four").siblings().finish().hide();
            $("#label_four").show();
            $("#label_four").fadeOut(3000);
            a=0;
        }else{
            a=1;
        }
        if(($("#ps").val()).length<8){
            $("#label_two").siblings().finish().hide();
            $("#label_two").show();
            $("#label_two").fadeOut(3000);
            b=0;
        }else{
            b=1;
        }
        if (($("#rps").val())==""){
            $("#label_four").siblings().finish().hide();
            $("#label_four").show();
            $("#label_four").fadeOut(3000);
            c=0;
        }else{
            c=1;
        }
        if(($("#rps").val()).length<8){
            $("#label_two").siblings().finish().hide();
            $("#label_two").show();
            $("#label_two").fadeOut(3000);
            d=0;
        }else{
            d=1;
        }
        if (($("#ps").val())!=($("#rps").val())) {
            $("#label_three").siblings().finish().hide();
            $("#label_three").show();
            $("#label_three").fadeOut(3000);
            e=0;
        }else{
            e=1;
        }
        var myps = $.md5($("#ps").val());
        if(a*b*c*d*e==1){
            $.ajax({
                //sending email
                url: "/api"+"/users/"+loginname+"/pwd/reset",
                type: "PUT",
                contentType:"application/json",
                cache:false,
                data:JSON.stringify({"passwd":myps,"sid":sid}),
                async:false,
                dataType:'json',
                success:function(json){
                    if (json.code==0){
                        $('#successed').show();
                        $('.infoBox').hide();
                    }
                    else{
                        $('#failed').show();
                        $('.infoBox').hide();
                    }
                },
                error:function(){
                    $('#failed').show();
                    $('.infoBox').hide();
                }
            });
        }
    });
});