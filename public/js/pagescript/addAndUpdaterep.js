/**
 * Created by Administrator on 2016/3/21.
 */
// 添加repo
$(document).on('click',function(e){
    if((e.target.id)!='judgment'&&(e.target.className.indexOf('add-icon')<0)){
        $("#judgment").css("display","none");
    }
});
$(function(){
    $(".add-icon").click(function() {
        var display=$("#judgment").css("display");
        if(display=="none")
        {
            $("#judgment").css("display","block");
        }
        if(display=="block")
        {
            $("#judgment").css("display","none");
        }
        $("#judgment_number").css("display","none");

    });
    // 得到配额
    function getquota(ispublic){
        var uq_pubOrpri = 0;
        $.ajax({
            url: "/api/quota/"+$.cookie("tname")+"/repository",
            type:"get",
            cache:false,
            async:false,
            dataType:'json',
            headers:{ Authorization:"Token "+$.cookie("token") },
            success:function(data) {
                if(ispublic == 'public'){
                    var usePublic=data.data.usePublic;
                    var quotaPublic=data.data.quotaPublic;
                    uq_pubOrpri=quotaPublic-usePublic;
                }else if(ispublic == 'private'){
                    var usePrivate=data.data.usePrivate;
                    var quotaPrivate=data.data.quotaPrivate;
                    uq_pubOrpri=quotaPrivate-usePrivate;
                }
                return uq_pubOrpri;
            }
        });
        return uq_pubOrpri;
    }
    $(document).on('click','#openRepo',function (e) {
        $('.repnameerror').hide();
        $('#repconerror').hide();
        $('#repnameInput').css('background-color','#fff');
        $('.surplusnum').html(200);
        $('.exceednum').html(0);
        $('.xiugaireperror').hide();
        var uq_pubOrpri = getquota('public');
        if(uq_pubOrpri > 0)
        {
            $("#addRep .submit input").attr("repevent", "add");
            $("#addRep .head .title").text("新增Repository");
            $("#addRep .repname .value input").removeAttr("disabled");
            $("#addRep .repname .value input").val("");
            $("#addRep .repcomment .value textarea").val("");
            //$("#addRep .repname .key .promt").show();
            $('#ispublic').attr("disabled",true);
            $('#addRep').modal('toggle');
            //$("#ispublic").val(1);
            $("#ispublic").text("开放");
            $("#judgment").css("display","none");
        }else {
            $("#judgment_number").css("display","block");
            $("#judgment").css("display","none");
        }
    })
    $(document).on('click','#privateRepo',function (e) {
        $('.repnameerror').hide();
        $('#repconerror').hide();
        $('#repnameInput').css('background-color','#fff');
        $('.surplusnum').html(200);
        $('.exceednum').html(0);
        $('.xiugaireperror').hide();
        var uq_pubOrpri = getquota('private');
        if(uq_pubOrpri>0)
        {
            $("#addRep .submit input").attr("repevent", "add");
            $("#addRep .head .title").text("新增Repository");
            $("#addRep .repname .value input").removeAttr("disabled");
            $("#addRep .repname .value input").val("");
            $("#addRep .repcomment .value textarea").val("");
            //$("#addRep .repname .key .promt").show();
            $('#ispublic').attr("disabled",true);
            $('#addRep').modal('toggle');
            //$("#ispublic").val(2)
            $("#ispublic").text("私有");
            $("#judgment").css("display","none");
        }else {
            $("#judgment_number").css("display","block").slideDown(2000);
            $("#judgment").css("display","none");
        }
    })
    $(document).on('click','.xiugairep',function(e) {
        $('.repnameerror').hide();
        $('#repconerror').hide();
        $('#repnameInput').css('background-color','#f5f5f5');
        var thisusername = $(this).attr('datareponame');
        var cooperateitems = $(this).attr('cooperateitems');
        $("#ispublic").attr('cooperateitems',cooperateitems);
        var ispublic = $(this).attr('dataispublic');
        $("#addRep .submit input").attr("repevent", "edit");
        $("#addRep .head .title").text("修改Repository");
        $("#addRep .repname .value input").attr("disabled", "disabled");
        //$("#addRep .repname .key .promt").hide();
        $("#addRep .repname .value input").val(thisusername);
        $('.xiugaireperror').hide();
        var thisval = $(this).parents('.repo').find('.description').find('p').html();
        $('.surplusnum').html(200-parseInt(thisval.length));
        $('.exceednum').html('0');
        if(ispublic=="public")
        {
            $("#ispublic").attr('data-tagle',1);
            $("#addRep .submit input").attr('data-tagle',1);
            $("#ispublic").val(1);
        }
        if(ispublic=="private")
        {
            $("#ispublic").attr('data-tagle',2);
            $("#addRep .submit input").attr('data-tagle',2)
            $("#ispublic").val(2);
        }
        $("#addRep .repcomment .value textarea").val(thisval);
        $("#ListManagement p span:first").empty();
        $('#ispublic').attr("disabled",false);
        $('#addRep').modal('toggle');
    })
    $(document).bind("click", function (e) {
        if (e.target.id != "judgment_number" && e.target.id != "openRepo" && e.target.id != "privateRepo" && e.target.className.indexOf("add-icon") < 0 ) {
            if(! $("#judgment_number").is(":hidden")){
                $("#judgment_number").css("display", "none");
            }

        }
    });

    //rep名称验证
    function checkRepName(repstr){
        if(repstr == '' || repstr == '不能为空，52个字符以内，仅限使用英文字母、数字和"_"'){
            $('.repnameerror').html('Repository名称不能为空').addClass('errorMess').removeClass('successMess').show();
            return false;
        }else {
            $('.repnameerror').html('正确').addClass('successMess').removeClass('errorMess').show();
        }
        if(repstr.length < 0){
            $('.repnameerror').html('名称过长，限定52字符').addClass('errorMess').removeClass('successMess').show();
            return false;
        }else{
            $('.repnameerror').html('正确').addClass('successMess').removeClass('errorMess').show();

        }
        if(repstr.search(/^[a-zA-Z0-9_]+$/) < 0){
            $('.repnameerror').html('仅限使用英文字母、数字和"_"').addClass('errorMess').removeClass('successMess').show();
            return false;
        }else{
            $('.repnameerror').html('正确').addClass('successMess').removeClass('errorMess').show();
        }
        if(repstr.length > 52){
            $('.repnameerror').html('Repository名称太长，限制52个字符').addClass('errorMess').removeClass('successMess').show();
            return false;
        }else{
            $('.repnameerror').html('正确').addClass('successMess').removeClass('errorMess').show();
        }
    }

    ////  验证rep是否重名
    function chekrepRepeat(repstr){
        var isok = true;
        $.ajax({
            url: "/api/repositories/"+repstr,
            type: "GET",
            cache:false,
            data:{},
            async:false,
            dataType:'json',
            headers:{ Authorization:"Token "+$.cookie("token") },
            success:function(json){
                 if(json.code == 0){
                     isok = false;
                     return isok;
                 }

            }, error:function (json)
            {
                if(json.status == 400){
                   if($.parseJSON(json.responseText).code==1009) {
                   }
                }
            }
        });
        return isok;
    }

    $('#repnameInput').blur(function(){
        var repname = $.trim($(this).val());
        if(checkRepName(repname) == false){
            return;
        }else if(chekrepRepeat(repname) == false){
            $('.repnameerror').html('Repository名称重复').addClass('errorMess').removeClass('successMess').show();
            return;
        }

    });
    function commentkeyup(combj, surobj, exceedobj){
        var commentcon = $(combj).val();
        var residue = 200 - (commentcon.length);
        var exceeding = 0;
        if (residue < 0) {
            residue = 0;
            exceeding = commentcon.length - 200;
        }
        $(surobj).html(residue);
        $(exceedobj).html(exceeding);
    }

    function checkconlength(){
        if($('.surplusnum').html()==200){
            $('#repconerror').html('描述不能为空').addClass('errorMess').removeClass('successMess').show();
            return false;
        }else{
            $('#repconerror').html('正确').addClass('successMess').removeClass('errorMess').show();
        }
        if($('.exceednum').html()>0){
            $('#repconerror').html('描述内容过长，限定200中文字符').addClass('errorMess').removeClass('successMess').show();
            return false;
        }else{
            $('#repconerror').html('正确').addClass('successMess').removeClass('errorMess').show();
        }
    }
    $(document).on('keyup','#repconments',function(){
        commentkeyup('#repconments','.surplusnum','.exceednum')
    })
    $(document).on('blur','#repconments',function(){
       if(checkconlength() == false){
            return;
       }
    })

    $('#ispublic').change(function(){
        var dataTagle = $(this).attr('data-tagle');
        var thisval = $(this).val();
        var reperrorstr = '';
        var cooperateitems = $(this).attr('cooperateitems');
        if(thisval == 1){
            var uq_pubOrpri = getquota('public');
            if(uq_pubOrpri<=0 && thisval != dataTagle){
                reperrorstr = '您可新增的<span class="ispublicrepo">开放</span>Repository资源不足，<a class="viplinks"  target="_blank" href="/my/member" target="_blank">升级会员</a>获取更多资源';
                $('.xiugaireperror').html(reperrorstr);
                $('.xiugaireperror').show();
                $('#ispublic').val(1);
            }else{
                reperrorstr = '白名单设置将失效';
                $('.xiugaireperror').html(reperrorstr);
                $('.xiugaireperror').show();
            }
        }else if(thisval == 2){
            var uq_pubOrpri = getquota('private')
            if(uq_pubOrpri<=0 && thisval != dataTagle){
                reperrorstr = '您可新增的<span class="ispublicrepo">私有</span>Repository资源不足，<a class="viplinks" target="_blank" href="/my/member" target="_blank">升级会员</a>获取更多资源';
                $('.xiugaireperror').html(reperrorstr);
                $('.xiugaireperror').show();
                $('#ispublic').val(0);
            }else if(cooperateitems > 0){
                reperrorstr = '该Repository下有被协作的DataItem，不能调整为私有属性';
                $('.xiugaireperror').html(reperrorstr);
                $('.xiugaireperror').show();
                $('#ispublic').val(0);

            }else{
                reperrorstr = '已订购该Repository内DataItem的用户将进入该Repository白名单，协作功能将失效。';
                $('.xiugaireperror').html(reperrorstr);
                $('.xiugaireperror').show();
            }
        }
    });

    function clearcoopers(repname){
        $.ajax({
            type:"DELETE",
            url:"/api/permission/"+repname+"/cooperator/username?delall=1",
            cache:false,
            dataType:'json',
            headers:{ Authorization:"Token "+$.cookie("token") },
            success: function(deluser){
                if(deluser.code == 0){

                }
            }
        });
    }
    $("#addRep .submit input").click(function(){
        var method = "POST";
        var curispubnum = $("#ispublic").attr('data-tagle');
        var curthispubnum = $(this).attr('data-tagle');
        var data = {};
        var thisispublic = '';
        repname = $.trim($("#addRep .repname .value input").val());
        data["comment"] = $.trim($("#addRep .repcomment .value textarea").val());
        if($("#ispublic").val()==1) {
            data["repaccesstype"] ="public";
            thisispublic = '开放';
        }
        else {
            data["repaccesstype"] ="private";
            thisispublic = '私有';
        }

        if($(this).attr("repevent") == "add") {
            if(checkRepName(repname) == false){
                return;
            }
            method = "POST";
        }else {
            method = "PUT";
        }
        if(checkconlength() == false){
            return;
        }
        var isreturnback = true;
        $.ajax({
            url: "/api/repositories/"+repname,
            type: method,
            cache:false,
            data:{},
            async:false,
            dataType:'json',
            data:JSON.stringify(data),
            headers:{ Authorization:"Token "+$.cookie("token") },
            beforeSend:function(){
                $('#addRep .submit input').attr('disabled','disabled');
                $('#addRep .submit input').val("正在保存中");
            },
            complete:function(){
                $('#addRep .submit input').removeAttr('disabled');
                $('#addRep .submit input').val("提交");
            },
            success:function(json){
                if(json.code == 0){
                    isreturnback = true;
                    if(curispubnum != curthispubnum && $("#ispublic").val() == 2){
                        clearcoopers(repname);
                    }
                    location.reload();
                }
            }, error:function (json)
            {
                isreturnback = false;
                if(json.status == 400){
                    if($.parseJSON(json.responseText).code==1012){
                        $('.ispublicrepo').html(thisispublic);
                        $('.xiugaireperror').show();
                    }else if($.parseJSON(json.responseText).code==1008){
                        $('.repnameerror').html('Repository名称重复').addClass('errorMess').removeClass('successMess').stop(true).show(100).delay(1000).fadeOut(400);
                        return;
                    }else{
                        $('#addalertbox').html("您创建的"+repname+"有误,请重新创建").addClass('errorMess').removeClass('successMess').stop(true).show(100).delay(1000).fadeOut(400);
                        return;
                    }
                }

            }
        });
        if(isreturnback == false){
            return;
        }
        $('#addRep').modal('toggle');
        $('.xiugaireperror').hide();
    });
})
