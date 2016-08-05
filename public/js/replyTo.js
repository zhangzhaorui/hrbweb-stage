/**
 * Created by Administrator on 2016/3/8.
 */
function replyToAll(replyJson) {
    var headerToken={};
    if($.cookie("token")!=null&&$.cookie("token")!="null"){
        headerToken = replyJson.headerToken;
    }

    var loginitemname = replyJson.loginitemname;  // 登录名
    var repoName = replyJson.repoName;
    var itemName = replyJson.itemName;
    var ismypublish = replyJson.ismypublish; // 是否是我的发布
    var thispages = replyJson.thispages; // 是否是我的发布
    var thistname = ''; // 数据发布者
    var replytoNum = 0; //评论总数

    var replyToAllFun = {
        // 添加评论html
        appendHtml: function () {
            var replyTostr = '<div class="commentwrop">' +
                '<textarea name="" id="commentcon"></textarea>' +
                '<div class="conmentbt">' +
                '<div class="commentnums">还可以输入<span class="surplusnum">210</span>字，已超出<span class="exceednum">0</span>字</div>' +
                '<div class="publish_btn" id="pushcon_btn">评论</div>' +
                '</div>' +
                '</div>' +
                '<div class="commentList">' +
                '</div>' +
                '<div class="conmentpages"></div>';
            $('#repoactive').append(replyTostr);
        },
        // 得到数据发布者
        getdatausername: function () {

            $.ajax({
                url: "/api/repositories/" + repoName + "/" + itemName + "?abstract=1",
                type: "GET",
                cache: false,
                async: false,
                dataType: 'json',
                headers: headerToken,
                success: function (json) {
                    if (json.code == 0) {
                        thistname = json.data.create_user;
                    }
                }
            });
        },
        // 弹出提示信息
        addprompt: function (thisobj, thiscon) {
            $('.promptbox').remove();
            var promptbox = '<div class="promptbox" style="display: block; ">' +
                thiscon
            '</div>';
            $(thisobj).siblings('.conmentbt').append(promptbox);
        },
        //添加回复窗口
        addcommenthtml: function (towho) {
            var thisstr = '<div class="commentwrop replycboxbg" id="replyCommnet">' +
                '<textarea name="" id="replycommentcon" datatowho="回复' + towho + '">回复' + towho + '</textarea>' +
                '<div class="conmentbt">' +
                '<div class="commentnums">还可以输入<span class="reply_surplusnum">210</span>字，已超出<span class="reply_exceednum">0</span>字</div>' +
                '<div class="publish_btn" id="replycon_btn">评论</div>' +
                '</div>' +
                '</div>';
            return thisstr;
        },
        //添加回复窗口
        addcommenthtml: function (towho) {
            var thisstr = '<div class="commentwrop replycboxbg" id="replyCommnet">' +
                '<textarea name="" id="replycommentcon" datatowho="回复' + towho + '">回复' + towho + '</textarea>' +
                '<div class="conmentbt">' +
                '<div class="commentnums">还可以输入<span class="reply_surplusnum">210</span>字，已超出<span class="reply_exceednum">0</span>字</div>' +
                '<div class="publish_btn" id="replycon_btn">评论</div>' +
                '</div>' +
                '</div>';
            return thisstr;
        },
        ////////////////////////////////////////生成uuid
        S4: function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        },
        guid: function () {
            return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
        },
        // 返回用户信息;
        getscreateName: function (create_user) {
            var itemloginName = '';
            $.ajax({
                url: "/api/users/" + create_user,
                cache: false,
                async: false,
                success: function (datas) {
                    itemloginName = datas.data;
                }
            });
            return itemloginName;
        },
        // 展示评论列表
        addreplyhtml: function (listcon) {
            var replytostr = '';
            var replythisname = '';
            var myitemcolor = '';
            var thisuertype = 0;
            if (loginitemname != '' && loginitemname != null && loginitemname != 'null') {
                //////////////查询用户会员级别
                thisuertype = this.getscreateName(loginitemname).userType;
            }
            if (thistname == listcon.username) {
                myitemcolor = 'myitemcolor';
            }
            if(ismypublish == true){
                    //////////////查询用户真实姓名
                    replythisname = listcon.realname;
            }else{

                if (loginitemname == listcon.username) {
                    replythisname = '我';
                } else if (thistname == listcon.username) {
                    //////////////查询用户真实姓名
                    replythisname = this.getscreateName(listcon.username).userName;

                } else {
                    replythisname = listcon.nickname
                }
            }

            var delstr = '';
            var replytousername = ''
            if (loginitemname == listcon.username || thisuertype == 2) {
                delstr = '<span class="delcommentbtn">删除</span>';
            }
            if (listcon.replyto) {
                if(loginitemname == listcon.replyto.username){
                    replytousername = '回复&nbsp;我';
                }else{
                    replytousername = '回复&nbsp;'+listcon.replyto.nickname;
                }
            }
            var createtime = listcon.createtime.replace(/[A-Z]/g, " ");
            var aplystr = '<div class="comListconwrop" datacomid="' + listcon.commentid + '">' +
                '<div class="replytousername">' + replytousername + '</div>' +
                '<div class="comnews ' + myitemcolor + '">' + listcon.content + '</div>' +
                '<span class="commenname towho" datanickname="' + listcon.nickname + '">' + replythisname + '</span>' +
                '<div class="commentdate">' + createtime + '</div>' +
                '<div class="reply_wrop"><span class="reply_btn">回复</span>' + delstr + '</div>' +
                '<div class="replytobox">' + replytostr + '</div>' +
                '</div>';
            $('.commentList').append(aplystr);
        },
        // 每页的评论数据
        getcommentlist: function (commentpages) {
            var that = this;
            $('.commentList').empty();
            $.ajax({
                type: 'GET',
                url: "/api/comments/" + repoName + "/" + itemName + '?page=' + commentpages + '&size='+thispages,
                cache: false,
                async: false,
                dataType: 'json',
                success: function (msg) {
                    var msglenth = msg.data.results.length;
                    replytoNum = msg.data.total;
                    $('.commentallnum').html(replytoNum);
                    for (var i = 0; i < msglenth; i++) {
                        that.addreplyhtml(msg.data.results[i]);
                    }
                }
            });
        },
        ///////////////删除评论///////////////
        delcomment: function (commentid) {
            var that = this;
            $.ajax({
                type: 'DELETE',
                url: "/api/comment/" + repoName + "/" + itemName + '?commentid=' + commentid,
                cache: false,
                //async: false,
                dataType: 'json',
                headers: headerToken,
                success: function (msg) {
                    that.getcommentlist(1);
                }
            });
        },
        ////////////////////评论框文字长度验证//////////////
        commentkeyup: function (combj, surobj, exceedobj) {
            var commentcon = $(combj).val();
            var residue = 210 - (commentcon.length);
            var exceeding = 0;
            if (residue < 0) {
                residue = 0;
                exceeding = commentcon.length - 210;
            }
            $(surobj).html(residue);
            $(exceedobj).html(exceeding);
        },
        pushreplycom: function (thisobj, isreply) {
            var that = this;
            var thisuuid = this.guid();
            var parten = /^\s*$/;
            var commentcon = $(thisobj).val();
            if (parten.test(commentcon)) {
                this.addprompt(thisobj, '评论不能为空');
                return false;
            } else if (commentcon.length > 210) {
                this.addprompt(thisobj, '评论字数过长');
                return false;
            } else {
                var thisdatas = {
                    "token": thisuuid,
                    "replyto": isreply,
                    "content": commentcon
                }
                $.ajax({
                    type: 'POST',
                    url: "/api/comment/" + repoName + "/" + itemName,
                    cache: false,
                    dataType: 'json',
                    data: JSON.stringify(thisdatas),
                    headers: headerToken,
                    success: function (msg) {
                        that.getcommentlist(1);
                        $(thisobj).val('');
                        $('.surplusnum').html('210');
                        $('.exceednum').html('0');
                    }
                });
            }
        },
        ///////////////////发表评论///////////////////////
        getissub: function (thisobj, orreply) {
            var issubscription = false;
            if (!($.cookie("token")!=null&&$.cookie("token")!="null")) {
                $(".alert_login").css({"display": "block", "left": "716px","top":"313px","z-index":"99"}).show();
                return;
            } else {
                $.ajax({
                    type: 'get',
                    url: "/api/subscription/" + repoName + "/" + itemName,
                    cache: false,
                    dataType: 'json',
                    async: false,
                    headers: headerToken,
                    success: function (msg) {
                        if (msg.code == 0) {
                            issubscription = msg.data;
                        }
                    }
                });
                if (issubscription == true || thistname == loginitemname) {
                    this.pushreplycom(thisobj, orreply);
                } else {
                    this.addprompt(thisobj, '您还没有订购该item');
                    return
                }
            }
        },
        ///////////////////回复评论
        huifu : function(_this){
            var thisnickname = _this.closest('.reply_wrop').siblings('.towho').attr('datanickname');
            var thistext = _this.html();
            $('.comListconwrop').children('#replyCommnet').remove();
            $('.reply_btn').html('回复');
            if(thistext == '回复'){
                _this.html('收起');
                _this.parent().siblings('#replyCommnet').remove();
                _this.closest('.comListconwrop').append(this.addcommenthtml(thisnickname));
            }else if(thistext == '收起'){
                _this.html('回复');
                _this.parent().siblings('#replyCommnet').remove();
            }
        },
        //删除评论
        delereply : function(commentid){

            this.delcomment(commentid);
        },
        // 回复评论框
        huifureply : function(_this){
            var thisdatatowho = _this.attr('datatowho');
            var thistext = _this.val();
            if(thisdatatowho == thistext){
                _this.val('');
            }
        },
        thisInit : function(){
            var that = this;
            this.appendHtml();
            this.getdatausername()
            this.getcommentlist(1);
            $(".conmentpages").pagination(replytoNum, {
                maxentries:replytoNum,
                items_per_page:thispages,
                num_display_entries: 1,
                num_edge_entries: 5 ,
                prev_text:"上一页",
                next_text:"下一页",
                ellipse_text:"...",
                link_to:"javascript:void(0)",
                callback:replyfenS,
                load_first_page:false
            });
            function replyfenS(new_page_index){
                that.getcommentlist(new_page_index+1);
            }
///////////////////回复评论
            $(document).on('click','.reply_btn',function(){
                var _this = $(this);
                that.huifu(_this)

            })

            $(document).on('click','.delcommentbtn',function(){
                var commentid =  $(this).closest('.reply_wrop').closest('.comListconwrop').attr('datacomid');
                that.delereply(commentid);
            })
////////////////回复评论///////////////
            $(document).on('focus','#replycommentcon',function(){
                var _this = $(this);
                that.huifureply(_this);
            })
            $(document).on('click','#replycon_btn',function(){
                var thisdatacomid = parseInt($(this).parents('.comListconwrop').attr('datacomid'));
                that.getissub('#replycommentcon',thisdatacomid);
            })

            $(document).on('keyup','#replyCommnet',function(){
                that.commentkeyup('#replycommentcon','.reply_surplusnum','.reply_exceednum');
            })
            $(document).on('keyup','#commentcon',function(){
                that.commentkeyup('#commentcon','.surplusnum','.exceednum');
            });
            $(document).on('click','#pushcon_btn',function(){
                that.getissub('#commentcon',0)
            })
            $(document).bind("click", function (e) {
                if ((e.target.className.indexOf("promptbox") < 0 && e.target.id != "replycon_btn" && e.target.id != "pushcon_btn" && e.target.className.indexOf("publish_btn") < 0)) {
                    $(".promptbox").css("display", "none");
                }
            });
        /*    $(document).on('click', '.gotologin', function () {
                $(".modal-open").css("padding-right", "15px");
                $('#myModal').modal('toggle');
            })*/
        }

    }
    return replyToAllFun;
}

