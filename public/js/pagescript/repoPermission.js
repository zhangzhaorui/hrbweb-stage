$(function(){
    var thisbody = $('body');
    var alertBox = appendAlertBox();
    alertBox.appendperstr(thisbody);
    alertBox.appendcoopubstr(thisbody);
    alertBox.appendcoopristr(thisbody);
    alertBox.appendAddrepstr(thisbody);
    ///////白名单分页得到所有白名单
    var availableTags = [];
    function getAllPermission(reponame){
        var  allPermission = '';
        $.ajax({
            url: "/api/permission/"+reponame+"?size=-1",
            type: "get",
            cache: false,
            async: false,
            dataType: 'json',
            headers:{Authorization: "Token " + $.cookie("token")},
            success: function (json) {
                if (json.code == 0) {
                    allPermission = json.data;
                    for(var i = 0;i<json.data.total;i++){
                        availableTags.push(json.data.permissions[i].username);
                    }
                }
            },
            error:function (XMLHttpRequest, textStatus, errorThrown)
            {
                if(XMLHttpRequest.status == 400){
                    availableTags = [];
                }

            }
        });
    }

    ////////////////////////////////得到协作者名单
    function getAllcooperator(reponame){
        var  allPermission = '';
        $.ajax({
            url:"/api/permission/"+reponame+"?&size=-1&cooperator=1",
            type: "get",
            cache: false,
            async: false,
            dataType: 'json',
            headers: {Authorization: "Token " + $.cookie("token")},
            success: function (json) {
                if (json.code == 0) {
                    allPermission = json.data;
                    for(var i = 0;i<json.data.total;i++){
                        availableTags.push(json.data.permissions[i].username);
                    }
                }
            },
            error:function (XMLHttpRequest, textStatus, errorThrown)
            {
                if(XMLHttpRequest.status == 400){
                    availableTags = [];
                }
            }
        });
    }
    ///白名单json
    var json1 = {
        'headerToken' : {Authorization: "Token " + $.cookie("token")},// token
        'thisreponame' : '',//repo名称
        'repIspublic' : 'private',//repo是否为开放，public或private；
        'thispages' : '1',// 默认第几页
        'iscooper': '2', // 是为协作，1是添加共有协作，2是添加私有白名单；
        'pageobj' : '.pages',
        'appendobj' :'#modalRep_list'
    }
    // 白名单管理

    $(document).on('click','.baimingdan',function() {
        availableTags = [];
        var datareponame = $(this).attr('datareponame');
        $('#myModalPer').attr('modal-reponame',datareponame)
        json1.thisreponame = datareponame;
        getAllPermission(datareponame);
        $( "#emailTest" ).autocomplete({
            source: availableTags
        });
        var mypublish = publicper(json1);
        mypublish.perInit();
        $('#myModalPer').modal('toggle');
    });

    // 添加白名单
    $(document).on('click','#inList',function(){
        var username = $.trim($('#emailTest').val());
        var repname = $('#myModalPer').attr('modal-reponame');
        var mypublish = publicper(json1);
        mypublish.addpomitionorcoo(username,'#mess',repname,'private');
    });
    //搜索白名单
    $(document).on('click','#seList',function(){
        var username = $.trim($('#emailTest').val());
        var mypublish = publicper(json1);
        mypublish.searchPer(username,0,'#mess');
    });
   // 白名单返回按钮
    $(document).on('click','.back_btn',function(){
        var repname = $('#myModalPer').attr('modal-reponame');
        json1.thisreponame = repname;
        var mypublish = publicper(json1);
        mypublish.perInit();
        $('.gobackWrop').hide();
    });
    // 单个删除白名单
    $(document).on('click','.delper',function(){
        var username = $(this).attr('datareponame');
        //var repname = $('#myModalPer').attr('modal-reponame');
        //json1.thisreponame = repname;
        //var mypublish = publicper(json1);
        //mypublish.delOne(json1.thisreponame,username,json1.iscooper)
        $('.yesdelper').attr('datadelper','1');
        $('.yesdelper').attr('datadeluser',username);
        $('.isdelperBox').show();
        $('#delPremissionCon').html('您确认删除选中的白名单吗？')
    })
    // 清空白名单
    $(document).on('click','.delAll',function(){
        var repname = $('#myModalPer').attr('modal-reponame');
        json1.thisreponame = repname;
        var mypublish = publicper(json1);
        mypublish.delallper(json1.thisreponame,json1.iscooper);
    })
    // 批量删除白名单
    $(document).on('click','.delmore',function(){
        var repname = $('#myModalPer').attr('modal-reponame');
        json1.thisreponame = repname;
        var mypublish = publicper(json1);
        mypublish.delmoreFun(json1.thisreponame,json1.iscooper);
    });
    // 共有协作者json
    var json2 = {
        'headerToken' : {Authorization: "Token " + $.cookie("token")},// token
        'thisreponame' : '',//repo名称
        'repIspublic' : 'public',//repo是否为开放，public或private；
        'thispages' : '1',// 默认第几页
        'iscooper': '1', // 是为协作，1是添加共有协作，2是添加私有白名单；
        'pageobj' : '.coopages',
        'appendobj' :'#modalpubRep_list',
        'cooappendobj':'#modalpubRep_list',
    }
    var json3 = {
        'headerToken' : {Authorization: "Token " + $.cookie("token")},// token
        'thisreponame' : '',//repo名称
        'repIspublic' : 'cooper',//repo是否为开放，public或private；
        'thispages' : '1',// 默认第几页
        'iscooper': '1', // 是为协作，1是添加共有协作，2是添加私有白名单；
        'pageobj' : '.coopages',
        'appendobj' :'#modalpubRep_list',
        'cooappendobj':'#cooListBox',
        'perappendobj':'#perListBox',
        'perpageobj':'.perpage',
        'coopageobj':'.coopage',
        'isAddcooper': ''
    }
    // 协作者管理
    var cooIspublic = ''
    $(document).on('click','.xiezuozhe',function() {
        availableTags = [];
        var datareponame = $(this).attr('datareponame');
        $('#myModalPer').attr('modal-reponame',datareponame);
         cooIspublic = $(this).attr('dataispublic');
        if(cooIspublic == 'public'){
            json2.thisreponame = datareponame;
            getAllcooperator(datareponame);
            $( "#emailTestcoo" ).autocomplete({
                source: availableTags
            });
            var mypublish = publicper(json2);
            mypublish.perInit();
            $('#myModalCooper').attr('modal-reponame',datareponame)
            $('#myModalCooper').modal('toggle');
        }else{
            json3.thisreponame = datareponame;
            json3.thispages = '1';
            json3.isAddcooper = 'no';
            var mypublish = publicper(json3);
            mypublish.perInit();
            $('#myModalPriCooper').attr('modal-reponame',datareponame)
            $('#myModalPriCooper').modal('toggle');
        }

    });
    // 添加公开协作
    $(document).on('click','#inListcoo',function(){
        var username = $.trim($('#emailTestcoo').val());
        var repname = $('#myModalCooper').attr('modal-reponame');
        var mypublish = publicper(json2);
        mypublish.addpomitionorcoo(username,'#messcoo',repname,'public');
    });
    //搜索公开协作
    $(document).on('click','#seListcoo',function(){
        var username = $.trim($('#emailTestcoo').val());
        var test = publicper(json2);
        test.searchPer(username,3,'#messcoo');
    });
    // 公开协作返回按钮
    $(document).on('click','.back_btncoo',function(){
        var repname = $('#myModalCooper').attr('modal-reponame');
        json2.thisreponame = repname;
        var mypublish = publicper(json2);
        mypublish.perInit();
        $('.gobackWropcoo').hide();
    });
    // 单个删除公开协作
    $(document).on('click','.delpubcooper',function(){
        var username = $(this).attr('datareponame');
        $('.yesdelper').attr('datadeluser',username);
        $('.yesdelper').attr('datadelper','2');
        $('.isdelperBox').show();
        $('#delPremissionCon').html('您确认删除选中的协作者吗？')
    })
    // 清空公开协作
    $(document).on('click','.delAllcoo',function(){
        var repname = $('#myModalCooper').attr('modal-reponame');
        json2.thisreponame = repname;
        var mypublish = publicper(json2);
        mypublish.delallper(json2.thisreponame,json2.iscooper);
    })
    // 批量删除公开协作
    $(document).on('click','.delmorecoo',function(){
        var mypublish = publicper(json2);
        var repname = $('#myModalCooper').attr('modal-reponame');
        json2.thisreponame = repname;
        mypublish.delmoreFun(json2.thisreponame,json2.iscooper);
    });
    $('#searchpomisionemailTest').click(function(){
        var mypublish = publicper(json3);
        var repname = $('#myModalPriCooper').attr('modal-reponame');
        json3.thisreponame = repname;
        var username =   $.trim($('#privatepomision').val());
        mypublish.searchPer(username,1,'#messcooperatorprivate');
    })
    $(document).on('click','.gobackcooperator',function(){
        json3.thispages = '1';
        var mypublish = publicper(json3);
        mypublish.perInit();
        $('.gobackbtnwropcoo').hide();

    })
    //批量添加协作者
    $(document).on('click','#addpricoo',function(){
        var repname = $('#myModalPriCooper').attr('modal-reponame');
        json3.thispages = '1';
        json3.isAddcooper = 'yes';
        var mypublish = publicper(json3);
        mypublish.addMoreFuncooper(repname,'#perappendobj');
    })
    //单个删除私有协作者
    $(document).on('click','.delcooper',function(){
        var username = $(this).attr('datareponame');
        $('.yesdelper').attr('datadeluser',username);
        $('.yesdelper').attr('datadelper','3');
        $('.isdelperBox').show();
        $('#delPremissionCon').html('您确认删除选中的协作者吗？')
    })
    //清空私有协作者
    $(document).on('click','#delallcooper',function(){
        var repname = $('#myModalPriCooper').attr('modal-reponame');
        json3.thisreponame = repname;
        var mypublish = publicper(json3);
        mypublish.delallper(repname,'1');
    })
    //批量删除私有协作者
    $(document).on('click','#delmorecooper',function(){
        var repname = $('#myModalPriCooper').attr('modal-reponame');
        json3.thisreponame = repname;
        var mypublish = publicper(json3);
        mypublish.delmoreFun(json3.thisreponame,json3.iscooper);
    })
    //搜索私有协作者
    $(document).on('click','#searchcooper',function(){
        var username = $.trim($('#privatecooper').val());
        var mypublish = publicper(json3);
        mypublish.searchPer(username,2,'#messcooper');
    })
    //
    $(document).on('click','.gobackprivatecooperList',function(){
        var mypublish = publicper(json3);
        mypublish.perInit();
        $('.privategobackbtnwrop').hide();
    })
    $(document).on('click','.nodelper,.closedelper',function(){
            $('.isdelperBox').hide();
    });
    $(document).on('click','.closenodelper,.colsenodelbox',function(){
        $('.noisdelperBox').hide();
    });
    $(document).on('click','.yesdelper',function(){
        var datadelper = $(this).attr('datadelper');
        var datadeluser = $(this).attr('datadeluser');
        if(datadelper == '1'){
            var repname = $('#myModalPer').attr('modal-reponame');
            json1.thisreponame = repname;
            var mypublish = publicper(json1);
            mypublish.delOne(json1.thisreponame,datadeluser,json1.iscooper)
        }else if(datadelper == '2'){
            var repname = $('#myModalCooper').attr('modal-reponame');
            json2.thisreponame = repname;
            var mypublish = publicper(json2);
            mypublish.delOne(json2.thisreponame,datadeluser,json2.iscooper)
        }else if(datadelper == '3'){
            var repname = $('#myModalPriCooper').attr('modal-reponame');
            json3.thisreponame = repname;
            var mypublish = publicper(json3);
            mypublish.delOne(json3.thisreponame,datadeluser,json3.iscooper)
        }
    })
})