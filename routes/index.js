var express = require('express');
var router = express.Router();
var http = require('http'); 

router.get('/', function(req, res, next) {
 	res.render('index');
});

//激活邮件
router.get('/regmessage/:loginname/:vid', function(req, res, next) {
	var loginname=req.params.loginname;
	var vid=req.params.vid;
	res.render('regmessage',{loginname:loginname,vid:vid,title:'regmessage.hebmk'});
});

//数据精选
router.get('/selects', function(req, res, next) {
	if(agent(req)){
		res.redirect('mobile/selectsPhone.html');
	}else{
		res.render('selects', {selectsType:'' ,title: 'select.hebmk' });
	}
});
//数据精选
router.get('/selects/:selectsType', function(req, res, next) {
	var selectsType=req.params.selectsType;
	if(agent(req)){
		if(selectsType=="terminal"){
			//1
			selectsType=encodeURIComponent("终端数据");
		}
		if(selectsType=="finance"){
			//2
			selectsType=encodeURIComponent("金融理财");
		}
		if(selectsType=="traffic"){
			//3
			selectsType=encodeURIComponent("交通运输");
		}
		if(selectsType=="weather"){
			//4
			selectsType=encodeURIComponent("气象环保");
		}
		if(selectsType=="internet"){
			//5
			selectsType=encodeURIComponent("互联网");
		}
		if(selectsType=="baseStation"){
			//6
			selectsType=encodeURIComponent("基站信息");
		}
		if(selectsType=="credit"){
			//7
			selectsType=encodeURIComponent("个人征信");
		}
		if(selectsType=="life"){
			//8
			selectsType=encodeURIComponent("生活服务");
		}
		if(selectsType=="space"){
			//9
			selectsType=encodeURIComponent("时空数据");
		}
		if(selectsType=="healthy"){
			//10
			selectsType=encodeURIComponent("医疗健康");
		}
		if(selectsType=="match"){
			//11
			selectsType=encodeURIComponent("竞赛数据");
		}
		if(selectsType=="api"){
			//11
			selectsType=encodeURIComponent("竞赛数据");
		}

		res.redirect('/mobile/selectsPhone.html?type='+selectsType);
	}else{
		res.render('selects', { selectsType:selectsType,title: 'select.hebmk' });
	}
});
//数据精选左侧导航
router.get('/nav', function(req, res, next) {
	res.render('nav');
});
//item详情右侧item介绍信息
router.get('/iteminfo', function(req, res, next) {
	res.render('iteminfo');
});

//item详情
router.get('/itemdet/:reponame/:itemname', function(req, res, next) {
	var reponame=req.params.reponame;
	var itemname=req.params.itemname;
	if(agent(req)){
		res.redirect('/mobile/itemDetailsPhone.html?repname='+reponame+'&itemname='+itemname);
	}else{
		res.render('itemdetails',{reponame:reponame,itemname:itemname,discuss:'',title:reponame+"/"+itemname+'.hebmk'});
	}	
});
//item详情
router.get('/itemdet/:reponame/:itemname/:discuss', function(req, res, next) {
	var reponame=req.params.reponame;
	var itemname=req.params.itemname;
	var discuss=req.params.discuss;
	if(agent(req)){
		res.redirect('/mobile/itemDetailsPhone.html?repname='+reponame+'&itemname='+itemname+"&discuss="+discuss);
	}else{
		res.render('itemdetails',{reponame:reponame,itemname:itemname,discuss:discuss,title:reponame+"/"+itemname+'.hebmk'});
	}	
});
//repo详情
router.get('/repodet/:thisReponame', function(req, res, next) {	
	var thisReponame=req.params.thisReponame;
	if(agent(req)){
		res.redirect('/mobile/repDetailsPhone.html?repname='+thisReponame);		
	}else{
		res.render('repodetails',{ thisReponame:thisReponame,title:thisReponame+'.hebmk' });
	}
});
//拥有方详情
router.get('/userdet/:snames', function(req, res, next) {	
	var snames=req.params.snames;	
	if(agent(req)){
		res.redirect('/mobile/dataOfDetailsPhone.html?username='+snames+"&type=type");		
	}else{
		res.render('userdetails', { sname:snames,title:snames+'.hebmk' });
	}
});
//搜索结果
router.get('/search', function(req, res, next) {
	if(agent(req)){
		res.redirect('/mobile/searchPhone.html');
	}else{
		res.render('search', { sname:"",title:'search.hebmk' });
	}	
});
//搜索结果

router.get('/search/:snames', function(req, res, next) {
	var snames=req.params.snames;
	snames=snames.replace("_*_","/");
	if(agent(req)){
		res.redirect('/mobile/searchPhone.html?rtext='+snames);
	}else{
		res.render('search', { sname:snames,title:'search.hebmk' });
	}
});
//监控中心
router.get('/monitor', function(req, res, next) {
	res.render('monitor',{ title:'monitor.hebmk' });
});
//忘记密码
router.get('/forgetpw/:tname/:resetId', function(req, res, next) {
	var tname=req.params.tname;
	var resetId=req.params.resetId;
	res.render('forgetpw',{tname:tname,resetId:resetId,title:'forgetpw.hebmk'});
});
//测试
router.get('/test', function(req, res, next) {
 	res.render('test',{title:'hebmk'});
});
//测试
router.get('/test1', function(req, res, next) {
	res.render('publicRepoList');
});
router.get('/model/:names', function(req, res, next) {
	var names=req.params.names;
 	res.render('model'+names);
});
router.get('/model/:names/:rnames', function(req, res, next) {
	var names=req.params.names;
 	res.render('model'+names);
});
//工具页面
router.get('/clientDownload', function(req, res, next) {
	res.render('clientDownload',{title:'clientDownload.hebmk' });
});

router.get('/clientToolDownload', function(req, res, next) {
	res.render('clientToolDownload',{title:'clientToolDownload.hebmk' });
});

//平台介绍
router.get('/platform', function(req, res, next) {
	res.render('platform',{title:'hebmk'});
});
//关于我们
router.get('/aboutUS', function(req, res, next) {
	res.render('aboutUS',{title:'hebmk'});
});


//登录后
router.get('/my/*',function(req,res,next){
	if (req.cookies["token"]!=null&&req.cookies["tname"]!=null&&req.cookies["tname"]!="null"&&req.cookies["tname"]!="null") {
    	next();
  	} else {
    	res.render('index');
  	}
});
//个人中心--会员升级
router.get('/my/member', function(req, res, next) {
	res.render('memberupgrade',{title:'member.hebmk' });
});
//个人中心--修改密码
router.get('/my/pwd',function(req,res,next){
	res.render('pwd',{title:'pwd.hebmk' });
});
//个人中心--基本信息
router.get('/my/basicInfo',function(req,res,next){
	res.render('basicInfo',{title:'basicInfo.hebmk' });
});
//个人中心--账务中心
router.get('/my/myaccount', function(req, res, next) {
	res.render('myaccount', {title:'myaccount.hebmk' });
});
// 我的发布Item列表
router.get('/my/items/:snames', function(req, res, next) {
	var snames=req.params.snames;
	res.render('myItems', { sname:snames,title:'myItems.hebmk' });
});
//pull记录、账务中心、我的订单组件模板
router.get('/my/queriesList', function(req, res, next) {
	res.render('queriesList', {title:'queriesList.hebmk' });
});

//我的发布
router.get('/my/publish', function(req, res, next) {
	res.render('mypublish',{myOrder:'',title:'pub.hebmk' });
});
//我的发布
router.get('/my/publish/:myOrder', function(req, res, next) {
	var myOrder=req.params.myOrder;
	res.render('mypublish',{myOrder:myOrder,title:'pub.hebmk' });
});
//我的发布
router.get('/my/mysub', function(req, res, next) {
	res.render('mysubscribe',{title:'pub.hebmk' });
});
//我的发布item
router.get('/my/itemDetails/:repnames/:itemnames', function(req, res, next) {
	var repnames=req.params.repnames;
	var itemnames=req.params.itemnames;
	res.render('myitemDetails',{repnames:repnames,itemnames:itemnames,title:'pub.hebmk' });
});
//markdown编辑
router.get('/my/mark/:rep/:item/:type', function(req, res, next) {
	var rep=req.params.rep;
	var item=req.params.item;
	var type=req.params.type;
	res.render('mymark',{rep:rep,item:item,type:type,title:'mark.hebmk' });
});
//消息中心
router.get('/my/msgreq', function(req, res, next) {
	res.render('mymsgreq',{title:'message.hebmk' });
});

//认证中心
router.get('/my/ca', function(req, res, next) {
	res.render('certificateCenter',{title:'certificateCenter.hebmk' });
});
//企业认证
router.get('/my/comCertify', function(req, res, next) {
	res.render('companycertify',{title:'companycertify.hebmk' });
});
//企业认证new
router.get('/my/comCertifyNew', function(req, res, next) {
	res.render('companycertifynew',{title:'companycertify.hebmk' });
});
//个人认证
router.get('/my/personCertify', function(req, res, next) {
	res.render('personcertify',{title:'personcertify.hebmk' });
});
//注册
router.get('/reg', function(req, res, next) {

	var region = process.env.REGION || "" ;
	if(region==""){
		res.render('register',{title:'register.hebmk',region:"" });
	}else{
		res.render('register',{title:'register.hebmk',region:region });
	}
});
//激活邮件
router.get('/regmessage/:loginname/:vid', function(req, res, next) {
	var loginname=req.params.loginname;
	var vid=req.params.vid;
	res.render('regmessage',{loginname:loginname,vid:vid,title:'regmessage.hebmk'});
});


router.get('*', function (req, res) {
	res.render('error', { title: '，请重新输入地址' });
});







var agent=function(req){
	var b=false;
	var deviceAgent = req.headers['user-agent'].toLowerCase(); 
	var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/); 
	if(agentID){ 
		b=true; 
	}
	return b;
}




module.exports = router;
