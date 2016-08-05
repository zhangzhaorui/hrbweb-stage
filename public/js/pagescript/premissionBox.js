/**
 * Created by Administrator on 2016/3/15.
 */
    function appendAlertBox(){
        var alertBox = {
            appendperstr : function(obj){
                    var str = '<div class="modal fade" id="myModalPer" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"  modal-repoName="">'+
                        '<div class="modal-dialog">'+
                        '<div class="modal-content" style="padding:30px;width:600px;float: left;height: auto;">'+
                        '<div class="modal-header" style="border-bottom:0px;padding: 0px;">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'+
                        '<h4 class="modal-title" id="myModalLabel">白名单管理</h4>'+
                        '</div>'+
                        '<div class="pomisiondelwrop ui-widget">'+
                        '<div style="color:#666;margin-top:8px;">加入白名单的用户，具有查看此私有Repository的权限</div>'+
                        '<div style="height: 30px;text-align: left;">'+
                        '<span style="" class="" id="mess"></span>'+
                        '</div>'+
                        '<input type="text" placeholder="请输入白名单用户的注册邮箱" id="emailTest" class="form-control emailInput">'+
                        '<button id="inList" class="btn btn-primary perBtn">&lt;&lt;添加到白名单</button>'+
                        '<button id="seList" class="btn btn-primary perBtn">在列表中查找</button>'+
                        '</div>'+
                        '<div style="width: 100%;overflow: hidden">'+
                        //'<span class="delmore">[删除]</span>'+
                        //'<span class="delAll">[清空白名单]</span>'+
                        '</div>'+
                        '<div class="" id="modalRep_list" style="padding:0px;">'+
                        '<div datareponame="" class="perList">'+
                        '<div class="perListcon"><input type="checkbox" name="users" class="ischeck" style="margin:0px 6px 0px 10px">caory@asiainfo.com</div>'+
                        '<div class="delthisper"><a datareponame="" href="javaScript:void(0)" class="delper">[删除]</a></div>'+
                        '</div>'+
                        '</div>'+
                        '<div class="pages"></div>'+
                        '<div class="gobackWrop"><span class="back_btn">[返回]</span></div>'
                        '</div>'+
                        '</div>'+
                        '</div>'
                    $(obj).append(str)
            },
            appendcoopubstr : function(obj){
                var str = '<div class="modal fade" id="myModalCooper" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"  modal-repoName="">'+
                    '<div class="modal-dialog">'+
                    '<div class="modal-content" style="padding:30px;width:600px;float: left;height: auto;">'+
                    '<div class="modal-header" style="border-bottom:0px;padding: 0px;">'+
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'+
                    '<h4 class="modal-title" id="myModalLabel">协作者管理</h4>'+
                    '</div>'+
                    '<div class="pomisiondelwrop ui-widget">'+
                    '<div style="color:#666;margin-top:8px;">作为数据提供方可以邀请他人在Repository下发布DataItem</div>'+
                    '<div style="height: 30px;text-align: left;">'+
                    '<span style="" class="" id="messcoo"></span>'+
                    '</div>'+
                    '<input type="text" placeholder="请输入协作者用户的注册邮箱" id="emailTestcoo" class="form-control emailInput">'+
                    '<button id="inListcoo" class="btn btn-primary perBtn">&lt;&lt;添加到协作者</button>'+
                    '<button id="seListcoo" class="btn btn-primary perBtn">在列表中查找</button>'+
                    '</div>'+
                    '<div style="width: 100%;overflow: hidden">'+
                    //'<span class="delmorecoo">[删除]</span>'+
                    //'<span class="delAllcoo">[清空协作者]</span>'+
                    '</div>'+
                    '<div class="" id="modalpubRep_list" style="padding:0px;">'+
                    '<div datareponame="" class="perList">'+
                    '<div class="perListcon"><input type="checkbox" name="users" class="ischeck" style="margin:0px 6px 0px 10px">caory@asiainfo.com</div>'+
                    '<div class="delthisper"><a datareponame="" href="javaScript:void(0)" class="delper">[删除]</a></div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="coopages"></div>'+
                    '<div class="gobackWropcoo"><span class="back_btncoo">[返回]</span></div>'
                    '</div>'+
                    '</div>'+
                    '</div>'
                    $(obj).append(str)
            },
            appendcoopristr : function(obj){
                var str = '<div class="modal fade" id="myModalPriCooper" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"  modal-repoName="">'+
                    '<div class="modal-dialog">'+
                    '<div class="modal-content" style="padding:30px;width:800px;float: left;height: auto;">'+
                    '<div class="modal-header" style="border-bottom:0px;padding: 0px;">'+
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'+
                    '<h4 class="modal-title" id="myModalLabel">协作者管理</h4>'+
                    '</div>'+
                    '<div class="pomisiondelwrop" style="border-bottom:none;">'+
                    '<div class="ListboxLeft">'+
                    '<div>'+
                    '<div style="width:100%;margin-bottom:10px;">Repository协作者</div>'+
                    //'<div id="delmorecooper">[删除]</div>'+
                    //'<div id="delallcooper">[清空协作者]</div>'+
                    '</div>'+
                    '<div class="privatelistboxwrop">'+
                    '<div style="height: 30px;margin-top:10px;text-align: center;">'+
                    '<span style="" class="" id="messcooper"></span>'+
                    '</div>'+
                    '<div class="pomisionesearchwrop">'+
                    '<input type="text" placeholder="请输入协作者的注册邮箱" id="privatecooper" class="form-control">'+
                    '<div class="searchcooper" id="searchcooper"></div>'+
                    '</div>'+
                    '<div style="margin-top:15px;" id="cooListBox" modal-reponame="">'+

                    //'<div datareponame="caory@asiainfo.com" class="perList">'+
                    //'<div class="perListcon"><input type="checkbox" name="users" style="margin-left:10px;margin-right:6px;" class="ischeck">caory@asiainfo.com</div>'+
                    //'<div class="delthisper"><a datareponame="caory@asiainfo.com" href="javaScript:void(0);" class="delper">[删除]</a></div>'+
                    //'</div>'+
                    '</div>'+
                    '<div class="coopage"></div>'+
                    '<div class="privategobackbtnwrop" style="margin-top: 5px;"><span class="gobackprivatecooperList">[返回]</span></div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="ListboxCenter">'+
                    '<div id="addpricoo">&lt;&lt;添加为协作者</div>'+
                    '</div>'+
                    '<div class="ListboxRight">'+
                    '<div style="width:100%;margin-bottom:10px;">Repository白名单</div>'+
                    '<div class="privatelistboxwrop">'+
                    '<div style="height: 30px;margin-top:10px; text-align: center;">'+
                    '<span style="" class="" id="messcooperatorprivate"></span>'+
                    '</div>'+
                    '<div style="padding: 0px;width:100%;">'+
                    '<div class="pomisionesearchwrop"><input type="text" placeholder="请输入白名单用户的注册邮箱" id="privatepomision" class="form-control">'+
                    '<div class="searchcooper" id="searchpomisionemailTest"></div>'+
                    '</div>'+
                    '<div style="margin-top:15px;" id="perListBox" modal-reponame="REPOSDF">'+
                    //'<div datareponame="caory@asiainfo.com" class="perList">'+
                    //'<div class="perListcon"><input type="checkbox" name="users" style="margin-left:10px;margin-right:6px;" class="ischeck">caory@asiainfo.com</div>'+
                    //'<div class="delthisper"><a datareponame="caory@asiainfo.com" href="javaScript:void(0);" class="delper">[删除]</a></div>'+
                    //'</div>'+
                    '</div>'+
                    '<div class="perpage"></div>'+
                    '</div>'+
                    '<div style="margin-top:5px;" class="gobackbtnwropcoo"><span class="gobackcooperator">[返回]</span></div>'+
                    '</div>'+
                    '</div>'+

                '</div>'+
                '</div>'+
                '</div>'
                $(obj).append(str)
            },
            appendAddrepstr : function(obj){
                console.log("---------");
                console.log(obj);
                console.log("----------");
                var str = '<div id="addRep" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
                    '<div class="modal-dialog">'+
                    '<div class="modal-content">'+
                    '<div class="modal-body" style="padding: 30px 30px 45px 30px">'+
                    '<div class="head" style="margin-bottom: 0px;">'+
                    '<span class="title">新增Repository</span>'+
                    '<button aria-hidden="true" data-dismiss="modal" class="close" type="button"></button>'+
                    '</div>'+
                    '<div style="height: 30px;">'+
                    '<div id="addalertbox" class="container" style="width:100%;"></div>'+
                    '</div>'+
                    '<div class="repname">'+
                    '<div class="key">'+
                    '<span class="title">Repository 名称</span>'+
                    '<span class="promt" style="margin-left: 5px;font-size: 12px;color: #333">设置后不能修改</span>' +
                    '<strong style="color: red;margin-left:5px;">*</strong>'+
                    '<span class="repnameerror"></span>'+
                    '</div>'+
                    '<div class="value">'+
                    '<input id="repnameInput" maxlength="52" type="text" placeholder="不能为空，52个字符以内，仅限使用英文字母、数字和'+"_"+'">'+
                    '</div>'+
                    '</div>'+
                    '<div class="repcomment">'+
                        '<div class="key"><span>Repository 描述</span><strong style="color: red;margin-left:5px;">*</strong><span id="repconerror" class="repconerror"></span></div>'+
                    '<div class="value">'+
                    '<textarea id="repconments" placeholder="200字以内"></textarea>'+
                    '</div>'+
                    '</div>'+
                    '<div class="commentnums">还可以输入<span class="surplusnum">200</span>字，已超出<span class="exceednum">0</span>字</div>'+
                    '<div class="property">'+
                    '<div class="key">属性 <span class="reptypeicon"   data-placement="right" data-toggle="tooltip" data-html="true" data-original-title="开放：所用用户能看到Repository、以及下属DataItem的详情。<br/>私有：仅有自己和白名单用户能看到Repository、以及下属DataItem的详情。"></span></div>'+

                    '<div class="value">'+
                    //'<select name="" id="ispublic">'+
                    //    '<option value="1">开放</option>'+
                    //    '<option value="2">私有</option>'+
                    //'</select>'+
                        '<div id="ispublic" style="border: 1px solid #cacaca;border-radius: 5px;padding: 2px 5px;width:40px "></div>'+
                    '</div>'+
                    '<div class="xiugaireperror"></div>'+
                    '</div>'+
                    '<div class="submit">'+
                    '<input type="button" value="提交">'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
                $(obj).append(str)
            },
            isdelpermissionBox : function(){

            }
        }
    return alertBox;
    }
