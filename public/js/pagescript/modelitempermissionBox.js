/**
 * Created by Administrator on 2016/3/24.
 */
/**
 * Created by Administrator on 2016/3/15.
 */
function appendItemAlertBox(){
    var alertitemBox = {
        appendcoopristr : function(obj){
            var str = '<div class="modal fade"  id="myModalPriCooper" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"  modal-repoName="">'+
                '<div class="modal-dialog">'+
                '<div class="modal-content" style="padding:30px;width:800px;float: left;height: auto;">'+
                '<div class="modal-header" style="border-bottom:0px;padding: 0px;">'+
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'+
                '<h4 class="modal-title" id="myModalLabel">白名单管理</h4>'+
                '<div style="height: 20px;color:#666666;margin-top:8px; ">添加为白名单的用户，具有订购此DataItem的权限</div>'+
                '</div>'+
                '<div class="pomisiondelwrop ui-widget" style="border-bottom:none;">'+
                '<div style="height: 20px;color:#666666;margin-top:8px; ">请从Repository的白名单里选择某个用户，添加为DataItem的白名单。</div>'+
                '<div class="ListboxLeft">'+
                '<div>'+
                '<div style="width:100%;margin-bottom:10px;">DataItem白名单</div>'+
                '</div>'+
                '<div class="privatelistboxwrop">'+
                '<div style="height: 30px;margin-top:10px;text-align: left;">'+
                '<span style="" class="" id="messcooper"></span>'+
                '</div>'+
                '<div class="pomisionesearchwrop">'+
                '<input type="text" placeholder="请输入白名单的注册邮箱" id="privatecooper" class="form-control">'+
                '<div class="searchcooper" id="searchcooper"></div>'+
                '</div>'+
                '<div style="margin-top:15px;" id="cooListBox" modal-reponame="">'+
                '</div>'+
                '<div class="coopage"></div>'+
                '<div class="privategobackbtnwrop" style="margin-top: 5px;"><span class="gobackprivatecooperList">[返回]</span></div>'+
                '</div>'+
                '</div>'+
                '<div class="ListboxCenter">'+
                '<div id="addpricoo">&lt;&lt;添加</div>'+
                '</div>'+
                '<div class="ListboxRight">'+
                '<div style="width:100%;margin-bottom:10px;">Repository白名单</div>'+
                '<div class="privatelistboxwrop ui-widget">'+
                '<div style="height: 30px;margin-top:10px; text-align: left;">'+
                '<span style="" class="" id="messcooperatorprivate"></span>'+
                '</div>'+
                '<div style="padding: 0px;width:100%;">'+
                '<div class="pomisionesearchwrop"><input type="text" placeholder="请输入白名单用户的注册邮箱" id="privatepomision" class="form-control">'+
                '<div class="searchcooper" id="searchpomisionemailTest"></div>'+
                '</div>'+
                '<div style="margin-top:15px;" id="perListBox" modal-reponame="REPOSDF">'+
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
        }
        ,
        addpubpermissionBox : function(obj){
            var str = '<div class="modal fade" id="myModalPer"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"  modal-repoName="">'+
                '<div class="modal-dialog">'+
                '<div class="modal-content" style="padding:30px;width:600px;float: left;height: auto;">'+
                '<div class="modal-header" style="border-bottom:0px;padding: 0px;">'+
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'+
                '<h4 class="modal-title" id="myModalLabel">白名单管理</h4>'+
                '</div>'+
                '<div class="pomisiondelwrop ui-widget">'+
                '<div style="height: 30px;margin-top:20px;text-align: left;">'+
                '<span style="" class="" id="mess"></span>'+
                '</div>'+
                '<input type="text" placeholder="请输入白名单用户的注册邮箱" id="emailTest" class="form-control emailInput">'+
                '<button id="inList" class="btn btn-primary perBtn">&lt;&lt;添加到白名单</button>'+
                '<button id="seList" class="btn btn-primary perBtn">在列表中查找</button>'+
                '</div>'+
                '<div style="width: 100%;overflow: hidden">'+
                '</div>'+
                '<div class="" id="modalRep_list" style="padding:0px;">'+
                '</div>'+
                '<div class="coopage"></div>'+
                '<div class="gobackWrop"><span class="back_btn">[返回]</span></div>'
                '</div>'+
                '</div>'+
                '</div>'
                $(obj).append(str)
        },
        addeditItemstr :function(obj){
            var str = '<div id="editItem" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
                '<div class="modal-dialog">'+
                '<div class="modal-content" style="width:600px;float: left;height: auto;">'+
                '<div class="modal-body" style="padding: 30px 30px 45px 30px">'+
                '<div class="head">'+
                '<span>修改DataItem</span>'+
                '<button aria-hidden="true" data-dismiss="modal" class="close" type="button"></button>'+
                '</div>'+
                '<div class="itemname">'+
                '<div class="key">DataItem 名称 <span class="promt" style="margin-left: 5px;font-size: 12px;color: #333">设置后不能修改</span>'+
                '<strong style="color: red;margin-left:5px;">*</strong></div>'+
                '<div class="value">'+
                "<input type='text'>"+
                '</div>'+
                '</div>'+
                '<div class="itemcomment">'+
                '<div class="key"><span class="title">DataItem 描述</span><strong style="color: red;margin-left:5px;">*</strong><span style="margin-left: 5px;float: right; font-size: 12px;display: none;" id="repconerror" class=""></span></div>'+
                '<div class="value">'+
                '<textarea id="repconments" placeholder="200字以内"></textarea>'+
                '</div>'+
                '</div>'+
                '<div class="commentnums" style="margin-bottom:20px;">还可以输入<span class="itemsurplusnum">200</span>字，已超出<span class="itemexceednum">0</span>字</div>'+
                '<div class="itempro">'+
                '<div class="key"><span>属性</span>' +
                '<span class="reptypeicon"   data-placement="right" data-toggle="tooltip" data-html="true" data-original-title="开放：所有用户能订购。<br/>私有：所有用户能向您申请订购。"></span>' +
                '</div>'+
                '<div class="value" style="height: 30px;">'+
                '<select data-tagle="" id="ispublic" name="">'+
                '<option value="1">开放</option>'+
                '<option value="2">私有</option>'+
                '</select>'+
                '</div>'+
                '<div style="height: 25px;"><span style="" class="" id="messcooperatorpublic">已订购此Item的用户将进入Item白名单</span></div>'+
                '</div>'+
                '<div class="itemtag">'+
                '<div class="key">'+
                '<div class="tagname">标签</div>'+
                '<span class="btnicon"></span>'+
                '<div class="labelerrorwrop" style="">'+
                '<span style="" class="" id="errlabels"></span>'+
                '</div>'+
                '</div>'+
                '<div class="addbtn">'+
                '<span class="btntext">为Item添加最有代表性的特征，如“area”=“全国”,标签值由英文、数字、“_”组成。最多添加5个</span>'+
                '</div>'+
                '<div class="value">'+
                '</div>'+
                '</div>'+
                '<div class="submit">'+
                '<input type="button" value="提交">'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>';
               $(obj).append(str)
        }
        ,addeditPricetr : function(obj){
            var str = '<div class="modal fade" id="editPrice"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"  modal-repoName="">'+
                '<div class="modal-dialog">'+
                '<div class="modal-content" style="padding:30px;width:600px;float: left;height: auto;">'+
                '<div class="modal-header" style="border-bottom:0px;padding: 0px;">'+
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'+
                '<h4 class="modal-title" id="myModalLabel">价格管理<span class="btniconmoney"></span></h4>'+
                '</div>'+
                '<div class="itempricew">数据需求方订购数据需要支付的费用，价格为空，则无法被订购，最多可以添加6个</div>'+
                '<div class="itemmesswrop" style="text-align: left;"><span id="itemmess" class=""></span></div>'+
                '<div class="valuemoney"></div>'+
                '<div class="submit"><input type="button" value="提交"></div>'
                '</div>'+
                '</div>'+
                '</div>'
                $(obj).append(str)
        }

    }
    return alertitemBox;
}
