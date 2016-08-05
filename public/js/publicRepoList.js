/**
 * Created by Administrator on 2016/3/2.
 */
var headerToken={};
if($.cookie("token")!=null&&$.cookie("token")!="null"){
    headerToken={Authorization:"Token "+$.cookie("token")};
}
function repoListFun(thisJson) {
    // 该repo下的item总数;
    var listFunJson = {
        //  判断数据类型
        judgeLabel: function (labels) {
            var labeldata = {
                'label': labels,
                'vvclass': '',
                'labelV': ''
            };
            if (labeldata.label == "api") {
                labeldata.vvclass = "api";
                labeldata.labelV = "API";
            }
            if (labeldata.label == "batch") {
                labeldata.vvclass = "period";
                labeldata.labelV = "批量数据";
            }
            if (labeldata.label == "flow") {
                labeldata.vvclass = "flot-data";
                labeldata.labelV = "流式数据";
            }
            return labeldata;
        },
        // 截取时间
        getTimes: function (times) {
            var jsonTime = {};
            jsonTime.nums = times.indexOf("|");
            if (jsonTime.nums != "-1") {
                jsonTime.jdTime = times.substr(0, 19);
                jsonTime.xdTime = times.substring(jsonTime.nums + 1, times.length);
                jsonTime.showTime = jsonTime.xdTime;
            } else {
                jsonTime.showTime = times;
            }
            return jsonTime;
        },
        // 返回数据拥有方;
        getscreateName: function (create_user) {
            var itemloginName = '';
            $.ajax({
                url: "/api/users/" + create_user,
                cache: false,
                async: false,
                headers:headerToken,
                success: function (datas) {
                    itemloginName = datas.data;
                }
            });
            return itemloginName;
        },
        //返回该DataItem的pull量
        getItempullNum: function (reponame,itemname) {
            var pullnum = 0;
            $.ajax({
                type: "get",
                async: false,
                cache: false,
                headers:headerToken,
                url: "/api/transaction_stat/"+reponame+"/" + itemname,
                success: function (msg) {
                    pullnum = msg.data.numpulls
                    return pullnum;
                }
            });
            return pullnum;
        },
        //返回该repo的pull量
        getRepopullNum: function (reponame) {
            var pullnum = 0;
            $.ajax({
                type: "get",
                async: false,
                cache: false,
                headers:headerToken,
                url: "/api/transaction_stat/"+reponame,
                success: function (msg) {
                    pullnum = msg.data.numpulls
                    return pullnum;
                }
            });
            return pullnum;
        },
        //返回该DataItem的订阅量
        getItemsubNum: function (reponame,itemname) {
            var subsnum = 0;
            $.ajax({
                type: "get",
                async: false,
                cache: false,
                headers:headerToken,
                url: "/api/subscription_stat/"+reponame+"/" + itemname,
                success: function (msg) {
                    subsnum = msg.data.numsubs
                    return subsnum;
                }
            });
            return subsnum;
        },
        //返回该repo的订阅量
        getReposubNum: function (reponame) {
            var subsnum = 0;
            $.ajax({
                type: "get",
                async: false,
                cache: false,
                headers:headerToken,
                url: "/api/subscription_stat/"+reponame,
                success: function (msg) {
                    subsnum = msg.data.numsubs
                    return subsnum;
                }
            });
            return subsnum;
        },
        // 返回item的star量
        getItemstarNum: function (reponame,itemname) {
            var starnum = 0;
            $.ajax({
                type: "get",
                async: false,
                cache: false,
                headers:headerToken,
                url: "/api/star_stat/"+reponame+"/" + itemname,
                success: function (msg) {
                    starnum = msg.data.numstars
                    return starnum;
                }
            });
            return starnum;
        },
        // 返回repo的star量
        getRepostarNum: function (reponame) {
            var starnum = 0;
            $.ajax({
                type: "get",
                async: false,
                cache: false,
                headers:headerToken,
                url: "/api/star_stat/"+reponame,
                success: function (msg) {
                    starnum = msg.data.numstars
                    return starnum;
                }
            });
            return starnum;
        },
        // 返回item的评论量
        getItemcommentNum: function (reponame,itemname) {
            var commentnum = 0;
            $.ajax({
                type: "get",
                async: false,
                cache: false,
                headers:headerToken,
                url: "/api/comment_stat/"+reponame+"/" + itemname,
                success: function (msg) {
                    commentnum = msg.data.numcomments;
                    return commentnum;
                }
            });
            return commentnum;
        },

        //    返回item详情
        getItemComment: function (reponame,itemname) {
            var itemComment;
            $.ajax({
                type: "get",
                async: false,
                cache: false,
                headers:headerToken,
                url: "/api/repositories/"+reponame+"/" + itemname,
                success: function (msg) {
                    itemComment = msg;
                    return itemComment;
                }
            });
            return itemComment;
        },
        //    返回repo详情
        getRepoComment: function (reponame) {
            var repoComment;
            $.ajax({
                type: "get",
                async: false,
                cache: false,
                headers:headerToken,
                url: "/api/repositories/"+reponame+"?items=1&size=-1",
                success: function (msg) {
                    repoComment = msg;
                    return repoComment;
                }
            });
            return repoComment;
        },
        // 高亮显示字符串；
        searchRel : function(str){
            var rtext = thisJson.searchOrSelect;
            rtext=decodeURIComponent(rtext);
            var thistL = rtext.toLowerCase();
            thistL=decodeURIComponent(thistL);
            var s="";
            if(str.toLowerCase().indexOf(thistL)!=-1){
                var start=str.toLowerCase().indexOf(thistL);
                var end=start+rtext.length;
                var strtext=str.substring(start,end);
                s=str.replace(strtext, "<span style=background-color:#fffe8f;>"+strtext+"</span>");
            }else{
                s=str;
            }
            return s;
        },
        //   填充html元素
        appendHtml: function () {
           //var b = new Base64();
           var itemarr = this.selOrrepo(thisJson.selOritem.isitem,thisJson.thisrepName,thisJson.thisPages).itemarr;
           var thisreponame = '';
           var repoComment;
            for (var i = 0; i < itemarr.length; i++) {
                var dataowner = '';  // 数据拥有方不显示数据提供者；
                var datalabel = ''; // 数据拥有方不显示标签；
                var itemname = ''; // item名称；
                var reponame = '';// repo名称
                var thisstarnum = 0; // 点赞量
                var thissubsnum = 0; // 订购量
                var thispullnum = 0; // 下载量
                var thiscomnum = 0; // 评论量
                var istagsnum = 0; // 数据拥有方显示item量，其他显示tag量
                var istagsname = ''; // 数据拥有方显示item量，其他显示tag量
                var isdataOwnerList = ''; // 数据拥有方的数据更新时间没有左边距；
                var isdataOwnerIcon = '';// 数据拥有方的数据更新时间没有左边距；
                var thisrepcomment = ''; // 搜索页面有搜索条件时，条件高亮显示；
                var iconGroup = 'iconGroup';
                var isitemdet = '';
                var searchrepname = '';
                if(thisJson.selOritem.isitem == 'repositories'){
                    itemname = itemarr[i];
                    reponame = thisJson.thisrepName;
                    thisreponame = itemname;
                    searchrepname =  reponame+'/'+itemname;
                    thisstarnum = this.getItemstarNum(reponame,itemname);
                    thissubsnum = this.getItemsubNum(reponame,itemname) ;
                    thispullnum = this.getItempullNum(reponame,itemname);
                    thiscomnum = this.getItemcommentNum(reponame,itemname);
                    repoComment = this.getItemComment(reponame,itemname);
                    thisrepcomment = repoComment.data.comment;
                    istagsnum = repoComment.data.tags;
                    istagsname = 'Tag量';
                    isdataOwnerList = 'listbtIcon';
                    isitemdet = 'itemdet';
                    isdataOwnerIcon = 'tagsIcon dataOwnerIcon';
                    //var baseName = b.encode(repoComment.data.create_user);
                    dataowner = '本数据由<a target="_blank" href="/userdet/'+this.getscreateName(repoComment.data.create_user).nickName+'">' + this.getscreateName(repoComment.data.create_user).userName + '</a>提供';
                    datalabel = '<span class="period '+this.judgeLabel(repoComment.data.label.sys.supply_style).vvclass+'">' + this.judgeLabel(repoComment.data.label.sys.supply_style).labelV + '</span>';
                }else if(thisJson.selOritem.isitem == 'select' || thisJson.selOritem.isitem == 'search'){
                    isitemdet = 'itemdet';
                    itemname = itemarr[i].itemname;
                    reponame = itemarr[i].repname;
                    thisreponame = reponame+'/'+itemname;
                    searchrepname = thisreponame;
                    repoComment = this.getItemComment(reponame,itemname);
                    thisrepcomment = repoComment.data.comment;
                    if(thisJson.selOritem.isitem == 'search'){
                        thisreponame = this.searchRel(reponame)+'/'+this.searchRel(itemname);
                        thisrepcomment = this.searchRel(thisrepcomment);
                    }
                    thisstarnum = this.getItemstarNum(reponame,itemname);
                    thissubsnum = this.getItemsubNum(reponame,itemname) ;
                    thispullnum = this.getItempullNum(reponame,itemname);
                    thiscomnum = this.getItemcommentNum(reponame,itemname);

                    istagsnum = repoComment.data.tags;
                    istagsname = 'Tag量';
                    isdataOwnerList = 'listbtIcon';
                    isdataOwnerIcon = 'tagsIcon';
                    //var baseName = b.encode(repoComment.data.create_user);
                    dataowner = '本数据由<a href="/userdet/'+this.getscreateName(repoComment.data.create_user).nickName+'">' + this.getscreateName(repoComment.data.create_user).userName + '</a>提供';
                    datalabel = '<span class="period '+this.judgeLabel(repoComment.data.label.sys.supply_style).vvclass+'">' + this.judgeLabel(repoComment.data.label.sys.supply_style).labelV + '</span>';
                }else if(thisJson.selOritem.isitem == 'dataOwner'){
                    var allitemarr = [];
                    iconGroup = 'iconGroup noborder'
                    dataowner = '';
                    itemname = '';
                    datalabel = '';
                    reponame = itemarr[i].repname;
                    thisreponame = itemarr[i].repname;
                    searchrepname = thisreponame;
                    thisstarnum = this.getRepostarNum(reponame);
                    thissubsnum = this.getReposubNum(reponame) ;
                    thispullnum = this.getRepopullNum(reponame);
                    repoComment = this.getRepoComment(reponame);
                    thisrepcomment = repoComment.data.comment;
                    istagsnum = repoComment.data.items;
                    istagsname = 'Item量';
                    isdataOwnerList = 'listbtIcon dataOwnerListIcon';
                    isdataOwnerIcon = 'tagsIcon dataOwnerIcon';
                    isitemdet = 'repodet';
                    if(repoComment.data.dataitems){
                        allitemarr = repoComment.data.dataitems;

                        for(var j = 0; j<allitemarr.length;j++){
                            thiscomnum += this.getItemcommentNum(reponame,allitemarr[j]);
                        }
                    }

                }
                var thispricestate = '';
                var pricestype = '';
                if (repoComment.data.pricestate){
                    if (repoComment.data.pricestate != '') {
                        if (repoComment.data.pricestate == '免费') {
                            pricestype = 'freetype';
                        } else if (repoComment.data.pricestate == '付费') {
                            pricestype = 'chargetype';
                        } else {
                            pricestype = 'limitedfreetype';
                        }
                        thispricestate = '<span class="' + pricestype + '">' + repoComment.data.pricestate + '</span>';
                    }
                }

                var html = '<div class="listBox">' +
                    '<div class="listLeftBox">' +
                    '<div class="listNameTitle">' +
                    '<a target="_blank" title="'+isitemdet+'/'+searchrepname+'" href="/'+isitemdet+'/'+searchrepname+'">' + thisreponame + '</a>' +
                    '</div>' +
                    '<div class="listComment">' + thisrepcomment + '</div>' +
                    '<div class="listbtIconWrop">' +
                    '<div class="listlable">' +
                     datalabel+
                    '</div>' +
                    '<div class="'+isdataOwnerList+'">' +
                    '<img title="" datapalecement="top" data-toggle="tooltip" src="/img/newpic004.png" class="'+isdataOwnerIcon+'" data-original-title="更新时间">' +
                    '<span title="" datapalecement="top" data-toggle="tooltip" data-original-title="' + this.getTimes(repoComment.data.optime).jdTime + '">' + this.getTimes(repoComment.data.optime).showTime + '</span>' +
                    '<img title="" datapalecement="top" data-toggle="tooltip" src="/img/newpic005.png" class="tagsIcon" data-original-title="'+istagsname+'">' +
                    '<span>' + istagsnum + '</span>' +
                    '</div>' +
                    '</div>' +
                    '<div class="listCursers">' +
                     dataowner+
                    '</div>' +
                    '</div>' +
                    '<div class="listRightBox">' +
                    '<div class="listPrice">' +
                    thispricestate +
                    '</div>' +
                    '<div class="'+iconGroup+'">' +
                    '<div class="like"><img title="" datapalecement="top" data-toggle="tooltip" src="/img/newpic001.png" style="" data-original-title="点赞量"><span>' + thisstarnum + '</span></div>' +
                    '<div class="cart"><img title="" datapalecement="top" data-toggle="tooltip" src="/img/newpic002.png" style="" data-original-title="订购量"><span>' + thissubsnum + '</span></div>' +
                    '<div class="download"><img title="" datapalecement="top" data-toggle="tooltip" src="/img/newpic003.png" style="" data-original-title="下载量"><span>' + thispullnum + '</span></div>' +
                    '<div class="comment"><img title="" datapalecement="top" data-toggle="tooltip" src="/img/comment.png" style="" data-original-title="评论量"><span>' + thiscomnum+ '</span></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                $(thisJson.appendObj).append(html);
                $('[data-toggle="tooltip"]').tooltip();
            }
        },
        // 判断是否是数据精选页面；
        selOrrepo : function(){
            if(thisJson.selOritem.isitem == 'repositories'){
                var itemjson = {
                    itemfornum : 0,
                    itemarr : [],
                    allitemnums : 0
                }
                $.ajax({
                    type: "get",
                    async: false,
                    cache: false,
                    headers:headerToken,
                    url: "/api/repositories/"+thisJson.thisrepName+"?items=1&size="+thisJson.pageSize+"&page=" +thisJson.thisPages,
                    success: function (msg) {
                        itemjson.allitemnums = msg.data.items;
                        itemjson.itemfornum = msg.data.dataitems.length;
                        itemjson.itemarr = msg.data.dataitems;
                        return itemjson;
                    }
                });
                return itemjson;
            }else if(thisJson.selOritem.isitem == 'select' && thisJson.searchOrSelect == ''){
                var selectjson = {
                    itemfornum : 0,
                    itemarr : [],
                    allitemnums : 0
                }
                $.ajax({
                    type: "get",
                    async: false,
                    cache: false,
                    headers:headerToken,
                    url: "/api/selects?select_labels"+"&size="+thisJson.pageSize+"&page="+thisJson.thisPages,
                    success: function (msg) {
                        selectjson.allitemnums = msg.data.total;
                        selectjson.itemfornum = msg.data.select.length;
                        selectjson.itemarr = msg.data.select;
                        return selectjson;
                    }
                });
                return selectjson;
            }else if(thisJson.selOritem.isitem == 'select' && thisJson.searchOrSelect != ''){
                var selectjson = {
                    itemfornum : 0,
                    itemarr : [],
                    allitemnums : 0
                }
                $.ajax({
                    type: "get",
                    async: false,
                    cache: false,
                    headers:headerToken,
                    url: "/api/selects?select_labels="+encodeURIComponent(thisJson.searchOrSelect)+"&size="+thisJson.pageSize+"&page="+thisJson.thisPages,
                    success: function (msg) {
                    	if(msg.data.total==0){
                    		if($(".g-selects-box").html()==""){
                    			$(".g-selects-box").append("<div><p class='text-center'>暂无可浏览的开放数据</p></div>");
                    		}     		
                    	}else{
                    		selectjson.allitemnums = msg.data.total;
                            selectjson.itemfornum = msg.data.select.length;
                            selectjson.itemarr = msg.data.select;
                    	}
                        
                        return selectjson;
                    }
                });
                return selectjson;
            }else if(thisJson.selOritem.isitem == 'search' && thisJson.searchOrSelect == ''){
                var searchjson = {
                    itemfornum : 0,
                    itemarr : [],
                    allitemnums : 0
                }
                $.ajax({
                    type: "get",
                    async: false,
                    cache: false,
                    headers:headerToken,
                    url: "/api/search?size="+thisJson.pageSize+"&page="+thisJson.thisPages,
                    success: function (msg) {
                    	$("#bmarks").text("为您推荐热门数据");
                        searchjson.allitemnums = msg.data.total;
                        searchjson.itemfornum = msg.data.results.length;
                        searchjson.itemarr = msg.data.results;
                        return searchjson;
                    }
                });
                return searchjson;
            }else if(thisJson.selOritem.isitem == 'search' && thisJson.searchOrSelect != ''){
                var searchjson = {
                    itemfornum : 0,
                    itemarr : [],
                    allitemnums : 0
                }
            	var searchOrSelect=thisJson.searchOrSelect;
            	if(searchOrSelect.match("\/")==null){
                    $.ajax({
                        type: "get",
                        async: false,
                        cache: false,
                        headers:headerToken,
                        url: "/api/search?size="+thisJson.pageSize+"&page="+thisJson.thisPages+"&text="+thisJson.searchOrSelect,
                        success: function (msg) {
                            searchjson.allitemnums = msg.data.total;
                            searchjson.itemfornum = msg.data.results.length;
                            searchjson.itemarr = msg.data.results;
                            return searchjson;
                        }
                    });
            	}else{
            		var len=searchOrSelect.length;
            		var indexnum=searchOrSelect.indexOf("\/")
            		var rname=searchOrSelect.substring(0,indexnum);
            		var sname=searchOrSelect.substring(indexnum+1,len);
            		var istype=false;
            		$.ajax({
                        type: "get",
                        async: false,
                        cache: false,
                        headers:headerToken,
                        url: "/api/repositories/"+rname+"/" + sname,
                        success: function (msg) {
                        	istype=true;
                        },
                        error:function(msg){
                        	istype=false;
                        }
                    });
            		if(istype){
            			searchjson.allitemnums = 1;
                		searchjson.itemfornum = 1; 
                		searchjson.itemarr = [{"repname":rname,"itemname":sname}];
                		return searchjson;
            		}else{
            			if($(".g-selects-box").html()==""){
                			$(".g-selects-box").append("<div><p class='text-center'>暂无可浏览的开放数据</p></div>");
                		}
            		}
            		
            	}
                return searchjson;
            }else if(thisJson.selOritem.isitem == 'dataOwner'){
                var dataOwner = {
                    itemfornum : 0,
                    itemarr : [],
                    allitemnums : 0
                }
                $.ajax({
                    type: "get",
                    async: false,
                    cache: false,
                    headers:headerToken,
                    url: "/api/repositories?username="+thisJson.searchOrSelect+"&size=-1",
                    success: function (msg) {
                        dataOwner.itemfornum = msg.data.length;
                        dataOwner.itemarr = msg.data;
                        return dataOwner;
                    }
                });
                return dataOwner;
            }else{
                alert('参数错误');
            }
        },
        pagesFun :function(allnum){
            $(thisJson.pagesObj).pagination(allnum, {
                maxentries:allnum,
                items_per_page:thisJson.pageSize,
                num_display_entries:5,
                num_edge_entries:5,
                prev_text:"上一页",
                next_text:"下一页",
                ellipse_text:"...",
                link_to:"javascript:void(0)",
                callback:this.callBackFun,
                load_first_page:false
            });
        },
        callBackFun :function(new_page_index){
            $(thisJson.appendObj).empty();
            var callFun = repoListFun(thisJson);
            thisJson.thisPages = new_page_index+1;
            callFun.appendHtml();
        }
    }
    return listFunJson;
}