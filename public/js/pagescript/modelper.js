/**
 * Created by Administrator on 2016/3/10.
 */
function publicper(thisJson){
    var permissionJson = {
            ////////////////////////////////////得到白名单
            getpermission : function(reponame,pages){
                    var  permission = '';
                    $.ajax({
                        url: "/api/permission/"+reponame+"?page="+pages+"&size=6",
                        type: "get",
                        cache: false,
                        async: false,
                        dataType: 'json',
                        headers: thisJson.headerToken,
                        success: function (json) {
                            if (json.code == 0) {
                                permission = json.data;
                            }
                            return permission;
                        },
                        error:function (XMLHttpRequest, textStatus, errorThrown)
                        {
                            if(XMLHttpRequest.status == 400){
                                permission = 'error';
                            }

                        }
                    });
                    return permission;

            },
        //////////////////////////////////得到协作者名单
        getcooperator : function(reponame,pages){
                var  permission = '';
                $.ajax({
                    url:"/api/permission/"+reponame+"?&size=6&page="+pages+"&cooperator=1",
                    type: "get",
                    cache: false,
                    async: false,
                    dataType: 'json',
                    headers: thisJson.headerToken,
                    success: function (json) {
                        if (json.code == 0) {
                            permission = json.data;
                        }
                        return permission;
                    },
                    error:function (XMLHttpRequest, textStatus, errorThrown)
                    {
                        if(XMLHttpRequest.status == 400){
                            permission = 'error';
                        }
                        return permission;
                    }
                });
                      return permission;

        },
        //////////////////////////////////填充白名单列表
        addpomitionhtml:function(preCon,isper,appendobj,isdelcoo){
            if(preCon == 'error'){
                $(appendobj).empty();
                return;
            }
            $(appendobj).empty();
            var len = preCon.permissions.length;
            for (var i = 0; i < len; i++) {
                var isper = isper;
                var delthispomition;
                var checkinput = '';
                if(isper == 0){
                    delthispomition = '<div class="delthisper"><a class="delper" href="javaScript:void(0);" datareponame="'+ preCon.permissions[i].username +'">[删除]</a></div>';
                    if(isdelcoo == 'cooper'){
                        delthispomition = '<div class="delthisper"><a class="delcooper" href="javaScript:void(0);" datareponame="'+ preCon.permissions[i].username +'">[删除]</a></div>';
                    }else if(thisJson.repIspublic == 'public' && thisJson.iscooper == '1'){
                        delthispomition = '<div class="delthisper"><a class="delpubcooper" href="javaScript:void(0);" datareponame="'+ preCon.permissions[i].username +'">[删除]</a></div>';
                    }
                    checkinput = '';
                }else{
                    delthispomition = '';
                    checkinput = "<input class='ischeck' style='margin-left:10px;' type='checkbox' name='users'>";
                }
                var thisstr = "<div class='perList' datareponame='"+ preCon.permissions[i].username +"'>"+
                    "<div class='perListcon'>"+
                    checkinput+
                    //"<input class='ischeck' style='margin-left:10px;margin-right:6px;' type='checkbox' name='users'>" +
                     '<span style="margin-left:15px;">'+preCon.permissions[i].username+"</span>" +
                    "</div>"+delthispomition+
                    "</div>"
                $(appendobj).append(thisstr);
            }


         },
        // 判断是协作者或白名单并且判断repo是否为公开；
        pagesFun : function(){
            if(thisJson.iscooper == '1' && thisJson.repIspublic == 'public'){
                var thiscon = this.getcooperator(thisJson.thisreponame,thisJson.thispages);
                var total;
                if(thiscon == 'error'){
                    total = 0;
                }else{
                    total = thiscon.total;
                }

                this.addpomitionhtml(thiscon,0,thisJson.appendobj);
                $('.'+thisJson.thisreponame).html('协作者管理（'+total+'）');
                $(thisJson.pageobj).pagination(total, {
                    maxentries:total,
                    items_per_page:6,
                    num_display_entries:3,
                    num_edge_entries:2,
                    prev_text:"上一页",
                    next_text:"下一页",
                    ellipse_text:"...",
                    link_to:"javascript:void(0)",
                    callback:this.callBackFun,
                    load_first_page:false
                });
            }else if(thisJson.iscooper == '2' && thisJson.repIspublic == 'private'){
                var thiscon = this.getpermission(thisJson.thisreponame,thisJson.thispages);
                var total;
                if(thiscon == 'error'){
                    total = 0;
                }else{
                    total = thiscon.total;
                }
                this.addpomitionhtml(thiscon,0,thisJson.appendobj);
                $('.baimingdan'+thisJson.thisreponame).html('白名单管理（'+total+'）');
                $(thisJson.pageobj).pagination(total, {
                    maxentries:total,
                    items_per_page:6,
                    num_display_entries:3,
                    num_edge_entries:2,
                    prev_text:"上一页",
                    next_text:"下一页",
                    ellipse_text:"...",
                    link_to:"javascript:void(0)",
                    callback:this.callBackFun,
                    load_first_page:false
                });
            }else if(thisJson.iscooper == '1' && thisJson.repIspublic == 'cooper' && thisJson.isAddcooper == 'no') {
                var thispercon = this.getpermission(thisJson.thisreponame, thisJson.thispages);
                var thiscoocon = this.getcooperator(thisJson.thisreponame, thisJson.thispages);
                var pertotal = thispercon.total;
                var coototal = thiscoocon.total;
                this.addpomitionhtml(thiscoocon, 0, thisJson.cooappendobj, thisJson.repIspublic);
                this.addpomitionhtml(thispercon, 1, thisJson.perappendobj, thisJson.repIspublic);
                $(thisJson.perpageobj).pagination(pertotal, {
                    maxentries: pertotal,
                    items_per_page: 6,
                    num_display_entries: 3,
                    num_edge_entries: 2,
                    prev_text: "上一页",
                    next_text: "下一页",
                    ellipse_text: "...",
                    link_to: "javascript:void(0)",
                    callback: this.percallBackFun,
                    load_first_page: false
                });
                $(thisJson.coopageobj).pagination(coototal, {
                    maxentries: coototal,
                    items_per_page: 6,
                    num_display_entries: 3,
                    num_edge_entries: 2,
                    prev_text: "上一页",
                    next_text: "下一页",
                    ellipse_text: "...",
                    link_to: "javascript:void(0)",
                    callback: this.coocallBackFun,
                    load_first_page: false
                });
            }
            else if(thisJson.iscooper == '1' && thisJson.repIspublic == 'cooper' && thisJson.isAddcooper == 'yes'){
                var thiscoocon = this.getcooperator(thisJson.thisreponame,thisJson.thispages);
                var coototal = 0;
                if(thiscoocon == 'error'){
                    coototal = 0;
                }else{
                    coototal = thiscoocon.total;
                }
                $('.'+thisJson.thisreponame).html('协作者管理（'+coototal+'）');

                this.addpomitionhtml(thiscoocon,0,thisJson.cooappendobj,thisJson.repIspublic);
                $(thisJson.coopageobj).pagination(coototal, {
                    maxentries:coototal,
                    items_per_page:6,
                    num_display_entries:3,
                    num_edge_entries:2,
                    prev_text:"上一页",
                    next_text:"下一页",
                    ellipse_text:"...",
                    link_to:"javascript:void(0)",
                    callback:this.coocallBackFun,
                    load_first_page:false
                });
            }


        },
        perInit : function(){
                this.pagesFun();
        },
        callBackFun : function(new_page_index){
            var that = publicper(thisJson);
            $(thisJson.appendobj).empty();
            thisJson.thispages = new_page_index+1;
            if(thisJson.iscooper == '1' && thisJson.repIspublic == 'public') {
                var thiscon = that.getcooperator(thisJson.thisreponame, thisJson.thispages);
                that.addpomitionhtml(thiscon, 0,thisJson.appendobj);
            }else if(thisJson.iscooper == '2' && thisJson.repIspublic == 'private'){
                var thiscon = that.getpermission(thisJson.thisreponame, thisJson.thispages);
                that.addpomitionhtml(thiscon, 0,thisJson.appendobj);
            }
        },
        percallBackFun : function(new_page_index){
            var that = publicper(thisJson);
            $(thisJson.perappendobj).empty();
            thisJson.thispages = new_page_index+1;
            var thiscon = that.getpermission(thisJson.thisreponame, thisJson.thispages);
            that.addpomitionhtml(thiscon, 1,thisJson.perappendobj);

        },
        coocallBackFun : function(new_page_index){
            var that = publicper(thisJson);
            $(thisJson.cooappendobj).empty();
            thisJson.thispages = new_page_index+1;
            var thiscon = that.getcooperator(thisJson.thisreponame, thisJson.thispages);
            that.addpomitionhtml(thiscon, 0,thisJson.cooappendobj,thisJson.repIspublic);

        },
        ///////////////////////////////新增白名单//////////////////////////////////
        addpomitionorcoo:function(username,errorobj,tihsreponame,ispublic){
                 var that = this;
                 var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                 var userjson = {};
                 if(username == ''){
                     $(errorobj).html('请输入邮箱').addClass('errorMess').removeClass('successMess').stop(true).show(100).delay(1000).fadeOut(400);
                     return false;
                 }else if(!filter.test(username)){
                     $(errorobj).html('您输入的邮箱格式不正确，请重新输入').addClass('errorMess').removeClass('successMess').stop(true).show(100).delay(1000).fadeOut(400);
                     return false;
                 }else if(this.checkloginusers(username) == 1){
                     $(errorobj).html('您输入的邮箱不存在，请重新输入').addClass('errorMess').removeClass('successMess').stop(true).show(100).delay(1000).fadeOut(400);
                     return false;
                 }else if($.cookie("tname") == username){
                     $(errorobj).html('不能添加自己').addClass('errorMess').removeClass('successMess').stop(true).show(100).delay(1000).fadeOut(400);
                     return false;
                 }else{
                     if(ispublic == 'public'){
                         if(this.checkname(tihsreponame,username) == 2){
                             $(errorobj).html('已添加该用户').addClass('errorMess').removeClass('successMess').stop(true).show(100).delay(1000).fadeOut(400);
                             return false;
                         }
                         userjson = {
                             "username":username,
                             "opt_permission":1
                         }
                     }else{
                         if(this.checkname(tihsreponame,username) == 2){
                             $(errorobj).html('已添加该用户').addClass('errorMess').removeClass('successMess').stop(true).show(100).delay(1000).fadeOut(400);
                             return false;
                         }
                         userjson = {
                             "username":username
                         }
                     }
                     $.ajax({
                         type:"put",
                         url:"/api/permission/"+tihsreponame,
                         cache:false,
                         dataType:'json',
                         async:false,
                         headers:thisJson.headerToken,
                         data:JSON.stringify(userjson),
                         success: function(adduser){
                             if(ispublic == 'public'){
                                 $(errorobj).html('成功添加协作者').addClass('successMess').removeClass('errorMess').stop(true).show(100).delay(1000).fadeOut(400);
                                 that.perInit();

                             }else{
                                 $(errorobj).html('成功添加白名单').addClass('successMess').removeClass('errorMess').stop(true).show(100).delay(1000).fadeOut(400);
                                 that.perInit();
                             }
                         }
                     });
                 }
        },
        //搜索白名单
        searchPer : function(curUser,searchnum,errObj){
            var thisrepoName =  thisJson.thisreponame;
            var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if(curUser == ''){
                $(errObj).html('请输入邮箱').addClass('errorMess').removeClass('successMess').stop(true).show(100).delay(1000).fadeOut(400);
                return false;
            }else if(!filter.test(curUser)){
                $(errObj).html('您输入的邮箱格式不正确').addClass('errorMess').removeClass('successMess').stop(true).show(100).delay(1000).fadeOut(400);
                return false;
            }else if(this.checkloginusers(curUser) == 1){
                $(errObj).html('您输入的邮箱不存在，请重新输入').addClass('errorMess').removeClass('successMess').stop(true).show(100).delay(1000).fadeOut(400);
                return false;
            }else if($.cookie("tname") == curUser){
                $('#mess').html('不能搜索自己').addClass('errorMess').removeClass('successMess').stop(true).show(100).delay(1000).fadeOut(400);
                return false;
            }
            $.ajax({
                type:"GET",
                url: '/api/permission/'+thisrepoName +'?username='+curUser,
                cache: false,
                headers:thisJson.headerToken,
                success: function (datas) {
                    if(datas.code == 0){
                        if(datas.data.permissions.length > 0){
                            if(searchnum == 0){
                            var thisstr = "<div class='perList' datareponame='"+ datas.data.permissions[0].username +"'>"+
                                "<div class='perListcon'><span style='left:15px;'>"+ datas.data.permissions[0].username + "</span></div>"+
                                '<div class="delthisper"><a class="delper" href="javaScript:void(0);" datareponame="'+ datas.data.permissions[0].username +'">[删除]</a></div>'+
                                "</div>"
                            $('.pages').pagination(0, {
                                maxentries:0,
                                items_per_page:6,
                                num_display_entries:3,
                                num_edge_entries:2,
                                prev_text:"上一页",
                                next_text:"下一页",
                                ellipse_text:"...",
                                link_to:"javascript:void(0)",
                                callback:this.coocallBackFun,
                                load_first_page:false
                            });
                            $("#modalRep_list").empty().append(thisstr);
                            $('.gobackWrop').show();
                            }else if(searchnum==1){
                                var thisstr = "<div class='perList' datareponame='"+ datas.data.permissions[0].username +"'>"+
                                    "<div class='perListcon'><span style='left:15px;'>"+ datas.data.permissions[0].username + "</span></div>"+
                                    "</div>"
                                $(thisJson.perpageobj).pagination(0, {
                                    maxentries:0,
                                    items_per_page:6,
                                    num_display_entries:3,
                                    num_edge_entries:2,
                                    prev_text:"上一页",
                                    next_text:"下一页",
                                    ellipse_text:"...",
                                    link_to:"javascript:void(0)",
                                    callback:this.percallBackFun,
                                    load_first_page:false
                                });
                                $('#perListBox').empty().append(thisstr);
                                $('.gobackbtnwropcoo').show();
                            }else if(searchnum ==2){
                                var thisstr = "<div class='perList' datareponame='"+ datas.data.permissions[0].username +"'>"+
                                    "<div class='perListcon'><span style='left:15px;'>"+ datas.data.permissions[0].username + "</span></div>"+
                                    '<div class="delthisper"><a class="delcooper" href="javaScript:void(0);" datareponame="'+ datas.data.permissions[0].username +'">[删除]</a></div>'+
                                    "</div>"
                                $(thisJson.coopageobj).pagination(0, {
                                    maxentries:0,
                                    items_per_page:6,
                                    num_display_entries:3,
                                    num_edge_entries:2,
                                    prev_text:"上一页",
                                    next_text:"下一页",
                                    ellipse_text:"...",
                                    link_to:"javascript:void(0)",
                                    callback:this.coocallBackFun,
                                    load_first_page:false
                                });
                                $(thisJson.cooappendobj).empty().append(thisstr);
                                $('.privategobackbtnwrop').show();
                            }else if(searchnum == 3){
                                var thisstr = "<div class='perList' datareponame='"+ datas.data.permissions[0].username +"'>"+
                                    "<div class='perListcon'><span style='left:15px;'>"+ datas.data.permissions[0].username + "</span></div>"+
                                    '<div class="delthisper"><a class="delpubcooper" href="javaScript:void(0);" datareponame="'+ datas.data.permissions[0].username +'">[删除]</a></div>'+
                                    "</div>"
                                $('.coopages').pagination(0, {
                                    maxentries:0,
                                    items_per_page:6,
                                    num_display_entries:3,
                                    num_edge_entries:2,
                                    prev_text:"上一页",
                                    next_text:"下一页",
                                    ellipse_text:"...",
                                    link_to:"javascript:void(0)",
                                    callback:this.coocallBackFun,
                                    load_first_page:false
                                });
                                $("#modalpubRep_list").empty().append(thisstr);
                                $('.gobackWropcoo').show();
                            }
                        }
                    }
                },
                error:function (XMLHttpRequest, textStatus, errorThrown)
                {
                    if(XMLHttpRequest.status == 400){
                        $('#mess').html('该用户不在白名单').addClass('errorMess').removeClass('successMess').stop(true).show(100).delay(1000).fadeOut(400);
                    }

                }
            });
        },
        ////////////////////////////////////////////////////////////单个删除白名单
     delOne : function(thisrepoName,thisusername,iscoo){
        var that = this ;
        var iswhite = '';
            if(iscoo == '2'){
                iswhite = 'whitelist';
            }else if(iscoo == '1'){
                iswhite = 'cooperator';
            }
        $.ajax({
            type:"DELETE",
            url:"/api/permission/"+thisrepoName+"/"+iswhite+"/"+thisusername,
            cache:false,
            headers:thisJson.headerToken,
            success: function(deluser){
                if(deluser.code == 0){
                    $('#mess').html('删除成功').addClass('successMess').removeClass('errorMess').stop(true).show(100).delay(1000).fadeOut(400);
                    if(iscoo == '2'){
                        thisJson.thispages = '1';
                        that.perInit();
                    }else if(iscoo == '1'){
                        thisJson.thispages = '1';
                        that.perInit();
                    }
                    $('.isdelperBox').hide();
                }
            },error:function (XMLHttpRequest, textStatus, errorThrown)
            {
                if(iscoo == '1' && XMLHttpRequest.status == 400 && $.parseJSON(XMLHttpRequest.responseText).code == 1014){
                    $('.isdelperBox').hide();
                    $('#nodelPremissionCon').html('无法删除选中的协作者，协作者删除发布的数据后方可删除写作者。');
                    $('.noisdelperBox').show()
                }

            }
        });
    },
     ///////////////////////////////////////////////////////清空白名单
     delallper : function (repname,iscoo){
         var iswhite = '';
         if(iscoo == '2'){
             iswhite = 'whitelist';
         }else if(iscoo == '1'){
             iswhite = 'cooperator';
         }
        $.ajax({
            type:"DELETE",
            url:"/api/permission/"+repname+'/'+iswhite+"/username?delall=1",
            cache:false,
            dataType:'json',
            headers:thisJson.headerToken,
            success: function(deluser){
                if(deluser.code == 0){
                    if(iscoo == '2'){
                        $(thisJson.appendobj).empty();
                        $('.pages').pagination(0, {
                            maxentries:0,
                            items_per_page:6,
                            num_display_entries:3,
                            num_edge_entries:2,
                            prev_text:"上一页",
                            next_text:"下一页",
                            ellipse_text:"...",
                            link_to:"javascript:void(0)",
                            callback:this.callBackFun,
                            load_first_page:false
                        });
                    }else if(iscoo == '1'){
                        $(thisJson.cooappendobj).empty();
                        $(thisJson.coopageobj).pagination(0, {
                            maxentries:0,
                            items_per_page:6,
                            num_display_entries:3,
                            num_edge_entries:2,
                            prev_text:"上一页",
                            next_text:"下一页",
                            ellipse_text:"...",
                            link_to:"javascript:void(0)",
                            callback:this.callBackFun,
                            load_first_page:false
                        });
                        $("."+repname).html("协作者管理（0）");
                    }

                }
            }
        });
    },
      ////批量删除协作者白名单
     delmoreFun : function(reponem,iscoo){
         var iswhite = '';
         var listBox = '';
         if(iscoo == '2'){
             iswhite = 'whitelist';
             listBox = thisJson.appendobj;
         }else if(iscoo == '1'){
             iswhite = 'cooperator';
             listBox = thisJson.cooappendobj;
         }
         var thisusername = [];
         var isdele = false;
         var namejson = {}
         var lilist = $(listBox+'>div');
         for(var i = 0;i<lilist.length;i++){
             if($(listBox+'>div').eq(i).find('.ischeck').is(':checked')==true){
                 var thisval = $(lilist[i]).attr("datareponame");
                 namejson[$(listBox+'>div').eq(i).index()] = thisval;
                 thisusername.push(thisval);
             }
         }
         if(thisusername.length>0){
             var perCount=0;
             for(var j in namejson){
                 perCount++;
                 $.ajax({
                     type:"DELETE",
                     url:"/api/permission/"+reponem+"/"+iswhite+"/"+namejson[j],
                     cache:false,
                     dataType:'json',
                     headers:thisJson.headerToken,
                     success: function(deluser){
                         if(deluser.code == 0){
                             isdele = true;
                         }
                     }
                 })
             };
             if(isdele = true){
                 $('#mess').html('删除成功').addClass('successMess').removeClass('errorMess').stop(true).show(100).delay(1000).fadeOut(400);
                 this.perInit();
             }
         }

     },
     /////批量添加协作者
      addMoreFuncooper : function(repname){
          var that = this;
          var thisusername = [];
          var lilist = $('#perListBox>div');
          for(var i = 0;i<lilist.length;i++){
              var namejson = {}
              if((lilist).eq(i).find('.ischeck').is(':checked')==true){
                  var thisval = $(lilist[i]).attr("datareponame");
                  namejson['username'] = thisval;
                  namejson['opt_permission'] = 1;
                  thisusername.push(namejson);
              }
          }
          if(thisusername.length>0){
              var count=0;
              for(var j = 0; j<thisusername.length;j++){
                  // alert(j)
                  count++;
                  $.ajax({
                      type:"put",
                      url:"/api/permission/"+repname,
                      cache:false,
                      dataType:'json',
                      data:JSON.stringify(thisusername[j]),
                      headers:{ Authorization:"Token "+$.cookie("token") },
                      success: function(deluser){
                          if(deluser.code == 0){
                              that.perInit();

                          }
                      }
                  })
              };

              //perTongXie(thisrepoName,"add",count);

          }
      },
    ////////////////////////////验证是否已经添加该用户/////////////////////////////////
    checkname : function(repname,curusername){
        var iscurname = 1;
        $.ajax({
            type:"GET",
            url: '/api/permission/'+repname +'?username='+curusername,
            cache: false,
            async:false,
            headers:thisJson.headerToken,
            success: function (datas) {
                if(datas.code == 0 && datas.data.permissions.length>0){
                    if(datas.data.permissions[0].username == curusername){
                        iscurname = 2;
                    }
                }
            },
            error:function (XMLHttpRequest, textStatus, errorThrown)
            {
                if(XMLHttpRequest.status == 400){
                    iscurname = 1;
                }

            }
        });
        return iscurname;
     },
        ////////////////////////////验证用户已经注册/////////////////////////////////
    checkloginusers : function(loginusers){
            var isloginusers = 1;
            $.ajax({
                url: "/api/users/"+loginusers ,
                type: "get",
                cache: false,
                async: false,
                headers: thisJson.headerToken,
                datatype: 'json',
                success:function(json){
                    if(json.code == 0){
                        isloginusers = 2;
                    }
                },
                error:function (json)
                {
                    if(json.status == 400){

                    }

                }
            });
            return isloginusers;
    }


    }
    return permissionJson;
}