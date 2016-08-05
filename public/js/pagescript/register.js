/**
 * Created by Max cheng on 2016/6/23.
 */
/**
 * Created by Max cheng on 2016/5/10.
 */
$(document).ready(function(){
    $('#protocol').click(function(){
        $('.modal-dialog').css('width','756px');
        $('#subscriptDialog').modal('toggle');
    })

    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    $("#email").blur(function(){

        if (($("#email").val())==""){
            $("#label_five").siblings().finish().hide();
            $("#label_five").show();
            $("#label_five").fadeOut(4000);
        }
        if (($("#email").val())!=""){
            if (!reg.test($("#email").val())){
                $("#label_one").siblings().finish().hide();
                $("#label_one").show();
                $("#label_one").fadeOut(4000);
            }
        }
    });
    $("#ps").blur(function(){
        if (($("#ps").val())==""){
            $("#label_two").siblings().finish().hide();
            $("#label_two").show();
            $("#label_two").fadeOut(4000);
        }

        if(($("#ps").val()).length<8){
            $("#label_two").siblings().finish().hide();
            $("#label_two").show();
            $("#label_two").fadeOut(4000);
        }

        if(($("#ps").val()).length>32){
            $("#label_two").siblings().finish().hide();
            $("#label_two").show();
            $("#label_two").fadeOut(4000);
        }
    });
    $("#psr").blur(function(){
        if ($("#psr").val()==""){
            $("#label_two").siblings().finish().hide();
            $("#label_two").show();
            $("#label_two").fadeOut(4000);
        }

        if(($("#psr").val()).length<8||$("#psr").val().length>32){
            $("#label_two").siblings().finish().hide();
            $("#label_two").show();
            $("#label_two").fadeOut(4000);
        }
        //判断密码是否相同
        if (($("#ps").val())!=($("#psr").val())){
            $("#label_three").show().siblings().hide();
            $("#label_three").fadeOut(4000);
        }
    });


    $("#registration").click(function(){
        if( $("#email").val() != ''){
            if (!reg.test($("#email").val())){
                $("#label_one").siblings().finish().hide();
                $("#label_one").show()
                $("#label_one").fadeOut(4000);
                $(".infoBox").show();
                $("#checkEmail").hide();
                return;
            }
        }
        else{
            $("#label_five").siblings().finish().hide();
            $("#label_five").show();
            $("#label_five").fadeOut(4000);
            return;
        }

        if( $("#ps").val() == ''){
            $("#label_two").siblings().finish().hide();
            $("#label_two").show();
            $("#label_two").fadeOut(4000);
            $(".infoBox").show();
            $("#checkEmail").hide();
            return;
        }
        if(($("#ps").val()).length<8){
            $("#label_two").siblings().finish().hide();
            $("#label_two").show();
            $("#label_two").fadeOut(4000);

            $(".infoBox").show();
            $("#checkEmail").hide();
            return;
        }

        if(($("#ps").val()).length>32){
            $("#label_two").siblings().finish().hide();
            $("#label_two").show();
            $("#label_two").fadeOut(4000);
        }

        if( $("#psr").val() == ''){
            $("#psr").focus();
            $("#label_two").siblings().finish().hide();
            $("#label_two").show();
            $("#label_two").fadeOut(4000);
            $(".infoBox").show();
            $("#checkEmail").hide();
            return;
        }

        if(($("#psr").val()).length<8){
            $("#label_two").siblings().finish().hide();
            $("#label_two").show();
            $("#label_two").fadeOut(4000);
            $(".infoBox").show();
            $("#checkEmail").hide();
            return;
        }

        if(($("#psr").val()).length>32){
            $("#label_two").siblings().finish().hide();
            $("#label_two").show();
            $("#label_two").fadeOut(4000);
        }

        if (($("#ps").val())!=($("#psr").val())){
            $("#label_three").siblings().finish().hide();
            $("#label_three").show();
            $("#label_three").fadeOut(4000);
            return;
        }

        //判断checkbox是否选中
        // alert($("#item").is(":checked"))
        var b;
        if ($("#item").is(":checked")==false){
            b=false;
            $("#label_four").siblings().finish().hide();
            $("#label_four").show();
            $("#label_four").fadeOut(4000);
            $(".infoBox").show();
            $("#checkEmail").hide();
            return;
        }
        else{
            b=true;
        }
        var updateData={};
        var loginname=$("#email").val();
        var	myps=$.md5($("#ps").val());
        //var sid=getParam("sid");
        if(region==''){
            updateData={
                "passwd":myps
            }
        }else{
            updateData={
                "passwd":myps,
                "region":region
            }
        }

        if(b==true){
            $.ajax({
                url:"/api/users/"+loginname,
                type: "POST",
                cache:false,
                data:updateData,
                async:false,
                dataType:'json',
                success:function(json){
                    //check the user status registered or no
                    if(json.code==0){
                        var ss=loginname;
                        var start=ss.indexOf("@")+1;
                        var end=start+ss.length;
                        var strtext="http://mail."+ss.substring(start,end);
                        $("#info a").text(strtext).attr("href",strtext);

                        $(".infoBox").hide();
                        $("#checkEmail").show();
                    }
                },
                error:function(json){
                    if($.parseJSON(json.responseText).code==8002){
                        $("#cannotreg").siblings().finish().hide();
                        $("#cannotreg").show();
                        $("#cannotreg").fadeOut(2500);
                        $(".infoBox").show();
                        $("#checkEmail").hide();
                    }
                    if ($.parseJSON(json.responseText).code == 8012) {
                        $("#cannotreg").siblings().finish().hide();
                        $("#cannotreg").show();
                        $("#cannotreg").fadeOut(2500);
                        $(".infoBox").show();
                        $("#checkEmail").hide();
                    }
                }


            });
        }
    });

});

function getParam(key) {
    var value='';
    var itemid = new RegExp("\\?.*"+key+"=([^&]*).*$");
    if (itemid.test(decodeURIComponent(window.location.href))) {
        value = itemid.exec(decodeURIComponent(window.location.href))[1];
    }
    return value;
}
